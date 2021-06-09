module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'babel', 'jest'],
  globals: {
    fetch: 'readonly',
    window: 'readonly'
  },
  env: {
    browser: true,
    nock: true,
    'jest/globals': true
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    // Разрешить анонимные функции
    'func-names': 'off',
    // Разрешить JSX в файлах .js
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  },
  overrides: [
    // Правила для файлов с тестами
    {
      files: ['./tests/**/*.js', '**/*.test.js'],
      rules: {
        // Разрешить деструктуризацию props
        'react/jsx-props-no-spreading': 'off',
        // Разрешить импорты из devDependencies
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ],
  settings: {
    // Поддержка Absolute path imports
    'import/resolver': {
      node: {
        paths: ['.']
      },
      alias: {
        map: [
          ['@sharedComp/*', './components/_shared'],
          ['@config', './config']
        ]
      }
    }
  }
};
