import * as jsc from 'jsverify';
import { thrush } from '../src/thrush';

test('thrush', () => {
  jsc.assertForall(jsc.fn(jsc.number), jsc.number, (f, x) => thrush(x)(f) === f(x));
});
