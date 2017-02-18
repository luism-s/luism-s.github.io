var jshint      = require('gulp-jshint');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');

gulp.task('jshint', function() {
  return gulp.src(['../gulpfile.js', '../config.js'].concat(config.jslintFiles))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['jshint'], function() {

    return gulp.src(deps.js)
        .pipe(gulpif(!prod, sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(gulpif(!prod, sourcemaps.write('.')))
        .pipe(gulpif(prod, uglify()))
        .pipe(finalize('scripts'));
});
