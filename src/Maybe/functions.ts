import { Generic1, Type1 } from '../Generic';
import { Applicative1 } from '../typeclasses/Applicative';
import { Foldable1 } from '../typeclasses/Foldable';
import { Monoid, Monoid1 } from '../typeclasses/Monoid';
import { Just, Maybe, Nothing } from './definitions';
import { TMaybe } from './internal';

export const maybe = <b>(b: b) => <a>(f: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? b : f(fa.value);

export const bind: <a, b>(
  f: (_: a) => Maybe<b>
) => (fa: Maybe<a>) => Maybe<b> = /*#__PURE__*/ maybe(Nothing as Maybe<any>);

export const pure: <a>(value: a) => Maybe<a> = Just;

export const map = <a, b>(f: (_: a) => b): ((fa: Maybe<a>) => Maybe<b>) =>
  /*@__PURE__*/ bind(a => pure(f(a)));

export const apply = <a, b>(ff: Maybe<(_: a) => b>): ((fa: Maybe<a>) => Maybe<b>) =>
  /*#__PURE__*/ bind(a => map((f: (_: a) => b) => f(a))(ff));

export const maybeL = <b>(f: () => b) => <a>(g: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? f() : g(fa.value);

export const fromMaybe = <a>(a: a): ((fa: Maybe<a>) => a) => /*#__PURE__*/ maybe(a)(x => x);

export const fromMaybeL = <a>(thunk: () => a): ((fa: Maybe<a>) => a) =>
  /*#__PURE__*/ maybeL(thunk)(x => x);

export const alt = <a>(fx: Maybe<a>, fy: Maybe<a>): Maybe<a> => (fx.isNothing ? fy : fx);

export const empty = <a = never>(): Maybe<a> => Nothing;

export const throwError = <a = never>(): Maybe<a> => Nothing;

export const catchError = <a>(f: () => Maybe<a>) => (fa: Maybe<a>): Maybe<a> =>
  fa.isNothing ? f() : fa;

export const foldl = <a, b>(f: (_: b) => (_: a) => b) => (b0: b): ((fa: Maybe<a>) => b) =>
  /*#__PURE__*/ maybe(b0)(f(b0));

export const foldr = <a, b>(f: (_: a) => (_: b) => b) => (b0: b): ((fa: Maybe<a>) => b) =>
  /*#__PURE__*/ maybe(b0)(a => f(a)(b0));

export const foldMap: Foldable1<TMaybe>['foldMap'] = <m>(monoid: Monoid<m> | Monoid1<any>) => <a>(
  f: (_: a) => m
): ((fa: Maybe<a>) => m) => /*#__PURE__*/ maybeL(monoid.mempty)(f);

export const traverse = <f extends Generic1>(applicative: Applicative1<f>) => <a, b>(
  f: (_: a) => Type1<f, b>
) => (fa: Maybe<a>): Type1<f, Maybe<b>> =>
  fa.isNothing ? applicative.pure(Nothing) : applicative.map(pure)(f(fa.value));
