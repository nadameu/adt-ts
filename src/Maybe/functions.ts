import { Alt1 } from '../typeclasses/Alt';
import { Applicative1 } from '../typeclasses/Applicative';
import { applyDefault, Bind1 } from '../typeclasses/Bind';
import { Foldable1, foldlDefault, foldrDefault } from '../typeclasses/Foldable';
import { liftM1, Monad1 } from '../typeclasses/Monad';
import { MonadError1 } from '../typeclasses/MonadError';
import { MonadThrow1 } from '../typeclasses/MonadThrow';
import { Monoid0, Monoid1 } from '../typeclasses/Monoid';
import { Plus1 } from '../typeclasses/Plus';
import {
  sequenceDefault,
  Traversable1,
  traverseDefaultFoldablePlus,
} from '../typeclasses/Traversable';
import { Just, Maybe, Nothing } from './definitions';
import { TMaybe } from './internal';

export const maybe = <b>(b: b) => <a>(f: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? b : f(fa.value);

export const bind: Bind1<TMaybe>['bind'] = maybe<Maybe<any>>(Nothing);

export const pure: Applicative1<TMaybe>['pure'] = Just;

export const map = liftM1({ bind, pure } as Monad1<TMaybe>);

export const apply = applyDefault({ bind, map } as Bind1<TMaybe>);

export const filter: {
  <a>(p: (_: a) => boolean): (fa: Maybe<a>) => Maybe<a>;
  <a, b extends a>(r: (x: a) => x is b): (fa: Maybe<a>) => Maybe<b>;
} = <a>(p: (_: a) => boolean): ((fa: Maybe<a>) => Maybe<a>) =>
  bind(x => (p(x) ? Just(x) : Nothing));

export const maybeL = <b>(f: () => b) => <a>(g: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? f() : g(fa.value);

export const fromMaybe = <a>(a: a): ((fa: Maybe<a>) => a) => maybe(a)(x => x);

export const fromMaybeL = <a>(thunk: () => a): ((fa: Maybe<a>) => a) => maybeL(thunk)(x => x);

export const alt: Alt1<TMaybe>['alt'] = fx => fy => (fx.isNothing ? fy : fx);

export const empty: Plus1<TMaybe>['empty'] = () => Nothing;

export const throwError: MonadThrow1<TMaybe>['throwError'] = empty;

export const catchError: MonadError1<TMaybe>['catchError'] = f => maybeL(f)(Just);

export const foldMap: Foldable1<TMaybe>['foldMap'] = <m>(monoid: Monoid0<m> | Monoid1<any>) =>
  maybeL(monoid.mempty);

export const foldl = foldlDefault({ foldMap } as Foldable1<TMaybe>);

export const foldr = foldrDefault({ foldMap } as Foldable1<TMaybe>);

export const traverse = traverseDefaultFoldablePlus({
  alt,
  empty,
  foldMap,
} as Foldable1<TMaybe> & Plus1<TMaybe>);

export const sequence = sequenceDefault({ traverse } as Traversable1<TMaybe>);
