// dom manipulation
HTMLElement.prototype.addClass = function (classNames) {
  this.className += ' ' + classNames
}

HTMLElement.prototype.removeClass = function (classNames) {
  classNames = classNames.split(' ');
  for (var i = 0; i < classNames.length; i++) {
    this.className = this.className.replace(classNames[i], '');
  }
}

HTMLElement.prototype.hasClass = function (classNames) {
  this.className += ' ';
  classNames = classNames.split(' ');
  for (var i = 0; i < classNames.length; i++) {
    if (!this.className.match(classNames[i] + ' ')) {
      this.className = this.className.substring(0, this.className.length - 1);
      return false
    }
  }
  this.className = this.className.substring(0, this.className.length - 1);
  return true
}

HTMLElement.prototype.find = function (selector) {
  var elems = this.querySelectorAll(selector);
  return (elems.length > 1) ? elems : elems[0];
}

// style changer
HTMLElement.prototype.show = function (option) {
  this.style.display = (option) ? option : 'block';
}

HTMLElement.prototype.hide = function () {
  this.style.display = 'none';
}

HTMLElement.prototype.css = function (obj) {
  for (param in obj) {
    this.style[param] = obj[param];
  }
}

HTMLElement.prototype.fadeOut = function () {
  var _self = this;
  _self.style.width = 0;
  _self.style.height = 0;
  _self.style.opacity = 0;
  setTimeout(function () {
    _self.style.display = 'none';
  }, 1000);
}

HTMLElement.prototype.fadeIn = function () {
  var _self = this;
  _self.style.display = 'block';
  setTimeout(function () {
    _self.style.opacity = 1;
  }, 100);
}

// String Extension
String.prototype.getLengthOfBytes = function () {
  var chinese = this.match(/[^\x00-\xff]/ig);
  return this.length + (chinese == null ? 0 : chinese.length);
}

// Utils
function $ (selector) {
  var elems = document.querySelectorAll(selector);
  return (elems.length > 1) ? elems : elems[0];
}

var $$ = (function () {

  function init (dom) {
    var _dom = [];
    if (dom instanceof HTMLElement) {
      _dom.push(dom);
    } else {
      _dom = dom;
    }
    return _dom
  }

  return {
    show : function (dom) {
      var _dom = init(dom);
      for (var i = 0; i < _dom.length; i++) {
        _dom[i].show();
      }
    },
    hide : function (dom) {
      var _dom = init(dom);
      for (var i = 0; i < _dom.length; i++) {
        _dom[i].hide();
      }
    },
    bind : function (dom, event, handler) {
      var _dom = init(dom);
      for (var i = 0; i < _dom.length; i++) {
        _dom[i].addEventListener(event, function (e) {
          e.preventDefault();
          handler(e);
        }, false);
      }
    }
  }

})();