export interface Eq<a> {
	eq: (x: a) => (y: a) => boolean;
}

export const notEq = <a>(Eq: Eq<a>) => (x: a) => (y: a): boolean => Eq.eq(x)(y) == false;
