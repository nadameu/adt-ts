export type Maybe<a> = Nothing | Just<a>;
export function Maybe<a>() {}

export interface Nothing {
  isJust: false;
  isNothing: true;
}

export interface Just<a> {
  isJust: true;
  isNothing: false;
  value: a;
}

const make = (isNothing: boolean) => {
  const proto = Object.create(Maybe.prototype);
  proto.isJust = !isNothing;
  proto.isNothing = isNothing;
  if (isNothing) return Object.create(proto);
  return function Just<a>(value: a) {
    const just = Object.create(proto);
    just.value = value;
    return just;
  };
};

export const Nothing: Nothing = /*#__PURE__*/ make(true);
export const Just: <a>(value: a) => Just<a> = /*#__PURE__*/ make(false);