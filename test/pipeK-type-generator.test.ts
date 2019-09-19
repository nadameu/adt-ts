import { array as A, pipe } from '../src';

const generate = (options: {
  firstLetter: string;
  lastLetter: string;
  type: (_: string) => string;
  prefix: string;
  args: number;
}) => {
  const ends = A.range(-1)(19);
  const defs = ends.map(
    pipe(
      A.range(-1),
      xs => xs.map(i => `x${i}`),
      range => {
        range[0] = options.firstLetter;
        if (range.length > 1) range[range.length - 1] = options.lastLetter;
        const letters = range.join(', ');
        const pairs = Array.from(range)
          .map((a, i, as) => [a, as[i + 1]] as [string, string | undefined])
          .filter((x): x is [string, string] => x[1] !== undefined);
        const fns = pairs.map(([a, b], i) => `f${i}: (_: ${a}) => ${options.type(b)}`);
        const first = range[0];
        const last = range[range.length - 1];
        return fns.length === 0
          ? `(): <${options.prefix}${letters}>(_: ${first}) => ${options.type(last)};`
          : `<${options.prefix}${letters}>(${fns.join(', ')}): (_: ${first}) => ${options.type(
              last
            )};`;
      }
    )
  );
  const z = `export interface PipeKleisli_${options.args}<f extends Generic${
    options.args
  }> {\n${defs.map(x => `  ${x}`).join('\n')}\n}`;
  return z;
};

