import * as S from '../classes/Semigroupoid';
import { Semigroupoid2 } from '../classes/Semigroupoid';
import { Prop2 } from '../Types';

interface PropFn extends Prop2 {
	type: (_: this['a']) => this['b'];
}

export const compose: Semigroupoid2<PropFn>['compose'] = f => g => x => f(g(x));
export const composeFlipped = S.composeFlipped<PropFn>({ compose });

export const identity: <a>(_: a) => a = x => x;
