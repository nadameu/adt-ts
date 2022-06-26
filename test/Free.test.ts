import * as fc from 'fast-check';
import { describe, test } from 'vitest';
import {
  Free,
  functorIdentity,
  identity,
  Join,
  makeEqFree,
  makeFunctorFree,
  makeMonadFree,
  Pure,
} from '../src';
import { TFree } from '../src/Free/internal';
import { TIdentity } from '../src/Identity/internal';
import { Eq } from '../src/typeclasses';
import { makeApplicative1Laws } from './laws/Applicative';
import { makeApply1Laws } from './laws/Apply';
import { makeEq1Laws } from './laws/Eq';
import { makeFunctor1Laws } from './laws/Functor';
import { makeMonad1Laws } from './laws/Monad';

const functorFreeIdentity = makeFunctorFree(functorIdentity);
const monadFreeIdentity = makeMonadFree(functorIdentity);

const makeEqFreeIdentity = <a>(eqA: Eq<a>) => makeEqFree(eqA, identity as any);

const makeArb = <a>(arb: fc.Arbitrary<a>) =>
  fc
    .array(fc.constant(Join), { minLength: 0, maxLength: 3 })
    .chain(levels => levels.reduce((x, f) => x.map(f), arb.map<Free<TIdentity, a>>(Pure)));

describe('Functor', () => {
  const functorLaws = makeFunctor1Laws(functorFreeIdentity)(makeEqFreeIdentity)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply1Laws(monadFreeIdentity)(makeEqFreeIdentity)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative1Laws(monadFreeIdentity)(makeEqFreeIdentity)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Monad', () => {
  const monadLaws = makeMonad1Laws(monadFreeIdentity)(makeEqFreeIdentity)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TFree<TIdentity>>(x => makeEqFree(x, identity as any))(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
