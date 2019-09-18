import { Anon, Generic1, Generic2, Identified1, Identified2, Type1, Type2 } from '../Generic';
import { constant } from '../helpers/constant';
import { flip } from '../helpers/flip';
import { thrush } from '../helpers/thrush';

export interface Functor_1<f extends Generic1> extends Identified1<f> {
  map: Helpers1<f>['map'];
}

export interface Functor_2<f extends Generic2> extends Identified2<f> {
  map: Helpers2<f>['map'];
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
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(functor: Functor_1<f>): Helpers1<f>[k];
    <f extends Generic2>(functor: Functor_2<f>): Helpers2<f>[k];
  };
};

export const voidLeft: Helper['voidLeft'] = <f extends Generic1>({ map }: Anon<Functor_1<f>>) =>
  flip(voidRight({ map } as Functor_1<f>));

export const voidRight: Helper['voidRight'] = <f extends Generic1>({ map }: Anon<Functor_1<f>>) => <
  a
>(
  a: a
) => map(constant(a));

export const $$void: Helper['$$void'] = <f extends Generic1>({ map }: Anon<Functor_1<f>>) =>
  /*#__PURE__*/ voidRight({ map } as Functor_1<f>)(undefined);

export const flap: Helper['flap'] = <f extends Generic1>({ map }: Anon<Functor_1<f>>) => <a>(
  a: a
) => map(thrush(a));
