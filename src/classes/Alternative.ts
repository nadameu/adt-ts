import { Prop1, Prop2 } from '../Types';
import { Applicative1, Applicative2 } from './Applicative';
import { Plus1, Plus2 } from './Plus';

export interface Alternative1<f extends Prop1> extends Applicative1<f>, Plus1<f> {}
export interface Alternative2<f extends Prop2> extends Applicative2<f>, Plus2<f> {}
