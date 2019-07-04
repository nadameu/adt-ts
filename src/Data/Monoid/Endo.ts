import { Category, GenericCategory } from '../../Control/Category';
import { Semigroupoid } from '../../Control/Semigroupoid';
import { Generic1, Generic2, Type } from '../../Generic';
import { Bounded } from '../Bounded';
import { Eq } from '../Eq';
import { Monoid1 } from '../Monoid';
import { Ord } from '../Ord';
import { Semigroup1 } from '../Semigroup';
import { Show } from '../Show';

declare const EndoSymbol: unique symbol;
export type Endo<c extends Generic2, a> = Type<c, a, a> & {
	[EndoSymbol]: 'Endo';
};
export interface GenericEndo<c extends Generic2> extends Generic1 {
	type: Endo<c, this['a']>;
}

export const makeEqEndo = <c extends Generic2, a>(eqCaa: Eq<Type<c, a, a>>): Eq<Endo<c, a>> =>
	eqCaa;

export const makeOrdEndo = <c extends Generic2, a>(ordCaa: Ord<Type<c, a, a>>): Ord<Endo<c, a>> =>
	ordCaa;

export const makeBoundedEndo = <c extends Generic2, a>(
	boundedCaa: Bounded<Type<c, a, a>>,
): Bounded<Endo<c, a>> => boundedCaa as any;

export const makeShowEndo = <c extends Generic2, a>(
	showCaa: Show<Type<c, a, a>>,
): Show<Endo<c, a>> => ({ show: x => `(Endo ${showCaa.show(x)})` });

export const makeSemigroupEndo = <c extends Generic2>(
	semigroupoid: Semigroupoid<c>,
): Semigroup1<GenericEndo<c>> => ({
	append: semigroupoid.compose as any,
});

export const makeMonoidEndo = <c extends GenericCategory>(
	category: Category<c>,
): Monoid1<GenericEndo<c>> => ({
	...makeSemigroupEndo(category),
	mempty: <a>() => category.identity as Endo<c, a>,
});
