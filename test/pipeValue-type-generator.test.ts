import { expect, test } from 'vitest';

test('Generate type description', () => {
  const definitions = Array.from({ length: 20 }, (_, fns) => {
    const letters =
      fns === 0
        ? ['a']
        : ['a'].concat(Array.from({ length: fns - 1 }, (_, i) => `x${i}`)).concat(['b']);
    const fnsText = Array.from({ length: fns }, (_, fnIndex) => {
      const a = letters[fnIndex];
      const b = letters[fnIndex + 1];
      return `f${fnIndex}: (_: ${a}) => ${b}`;
    });
    const params = [`${letters[0]}: ${letters[0]}`].concat(fnsText);
    const output = letters.at(-1);
    return `<${letters.join(', ')}>(${params.join(', ')}): ${output};`;
  });
  const text = `export const pipeValue: {\n  ${definitions.join('\n  ')}\n}`;
  expect(text).toMatchInlineSnapshot(`
    "export const pipeValue: {
      <a>(a: a): a;
      <a, b>(a: a, f0: (_: a) => b): b;
      <a, x0, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => b): b;
      <a, x0, x1, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => b): b;
      <a, x0, x1, x2, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => b): b;
      <a, x0, x1, x2, x3, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => b): b;
      <a, x0, x1, x2, x3, x4, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => b): b;
      <a, x0, x1, x2, x3, x4, x5, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => x8, f9: (_: x8) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => x8, f9: (_: x8) => x9, f10: (_: x9) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => x8, f9: (_: x8) => x9, f10: (_: x9) => x10, f11: (_: x10) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => x8, f9: (_: x8) => x9, f10: (_: x9) => x10, f11: (_: x10) => x11, f12: (_: x11) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => x8, f9: (_: x8) => x9, f10: (_: x9) => x10, f11: (_: x10) => x11, f12: (_: x11) => x12, f13: (_: x12) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => x8, f9: (_: x8) => x9, f10: (_: x9) => x10, f11: (_: x10) => x11, f12: (_: x11) => x12, f13: (_: x12) => x13, f14: (_: x13) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => x8, f9: (_: x8) => x9, f10: (_: x9) => x10, f11: (_: x10) => x11, f12: (_: x11) => x12, f13: (_: x12) => x13, f14: (_: x13) => x14, f15: (_: x14) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => x8, f9: (_: x8) => x9, f10: (_: x9) => x10, f11: (_: x10) => x11, f12: (_: x11) => x12, f13: (_: x12) => x13, f14: (_: x13) => x14, f15: (_: x14) => x15, f16: (_: x15) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => x8, f9: (_: x8) => x9, f10: (_: x9) => x10, f11: (_: x10) => x11, f12: (_: x11) => x12, f13: (_: x12) => x13, f14: (_: x13) => x14, f15: (_: x14) => x15, f16: (_: x15) => x16, f17: (_: x16) => b): b;
      <a, x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17, b>(a: a, f0: (_: a) => x0, f1: (_: x0) => x1, f2: (_: x1) => x2, f3: (_: x2) => x3, f4: (_: x3) => x4, f5: (_: x4) => x5, f6: (_: x5) => x6, f7: (_: x6) => x7, f8: (_: x7) => x8, f9: (_: x8) => x9, f10: (_: x9) => x10, f11: (_: x10) => x11, f12: (_: x11) => x12, f13: (_: x12) => x13, f14: (_: x13) => x14, f15: (_: x14) => x15, f16: (_: x15) => x16, f17: (_: x16) => x17, f18: (_: x17) => b): b;
    }"
  `);
});
