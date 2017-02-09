var path = "D:/go/2016/1226/ball/image/";  //项目绝对路径

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
  spriter = require('gulp-css-spriter'),
  assetRev = require('gulp-asset-rev');
// js合并压缩 
gulp.task('js', function(){
  gulp.src(path+'/js/*.js')
    .pipe(uglifyjs('main.min.js', {
      mangle: true,
      output: {
        beautify: false
      }
    }))
    .pipe(gulp.dest(path+'/js'));
});

// css合并压缩
gulp.task('css', function(){
  	gulp.src(path+'/css/*.css')
    .pipe(concat('all.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(gulp.dest(path+'./css'));
});

// 图片压缩
gulp.task('img', function () {
   gulp.src(path+'/**/*')
    .pipe(gulp.dest(path+'/'))
    .pipe(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo(),mozjpeg({quality: '60'}),
        pngquant({quality: '60-80'})]))
    .pipe(gulp.dest(path+'/'));
});

// 浏览器自动刷新
gulp.task('browser-sync',function(){
	var files = [
    	path+'/**/*.html',
    	path+'/**/*.css',
    	path+'/**/*.js'
  	];
  	browserSync.init(files,{
	    server: {
	      baseDir: path+"/"
	    }
  	});
});

//sass编译
gulp.task('sass', function () {
  return gulp.src(path+'/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path+'/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(path+'./css/**/*.scss', ['sass']);
});

// compass编译
gulp.task('compass', function() {
  gulp.src(path+'/css/**/*.scss')
    .pipe(compass())
    .pipe(gulp.dest(path+'/css'));
});
gulp.task('compass:watch', function () {
  gulp.watch(path+'./css/**/*.scss', ['compass']);
});


// css sprite
gulp.task('css_sprite', function() {
  return gulp.src(path+'/css/**/main.css')
      .pipe(spriter({
        'spriteSheet':path+'/image/sprite.png',
        'pathToSpriteSheetFromCSS': '../image/sprite.png'
      }))
      .pipe(gulp.dest(path+'/css'));
});


// 生成jpg雪碧图
gulp.task('sprite-jpg', function () {
  var spriteData = gulp.src(path+'/*.jpg').pipe(spritesmith({
    imgName: 'sprite.jpg',
    cssName: 'sprite.css',
    algorithm:'left-right',
    padding:0
  }));
  return spriteData.pipe(gulp.dest(path+'/sprite/'));
});


// 生成png雪碧图
gulp.task('sprite-png', function () {
  var spriteData = gulp.src(path+'/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm:'left-right',
    padding:0
  }));
  return spriteData.pipe(gulp.dest(path+'/sprite/'));
});

gulp.task('revJs', function(){
  gulp.src(path+'/js/**/*.js')
  .pipe(assetRev())
  .pipe(gulp.dest(path+'/js'));
});

gulp.task('revCss', function(){
  gulp.src([path+'/css/**/*.css',path+'/css/**/*.scss',path+'/css/**/*.less'])
  .pipe(assetRev())
  .pipe(gulp.dest(path+'/css'));
});

//加版本号
gulp.task('rev', ['revJs', 'revCss'], function(){
  gulp.src([path+'/*.html']) 
  .pipe(assetRev())
  .pipe(gulp.dest(path+'/'));
});

gulp.task('default',['browser-sync','compass:watch']); //定义默认任务
