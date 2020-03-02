class RequestDecorator {
    constructor (maxLimit = 5, requestApi, needChange2Promise) {
      // 最大并发量
      this.maxLimit = maxLimit;
      // 请求队列,若当前请求并发量已经超过maxLimit,则将该请求加入到阻塞请求队列中
      this.requestQueue = [];
      // 当前并发量数目
      this.currentConcurrent = 0;
      this.requestApi = requestApi;
    }
    // 发起请求api
    async request(...args) {
      if (this.currentConcurrent >= this.maxLimit) {
        await this.startBlocking();
      }

      try {
          this.currentConcurrent++;
          const result = this.requestApi(...args);
          return Promise.resolve(result);
      } catch(e) {
          return Promise.reject(e);
      } finally {
        this.currentConcurrent--;
        this.next();
      }
      
    }
    // 新建一个promise,并且将该reolsve函数放入到requestQueue队列里。
    // 当调用next函数的时候，会从队列里取出一个resolve函数并执行。
    startBlocking() {
     let _resolve = null;
     const promise = new Promise((r) => _resolve = r);
     this.requestQueue.push(_resolve);
     return promise
    }
    // 从请求队列里取出队首的resolve并执行。
    next() {
      if (this.requestQueue.length > 0) {
          this.requestQueue.shift()();
      }
    }
  }
  

  async function fn() {
      console.log(1);
      const result = await time();
        console.log(5);
        console.log(result);
    
  }

  function time() {
    console.log(2)
    return new Promise((r, j) => {
        console.log(3)
        setTimeout(() => {
            r('result')
        }, 1000 * 5)
        console.log(4)
    })
  }

  fn();