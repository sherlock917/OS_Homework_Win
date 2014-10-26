var iconv = require('iconv-lite');
var gui = require('nw.gui'); 
var win = gui.Window.get();

var interface_module = require('../modules/interface_module');

var mode = 0;

if (mode == 0) {
  $('.main-screen').css({'opacity' : 1, 'display' : 'block'});
  // win.maximize();
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
  interface_module.start_interface();
}

function eventHandler () {
  win.on('close', function () {
    var self = this;
    interface_module.end_interface();
    if (mode == 0) {
      this.close(true);
    } else {
      $('.main-screen').fadeOut();
      $('.end-screen').fadeIn();
      setTimeout(function () {
        self.close(true);
      }, 7500);
    }
  });

  $$.bind($('.app'), 'click', function (e) {
    var appName = e.target.className.split(' ').pop().split('-').pop();
    App.start(appName);
  });

  $$.bind($('body'), 'mousemove', function (e) {
    if (e.clientY > document.body.clientHeight - 4 && $('.dock').hasClass('dock-hidden')) {
      $('.dock').removeClass('dock-hidden');
      $('.dock').addClass('dock-show-temp');
    }
  });

  $$.bind($('.dock'), 'mouseleave', function (e) {
    if ($('.dock').hasClass('dock-show-temp')) {
      $('.dock').removeClass('dock-show-temp');
      $('.dock').addClass('dock-hidden');
    }
  });
}