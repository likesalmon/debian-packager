'use strict';

var fs = require('fs-extra'),
    testCase = require('nodeunit').testCase,
    tmpDir = 'test/unit/tmp';

exports.fileOrDirectory_test = {
    'delete': testCase({
        setUp: function (callback) {
            this._delete = require('../../tasks/fileOrDirectory.js')._delete;
            callback();
        },
        tearDown: function (callback) {
            fs.removeSync(tmpDir);
            callback();
        },
        'should delete existing file': function (test) {
            // given
            var path = tmpDir + "/test_file_to_delete.txt";

            fs.copySync("test/unit/test_file.txt", path);

            var stats = fs.statSync(path);

            // when
            test.ok(stats.isFile(), "File exists before being deleted");
            this._delete(path);

            // then
            fs.access(path, function (err) {
                test.equal(err.code, "ENOENT", "File does not exist after being deleted");

                // end
                test.done();
            });
        },
        'should delete existing empty directory': function (test) {
            // given
            var path = tmpDir + "/directory_to_delete";

            fs.ensureDirSync(path);

            // when
            var dirStats = fs.statSync(path);
            test.ok(dirStats.isDirectory(), "Exists before being deleted");
            test.ok(dirStats.isDirectory(), "Checking is directory before being deleted");
            this._delete(path);

            // then
            fs.access(path, function (err) {
                test.equal(err.code, "ENOENT", "Directory does not exist after being deleted");

                // end
                test.done();
            });
        },
        'should delete existing directory containing files': function (test) {
            // given
            var path = tmpDir + "/directory_with_files_to_delete";
            fs.ensureDirSync(path);
            fs.copySync("test/unit/test_file.txt", path + "/file_one.txt");
            fs.copySync("test/unit/test_file.txt", path + "/file_two.txt");

            // when
            var dirStats = fs.statSync(path);
            test.ok(dirStats.isDirectory(path), "Exists before being deleted");
            test.ok(dirStats.isDirectory(path), "Checking is directory before being deleted");
            this._delete(path);

            // then
            fs.access(path, function (err) {
                test.equal(err.code, "ENOENT", "File does not exist after being deleted");

                // end
                test.done();
            });
        }
    }),
    'copy': testCase({
        setUp: function (callback) {
            this._copy = require('../../tasks/fileOrDirectory.js')._copy;
            callback();
        },
        tearDown: function (callback) {
            fs.removeSync(tmpDir);
            callback();
        },
        'should copy directory and its containing files': function (test) {
            // given
            var directory = tmpDir + "/directory_to_copy",
                sub_directory = directory + "/subdirectory",
                files = [
                        directory + "/file_one.txt",
                        directory + "/file_two.txt",
                        sub_directory + "/file_three.txt",
                        sub_directory + "/file_four.txt"
                ],
                i = 0,
                target_directory = tmpDir + "/target_directory",
                target_sub_directory = target_directory + "/subdirectory",
                target_files = [
                        target_directory + "/file_one.txt",
                        target_directory + "/file_two.txt",
                        target_sub_directory + "/file_three.txt",
                        target_sub_directory + "/file_four.txt"
                ];

            fs.ensureDirSync(sub_directory);

            for (; i < files.length; i++) {
                fs.copySync("test/unit/test_file.txt", files[i]);
            }

            // when
            var dirStats = fs.statSync(directory);
            test.ok(dirStats.isDirectory(), "Exists before being deleted");
            test.ok(dirStats.isDirectory(), "Checking is directory before being deleted");
            this._copy(directory, target_directory);

            // then
            var targetStats = fs.statSync(target_directory);
            test.ok(targetStats.isDirectory(), "Target directory created");
            test.ok(targetStats.isDirectory(), "Target directory is a directory");

            var subdirStats = fs.statSync(target_sub_directory);
            test.ok(subdirStats.isDirectory(), "Target sub-directory created");
            test.ok(subdirStats.isDirectory(), "Target sub-directory is a directory");
            for (i = 0; i < target_files.length; i++) {
                var targetFileStats = fs.statSync(target_files[i]);
                test.ok(targetFileStats.isFile(), "Target file created");
            }

            // end
            test.done();
        }
    })
};
