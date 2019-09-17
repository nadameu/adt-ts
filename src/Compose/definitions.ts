import { Generic1, Generic2, Type1, Type2 } from '../Generic';

export type Compose_1_1<f extends Generic1, g extends Generic1, a> = Type1<f, Type1<g, a>>;
export type Compose_1_2<f extends Generic1, g extends Generic2, a, b> = Type1<f, Type2<g, a, b>>;
export type Compose_2_1<f extends Generic2, g extends Generic1, a, b> = Type2<f, a, Type1<g, b>>;
export type Compose_2_2<f extends Generic2, g extends Generic2, a, b, c> = Type2<
  f,
  a,
  Type2<g, b, c>
>;
