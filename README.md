# gulp-tool
## 基于gulp的自义定的构建工具 ##

###包括以下功能

1. css、js合并压缩。
2. 图片压缩（支持jpg、png、gif压缩）
3. 保存代码时浏览器自动刷新
4. sass编译
5. 生成雪碧图（默认雪碧图从左到右排列）

### 使用方法

1. 安装gulp [http://www.ydcss.com/archives/18](http://www.ydcss.com/archives/18)
2. 修改gulpfile.js 中第一行 var path = "项目本地绝对路径"，如：`var path = "D:/go/2017/0101/app/";`
3. 根据需求执行如需命令

    	gulp  //默认执行 sass实时编译、保存代码时浏览器自动刷新
    	gulp css  //css合并压缩，生成all.min.css
    	gulp js   //js 合并压缩，生成 main.min.css
		gulp img  // 压缩目录下的所有图片
    	gulp sass // sass编译
		gulp sass:watch // 实时编译sass
        gulp sprite-jpg //生成jpg雪碧图，序列帧图片需要放到与index.html同级目录下，生成的雪碧图默认在根目录下sprite文件夹中，雪碧图从左到右依次排列。
		gulp sprite-png // 生成png雪碧图，其他同上。
 	    gulp browser-sync  //保存代码时浏览器自动刷新 
