var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

// Set default watch task 
gulp.task('default', ['watch']);

// SASS
gulp.task('build-css', function(){
	return sass('./assets/sass/master.scss', {style: 'compressed'})		
		.on('error', sass.logError)
		.pipe(concat('latestNews.css'))
		.pipe(gulp.dest('assets/dist/css/'));
});

// JS
gulp.task('build-js', function(){
	return gulp.src(['./assets/js/**/*.js'])
		.pipe(concat('latestNews.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/dist/js/'));
});


// Configure watch task 
gulp.task('watch', function(){	
	gulp.watch('./assets/sass/**/*.scss', ['build-css']);
	gulp.watch('./assets/js/**/*.js', ['build-js']);
});

