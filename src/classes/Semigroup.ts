import * as fl from 'fantasy-land';
import { HasStringTag } from '../HasStringTag';
import { Keys, Type } from '../Types';

export interface Semigroup<S extends Keys, a = any, b = any> extends HasStringTag<S> {
	[fl.concat]: (_: Type<S, a, b>) => Type<S, a, b>;
}

export const concat = <S extends Keys, a = any, b = any>(
	x: Extract<Type<S, a, b>, Semigroup<S, a, b>>,
) => (y: Type<S, a, b>) => x[fl.concat](y);
