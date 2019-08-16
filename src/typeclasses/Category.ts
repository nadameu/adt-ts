import { GenericFn2, GenericFn3, TypeFn, TypeFn3 } from '../Generic';
import { Semigroupoid2, Semigroupoid3 } from './Semigroupoid';

export interface Category2<c extends GenericFn2> extends Semigroupoid2<c> {
  identity: <a>(
    _: TypeFn<c, a, a> extends (_: infer a) => any ? a : never
  ) => TypeFn<c, a, a> extends (_: any) => infer a ? a : never;
}

export interface Category3<c extends GenericFn3> extends Semigroupoid3<c> {
  identity: <a, b>(
    _: TypeFn3<c, a, b, b> extends (_: infer b) => any ? b : never
  ) => TypeFn3<c, a, b, b> extends (_: any) => infer b ? b : never;
}
