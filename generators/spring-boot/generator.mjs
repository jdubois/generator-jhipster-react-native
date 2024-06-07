import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async writingTemplateTask({ application }) {
        await this.writeFiles({
          templates: [
            {
              sourceFile: 'src/main/resources/config/application-e2e-cors.yml',
              destinationFile: 'src/main/resources/config/application-e2e-cors.yml',
              noEjs: true,
            },
          ],
          context: application,
        });
      },
    });
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      async postWritingTemplateTask() {
        this.editFile('src/main/docker/app.yml', content =>
          content.replace('SPRING_PROFILES_ACTIVE=prod,api-docs', 'SPRING_PROFILES_ACTIVE=prod,api-docs,e2e-cors'),
        );
        this.editFile('src/main/resources/config/application.yml', content =>
          content.replace(/allowed-origins: (['"])(.*)['"]/, 'allowed-origins: $1$2,capacitor://localhost,http://localhost$1'),
        );
        this.editFile('src/main/resources/config/application-dev.yml', content =>
          content.replace(/allowed-origins: (['"])(.*)['"]/, 'allowed-origins: $1$2,capacitor://localhost,http://localhost$1'),
        );
      },
    });
  }
}
