// see here: https://gist.github.com/SitePointEditors/4f6643d62a87aece860b0784c6eeffd2
// for a more complete and extended DOM helper

// Object.assign Polyfill
(function() {
  if (typeof Object.assign != 'function') {
    Object.assign = function(target) {
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }
})();

window.$ = function $(selector) {
  var nodeList = document.querySelectorAll(selector);
  // var elements = Array.prototype.slice.call(nodeList);
  var elements = [].slice.call(nodeList);

  function html(newHtml) {
    elements.forEach(function(element) {
      element.innerHTML = newHtml;
    });

    return api;
  }

  function css(newCss) {
    elements.forEach(function(element) {
      Object.assign(element.style, newCss);
    });

    return api;
  }

  function on(event, handler, options) {
    elements.forEach(function(element) {
      element.addEventListener(event, handler, options);
    });

    return api;
  }

  function off(event, handler) {
    elements.forEach(function(element) {
      element.removeEventListener(event, handler);
    });

    return api;
  }

  var api = {
    elements: elements,
    html: html,
    css: css,
    on: on,
  };

  return api;
};
