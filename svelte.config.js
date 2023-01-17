import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Disable all warnings during the local compilation for now (spammy)
	onwarn: () => {},

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),

		alias: {
			'trade-executor-frontend': 'src/lib'
		},

		env: {
			publicPrefix: 'TS_PUBLIC_'
		}
	},

	package: {
		exports: (filepath) => !/^_|\/_|\.d\.ts|\.svelte$/.test(filepath)
	}
};

export default config;
