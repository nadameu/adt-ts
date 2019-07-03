import { Functor } from '../Data/Functor';
import { Generic1, Type } from '../Generic';

export interface Apply<f extends Generic1> extends Functor<f> {
	apply: <a, b>(ff: Type<f, (_: a) => b>) => (fa: Type<f, a>) => Type<f, b>;
}

export const applyFirst = <f extends Generic1>(apply: Apply<f>) => <a>(
	fa: Type<f, a>,
): (<b>(fb: Type<f, b>) => Type<f, a>) =>
	/*@__PURE__*/ apply.apply<any, a>(apply.map<a, (_: any) => a>(a => _ => a)(fa));

export const applySecond = <f extends Generic1>(apply: Apply<f>) => <a>(
	fa: Type<f, a>,
): (<b>(fb: Type<f, b>) => Type<f, b>) =>
	/*@__PURE__*/ apply.apply<any, any>(apply.map<a, <b>(_: b) => b>(_ => b => b)(fa));

// TODO: lift2, lift3, lift4, lift5
