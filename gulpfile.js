var gulp 				 = require('gulp'),
		imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
		pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
		imgCompress  = require('imagemin-jpeg-recompress'),
		cache        = require('gulp-cache');

gulp.task('image-min', function() {
	return gulp.src(['images/**/*']) // Берем все изображения
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			pngquant(),
			imgCompress({
				loops: 4,
				min: 70,
				max: 80,
				quality: 'middle'
			}),
			imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
			})
		],{
			verbose: true
		}))
		.pipe(gulp.dest('images-min')); // Выгружаем на продакшен
});

gulp.task('clear-cache', function(){
	cache.clearAll();
});

gulp.task('default', gulp.parallel('image-min'));
	