class _Promise {

  public state = 'pending';
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
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  public resolve(result) {
    this.resolveOrReject('fulfilled', result, 0);
  }
  public reject(reason) {
    this.resolveOrReject('rejected', reason, 1);
  }
  
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