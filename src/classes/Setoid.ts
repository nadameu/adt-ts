export interface Setoid<a> {
	equals: (x: a) => (y: a) => boolean;
}

export const equals: <a>(S: Setoid<a>) => Setoid<a>['equals'] = S => S.equals;

export const notEquals: <a>(S: Setoid<a>) => Setoid<a>['equals'] = S => x => y => !S.equals(x)(y);
