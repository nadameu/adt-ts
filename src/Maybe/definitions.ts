export type Maybe<a> = Nothing | Just<a>;

export interface Nothing {
  isJust: false;
  isNothing: true;
}
export const Nothing: Nothing = { isJust: false, isNothing: true };

export interface Just<a> {
  isJust: true;
  isNothing: false;
  value: a;
}
export const Just = <a>(value: a): Just<a> => ({ isJust: true, isNothing: false, value });

export const maybe = <b>(b: b) => <a>(f: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? b : f(fa.value);
