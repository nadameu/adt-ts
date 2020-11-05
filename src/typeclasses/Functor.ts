import {
  Anon,
  Generic1,
  Generic2,
  Identified0,
  Identified1,
  Identified2,
  IdentifiedO,
  Type1,
  Type2,
} from '../Generic';
import { constant } from '../helpers/constant';
import { flip } from '../helpers/flip';
import { thrush } from '../helpers/thrush';

export interface Functor_1<f extends Generic1> extends Identified1<f> {
  map: Helpers1<f>['map'];
}

export interface Functor_2<f extends Generic2> extends Identified2<f> {
  map: Helpers2<f>['map'];
}

export interface Functor_O extends IdentifiedO {
  map: HelpersO['map'];
}

interface Helpers1<f extends Generic1> {
  map: <a, b>(f: (_: a) => b) => (fa: Type1<f, a>) => Type1<f, b>;
  voidLeft: <a>(fa: Type1<f, a>) => <b>(b: b) => Type1<f, b>;
  voidRight: <b>(b: b) => <a>(fa: Type1<f, a>) => Type1<f, b>;
  $$void: <a>(fa: Type1<f, a>) => Type1<f, void>;
  flap: <a>(a: a) => <b>(ff: Type1<f, (_: a) => b>) => Type1<f, b>;
}
interface Helpers2<f extends Generic2> {
  map: <b, c>(f: (_: b) => c) => <a>(fab: Type2<f, a, b>) => Type2<f, a, c>;
  voidLeft: <a, b>(fab: Type2<f, a, b>) => <c>(c: c) => Type2<f, a, c>;
  voidRight: <c>(c: c) => <a, b>(fab: Type2<f, a, b>) => Type2<f, a, c>;
  $$void: <a, b>(fa: Type2<f, a, b>) => Type2<f, a, void>;
  flap: <b>(b: b) => <a, c>(ff: Type2<f, a, (_: b) => c>) => Type2<f, a, c>;
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
    <f extends Generic1>(functor: Functor_1<f>): Helpers1<f>[k];
    <f extends Generic2>(functor: Functor_2<f>): Helpers2<f>[k];
    (functor: Functor_O): HelpersO[k];
  };
};

export const voidRight: Helper['voidRight'] = ({ map }: any): any => (a: any) => map(constant(a));

export const voidLeft: Helper['voidLeft'] = ({ map }: any): any => flip(voidRight({ map } as any));

export const $$void: Helper['$$void'] = ({ map }: any): any =>
  /*#__PURE__*/ voidRight({ map } as any)(undefined);

export const flap: Helper['flap'] = ({ map }: any): any => (a: any) => map(thrush(a));
