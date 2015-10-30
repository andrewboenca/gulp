/*global describe, it*/
var assert = require('assert');
var File = require('vinyl');
var colors = require('./');

describe('gulp-colors', function () {
  'use strict';

  describe('in buffer mode', function () {
    it('should replace colors', function (done) {
      var
        fakeFile,
        myColors;

      fakeFile = new File({
        contents: new Buffer('body {\n\tcolor: blue;\n\tbackground-color: red;\n}')
      });

      myColors = colors();

      myColors.write(fakeFile);
      myColors.once('data', function (file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), 'body {\n\tcolor: #0074D9;\n\tbackground-color: #FF4136;\n}');

        done();
      });
    });
  });
});
