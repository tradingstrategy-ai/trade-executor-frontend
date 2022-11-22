/**
 * Vite 3 configuration file. See:
 * https://kit.svelte.dev/docs/project-structure#project-files-vite-config-js
 * https://vitejs.dev/config/
 */
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()]
};

export default config;
