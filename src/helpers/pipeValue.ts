import { foldl } from '../Array/functions';

export interface PipeValue<a> {
  pipe<b>(ab: (_: a) => b): b;
  pipe<b, c>(ab: (_: a) => b, bc: (_: b) => c): c;
  pipe<b, c, d>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d): d;
  pipe<b, c, d, e>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e): e;
  pipe<b, c, d, e, f>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f): f;
  pipe<b, c, d, e, f, g>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g): g;
  pipe<b, c, d, e, f, g, h>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h): h;
  pipe<b, c, d, e, f, g, h, i>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i): i;
  pipe<b, c, d, e, f, g, h, i, j>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j): j;
  pipe<b, c, d, e, f, g, h, i, j, k>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k): k;
  pipe<b, c, d, e, f, g, h, i, j, k, l>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l): l;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m): m;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n): n;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o): o;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p): p;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q): q;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r): r;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s): s;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t): t;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u): u;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u, uv: (_: u) => v): v;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u, uv: (_: u) => v, vw: (_: v) => w): w;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u, uv: (_: u) => v, vw: (_: v) => w, wx: (_: w) => x): x;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u, uv: (_: u) => v, vw: (_: v) => w, wx: (_: w) => x, xy: (_: x) => y): y;
  pipe<b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z>(ab: (_: a) => b, bc: (_: b) => c, cd: (_: c) => d, de: (_: d) => e, ef: (_: e) => f, fg: (_: f) => g, gh: (_: g) => h, hi: (_: h) => i, ij: (_: i) => j, jk: (_: j) => k, kl: (_: k) => l, lm: (_: l) => m, mn: (_: m) => n, no: (_: n) => o, op: (_: o) => p, pq: (_: p) => q, qr: (_: q) => r, rs: (_: r) => s, st: (_: s) => t, tu: (_: t) => u, uv: (_: u) => v, vw: (_: v) => w, wx: (_: w) => x, xy: (_: x) => y, yz: (_: y) => z): z;
}

export const pipeValue = <a>(a: a): PipeValue<a> => ({
  pipe() {
    return foldl<Function, any>(x => f => f(x))(a)(arguments);
  },
});
