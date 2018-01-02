// Locals
var argv            = require('minimist')(process.argv.slice(2));

// Globals
global.gulp         = require('gulp');
global.browserSync  = require('browser-sync').create();

// Locals
var lazypipe        = require('lazypipe');

// CLI options
global.enabled = {
  // Disable source maps when `--prod`
  maps: !argv.prod,
  // Fail styles task on error when `--prod`
  failStyleTask: argv.prod,
  // Fail due to JSHint warnings only when `--prod`
  failESHint: argv.prod,
  // Strip debug statments from javascript when `--prod`
  stripJSDebug: argv.prod,
  // Minify CSS and JS when `--prod`
  minify: argv.prod,
  // Generate POT file when '--prod'
  generatePOT: argv.prod,
  // Watch PHP and Twig files and generate .pot on save when '--pot'
  watchPOT: argv.pot,
};

global.config = require('./config.json'),
global.deps   = config.dependencies,
global.paths  = config.paths;

// ### Finalize component build process
global.finalize = function (directory) {
  return lazypipe()
      .pipe(gulp.dest, paths.dist + directory)
      .pipe(browserSync.stream)();
};

require('require-dir')('./gulp-tasks');
