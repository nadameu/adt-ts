import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Alt_1, Alt_2 } from './Alt';

export interface Plus_1<f extends Generic1> extends Alt_1<f> {
  empty: <a = never>() => Type1<f, a>;
}

export interface Plus_2<f extends Generic2> extends Alt_2<f> {
  empty: <a = never, b = never>() => Type2<f, a, b>;
}

export interface EmptyOnly_1<f extends Generic1>
  extends Pick<Plus_1<f>, 'Generic1Type' | 'empty'> {}

export interface EmptyOnly_2<f extends Generic2>
  extends Pick<Plus_2<f>, 'Generic2Type' | 'empty'> {}
