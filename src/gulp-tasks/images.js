var imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    gulp.src(deps.images)
        .pipe(gulpif(prod, imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(finalize('images'));
});
