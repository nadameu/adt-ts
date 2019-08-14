import { FunctorObject } from './typeclasses/Functor';
import { ApplyObject } from './typeclasses/Apply';
import { SemigroupObject } from './typeclasses/Semigroup';
import { MonoidObject } from './typeclasses/Monoid';
import { Eq } from './typeclasses/Eq';
import { makeEqArray } from './Array/instances';
import { eqString } from './String/instances';

const toEntries = <k extends string, a>(obj: Record<k, a>) => Object.entries(obj) as [k, a][];

const fromEntries = <k extends string, a>(entries: [k, a][]): Record<k, a> => {
  const result = {} as Record<k, a>;
  entries.forEach(([key, value]) => {
    result[key] = value;
  });
  return result;
};

export const functorObject: FunctorObject = {
  map: f => fa => {
    const result = {} as any;
    (Object.keys(fa) as (keyof typeof fa)[]).forEach(key => {
      result[key] = f(fa[key]);
    });
    return result;
  },
};

export const zipWith = <a, b, c>(f: (_: a) => (_: b) => c) => <k extends string>(
  fa: Record<k, a>
) => <l extends string>(fb: Record<l, b>): Record<k & l, c> => {
  const [min, max] = [fa, fb].sort((a, b) => Object.keys(a).length - Object.keys(b).length);
  const commonKeys = Object.keys(min).filter(key =>
    Object.prototype.hasOwnProperty.call(max, key)
  ) as (k & l)[];
  const result = {} as Record<k & l, c>;
  commonKeys.forEach(key => {
    result[key] = f(fa[key])(fb[key]);
  });
  return result;
};

export const makeEqObject = <a>(eq: Eq<a>): Eq<Record<string, a>> => ({
  NotGenericType: (undefined as unknown) as Record<string, a>,
  eq: (x, y) => {
    const keysA = Object.keys(x).sort();
    const keysB = Object.keys(y).sort();
    if (!makeEqArray(eqString).eq(keysA, keysB)) return false;
    return (keysA as Array<keyof typeof x & keyof typeof y>).every(key => eq.eq(x[key], y[key]));
  },
});

export const applyObject: ApplyObject = {
  map: functorObject.map,
  apply: zipWith(f => x => f(x)),
};

export const semigroupObject: SemigroupObject = {
  append: (x, y) => Object.assign({}, x, y) as any,
};

export const monoidObject: MonoidObject = {
  append: semigroupObject.append,
  mempty: () => ({} as any),
};

export const object = {
  fromEntries,
  toEntries,
  map: functorObject.map,
  apply: applyObject.apply,
  append: semigroupObject.append,
  mempty: monoidObject.mempty,
};
