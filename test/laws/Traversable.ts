import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Applicative1 } from '../../src/typeclasses/Applicative';
import { Eq } from '../../src/typeclasses/Eq';
import { Traversable1 } from '../../src/typeclasses/Traversable';

declare const phantom: unique symbol;
interface F<a> {
  [phantom]: 'F';
  <b>(Empty: () => b, Value: (value: a) => b): b;
}
const FEmpty = ((E, _) => E()) as F<unknown>;
const FValue = <a>(value: a) => ((_, V) => V(value)) as F<a>;
interface TF extends Generic1 {
  type: F<this['a']>;
}
const applicativeF = {
  apply: ff => fa => ff(() => FEmpty, f => fa(() => FEmpty, a => FValue(f(a)))),
  map: f => fa => fa(() => FEmpty, a => FValue(f(a))),
  pure: FValue,
} as Applicative1<TF>;
const makeArbF = <a>(arb: jsc.Arbitrary<a>) => {
  const arbF: jsc.Arbitrary<F<a>> = jsc.oneof([
    jsc.constant(FEmpty as F<a>),
    arb.smap(FValue, fa =>
      fa(
        () => {
          throw new Error('Unexpected empty F value.');
        },
        a => a
      )
    ),
  ]);
  arbF.show = fa => fa(() => `FEmpty`, a => `FValue(${(arb.show || String)(a)})`);
  return arbF;
};
const makeEqF = <a>(eq: Eq<a>) =>
  ({
    eq: fx => fy => fx(() => fy(() => true, _ => false), x => fy(() => false, y => eq.eq(x)(y))),
  } as Eq<F<a>>);

type G<a> = { isEmpty: true } | { isEmpty: false; value: a };
const GEmpty = { isEmpty: true } as G<unknown>;
const GValue = <a>(value: a) => ({ isEmpty: false, value } as G<a>);
interface TG extends Generic1 {
  type: G<this['a']>;
}
const applicativeG = {
  apply: ff => fa => (ff.isEmpty || fa.isEmpty ? GEmpty : GValue(ff.value(fa.value))),
  map: f => fa => (fa.isEmpty ? GEmpty : GValue(f(fa.value))),
  pure: GValue,
} as Applicative1<TG>;
const makeArbG = <a>(arb: jsc.Arbitrary<a>) => {
  const arbG: jsc.Arbitrary<G<a>> = jsc.oneof([
    jsc.constant(GEmpty as G<a>),
    arb.smap(GValue, ga => (ga as any).value),
  ]);
  arbG.show = ga => (ga.isEmpty ? `GEmpty` : `GValue(${(arb.show || String)(ga.value)})`);
  return arbG;
};

const makeEqG = <a>(eq: Eq<a>) =>
  ({
    eq: gx => gy => (gx.isEmpty ? gy.isEmpty : !gy.isEmpty && eq.eq(gx.value)(gy.value)),
  } as Eq<G<a>>);

const t = <a>(fa: F<a>): G<a> => fa(() => GEmpty as G<a>, GValue);

const Identity = <a>(x: a): a => x;
interface TIdentity extends Generic1 {
  type: this['a'];
}
const applicativeIdentity = {
  apply: f => x => f(x),
  map: f => x => f(x),
  pure: x => x,
} as Applicative1<TIdentity>;

type Compose<f extends Generic1, g extends Generic1, a> = Type1<f, Type1<g, a>>;

const Compose = <f extends Generic1, g extends Generic1, a>(
  fga: Type1<f, Type1<g, a>>
): Compose<f, g, a> => fga;
interface TCompose<f extends Generic1, g extends Generic1> extends Generic1 {
  type: Compose<f, g, this['a']>;
}
const makeApplicativeCompose = <f extends Generic1, g extends Generic1>(
  aF: Applicative1<f>,
  aG: Applicative1<g>
) =>
  ({
    apply: f => x => Compose(aF.apply(aF.map(aG.apply)(f))(x)),
    map: f => x => Compose(aF.map(aG.map(f))(x)),
    pure: a => Compose(aF.pure(aG.pure(a))),
  } as Applicative1<TCompose<f, g>>);

export const makeTraversableLaws = <t extends Generic1>(traversable: Traversable1<t>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<t, a>>
) => (makeArb: <a>(_: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<t, a>>) => {
  return {
    naturality: (): void => {
      const eq = makeEqG(makeEq(eqNumber)).eq;
      return jsc.assertForall(jsc.fn(makeArbF(jsc.nat)), makeArb(jsc.nat), (f, ta) => {
        const a = t(traversable.traverse(applicativeF)(f)(ta));
        const b = traversable.traverse(applicativeG)(x => t(f(x)))(ta);
        return eq(a)(b);
      });
    },
    identity: (): void => {
      const eq = makeEq(eqNumber).eq;
      jsc.assertForall(makeArb(jsc.number), ta =>
        eq(traversable.traverse(applicativeIdentity)(Identity)(ta))(Identity(ta))
      );
    },
    composition: (): void => {
      const applicativeCompose = makeApplicativeCompose(applicativeF, applicativeG);
      const eq = makeEqF(makeEqG(makeEq(eqNumber))).eq;
      return jsc.assertForall(
        jsc.fn(makeArbF(jsc.number)),
        jsc.fn(makeArbG(jsc.number)),
        makeArb(jsc.number),
        (f, g, ta) => {
          const a = traversable.traverse(applicativeCompose)((x: number) =>
            applicativeF.map(g)(f(x))
          )(ta);
          const b = applicativeF.map(traversable.traverse(applicativeG)(g))(
            traversable.traverse(applicativeF)(f)(ta)
          );
          return eq(a)(b);
        }
      );
    },
  };
};
