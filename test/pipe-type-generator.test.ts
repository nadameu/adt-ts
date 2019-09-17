import { array as A, pipe } from '../src';

/**
 * Converts a number to a lowercase letter.
 *
 * ```js
 * toLetter(1)  === 'a';
 * toLetter(26) === 'z';
 * ```
 *
 * @param n Letter index
 */
const toLetter = (n: number) => String.fromCharCode(96 + n);

test('Generate type description', () => {
  const ends = A.range(2)(26);
  const z = ends
    .map(
      pipe(
        A.range(1),
        x => x.map(toLetter),
        range => {
          const letters = range.join(', ');
          const pairs = range
            .map((a, i, as) => [a, as[i + 1]] as [string, string | undefined])
            .filter((x): x is [string, string] => x[1] !== undefined);
          const fns = pairs.map(([a, b]) => `${a}${b}: (_: ${a}) => ${b}`);
          const first = range[0];
          const last = range[range.length - 1];
          return `<${letters}>(${fns.join(', ')}): (_: ${first}) => ${last};`;
        }
      )
    )
    .join('\n');
  expect(z).toMatchInlineSnapshot(`
    "<a, b>(ab: (_: a) => b): (_: a) => b;
    <a, b, c>(ab: (_: a) => b, bc: (_: b) => c): (_: a) => c;
    <a, b, c, d>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d): (_: a) => d;
    <a, b, c, d, e>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e): (_: a) => e;
    <a, b, c, d, e, f>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f): (_: a) => f;
    <a, b, c, d, e, f, g>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g): (_: a) => g;
    <a, b, c, d, e, f, g, h>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h): (_: a) => h;
    <a, b, c, d, e, f, g, h, i>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i): (_: a) => i;
    <a, b, c, d, e, f, g, h, i, j>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j): (_: a) => j;
    <a, b, c, d, e, f, g, h, i, j, k>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k): (_: a) => k;
    <a, b, c, d, e, f, g, h, i, j, k, l>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l): (_: a) => l;
    <a, b, c, d, e, f, g, h, i, j, k, l, m>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m): (_: a) => m;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n): (_: a) => n;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o): (_: a) => o;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p): (_: a) => p;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q): (_: a) => q;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r): (_: a) => r;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s): (_: a) => s;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t): (_: a) => t;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u): (_: a) => u;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u, uv: (_: u) => v): (_: a) => v;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u, uv: (_: u) => v, vw: (_: v) => w): (_: a) => w;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u, uv: (_: u) => v, vw: (_: v) => w, wx: (_: w) => x): (_: a) => x;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u, uv: (_: u) => v, vw: (_: v) => w, wx: (_: w) => x, xy: (_: x) => y): (_: a) => y;
    <a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u, uv: (_: u) => v, vw: (_: v) => w, wx: (_: w) => x, xy: (_: x) => y, yz: (_: y) => z): (_: a) => z;"
  `);
});
