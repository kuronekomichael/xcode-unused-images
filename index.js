var fs = require('fs');
var Finder = require('./libs/finder');
var HtmlFactory = require('./libs/html-factory');
var grep = require('./libs/grep');
var colors = require('colors');

if (!process.env.TARGET_XCODE_PROJECT_PATH) {
    console.error('Must set environment variable:\n\texport TARGET_XCODE_PROJECT_PATH=/path/to/xcode-project');
    process.abort();
}

// ファイルをリストアップ
var pngSets = Finder.find(process.env.TARGET_XCODE_PROJECT_PATH, Finder.PNG_SETS);
var userFiles = Finder.find(process.env.TARGET_XCODE_PROJECT_PATH, /\.(m|mm|h|plist|cpp|html|css|plist|storyboard|xib)$/i);

// pngファイル名を含むかgrep
var pngNum = 0;
for (var key in pngSets) {
    pngNum++;
    var isUsed = grep(new RegExp(key, "mi"), userFiles);
    pngSets[key].used = isUsed;

    console.log("grep:", key, isUsed ? '✔'.green : '✖'.red);
}

fs.writeFileSync('images.html', HtmlFactory.create(pngSets));
fs.writeFileSync('images.json', JSON.stringify(pngSets));

console.log('total ', pngNum, 'files.');
console.log('finished.');
