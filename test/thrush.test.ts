import * as fc from 'fast-check';
import { test } from 'vitest';
import { thrush } from '../src';

test('thrush', () => {
  fc.assert(
    fc.property(
      fc.func(fc.double({ noNaN: true })),
      fc.double({ noNaN: true }),
      (f, x) => thrush(x)(f) === f(x)
    )
  );
});
