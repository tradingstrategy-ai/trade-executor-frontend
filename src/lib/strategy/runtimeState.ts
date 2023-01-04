/**
 * Strategy runtime state fetching.
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
 * RuntimeState describes strategy information not related to the profit generation.
 *
 * This includes properties provided by the backend API, augmented with additional properties
 * client-side (e.g., link, config, error).
 *
 * See https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/metadata.py
 */
export interface StrategyRuntimeState {
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

export async function getStrategiesWithRuntimeState(
	strats: StrategyConfiguration[],
	fetch
): Promise<StrategyRuntimeState[]> {
	// Load runtime state for all strategies parallel
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

			let error, payload;
			if (resp.ok) {
				try {
					payload = await resp.json();
					error = null;
				} catch (e) {
					payload = {};
					error = e.message;
				}
			} else {
				payload = {};
				error = resp.statusText;
			}

			if (payload.id) {
				assert(
					strat.id === payload.id,
					`Mismatch on strategy id. We have ${strat.id}, server has ${payload.id}`
				);
			}

			return {
				id: strat.id,
				name: payload.name || strat.name,
				short_description: payload.short_description,
				long_description: payload.long_description,
				icon_url: payload.icon_url || loadError,
				started_at: payload.started_at,
				executor_running: payload.executor_running,
				summary_statistics: payload.summary_statistics,
				config: strat,
				link: `/strategy/${strat.id}`,
				error
			};
		})
	);
}

/**
 * Get list of configured strategies and pings server for the latest runtime state.
 *
 * Typedefs JSON load from the config.
 */
export async function getConfiguredStrategiesWithRuntimeState(
	fetch
): Promise<StrategyRuntimeState[]> {
	const strats = getConfiguredStrategies();
	return getStrategiesWithRuntimeState(strats, fetch);
}

/**
 * Get runtime state for a single strategy
 *
 * @param strategyConfig
 */
export async function getStrategyRuntimeState(
	strategyConfig: StrategyConfiguration,
	fetch
): Promise<StrategyRuntimeState> {
	const arr = await getStrategiesWithRuntimeState([strategyConfig], fetch);
	return arr[0];
}
