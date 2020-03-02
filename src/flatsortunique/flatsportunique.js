function flat(arr) {
    const deep = Infinity;

    return arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) ? flat(cur) : cur);
    }, [])
}
/**非递归实现 */
function _flat(arr) {
    const newArr = []
    while(arr.length > 0) {
        const item = arr.shift();
        if (Array.isArray(item)) {
            arr.unshift(...item);
        } else {
            newArr.push(item);
        }
    }
    return newArr;
}

function unique(arr) {
    return [...new Set(arr)];
}
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
console.log(unique(flat(arr1)));