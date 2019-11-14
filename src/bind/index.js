 
/**
 * ES6方式实现, 代码简洁, 不支持new
 * @param {绑定的this} asThis 
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
 * ES5实现, 兼容性强, 可读性差. 不支持new
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

 
/**
 * ES6方式实现, 代码简洁, 支持new
 * @param {绑定的this} asThis 
 * @param  {...any} args 
 */
function ES6bindWithNew (asThis, ...args) {
  /*
   获取到调用bind的函数
   */
  const fn = this;

  if (typeof(fn) !== 'function') {
    throw new Error('必须是函数');
  }
  /**
   * 最终bind返回的函数是result
   * result被new关键字调用
   * 所以要判断result函数return的this是不是result的实例
   * 如果是那么说明result是被new操作符调用了, fn.call的第一个参数就应该是result生成的实例也就是this
   * 否则就说明是普通调用, 那就使用asThis作为绑定的this
   * 除了 this instanceof result 还可以使用
   * this.__proto === result.prototype
   * 但是__proto__是私有属性官方不建议使用
   * 还可以使用 result.prototyoe.isProtypeOf(this) (result的prototype是this的prototype)
   * 都可以判断 this 是不是 result的实例
   *
   * @param {*} innerArgs
   * @returns
   */

  const result = function (...innerArgs) {
    
    return fn.call(
      this instanceof result ? this : asThis, 
      ...args, 
      ...innerArgs
      )
  }
  /**
   * 为了使result生成实例的原型是fn的原型
   */
  result.prototype = fn.prototype;
  return result
}

/**
 * ES5实现, 兼容性强, 可读性差 支持new
 */
var slice = Array.prototype.slice;
function ES5bindWithNew () {
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


let  bind = ES6bindWithNew;

if (!Function.prototype.bind) {
  Function.prototype.bind = bind = ES5bindWithNew;
}

 module.exports = bind;
