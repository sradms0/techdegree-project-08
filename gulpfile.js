'use strict';

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del');

gulp.task('concatScripts', () => {
    return gulp.src(['js/jquery.js', 'js/circle/**'])
        .pipe(maps.init())
        .pipe(concat('global.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], () => {
    return gulp.src(['js/global.js'])
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('js'));
});
