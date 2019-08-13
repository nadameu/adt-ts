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

export interface Identified0<a> {
  NotGenericType: a;
}

export interface Identified1<f extends Generic1> {
  Generic1Type: f;
}

export interface Identified2<f extends Generic2> {
  Generic2Type: f;
}

export type Type1<f extends Generic1, a> = f extends never ? never : (f & { a: a })['type'];

export type Type2<f extends Generic2, a, b> = f extends never
  ? never
  : (f & { a: a; b: b })['type'];
