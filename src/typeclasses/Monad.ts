import { Generic1, Generic2 } from '../Generic';
import { Applicative1, Applicative2 } from './Applicative';
import { Bind1, Bind2 } from './Bind';

export interface Monad1<f extends Generic1> extends Applicative1<f>, Bind1<f> {}

export interface Monad2<f extends Generic2> extends Applicative2<f>, Bind2<f> {}
