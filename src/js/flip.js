require("angular");

var transform = "transform" in document.body.style ? "transform" : "webkitTransform";

module.exports = function(app) {
  app.directive("flipOn", function() {
    return {
      restrict: "A",
      link: function(scope, el, attr) {
        el = el[0];
        var first;
        scope.$watch("$index", function(now, then) {
          if (now == then || typeof then == "undefined") {
            var _ = el.offsetWidth;
            //obnoxious, but give other watches a chance to run
            setTimeout(() => first = el.getBoundingClientRect(), 100);
            return;
          }
          if (!first) return;
          var last = el.getBoundingClientRect();
          var dx = first.left - last.left;
          var dy = first.top - last.top;
          var style = `translate(${dx}px, ${dy}px)`
          el.style[transform] = style;
          //read position
          var _ = el.offsetWidth;
          el.classList.add("flipping");
          el.style.transform = `translate(0)`;
          first = last;
          setTimeout(() => el.classList.remove("flipping"), 1000);
        });
      }
    }
  });

  var forEach = function(obj, f) {
    for (var key in obj) f(obj[key], key);
  }

  app.directive("delayedStyle", function() {
    return {
      restrict: "A",
      link: function(scope, element, attr) {
        scope.$watch(attr.delayedStyle, function ngStyleWatchAction(newStyles, oldStyles) {
          setTimeout(function() {
            if (oldStyles && (newStyles !== oldStyles)) {
              forEach(oldStyles, function(val, style) { element.css(style, '');});
            }
            if (newStyles) element.css(newStyles);
          }, 10);
        }, true);
      }
    }
  })
}