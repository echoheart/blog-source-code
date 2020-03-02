function _new(fn, ...args) {

    const obj = Object.create(fn.prototype);
    const result = fn.apply(obj, args);
    return result instanceof Object ? result : obj;
}

function _fn(a, b) {
    this.a = a;
    this.b = b;
}

function _fnTwo(a, b) {
    this.a = a;
    this.b = b;
    return 1;
}
function _fnThree(a, b) {
    this.a = a;
    this.b = b;
    return {};
}

console.log(new _fn(1,2))
console.log(new _fnTwo(1,2))
console.log(new _fnThree(1,2))
console.log('##############');

console.log(_new(_fn, 1,2));
console.log(_new(_fnTwo, 1,2));
console.log(_new(_fnThree, 1,2));