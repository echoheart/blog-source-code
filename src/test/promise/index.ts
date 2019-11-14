import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
chai.use(sinonChai);

const assert = chai.assert;
import Promise from "../../promise/index";

describe('chai可以使用', () => {
  it('生效了', () => {
    assert(1 === 1);
  })
})

describe('Promise', () => {
  it('是一个类', () => {
    assert.isFunction(Promise);
    assert.isObject(Promise.prototype);
  })

  it('Promise 必须接受一个函数', () => {
    assert.throw(() => {
      //@ts-ignore
      new Promise()
      //@ts-ignore
      new Promise(1)
      //@ts-ignore
      new Promise(true)
    })
  })

  it('new Promise 生成的对象, 对象有then方法', () => {
    const promise = new Promise(() => {})
    assert.isFunction(promise.then);
  })

  it('new Promise 传入的fn立即执行', () => {
    const fn = sinon.fake();
    new Promise(fn)
    //@ts-ignore
    assert(fn.called);
  })

  it('new Promise 传入的fn必须接受resolve和reject两个函数', (done) => {
    new Promise((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
      done();
    })
  })

  it('promise.then(success) 中的success会在resolve被调用时被执行', (done) => {
    const success = sinon.fake();
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called);
      resolve()
      setTimeout(() => {
        assert(success.called);
        done();
      })
    })
    // @ts-ignore
    promise.then(success)
  })

  it('promise.then(null,fail) 中的fail会在reject被调用时被执行', (done) => {
    const fail = sinon.fake();
    
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called);
      reject()
      setTimeout(() => {
        assert(fail.called);
        done();
      }, 0)
    })
    // @ts-ignore
    promise.then(null, fail)
  })

  it('then传入的两个参数不是函数', () => {
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    // @ts-ignore
    promise.then(null, false)
  })

  it('符合PromiseA+2.2.2规范', (done) => {
    const success = sinon.fake();
    const promise = new Promise((resolve, reject) => {      
      assert.isFalse(success.called);
      resolve(123)
      resolve(789)
      setTimeout(() => {
        assert(promise.state === 'fulfilled')
        assert.isTrue(success.calledOnce);
        assert(success.calledWith(123));
        done()
      })
    })    
    // @ts-ignore
    promise.then(success)
  })
  it('符合PromiseA+2.2.3规范', (done) => {
    const fail = sinon.fake();
    const promise = new Promise((resolve, reject) => {      
      assert.isFalse(fail.called); 
      reject(123)
      reject(789)
      setTimeout(() => {
        assert(promise.state === 'rejected')
        assert.isTrue(fail.calledOnce);
        assert(fail.calledWith(123));
        done()
      })
    })
    // @ts-ignore
    promise.then(null, fail)
  })

  it('符合PromiseA+2.2.4规范==>在我的代码执行完之前, 不得调用then传入的第一个函数succeed', (done) => {
    const success = sinon.fake();
    const promise = new Promise((resolve, reject) => {      
      resolve()
    })
    // @ts-ignore
    promise.then(success)
    assert.isFalse(success.called);
    setTimeout(() => {
      assert.isTrue(success.called);
      done();
    })
  })
  it('符合PromiseA+2.2.4规范==>在我的代码执行完之前, 不得调用then传入的第二个函数fali', (done) => {
    const fail = sinon.fake();
    const promise = new Promise((resolve, reject) => {      
      reject()
    })
    // @ts-ignore
    promise.then(null, fail)
    assert.isFalse(fail.called);
    setTimeout(() => {
      assert.isTrue(fail.called);
      done();
    })
  })

  it('符合PromiseA+2.2.5规范==>then的第一个参数函数必须被调用,并且不能指定这个函数的this', (done) => {
    
    const promise = new Promise((resolve, reject) => {      
      resolve()
    })
    // @ts-ignore
    promise.then(function () {
      'use strict'
      assert(this === undefined);
      done();
    })
  })
  it('符合PromiseA+2.2.5规范==>then的第二个参数函数必须被调用,并且不能指定这个函数的this', (done) => {
    
    const promise = new Promise((resolve, reject) => {      
      reject()
    })
    // @ts-ignore
    promise.then(null, function () {
      'use strict'
      assert(this === undefined);
      done();
    })
  })

  it('2.2.6 then可以在同一个promise里被多次调用===>(resolve)', (done) => {
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    const promise = new Promise((resolve, reject) => {      
      resolve()
    })
    // @ts-ignore
    promise.then(callbacks[0]);
    promise.then(callbacks[1]);
    promise.then(callbacks[2]);
    setTimeout(() => {
      assert(callbacks[0].called);
      assert(callbacks[1].called);
      assert(callbacks[2].called);
      assert(callbacks[1].calledAfter(callbacks[0]));
      assert(callbacks[2].calledAfter(callbacks[1]));
      done();
    })
  })

  it('2.2.6 then可以在同一个promise里被多次调用==>(reject)', (done) => {
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    const promise = new Promise((resolve, reject) => {      
      reject()
    })
    // @ts-ignore
    promise.then(null, callbacks[0]);
    promise.then(null, callbacks[1]);
    promise.then(null, callbacks[2]);
    setTimeout(() => {
      assert(callbacks[0].called);
      assert(callbacks[1].called);
      assert(callbacks[2].called);
      assert(callbacks[1].calledAfter(callbacks[0]));
      assert(callbacks[2].calledAfter(callbacks[1]));
      done();
    })
  })

  // it('2.2.7 then返回一个Promise', () => {
  //   const promise = new Promise((resolve, reject) => {      
  //     resolve()
  //   })
  //   const promise2: any = promise.then();
  //   assert(promise2 instanceof Promise);
  // })

})