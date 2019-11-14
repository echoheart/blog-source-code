class _Promise {

  public state = 'pending';

  private callbacks = [];

  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('只接受函数');
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  public resolve(result) {
    setTimeout(() => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.callbacks.forEach((handle) => {
        handle[0] && handle[0].call(undefined, result);
      })
    }, 0)
  }
  public reject(reason) {
    setTimeout(() => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.callbacks.forEach((handle) => {
        handle[1] && handle[1].call(undefined, reason);
      })
    }, 0)
  }
  
  public then(succeed?, fail?) {
    const handle = []; 
    if (typeof succeed === 'function') {
      handle[0] = succeed;
    }
    if (typeof fail === 'function') {
      handle[1] = fail;
    }
    
    // handle[2] = new _Promise(() => {});

    this.callbacks.push(handle);
    // return handle[2];
  }

  public resolveWith() {

  }
}

export default _Promise;