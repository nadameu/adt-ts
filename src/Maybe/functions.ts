import { Alt1 } from '../typeclasses/Alt';
import { Applicative1 } from '../typeclasses/Applicative';
import { Apply1 } from '../typeclasses/Apply';
import { Bind1 } from '../typeclasses/Bind';
import { Foldable1, foldlDefault, foldrDefault } from '../typeclasses/Foldable';
import { Functor1 } from '../typeclasses/Functor';
import { MonadError1 } from '../typeclasses/MonadError';
import { MonadThrow1 } from '../typeclasses/MonadThrow';
import { Monoid, Monoid1 } from '../typeclasses/Monoid';
import { Plus1 } from '../typeclasses/Plus';
import { Traversable1, traverseDefaultFoldablePlus } from '../typeclasses/Traversable';
import { Just, Maybe, Nothing } from './definitions';
import { TMaybe } from './internal';

export const maybe = <b>(b: b) => <a>(f: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? b : f(fa.value);

export const bind: Bind1<TMaybe>['bind'] = /*#__PURE__*/ maybe(Nothing as Maybe<any>);

export const pure: Applicative1<TMaybe>['pure'] = Just;

export const map: Functor1<TMaybe>['map'] = f => /*#__PURE__*/ bind(a => pure(f(a)));

export const apply: Apply1<TMaybe>['apply'] = ff =>
  /*#__PURE__*/ bind(a => map((f: (_: any) => any) => f(a))(ff));

export const maybeL = <b>(f: () => b) => <a>(g: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? f() : g(fa.value);

export const fromMaybe = <a>(a: a): ((fa: Maybe<a>) => a) => /*#__PURE__*/ maybe(a)(x => x);

export const fromMaybeL = <a>(thunk: () => a): ((fa: Maybe<a>) => a) =>
  /*#__PURE__*/ maybeL(thunk)(x => x);

export const alt: Alt1<TMaybe>['alt'] = (fx, fy) => (fx.isNothing ? fy : fx);

export const empty: Plus1<TMaybe>['empty'] = () => Nothing;

export const throwError: MonadThrow1<TMaybe>['throwError'] = () => Nothing;

export const catchError: MonadError1<TMaybe>['catchError'] = f => fa => (fa.isNothing ? f() : fa);

export const foldMap: Foldable1<TMaybe>['foldMap'] = <m>(monoid: Monoid<m> | Monoid1<any>) =>
  /*#__PURE__*/ maybeL(monoid.mempty);

export const foldl = foldlDefault({ Generic1Type: TMaybe, foldMap });

export const foldr = foldrDefault({ Generic1Type: TMaybe, foldMap });

export const traverse = traverseDefaultFoldablePlus({ Generic1Type: TMaybe, alt, empty, foldMap });

export const sequence: Traversable1<TMaybe>['sequence'] = applicative =>
  /*#__PURE__*/ traverse(applicative)(x => x);
