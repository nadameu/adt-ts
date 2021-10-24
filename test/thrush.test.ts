import * as fc from 'fast-check';
import { thrush } from '../src/helpers';

test('thrush', () => {
  fc.assert(fc.property(fc.func(fc.double()), fc.double(), (f, x) => thrush(x)(f) === f(x)));
});
