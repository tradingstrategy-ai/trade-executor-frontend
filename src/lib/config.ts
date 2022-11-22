/**
 * Load configured strategies.
 *
 * Strategies are configured at runtime via the TS_PUBLIC_STRATEGIES environment variable.
 *
 * The environment variable contains JSON configuration of strategies, as per configuration.ts.
 */
import { env } from '$env/dynamic/public';

export const strategyConfig = ((strategiesJSON) => {
	if (!strategiesJSON) {
		console.warn('You need to configure TS_PUBLIC_STRATEGIES env');
		return null;
	}

	try {
		return JSON.parse(strategiesJSON as string);
	} catch (e) {
		console.error(`Could not parse TS_PUBLIC_STRATEGIES env JSON; content is ${strategiesJSON}`);
		throw e;
	}
})(env.TS_PUBLIC_STRATEGIES);
