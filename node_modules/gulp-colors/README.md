# gulp-colors

Replace all the default colors in your files this better ones by [mrmrs/colors](https://github.com/mrmrs/colors).

![](https://github.com/mrmrs/colors/raw/master/palette.png)

## Installation

```
npm install gulp-colors --save-dev
```

## Usage

This will work in any file containing color names like `blue`, `green` and `yellow`. It will then replace the default colors with good looking hex codes!

```javascript
var colors = require('gulp-colors');

gulp.task('styles', function () {
  return gulp.src('stylesheet.css')
    .pipe(colors())
    .pipe(gulp.dest(dist));
});
```

## Thanks

A big thanks and shoutout to @mrmrs for this awesome color set!
