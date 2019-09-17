import * as jsc from 'jsverify';
import { constant } from '../src/helpers';

test('constant', () => {
  jsc.assertForall(jsc.number, jsc.number, (x, y) => constant(x)(y) === x);
});
