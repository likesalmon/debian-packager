'use strict';

// Exposes String.replaceAll
require('../../tasks/replace');

var sinon = require('sinon'),
    testCase = require('nodeunit').testCase,
    fs = require('fs-extra');

exports.replace_test = {
    'replaceAll string extension function': testCase({
        'should replace all basic string matches in string': function (test) {
            test.deepEqual("abcdefabcabc".replaceAll("abc", "xyz"), "xyzdefxyzxyz");
            test.deepEqual("bcdefabcabc".replaceAll("abc", "xyz"), "bcdefxyzxyz");
            test.deepEqual("abcdefababc".replaceAll("abc", "xyz"), "xyzdefabxyz");
            test.deepEqual("abcdefabcab".replaceAll("abc", "xyz"), "xyzdefxyzab");
            test.deepEqual("abc".replaceAll("abc", "xyz"), "xyz");
            test.deepEqual("a".replaceAll("a", "x"), "x");
            test.deepEqual("aaaaa".replaceAll("a", "x"), "xxxxx");

            // end
            test.done();
        },
        'should replace all regex matches in string': function (test) {
            test.deepEqual("abcdefabcabc".replaceAll("a.{2}", "xyz"), "xyzdefxyzxyz");
            test.deepEqual("bcdefabcabc".replaceAll("a.{5}", "xyz"), "bcdefxyz");
            test.deepEqual("aaaaa".replaceAll("a.{4}", "x"), "x");

            // end
            test.done();
        },
        'should not replace non-matching sub-strings': function (test) {
            test.deepEqual("abcdefabcabc".replaceAll("xyz", "abc"), "abcdefabcabc");
            test.deepEqual("aaaaa".replaceAll("b", "x"), "aaaaa");
            test.deepEqual("aaaaa".replaceAll("a.{5}", "x"), "aaaaa");

            // end
            test.done();
        }
    }),
    'replace in multiple files': testCase({
        setUp: function (callback) {
            this._findAndReplace = require('../../tasks/replace.js')._findAndReplace;
            sinon.spy(console, 'log');
            callback();
        },
        tearDown: function (callback) {
            console.log.restore();
            callback();
        },
        'replace string multiple times in single file': function (test) {
            // given
            var path = "test/unit/tmp/test_file.txt",
                find = "text",
                replace = "value",
                expectedString = 'this is some value with the word value repeated in it again and again as value';

            fs.copySync("test/unit/test_file.txt", path);

            // when
            this._findAndReplace([path], find, replace);

            // then
            test.deepEqual(fs.readFileSync(path, 'utf8'), expectedString, "File: " + path + " has not be correctly updated");

            test.ok(console.log.calledWith('Replacing: \'value\' for \'text\' in test/unit/tmp/test_file.txt'));

            // end
            test.done();
        },
        'replace string multiple times in multiple files': function (test) {
            // given
            var paths = [
                    "test/unit/tmp/test_file_one.txt",
                    "test/unit/tmp/test_file_two.txt",
                    "test/unit/tmp/test_file_three.txt"
                ],
                i = 0,
                find = "text",
                replace = "value",
                expectedString = 'this is some value with the word value repeated in it again and again as value';

            for (; i < paths.length; i++) {
                fs.copySync("test/unit/test_file.txt", paths[i]);
            }

            // when
            this._findAndReplace(paths, find, replace);

            // then
            for (i = 0; i < paths.length; i++) {
                test.deepEqual(fs.readFileSync(paths[i], 'utf8'), expectedString, "File: " + paths[i] + " has not be correctly updated");
            }

            test.ok(console.log.calledWith('Replacing: \'value\' for \'text\' in test/unit/tmp/test_file_one.txt and test/unit/tmp/test_file_two.txt and test/unit/tmp/test_file_three.txt'));

            // end
            test.done();
        }
    })
};
