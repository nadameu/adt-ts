import * as fc from 'fast-check';
import {
  applicativeArrayLike,
  applicativeIdentity,
  applicativeIterable,
  eqNumber,
  makeEqArrayLike,
  makeEqIterable,
} from '../../src';
import { Anon, Generic1, Type1 } from '../../src/Generic';
import * as I from '../../src/Iterable/functions';
import { Applicative_1, Eq, Traversable_1 } from '../../src/typeclasses';

const makeArbIterable = <a>(arb: fc.Arbitrary<a>): fc.Arbitrary<Iterable<a>> => {
  return fc.oneof(fc.constant(I.mempty()), arb.map(I.pure));
};

const makeArbArray = <a>(arb: fc.Arbitrary<a>) => {
  return fc.oneof<fc.Arbitrary<ArrayLike<a>>[]>(
    fc.constant({ length: 0 }),
    arb.map(x => ({ '0': x, length: 1 }))
  );
};

type Compose<f extends Generic1, g extends Generic1, a> = Type1<f, Type1<g, a>>;

interface TCompose<f extends Generic1, g extends Generic1> extends Generic1 {
  type: Compose<f, g, this['a']>;
}
const makeApplicativeCompose = <f extends Generic1, g extends Generic1>(
  aF: Applicative_1<f>,
  aG: Applicative_1<g>
) =>
  ({
    apply: f => x => aF.apply(aF.map(aG.apply as any)(f))(x),
    map: f => x => aF.map(aG.map(f))(x),
    pure: a => aF.pure(aG.pure(a)),
  } as Applicative_1<TCompose<f, g>>);

const laws = <t extends Generic1, a>(
  traversable: Anon<Traversable_1<t>>,
  ta: fc.Arbitrary<Type1<t, a>>,
  a: fc.Arbitrary<a>,
  eq: Eq<Type1<t, a>>['eq']
) => {
  const { sequence, traverse } = traversable;
  return {
    naturality: (): void => {
      const eqArray = makeEqArrayLike({ eq } as Eq<Type1<t, a>>).eq;
      return void fc.assert(
        fc.property(fc.func(makeArbIterable(a)), ta, (f, ta) => {
          const a = Array.from(traverse(applicativeIterable)(f)(ta));
          const b = traverse(applicativeArrayLike)(x => Array.from(f(x)))(ta);
          return eqArray(a)(b);
        })
      );
    },
    identity: (): void => {
      fc.assert(fc.property(ta, ta => eq(sequence(applicativeIdentity)(ta))(ta)));
    },
    composition: (): void => {
      const applicativeCompose = makeApplicativeCompose(applicativeIterable, applicativeArrayLike);
      const eqCompose = makeEqIterable(makeEqArrayLike({ eq } as Eq<Type1<t, a>>)).eq;
      return void fc.assert(
        fc.property(fc.func(makeArbIterable(a)), fc.func(makeArbArray(a)), ta, (f, g, ta) => {
          const a = traverse(applicativeCompose)((x: a) => applicativeIterable.map(g)(f(x)))(ta);
          for (const _ of a); // Making sure the inner value is recalculated every time
          const b = applicativeIterable.map(traverse(applicativeArrayLike)(g))(
            traverse(applicativeIterable)(f)(ta)
          );
          for (const _ of b); // Making sure the inner value is recalculated every time
          return eqCompose(a)(b);
        })
      );
    },
  };
};

export const makeTraversableLaws =
  <t extends Generic1>(traversable: Traversable_1<t>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<t, a>>) =>
  (makeArb: <a>(_: fc.Arbitrary<a>) => fc.Arbitrary<Type1<t, a>>) =>
    laws<t, number>(traversable, makeArb(fc.double()), fc.double(), makeEq(eqNumber).eq);
