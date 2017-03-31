'use strict';

module.exports = {
    noMaintainerDetails: 'No maintainer details provided!!\n' +
        'Please add the `maintainer` option specifying the name and email in your package.json file under `debianPackagerOptions` or add `DEBFULLNAME` and `DEBEMAIL` environment variable (i.e. export DEBFULLNAME="James D Bloom" && export DEBEMAIL="jamesdbloom@email.com")',

    noMaintainerName: 'No maintainer name provided!!\n' +
        'please add the `maintainer.name` option in your package.json file under `debianPackagerOptions` or add a `DEBFULLNAME` environment variable (i.e. export DEBFULLNAME="James D Bloom")',

    noShortDescription: 'No short description provided!!\n' +
        'Please add the `short_description` option in your package.json file under `debianPackagerOptions` or add a `description` field to package.json',

    noMaintainerEmail: 'No maintainer email provided!!\n' +
        'Please add the `maintainer.email` option in your package.json file under `debianPackagerOptions` or add a `DEBEMAIL` environment variable (i.e. export DEBEMAIL="jamesdbloom@email.com")',

    noLongDescription: 'No long description provided!!\n' +
        'Please add the `long_description` option in your package.json file under `debianPackagerOptions` or add a multi line `description` field to package.json (note: the first line is used as the short description and the remaining lines are used as the long description)',

    providePackageJson: 'Please provide a valid package.json file, like `debian-packager package.json`',

    provideConfig: 'Please provide a config file, like `debian-packager package.json`',

    provideFiles: 'Please provide a list of files in package.json under `debian-packager.files`. See the Overview section of the README for an example.',

    provideSrc: 'Please provide a `src` property for each file. `src` is a list of glob patterns to match in your project. See the Overview section of the README for an example.',

    invalidOptions: 'Sorry, I can\'t create a package with invalid options.',

    runningDebuild: 'Running `debuild --no-tgz-check -sa -us -uc --lintian-opts --suppress-tags tar-errors-from-data,tar-errors-from-control,dir-or-file-in-var-www`',

    debuildNotFound: '`debuild` executable not found!!\n' +
        'To install debuild try running `sudo apt-get install devscripts`',

    debuildError: 'Error running debuild!!',

    debhelperNotFound: '`debhelper` dependency not found. try running \'sudo apt-get install debhelper\'',

    dputError: 'Error uploading package using dput!!'
};
