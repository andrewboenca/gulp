'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var fileInclude = require('gulp-file-include');
var size = require('gulp-size');
var babel = require('gulp-babel');
var scsslint = require('gulp-scss-lint');
var stylish = require('jshint-stylish');
var gulpif = require('gulp-if');


gulp.task('jshint', function() {
  gulp.src('./assets/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('babel', function () {
    return gulp.src('./assets/scripts/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('imagemin', function() {
  var imgSrc = './assets/imgs/**/*',
      imgDst = './build/imgs';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});


gulp.task('scss-lint', function() {
  return gulp.src('/scss/*.scss')
    .pipe(scsslint());
});

gulp.task('sass', function () {
  gulp.src('./assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.build/css'));
});

gulp.task('styles', function() {
  gulp.src(['./assets/sass/lib/*.css','./assets/sass/*.scss'])
    //.pipe(scsslint())
    .pipe(gulpif(/\.scss$/, scsslint()))
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('scripts', function() {
  gulp.src(['./assets/js/lib/*.js','./assets/js/*.es6.js'])
    .pipe(gulpif(/[.]es6\.js$/, jshint()))
    .pipe(jshint.reporter(stylish))
    .pipe(gulpif(/[.]es6\.js$/, babel()))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});


gulp.task('default', function() {

  var client = ['imagemin', 'scripts', 'styles'];
  // watch for JS changes
  gulp.watch('./assets/js/*.es6.js', client);

  // watch for CSS changes
  gulp.watch('./assets/sass/*.scss', client);
});
