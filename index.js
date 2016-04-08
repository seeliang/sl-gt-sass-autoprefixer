
module.exports = function(gulp, options) {
  var sass = require('gulp-sass'),
    importCss = require('gulp-import-css'),
    cleanCss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    path = require('path'),
    sassFolder = (typeof options.sassFolder !== 'undefined')
    ? options.sassFolder : 'assets/scss',
    cssFolder = (typeof options.cssFolder !== 'undefined')
    ? options.cssFolder : 'build/css',
    outputName = (typeof options.outputName !== 'undefined')
    ? options.outputName : 'main',
    prefixerSet = (typeof options.prefixerSet !== 'undefined')
    ? options.prefixerSet : {"browsers": ["> 2%"]},
    cleanCssSet = (typeof options.cleanCssSet !== 'undefined')
    ? options.cleanCssSet : {compatibility: 'ie9'},
    sassPath = path.resolve(__dirname, '../../' + sassFolder),
    cssPath = path.resolve(__dirname, '../../' + cssFolder),
    bulkSass = require('gulp-sass-bulk-import');

  console.log(
    'Watching folder <' + sassPath + '>'
  + '\n' + 'Css output file <' + cssPath + '/'+ outputName +'.css>'
  + '\n' + 'autoprefixer set <' + JSON.stringify(prefixerSet) + '>'
  + '\n' + 'cleanCss set <' + JSON.stringify(cleanCssSet) + '>'
  );

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
          "autoprefixer": prefixerSet
          }))
        .pipe(importCss())
        .pipe( gulp.dest(cssPath) );
  });

  gulp.task('watch', function() {
    gulp.watch([sassPath + '/**/*.scss'],['css']);
  });

  gulp.task('min-css', function(){
    return gulp.src(cssPath + '/' + outputName + '.css')
      .pipe(cleanCss(cleanCssSet))
      .pipe(rename({
              suffix: '-min'
          }))
      .pipe(gulp.dest(cssPath));
  });

  gulp.task('sass-watch', ['css','watch']);
}
