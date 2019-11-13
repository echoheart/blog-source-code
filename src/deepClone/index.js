
class Clone {
    constructor() {
        this.cached = [];
    }
    deepClone(source) {
        if (source instanceof Object) {
            let cachedDist = this.findCache(source)
            if (cachedDist) {
                return cachedDist;
            } else {
                let dist = null;
                if (source instanceof Array) {
                    dist = new Array();
                } else if (source instanceof Function) {
                    dist = function () {
                        return source.call(this, ...arguments)
                    }
                } else if (source instanceof RegExp) {
                    dist = new RegExp(source.source, source.flags);
                } else if (source instanceof Date) {
                    dist = new Date(source);
                } else {
                    dist = new Object()
                }
                this.cached.push([source, dist]);
                for (let key in source) {
                    if (source.hasOwnProperty(key)) {
                        dist[key] = this.deepClone(source[key]);
                    }
                }
                return dist;
            }
        }
        return source;
    }
    
    findCache(source) {
        for (let i = 0; i < this.cached.length; i++) {
            if (source === this.cached[i][0]) {
                return this.cached[i][1];
            }
        }
        return undefined;
    }
}
module.exports = Clone;