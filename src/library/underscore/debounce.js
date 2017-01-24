var now = Date.now || function() {
    return new Date().getTime();
  };
var debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    now = Date.now || function() {
    return new Date().getTime();
  };
    var later = function() {
      var last = now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;//封装后的function可以赋给一个对象OR apply bind
      args = arguments;
      timestamp = now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);//因为这步所以later 中执行func 前需要判断是否为immediate
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };
