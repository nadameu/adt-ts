import { Just, M, Maybe, Nothing, pipe } from '../src';

interface A {
  runA(): B | null;
}
interface B {
  runB(x: number): number | undefined;
}

const runTests = (a: (_: A) => Maybe<B>, b: (_: A) => Maybe<number>) => {
  const obj1: A = { runA: () => null };
  expect(a(obj1)).toEqual(Nothing);
  expect(b(obj1)).toEqual(Nothing);

  const runBUndefined = (x: number) => undefined;
  const obj2: A = { runA: () => ({ runB: runBUndefined }) };
  expect(a(obj2)).toEqual(Just(obj2.runA()));
  expect(b(obj2)).toEqual(Nothing);

  const runB = (x: number) => x / 3;
  const obj3: A = { runA: () => ({ runB }) };
  expect(a(obj3)).toEqual(Just(obj3.runA()));
  expect(b(obj3)).toEqual(Just(obj3.runA()!.runB(42)));
};

test('With pipeK and safeMethod', () => {
  const f: (_: A) => Maybe<B> = M.pipeK(M.safeMethod('runA'));
  const g: (_: A) => Maybe<number> = M.pipeK(
    M.safeMethod('runA'),
    M.safeMethod('runB', 42)
  );

  runTests(f, g);
});

test('With pipe and bindMethod', () => {
  const f: (_: A) => Maybe<B> = pipe(M.safeMethod('runA'));
  const g: (_: A) => Maybe<number> = pipe(
    M.safeMethod('runA'),
    M.bindMethod('runB', 42)
  );

  runTests(f, g);
});
