var file = require('file');
var path = require('path');

module.exports = {
    PNG_SETS: '.png',
    find: function(targetPath, type, cb) {
        if (type instanceof RegExp) {
            return this.findWithName(targetPath, type, cb);
        } else if (type === this.PNG_SETS) {
            return this.findImageSets(targetPath, type, cb);
        }
    },
    findWithName: function(targetPath, regExp) {
        var userFiles = [];
        file.walkSync(targetPath, function(dirPath, dirs, files) {
            files.filter(function(f) { return regExp.test(f); }).forEach(function(f) {
                userFiles.push(path.join(dirPath, f));
            });
        });
        return userFiles;
    },
    findImageSets: function(targetPath, type) {
        // ファイルのリストアップ
        var imageFiles = [];
        file.walkSync(targetPath, function(dirPath, dirs, files) {
            files.filter(function(f) { return /\.(png|gif|jpe?g)$/i.test(f); }).forEach(function(filename){
                imageFiles.push({
                    path: dirPath,
                    name: filename
                });
            })
        });

        var pngFiles = {};
        imageFiles.forEach(function(png) {
            if (path.extname(png.name) !== type) {
                return;
            }
            var matchRet = png.name.match(/([^@]+)(@2x)?\.png/);
            if (!matchRet) {
                console.error("Error!!!!!!!");
                return;
            }
            if (!pngFiles[matchRet[1]]) {
                pngFiles[matchRet[1]] = {
                    path: png.path + '/',
                    actual: null,   // @1x
                    twice: null,    // @2x
                    triple: null    // @3x
                };
            }
            if (!matchRet[2]) {
                pngFiles[matchRet[1]].actual = png.name
            } else if (matchRet[2] === '@2x') {
                pngFiles[matchRet[1]].twice = png.name
            } else if (matchRet[2] === '@3x') {
                pngFiles[matchRet[1]].triple = png.name
            } else {
                console.error("Error!!!!!!!");
                return;
            }
        });
        return pngFiles;
    }
};
