/*
*	Task Automation to make my life easier.
*	Author: Jean-Pierre Sierens
*	===========================================================================
*/
 
// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var nodemon = require('gulp-nodemon');
 
// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
  	'react-dom'
];
// keep a count of the times a task refires
var scriptsCount = 0;
 
// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function () {
    bundleApp(false);
});
 
gulp.task('deploy', function (){
	bundleApp(true);
});

gulp.task('copy-static', function(){
  gulp.src(['./index.html'])
    .pipe(gulp.dest('static/'));
  gulp.src('app/styles/*.css')
    .pipe(gulp.dest('static/css/'));
});
 
gulp.task('watch', function () {
	gulp.watch(['./app/**/*.js'], ['scripts']);
  gulp.watch(['./app/styles/*.css'], ['copy-static']);
});
 
gulp.task('serve', function() {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: 'server.js',
        // this listens to changes in any of these files/routes and restarts the application
        watch: ["server.js", "api/**/**"],
        ext: 'js'
    });
});
 
// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['scripts', 'copy-static', 'watch', 'serve']);

// gulp.task('deploy', ['scripts', 'copy-static', 'serve']);
 
// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
	scriptsCount++;
	// Browserify will bundle all our js files together in to one and will let
	// us use modules in the front end.
	var appBundler = browserify({
    	entries: 'app/app.js',
    	debug: true
  	})
 
	// If it's not for production, a separate vendors.js file will be created
	// the first time gulp is run so that we don't have to rebundle things like
	// react everytime there's a change in the js file
  	if (!isProduction && scriptsCount === 1){
  		// create vendors.js for dev environment.
  		browserify({
			require: dependencies
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
      .pipe(streamify(uglify()))
			.pipe(gulp.dest('static/js/'))
      .on('error', gutil.log);
  	}
  	if (!isProduction){
  		// make the dependencies external so they dont get bundled by the 
		// app bundler. Dependencies are already bundled in vendor.js for
		// development environments.
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}
 
  	appBundler
  		// transform ES6 and JSX to ES5 with babelify
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest('static/js/'))
      .on('error', gutil.log);
}