import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        tsconfig: 'src/tsconfig.json',
        target: 'es5',
        module: 'es2015',
        declaration: false
      })
    ],
    output: [{ file: pkg.main, format: 'cjs' }]
  },
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        tsconfig: 'src/tsconfig.json',
        target: 'es2018',
        module: 'es2015',
        rootDir: './src/'
      })
    ],
    output: [{ file: pkg.module, format: 'es', preferConst: true }]
  }
];
