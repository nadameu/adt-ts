import { Anon, Generic1, Generic2, Identified1, Identified2, Type1, Type2 } from '../Generic';
import { identity, pipeValue, Step } from '../helpers';
import { Monad_1, Monad_2 } from './Monad';
import { GenericCons_1 } from './Traversable';

export interface TailRecMOnly_1<f extends Generic1> extends Identified1<f> {
  tailRecM: <a, b>(f: (_: a) => Type1<f, Step<a, b>>) => (z: a) => Type1<f, b>;
}
export interface MonadRec_1<f extends Generic1> extends Monad_1<f>, TailRecMOnly_1<f> {}

export interface TailRecMOnly_2<f extends Generic2> extends Identified2<f> {
  tailRecM: <a, b, c>(f: (_: b) => Type2<f, a, Step<b, c>>) => (z: b) => Type2<f, a, c>;
}
export interface MonadRec_2<f extends Generic2> extends Monad_2<f>, TailRecMOnly_2<f> {}

export const makeMonadRecInstance: {
  <f extends Generic1>({ apply, bind, map, pure, tailRecM }: Anon<MonadRec_1<f>>): MonadRec_1<f>;
  <f extends Generic2>({ apply, bind, map, pure, tailRecM }: Anon<MonadRec_2<f>>): MonadRec_2<f>;
} = identity;
