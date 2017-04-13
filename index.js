'use strict';

var debianPackager = require('./tasks/debian_package');
var fs = require('fs-extra');
var messages = require('./tasks/messages');

var config = process.argv[2];

if (!config) {
    throw new Error(messages.provideConfig);
}

fs.readJson(config, function (err, config) {
    if (err) {
        return console.error(err.message);
    }

    debianPackager.create(config);
});
