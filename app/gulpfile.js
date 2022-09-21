const {watch,series,parallel} = require("gulp");
const browserSync = require("browser-sync").create();
const exec = require('child_process').exec;

// browserSyncを最初に初期化しておきます。
function initBrowserSync(cb) {
    browserSync.init({
        open: false,
        server:{
            baseDir:["_build/html"],
            index: 'index.html'
        }
    })
    cb()
}

// リロード処理
function reload(cb) {
    browserSync.reload();
    cb()
}

// 監視処理
// 終了させない
function watchfile() {
    watch(['page/**/*.rst', '*.rst'], { usePolling : true }, series(makehtml,reload))
}

// make htmlの実行
function makehtml(cb) {
    exec("make html", (err,stdout,stderr) => {
        console.log(stdout)
    })
    cb()
}

exports.default = series(makehtml, parallel(initBrowserSync, watchfile, reload));