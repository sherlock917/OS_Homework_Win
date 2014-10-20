var exec = require('child_process').exec;

var path = '.\\interfaces\\';

exports.start_interface = function (callback) {
  exec(path + 'my-os', callback);
}