var Finder = require('../libs/finder'),
    HtmlFactory = require('../libs/html-factory'),
    grep = require('../libs/grep');

describe('', function() {
    it('結果に含まれる', function() {
        // ファイルをリストアップ
        var pngSets = Finder.find('./test-data/ok/', Finder.PNG_SETS);
        var userFiles = Finder.find('./test-data/ok/', /\.txt$/i);

        // pngファイル名を含むかgrep
        var pngNum = 0;
        var isUsed = false;
        for (var key in pngSets) {
            pngNum++;
            isUsed = grep(new RegExp(key, "mi"), userFiles);
        }
        expect(pngNum).to.equal(1);
        expect(isUsed).to.be.true;
    });
    it('結果に含まれない', function() {
        // ファイルをリストアップ
        var pngSets = Finder.find('./test-data/ng/', Finder.PNG_SETS);
        var userFiles = Finder.find('./test-data/ng/', /\.txt$/i);

        // pngファイル名を含むかgrep
        var pngNum = 0;
        var isUsed = true;
        for (var key in pngSets) {
            pngNum++;
            isUsed = grep(new RegExp(key, "mi"), userFiles);
        }
        expect(pngNum).to.equal(1);
        expect(isUsed).to.be.false;

    });

});
