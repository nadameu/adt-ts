import * as G from '../Generic';
import { Semigroupoid_2, Semigroupoid_3 } from './Semigroupoid';

export interface IdentityOnly_2<c extends G.GenericFn2> extends G.IdentifiedFn<c> {
  identity: <a>(
    _: G.TypeFn<c, a, a> extends (_: infer a) => any ? a : never
  ) => G.TypeFn<c, a, a> extends (_: any) => infer a ? a : never;
}
export interface Category_2<c extends G.GenericFn2> extends Semigroupoid_2<c>, IdentityOnly_2<c> {}

export interface IdentityOnly_3<c extends G.GenericFn3> extends G.IdentifiedFn3<c> {
  identity: <a, b>(
    _: G.TypeFn3<c, a, b, b> extends (_: infer b) => any ? b : never
  ) => G.TypeFn3<c, a, b, b> extends (_: any) => infer b ? b : never;
}
export interface Category_3<c extends G.GenericFn3> extends Semigroupoid_3<c>, IdentityOnly_3<c> {}
