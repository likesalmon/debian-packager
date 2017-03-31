'use strict';

var R = require('ramda');
var messages = require('./messages');

String.prototype.endsWidth = function (substring) {
    var str = this;
    if (str.lastIndexOf(substring) >= 0) {
        return str.lastIndexOf(substring) === (str.length - substring.length);
    }
    return false;
};

function _merge (config) {
    if (!config) {
        console.error(messages.provideConfig);
        return false;
    }

    var settings = R.pick([
        'author',
        'name',
        'description',
        'version'
    ])(config);

    var defaultOptions = {
        maintainer: process.env.DEBFULLNAME && process.env.DEBEMAIL && {
            name: process.env.DEBFULLNAME,
            email: process.env.DEBEMAIL
        } || settings.author && settings.author.name && settings.author.email && settings.author,
        name: settings.name,
        prefix: "",
        postfix: "",
        short_description: (settings.description && settings.description.split(/\r\n|\r|\n/g)[0].trim()) || '',
        long_description: (settings.description && settings.description.split(/\r\n|\r|\n/g).splice(1).join(' ')) || '',
        version: settings.version,
        build_number: process.env.BUILD_NUMBER || process.env.DRONE_BUILD_NUMBER || process.env.TRAVIS_BUILD_NUMBER || '1',
        working_directory: 'tmp/',
        packaging_directory_name: 'packaging',
        target_architecture: "all",
        category: "misc",
        disable_debuild_deps_check: false
    };

    // Override defaultOptions with config.debianPackagerOptions properties
    // return R.merge(defaultOptions, settings || {}, config.debianPackagerOptions);
    return R.pipe(
        R.merge(R.__, settings),
        R.merge(R.__, config.debianPackagerOptions)
    )(defaultOptions);
}

function _validate (options, quiet) {
    var valid = true;
    if (!options.maintainer) {
        if (!quiet) {
            console.error(messages.noMaintainerDetails, '\n');
        }
        valid = false;
    }
    if (options.maintainer && !options.maintainer.name) {
        if (!quiet) {
            console.error(messages.noMaintainerName, '\n');
        }
        valid = false;
    }
    if (options.maintainer && !options.maintainer.email) {
        if (!quiet) {
            console.error(messages.noMaintainerEmail, '\n');
        }
        valid = false;
    }
    if (!options.short_description) {
        if (!quiet) {
            console.error(messages.noShortDescription, '\n');
        }
        valid = false;
    }
    if (!options.long_description) {
        if (!quiet) {
            console.error(messages.noLongDescription, '\n');
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
    _validate: _validate,
    _merge: _merge
};
