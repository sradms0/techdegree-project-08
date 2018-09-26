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

const sassSources = ['sass/**/*.scss'],
        jsSources = ['js/jquery.js', 'js/circle/**'],
        imgSources = ['images/*'],
        htmlSources = ['*.html'];

gulp.task('html', () => {
    return gulp.src(htmlSources)
        .pipe(gulp.dest('dist'))
});

gulp.task('scripts', () => {
    return gulp.src(jsSources)
        .pipe(maps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(connect.reload());
});

gulp.task('styles', () => {
    return gulp.src(sassSources)
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('all.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(connect.reload());
});

gulp.task('images', () => {
    return gulp.src(imgSources)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'));
});

gulp.task('watch', (done) => {
    gulp.watch(jsSources, gulp.series('scripts'));
    gulp.watch(sassSources, gulp.series('styles'));
    done();
});

gulp.task('clean', () => {return del(['dist'])});
gulp.task('build', gulp.series('clean', gulp.parallel('html', 'scripts', 'styles', 'images')));

gulp.task('connect', (done) => {
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
    done();
});

gulp.task('default', gulp.series('build', 'connect', 'watch'));
