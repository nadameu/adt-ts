import * as fc from 'fast-check';
import { constant } from '../src/helpers';

test('constant', () => {
  fc.assert(fc.property(fc.double(), fc.double(), (x, y) => constant(x)(y) === x));
});
