import { flip } from '../combinators';
import { Type2 } from '../Types';

export interface Semigroupoid<f> {
	compose: <b, c, x, w>(
		f: Type2<f, w, x, b, c>,
	) => <a>(fa: Type2<f, w, x, a, b>) => Type2<f, w, x, a, c>;
}

export const compose: <f>(S: Semigroupoid<f>) => Semigroupoid<f>['compose'] = S => S.compose;

export const composeFlipped: <f>(
	S: Semigroupoid<f>,
) => <a, b, x, w>(
	f: Type2<f, w, x, a, b>,
) => <c>(fa: Type2<f, w, x, b, c>) => Type2<f, w, x, a, c> = S => flip(S.compose) as any;
