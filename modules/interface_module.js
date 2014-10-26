var spawn = require('child_process').spawn;

var path = '.\\core\\';
var process;

exports.start_interface = function () {
  process = spawn(path + 'my-os');
}

exports.end_interface = function () {
  process.kill();
}