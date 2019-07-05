import { Applicative2 } from '../Control/Applicative';
import { Apply2 } from '../Control/Apply';
import { Bind2 } from '../Control/Bind';
import { Category, GenericCategory } from '../Control/Category';
import { Extend, Extend2 } from '../Control/Extend';
import { Monad2 } from '../Control/Monad';
import { Semigroupoid } from '../Control/Semigroupoid';
import { Generic1, Generic2, Type } from '../Generic';
import { Functor2 } from './Functor';
import { Int } from './Int';
import { Semigroup, Semigroup1 } from './Semigroup';

export interface GenericFn extends GenericCategory {
	type: (_: this['a']) => this['b'];
	identity: <a>(x: a) => a;
}

export const compose = <b, c>(f: (_: b) => c) => <a>(g: (_: a) => b): ((_: a) => c) => x => f(g(x));
export const semigroupoidFn: Semigroupoid<GenericFn> = { compose };

export const identity = <a>(x: a): a => x;
export const categoryFn: Category<GenericFn> = { ...semigroupoidFn, identity };

export const functorFn: Functor2<GenericFn> = { map: compose };

export const applyFn: Apply2<GenericFn> = { ...functorFn, apply: f => g => x => f(x)(g(x)) };

export const bind = <a, b>(f: (_: a) => b) => <c>(g: (_: b) => (_: a) => c): ((_: a) => c) => x =>
	g(f(x))(x);
export const bindFn: Bind2<GenericFn> = { ...applyFn, bind };

export const flip = <a, b, c>(f: (_: a) => (_: b) => c): ((_: b) => (_: a) => c) => y => x =>
	f(x)(y);

export const constant: <a>(_: a) => <b>(_: b) => a = x => _ => x;

export const pure: <b, a = never>(x: b) => (_: a) => b = constant;
export const applicativeFn: Applicative2<GenericFn> = { ...applyFn, pure };

export const monadFn: Monad2<GenericFn> = { ...applicativeFn, ...bindFn };

export const apply = <a, b>(f: (_: a) => b) => (x: a): b => f(x);

export const applyFlipped = <a>(x: a) => <b>(f: (_: a) => b): b => f(x);

export const applyN = <a>(f: (_: a) => a) =>
	function go(n: Int) {
		return (acc: a): a => (n <= 0 ? acc : go((n - 1) as Int)(f(acc)));
	};

export const on = <b, c>(f: (_: b) => (_: b) => c) => <a>(g: (_: a) => b) => (x: a) => (y: a): c =>
	f(g(x))(g(y));

interface PartialGenericFn<a> extends Generic1 {
	type: (_: a) => this['a'];
}
interface PartialHigherKindedFn<f extends Generic1> extends Generic2 {
	type: (_: Type<f, this['a']>) => this['b'];
}
export const makeExtendFn: {
	<m extends Generic1>(semigroup: Semigroup1<m>): Extend2<PartialHigherKindedFn<m>>;
	<w>(semigroup: Semigroup<w>): Extend<PartialGenericFn<w>>;
} = <w>(semigroup: Semigroup<w>): Extend<PartialGenericFn<w>> => ({
	...functorFn,
	extend: f => g => w => f(w$ => g(semigroup.append(w)(w$))),
});
