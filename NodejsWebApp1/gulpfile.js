var gulp = require('gulp');
var gutil = require('gulp-util');
var tsc = require('gulp-tsc');
var runseq = require('run-sequence');
var del = require('del');

var paths = {
    typescripts : {
        src : ['Scripts/**/*.d.ts', 'src/**/*.ts'],
        out : ['src/**/*.js','src/**/*.js.map'],
        dev_dest : './'
    }
};

gulp.task('compile:typescript', function () {
    gulp.src(paths.typescripts.src)
    .pipe(tsc({
        module: "CommonJS",
        target: "ES5",
        sourcemap: true
    })).pipe(gulp.dest(paths.typescripts.dev_dest));
});

gulp.task('clean', function () {
    del(paths.typescripts.out, function (err, paths) {
        if (paths && paths.length > 0) {
            gutil.log('Deleted files/folders:');
            gutil.log(paths.join('\n'));
        }
        else {
            gutil.log('Nothing to clean');
        }
    });
});

gulp.task('rebuild', function (callback) {
    runseq('clean', 'compile:typescript', callback);
});

gulp.task('package', function () {
    /* TODO: copy .js & .js.map to output location*/
});

gulp.task('publish', function (callback) {
    runseq('clean','compile:typescript', 'package', callback);
});

gulp.task('default',['compile:typescript'])
