import * as G from '../Generic';
import { constant } from '../helpers/constant';
import { flip } from '../helpers/flip';
import { identity } from '../helpers/identity';
import { thrush } from '../helpers/thrush';

export interface Functor_1<f extends G.Generic1> extends G.Identified1<f> {
  map: Helpers1<f>['map'];
}

export interface Functor_2<f extends G.Generic2> extends G.Identified2<f> {
  map: Helpers2<f>['map'];
}

export interface Functor_O extends G.IdentifiedO {
  map: HelpersO['map'];
}

export const makeFunctorInstance: {
  <f extends G.Generic1>({ map }: G.Anon<Functor_1<f>>): Functor_1<f>;
  <f extends G.Generic2>({ map }: G.Anon<Functor_2<f>>): Functor_2<f>;
  ({ map }: G.Anon<Functor_O>): Functor_O;
} = identity;

interface Helpers1<f extends G.Generic1> {
  map: <a, b>(f: (_: a) => b) => (fa: G.Type1<f, a>) => G.Type1<f, b>;
  voidLeft: <a>(fa: G.Type1<f, a>) => <b>(b: b) => G.Type1<f, b>;
  voidRight: <b>(b: b) => <a>(fa: G.Type1<f, a>) => G.Type1<f, b>;
  $$void: <a>(fa: G.Type1<f, a>) => G.Type1<f, void>;
  flap: <a>(a: a) => <b>(ff: G.Type1<f, (_: a) => b>) => G.Type1<f, b>;
}
interface Helpers2<f extends G.Generic2> {
  map: <b, c>(f: (_: b) => c) => <a>(fab: G.Type2<f, a, b>) => G.Type2<f, a, c>;
  voidLeft: <a, b>(fab: G.Type2<f, a, b>) => <c>(c: c) => G.Type2<f, a, c>;
  voidRight: <c>(c: c) => <a, b>(fab: G.Type2<f, a, b>) => G.Type2<f, a, c>;
  $$void: <a, b>(fa: G.Type2<f, a, b>) => G.Type2<f, a, void>;
  flap: <b>(b: b) => <a, c>(ff: G.Type2<f, a, (_: b) => c>) => G.Type2<f, a, c>;
}
interface HelpersO {
  map: <a, b>(f: (_: a) => b) => <T extends Record<keyof T, a>>(obj: T) => { [k in keyof T]: b };
  voidLeft: <T>(obj: T) => <b>(b: b) => { [k in keyof T]: b };
  voidRight: <a>(a: a) => <T>(obj: T) => { [k in keyof T]: a };
  $$void: <T>(obj: T) => { [k in keyof T]: void };
  flap: <a>(a: a) => <b, T extends Record<keyof T, (_: a) => b>>(obj: T) => { [k in keyof T]: b };
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>(functor: Functor_1<f>): Helpers1<f>[k];
    <f extends G.Generic2>(functor: Functor_2<f>): Helpers2<f>[k];
    (functor: Functor_O): HelpersO[k];
  };
};

export const voidRight: Helper['voidRight'] =
  <f extends G.Generic1>({ map }: G.Anon<Functor_1<f>>) =>
  <b>(b: b): (<a>(fa: G.Type1<f, a>) => G.Type1<f, b>) =>
    map(constant(b));

export const voidLeft: Helper['voidLeft'] = <f extends G.Generic1>({
  map,
}: G.Anon<Functor_1<f>>): (<a>(fa: G.Type1<f, a>) => <b>(b: b) => G.Type1<f, b>) =>
  flip(voidRight({ map } as Functor_1<f>));

export const $$void: Helper['$$void'] = <f extends G.Generic1>({
  map,
}: G.Anon<Functor_1<f>>): (<a>(fa: G.Type1<f, a>) => G.Type1<f, void>) =>
  /*#__PURE__*/ voidRight({ map } as Functor_1<f>)(undefined);

export const flap: Helper['flap'] =
  <f extends G.Generic1>({ map }: G.Anon<Functor_1<f>>) =>
  <a>(a: a): (<b>(ff: G.Type1<f, (_: a) => b>) => G.Type1<f, b>) =>
    map(thrush(a));
