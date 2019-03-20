import { FunctorInstances } from '../../TypesDictionary';
import * as Fn from './Function';

export interface Functor<f extends keys> {
	map: <a, b>(
		f: (_: a) => b,
	) => <fa extends FunctorMake<f, FunctorInstance<f>, a>>(fa: fa) => FunctorMake<f, fa, b>;
}

type keys = keyof FunctorInstances;
type run<
	fn extends keyof FunctorInstances[keys],
	key extends keys,
	args extends any[] = any[]
> = FunctorInstances<args>[key][fn];
type FunctorInstance<f extends keys> = run<'instance', f>;
type FunctorMake<f extends keys, fa extends FunctorInstance<f>, b> = run<'make', f, [fa, b]>;
type FunctorParam<f extends keys, fa extends FunctorInstance<f>> = run<'param', f, [fa]>;

export const mapFlipped = <f extends keys>(F: Functor<f>) => <fa extends FunctorInstance<f>>(
	fa: fa,
) => <b>(f: (_: FunctorParam<f, fa>) => b): FunctorMake<f, fa, b> => F.map(f)(fa);
const _void = <f extends keys>(F: Functor<f>) => <fa extends FunctorInstance<f>>(
	fa: fa,
): FunctorMake<f, fa, void> => F.map(Fn.const(undefined))(fa);
export { _void as void };
export const voidRight = <f extends keys>(F: Functor<f>) => <a>(x: a) => <
	fa extends FunctorInstance<f>
>(
	fa: fa,
): FunctorMake<f, fa, a> => F.map(Fn.const(x))(fa);
export const voidLeft = <f extends keys>(F: Functor<f>) => <fa extends FunctorInstance<f>>(
	fa: fa,
) => <a>(x: a): FunctorMake<f, fa, a> => F.map(Fn.const(x))(fa);
export const flap = <f extends keys>(F: Functor<f>) => <
	ff extends FunctorMake<f, FunctorInstance<f>, (_: any) => any>
>(
	ff: ff,
) => (
	x: FunctorParam<f, ff> extends (_: infer a) => any ? a : never,
): FunctorMake<f, ff, FunctorParam<f, ff> extends (_: any) => infer b ? b : never> =>
	[ff].map(F.map(f => f(x)))[0];
