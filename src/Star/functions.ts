import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { compose } from '../helpers';

export const hoistStar: {
  <f extends Generic1, g extends Generic1>(t: <a>(_: Type1<f, a>) => Type1<g, a>): <a, b>(
    star: (_: a) => Type1<f, b>
  ) => (_: a) => Type1<g, b>;
  <f extends Generic1, g extends Generic2, a>(t: <b>(_: Type1<f, b>) => Type2<g, a, b>): <b, c>(
    star: (_: b) => Type1<f, c>
  ) => (_: b) => Type2<g, a, c>;
  <f extends Generic2, g extends Generic1>(t: <a, b>(_: Type2<f, a, b>) => Type1<g, b>): <a, b, c>(
    star: (_: b) => Type2<f, a, c>
  ) => (_: b) => Type1<g, c>;
  <f extends Generic2, g extends Generic2>(t: <a, b>(_: Type2<f, a, b>) => Type2<g, a, b>): <
    a,
    b,
    c
  >(
    star: (_: b) => Type2<f, a, c>
  ) => (_: b) => Type2<g, a, c>;
} = compose;
