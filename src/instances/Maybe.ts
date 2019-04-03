import { Monoid } from '../classes/Monoid';
import { concat, Semigroup, Type as SemigroupType } from '../classes/Semigroup';
import { CompositeDesc, Desc, Info } from '../Desc';
import { Setoid, equals } from '../classes/Setoid';

export type Maybe<a> = Just<a> | Nothing;
export interface Just<a> {
	value: a;
}
export const Just: <a>(_: a) => Just<a> = value => ({ value });
export type Nothing = null;
export const Nothing: Nothing = null;

export const setoidMaybe: <s extends Desc>(
	_: Setoid<s>,
) => Setoid<CompositeDesc<'Maybe', [s]>> = S => ({
	equals: mx => my => (!mx || !my ? !mx === !my : equals(S)(mx.value)(my.value)),
});
export const semigroupMaybe: <s extends Desc>(
	S: Semigroup<s>,
) => Semigroup<CompositeDesc<'Maybe', [s]>> = S => ({
	concat: mx => my => (mx && my ? Just(concat(S)(mx.value)(my.value)) : Nothing),
});
export const monoidMaybe: <s extends Desc>(
	S: Semigroup<s>,
) => Monoid<CompositeDesc<'Maybe', [s]>> = S => ({
	...semigroupMaybe(S),
	empty: () => Nothing,
});

declare module '../classes/Setoid' {
	export interface Dict<info extends Info> {
		Maybe: Maybe<Type<info['descs'][0], info['params']>>;
	}
}
declare module '../classes/Monoid' {
	export interface Dict<info extends Info> {
		Maybe: Maybe<SemigroupType<info['descs'][0], info['params']>>;
	}
}
