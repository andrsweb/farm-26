import gulp from 'gulp'

// Plugins.
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import newer from 'gulp-newer'
import webp from 'gulp-webp'

// Config.
import path from '../config/path'

const img = () => {
	return gulp.src( path.img.src )
		.pipe( plumber( {
			errorHandler: notify.onError( error => ( {
				title	: 'ERROR IN IMAGES',
				message	: error.message
			} ) )
		} ) )
		.pipe( newer( path.img.dest ) )
		.pipe( webp() )
		.pipe( gulp.dest( path.img.dest ) )
		.pipe( gulp.src( path.img.src ) )
		.pipe( newer( path.img.dest ) )
		.pipe( gulp.dest( path.img.dest ) )
}

export default img