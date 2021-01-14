const files = {
    common: [
        {
            templates: [
                '.prettierrc.js',
                '.prettierignore',
                '.editorconfig',
                '.env',
                '.eslintrc.js',
                '.gitattributes',
                'App.js',
                'README.md',
                'webpack.config.js',
                // templated files
                'app/config/app-config.js',
                'app/navigation/drawer/drawer-content.js',
                'app/navigation/entity-stack.js',
                'app/navigation/nav-container.js',
                'app/navigation/nav-ref.js',
                'app/navigation/not-found-screen.tsx',
                'app/navigation/modal-screen.js',
                'app/modules/home/learn-more-links.component.js',
                'app/shared/services/api.js',
                'app/modules/login/login.reducer.js',
                'test/spec/modules/login/login.reducer.spec.js',
                'app/modules/login/login.sagas.js',
                'test/spec/modules/login/login.sagas.spec.js',
                'app/shared/services/fixture-api.js',
                'app/shared/fixtures/login.json',
                'app/shared/sagas/index.js',
                'app/shared/sagas/call-api.saga.js',
                'app/shared/sagas/startup.saga.js',
                'test/spec/shared/sagas/startup.saga.spec.js',
                'test/setup.js',
                'app/shared/reducers/create-store.js',
                'app/config/redux-persist.js',
                'app/modules/entities/entities-screen.js',
                'app/modules/entities/entities-screen.styles.js',
                'app/modules/home/home-screen.js',
                'app/modules/home/home-screen.styles.js',
                'app/modules/login/login-screen.styles.js',
                'app/navigation/drawer/drawer-button.js',
                'app/navigation/drawer/touchable-item.tsx',
                'app/shared/components/alert-message/alert-message.js',
                'app/shared/components/alert-message/alert-message.story.js',
                'app/shared/components/alert-message/alert-message.styles.js',
                'app/shared/components/form/inputs/jhi-date-input.js',
                'app/shared/components/form/inputs/jhi-date-input.web.js',
                'app/shared/components/form/inputs/jhi-list-input.js',
                'app/shared/components/form/inputs/jhi-multi-list-input.js',
                'app/shared/components/form/inputs/jhi-switch-input.js',
                'app/shared/components/form/inputs/jhi-text-input.js',
                'app/shared/components/form/jhi-form.js',
                'app/shared/components/form/jhi-form-button.js',
                'app/shared/components/form/jhi-form-field.js',
                'app/shared/components/form/jhi-form-field.story.js',
                'app/shared/components/rounded-button/rounded-button.js',
                'app/shared/components/rounded-button/rounded-button.story.js',
                'app/shared/components/rounded-button/rounded-button.styles.js',
                'app/shared/components/search-bar/search-bar.js',
                'app/shared/components/search-bar/search-bar.story.js',
                'app/shared/components/search-bar/search-bar.styles.js',
                'app/shared/fixtures/README.md',
                'app/shared/fixtures/get-account.json',
                'app/shared/fixtures/get-user.json',
                'app/shared/fixtures/get-users.json',
                'app/shared/fixtures/update-user.json',
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon.png', method: 'copy' },
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon@1.5x.android.png', method: 'copy' },
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon@1.5x.ios.png', method: 'copy' },
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon@1x.android.png', method: 'copy' },
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon@1x.ios.png', method: 'copy' },
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon@2x.android.png', method: 'copy' },
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon@2x.ios.png', method: 'copy' },
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon@3x.android.png', method: 'copy' },
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon@3x.ios.png', method: 'copy' },
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon@4x.android.png', method: 'copy' },
                { file: 'app/shared/images/toggle-drawer-icon/toggle-drawer-icon@4x.ios.png', method: 'copy' },
                { file: 'app/shared/images/logo-jhipster.png', method: 'copy' },
                { file: 'app/shared/images/logo-jhipster@2x.png', method: 'copy' },
                { file: 'app/shared/images/logo-jhipster@3x.png', method: 'copy' },
                { file: 'assets/icon.png', method: 'copy' },
                { file: 'assets/splash.png', method: 'copy' },
                { file: 'assets/favicon.png', method: 'copy' },
                { file: 'assets/adaptive-icon.png', method: 'copy' },
                'app/shared/reducers/account.reducer.js',
                'app/shared/reducers/app-state.reducer.js',
                'app/shared/reducers/index.js',
                'app/shared/reducers/startup.reducer.js',
                'app/shared/reducers/user.reducer.js',
                'app/shared/sagas/account.sagas.js',
                'app/shared/sagas/user.sagas.js',
                'app/shared/services/rehydration.service.js',
                'app/shared/themes/application.styles.js',
                'app/shared/themes/colors.js',
                'app/shared/themes/fonts.js',
                'app/shared/themes/images.js',
                'app/shared/themes/index.js',
                'app/shared/themes/metrics.js',
                'app/shared/util/date-transforms.js',
                'app/shared/util/use-did-update-effect.js',
                'app/shared/util/immutable-persistence-transform.js',
                'app/shared/util/pagination-utils.js',
                'app/shared/util/snake-to-camel-case.js',
                'app/shared/util/url-utils.js',
                'patches/react-native-keyboard-aware-scroll-view+0.9.3.patch',
                'patches/react-native-sectioned-multi-select+0.8.1.patch',
                'storybook/addons.js',
                'storybook/index.js',
                'storybook/stories.js',
                'test/spec/shared/components/alert-message/alert-message.spec.js',
                'test/spec/shared/components/rounded-button/rounded-button.spec.js',
                'test/spec/shared/components/search-bar/search-bar.spec.js',
                // 'test/spec/shared/navigation/drawer/drawer-button.spec.js',
                'test/spec/shared/reducers/account.reducer.spec.js',
                'test/spec/shared/reducers/app-state.reducer.spec.js',
                'test/spec/shared/reducers/user.reducer.spec.js',
                'test/spec/shared/sagas/account.sagas.spec.js',
                'test/spec/shared/sagas/call-api.saga.spec.js',
                'test/spec/shared/sagas/user.saga.spec.js',
                'test/spec/shared/services/fixture-api.spec.js',
            ],
        },
    ],
    userManagement: [
        {
            condition: generator => !generator.context.skipUserManagement,
            templates: [
                'app/modules/account/password-reset/forgot-password-screen.js',
                'app/modules/account/password-reset/forgot-password-screen.styles.js',
                'app/modules/account/password-reset/forgot-password.reducer.js',
                'app/modules/account/password-reset/forgot-password.sagas.js',
                'app/modules/account/password/change-password-screen.js',
                'app/modules/account/password/change-password-screen.styles.js',
                'app/modules/account/password/change-password.reducer.js',
                'app/modules/account/password/change-password.sagas.js',
                'app/modules/account/register/register-screen.js',
                'app/modules/account/register/register-screen.styles.js',
                'app/modules/account/register/register.reducer.js',
                'app/modules/account/register/register.sagas.js',
                'app/modules/account/settings/settings-screen.js',
                'app/modules/account/settings/settings-screen.styles.js',
                'test/spec/modules/account/password-reset/forgot-passsword.sagas.spec.js',
                'test/spec/modules/account/password-reset/forgot-password.reducer.spec.js',
                'test/spec/modules/account/password/change-passsword.sagas.spec.js',
                'test/spec/modules/account/password/change-password.reducer.spec.js',
                'test/spec/modules/account/register/register.reducer.spec.js',
                'test/spec/modules/account/register/register.sagas.spec.js',
            ],
        },
    ],
    websockets: [
        {
            condition: generator => generator.context.websocket === 'spring-websocket',
            templates: [
                'app/modules/chat/chat-screen.js',
                'app/modules/chat/chat-screen.styles.js',
                'app/modules/chat/chat.reducer.js',
                'app/shared/websockets/websocket.sagas.js',
                'app/shared/websockets/websocket.service.js',
                'test/spec/shared/websockets/websocket-service.spec.js',
                'test/spec/shared/websockets/websocket.sagas.spec.js',
                'test/spec/modules/chat/chat.reducer.spec.js',
            ],
        },
    ],
    loginScreen: [
        {
            condition: generator => generator.context.authenticationType !== 'oauth2',
            templates: ['app/modules/login/login-screen.js'],
        },
        {
            condition: generator => generator.context.authenticationType === 'oauth2',
            templates: [
                {
                    file: 'app/modules/login/login-screen.oauth2.js',
                    renameTo: () => 'app/modules/login/login-screen.js',
                },
            ],
        },
    ],
    oauth: [
        {
            condition: generator => generator.context.authenticationType === 'oauth2',
            templates: [
                'app/shared/fixtures/get-oauth-info.json',
                'app/modules/login/login.utils.ts',
                'app/shared/sagas/auth-info.saga.js',
                'app/shared/reducers/auth-info.reducer.js',
            ],
        },
    ],
    detox: [
        {
            condition: generator => generator.context.detox === true,
            templates: [
                '.detoxrc.json',
                'e2e/init.js',
                'e2e/expo.conf.js',
                'e2e/.mocharc.json',
                'e2e/home-screen.spec.js',
                'e2e/utils.js',
                'e2e/download-expo.sh',
            ],
        },
        {
            condition: generator => generator.context.detox === true && !generator.context.skipUserManagement,
            templates: [
                'e2e/account/change-password-screen.spec.js',
                'e2e/account/login-screen.spec.js',
                'e2e/account/settings-screen.spec.js',
            ],
        },
        {
            condition: generator => generator.context.detox === true && generator.context.websocket,
            templates: ['e2e/websockets/chat-screen.spec.js'],
        },
    ],
};

module.exports = { files, writeFiles };

function writeFiles() {
    this.writeFilesToDisk(files, this);
}
