import { Generic1, Type1 } from '../Generic';
import { Functor1 } from './Functor';

export interface Apply1<f extends Generic1> extends Functor1<f> {
  apply: <a, b>(f: Type1<f, (_: a) => b>) => (fa: Type1<f, a>) => Type1<f, b>;
}

export const lift2 = <f extends Generic1>(apply: Apply1<f>) => <a, b, c>(
  f: (_: a) => (_: b) => c
) => (fa: Type1<f, a>): ((fb: Type1<f, b>) => Type1<f, c>) =>
  /*#__PURE__*/ apply.apply(apply.map(f)(fa));
