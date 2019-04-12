export interface Semigroup<a> {
	append: (x: a) => (y: a) => a;
}

export const append: <a>(S: Semigroup<a>) => Semigroup<a>['append'] = S => S.append;
