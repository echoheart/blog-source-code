const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const assert = chai.assert;

const Clone = require('../../deepClone/index');

describe('deepClone', () => {
    it('是一个函数', () => {
        assert.isFunction(new Clone().deepClone);
    })
    it('能复制基本类型', () => {
        const n = new Clone().deepClone(2);
        assert(n === 2)
        const s = new Clone().deepClone('str');
        assert(s === 'str')
        const b = new Clone().deepClone(true);
        assert(b === true)
        const u = new Clone().deepClone(undefined);
        assert(u === undefined)
        const empty = new Clone().deepClone(null);
        assert(empty === null)
        const sym = Symbol();
        const symDeep = new Clone().deepClone(sym);
        assert(sym === symDeep)
    })

    describe('对象', () => {
        it('复制普通对象', () => {
            const obj = {name: 'echo', child: {name: 'childecho'}};
            const objD = new Clone().deepClone(obj);
            assert(obj !== objD);
            assert(obj.name === objD.name);
            assert(obj.child !== objD.child)
        })
        it("能够复制数组对象", () => {
            const a = [[11, 12], [21, 22], [31, 32]];
            const a2 = new Clone().deepClone(a);
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
            const a2 = new Clone().deepClone(a);
            assert(a !== a2);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx !== a2.xxx);
            assert(a(1, 2) === a2(1, 2));
        });
        it("环也能复制", () => {
            const a = { name: "方方" };
            a.self = a;
            const a2 = new Clone().deepClone(a);
            assert(a !== a2);
            assert(a.name === a2.name);
            assert(a.self !== a2.self);
        });
        xit("不会爆栈", () => {
                    const a = { child: null };
                    let b = a;
                    for (let i = 0; i <5000; i++) {
                        b.child = {
                            child: null
                        };
                        b = b.child;
                    }
            const a2 = new Clone().deepClone(a);
            assert(a !== a2);
            assert(a.child !== a2.child);
        });

        it("可以复制正则表达式", () => {
            const a = new RegExp("hi\\d+", "gi");
            a.xxx = { yyy: { zzz: 1 } };
            const a2 = new Clone().deepClone(a);
            assert(a.source === a2.source);
            assert(a.flags === a2.flags);
            assert(a !== a2);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx !== a2.xxx);
        });

        it("可以复制日期", () => {
            const a = new Date();
            a.xxx = { yyy: { zzz: 1 } };
            const a2 = new Clone().deepClone(a);
            assert(a !== a2);
            assert(a.getTime() === a2.getTime());
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx !== a2.xxx);
        });

        it("自动跳过原型属性", () => {
            const a = Object.create({ name: "a" });
            a.xxx = { yyy: { zzz: 1 } };
            const a2 = new Clone().deepClone(a);
            assert(a !== a2);
            assert.isFalse("name" in a2);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx !== a2.xxx);
        });
        it("很复杂的对象", () => {
            const a = {
              n: NaN,
              n2: Infinity,
              s: "",
              bool: false,
              null: null,
              u: undefined,
              sym: Symbol(),
              o: {
                n: NaN,
                n2: Infinity,
                s: "",
                bool: false,
                null: null,
                u: undefined,
                sym: Symbol()
              },
              array: [
                {
                  n: NaN,
                  n2: Infinity,
                  s: "",
                  bool: false,
                  null: null,
                  u: undefined,
                  sym: Symbol()
                }
              ]
            };
            const a2 = new Clone().deepClone(a);
            assert(a !== a2);
            assert.isNaN(a2.n);
            assert(a.n2 === a2.n2);
            assert(a.s === a2.s);
            assert(a.bool === a2.bool);
            assert(a.null === a2.null);
            assert(a.u === a2.u);
            assert(a.sym === a2.sym);
            assert(a.o !== a2.o);
            assert.isNaN(a2.o.n);
            assert(a.o.n2 === a2.o.n2);
            assert(a.o.s === a2.o.s);
            assert(a.o.bool === a2.o.bool);
            assert(a.o.null === a2.o.null);
            assert(a.o.u === a2.o.u);
            assert(a.o.sym === a2.o.sym);
            assert(a.array !== a2.array);
            assert(a.array[0] !== a2.array[0]);
            assert.isNaN(a2.array[0].n);
            assert(a.array[0].n2 === a2.array[0].n2);
            assert(a.array[0].s === a2.array[0].s);
            assert(a.array[0].bool === a2.array[0].bool);
            assert(a.array[0].null === a2.array[0].null);
            assert(a.array[0].u === a2.array[0].u);
            assert(a.array[0].sym === a2.array[0].sym);
        });
    })
})