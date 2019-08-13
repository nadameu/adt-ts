import { semigroupFirst } from '../src/First';
import { makeSemigroup1Laws } from './laws/Semigroup';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroup1Laws(semigroupFirst)(x => x)(x => x);
  test('Semigroup - associativity', semigroupLaws.associativity);
});
