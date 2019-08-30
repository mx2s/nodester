// snippet FROM: https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs
let path = require('path'), fs = require('fs');

module.exports = {
    getAllFilesRecursively(startPath, filter = "") {
        if (!fs.existsSync(startPath)) {
            console.log("no dir ", startPath);
            return;
        }

        let files = fs.readdirSync(startPath);

        for (let i = 0; i < files.length; i++) {
            let filename = path.join(startPath, files[i]);
            if (!fs.existsSync(filename)) {
                continue;
            }
            files[i] = filename;
            let stat = fs.lstatSync(filename);
            if (!stat.isDirectory()) {
                continue;
            }
            files = files.concat(this.getAllFilesRecursively(filename, filter));
        }

        return files.filter(function (item) {
            return item.indexOf(filter) !== -1;
        });
    }
};