class _Promise {

  public state = 'pending';
  /**
   * 每次调用then存储回调函数的数组
   */
  private callbacks = [];

  private resolveOrReject(state, data, i) {
    nextTick(() => {
      if (this.state !== 'pending') return;
      this.state = state;
      this.callbacks.forEach((handle) => {
        let x;
        try {
          x = handle[i] && handle[i].call(undefined, data);
        } catch(e) {
          handle[2].reject(e);
        }
        handle[2].resolveWith(x);
      })
    })
  }
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('只接受函数');
    }
    /**
     * 要提前绑定this
     * 因为resolve和reject是由使用者调用, this不能确定
     */
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  public resolve(result) {
    this.resolveOrReject('fulfilled', result, 0);
  }
  public reject(reason) {
    this.resolveOrReject('rejected', reason, 1);
  }
  /**
   * 首先返回了一个新的Promise实例, 为了实现链式调用
   * 将handle push进数组是为了同一个promise可以多次调用then
   * 将新的Promise实例放进handle是为了在上一次promise调用relove或者reject时
   * 可以根据上一次promise的relove或者reject的返回值做不同的处理
   * @param succeed relove的回调
   * @param fail reject的回调
   */
  public then(succeed?, fail?) {
    const handle = []; 
    if (typeof succeed === 'function') {
      handle[0] = succeed;
    }
    if (typeof fail === 'function') {
      handle[1] = fail;
    }
    
    handle[2] = new _Promise(() => {});

    this.callbacks.push(handle);
    return handle[2];
  }

  private resolveWithSelf() {
    this.reject(new TypeError);
  }
  private resolveWithPromise(x) {
    x.then((result) => {
      this.resolve(result);
    }, (reason) => {
      this.reject(reason);
    })
  }
  private getThen(x) {
    let then;
    try {
      then = x.then;
    } catch(e) {
      return this.reject(e);
    }
    return then;
  }
  private resolveWithThenable(x) {
    try {
      x.then((y) => {
        this.resolveWith(y);
      }, (r) => {
        this.reject(r);
      })
    } catch(e) {
      this.reject(e);
    }
  }
  private resolveWithObject(x) {
    const then = this.getThen(x);
    if (then instanceof Function) {
      this.resolveWithThenable(x);
    } else {
      this.resolve(x);
    }
  }

  /**
   * 
   * 为了实现then的链式调用
   * 将返回值x进行各种情况的处理, 这部分主要是参看A+规范
   * @param x then的第一个回调函数或者第二个回调函数的返回值
   */
  public resolveWith(x) {
    if (this === x) {
      this.resolveWithSelf()
    }else if (x instanceof _Promise) {
      this.resolveWithPromise(x);
    }else if (x instanceof Object) {
      this.resolveWithObject(x);
    } else {
      this.resolve(x);
    }
  }
}

export default _Promise;

/**
 * 实现兼容node和浏览器两个环境的nextTick 参考Vue的nextTick实现
 * 主要借助MutationObserver
 * 不明白的可以看看MDN介绍
 * @param fn 回调函数
 */
function nextTick(fn) {
  if (process !== undefined && typeof process.nextTick === "function") {
    return process.nextTick(fn);
  } else {
    var counter = 1;
    var observer = new MutationObserver(fn);
    var textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
      characterData: true
    });

    counter = counter + 1;
    textNode.data = String(counter);
  }
}