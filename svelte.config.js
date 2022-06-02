import path from 'path';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

		package: {
			exports: (filepath) => !/^_|\/_|\.d\.ts|\.svelte$/.test(filepath)
		},

		vite: {
			resolve: {
				alias: {
					'trade-executor-frontend': path.resolve('src/lib')
				}
			}
		}
	}
};

export default config;
