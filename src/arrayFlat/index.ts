
/*
*   array 一维或者多维数组
*   return 一维数组
*   使用递归实现
* */

// function flat(array) {
//   let result = [];
//   for (let i  = 0; i < array.length; i++) {
//     const item = array[i];
//     if (item instanceof Array) {
//       console.log(result, 'result');
//       result = result.concat(flat(item));
//     } else {
//       result.push(item);
//     }
//   }
//   console.log(result, 'return 之前');
//   return result;
// }


/*
*   array 一维或者多维数组
*   return 一维数组
*   使用toString实现
*   局限性 重新生成的数组每一项都是字符
*   这种虽然简单, 但是适用性很差
* */

// function flat(arr) {
//   const str = arr.toString();
//   console.log(str);
//   return str.split(',');
// }


/*
*   array 一维或者多维数组
*   return 一维数组
*   使用reduce来实现
* */

/*
*   [1,2,3,4]
*   [[1,2],[3,4]]
*
* */

function flat(arr) {
  return arr.reduce((pre, current) => {
    console.log(pre, 'pre');
    console.log(current, 'current');
    const temp = Array.isArray(current) ? flat(current) : current;
    console.log(temp, 'temp');
    return pre.concat(temp);
  }, [])
}

export default flat;
