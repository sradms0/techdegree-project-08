'use strict';

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect'),
    del = require('del');

gulp.task('scripts', () => {
    return gulp.src(['js/jquery.js', 'js/circle/**'])
        .pipe(maps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', () => {
    return gulp.src('sass/global.scss')
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('all.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('images', () => {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'));
});

gulp.task('build', ['clean', 'scripts', 'styles', 'images'], () => {
    return gulp.src('index.html', {base: './'})
        .pipe(gulp.dest('dist'));
})

gulp.task('clean', () => {
    del(['dist']);
})

gulp.task('connect', ['build'], () => {
    return connect.server({
        root: 'dist',
        livereload: true
    });
});
