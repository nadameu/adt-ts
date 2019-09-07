import * as jsc from 'jsverify';
import {
  applicativeEither,
  applicativeIdentity,
  applicativeMaybe,
  Either,
  either,
  eqNumber,
  eqString,
  Just,
  Left,
  makeEqEither,
  makeEqMaybe,
  Maybe,
  Nothing,
  Right,
} from '../../src';
import { Anon, Generic1, Generic2, Type1, Type2 } from '../../src/Generic';
import { Applicative_1, Applicative_2, Eq, Traversable_1 } from '../../src/typeclasses';

const makeArbMaybe = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<Maybe<a>> => {
  const arbMaybe = jsc.oneof([jsc.constant(Nothing), arb.smap(Just, ({ value }) => value)]);
  arbMaybe.show = x => (x.isNothing ? 'Nothing' : `Just(${arb.show!(x.value)})`);
  return arbMaybe;
};

const makeArbEither = <a, b>(
  arbA: jsc.Arbitrary<a>,
  arbB: jsc.Arbitrary<b>
): jsc.Arbitrary<Either<a, b>> => {
  const arbEither = jsc.oneof([
    arbA.smap(Left, ({ leftValue }) => leftValue),
    arbB.smap(Right, ({ rightValue }) => rightValue),
  ]);
  arbEither.show = x =>
    x.isLeft ? `Left(${arbA.show!(x.leftValue)})` : `Right(${arbB.show!(x.rightValue)})`;
  return arbEither;
};

type Compose<f extends Generic2, g extends Generic1, a, b> = Type2<f, a, Type1<g, b>>;

interface TCompose<f extends Generic2, g extends Generic1> extends Generic2 {
  type: Compose<f, g, this['a'], this['b']>;
}
const makeApplicativeCompose = <f extends Generic2, g extends Generic1>(
  aF: Applicative_2<f>,
  aG: Applicative_1<g>
) =>
  ({
    apply: f => x => aF.apply(aF.map(aG.apply as any)(f))(x),
    map: f => x => aF.map(aG.map(f))(x),
    pure: a => aF.pure(aG.pure(a)),
  } as Applicative_2<TCompose<f, g>>);

const laws = <t extends Generic1, a>(
  traversable: Anon<Traversable_1<t>>,
  ta: jsc.Arbitrary<Type1<t, a>>,
  a: jsc.Arbitrary<a>,
  eq: Eq<Type1<t, a>>['eq']
) => {
  const { sequence, traverse } = traversable;
  return {
    naturality: (): void => {
      const eqEither = makeEqEither(eqString, { eq } as Eq<Type1<t, a>>).eq;
      return jsc.assertForall(jsc.string, jsc.fn(makeArbMaybe(a)), ta, (reason, f, ta) => {
        const a = either.note(reason)(traverse(applicativeMaybe)(f)(ta));
        const b = traverse(applicativeEither)(x => either.note(reason)(f(x)))(ta);
        return eqEither(a)(b);
      });
    },
    identity: (): void => {
      jsc.assertForall(ta, ta => eq(sequence(applicativeIdentity)(ta))(ta));
    },
    composition: (): void => {
      const applicativeCompose = makeApplicativeCompose(applicativeEither, applicativeMaybe);
      const eqCompose = makeEqEither(eqString, makeEqMaybe({ eq } as Eq<Type1<t, a>>)).eq;
      return jsc.assertForall(
        jsc.fn(makeArbEither(jsc.string, a)),
        jsc.fn(makeArbMaybe(a)),
        ta,
        (f, g, ta) => {
          const a = traverse(applicativeCompose)((x: a) => applicativeEither.map(g)(f(x)))(ta);
          const b = applicativeEither.map(traverse(applicativeMaybe)(g))(
            traverse(applicativeEither)(f)(ta)
          );
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
