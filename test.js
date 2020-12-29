function trigger(fun, wait) {
  let timer;
  return function (args) {
    if (!timer) {
      fun(args);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    }
  };
}
