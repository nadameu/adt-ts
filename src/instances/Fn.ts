import * as S from '../classes/Semigroupoid';
import { Semigroupoid2 } from '../classes/Semigroupoid';
import { Prop2 } from '../Types';

export type Fn<a, b> = (_: a) => b;

interface PropFn extends Prop2 {
	type: Fn<this['a'], this['b']>;
}

export const compose: Semigroupoid2<PropFn>['compose'] = f => g => x => f(g(x));
export const composeFlipped = S.composeFlipped<PropFn>({ compose });
