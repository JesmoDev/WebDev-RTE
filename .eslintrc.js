module.exports = {
  ignorePatterns: ['vite.*.js'],
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'html', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:lit/recommended',
    'plugin:lit-a11y/recommended',
  ],
  rules: {
    // disable the rule for all files
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn', //TODO: Remove (maybe)
    '@typescript-eslint/ban-types': 'warn', //TODO: Remove (maybe)
    'lit-a11y/click-events-have-key-events': 'off',
    'import/no-named-as-default': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  env: {
    browser: true,
    node: true,
  },
};
