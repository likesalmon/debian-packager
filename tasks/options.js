'use strict';

var messages = require('./messages');

String.prototype.endsWidth = function (substring) {
    var str = this;
    if (str.lastIndexOf(substring) >= 0) {
        return str.lastIndexOf(substring) === (str.length - substring.length);
    }
    return false;
};

function _validate (options, quiet) {
    var valid = true;
    if (!options.maintainer) {
        if (!quiet) {
            console.error(messages.noMaintainerDetails);
        }
        valid = false;
    }
    if (options.maintainer && !options.maintainer.name) {
        if (!quiet) {
            console.error(messages.noMaintainerName);
        }
        valid = false;
    }
    if (options.maintainer && !options.maintainer.email) {
        if (!quiet) {
            console.error(messages.noMaintainerEmail);
        }
        valid = false;
    }
    if (!options.short_description) {
        if (!quiet) {
            console.error(messages.noShortDescription);
        }
        valid = false;
    }
    if (!options.long_description) {
        if (!quiet) {
            console.error(messages.noLongDescription);
        }
    } else {
        // add extra space at start to ensure format is correct and allow simple unit test comparisons
        options.long_description = ' ' + options.long_description;
    }
    if (options.working_directory && !options.working_directory.endsWidth("/")) {
        options.working_directory = options.working_directory + "/";
    }
    if (valid) {
        options.package_name = options.package_name || (options.prefix || '') + (options.name || 'debian_package') + (options.postfix || '');
        options.package_location = options.working_directory + options.package_name;
    }
    return valid;
}

module.exports = {
    _validate: _validate
};
