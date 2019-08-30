'use strict';
const gulp = require('gulp')
	, concat = require('gulp-concat')
	, less = require('gulp-less')
	, uglify = require('gulp-uglify-es').default
	, cleanCSS = require('gulp-clean-css')
	, del = require('del');

const paths = {
  styles: {
    src: 'src/res/css/*.css',
    dest: 'dist/css/'
  },
  fontawesome: {
    src: 'src/res/fontawesome/*.css',
    dest: 'dist/css/'
  },
  images: {
    src: 'src/res/img/*',
    dest: 'dist/img/'
  },
  fonts: {
    src: 'src/res/fonts/*',
    dest: 'dist/fonts/'
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

function fontawesome() {
  return gulp.src(paths.fontawesome.src)
    .pipe(less())
    .pipe(cleanCSS())
	.pipe(concat('fontawesome.css'))
    .pipe(gulp.dest(paths.fontawesome.dest));
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

function fonts() {
  return gulp.src(paths.fonts.src)
	//do i do anything to process these?
    .pipe(gulp.dest(paths.fonts.dest));
}

const build = gulp.parallel(styles, scripts, images, fonts, fontawesome);

module.exports.clean = clean;
module.exports.default = build;
