import type { PageLoad } from './$types';
import { getConfiguredStrategiesWithRuntimeState } from 'trade-executor-frontend/strategy/runtimeState';

export const load: PageLoad = async ({ fetch }) => {
	return {
		strategies: await getConfiguredStrategiesWithRuntimeState(fetch)
	};
};
