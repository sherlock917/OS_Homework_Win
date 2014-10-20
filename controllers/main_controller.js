var iconv = require('iconv-lite');
var gui = require('nw.gui'); 
var win = gui.Window.get();

var interface_module = require('../modules/interface_module');

var mode = 0;

if (mode == 0) {
  $('.main-screen').css({'opacity' : 1, 'display' : 'block'});
} else {
  win.isFullscreen = true;
}

window.onload = function () {
  if (mode == 1) {
    viewLoader();
  }
  interfaceLoader();
  eventHandler();
}

function viewLoader () {
  setTimeout(function () {
    $('.start-screen').fadeIn();
  }, 2000);

  setTimeout(function () {
    $('.start-screen').fadeOut();
    $('.main-screen').fadeIn();
  }, 15000);
}

function interfaceLoader () {
  interface_module.start_interface(function (error, stdout, stderr) {
    console.log(error);
    console.log(stderr);
    console.log(stdout);
  });
}

function eventHandler () {
  $$.bind($('.app'), 'click', function (e) {
    var appName = e.target.className.split(' ').pop().split('-').pop();
    App.start(appName);
  });
}