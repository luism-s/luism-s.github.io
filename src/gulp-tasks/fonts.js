gulp.task('fonts', function () {
    return gulp.src(deps.fonts)
        .pipe(finalize('fonts'));
});