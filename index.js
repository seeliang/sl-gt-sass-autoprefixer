
module.exports = function(gulp) {
  var sass = require('gulp-sass'),
    importCss = require('gulp-import-css'),
    cleanCss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    path = require('path'),
    outputName = 'main',
    sassFolder = 'assets/scss',
    cssFolder = 'build/css',
    sassPath = path.resolve(__dirname, '../../' + sassFolder),
    cssPath = path.resolve(__dirname, '../../' + cssFolder),
    bulkSass = require('gulp-sass-bulk-import');

  function resumeError (error) {
    // http://stackoverflow.com/a/23973536
    console.log(error.toString());
    this.emit('end');
  }

  gulp.task('css', function() {
      return gulp
              .src(sassPath + '/' + outputName + '.scss')
              .pipe(bulkSass())
              .pipe(
                  sass({
                      includePaths: [sassPath]
                  }))
                  .on('error', resumeError)
              .pipe(autoprefixer({
                "autoprefixer": {"browsers": ["> 2%"]}
                }))
              .pipe(importCss())
              .pipe( gulp.dest(cssPath) );
  });

  gulp.task('watch', function() {
    gulp.watch([sassPath + '/**/*.scss'],['css']);
  });

  gulp.task('min-css', function(){
    return gulp.src(cssPath + '/' + outputName + '.css')
      .pipe(cleanCss({compatibility: 'ie8'}))
      .pipe(rename({
              suffix: '-min'
          }))
      .pipe(gulp.dest(cssPath));
  });

  gulp.task('sass-watch', ['css','watch']);
}
