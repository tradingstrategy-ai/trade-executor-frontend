/**
 * Load configured strategies.
 *
 * This is passed as the environment variables on the frontend on startup.
 *
 * The environment variable contains JSON configuration of strategies, as per configuration.ts.
 */
export const strategyConfig = ((env) => {
	const strategiesJSON = env.VITE_PUBLIC_STRATEGIES;

	if (!strategiesJSON) {
		console.warn('You need to configure VITE_PUBLIC_STRATEGIES env');
		return null;
	}

	return JSON.parse(strategiesJSON as string);
})(import.meta.env);
