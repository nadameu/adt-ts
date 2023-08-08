import * as fc from 'fast-check';
import { describe, test } from 'vitest';
import { Free, Join, makeEqFree, makeFunctorFree, makeMonadFree, Pure } from '../src';
import { TFree } from '../src/Free/internal';
import { Generic1 } from '../src/Generic';
import { Eq } from '../src/typeclasses';
import { makeEqInstance } from '../src/typeclasses/Eq';
import { makeFunctorInstance } from '../src/typeclasses/Functor';
import { makeApplicative1Laws } from './laws/Applicative';
import { makeApply1Laws } from './laws/Apply';
import { makeEq1Laws } from './laws/Eq';
import { makeFunctor1Laws } from './laws/Functor';
import { makeMonad1Laws } from './laws/Monad';

interface MightFail<i, a> {
  initialValue: i | null;
  mapping: (_: i) => a;
}
function MightFail<i, a>(initialValue: i | null, mapping: (_: i) => a): MightFail<i, a> {
  return { initialValue, mapping };
}
interface TMF extends Generic1 {
  type: MightFail<any, this['a']>;
}
const functorMightFail = makeFunctorInstance<TMF>({
  map: f => fx => MightFail(fx.initialValue, i => f(fx.mapping(i))),
});

const functorFreeMightFail = makeFunctorFree(functorMightFail);
const monadFreeMightFail = makeMonadFree(functorMightFail);
const makeEqMightFail = <a>(eqA: Eq<a>): Eq<MightFail<any, a>> =>
  makeEqInstance({
    eq: x => y => {
      if (x.initialValue === null)
        if (y.initialValue === null) return true;
        else return false;
      if (y.initialValue === null) return false;
      else return eqA.eq(x.mapping(x.initialValue))(y.mapping(y.initialValue));
    },
  });

const makeEqFreeMightFail = <a>(eqA: Eq<a>) => makeEqFree<TMF, a>(eqA, makeEqMightFail);

const makeArb = <a>(arb: fc.Arbitrary<a>) => {
  const pure = arb.map<Free<TMF, a>>(Pure);
  const tr: (_: fc.Arbitrary<Free<TMF, a>>) => fc.Arbitrary<Free<TMF, a>> = x =>
    fc.oneof(fc.constant(null), x).map(x => Join(MightFail(x, i => i)));

  const f = fc
    .array(fc.constant(tr), { minLength: 0, maxLength: 0 })
    .chain(xs => xs.reduce((x, f) => f(x), pure));

  return f;
};

describe('Functor', () => {
  const functorLaws = makeFunctor1Laws(functorFreeMightFail)(makeEqFreeMightFail)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply1Laws(monadFreeMightFail)(makeEqFreeMightFail)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative1Laws(monadFreeMightFail)(makeEqFreeMightFail)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Monad', () => {
  const monadLaws = makeMonad1Laws(monadFreeMightFail)(makeEqFreeMightFail)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TFree<TMF>>(makeEqFreeMightFail)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
