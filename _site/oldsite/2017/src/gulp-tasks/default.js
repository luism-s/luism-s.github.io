// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --prod`.
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
