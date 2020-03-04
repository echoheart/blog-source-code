function fn(num) {
    let num1 = num / 10;
    let num2 = num % 10;
    if (num1 < 1) {
        /**出口条件 */
        return num
    } else {
        num1 = parseInt(num1)
        return `${num2}${fn(num1)}`
    }
}
var a = fn(12345)
console.log(a)
console.log(typeof a)