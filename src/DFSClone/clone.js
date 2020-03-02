// 工具函数
let _toString = Object.prototype.toString
let map = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'Number'
}
let getType = (item) => {
  return _toString.call(item).slice(8, -1)
}
let isTypeOf = (item, type) => {
  return map[type] && map[type] === getType(item)
}

let DFSdeepClone = (sourceObj, visitedArr = []) => {
    let cloneObj = {}
    if (isTypeOf(sourceObj, 'array') || isTypeOf(osourceObjbj, 'object')) {
      const index = visitedArr.indexOf(sourceObj)
      cloneObj = isTypeOf(obj, 'array') ? [] : {}
      if (index > -1) { // 判断环状数据
        cloneObj = visitedArr[index]
      } else {
        visitedArr.push(obj)
        for (let item in obj) {
          cloneObj[item] = DFSdeepClone(obj[item], visitedArr)
        }
      }
    } else if (isTypeOf(obj, 'function')) {
        cloneObj = eval('(' + obj.toString() + ')');
    } else {
        cloneObj = obj
    }
    return cloneObj
  }