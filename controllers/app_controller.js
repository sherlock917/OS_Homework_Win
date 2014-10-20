var fs = require('fs');

var App = (function () {

  var root = $('.main-screen');

  var zindex_count = 100;

  function loadWindowFrame () {
    var win = document.createElement('div');
    win.className = 'window';
    win.style.zIndex = ++zindex_count;
    win.innerHTML = '<div class="window-toolbar"><button class="button window-button window-cancel">X</button><button class="button window-button window-minimize">-</button><button class="button window-button window-maximize">+</button></div><div class="window-main"></div>';
    root.appendChild(win);
    return win;
  }

  function loadWindowEventHandler(win) {
    $$.bind(win.find('.window-cancel'), 'click', function (e) {
      var win = e.target.parentNode.parentNode;
      win.style.opacity = 0;
      setTimeout(function () {
        root.removeChild(win);
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
        win.css({'width' : '480px', 'height' : '360px', 'margin' : 'auto'});
        win.removeClass('window-maximized');
      } else {
        win.css({'width' : '100%', 'height' : 'calc(100% - 32px)', 'margin' : '0'});
        win.addClass('window-maximized');
      }
      if (!$('.dock').hasClass('dock-hidden')) {
        $('.dock').addClass('dock-hidden');
      } else {
        $('.dock').removeClass('dock-hidden');
      }
    });
  }

  function loadWindowContent (win, appName) {
    fs.readFile('./apps/' + appName + '.html', 'utf-8', function (err, data) {
      if (!err) {
        win.className += " window-" + appName;
        win.find('.window-main').innerHTML = data;
        win.style.opacity = 1;
      } else {
        console.log(err);
      }
    });
  }

  return {
    start : function (appName) {
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