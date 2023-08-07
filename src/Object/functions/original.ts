import { array } from '../../Array';
import { Anon, Generic1, Type1 } from '../../Generic';
import { iterable } from '../../Iterable';
import {
  Alt_O,
  Applicative_1,
  Apply_O,
  Foldable_O,
  foldlDefault,
  FoldMapOnly_O,
  foldrDefault,
  Functor_O,
  Monoid_0,
  Plus_O,
  sequenceDefault,
  Traversable_O,
  TraverseOnly_O,
} from '../../typeclasses';
import { lift2 } from '../../typeclasses/Apply';

export const entries = <T extends {}>(obj: T) => Object.entries(obj) as [keyof T, T[keyof T]][];

export const fromEntries = <K extends PropertyKey, V>(entries: Iterable<[K, V]>): { [k in K]: V } =>
  iterable.foldl((acc: Record<K, V>) => ([k, v]: [K, V]) => {
    acc[k] = v;
    return acc;
  })({} as Record<K, V>)(entries);

export const map: Functor_O['map'] =
  <a, b>(f: (_: a) => b) =>
  <T extends Record<keyof T, a>>(obj: T): { [k in keyof T]: b } =>
    fromEntries(array.map(([k, v]: [keyof T, a]) => [k, f(v)] as [keyof T, b])(entries(obj)));

export const apply: Apply_O['apply'] =
  <T extends Record<keyof T, (_: any) => unknown>>(ff: T) =>
  <U extends { [k in keyof T]: T[k] extends (_: infer a) => unknown ? a : never }>(
    fa: U
  ): { [k in keyof T]: T[k] extends (_: any) => infer b ? b : never } =>
    fromEntries(
      array.map(([k, f]: [keyof T, Function]) => [k, f(fa[k])] as [keyof T, any])(entries(ff))
    );

export const alt: Alt_O['alt'] =
  <T>(x: T) =>
  <U>(
    y: U
  ): { [k in keyof T | keyof U]: k extends keyof T ? T[k] : k extends keyof U ? U[k] : never } =>
    Object.assign({}, y, x) as any;

export const empty: Plus_O['empty'] = () => ({});

export const foldMap: Foldable_O['foldMap'] =
  <m>(monoid: Anon<Monoid_0<m>>) =>
  <a>(f: (_: a) => m) =>
  <T extends Record<keyof T, a>>(fa: T): m =>
    array.foldMap(monoid as Monoid_0<m>)(([_, v]: [keyof T, a]) => f(v))(entries(fa));
export const foldl = foldlDefault({ foldMap } as FoldMapOnly_O);
export const foldr = foldrDefault({ foldMap } as FoldMapOnly_O);

export const traverse: Traversable_O['traverse'] =
  <m extends Generic1>(applicative: Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => Type1<m, b>) =>
  <T extends Record<keyof T, a>>(ta: T): Type1<m, { [k in keyof T]: b }> => {
    const A = applicative as Applicative_1<m>;
    return array.foldr(([k, x]: [keyof T, a]) =>
      A.apply(
        A.map((x: b) => (obj: Record<keyof T, b>) => {
          obj[k] = x;
          return obj;
        })(f(x))
      )
    )(A.pure({} as Record<keyof T, b>))(entries(ta));
  };

export const sequence = sequenceDefault({ traverse } as TraverseOnly_O);
