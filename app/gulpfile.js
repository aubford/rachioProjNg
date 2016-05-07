var gulp = require('gulp')
var less = require('gulp-less')
var nodemon = require('gulp-nodemon')

gulp.task('npmInstall', function(){
  
})

gulp.task('compile-less', function(){
  gulp.src('./public/css/main.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'))
})

gulp.task('watch-less', function(){
  gulp.watch('./public/css/*.less', ['compile-less'])
})

gulp.task('nodemon', function(){
  nodemon()
})

gulp.task('default', ['compile-less', 'watch-less', 'nodemon'])
