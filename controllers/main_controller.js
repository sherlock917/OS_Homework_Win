var gui = require('nw.gui'); 
var win = gui.Window.get();

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
  // interfaceLoder();
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
  
}

function eventHandler () {
  $$.bind($('.app'), 'click', function (e) {
    var appName = e.target.className.split(' ').pop().split('-').pop();
    App.start(appName);
  });
}