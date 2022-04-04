/**
 * Load configured strategies.
 *
 * This is passed as the environment variables on the frontend on startup.
 *
 * The environment variable contains JSON configuration of strategies, as per configuration.ts.
 */
export const strategyConfig = ((env) => {
	const strategiesJSON = env.STRATEGIES;

	if (!strategiesJSON) {
		console.warn('You need to configure STRATEGIES env');
	}

	return JSON.parse(strategiesJSON as string);
})(import.meta.env);

