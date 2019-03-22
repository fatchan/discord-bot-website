'use strict';
var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify-es').default;
var cleanCSS = require('gulp-clean-css');
var del = require('del');

var paths = {
  styles: {
    src: 'src/res/css/*.css',
    dest: 'dist/css/'
  },
  images: {
    src: 'src/res/img/*',
    dest: 'dist/img/'
  },
  scripts: {
    src: 'src/res/js/*.js',
    dest: 'dist/js/'
  }
};

function clean() {
  return del([ 'dist' ]);
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

function images() {
  return gulp.src(paths.images.src)
	//maybe i imagemin here at some point?
    .pipe(gulp.dest(paths.images.dest));
}

const build = gulp.parallel(styles, scripts, images);

module.exports.clean = clean;
module.exports.default = build;
