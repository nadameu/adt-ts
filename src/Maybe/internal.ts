import { Generic1, Type1 } from '../Generic';
import { Maybe } from './definitions';

export interface TMaybe extends Generic1 {
  type: Maybe<this['a']>;
}
export let TMaybe: TMaybe;

export interface TMaybeF<f extends Generic1> extends Generic1 {
  type: Maybe<Type1<f, this['a']>>;
}
export let TMaybeF: TMaybeF<Generic1>;
