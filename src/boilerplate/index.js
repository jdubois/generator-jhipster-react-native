const prompts = require('./prompts')
const { merge, pipe, assoc, omit, __ } = require('ramda')
const { getReactNativeVersion } = require('../lib/react-native-version')
const { patchReactNativeNavigation } = require('../lib/react-native-navigation')
const Insight = require('../lib/insight')
const generateFiles = require('./files')
const fs = require('fs-extra')
const pkg = require('../../package')

/**
 * Is Android installed?
 *
 * $ANDROID_HOME/tools folder has to exist.
 *
 * @param {*} context - The gluegun context.
 * @returns {boolean}
 */
const isAndroidInstalled = function (context) {
  const androidHome = process.env['ANDROID_HOME']
  const hasAndroidEnv = !context.strings.isBlank(androidHome)
  const hasAndroid = hasAndroidEnv && context.filesystem.exists(`${androidHome}/tools`) === 'dir'

  return Boolean(hasAndroid)
}

/**
 * Let's install.
 *
 * @param {any} context - The gluegun context.
 */
async function install (context) {
  const {
    filesystem,
    parameters,
    ignite,
    reactNative,
    print,
    system,
    prompt,
    template
  } = context

  const perfStart = (new Date()).getTime()

  const name = parameters.third
  const spinner = print
    .spin(`Generating a React Native client for JHipster apps`)
    .succeed()

  let props = {
    jhipsterDirectory: parameters.options['jh-dir'] || '',
    disableInsight: parameters.options['disable-insight'] || false
  }
  let jhipsterConfig
  let jhipsterDirectory
  let jhipsterConfigPath

  if (props.jhipsterDirectory) {
    if (!fs.existsSync(`../${props.jhipsterDirectory}/.yo-rc.json`)) {
      print.error(`No JHipster configuration file found at ${props.jhipsterDirectory}/.yo-rc.json`)
      return
    }
    print.success(`Found the JHipster config at ${props.jhipsterDirectory}/.yo-rc.json`)
    jhipsterConfig = await fs.readJson(`../${props.jhipsterDirectory}/.yo-rc.json`)
    jhipsterDirectory = props.jhipsterDirectory
    jhipsterConfigPath = `${jhipsterDirectory}/.yo-rc.json`
  } else {
    // prompt the user until an JHipster configuration file is found
    while (true) {
      let jhipsterPathAnswer = await prompt.ask(prompts.jhipsterPath)
      // strip the trailing slash from the directory
      jhipsterDirectory = `${jhipsterPathAnswer.filePath}`.replace(/\/$/, ``)
      jhipsterConfigPath = `${jhipsterDirectory}/.yo-rc.json`
      print.info(`Looking for ${jhipsterConfigPath}`)
      if (fs.existsSync(`../${jhipsterConfigPath}`)) {
        print.success(`Found JHipster config file at ${jhipsterConfigPath}`)
        jhipsterConfig = await fs.readJson(`../${jhipsterConfigPath}`)
        break
      } else {
        print.error(`Could not find JHipster config file, please try again.`)
      }
    }
    props.jhipsterDirectory = jhipsterDirectory
  }

  if (!props.disableInsight && Insight.insight.optOut === undefined) {
    Insight.insight.optOut = !((await prompt.ask(prompts.insight)).insight)
  }

  props.skipGit = parameters.options['skip-git']
  props.skipLint = parameters.options['skip-lint']

  // very hacky but correctly handles both strings and booleans and converts to boolean
  props.disableInsight = JSON.parse(props.disableInsight)

  // attempt to install React Native or die trying
  const rnInstall = await reactNative.install({
    name,
    version: getReactNativeVersion(context)
  })
  if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)

  // remove the __tests__ directory that come with React Native
  filesystem.remove('__tests__')
  filesystem.remove('App.js')

  props.name = name
  props.igniteVersion = ignite.version
  props.reactNativeVersion = rnInstall.version
  props.jhipsterDirectory = `../${props.jhipsterDirectory}`
  props.authType = jhipsterConfig['generator-jhipster'].authenticationType
  props.searchEngine = !!jhipsterConfig['generator-jhipster'].searchEngine
  props.websockets = !!jhipsterConfig['generator-jhipster'].websocket
  props.socialLogin = !!jhipsterConfig['generator-jhipster'].enableSocialSignIn
  props.packageVersion = pkg.version
  await generateFiles(context, props, jhipsterConfig)

  /**
   * Merge the package.json from our template into the one provided from react-native init.
   */
  async function mergePackageJsons () {
    // transform our package.json incase we need to replace variables
    const rawJson = await template.generate({
      directory: `${ignite.ignitePluginPath()}/boilerplate`,
      template: 'package.json.ejs',
      props: props
    })
    const newPackageJson = JSON.parse(rawJson)

    // read in the react-native created package.json
    const currentPackage = filesystem.read('package.json', 'json')

    // deep merge, lol
    const newPackage = pipe(
      assoc(
        'dependencies',
        merge(currentPackage.dependencies, newPackageJson.dependencies)
      ),
      assoc(
        'devDependencies',
        merge(currentPackage.devDependencies, newPackageJson.devDependencies)
      ),
      assoc('scripts', merge(currentPackage.scripts, newPackageJson.scripts)),
      merge(
        __,
        omit(['dependencies', 'devDependencies', 'scripts'], newPackageJson)
      )
    )(currentPackage)

    // write this out
    filesystem.write('package.json', newPackage, { jsonIndent: 2 })
  }
  await mergePackageJsons()
  spinner.stop()
  spinner.succeed(`project generated`)

  if (!parameters.options.skipInstall) {
    spinner.text = `▸ installing dependencies`
    spinner.start()
    // install any missing dependencies
    await system.run('yarn', {stdio: 'ignore'})
    spinner.succeed(`dependencies installed`)
  }
  // pass long the debug flag if we're running in that mode
  // const debugFlag = parameters.options.debug ? '--debug' : ''

  /**
   * Append to files
   */
  // https://github.com/facebook/react-native/issues/12724
  filesystem.appendAsync('.gitattributes', '*.bat text eol=crlf')
  filesystem.append('.gitignore', 'coverage/')
  filesystem.append('.gitignore', '\n# Misc\n#')
  filesystem.append('.gitignore', '.env\n')
  filesystem.append('.gitignore', 'ios/Index/DataStore\n')

  try {
    const ignitePluginConfigPath = `${__dirname}/ignite.json`
    const newConfig = filesystem.read(ignitePluginConfigPath, 'json')
    ignite.setIgnitePluginPath(__dirname)
    ignite.saveIgniteConfig(newConfig)

    fs.mkdirSync(`.jhipster`)
    fs.writeJsonSync('.jhipster/yo-rc.json', jhipsterConfig, { spaces: '\t' })
    print.success(`JHipster config saved to your app's .jhipster folder.`)
  } catch (e) {
    ignite.log(e)
    throw e
  }

  await patchReactNativeNavigation(context, name)

  // react native link -- must use spawn & stdio: ignore or it hangs!! :(
  spinner.text = `▸ linking native libraries`
  spinner.start()
  await system.spawn('react-native link', { stdio: 'ignore' })
  spinner.stop()

  // git configuration
  const gitExists = await filesystem.exists('./.git')
  if (!gitExists && !props.skipGit) {
    // initial git
    const spinner = print.spin('configuring git')

    try {
      await system.run(`git init . && git add . && git commit -m "Initial commit."`)
      spinner.succeed(`created a git repository and an initial commit`)
    } catch (e) {
      spinner.fail(`failed to create a git repository`)
    }
  }

  const perfDuration = parseInt(((new Date()).getTime() - perfStart) / 10) / 100
  spinner.succeed(`ignited ${print.colors.yellow(name)} in ${perfDuration}s`)

  Insight.trackAppOptions(context, props)

  // Wrap it up with our success message.
  print.info('')
  print.info('🍽 Time to get cooking!')
  print.info('')
  if (props.websockets) {
    print.info('To enable the websockets example, see docs/websockets.md')
    print.info('')
  }
  if (props.socialLogin) {
    print.info('To configure Social Login, see docs/social-login.md')
    print.info('')
  }
  if (props.authType === 'oauth2') {
    print.info('To configure OAuth2 OIDC Login, see docs/oauth2-oidc.md')
    print.info('')
  }
  print.info('To run in iOS:')
  print.info(print.colors.bold(`  cd ${name}`))
  print.info(print.colors.bold('  react-native run-ios'))
  print.info('')
  if (isAndroidInstalled(context)) {
    print.info('To run in Android:')
  } else {
    print.info(`To run in Android, make sure you've followed the latest react-native setup instructions at https://facebook.github.io/react-native/docs/getting-started.html before using ignite.\nYou won't be able to run ${print.colors.bold('react-native run-android')} successfully until you have. Then:`)
  }
  print.info(print.colors.bold(`  cd ${name}`))
  print.info(print.colors.bold('  react-native run-android'))
  print.info('')
  print.info('To see what JHipster generators are available:')
  print.info(print.colors.bold(`  cd ${name}`))
  print.info(print.colors.bold('  ignite generate'))
  print.info('')
}

module.exports = {
  install
}
