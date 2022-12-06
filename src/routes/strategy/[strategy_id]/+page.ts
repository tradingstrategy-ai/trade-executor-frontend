import type { PageLoad } from './$types';
import { getConfiguredStrategyById } from 'trade-executor-frontend/strategy/configuration';
import { getStrategyRuntimeState } from 'trade-executor-frontend/strategy/runtimeState';

// Load strategy specific runtime state that is used in the overview
export const load: PageLoad = async ({ params, fetch }) => {
	const strategy = getConfiguredStrategyById(params.strategy_id);
	return {
		strategy: await getStrategyRuntimeState(strategy, fetch)
	};
};
