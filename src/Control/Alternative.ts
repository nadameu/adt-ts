import { Generic1, Generic2 } from '../Generic';
import { Applicative, Applicative2 } from './Applicative';
import { Plus, Plus2 } from './Plus';

export interface Alternative<f extends Generic1> extends Applicative<f>, Plus<f> {}

export interface Alternative2<f extends Generic2> extends Applicative2<f>, Plus2<f> {}
