'use strict';

// Each package is assigned a "variable" then called in with "require" 
	// * if you add any new ones try to keep the names simple and direct
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require ('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var del = require ('del');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');

// Error Function for plumber so it doesn't crash while compiling
var onError = function (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
};

// Creates JS compiled files
gulp.task('concatScripts', function(){
	// Insert .js files here
	return gulp.src([
		// Add aditional files here EX: 'loading.js',
		'assets/js/main.js'
	])
	// Creates a map for developer tools in the browser for debugging
	.pipe(maps.init())
	// Name of file you want to create
	.pipe(concat('app.js'))
	// Places a map for developer tools in the browser for debugging
	.pipe(maps.write('./'))
	// Destination folder 
	.pipe(gulp.dest('assets/js'));
});

// Creates minified .js file
gulp.task('minifyScripts', ['concatScripts'], function(){
	// Grabs the concated file from above
	return gulp.src('assets/js/app.js')
	//Sends data to be minified
	.pipe(uglify())
	// Renames new minified file
	.pipe(rename('app.min.js'))
	// Destination folder new minified file
	.pipe(gulp.dest('assets/js'));
});

// Compile Sass
gulp.task('compileSass', function(){
	// Location of the main Sass import you want
	return gulp.src('assets/scss/styles.scss')
	// Prevent crashes on error
	.pipe(plumber({ errorHandler: onError }))
	// Creates a map for developer tools in the browser for debugging
	.pipe(maps.init())
	//Sends data to be converted into Sass
	.pipe(sass())
	// Logs Error
	.on('error', console.error.bind(console))
	// Creates a map for developer tools in the browser for debugging
	.pipe(maps.write('./'))
	
	// Destination folder for compiled css
	.pipe(gulp.dest('assets/css'));
});

gulp.task('minify-css', ['compileSass'], function() {
  return gulp.src('assets/css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('assets/css'));
});

// Live reload for compiled Sass
gulp.task('sass-watch', ['compileSass'], browserSync.reload);

// Watches files for change and live reloads browser
gulp.task('watchFiles', function(){
	// Browser-Sync is the live reload functionality
		// * this is running with default parameters and will open a new window at localhost: 3000
			// * each new window will add to the 3000 +1 EX: localhost: 3001, localhost: 3002, etc...
	browserSync({
		server: {
			// Pulls html pages from the project directory
			baseDir:'./'
		}
		//To access other pages simply put HTML files into the project directory, then in your browser type the name of the file or file path after localhost: 3000
			// *EX: http://localhost:3000/example.html, http://localhost:3000/file-path/test.html
	});
	// Watches for Sass files
	gulp.watch('assets/scss/**/*.scss', ['sass-watch']);
	// Watches for the compiled .js file created above
	gulp.watch('assets/js/main.js', ['concatScripts']);
	// Watches and live reloads any changes to html files
	gulp.watch("*.html").on('change', browserSync.reload);
});

// Deletes all previously saved css and js files in the 'dist' folder 
gulp.task('clean', function(){
	del(['dist','assets/css/styles*css*', 'assets/js/app*.js*']);
});

// Builds site for production 
gulp.task('build', ['minifyScripts','minify-css'], function(){
	return gulp.src(['assets/css/styles.min.css', 'assets/js/app.min.js', '*.html', 'assets/images/**', 'assets/fonts/**'], { base: './'})
	// Places new files in 'dist' folder
	.pipe(gulp.dest('dist'));
});

// Start command that just watches files for development 
	//* right now placeholder for adding more tasks to array
gulp.task('start', ['watchFiles']);

// Deletes all previously saved files and builds site for production
gulp.task('publish', ['clean'], function(){
	gulp.start('build');
});

// Deletes all previously saved files and builds site for production
gulp.task('default', ['clean'], function(){
	gulp.start('build');
});