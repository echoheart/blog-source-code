function deepClone(source) {
    if (source instanceof Object) {
        let dist = new Object();
        if (source instanceof Array) {
            dist = new Array();
        } else if (source instanceof Function) {
            dist = function () {
                return source.call(this, ...arguments)
            }
        }
        for (let key in source) {
            dist[key] = deepClone(source[key]);
        }
        return dist;
    }
    return source;
}

module.exports = deepClone;