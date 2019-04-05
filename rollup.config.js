import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

export default {
	output: {
		format: 'iife',
	},
	plugins: [commonjs(), resolve(), typescript()],
};
