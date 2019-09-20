import { Just, M, Maybe, Nothing, pipe } from '../src';

interface MightHaveA {
  a?: MightHaveB;
  x: number;
}
interface MightHaveB {
  b?: MightHaveC;
  y: number;
}
interface MightHaveC {
  c?: string;
  z: number;
}

const runTests = (
  a: (_: MightHaveA) => Maybe<MightHaveB>,
  b: (_: MightHaveA) => Maybe<MightHaveC>,
  c: (_: MightHaveA) => Maybe<string>
) => {
  const obj1: MightHaveA = { x: 42 };
  expect(a(obj1)).toEqual(Nothing);
  expect(b(obj1)).toEqual(Nothing);
  expect(c(obj1)).toEqual(Nothing);

  const obj2: MightHaveA = { a: { y: 43 }, x: 42 };
  expect(a(obj2)).toEqual(Just(obj2.a));
  expect(b(obj2)).toEqual(Nothing);
  expect(c(obj2)).toEqual(Nothing);

  const obj3: MightHaveA = { a: { b: { z: 44 }, y: 43 }, x: 42 };
  expect(a(obj3)).toEqual(Just(obj3.a));
  expect(b(obj3)).toEqual(Just(obj3.a!.b));
  expect(c(obj3)).toEqual(Nothing);

  const obj4: MightHaveA = { a: { b: { c: 'Hello!', z: 44 }, y: 43 }, x: 42 };
  expect(a(obj4)).toEqual(Just(obj4.a));
  expect(b(obj4)).toEqual(Just(obj4.a!.b));
  expect(c(obj4)).toEqual(Just(obj4.a!.b!.c));
};

test('With pipeK and safeProp', () => {
  const a: (_: MightHaveA) => Maybe<MightHaveB> = M.pipeK(M.safeProp('a'));
  const b: (_: MightHaveA) => Maybe<MightHaveC> = M.pipeK(
    M.safeProp('a'),
    M.safeProp('b')
  );
  const c: (_: MightHaveA) => Maybe<string> = M.pipeK(
    M.safeProp('a'),
    M.safeProp('b'),
    M.safeProp('c')
  );
  runTests(a, b, c);
});

test('With pipe and bindProp', () => {
  const a: (_: MightHaveA) => Maybe<MightHaveB> = pipe(M.safeProp('a'));
  const b: (_: MightHaveA) => Maybe<MightHaveC> = pipe(
    M.safeProp('a'),
    M.bindProp('b')
  );
  const c: (_: MightHaveA) => Maybe<string> = pipe(
    M.safeProp('a'),
    M.bindProp('b'),
    M.bindProp('c')
  );

  runTests(a, b, c);
});
