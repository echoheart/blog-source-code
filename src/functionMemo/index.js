/*
 es5
 */

// function memo(fn) {
//   var cache = {};
//   return function () {
//     var argsStr = Array.prototype.join.call(arguments, ',');
//     console.log(argsStr);
//     if (!cache[argsStr]) {
//       console.log('没缓存')
//       cache[argsStr] = fn.apply(undefined, arguments);
//     } else {
//         console.log('缓存了')
//     }
//     return cache[argsStr];
//   }
// }


/*
 es6
 */
// function memo(fn) {
//   const cache = {};
//   return function (...args) {
//     const argsStr = args.join.call(arguments, ',');
//     console.log(argsStr);
//     if (!cache[argsStr]) {
//       console.log('没缓存')
//       cache[argsStr] = fn.apply(undefined, args);
//     } else {
//         console.log('缓存了')
//     }
//     return cache[argsStr];
//   }
// }



//  以上两种选key的方法都存在对于对象处理成[object ***]的情况

/*
    改进版
    使用JSON将对象等序列化为字符串, 可以解决上面的问题
 */

 function memo(fn) {
   const cache = {};
   return function (...args) {
     const argsStr = JSON.stringify(args);
     console.log(argsStr);
     if (!cache[argsStr]) {
       console.log('没缓存')
       cache[argsStr] = fn.apply(undefined, args);
     } else {
         console.log('缓存了')
     }
     return cache[argsStr];
   }
 }

function add(a, b, c) {
  return a + b + c;
}

var objA = {
  a: 'a',
};
var objB = {
  a: 'b'
};

function objFn(obj) {
  return obj.a;
}

var addM = memo(add);
console.log(addM(1,2,3));
console.log(addM(1,2,3));

var objFnM = memo(objFn);
console.log(objFnM(objA));
console.log(objFnM(objB));
