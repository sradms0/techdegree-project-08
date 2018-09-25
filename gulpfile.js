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
        .pipe(concat('all.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], () => {
    return gulp.src(['js/all.js'])
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('scripts', ['minifyScripts'], () => {
    return gulp.src(['js/all.min.js'], {base: './js'})
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('concatStyles', () => {
    return gulp.src(['sass/global.scss'])
        .pipe(maps.init())
        .pipe(concat('all.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'));
});


gulp.task('styles', () => {
    return gulp.src('sass/global.scss')
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('all.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/styles'));
})

gulp.task('clean', () => {
    del(['dist', 'js/all*']);
})
