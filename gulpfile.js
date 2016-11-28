var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    cssnano         = require('gulp-cssnano'),
    concat          = require('gulp-concat'),
    sourceMaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    gulpSequence    = require('gulp-sequence').use(gulp),
    plumber         = require('gulp-plumber'),
    clean           = require('gulp-clean'),
    dotenv          = require('dotenv').config(),	 
    notify          = require("gulp-notify"),
    gulpif          = require('gulp-if');
    argv            = require('minimist')(process.argv.slice(2)),
    filelog         = require('gulp-filelog'),
    jshint          = require('gulp-jshint');

var prod    = argv.production,
    lintjs  = argv.lintjs;

var config  = require('./assets/config.json'),
    css     = config.dependencies.css,
    js      = config.dependencies.js,
    paths   = config.paths;

var sources = function(list){
    var sources = [];
    list.forEach(function(dep) {
        sources.push(paths.source + dep);
    });
    return sources;
};

gulp.task('images', function () {
    gulp.src(paths.source + 'images/**/*')
        .pipe(gulpif(prod, imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.dist + 'images'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src(paths.source + 'fonts/**/*')
        .pipe(gulp.dest(paths.dist + 'fonts'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {

    return gulp.src(sources(js.files))
        .pipe(gulpif(lintjs, jshint()))
        .pipe(gulpif(lintjs, jshint.reporter('default')))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(concat(js.name))
        .pipe(gulpif(prod, uglify()))
        .pipe(gulp.dest(paths.dist + 'scripts' ))
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {

    return gulp.src(sources(css.files))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulpif(!prod, sourceMaps.init()))
        .pipe(gulpif('*.scss', sass({
            errLogToConsole: true,
            includePaths: ['.']
        })))
        .pipe(autoprefixer({
            browsers: autoPrefixBrowserList,
            cascade:  true
        }))
        .pipe(gulpif(!prod, sourceMaps.write()))
        .pipe(gulpif(prod, cssnano()))
        .pipe(concat(css.name))
        .pipe(gulp.dest(paths.dist + 'styles' ))
        .pipe(browserSync.stream());
});

gulp.task('default', function(callback){
    gulpSequence('clean', 'images', 'fonts', 'scripts', 'styles')(callback)
});

gulp.task('clean', function () {
	return gulp.src(paths.dist, {read: false} )
        .pipe(clean());
});

gulp.task('watch', ['default'], function() {
    browserSync.init({
        files: config.watch,
        proxy: config.devUrl,
        notify: false
    });

    gulp.watch(paths.source + 'config.json', ['default']);
    gulp.watch(paths.source + 'images/**/*', ['images']);
    gulp.watch(paths.source + 'fonts/**/*', ['fonts']);
    gulp.watch(paths.source + 'scripts/**/*', ['scripts']);
    gulp.watch(paths.source + 'styles/**/*', ['styles']);
});
