var Mocha, path, fs, mocha, testDir, exec, util, debugFn;

Mocha = require('mocha');
exec = require('child_process').exec;
util = require('util');
path = require('path');
fs = require('fs');

debugFn = function debugFn(error, stdout, stderr) {
  util.puts(stdout);
};

mocha = new Mocha({
  reporter: 'dot',
  ui      : 'bdd',
  timeout : 999999
});

testDir = path.join(__dirname, '../');

fs.readdir(testDir, function (err, files) {
  if (err) {
    return console.log(err);
  }
  exec("ln -fns ./lib ./lib-test", debugFn);
  files.forEach(function (file) {
    if (path.extname(file) === '.js') {
      console.log('adding test file: %s', file);
      mocha.addFile(testDir + file);
    }
  });

  exec("ln -fns ./lib ./lib-test", debugFn);
  var runner = mocha.run(function () {
    return console.log('finished');
  });

  runner.on('pass', function (test) {
    console.log('... %s passed', test.title);
    return exec("rm -f ./lib-test", debugFn);
  });

  runner.on('fail', function (test) {
    console.log('... %s failed', test.title);
    return exec("rm -f ./lib-test", debugFn);
  });
});

