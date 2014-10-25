var fs = require('fs');

var App = (function () {

  var root = $('.main-screen');

  var zindex_count = 100;
  var mouseX = 0;
  var mouseY = 0;

  function loadWindowFrame () {
    var win = document.createElement('div');
    win.className = 'window';
    win.style.zIndex = ++zindex_count;
    win.style.top = (document.body.clientHeight - 360) / 2 - 50 + 'px';
    win.style.left = (document.body.clientWidth - 480) / 2 + 'px';
    win.innerHTML = '<div class="window-toolbar"><button class="button window-button window-cancel">X</button><button class="button window-button window-minimize">-</button><button class="button window-button window-maximize">+</button><div class="window-move"></div></div><div class="window-main"></div>';
    root.appendChild(win);
    return win;
  }

  function loadWindowEventHandler(win) {
    $$.bind(win, 'click', function (e) {
      win.style.zIndex = ++zindex_count;
    });

    $$.bind(win.find('.window-cancel'), 'click', function (e) {
      var win = e.target.parentNode.parentNode;
      win.style.opacity = 0;
      setTimeout(function () {
        root.removeChild(win);
        var appName = (win.className.substr(-9) == 'maximized') ? 
                      win.className.split(' ')[1].split('-').pop() :
                      win.className.split('-').pop();
        if ($('#script-' + appName) != null) {
          document.body.removeChild($('#script-' + appName));
        }
        var windowMaximized = $('.window-maximized');
        if (windowMaximized == null) {
          $('.dock').removeClass('dock-hidden');
        } else {
          if (windowMaximized instanceof HTMLElement && windowMaximized.style.opacity == 0) {
            $('.dock').removeClass('dock-hidden');
          } else {
            var minimizedCount = 0;
            for (var i = 0; i < windowMaximized.length; i++) {
              if (windowMaximized[i].style.opacity == 0) {
                minimizedCount++;
              }
            }
            if (minimizedCount == windowMaximized.length) {
              $('.dock').removeClass('dock-hidden');
            }
          }
        }
      }, 300);
    });

    $$.bind(win.find('.window-minimize'), 'click', function (e) {
      var win = e.target.parentNode.parentNode;
      win.style.opacity = 0;
      setTimeout(function () {
        win.style.zIndex = -1;
      }, 300);
      if (win.hasClass('window-maximized')) {
        $('.dock').removeClass('dock-hidden');
      }
    });

    $$.bind(win.find('.window-maximize'), 'click', function (e) {
      var win = e.target.parentNode.parentNode;
      if (win.hasClass('window-maximized')) {
        win.css({'width' : '480px', 'height' : '360px', 'top' : (document.body.clientHeight - 360) / 2 - 50 + 'px', 'left' : (document.body.clientWidth - 480) / 2 + 'px'});
        win.removeClass('window-maximized');
        $('.dock').removeClass('dock-hidden');
      } else {
        win.css({'width' : '100%', 'height' : 'calc(100% - 34px)', 'top' : '0', 'left' : '0'});
        win.addClass('window-maximized');
        if (!$('.dock').hasClass('dock-hidden')) {
          $('.dock').addClass('dock-hidden');
        }
      }
    });

    $$.bind(win.find('.window-move'), 'mousedown', function (e) {
      var win = e.target.parentNode.parentNode;
      if (!win.hasClass('window-maximized')) {
        win.addClass('window-moving');
        win.style.transition = 'none';
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    });

    $$.bind(win.find('.window-move'), 'mouseup', function (e) {
      var win = e.target.parentNode.parentNode;
      win.removeClass('window-moving');
      win.style.transition = 'width 0.5s, height 0.5s, top 0.5s, left 0.5s, opacity 0.3s';
    });

    $$.bind(win.find('.window-move'), 'mouseleave', function (e) {
      var win = e.target.parentNode.parentNode;
      win.removeClass('window-moving');
      win.style.transition = 'width 0.5s, height 0.5s, top 0.5s, left 0.5s, opacity 0.3s';
    });

    $$.bind(win.find('.window-move'), 'mousemove', function (e) {
      var win = e.target.parentNode.parentNode;
      if (win.hasClass('.window-moving')) {
        win.style.top = win.offsetTop + (e.clientY - mouseY) + 'px';
        win.style.left = win.offsetLeft + (e.clientX - mouseX) + 'px';
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    });
  }

  function loadWindowContent (win, appName) {
    fs.readFile('./apps/' + appName + '.html', 'utf-8', function (err, data) {
      if (!err) {
        win.className += " window-" + appName;
        win.find('.window-move').innerHTML  = appName;
        win.find('.window-main').innerHTML = data;
        win.style.opacity = 1;
        if (win.find('script') != null) {
          var script = document.createElement('script');
          script.innerHTML  = win.find('script').innerHTML;
          script.id = 'script-' + appName;
          document.body.appendChild(script);
        }
      } else {
        console.log(err);
      }
    });
  }

  return {
    start : function (appName) {
      if (appName == 'shutdown') {
        var win = require('nw.gui').Window.get();
        win.close();
        return false;
      }
      if (root.find('.window-' + appName) != null) {
        $('.window-' + appName).css({'z-index' : ++zindex_count, 'opacity': 1});
        if ($('.window-' + appName).hasClass('window-maximized')) {
          $('.dock').addClass('dock-hidden');
        }
        return false;
      }
      var win = loadWindowFrame();
      loadWindowEventHandler(win);
      loadWindowContent(win, appName);
    }
  }

})();