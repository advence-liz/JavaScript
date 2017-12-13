"use strict"
//导入工具包 require('node_modules里对应模块')
const gulp = require("gulp"), //本地安装gulp所用到的地方
    del = require("del"),
    argv = require('yargs').argv,
    path = require('path'),
    Q = require('q'),
    git = require('gulp-git'),
    webpack = require("webpack"),
    gutil = require("gulp-util"),
    less = require("gulp-less"),
    exec = require('child_process');
const dist ="dist",
      build= 'build';

/**
 * @var {Object} JSWebpackEntry webpack javascript enrty oputput config
 */
let JSWebpackEntry = {
    entry: {
        dust: './js'
    },
    output: {
        path: path.resolve(__dirname, build),
        filename: "[name].js"
    }
};
/**
 * 构建webpack task （虽然也可以在webpack传入数组构建多个task） 
 * @param {Object} customConfig 自定义webpack 配置部分主要是 入口出口
 * @param {Deferred} deferred 外部传入的 deferred 对象，在此方法内定义 deferred 并不好使所以从外部传入了
 * @example
 * gulp.task('js', function () {
 *     let deferred = Q.defer();
 *     getWebpackTask(JSIO, deferred);
 *     //deferred.promise.then(function () {})
 *     return deferred.promise;
 * });
 */

function getWebpackTask(customConfig, deferred) {

    let webpackConfig = require("./webpack.config");
    let currentConfig = Object.assign(Object.create(null), webpackConfig, customConfig);

    webpack(currentConfig, (err, stats) => {
        if (err) {
            if (err.details) {
                console.error(err.details);
            }
            deferred.reject();
            throw (err.stack || err);
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);

        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings);

        }
        console.log(stats.toString({
            chunks: false,  // 使构建过程更静默无输出
            colors: true    // 在控制台展示颜色
          }));
        deferred.resolve();
    });

}


gulp.task('js', function () {
    let deferred = Q.defer();
    getWebpackTask(JSWebpackEntry, deferred);
    //deferred.promise.then(function () {})
    return deferred.promise;
});

// Run git commit 
// src are the files to commit (or ./*) 
// 原来 . equal ./* equal ./
// ./** equal ./**/*
gulp.task('commit', function(){
    return gulp.src(path.join('sources','**'))
      .pipe(git.commit('auto commit!'));
  });

// Run git add 
// src is the file(s) to add (or ./*) 
// git add . 是穿透子目录的并不只是一级 看来git 插件 gulp.src 遵守的是 git 的匹配规则 ，并不是glob 可能只是为了形式统一
gulp.task('add', function(){
    del.sync("src/**/*");
    return gulp.src('.')
      .pipe(git.add())
      .on('error',gutil.log);
  });

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options])处理完后文件生成路径

// gulp 只有你需要熟知的参数标记，其他所有的参数标记只在一些任务需要的时候使用。

// -v 或 --version 会显示全局和项目本地所安装的 gulp 版本号
// --require <module path> 将会在执行之前 reqiure 一个模块。这对于一些语言编译器或者需要其他应用的情况来说来说很有用。你可以使用多个--require
// --gulpfile <gulpfile path> 手动指定一个 gulpfile 的路径，这在你有很多个 gulpfile 的时候很有用。这也会将 CWD 设置到该 gulpfile 所在目录
// --cwd <dir path> 手动指定 CWD。定义 gulpfile 查找的位置，此外，所有的相应的依赖（require）会从这里开始计算相对路径
// -T 或 --tasks 会显示所指定 gulpfile 的 task 依赖树
// --tasks-simple 会以纯文本的方式显示所载入的 gulpfile 中的 task 列表
// --color 强制 gulp 和 gulp 插件显示颜色，即便没有颜色支持
// --no-color 强制不显示颜色，即便检测到有颜色支持
// --silent 禁止所有的 gulp 日志
// 命令行会在 process.env.INIT_CW 中记录它