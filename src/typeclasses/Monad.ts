import { Generic1 } from '../Generic';
import { Applicative1 } from './Applicative';
import { Bind1 } from './Bind';

export interface Monad1<f extends Generic1> extends Applicative1<f>, Bind1<f> {}
