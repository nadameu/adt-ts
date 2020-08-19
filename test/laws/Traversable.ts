import * as jsc from 'jsverify';
import {
  applicativeArray,
  applicativeIdentity,
  applicativeIterable,
  eqNumber,
  makeEqArray,
  makeEqIterable,
} from '../../src';
import { Anon, Generic1, Type1 } from '../../src/Generic';
import * as I from '../../src/Iterable/functions';
import { Applicative_1, Eq, Traversable_1 } from '../../src/typeclasses';

const makeArbIterable = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<Iterable<a>> => {
  const arbIterable = jsc.oneof([jsc.constant(I.mempty()), arb.smap(I.pure, xs => [...xs][0])]);
  const origShow = jsc.array(arb).show || String;
  arbIterable.show = xs => origShow(Array.from(xs));
  return arbIterable;
};

const makeArbArray = <a>(arb: jsc.Arbitrary<a>) => {
  const arbArray = jsc.oneof<ArrayLike<a>>([
    jsc.constant({ length: 0 }),
    arb.smap(
      x => ({ 0: x, length: 1 } as ArrayLike<a>),
      xs => xs[0]
    ),
  ]);
  const origShow = jsc.array(arb).show || String;
  arbArray.show = xs => origShow(Array.from(xs));
  return arbArray;
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
  ta: jsc.Arbitrary<Type1<t, a>>,
  a: jsc.Arbitrary<a>,
  eq: Eq<Type1<t, a>>['eq']
) => {
  const { sequence, traverse } = traversable;
  return {
    naturality: (): void => {
      const eqArray = makeEqArray({ eq } as Eq<Type1<t, a>>).eq;
      return void jsc.assertForall(jsc.fn(makeArbIterable(a)), ta, (f, ta) => {
        const a = Array.from(traverse(applicativeIterable)(f)(ta));
        const b = traverse(applicativeArray)(x => Array.from(f(x)))(ta);
        return eqArray(a)(b);
      });
    },
    identity: (): void => {
      jsc.assertForall(ta, ta => eq(sequence(applicativeIdentity)(ta))(ta));
    },
    composition: (): void => {
      const applicativeCompose = makeApplicativeCompose(applicativeIterable, applicativeArray);
      const eqCompose = makeEqIterable(makeEqArray({ eq } as Eq<Type1<t, a>>)).eq;
      return void jsc.assertForall(
        jsc.fn(makeArbIterable(a)),
        jsc.fn(makeArbArray(a)),
        ta,
        (f, g, ta) => {
          const a = traverse(applicativeCompose)((x: a) => applicativeIterable.map(g)(f(x)))(ta);
          for (const _ of a); // Making sure the inner value is recalculated every time
          const b = applicativeIterable.map(traverse(applicativeArray)(g))(
            traverse(applicativeIterable)(f)(ta)
          );
          for (const _ of b); // Making sure the inner value is recalculated every time
          return eqCompose(a)(b);
        }
      );
    },
  };
};

export const makeTraversableLaws = <t extends Generic1>(traversable: Traversable_1<t>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<t, a>>
) => (makeArb: <a>(_: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<t, a>>) =>
  laws<t, number>(traversable, makeArb(jsc.number), jsc.number, makeEq(eqNumber).eq);
