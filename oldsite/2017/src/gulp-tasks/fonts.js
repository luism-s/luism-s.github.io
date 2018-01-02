var flatten = require('gulp-flatten');

// ### Fonts
// `gulp fonts` - Grabs all the fonts and outputs them in a flattened directory
// structure. See: https://github.com/armed/gulp-flatten
gulp.task('fonts', function() {
  return gulp.src(deps.fonts)
    .pipe(flatten())
    .pipe(finalize('fonts'));
});
