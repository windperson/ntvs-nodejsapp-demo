var gulp = require('gulp');
var tsc = require('gulp-tsc');
var runseq = require('run-sequence');
var del = require('del');
var debug = require('gulp-debug');
var vinylPaths = require('vinyl-paths');

var paths = {
    typescripts : {
        src : ['Scripts/**/*.d.ts', 'src/**/*.ts'],
        out : ['src/**/*.js', 'src/**/*.js.map'],
        dev_dest : './',
        package_dest : 'build',
        package_clean : ['build/**/*']
    }
};

gulp.task('compile:typescript', function () {
    return gulp.src(paths.typescripts.src)
    .pipe(tsc({
        module: "CommonJS",
        target: "ES5",
        sourcemap: true
    })).pipe(gulp.dest(paths.typescripts.dev_dest));
});

gulp.task('clean', function () {
    return gulp.src(paths.typescripts.out.concat(paths.typescripts.package_clean))
    .pipe(vinylPaths(del)).pipe(debug({ title: 'delete:' }));
});

gulp.task('rebuild', function (callback) {
    return runseq('clean', 'compile:typescript', callback);
});

gulp.task('package', function () {
    return gulp.src(paths.typescripts.out)
    .pipe(debug({ title: 'src:' }))
    .pipe(gulp.dest(paths.typescripts.package_dest))
    .pipe(debug({ title: 'dest:' }))
});

gulp.task('build', function (callback) {
    return runseq('clean', 'compile:typescript', 'package', callback);
});

gulp.task('default', ['compile:typescript'])
