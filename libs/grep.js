var fs = require('fs');

module.exports = function grep(query, files) {
    return files.some(function(filename) {
        return query.test(fs.readFileSync(filename));
    });
};
