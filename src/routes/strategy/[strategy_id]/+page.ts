import type { PageLoad } from './$types';
import { getConfiguredStrategyById } from 'trade-executor-frontend/strategy/configuration';
import { getStrategyMetadata } from 'trade-executor-frontend/strategy/metadata';

// Load strategy specific metadata that is used in the overview
export const load: PageLoad = async ({ params, fetch }) => {
	const strategy = getConfiguredStrategyById(params.strategy_id);
	return {
		metadata: await getStrategyMetadata(strategy, fetch)
	};
};
