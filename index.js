/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Kamil Głód @kglod
*/

var loaderUtils = require('loader-utils');
var i18next = require('i18next');
var clc = require('cli-color');

// build RegExp for string like {'asd': "qwe"}
var ESCAPE = '[\'"`]?';
var WORD = '(\\w*)';
var jsonRegex = new RegExp(
  [ESCAPE, WORD, ESCAPE, ':\\s', ESCAPE, WORD, ESCAPE].join(''),
  ['g']);


i18next.on('missingKey', function(lngs, namespace, key) {
  console.log(clc.yellow(
    '[' + lngs + '] key `' + namespace + ':' + key + '` missing'
  ));
});


module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  var params  = loaderUtils.parseQuery(this.query);
  var funcName = params.funcName || '__';
  var defaultQuotes = params.quotes || '\'';
  var quotes = params.quotes || '\'';
  var regex = new RegExp(funcName + '\\(([\'"`])(.*?)[\'"`](?:,\\s(.*?))?\\)', ['g']);

  params.lng && i18next.changeLanguage(params.lng)
  
  source = source.replace(regex, function (res, quotes, key, jsonString) {

    if (jsonString) {
      var options = {};
      jsonString.replace(jsonRegex, function (res, key, value) {
        options[key] = value;
      });
    } else {
      var options = undefined;
    }

    quotes = (quotes == '`') ? '`' : defaultQuotes;
    return quotes + i18next.t(key, options) + quotes;
  });

  return source;
}
