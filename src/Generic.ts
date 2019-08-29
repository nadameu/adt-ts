declare const GenericSymbol: unique symbol;

export interface Generic1 {
  [GenericSymbol]: 'Generic1';
  a: unknown;
  type: unknown;
}

export interface Generic2 {
  [GenericSymbol]: 'Generic2';
  a: unknown;
  b: unknown;
  type: unknown;
}

export interface GenericFn2 {
  [GenericSymbol]: 'GenericFn2';
  a: unknown;
  b: unknown;
  type: (_: any) => unknown;
}

export interface GenericFn3 {
  [GenericSymbol]: 'GenericFn3';
  a: unknown;
  b: unknown;
  c: unknown;
  type: (_: any) => unknown;
}

export interface Identified0<a> {
  NotGenericType: a;
}

export interface Identified1<f extends Generic1> {
  Generic1Type: f;
}

export interface Identified2<f extends Generic2> {
  Generic2Type: f;
}

export interface IdentifiedFn<f extends GenericFn2> {
  GenericFn2Type: f;
}

export interface IdentifiedFn3<f extends GenericFn3> {
  GenericFn3Type: f;
}

export type Type1<f extends Generic1, a> = f extends never ? never : (f & { a: a })['type'];

export type Type2<f extends Generic2, a, b> = f extends never
  ? never
  : (f & { a: a; b: b })['type'];

export type TypeFn<f extends GenericFn2, a, b> = f extends never
  ? never
  : (f & { a: a; b: b })['type'];

export type TypeFn3<f extends GenericFn3, a, b, c> = f extends never
  ? never
  : (f & { a: a; b: b; c: c })['type'];

export interface Generic2as1<f extends Generic2> extends Generic1 {
  type: Type2<f, unknown, this['a']>;
}

export interface Generic1as2<f extends Generic1> extends Generic2 {
  type: Type1<f, this['b']>;
}
