import typescript from 'rollup-plugin-typescript';

export default {
	output: {
		format: 'iife',
	},
	plugins: [typescript()],
};
