var gulpSequence = require('gulp-sequence').use(gulp);

gulp.task('build', function(callback){
    gulpSequence('images', 'fonts', 'scripts', 'styles')(callback);
});