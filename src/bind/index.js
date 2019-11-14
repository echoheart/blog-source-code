 
/**
 * ES6方式实现, 代码简洁
 * @param {绑定的this}} asThis 
 * @param  {...any} args 
 */
function ES6bind (asThis, ...args) {
  /*
   获取到调用bind的函数
   */
  const fn = this;

  if (typeof(fn) !== 'function') {
    throw new Error('必须是函数');
  }
  return function (...innerArgs) {
    return fn.call(asThis, ...args, ...innerArgs)
  }
}

/**
 * ES5实现, 兼容性强
 */
var slice = Array.prototype.slice;
function ES5bind () {
  var asThis = arguments[0];
  var args = slice.call(arguments, 1);
  var fn = this;
  if (typeof(fn) !== 'function') {
    throw new Error('必须是函数');
  }
  return function () {
    var innerArgs = slice.call(arguments);
    return fn.apply(asThis, args.concat(innerArgs));
  }
}


let  bind = ES6bind;

if (!Function.prototype.bind) {
  Function.prototype.bind = bind = ES5bind;
}

 module.exports = bind;
