var through = require('through2');
var gutil = require('gulp-util');
var replaceall = require('replaceall');
var colorsCSS = require('colors.css');
var PluginError = gutil.PluginError;

var colors = function () {
  'use strict';

  return through.obj(function (file, enc, cb) {
    var
      color,
      newColor;

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      throw new PluginError('gulp-colors', 'Streaming not supported');
    }

    if (file.isBuffer()) {
      for (color in colorsCSS) {
        if (colorsCSS.hasOwnProperty(color)) {
          newColor = colorsCSS[color];

          file.contents = new Buffer(replaceall(color, newColor, file.contents.toString(enc)));
        }
      }
    }

    cb(null, file);
  });
};

module.exports = colors;
