import * as jsc from 'jsverify';
import { applicativeFn, applyFn, bindFn, functorFn, monadFn } from '../src/Fn';
import { Eq } from '../src/typeclasses';
import { makeApplicative2Laws } from './laws/Applicative';
import { makeApply2Laws } from './laws/Apply';
import { makeBind2Laws } from './laws/Bind';
import { makeFunctor2Laws } from './laws/Functor';
import { makeMonad2Laws } from './laws/Monad';

let currentArb: jsc.Arbitrary<unknown>;

const makeArb = <a, b>(
  arbA: jsc.Arbitrary<a>,
  arbB: jsc.Arbitrary<b>
): jsc.Arbitrary<(_: a) => b> => {
  currentArb = arbA as any;
  return jsc.fn(arbB);
};

const makeEqFn = <a, b>(eqA: Eq<a>, eqB: Eq<b>) =>
  ({
    eq: f => g => (jsc.assertForall(currentArb as jsc.Arbitrary<a>, a => eqB.eq(f(a))(g(a))), true),
  } as Eq<(_: a) => b>);

describe('Functor', () => {
  const functorLaws = makeFunctor2Laws(functorFn)(makeEqFn)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply2Laws(applyFn)(makeEqFn)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative2Laws(applicativeFn)(makeEqFn)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Bind', () => {
  const bindLaws = makeBind2Laws(bindFn)(makeEqFn)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonad2Laws(monadFn)(makeEqFn)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});
