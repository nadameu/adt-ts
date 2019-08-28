import * as jsc from 'jsverify';
import { constant } from '../src/Fn/functions';

test('constant', () => {
  jsc.assertForall(jsc.number, jsc.number, (x, y) => constant(x)(y) === x);
});
