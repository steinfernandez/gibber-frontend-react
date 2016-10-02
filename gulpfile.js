var gulp = require('gulp'),
    //uglify   = require('gulp-uglify'),
    notify     = require('gulp-notify'),
    babel      = require('gulp-babel'),
    browserify = require('browserify'),
    //tap       = require('gulp-tap'),
    buffer     = require('gulp-buffer'),
    source     = require('vinyl-source-stream'),
    babelify   = require('babelify')
//    mocha      = require('gulp-mocha')

// BUILD JS
gulp.task( 'js', function() {
  browserify({ debug:true, standalone:'App' })
    .transform( babelify, { presets:['react'] })     // Transforms to EC5
    .require( './js/app.jsx', { entry: true } )      // Loads Library Requirements
    .bundle()                                         // Concatenates
    .pipe( source('index.js') )               // Makes a Library to be used client-side
    .pipe( gulp.dest( './' ) )
    .pipe(
      notify({
        message:'Build has been completed',
        onLast:true
      })
    )

  // For UNIT tests in node, we transpile (but do not browserify)
  // return gulp.src( './js/**.js' )
  //   .pipe( babel({ presets:['es2015'] }) )
  //   .pipe( gulp.dest('./dist' ) )

})
/*
// Unit Tests
gulp.task( 'test', ['js'], ()=> {                     // runs gulp.task('js') first
  return gulp.src('tests/interface.tests.js', {read:false})
    .pipe( mocha({ reporter:'nyan' }) )               // spec, min, nyan, list
})
*/
// Run Tests on any file change in js/ folder
gulp.task( 'watch', function() {
  gulp.watch( './js/**.js*', ['js'] )
})

gulp.task( 'default', ['js'] )
