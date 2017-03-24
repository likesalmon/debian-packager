'use strict';

module.exports = {
    noMaintainerDetails: 'No maintainer details provided!!\n' +
        'Please add the `maintainer` option specifying the name and email in your package.json file under `debianPackagerConfig` or add `DEBFULLNAME` and `DEBEMAIL` environment variable (i.e. export DEBFULLNAME="James D Bloom" && export DEBEMAIL="jamesdbloom@email.com")',

    noMaintainerName: 'No maintainer name provided!!\n' +
        'please add the `maintainer.name` option in your package.json file under `debianPackagerConfig` or add a `DEBFULLNAME` environment variable (i.e. export DEBFULLNAME="James D Bloom")',

    noShortDescription: 'No short description provided!!\n' +
        'Please add the `short_description` option in your package.json file under `debianPackagerConfig` or add a `description` field to package.json',

    noMaintainerEmail: 'No maintainer email provided!!\n' +
        'Please add the `maintainer.email` option in your package.json file under `debianPackagerConfig` or add a `DEBEMAIL` environment variable (i.e. export DEBEMAIL="jamesdbloom@email.com")',

    noLongDescription: 'No long description provided!!\n' +
        'Please add the `long_description` option in your package.json file under `debianPackagerConfig` or add a multi line `description` field to package.json (note: the first line is used as the short description and the remaining lines are used as the long description)',

    providePackageJson: 'Please provide a valid package.json file, like `debian-packager package.json`',

    provideConfig: 'Please provide a config file, like `debian-packager package.json`',

    invalidOptions: 'Sorry, I can\'t create a package with invalid options.',

    runningDebuild: 'Running `debuild --no-tgz-check -sa -us -uc --lintian-opts --suppress-tags tar-errors-from-data,tar-errors-from-control,dir-or-file-in-var-www`',

    debuildNotFound: '`debuild` executable not found!!\n' +
        'To install debuild try running `sudo apt-get install devscripts`',

    debuildError: 'Error running debuild!!',

    debhelperNotFound: '`debhelper` dependency not found. try running \'sudo apt-get install debhelper\'',

    dputError: 'Error uploading package using dput!!'
};
