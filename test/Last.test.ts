import { semigroupLast } from '../src/Last';
import { makeSemigroup1Laws } from './laws/Semigroup';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroup1Laws(semigroupLast)(x => x)(x => x);
  test('Semigroup - associativity', semigroupLaws.associativity);
});
