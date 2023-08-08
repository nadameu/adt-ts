import { Anon, Generic1, Generic2 } from '../Generic';
import { identity } from '../helpers';
import { Applicative_1, Applicative_2 } from './Applicative';
import { Plus_1, Plus_2 } from './Plus';

export interface Alternative_1<f extends Generic1> extends Applicative_1<f>, Plus_1<f> {}

export interface Alternative_2<f extends Generic2> extends Applicative_2<f>, Plus_2<f> {}

export const makeAlternativeInstance: {
  <f extends Generic1>({ alt, apply, empty, map, pure }: Anon<Alternative_1<f>>): Alternative_1<f>;
  <f extends Generic2>({ alt, apply, empty, map, pure }: Anon<Alternative_2<f>>): Alternative_2<f>;
} = identity;
