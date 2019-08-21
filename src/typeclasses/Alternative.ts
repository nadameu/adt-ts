import { Generic1, Generic2 } from '../Generic';
import { Applicative1, Applicative2 } from './Applicative';
import { Plus1, Plus2 } from './Plus';

export interface Alternative1<f extends Generic1> extends Applicative1<f>, Plus1<f> {}

export interface Alternative2<f extends Generic2> extends Applicative2<f>, Plus2<f> {}

export type Alternative = {
  [k in keyof Alternative1<never> & keyof Alternative2<never>]: Alternative1<Generic1>[k];
};
