var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var runseq = require('run-sequence');
var merge = require('merge-stream');
var shrinkwrap = require('gulp-shrinkwrap');
var del = require('del');
var debug = require('gulp-debug');
var vinylPaths = require('vinyl-paths');

var paths = {
    typescripts : {
        src : ['src/**/*.ts'],
        ts_config : ['src/tsconfig.json'],
        out : ['src/**/*.js', 'src/**/*.js.map'],
        dev_dest : 'src',
        package_dest : 'build',
        package_clean : ['build/**/*'],
        package_out : ['build/**/*.js']
    }
};

gulp.task('compile:typescript', function () {
    var tsProject = ts.createProject('src/tsconfig.json', { sortOutput: true });
    
    return tsProject.src({ base: "" }).pipe(debug({ title: 'src:' }))
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject)).js
    .pipe(sourcemaps.write('.', 
        {
        sourceRoot: function (file) { return ''; }, 
        includeContent: false
    }))
    .pipe(gulp.dest(paths.typescripts.dev_dest)).pipe(debug({ title: 'out:' }));
});

gulp.task('watch', ['compile:typescript'], function () {
    gulp.watch(paths.typescripts.src, ['compile:typescript']);
});

gulp.task('clean', function () {
    return gulp.src(paths.typescripts.out.concat(paths.typescripts.package_clean))
    .pipe(vinylPaths(del)).pipe(debug({ title: 'del:' }));
});

gulp.task('rebuild', function (callback) {
    return runseq('clean', 'compile:typescript', callback);
});

gulp.task('package', function () {
    var exportSrcFiles = paths.typescripts.out.concat(['!' + paths.typescripts.ts_config[0]]);
    var copySrcTask = gulp.src(exportSrcFiles)
    .pipe(debug({ title: 'src:' }))
    .pipe(gulp.dest(paths.typescripts.package_dest + '/' + paths.typescripts.dev_dest))
    .pipe(debug({ title: 'des:' }));
    var copyNpmPackageJsonTask = gulp.src(['package.json'])
    .pipe(debug({ title: 'src:' }))
    .pipe(gulp.dest(paths.typescripts.package_dest))
    .pipe(debug({ title: 'des' }));
    
    var shrinkwarpNpmTask = gulp.src('package.json')
    .pipe(shrinkwrap())
    .pipe(gulp.dest(paths.typescripts.package_dest))
    .pipe(debug({ title: 'des' }));
    
    return merge(copySrcTask, copyNpmPackageJsonTask, shrinkwarpNpmTask);
});

gulp.task('compress', function () {
    return gulp.src(paths.typescripts.package_out).pipe(debug({ title: 'origin:' }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify()).pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.typescripts.package_dest))
    .pipe(debug({ title: 'compressed:' }));
});

gulp.task('build', function (callback) {
    return runseq('clean', 'compile:typescript', 'package', callback);
});

gulp.task('build:compress', function (callback) {
    return runseq('clean', 'compile:typescript', 'package', 'compress', callback);
});


gulp.task('default', function (callback) {
    return runseq('compile:typescript', callback);
});
