import * as fl from 'fantasy-land';
import { HKT } from '../HKT';
import { Keys, Type } from '../Types';

export interface Setoid<S extends Keys, a, b, c, d> extends HKT<S, a, b, c, d> {
	[fl.equals]: (
		this: Type<S, a, b, c, d>,
		_: Type<S, a, b, c, d> & Setoid<S, a, b, c, d>,
	) => boolean;
}

export const equals = <S extends Keys, a = never, b = never, c = never, d = never>(
	x: Type<S, a, b, c, d> & Setoid<S, a, b, c, d>,
) => (y: Type<S, a, b, c, d> & Setoid<S, a, b, c, d>) => x[fl.equals](y);
