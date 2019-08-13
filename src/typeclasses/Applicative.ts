import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Apply1, Apply2 } from './Apply';

export interface Applicative1<f extends Generic1> extends Apply1<f> {
  pure: <a>(a: a) => Type1<f, a>;
}

export interface Applicative2<f extends Generic2> extends Apply2<f> {
  pure: <b, a = never>(b: b) => Type2<f, a, b>;
}

export type AnyApplicative<f extends Generic1> = Pick<Applicative1<f>, 'apply' | 'map' | 'pure'>;
