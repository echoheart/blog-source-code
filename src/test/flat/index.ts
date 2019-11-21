import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
chai.use(sinonChai);
const assert = chai.assert;

import flat from '../../arrayFlat/index';


describe('flat', () => {
  it('处理一维数组', () => {
    const arr = [1,2,3,4];
    assert.deepEqual(flat(arr), arr);
  });

  it('处理多维数组', () => {
    const arr = [[1,2],[3,[4,[5,[6]]]]];
    const flatArray = flat(arr);
    const result = [1,2,3,4,5,6];

    flatArray.forEach((item, index) => {
      assert.isTrue(result[index] === item)
    })
  })
});
