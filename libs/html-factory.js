module.exports = {
    create: function generateHtml(files) {
        var templatePrefix = '\
    <meta charset="UTF-8">\n\
    <style>\n\
        * {\n\
            font-size: 13px;\n\
        }\n\
        td {\n\
            background-color: #f5f5f5;\n\
        }\n\
        th {\n\
            background-color: #3399cc;\n\
            color: white;\n\
        }\n\
        em {\n\
            font-weight: bold;\n\
            color: red;\n\
        }\n\
    </style>\n\
    <table cellspacing="0" cellpadding="5" border=1>\n\
        <tbody>\n\
        <tr>\n\
            <th>No.</th>\n\
            <th>ファイル名</th>\n\
            <th>使用有無</th>\n\
            <th>非Retina画像(〜.png)</th>\n\
            <th>Retina画像(〜@2x.png)</th>\n\
            <th>iPhone6plus画像(〜.@3x.png)</th>\n\
        </tr>'
        var templateSuffix = '\n\
        </tbody>\n\
    </table>';

        var count = 0;
        var body = '';
        for (var key in files) {
            count++;
            var path = files[key].path.replace('/Users/nakashima_koki/Build/ghe/now-iOS', '.');
            var used = files[key].used ? '✔あり' : '<em>✖なし</em>';
            var actual = files[key].actual ? '<img src="' + path + files[key].actual + '"/>' : '<em>なし</em>';
            var twice = files[key].twice ? '<img src="' + path + files[key].twice + '"/>' : '<em>なし</em>';
            var triple = files[key].triple ? '<img src="' + path + files[key].triple + '"/>' : '<em>なし</em>';
            body += '<tr><td>' + count + '</td><td>' + key + '</td><td>' + used + '</td><td>' + actual + '</td><td>' + twice + '</td><td>' + triple + '</td></tr>\n';
        }
        return templatePrefix + body + templateSuffix;
    }
};
