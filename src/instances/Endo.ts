import { Category2 } from '../classes/Category';
import * as E from '../classes/Eq';
import { Eq } from '../classes/Eq';
import * as M from '../classes/Monoid';
import { Monoid1 } from '../classes/Monoid';
import * as O from '../classes/Ord';
import { Ord } from '../classes/Ord';
import { Semigroup1 } from '../classes/Semigroup';
import { Semigroupoid2 } from '../classes/Semigroupoid';
import { Prop1, Prop2, Type2 } from '../Types';

declare const phantom: unique symbol;
type Endo<c extends Prop2, a> = Type2<c, a, a> & {
	[phantom]: never;
};
export const Endo = <c extends Prop2, a>(value: Type2<c, a, a>) => value as Endo<c, a>;

export const eq1: <c extends Prop2, a>(E: Eq<Type2<c, a, a>>) => Eq<Endo<c, a>>['eq'] = ({ eq }) =>
	eq;
export const notEq1: typeof eq1 = ({ eq }) => E.notEq({ eq });

export const compare1: <c extends Prop2, a>(
	E: Ord<Type2<c, a, a>>,
) => Ord<Endo<c, a>>['compare'] = ({ compare }) => compare;
export const lte1 = <c extends Prop2, a>(Oa: Ord<Type2<c, a, a>>) =>
	O.lte<Endo<c, a>>({ compare: compare1(Oa) });
export const gt1 = <c extends Prop2, a>(Oa: Ord<Type2<c, a, a>>) =>
	O.gt<Endo<c, a>>({ compare: compare1(Oa) });
export const lt1 = <c extends Prop2, a>(Oa: Ord<Type2<c, a, a>>) =>
	O.lt<Endo<c, a>>({ compare: compare1(Oa) });
export const gte1 = <c extends Prop2, a>(Oa: Ord<Type2<c, a, a>>) =>
	O.gte<Endo<c, a>>({ compare: compare1(Oa) });
export const comparing1 = <c extends Prop2, b>(Ob: Ord<Type2<c, b, b>>) =>
	O.comparing<Endo<c, b>>({ compare: compare1(Ob) });
export const min1 = <c extends Prop2, a>(Oa: Ord<Type2<c, a, a>>) =>
	O.min<Endo<c, a>>({ compare: compare1(Oa) });
export const max1 = <c extends Prop2, a>(Oa: Ord<Type2<c, a, a>>) =>
	O.max<Endo<c, a>>({ compare: compare1(Oa) });
export const clamp1 = <c extends Prop2, a>(Oa: Ord<Type2<c, a, a>>) =>
	O.clamp<Endo<c, a>>({ compare: compare1(Oa) });
export const between1 = <c extends Prop2, a>(Oa: Ord<Type2<c, a, a>>) =>
	O.between<Endo<c, a>>({ compare: compare1(Oa) });

interface PropDerivedEndo<c extends Prop2> extends Prop1 {
	type: Endo<c, this['a']>;
}

export const append1: <c extends Prop2>(
	S: Semigroupoid2<c>,
) => Semigroup1<PropDerivedEndo<c>>['append'] = ({ compose }) => x => y => Endo(compose(x)(y));

export const mempty1: <c extends Prop2>(
	C: Pick<Category2<c>, 'identity'>,
) => Monoid1<PropDerivedEndo<c>>['mempty'] = ({ identity }) => () => Endo(identity);
export const power1: <c extends Prop2>(
	C: Category2<c>,
) => <a>(fx: Endo<c, a>) => (p: number) => Endo<c, a> = ({ compose, identity }) =>
	M.power({ append: append1({ compose }), mempty: mempty1({ identity }) });
export const guard1: <c extends Prop2>(
	C: Pick<Category2<c>, 'identity'>,
) => (p: boolean) => <a>(x: Endo<c, a>) => Endo<c, a> = ({ identity }) =>
	M.guard({ mempty: mempty1({ identity }) });
