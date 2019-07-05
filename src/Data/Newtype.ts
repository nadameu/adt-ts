import { Generic1, Generic2, Type } from '../Generic';

export const wrap: {
	<t extends Generic1>(): <a>(_: a) => Type<t, a>;
	<a, t extends a>(): (_: a) => t;
} = <a, t extends a>() => (x: a) => x as t;

export const unwrap: {
	<t extends Generic1>(): <a>(_: Type<t, a>) => a;
	<a, t extends a>(): (_: t) => a;
} = <a, t extends a>() => (x: t) => x as a;

export const ala: {
	<f extends Generic1, a, t extends a>(): (f: (_: (_: a) => t) => Type<f, t>) => Type<f, a>;
	<f extends Generic2, b, t extends b>(): <a>(
		f: (_: (_: b) => t) => Type<f, a, t>,
	) => Type<f, a, b>;
} = <f extends Generic1, a, t extends a>() => (f: (_: (_: a) => t) => Type<f, t>): Type<f, a> =>
	f(x => x as t);

export const over: {
	<t extends Generic1, s extends Generic1>(): <a, b>(
		f: (_: a) => b,
	) => (_: Type<t, a>) => Type<s, b>;
	<t extends Generic1, b, s extends b>(): <a>(f: (_: a) => b) => (_: Type<t, a>) => s;
	<a, t extends a, s extends Generic1>(): <b>(f: (_: a) => b) => (_: t) => Type<s, b>;
	<a, t extends a, b, s extends b>(): (f: (_: a) => b) => (_: t) => s;
} = <a, t extends a, b, s extends b>() => (f: (_: a) => b): ((_: t) => s) => x => f(x as a) as s;

export const under: {
	<t extends Generic1, s extends Generic1>(): <a, b>(
		f: (_: Type<t, a>) => Type<s, b>,
	) => (_: a) => b;
	<t extends Generic1, b, s extends b>(): <a>(f: (_: Type<t, a>) => s) => (_: a) => b;
	<a, t extends a, s extends Generic1>(): <b>(f: (_: t) => Type<s, b>) => (_: a) => b;
	<a, t extends a, b, s extends b>(): (f: (_: t) => s) => (_: a) => b;
} = <a, t extends a, b, s extends b>() => (f: (_: t) => s): ((_: a) => b) => x => f(x as t) as b;
