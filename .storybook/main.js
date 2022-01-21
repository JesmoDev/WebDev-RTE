const tsconfigPaths = require('vite-tsconfig-paths').default;
const processLitCSSPlugin =
  require('../scripts/vite.processLitCSSPlugin').default;

module.exports = {
  stories: ['../packages/**/*.story.ts'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  core: { builder: 'storybook-builder-vite' },
  async viteFinal(config, { configType }) {
    // customize the Vite config here

    config.plugins.push(processLitCSSPlugin());

    if (configType === 'DEVELOPMENT') {
      // add plugins
      config.plugins.push(tsconfigPaths());

      // pre bundle dependencies for faster startup time
      config.optimizeDeps.include.push('@storybook/web-components');
      config.optimizeDeps.include.push('lit-html');
      config.optimizeDeps.include.push('lit');
      config.optimizeDeps.include.push('lit/decorators.js');
      config.optimizeDeps.include.push('lit/directives/style-map.js');
      config.optimizeDeps.include.push('lit/directives/if-defined.js');
      config.optimizeDeps.include.push('lit/directives/unsafe-html.js');
      config.optimizeDeps.include.push('@umbraco-ui/uui-base/lib/registration');
      config.optimizeDeps.include.push('lit/directives/repeat.js');
      config.optimizeDeps.include.push('@tiptap/core');
      config.optimizeDeps.include.push('@tiptap/starter-kit');
      config.optimizeDeps.include.push('@tiptap/extension-underline');
      config.optimizeDeps.include.push('@tiptap/extension-text-align');
      config.optimizeDeps.include.push('@tiptap/extension-image');
      config.optimizeDeps.include.push('@tiptap/extension-link');
      config.optimizeDeps.include.push('@tiptap/extension-bubble-menu');
    }

    return config;
  },
};
