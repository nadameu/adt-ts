import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';
import { Semigroup } from './Semigroup';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Monoid<M extends Keys, a, b, c, d> extends Semigroup<M, a, b, c, d> {}
export interface MonoidConstructor<M extends Keys> {
	prototype: Monoid<M, any, any, any, any>;
	[fl.empty]: <a = never, b = never, c = never, d = never>() => Type<M, a, b, c, d>;
}

export const empty = <M extends Keys>(M: MonoidConstructor<M>) => M[fl.empty];
