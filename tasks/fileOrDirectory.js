'use strict';

var fs = require('fs-extra');
var glob = require('glob');

function _delete (path) {
    var results = glob.sync(path);
    if (results.length > 0) {
        console.log('Deleting: \'' + results + '\'');
        results.forEach(fs.removeSync);
    }
}

function _copy (source, dest) {
    glob.sync(source).forEach(function (src) {
        fs.copySync(src, dest);
    });
}

function _cleanUp (options, allFiles) {
    if (allFiles) {
        _delete(options.working_directory);
        _delete(options.package_location + '*.tar.gz');
        _delete(options.package_location + '*.build');
        _delete(options.package_location + '*.changes');
        _delete(options.package_location + '*.deb');
    } else {
        _delete(options.working_directory + options.packaging_directory_name);
        _delete(options.package_location + '*.tar.gz');
        _delete(options.package_location + '*.build');
    }
}

module.exports = {
    _delete: _delete,
    _copy: _copy,
    _cleanUp: _cleanUp
};
