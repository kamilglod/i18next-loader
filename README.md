[![npm](https://img.shields.io/npm/v/i18next-loader.svg)](https://npmjs.com/package/i18next-loader)
[![Build Status](https://travis-ci.org/kamilglod/i18next-loader.svg?branch=master)](https://travis-ci.org/kamilglod/i18next-loader)
[![Coverage Status](https://coveralls.io/repos/github/kamilglod/i18next-loader/badge.svg?branch=master)](https://coveralls.io/github/kamilglod/i18next-loader?branch=master)

[![NPM](https://nodei.co/npm/i18next-loader.png)](https://nodei.co/npm/i18next-loader/)

# i18next loader for webpack
this is a webpack loader that can translate your code and generate bundle per each language
### installation:
  ```bash
  npm install --save-dev i18next-loader
  ```
### usage:
1. install `i18next1`: `npm install --save-dev i18next`
2. call `i18next.init({})` in the begining of your `webpack.config.js`:
  ```js
  var i18next = require('i18next');

  i18next.init({
    lng: 'pl',
    fallbackLng: false,
    keySeparator: false,
    nsSeparator: false,
    saveMissing: true,
    resources: {
      'Hello World!': 'Siema Świecie!',
      'Translate me!': 'Przetłumacz mnie',
      'One plus one equals ${ 1 + 1 }': 'Jeden plus jeden jest równe ${ 1 + 1 }',
      'key_0': 'elementów',
      'key_1': 'element',
      'key_2': 'elementy',
      'key_5': 'elementów',
      'key_21': 'elementy'
    }
  });
  ```
3. Use loader in your application:
  * using `require`:
  ```js
  var exportsOfFile = require("i18next!./file.js");
  ```
  * using webpack config:
  ```js
  {
      test: /\.(js|jsx)$/,
      loader: 'i18next-loader!react-hot!babel-loader'
  }
  ```
4. Then you can use translate function, e.g:
  ```js

  __('Translate me!')   // 'Przetłumacz mnie'
  __(`One plus one equals ${ 1 + 1 }`)  // 'Jeden plus jest jest równe ${ 1 + 1 }'
  __('item', {count: 0})  // 'elementów'
  __('item', {count: 1})  // 'element'
  __('item', {count: 99})  // 'elementów'
  ```

### query params:
- `funcName`: change default function name (default is `__()`)
- `quotes`: choose how to generates translated strings in code (default is `''`)
- `lng`: set i18next language (useful when having webpack config per language)

### problems:
- it will not translate keys depending of variables values: it is a loader so the value of the variable is unknown in the process of loading file. (to handle it we need to use i18next directly)
