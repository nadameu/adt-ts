export interface Semigroup<a> {
	concat: (x: a) => (y: a) => a;
}

export const concat: <a>(S: Semigroup<a>) => Semigroup<a>['concat'] = S => S.concat;
