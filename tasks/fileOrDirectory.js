'use strict';

var fs = require('fs-extra');

function _delete (path) {
    try {
        console.log('Deleting: \'' + path + '\'');
        fs.removeSync(path);
    } catch (e) {
        // Fail silently
    }
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
    _copy: fs.copySync,
    _cleanUp: _cleanUp
};
