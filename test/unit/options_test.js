(function () {

    'use strict';

    var sinon = require('sinon'),
        testCase = require('nodeunit').testCase,
        options = require('../../tasks/options'),
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

})();
