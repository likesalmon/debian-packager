'use strict';

var fs = require('fs-extra');
var dircompare = require('dir-compare');

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

var compareDirectories = function (test, source, destination) {
    var options = {
        compareContent: true,
        // exclude files that have template tokens like ${current_dir}
        excludeFilter: 'changelog, Makefile'
    };

    return dircompare.compare(source, destination, options)
        .then(function (res) {
            test.ok(res.same);
            test.done();
        });
};

function compareFiles (test, source, destination) {
    var sourceContent = replaceAll(fs.readFileSync(source, 'utf8'), '${current_dir}', process.cwd());
    var destContent = fs.readFileSync(destination, 'utf8');

    test.equal(sourceContent, destContent);

    test.done();
}


exports.debian_package = {
    setUp: function (done) {
        done();
    },
    default_options: function (test) {
        compareDirectories(test, 'test/integration/default_options', 'tmp');
    },
    default_options_makefile: function (test) {
        compareFiles(test, 'test/integration/default_options/packaging/Makefile', 'tmp/packaging/Makefile');
    },
    custom_options: function (test) {
        compareDirectories(test, 'test/integration/custom_options', 'test/integration/tmp');
    },
    custom_options_makefile: function (test) {
        compareFiles(test, 'test/integration/custom_options/packaging/Makefile', 'test/integration/tmp/packaging/Makefile');
    }
};
