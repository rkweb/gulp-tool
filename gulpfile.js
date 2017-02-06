var imgSrc = "C:/Users/renke/Desktop/imgmin/";
// var imgSrc = "E:/auto/2016/1017/invitation1/";
// var imgSrc = "C:/Users/renke/Desktop/instrument-panel/";

var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  rename = require('gulp-rename'),
  uglifyjs = require("gulp-uglifyjs"),
  minifyCss = require("gulp-minify-css"),
  sass = require("gulp-sass-china"),
  concat = require("gulp-concat"),
  compass = require('gulp-compass'),
  spritesmith = require('gulp.spritesmith'),
  imagemin = require('gulp-imagemin'),
  mozjpeg = require('imagemin-mozjpeg'),
  pngquant = require('imagemin-pngquant'),
  spriter = require('gulp-css-spriter');

// js合并压缩 
gulp.task('js', function(){
  gulp.src(imgSrc+'/js/*.js')
    .pipe(uglifyjs('main.min.js', {
      mangle: true,
      output: {
        beautify: false
      }
    }))
    .pipe(gulp.dest(imgSrc+'/js'));
});

// css合并压缩
gulp.task('css', function(){
  	gulp.src(imgSrc+'/css/*.css')
    .pipe(concat('all.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(gulp.dest(imgSrc+'./css'));
});

// 图片压缩
gulp.task('img', function () {
   gulp.src(imgSrc+'/**/*')
    .pipe(gulp.dest(imgSrc+'/'))
    .pipe(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo(),mozjpeg({quality: '60'}),
        pngquant({quality: '60-80'})]))
    .pipe(gulp.dest(imgSrc+'/'));
});

// 浏览器自动刷新
gulp.task('browser-sync',function(){
	var files = [
    	imgSrc+'/**/*.html',
    	imgSrc+'/**/*.css',
    	imgSrc+'/**/*.js'
  	];
  	browserSync.init(files,{
	    server: {
	      baseDir: imgSrc+"/"
	    }
  	});
});

//sass编译
gulp.task('sass', function () {
  return gulp.src(imgSrc+'/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(imgSrc+'/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(imgSrc+'./css/**/*.scss', ['sass']);
});

// compass编译
gulp.task('compass', function() {
  gulp.src(imgSrc+'/css/**/*.scss')
    .pipe(compass())
    .pipe(gulp.dest(imgSrc+'/css'));
});
gulp.task('compass:watch', function () {
  gulp.watch(imgSrc+'./css/**/*.scss', ['sass']);
});


// css sprite
gulp.task('css_sprite', function() {
  return gulp.src(imgSrc+'/css/**/main.css')
      .pipe(spriter({
        'spriteSheet':imgSrc+'/image/sprite.png',
        'pathToSpriteSheetFromCSS': '../image/sprite.png'
      }))
      .pipe(gulp.dest(imgSrc+'/css'));
});


// 生成jpg雪碧图
gulp.task('sprite-jpg', function () {
  var spriteData = gulp.src(imgSrc+'/*.jpg').pipe(spritesmith({
    imgName: 'sprite.jpg',
    cssName: 'sprite.css',
    algorithm:'left-right',
    padding:0
  }));
  return spriteData.pipe(gulp.dest(imgSrc+'/image/sprite/'));
});


// 生成png雪碧图
gulp.task('sprite-png', function () {
  var spriteData = gulp.src(imgSrc+'/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm:'left-right',
    padding:0
  }));
  return spriteData.pipe(gulp.dest(imgSrc+'/image/sprite/'));
});

gulp.task('default',['browser-sync','compass:watch']); //定义默认任务











