import { GenericFn, TypeFn } from '../Generic';
import { Semigroupoid2 } from './Semigroupoid';

export interface Category2<c extends GenericFn> extends Semigroupoid2<c> {
  id: <a>(
    _: TypeFn<c, a, a> extends (_: infer a) => any ? a : never
  ) => TypeFn<c, a, a> extends (_: any) => infer a ? a : never;
}
