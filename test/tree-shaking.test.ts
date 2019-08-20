import { rollup } from 'rollup';
import * as path from 'path';

test('Simple', async () => {
  const bundle = await rollup({
    input: { 'src/index': path.resolve(__dirname, 'tree-shaking.aux.js') },
  });
  const { output } = await bundle.generate({
    format: 'esm',
  });
  expect(output.map(x => x.code)).toMatchInlineSnapshot(`
    Array [
      "function curry(n, f) {
        const args = Array.prototype.slice.call(arguments, 2);
        if (args.length === n)
            return f.apply(null, args);
        if (args.length > n)
            throw new Error(\`Expected \${n} arguments, got: \${args.length}.\`);
        const applied = function () {
            if (arguments.length === 0)
                throw new Error(\`Empty function call not allowed.\`);
            const newArgs = Array.prototype.slice.call(arguments);
            return curry.apply(null, [n, f].concat(args).concat(newArgs));
        };
        applied.toString = () => f.toString();
        return applied;
    }
    const curry2 = (f) => /*#__PURE__*/ curry(2, f);
    const curry3 = (f) => /*#__PURE__*/ curry(3, f);

    const lift2 = ({ apply, map }) => (f) => (fa) => apply(map(f)(fa));

    const Nothing = { isJust: false, isNothing: true };
    const Just = (value) => ({ isJust: true, isNothing: false, value });

    const applyDefault = ({ bind, map, }) => (ff) => (fa) => bind(f => map(f)(fa))(ff);

    const liftM1 = ({ bind, pure, }) => curry2((f, fa) => bind(x => pure(f(x)))(fa));

    const maybe = curry3((b, f, fa) => (fa.isNothing ? b : f(fa.value)));
    const bind = maybe(Nothing);
    const pure = Just;
    const map = liftM1({ bind, pure });
    const apply = applyDefault({ bind, map });

    const applyMaybe = { apply, map };

    console.log(lift2(applyMaybe)(x => y => x > y)(Nothing)(Just(40)));
    ",
    ]
  `);
});
