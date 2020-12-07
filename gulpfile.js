const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function(done){
    // stream
    gulp.src('./app/scss/*.scss') //タスクで処理するソースの指定
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) //処理させるモジュールを指定
    .pipe(gulp.dest('./public/css/')); //保存先を指定

    console.log('sass compile');
    done();
});

gulp.task('watch', function(done){
    gulp.watch('./app/scss/*.scss', gulp.task('sass'));
    //watch task
    console.log('gulp watch start');
    done();
});

//defaultタスクは、タスク名を指定しなかったときに実行されるタスクです。
gulp.task('default', gulp.series(gulp.parallel('sass')));
