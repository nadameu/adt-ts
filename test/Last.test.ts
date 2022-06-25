import { describe, test } from 'vitest';
import { semigroupLast } from '../src';
import { makeSemigroup1Laws } from './laws/Semigroup';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroup1Laws(semigroupLast)(x => x)(x => x);
  test('Semigroup - associativity', semigroupLaws.associativity);
});
