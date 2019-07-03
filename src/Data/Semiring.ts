export interface Semiring<a> {
	add: (x: a) => (y: a) => a;
	zero: a;
	mul: (x: a) => (y: a) => a;
	one: a;
}
