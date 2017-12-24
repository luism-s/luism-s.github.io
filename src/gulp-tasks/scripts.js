var lazypipe    = require('lazypipe');
var gulpif      = require('gulp-if');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');

// ### JS processing pipeline
// Example
// ```
// gulp.src(jsFiles)
//   .pipe(jsTasks('main.js')
//   .pipe(gulp.dest(paths.dist + 'scripts'))
// ```
var jsTasks = function(independent) {
  var independent = independent || false;
  return lazypipe()
    .pipe(function() {
      return gulpif(enabled.maps, sourcemaps.init());
    })
    .pipe(function() {
      return gulpif(!independent, concat('main.js'));
    })
    .pipe(function() {
      return gulpif(enabled.minify, uglify({
          compress: {
            'drop_debugger': enabled.stripJSDebug
          }
      }));
    })
    .pipe(function() {
      return gulpif(enabled.maps, sourcemaps.write('.', {
        sourceRoot: paths.source + 'scripts'
      }));
    })();
};

// ### Scripts
// `gulp scripts` - Ccccompiles, combines, and optimizes JS
gulp.task('scripts', function() {
  return gulp.src(deps.js)
    .pipe(jsTasks())
    .pipe(finalize('scripts'));
});
