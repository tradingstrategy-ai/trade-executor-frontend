/**
 * Load configured strategies.
 */
export const typesenseConfig = ((env) => {
	const strategiesList = env.STRATEGIES;

	if (!strategiesList) {
		console.warn('You need to configure STRATEGIES env');
	}
	return { strategyIds };
})(import.meta.env);
