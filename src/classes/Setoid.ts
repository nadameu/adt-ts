import * as fl from 'fantasy-land';
import { HasStringTag } from '../HasStringTag';
import { Keys, Type } from '../Types';

export interface Setoid<S extends Keys, a = any, b = any> extends HasStringTag<S> {
	[fl.equals]: (_: Type<S, a, b>) => boolean;
}

export const equals = <S extends Keys, a = any, b = any>(x: Type<S, a, b> & Setoid<S, a, b>) => (
	y: Type<S, a, b>,
) => x[fl.equals](y);
