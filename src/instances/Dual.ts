import * as E from '../classes/Eq';
import { Eq } from '../classes/Eq';
import * as M from '../classes/Monoid';
import { Monoid, Monoid1 } from '../classes/Monoid';
import * as O from '../classes/Ord';
import { Ord } from '../classes/Ord';
import { Semigroup, Semigroup1 } from '../classes/Semigroup';
import { AnyFn1, AnyFn3, Prop1, Type1 } from '../Types';

declare const phantom: unique symbol;
type Dual<a> = a & {
	[phantom]: never;
};
export const Dual = <a>(value: a) => value as Dual<a>;

export const eq1: <a>(E: Eq<a>) => Eq<Dual<a>>['eq'] = ({ eq }) => eq;
export const notEq1: typeof eq1 = ({ eq }) => E.notEq({ eq });

export const compare1: <a>(E: Ord<a>) => Ord<Dual<a>>['compare'] = ({ compare }) => compare;
export const lte1 = <a>(Oa: Ord<a>) => O.lte<Dual<a>>({ compare: compare1(Oa) });
export const gt1 = <a>(Oa: Ord<a>) => O.gt<Dual<a>>({ compare: compare1(Oa) });
export const lt1 = <a>(Oa: Ord<a>) => O.lt<Dual<a>>({ compare: compare1(Oa) });
export const gte1 = <a>(Oa: Ord<a>) => O.gte<Dual<a>>({ compare: compare1(Oa) });
export const comparing1 = <b>(Ob: Ord<b>) => O.comparing<Dual<b>>({ compare: compare1(Ob) });
export const min1 = <a>(Oa: Ord<a>) => O.min<Dual<a>>({ compare: compare1(Oa) });
export const max1 = <a>(Oa: Ord<a>) => O.max<Dual<a>>({ compare: compare1(Oa) });
export const clamp1 = <a>(Oa: Ord<a>) => O.clamp<Dual<a>>({ compare: compare1(Oa) });
export const between1 = <a>(Oa: Ord<a>) => O.between<Dual<a>>({ compare: compare1(Oa) });

interface PropDerivedDual<f extends Prop1> extends Prop1 {
	type: Dual<Type1<f, this['a']>>;
}

export const append1: {
	<f extends Prop1>(S: Semigroup1<f>): Semigroup1<PropDerivedDual<f>>['append'];
	<a>(S: Semigroup<a>): Semigroup<Dual<a>>['append'];
} = (({ append }) => x => y => Dual(append(y)(x))) as AnyFn3;

export const mempty1: {
	<f extends Prop1>(C: Pick<Monoid1<f>, 'mempty'>): Monoid1<PropDerivedDual<f>>['mempty'];
	<a>(C: Pick<Monoid<a>, 'mempty'>): Monoid<Dual<a>>['mempty'];
} = (({ mempty }) => () => Dual(mempty())) as AnyFn1;
export const power1: {
	<f extends Prop1>(M: Monoid1<f>): <a>(x: Dual<Type1<f, a>>) => (p: number) => Dual<Type1<f, a>>;
	<a>(M: Monoid<a>): (x: Dual<a>) => (p: number) => Dual<a>;
} = (({ append, mempty }) =>
	M.power({ append: append1({ append }), mempty: mempty1({ mempty }) })) as AnyFn1;
export const guard1: {
	<f extends Prop1>(M: Pick<Monoid1<f>, 'mempty'>): (
		p: boolean,
	) => <a>(x: Dual<Type1<f, a>>) => Dual<Type1<f, a>>;
	<a>(M: Pick<Monoid<a>, 'mempty'>): (p: boolean) => (x: Dual<a>) => Dual<a>;
} = (({ mempty }) => M.guard({ mempty: mempty1({ mempty }) })) as AnyFn1;
