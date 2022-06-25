import * as fc from 'fast-check';
import { test } from 'vitest';
import { constant } from '../src';

test('constant', () => {
  fc.assert(
    fc.property(
      fc.double({ noNaN: true }),
      fc.double({ noNaN: true }),
      (x, y) => constant(x)(y) === x
    )
  );
});
