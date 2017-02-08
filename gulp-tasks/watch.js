gulp.task('watch', function() {
    gulp.start('build');
    browserSync.init({
        files: config.watch,
        proxy: config.devUrl,
        notify: false
    });

    gulp.watch('config.json', ['build']);
    gulp.watch(paths.source + 'images/**/*', ['images']);
    gulp.watch(paths.source + 'fonts/**/*', ['fonts']);
    gulp.watch(paths.source + 'scripts/**/*', ['scripts']);
    gulp.watch(paths.source + 'styles/**/*', ['styles']);
});
