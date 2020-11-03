import * as jsc from 'jsverify';
import {
  A,
  Either,
  eqNumber,
  eqString,
  functorValidation,
  Left,
  makeAltValidation,
  makeApplicativeValidation,
  makeApplyValidation,
  makeEqArray,
  makeEqArrayLike,
  makeEqEither,
  pipeValue,
  Right,
  semigroupArray,
  semigroupString,
} from '../src';
import { makeAlt1Laws } from './laws/Alt';
import { makeApplicative1Laws } from './laws/Applicative';
import { makeApply1Laws } from './laws/Apply';
import { makeFunctor2Laws } from './laws/Functor';

const makeArb = <a, b>(
  arbA: jsc.Arbitrary<a>,
  arbB: jsc.Arbitrary<b>
): jsc.Arbitrary<Either<a, b>> =>
  jsc.oneof([arbA.smap(Left, x => x.leftValue), arbB.smap(Right, x => x.rightValue)]);

describe('Functor', () => {
  const functorLaws = makeFunctor2Laws(functorValidation)(makeEqEither)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyValidation = makeApplyValidation(semigroupString);
  const applyLaws = makeApply1Laws(applyValidation)(eqB => makeEqEither(eqString, eqB))(arbB =>
    makeArb(jsc.string, arbB)
  );
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeValidation = makeApplicativeValidation(semigroupString);
  const applicativeLaws = makeApplicative1Laws(applicativeValidation)(eqB =>
    makeEqEither(eqString, eqB)
  )(arbB => makeArb(jsc.string, arbB));
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altValidation = makeAltValidation(semigroupString);
  const altLaws = makeAlt1Laws(altValidation)(eqB => makeEqEither(eqString, eqB))(arbB =>
    makeArb(jsc.string, arbB)
  );
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

test('traverse', () => {
  const d = pipeValue([Left(['a']), Left(['b']), Right(42)]).pipe(
    A.sequence(makeApplicativeValidation(semigroupArray))
  );
  expect(makeEqEither(makeEqArray(eqString), makeEqArray(eqNumber)).eq(d)(Left(['a', 'b']))).toBe(
    true
  );
});
