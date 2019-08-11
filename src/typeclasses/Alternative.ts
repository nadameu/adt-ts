import { Applicative1 } from './Applicative';
import { Plus1 } from './Plus';
import { Generic1 } from '../Generic';

export interface Alternative1<f extends Generic1> extends Applicative1<f>, Plus1<f> {}
