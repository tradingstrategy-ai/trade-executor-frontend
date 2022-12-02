/**
 * Strategy metadata fetching.
 */

import { getConfiguredStrategies } from './configuration';
import type { StrategyConfiguration } from './configuration';
// https://github.com/fram-x/assert-ts/issues/23
import { assert } from 'assert-ts';
import loadError from '../assets/load-error.jpg';

type Nullable<Type> = Type | null;
type PerformanceTuple = [number, number];

/**
 * StrategySummaryStatistics describes summary-level performance metrics for a strategy.
 *
 * See https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/strategy/summary.py
 */
export interface StrategySummaryStatistics {
	calculated_at: number;
	first_trade_at: Nullable<number>;
	last_trade_at: Nullable<number>;
	enough_data: Nullable<boolean>;
	current_value: Nullable<number>;
	profitability_90_days: Nullable<number>;
	performance_chart_90_days: Nullable<PerformanceTuple[]>;
}

/**
 * Metadata describes strategy information not related to the profit generation.
 *
 * This includes properties provided by the backend API, augmented with additional properties
 * client-side (e.g., link, config, error).
 *
 * See https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/metadata.py
 */
export interface StrategyMetadata {
	// From strategy config object
	id: string;
	// From backend API
	name: string;
	short_description: Nullable<string>;
	long_description: Nullable<string>;
	icon_url: string;
	started_at: number;
	executor_running: boolean;
	summary_statistics: StrategySummaryStatistics;
	// Client-side augmented values
	// - Link to the strategy page, generated on the client side
	link: string;
	// - The client-side strategy config object
	config: StrategyConfiguration;
	// - A developer readable reason why the strategy cannot be loaded.
	// - If set the strategy is not accessible.
	error: Nullable<string>;
}

export async function getStrategiesWithMetadata(
	strats: StrategyConfiguration[],
	fetch
): Promise<StrategyMetadata[]> {
	// Load metadata for all strategies parallel
	return await Promise.all(
		strats.map(async (strat) => {
			assert(strat.url, `StrategyConfig URL missing: ${strat}`);

			let resp;

			try {
				// Because we load from the executor, we need to be able to
				// catch HTTP 500 from Cloudflare (no CORS headers)
				// https://github.com/sveltejs/kit/issues/5074
				resp = await fetch(`${strat.url}/metadata`);
			} catch (e) {
				// TypeError: Failed to fetch
				// but happens only on client-side.
				// The exception is hard to distinguish from
				// any other exception, because it lacks metadata
				// (class name, attributes).
				console.error('fetch() raised an error', e);
				// Temporary work around
				resp = { ok: false, statusText: e.message };
			}

			let error, meta;
			if (resp.ok) {
				meta = await resp.json();
				error = null;
			} else {
				meta = {};
				error = resp.statusText;
			}

			if (meta.id) {
				assert(
					strat.id === meta.id,
					`Mismatch on strategy id. We have ${strat.id}, server has ${meta.id}`
				);
			}

			return {
				id: strat.id,
				name: meta.name || strat.name,
				short_description: meta.short_description,
				long_description: meta.long_description,
				icon_url: meta.icon_url || loadError,
				started_at: meta.started_at,
				executor_running: meta.executor_running,
				summary_statistics: meta.summary_statistics,
				config: strat,
				link: `/strategy/${strat.id}`,
				error
			};
		})
	);
}

/**
 * Get list of configured strategies and pings server for the latest metadata.
 *
 * Typedefs JSON load from the config.
 */
export async function getConfiguredStrategiesWithMetadata(fetch): Promise<StrategyMetadata[]> {
	const strats = getConfiguredStrategies();
	return getStrategiesWithMetadata(strats, fetch);
}

/**
 * Get metadata for a single strategy
 *
 * @param strategyConfig
 */
export async function getStrategyMetadata(
	strategyConfig: StrategyConfiguration,
	fetch
): Promise<StrategyMetadata> {
	const arr = await getStrategiesWithMetadata([strategyConfig], fetch);
	return arr[0];
}
