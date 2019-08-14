import { Alt1 } from '../typeclasses/Alt';
import { Applicative1 } from '../typeclasses/Applicative';
import { Bind1 } from '../typeclasses/Bind';
import { Foldable1, foldlDefault, foldrDefault } from '../typeclasses/Foldable';
import { ap, liftM1, Monad1 } from '../typeclasses/Monad';
import { MonadError1 } from '../typeclasses/MonadError';
import { MonadThrow1 } from '../typeclasses/MonadThrow';
import { Monoid, Monoid1 } from '../typeclasses/Monoid';
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

export const bind: Bind1<TMaybe>['bind'] = /*#__PURE__*/ maybe(Nothing as Maybe<any>);

export const pure: Applicative1<TMaybe>['pure'] = Just;

export const map = /*#__PURE__*/ liftM1({ bind, pure } as Monad1<TMaybe>);

export const apply = /*#__PURE__*/ ap({ bind, pure } as Monad1<TMaybe>);

export const maybeL = <b>(f: () => b) => <a>(g: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? f() : g(fa.value);

export const fromMaybe = <a>(a: a): ((fa: Maybe<a>) => a) => /*#__PURE__*/ maybe(a)(x => x);

export const fromMaybeL = <a>(thunk: () => a): ((fa: Maybe<a>) => a) =>
  /*#__PURE__*/ maybeL(thunk)(x => x);

export const alt: Alt1<TMaybe>['alt'] = (fx, fy) => (fx.isNothing ? fy : fx);

export const empty: Plus1<TMaybe>['empty'] = () => Nothing;

export const throwError: MonadThrow1<TMaybe>['throwError'] = empty;

export const catchError: MonadError1<TMaybe>['catchError'] = f => /*#__PURE__*/ maybeL(f)(Just);

export const foldMap: Foldable1<TMaybe>['foldMap'] = <m>(monoid: Monoid<m> | Monoid1<any>) =>
  /*#__PURE__*/ maybeL(monoid.mempty);

export const foldl = /*#__PURE__*/ foldlDefault({ Generic1Type: TMaybe, foldMap });

export const foldr = /*#__PURE__*/ foldrDefault({ Generic1Type: TMaybe, foldMap });

export const traverse = /*#__PURE__*/ traverseDefaultFoldablePlus({
  Generic1Type: TMaybe,
  alt,
  empty,
  foldMap,
});

export const sequence = /*#__PURE__*/ sequenceDefault({ traverse } as Traversable1<TMaybe>);
