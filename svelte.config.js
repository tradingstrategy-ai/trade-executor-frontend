import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Disable all warnings during the local compilation for now (spammy)
	onwarn: () => {},

	kit: {
		adapter: adapter(),

		alias: {
			'trade-executor-frontend': 'src/lib'
		},

		env: {
			publicPrefix: 'TS_PUBLIC_'
		},

		package: {
			exports: (filepath) => !/^_|\/_|\.d\.ts|\.svelte$/.test(filepath)
		}
	},

	preprocess: preprocess()
};

export default config;
