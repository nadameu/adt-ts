import { Generic1, Type1 } from '../Generic';

export type Free<f extends Generic1, a> = Pure<f, a> | Join<f, a>;

export interface Pure<f extends Generic1, a> {
  isPure: true;
  isJoin: false;
  value: a;
}
export const Pure = <f extends Generic1, a>(value: a): Pure<f, a> => ({
  isPure: true,
  isJoin: false,
  value,
});

export interface Join<f extends Generic1, a> {
  isPure: false;
  isJoin: true;
  inner: Type1<f, Free<f, a>>;
}
export const Join = <f extends Generic1, a>(inner: Type1<f, Free<f, a>>): Join<f, a> => ({
  isPure: false,
  isJoin: true,
  inner,
});
