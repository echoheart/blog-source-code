/**
 * 触发高频事件后n秒内只会执行一次, 如果n秒呢事件又被触发, 则重新计算时间
    实现思路: 每次触发事件时都取消之前的延时调用方法
 */

function debounce(fn, delayTime) {
    let timer = null;   //设置一个标记来存储定时器返回的值
    return function() {
        window.clearTimeout(timer); //  每当用户输入的时候就把前一个计时器清除掉

        timer = setTimeout(() => {  //  然后在创建一个新的计时器在delayTime之后执行fn
            fn.apply(this, arguments);
        }, delayTime * 1000)
    }
}

function sayHi() {
    console.log('防抖成功');
  }

const input = document.getElementById('input');
input.addEventListener('input', debounce(sayHi)); // 防抖