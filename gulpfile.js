// Local
var argv            = require('minimist')(process.argv.slice(2));

// Globals
global.gulp         = require('gulp');
global.plumber      = require('gulp-plumber');
global.notify       = require('gulp-notify');
global.gulpif       = require('gulp-if');
global.filelog      = require('gulp-filelog');
global.lazypipe     = require('lazypipe');
global.browserSync  = require('browser-sync');

global.prod    = argv.production,
global.lintjs  = argv.lintjs;

global.config  = require('./config.json'),
global.deps    = config.dependencies,
global.paths   = config.paths;

global.finalize = function (directory) {
    return lazypipe()
        .pipe(gulp.dest, paths.dist + directory)
        .pipe(browserSync.stream)();
};

require('require-dir')('./gulp-tasks');