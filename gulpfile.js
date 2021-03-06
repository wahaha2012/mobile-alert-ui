var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clc = require('cli-color');
var Deferred = require('promise-deferred');

function logErr(err){
    var errMsg = clc.red(err);
    console.log(errMsg);
}

function jsUglify(){
    return gulp.src('./bundle.js')
        .pipe(uglify({
            preserveComments:'some'
        }))
        // .pipe(rename('bundle.min.js'))
        .on('error', logErr)
        .pipe(gulp.dest('./'));
}

function writeFile(filePath, fileDataStr){
    var deferred = new Deferred(),
        data = new Buffer(fileDataStr),
        folderPath = path.dirname(filePath);

    try{
        if(!fs.existsSync(folderPath)){
            mkdirp(folderPath);
        }
        fs.writeFileSync(filePath, data);

        // console.log(filePath + " updated!");

        deferred.resolve();
    }catch(err){
        logErr('update error', err);
        deferred.reject();
    }

    return deferred.promise;
}

function readFile(filePath){
    var deferred = new Deferred();
    fs.readFile(filePath,'utf-8', function(err, fileDataStr){
        deferred.resolve(fileDataStr);
    });

    return deferred.promise;
}

gulp.task('less', function(){
    return gulp.src('src/less/*.less')
            .pipe(less())
            .pipe(cssmin())
            .on('error', logErr)
            .pipe(gulp.dest('src/css/'));
});

gulp.task("bundle", ["less"], function(){
    var temp = '',
        output = './bundle.js';
    readFile('./src/css/alert.css').then(function(fileStr){
        temp = fileStr;

        return readFile('./src/js/css.js');
    }).then(function(fileStr){
        temp = fileStr.replace('{{{css}}}', temp);

        return readFile('./src/js/alert.js');
    }).then(function(fileStr){
        temp = fileStr.replace('{{{style}}}', temp);

        return readFile('./src/js/index.js');
    }).then(function(fileStr){
        temp = fileStr.replace("'{{{factory}}}'", temp);

        return writeFile(output, temp);
    }).then(function(){
        jsUglify();
        console.log(output + ' updated!');
    });
});

gulp.task('watch', function(){
    gulp.watch(['src/less/*.less'], ['less']);
});

gulp.task('default', ['bundle']);