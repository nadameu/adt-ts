import { GenericFn2, GenericFn3, TypeFn, TypeFn3 } from '../Generic';
import { Semigroupoid_2, Semigroupoid_3 } from './Semigroupoid';

export interface Category_2<c extends GenericFn2> extends Semigroupoid_2<c> {
  identity: <a>(
    _: TypeFn<c, a, a> extends (_: infer a) => any ? a : never
  ) => TypeFn<c, a, a> extends (_: any) => infer a ? a : never;
}

export interface Category_3<c extends GenericFn3> extends Semigroupoid_3<c> {
  identity: <a, b>(
    _: TypeFn3<c, a, b, b> extends (_: infer b) => any ? b : never
  ) => TypeFn3<c, a, b, b> extends (_: any) => infer b ? b : never;
}

export interface IdentityOnly_2<c extends GenericFn2>
  extends Pick<Category_2<c>, 'GenericFn2Type' | 'identity'> {}

export interface IdentityOnly_3<c extends GenericFn3>
  extends Pick<Category_3<c>, 'GenericFn3Type' | 'identity'> {}
