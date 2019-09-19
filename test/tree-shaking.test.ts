import { rollup } from 'rollup';
import * as path from 'path';

test('Simple', async () => {
  const bundle = await rollup({
    input: { 'src/index': path.resolve(__dirname, 'tree-shaking.aux.js') },
  });
  const {
    output: [output],
  } = await bundle.generate({
    format: 'es',
  });
  expect(output.code).toMatchInlineSnapshot(`
    "const flip = (f) => (b) => (a) => f(a)(b);

    const compose = (f) => (g) => (a) => f(g(a));

    const lift2 = ({ apply, map }) => (f) => compose(apply)(map(f));

    const Nothing = { isJust: false, isNothing: true };
    const Just = (value) => ({ isJust: true, isNothing: false, value });

    const liftM1 = ({ bind, pure, }) => (f) => bind(compose(pure)(f));
    const ap = ({ bind, pure, }) => flip((fa) => bind(f => liftM1({ bind, pure })(f)(fa)));

    const maybe = (b) => (f) => (fa) => fa.isNothing ? b : f(fa.value);
    const bind = maybe(Nothing);
    const pure = Just;
    const map = liftM1({ bind, pure });
    const apply = ap({ bind, pure });

    const lift2$1 = lift2({ apply, map });

    console.log(lift2$1(x => y => x > y)(Nothing)(Just(40)));
    "
  `);
});
