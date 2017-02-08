var clean = require('gulp-clean');

gulp.task('clean', function () {
	return gulp.src(paths.dist, {read: false} )
        .pipe(clean());
});