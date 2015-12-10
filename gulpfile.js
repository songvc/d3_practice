var gulp = require('gulp');
var browserSync = require('browser-sync');
var livereload = require("gulp-livereload");

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("js/*.js").on('change', browserSync.reload);

});

gulp.task('default', ['browser-sync']);