/**
 * Helpers to extract statistics from the strategy state.
 *
 * Each state blob comes with a separate statistics section that contains portfolio and position statistics.
 *
 * For statistics structure see: https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/statistics.py
 */

import type { State } from './store';

/**
 * Get the latest portfolio statistics.
 *
 */
export function getPortfolioLatestStats(state?: State): object {
	if (state) {
		return state.stats.portfolio.at(-1);
	}
	return null;
}
