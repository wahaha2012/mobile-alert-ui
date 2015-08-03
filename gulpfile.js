var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var clc = require('cli-color');

function logErr(err){
    var errMsg = clc.red(err);
    console.log(errMsg);
}

function writeFile(filePath, fileDataStr, callback){
    var data = new Buffer(fileDataStr);

    try{
        mkdirp(path.dirname(filePath));
        fs.writeFileSync(filePath, data);

        console.log(filePath + " updated!");

        callback && callback();
    }catch(err){
        logErr('update error', err);
    }
}

function readFile(filePath, callback){
    fs.readFile(filePath,'utf-8', function(err, fileDataStr){
        callback && callback(fileDataStr);
    });
}

gulp.task('less', function(){
    return gulp.src('src/less/*.less')
            .pipe(less())
            .pipe(cssmin())
            .on('error', logErr)
            .pipe(gulp.dest('src/css/'));
});

gulp.task("bundle", ["less"], function(){
    readFile('./src/css/alert.css', function(cssStr){
        readFile('./src/js/css.js', function(cssJsStr){
            readFile('./src/js/index.js', function(jsStr){
                cssJsStr = cssJsStr.replace("{{css}}", cssStr);
                jsStr = jsStr.replace("{{cssStyle}}", cssJsStr);
                writeFile('./bundle.js', jsStr);
            });
        });
    });
});

gulp.task('watch', function(){
    gulp.watch(['src/less/*.less'], ['less']);
});

gulp.task('default', ['bundle']);