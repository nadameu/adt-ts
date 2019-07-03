import { Generic1, Type } from '../Generic';

export type NaturalTransformation<f extends Generic1, g extends Generic1> = <a>(
	fx: Type<f, a>,
) => Type<g, a>;
