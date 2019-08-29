import { Either, either } from '../Either/definitions';
import { Generic1, Type1 } from '../Generic';
import { Alt1 } from '../typeclasses/Alt';
import { Applicative, Applicative1 } from '../typeclasses/Applicative';
import { applyDefault, Bind1 } from '../typeclasses/Bind';
import { Compactable1 } from '../typeclasses/Compactable';
import { Filterable1, filterDefault, partitionDefault } from '../typeclasses/Filterable';
import { Foldable1, foldlDefault, foldrDefault } from '../typeclasses/Foldable';
import { liftM1, Monad1 } from '../typeclasses/Monad';
import { MonadError1 } from '../typeclasses/MonadError';
import { MonadThrow1 } from '../typeclasses/MonadThrow';
import { Monoid0, Monoid1 } from '../typeclasses/Monoid';
import { Plus1 } from '../typeclasses/Plus';
import { Traversable1 } from '../typeclasses/Traversable';
import { Just, Maybe, maybe, Nothing } from './definitions';
import { TMaybe } from './internal';

export { maybe };

export const bind: Bind1<TMaybe>['bind'] = maybe<Maybe<any>>(Nothing);

export const pure: Applicative1<TMaybe>['pure'] = Just;

export const map = liftM1({ bind, pure } as Monad1<TMaybe>);

export const apply = applyDefault({ bind, map } as Bind1<TMaybe>);

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

export const traverse: Traversable1<TMaybe>['traverse'] = (<f extends Generic1>(
  applicative: Applicative1<f>
) => <a, b>(f: (_: a) => Type1<f, b>): ((ta: Maybe<a>) => Type1<f, Maybe<b>>) =>
  maybe(applicative.pure(Nothing))(x => applicative.map(Just)(f(x)))) as any;

export const sequence: Traversable1<TMaybe>['sequence'] = (applicative: Applicative) =>
  maybe(applicative.pure(Nothing))(applicative.map(Just));

export const partitionMap: Filterable1<TMaybe>['partitionMap'] = <a, b, c>(
  f: (_: a) => Either<b, c>
) => {
  type Result = { left: Maybe<b>; right: Maybe<c> };
  return maybe<Result>({ left: Nothing, right: Nothing })<a>(x =>
    either<b, Result>(b => ({ left: Just(b), right: Nothing }))<c>(c => ({
      left: Nothing,
      right: Just(c),
    }))(f(x))
  );
};

export const partition = partitionDefault({ partitionMap } as Filterable1<TMaybe>);

export const filterMap: Filterable1<TMaybe>['filterMap'] = bind;

export const filter = filterDefault({ filterMap } as Filterable1<TMaybe>);

export const compact: Compactable1<TMaybe>['compact'] = filterMap(x => x);

export const separate: Compactable1<TMaybe>['separate'] = partitionMap(x => x);
