
class Clone {
    constructor() {
        /*
        * 为了解决克隆环的问题, 所以记录每次被拷贝过的对象
        * 使用类是因为每一个实例对应不同的cached
        * 否则克隆不同的对象时,会使用同一个cached数组,容易混淆出现问题
        * */
        this.cached = [];
    }
    deepClone(source) {
        if (source instanceof Object) {
            let cachedDist = this.findCache(source);
            /*
            * 如果发现对象被克隆过了,就不在克隆而是返回cached中保存的数据
            * */
            if (cachedDist) {
                return cachedDist;
            } else {
                /*
                * 如果没有没克隆过, 那么就克隆一份数据
                * */
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
                    dist = new Object();
                }
                /*
                * 将克隆的数据存储到cached当中
                * 一定要在下一次开始克隆之前将数据存到cached中
                * 如果没有在下一次克隆之前存储到缓存中, 如果碰到存在环的情况
                * 就会死循环的不停的克隆, 直到爆栈出错
                * */
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