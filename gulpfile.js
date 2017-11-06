var gulp = require("gulp");
var concat = require("gulp-concat");
var less = require("gulp-less");
var gutil = require("gulp-util");
var webpackConfig = require("./webpack.config.js");
var webpack = require("webpack");


gulp.task("build:LESS", function(){
    gulp.src("src/**/*.less")
        .pipe(concat("buildLess.css"))
        .pipe(less())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("build:dev_webpack", function(done){
    var excuteCB = true;
    var devConfig = Object.create(webpackConfig);
    devConfig.watch = true;
    return webpack(devConfig, function(err, stats){
        if(err) throw gutil.PluginError("webpack_dev", err);
        gutil.log("webpack_dev", stats.toString({
            colors : true
        }));
        if(excuteCB){
            excuteCB = false;
            done();
        }
    });
});

gulp.task('watch', function(){
    gulp.watch("src/**/*.less", ["build:LESS"]);
});

gulp.task("default", ["build:LESS", "build:dev_webpack", 'watch']);