import * as fl from 'fantasy-land';
import { Keys, Type } from '../Types';
import { Semigroup } from './Semigroup';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Monoid<M extends Keys, a = any, b = any> extends Semigroup<M> {}
export interface MonoidConstructor<M extends Keys> {
	prototype: Monoid<M>;
	[fl.empty]: <a = never, b = never>() => Type<M, a, b>;
}

export const empty = <M extends Keys>(M: MonoidConstructor<M>) => M[fl.empty];