test('Generate type description', () => {
  const o1 = generate({
    firstLetter: 'a',
    lastLetter: 'b',
    type: x => `Type1<f, ${x}>`,
    prefix: '',
    args: 1,
  });
  const o2 = generate({
    firstLetter: 'b',
    lastLetter: 'c',
    type: x => `Type2<f, a, ${x}>`,
    prefix: 'a, ',
    args: 2,
  });
  const z = [o1, o2].join('\n\n');
  expect(z).toMatchInlineSnapshot(`
    "export interface PipeKleisli_1<f extends Generic1> {
      (): <a>(_: a) => Type1<f, a>;
      <a, b>(f0: (_: a) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, x9>, f10: (_: x9) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, x9>, f10: (_: x9) => Type1<f, x10>, f11: (_: x10) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, x9>, f10: (_: x9) => Type1<f, x10>, f11: (_: x10) => Type1<f, x11>, f12: (_: x11) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, x9>, f10: (_: x9) => Type1<f, x10>, f11: (_: x10) => Type1<f, x11>, f12: (_: x11) => Type1<f, x12>, f13: (_: x12) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, x9>, f10: (_: x9) => Type1<f, x10>, f11: (_: x10) => Type1<f, x11>, f12: (_: x11) => Type1<f, x12>, f13: (_: x12) => Type1<f, x13>, f14: (_: x13) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, x9>, f10: (_: x9) => Type1<f, x10>, f11: (_: x10) => Type1<f, x11>, f12: (_: x11) => Type1<f, x12>, f13: (_: x12) => Type1<f, x13>, f14: (_: x13) => Type1<f, x14>, f15: (_: x14) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, x9>, f10: (_: x9) => Type1<f, x10>, f11: (_: x10) => Type1<f, x11>, f12: (_: x11) => Type1<f, x12>, f13: (_: x12) => Type1<f, x13>, f14: (_: x13) => Type1<f, x14>, f15: (_: x14) => Type1<f, x15>, f16: (_: x15) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, x9>, f10: (_: x9) => Type1<f, x10>, f11: (_: x10) => Type1<f, x11>, f12: (_: x11) => Type1<f, x12>, f13: (_: x12) => Type1<f, x13>, f14: (_: x13) => Type1<f, x14>, f15: (_: x14) => Type1<f, x15>, f16: (_: x15) => Type1<f, x16>, f17: (_: x16) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, x9>, f10: (_: x9) => Type1<f, x10>, f11: (_: x10) => Type1<f, x11>, f12: (_: x11) => Type1<f, x12>, f13: (_: x12) => Type1<f, x13>, f14: (_: x13) => Type1<f, x14>, f15: (_: x14) => Type1<f, x15>, f16: (_: x15) => Type1<f, x16>, f17: (_: x16) => Type1<f, x17>, f18: (_: x17) => Type1<f, b>): (_: a) => Type1<f, b>;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17, x18, b>(f0: (_: a) => Type1<f, x0>, f1: (_: x0) => Type1<f, x1>, f2: (_: x1) => Type1<f, x2>, f3: (_: x2) => Type1<f, x3>, f4: (_: x3) => Type1<f, x4>, f5: (_: x4) => Type1<f, x5>, f6: (_: x5) => Type1<f, x6>, f7: (_: x6) => Type1<f, x7>, f8: (_: x7) => Type1<f, x8>, f9: (_: x8) => Type1<f, x9>, f10: (_: x9) => Type1<f, x10>, f11: (_: x10) => Type1<f, x11>, f12: (_: x11) => Type1<f, x12>, f13: (_: x12) => Type1<f, x13>, f14: (_: x13) => Type1<f, x14>, f15: (_: x14) => Type1<f, x15>, f16: (_: x15) => Type1<f, x16>, f17: (_: x16) => Type1<f, x17>, f18: (_: x17) => Type1<f, x18>, f19: (_: x18) => Type1<f, b>): (_: a) => Type1<f, b>;
    }

    export interface PipeKleisli_2<f extends Generic2> {
      (): <a, b>(_: b) => Type2<f, a, b>;
      <a, b, c>(f0: (_: b) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, x9>, f10: (_: x9) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, x9>, f10: (_: x9) => Type2<f, a, x10>, f11: (_: x10) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, x9>, f10: (_: x9) => Type2<f, a, x10>, f11: (_: x10) => Type2<f, a, x11>, f12: (_: x11) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, x9>, f10: (_: x9) => Type2<f, a, x10>, f11: (_: x10) => Type2<f, a, x11>, f12: (_: x11) => Type2<f, a, x12>, f13: (_: x12) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, x9>, f10: (_: x9) => Type2<f, a, x10>, f11: (_: x10) => Type2<f, a, x11>, f12: (_: x11) => Type2<f, a, x12>, f13: (_: x12) => Type2<f, a, x13>, f14: (_: x13) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, x9>, f10: (_: x9) => Type2<f, a, x10>, f11: (_: x10) => Type2<f, a, x11>, f12: (_: x11) => Type2<f, a, x12>, f13: (_: x12) => Type2<f, a, x13>, f14: (_: x13) => Type2<f, a, x14>, f15: (_: x14) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, x9>, f10: (_: x9) => Type2<f, a, x10>, f11: (_: x10) => Type2<f, a, x11>, f12: (_: x11) => Type2<f, a, x12>, f13: (_: x12) => Type2<f, a, x13>, f14: (_: x13) => Type2<f, a, x14>, f15: (_: x14) => Type2<f, a, x15>, f16: (_: x15) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, x9>, f10: (_: x9) => Type2<f, a, x10>, f11: (_: x10) => Type2<f, a, x11>, f12: (_: x11) => Type2<f, a, x12>, f13: (_: x12) => Type2<f, a, x13>, f14: (_: x13) => Type2<f, a, x14>, f15: (_: x14) => Type2<f, a, x15>, f16: (_: x15) => Type2<f, a, x16>, f17: (_: x16) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, x9>, f10: (_: x9) => Type2<f, a, x10>, f11: (_: x10) => Type2<f, a, x11>, f12: (_: x11) => Type2<f, a, x12>, f13: (_: x12) => Type2<f, a, x13>, f14: (_: x13) => Type2<f, a, x14>, f15: (_: x14) => Type2<f, a, x15>, f16: (_: x15) => Type2<f, a, x16>, f17: (_: x16) => Type2<f, a, x17>, f18: (_: x17) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
      <a, b, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17, x18, c>(f0: (_: b) => Type2<f, a, x0>, f1: (_: x0) => Type2<f, a, x1>, f2: (_: x1) => Type2<f, a, x2>, f3: (_: x2) => Type2<f, a, x3>, f4: (_: x3) => Type2<f, a, x4>, f5: (_: x4) => Type2<f, a, x5>, f6: (_: x5) => Type2<f, a, x6>, f7: (_: x6) => Type2<f, a, x7>, f8: (_: x7) => Type2<f, a, x8>, f9: (_: x8) => Type2<f, a, x9>, f10: (_: x9) => Type2<f, a, x10>, f11: (_: x10) => Type2<f, a, x11>, f12: (_: x11) => Type2<f, a, x12>, f13: (_: x12) => Type2<f, a, x13>, f14: (_: x13) => Type2<f, a, x14>, f15: (_: x14) => Type2<f, a, x15>, f16: (_: x15) => Type2<f, a, x16>, f17: (_: x16) => Type2<f, a, x17>, f18: (_: x17) => Type2<f, a, x18>, f19: (_: x18) => Type2<f, a, c>): (_: b) => Type2<f, a, c>;
    }"
  `);
});
