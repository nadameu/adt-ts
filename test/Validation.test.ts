import * as fc from 'fast-check';
import { describe, expect, test } from 'vitest';
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

const makeArb = <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>): fc.Arbitrary<Either<a, b>> =>
  fc.oneof(arbA.map(Left), arbB.map(Right));

describe('Functor', () => {
  const functorLaws = makeFunctor2Laws(functorValidation)(makeEqEither)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyValidation = makeApplyValidation(semigroupString);
  const applyLaws = makeApply1Laws(applyValidation)(eqB => makeEqEither(eqString, eqB))(arbB =>
    makeArb(fc.string(), arbB)
  );
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeValidation = makeApplicativeValidation(semigroupString);
  const applicativeLaws = makeApplicative1Laws(applicativeValidation)(eqB =>
    makeEqEither(eqString, eqB)
  )(arbB => makeArb(fc.string(), arbB));
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altValidation = makeAltValidation(semigroupString);
  const altLaws = makeAlt1Laws(altValidation)(eqB => makeEqEither(eqString, eqB))(arbB =>
    makeArb(fc.string(), arbB)
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
