/**
 * 高频事件触发, 但是在n秒内只会执行一次, 所以节流就是稀释函数的执行

    实现思路
    每次触发事件时都判断当前是否有等待执行的延时函数
 */

 function throttle(fn, delayTime) {
    let canRun = true;
    return function() {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, delayTime * 1000)
    }
 }
function sayHi(e) {
    console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi));


const {content, title} = this.$refs(container || document.body).appendChild(dom)

