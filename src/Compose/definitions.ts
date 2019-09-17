import { Generic1, Generic2, Type1, Type2 } from '../Generic';

export type Compose<f, g, a, b = unknown, c = unknown> = f extends Generic1
  ? Type1<f, g extends Generic1 ? Type1<g, a> : g extends Generic2 ? Type2<g, a, b> : never>
  : f extends Generic2
  ? Type2<f, a, g extends Generic1 ? Type1<g, b> : g extends Generic2 ? Type2<g, b, c> : never>
  : never;
