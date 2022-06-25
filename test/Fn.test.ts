import * as fc from 'fast-check';
import { describe, expect, test } from 'vitest';
import { applicativeFn, applyFn, bindFn, fn, functorFn, monadFn } from '../src';
import { Eq } from '../src/typeclasses';
import { makeApplicative2Laws } from './laws/Applicative';
import { makeApply2Laws } from './laws/Apply';
import { makeBind2Laws } from './laws/Bind';
import { makeFunctor2Laws } from './laws/Functor';
import { makeMonad2Laws } from './laws/Monad';

let currentArb: fc.Arbitrary<unknown>;

const makeArb = <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>): fc.Arbitrary<(_: a) => b> => {
  currentArb = arbA as any;
  return fc.func(arbB);
};

const makeEqFn = <a, b>(eqA: Eq<a>, eqB: Eq<b>) =>
  ({
    eq: f => g => fc.assert(fc.property(currentArb as fc.Arbitrary<a>, a => eqB.eq(f(a))(g(a)))),
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

test('apply', () => {
  const mult = (x: number) => (y: number) => x * y;
  const inc = (x: number) => x + 1;
  const f = fn.apply(mult)(inc);
  expect(f(4)).toEqual(20);
});
