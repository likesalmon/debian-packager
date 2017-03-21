'use strict';

module.exports = {
    noMaintainerDetails: 'No maintainer details provided!!\n' +
        'Please add the \'maintainer\' option specifying the name and email in your debian_package configuration in your Gruntfile.js or add \'DEBFULLNAME\' and \'DEBEMAIL\' environment variable (i.e. export DEBFULLNAME="James D Bloom" && export DEBEMAIL="jamesdbloom@email.com")',

    noMaintainerName: 'No maintainer name provided!!\n' +
        'please add the \'maintainer.name\' option in your debian_package configuration in package.json or add a \'DEBFULLNAME\' environment variable (i.e. export DEBFULLNAME="James D Bloom")',

    noShortDescription: 'No short description provided!!\n' +
        'Please add the \'short_description\' option in your debian_package configuration in your Gruntfile.js or add a \'description\' field to package.json',

    noMaintainerEmail: 'No maintainer email provided!!\n' +
        'Please add the \'maintainer.email\' option in your debian_package configuration in package.json or add a \'DEBEMAIL\' environment variable (i.e. export DEBEMAIL="jamesdbloom@email.com")',

    noLongDescription: 'No long description provided!!\n' +
        'Please add the \'long_description\' option in your debian_package configuration in package.json or add a multi line \'description\' field to package.json (note: the first line is used as the short description and the remaining lines are used as the long description)'
};
