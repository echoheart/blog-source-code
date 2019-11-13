const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const assert = chai.assert;

const deepClone = require('../../deepClone/index');

describe('deepClone', () => {
    it('是一个函数', () => {
        assert.isFunction(deepClone);
    })
    it('能复制基本类型', () => {
        const n = deepClone(2);
        assert(n === 2)
        const s = deepClone('str');
        assert(s === 'str')
        const b = deepClone(true);
        assert(b === true)
        const u = deepClone(undefined);
        assert(u === undefined)
        const empty = deepClone(null);
        assert(empty === null)
        const sym = Symbol();
        const symDeep = deepClone(sym);
        assert(sym === symDeep)
    })

    describe('对象', () => {
        it('复制普通对象', () => {
            const obj = {name: 'echo', child: {name: 'childecho'}};
            const objD = deepClone(obj);
            assert(obj !== objD);
            assert(obj.name === objD.name);
            assert(obj.child !== objD.child)
        })
        it("能够复制数组对象", () => {
            const a = [[11, 12], [21, 22], [31, 32]];
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a[0] !== a2[0]);
            assert(a[1] !== a2[1]);
            assert(a[2] !== a2[2]);
            assert.deepEqual(a, a2);
        });

        it("能够复制函数", () => {
            const a = function(x, y) {
              return x + y;
            };
            a.xxx = { yyy: { zzz: 1 } };
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx !== a2.xxx);
            assert(a(1, 2) === a2(1, 2));
          });
    })
})