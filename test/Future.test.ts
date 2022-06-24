import * as fc from 'fast-check';
import { describe, test } from 'vitest';
import { Future } from '../src/Future/definitions';
import { apply, map, pure, run } from '../src/Future/functions/original';
import { compose, identity, pipeValue } from '../src/helpers';

const toPromise = <a>(f: Future<a>): Promise<a> =>
  new Promise(res => {
    run(res)(f);
  });

const areEqual = async <a>(...futures: Future<a>[]): Promise<boolean> => {
  if (futures.length < 2) return true;
  const values: a[] = await Promise.all(futures.map(toPromise));
  let first = values[0];
  for (let i = 1; i < values.length; i++) {
    const curr = values[i];
    if (curr !== first) return false;
  }
  return true;
};

describe('Functor', () => {
  test('Functor - identity', async () => {
    const arb = fc.double({ noNaN: true }).map(pure);
    const prop = fc.asyncProperty(arb, x => {
      const y = map(identity)(x);
      return areEqual(x, y);
    });
    await fc.assert(prop);
  });
  test('Functor - composition', async () => {
    const f = fc.func(fc.double({ noNaN: true }));
    const fx = fc.double({ noNaN: true }).map(pure);
    await fc.assert(
      fc.asyncProperty(f, f, fx, (f, g, fx) => {
        const fa = pipeValue(fx, map(f), map(g));
        const fb = pipeValue(
          fx,
          map(x => g(f(x)))
        );
        return areEqual(fa, fb);
      })
    );
  });
});

describe('Apply', () => {
  test('Apply - composition', async () => {
    const ff = fc.func(fc.double({ noNaN: true })).map(pure);
    const fa = fc.double({ noNaN: true }).map(pure);
    await fc.assert(
      fc.asyncProperty(ff, ff, fa, (a, u, v) => {
        const fx = apply(apply(map(compose)(a))(u))(v);
        const fy = apply(a)(apply(u)(v));
        return areEqual(fx, fy);
      })
    );
  });
});

describe('Applicative', () => {
  // const applicativeLaws = makeApplicative1Laws(applicativeFuture)(makeEqFuture)(makeArb);
  test('Applicative - identity', async () => {
    const fa = fc.double({ noNaN: true }).map(pure);
    await fc.assert(
      fc.asyncProperty(fa, fa => {
        const fb = apply<number, number>(pure(identity))(fa);
        return areEqual(fa, fb);
      })
    );
  });
  // test('Applicative - homomorphism', applicativeLaws.homomorphism);
  // test('Applicative - interchange', applicativeLaws.interchange);
});
/*

describe('Alt', () => {
  const altLaws = makeAlt1Laws(altFuture)(makeEqFuture)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Plus', () => {
  const plusLaws = makePlusLaws(plusFuture)(makeEqFuture)(makeArb);
  test('Plus - left identity', plusLaws.leftIdentity);
  test('Plus - right identity', plusLaws.rightIdentity);
  test('Plus - annihilation', plusLaws.annihilation);
});

describe('Alternative', () => {
  const alternativeLaws = makeAlternativeLaws(alternativeFuture)(makeEqFuture)(makeArb);
  test('Alternative - distributivity', alternativeLaws.distributivity);
  test('Alternative - annihilation', alternativeLaws.annihilation);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldable1Laws(foldableFuture)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBind1Laws(bindFuture)(makeEqFuture)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonad1Laws(monadFuture)(makeEqFuture)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('MonadThrow', () => {
  const monadThrowLaws = makeMonadThrow1Laws(monadThrowFuture)(makeEqFuture)(
    fc.constant(undefined as void)
  )(makeArb);
  test('MonadThrow - left zero', monadThrowLaws.leftZero);
});

describe('MonadError', () => {
  const monadErrorLaws = makeMonadError1Laws(monadErrorFuture)(makeEqFuture)(
    fc.constant(undefined as void)
  )(makeArb);
  test('MonadError - catch', monadErrorLaws.catch);
  test('MonadError - pure', monadErrorLaws.pure);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TFuture>(makeEqFuture)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});

describe('Traversable', () => {
  const traversableLaws = makeTraversableLaws(traversableFuture)(makeEqFuture)(makeArb);
  test('Traversable - naturality', traversableLaws.naturality);
  test('Traversable - identity', traversableLaws.identity);
  test('Traversable - composition', traversableLaws.composition);
});
*/
