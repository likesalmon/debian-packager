'use strict';

// Exposes String.endsWidth
require('../../tasks/options');

var sinon = require('sinon'),
    testCase = require('nodeunit').testCase,
    R = require('ramda'),
    messages = require('../../tasks/messages');

exports.options_test = {
    'endsWith string extension function': testCase({
        'should match correct trailing substring': function (test) {
            test.ok("abcdefabcabc".endsWidth("cabc"), '"abcdefabcabc" ends with "cabc"');
            test.ok("abcdefabcabc".endsWidth("abc"), '"abcdefabcabc" ends with "abc"');
            test.ok("abcdefabcabc".endsWidth("bc"), '"abcdefabcabc" ends with "bc"');
            test.ok("abcdefabcabc".endsWidth("c"), '"abcdefabcabc" ends with "c"');
            test.ok("abcdefabcabc".endsWidth("abcdefabcabc"), '"abcdefabcabc" ends with "abcdefabcabc"');
            test.ok("abcdefabcabc".endsWidth(""), '"abcdefabcabc" ends with ""');

            // end
            test.done();
        },
        'should not-match incorrect trailing substring': function (test) {
            test.ok(!"abcdefabcabc".endsWidth("ab"), '"abcdefabcabc" does not ends with "ab"');
            test.ok(!"abcdefabcabc".endsWidth("abcd"), '"abcdefabcabc" does not ends with "abcd"');
            test.ok(!"abcdefabcabc".endsWidth("def"), '"abcdefabcabc" does not ends with "def"');
            test.ok(!"abcdefabcabc".endsWidth("cb"), '"abcdefabcabc" does not ends with "cb"');

            // end
            test.done();
        }
    }),
    'merge': testCase({
        setUp: function (callback) {
            this._mergeOptions = require('../../tasks/options.js')._merge;
            this.config = R.clone(require('./sample_config.json'));
            sinon.spy(console, 'error');
            callback();
        },
        tearDown: function (callback) {
            console.error.restore();
            callback();
        },
        'should refuse to process if no config is provided': function (test) {
            var results = this._mergeOptions(null);

            test.ok(console.error.calledWith(messages.provideConfig));
            test.ok(!results);

            test.done();
        },
        'should override default options with package.json props': function (test) {
            delete this.config.debianPackagerConfig;
            var results = this._mergeOptions(this.config);

            test.deepEqual(results.maintainer, {
                name: this.config.author.name,
                email: this.config.author.email
            });

            test.equal(results.name, this.config.name);

            test.equal(results.long_description, this.config.description.split(/\n/)[1].trim());

            test.equal(results.short_description, this.config.description.split(/\n/)[0].trim())

            test.equal(results.version, this.config.version);

            test.done();
        },
        // 'should use package.json props': function (test) {
        //     var overrides = {
        //
        //     }
        //
        //     var results = this._mergeOptions(overrides);
        //
        //     test.done();
        // },
        'should override package.json props with debianPackagerConfig props': function (test) {
            var results = this._mergeOptions(this.config);
            var overrides = this.config.debianPackagerConfig;

            test.deepEqual(results.maintainer, {
                name: overrides.maintainer.name,
                email: overrides.maintainer.email
            });

            test.equal(results.name, overrides.name);

            test.equal(results.long_description, overrides.long_description);

            test.equal(results.short_description, overrides.short_description)

            test.equal(results.version, overrides.version);

            test.equal(results.working_directory, overrides.working_directory);

            test.equal(results.packaging_directory_name, overrides.packaging_directory_name);

            test.equal(results.target_architecture, overrides.target_architecture);

            test.equal(results.category, overrides.category);

            test.equal(results.disable_debuild_deps_check, overrides.disable_debuild_deps_check);

            test.deepEqual(results.files, overrides.files);

            test.done();
        }
    }),
    'option validation': testCase({
        setUp: function (callback) {
            this._validateOptions = require('../../tasks/options.js')._validate;
            sinon.spy(console, "error");
            callback();
        },
        tearDown: function (callback) {
            console.error.restore();
            callback();
        },
        'should display errors for empty options': function (test) {
            // given
            var options = {};

            // when
            var valid = this._validateOptions(options);

            // then
            test.ok(console.error.calledWith(messages.noMaintainerDetails));
            test.ok(console.error.calledWith(messages.noShortDescription));
            test.ok(console.error.calledWith(messages.noLongDescription));

            test.deepEqual(options, {});
            test.ok(!valid, 'returns not valid');

            // end
            test.done();
        },
        'should display no errors for correct options': function (test) {
            // given
            var options = {
                maintainer: {
                    name: 'James D Bloom',
                    email: 'jamesdbloom@email.com'
                },
                short_description: 'the short description',
                long_description: 'the long description added to the debian package',
                working_directory: 'dir'
            };

            // when
            var valid = this._validateOptions(options);

            // then
            test.ok(console.error.notCalled);
            test.deepEqual(options, {
                maintainer: {
                    name: 'James D Bloom',
                    email: 'jamesdbloom@email.com'
                },
                short_description: 'the short description',
                long_description: ' the long description added to the debian package',
                working_directory: 'dir/',
                package_name: 'debian_package',
                package_location: 'dir/debian_package'
            });
            test.ok(valid, 'returns valid');

            // end
            test.done();
        },
        'should display when maintainer details not provided': function (test) {
            // given
            var options = {
                maintainer: {
                },
                short_description: 'the short description',
                long_description: 'the long description added to the debian package'
            };

            // when
            var valid = this._validateOptions(options);

            // then
            test.ok(console.error.calledWith(messages.noMaintainerName));
            test.ok(console.error.calledWith(messages.noMaintainerEmail));

            test.deepEqual(options, {
                maintainer: {
                },
                short_description: 'the short description',
                long_description: ' the long description added to the debian package'
            });
            test.ok(!valid, 'returns not valid');

            // end
            test.done();
        }
    })
};
