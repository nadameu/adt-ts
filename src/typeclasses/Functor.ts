import { Generic1, Identified1, Type1 } from '../Generic';

export interface Functor1<f extends Generic1> extends Identified1<f> {
  map: <a, b>(f: (_: a) => b) => (fa: Type1<f, a>) => Type1<f, b>;
}

export const mapTo = <f extends Generic1>(functor: Functor1<f>) => <a>(
  a: a
): (<b>(fb: Type1<f, b>) => Type1<f, a>) => /*#__PURE__*/ functor.map(_ => a);

export const flap = <f extends Generic1>(functor: Functor1<f>) => <a>(
  a: a
): (<b>(ff: Type1<f, (_: a) => b>) => Type1<f, b>) =>
  /*#__PURE__*/ functor.map(f => f(a));
