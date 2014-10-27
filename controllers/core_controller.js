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
  startClock();
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

  $$.bind($('.statusbar-power-btn'), 'click', function (e) {
    win.close();
  });
}

function startClock () {
  var weekdays = ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat'];
  var d = new Date();
  var YY = d.getFullYear();
  var MM = d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1 : d.getMonth() + 1;
  var DD = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  var hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  var mm = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  var ss = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
  var ww = weekdays[d.getDay()];
  setInterval(function () {
    var d = new Date();
    var YY = d.getFullYear();
    var MM = d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1 : d.getMonth() + 1;
    var DD = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    var hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var mm = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var ss = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    var ww = weekdays[d.getDay()];
    $('.statusbar-time').innerHTML = YY + '-' + MM + '-' + DD + '&nbsp;&nbsp;' + ww + '&nbsp;&nbsp;' + hh + ':' + mm + ':' + ss;
  }, 500);
}