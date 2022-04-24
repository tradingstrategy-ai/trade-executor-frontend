/**
 * Strategy metadata fetching.
 */

import { getConfiguredStrategies } from './configuration';
import type { StrategyConfiguration } from './configuration';
// https://github.com/fram-x/assert-ts/issues/23
import { assert } from 'assert-ts';

/**
 * Metadata describes strategy information not related to the profit generation.
 *
 * This is bits like name, description, icon and executor uptime.
 *
 * TypeScript helper for having frontend side configuration for strategies.
 *
 * See https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/metadata.py
 */
export interface StrategyMetadata {
	id: string;
	name?: string;
	short_description?: string;
	long_description?: string;
	icon_url?: string;
	started_at?: number;
	// Link to the strategy page, generated on the client side
	link: string;
	config: StrategyConfiguration;
	//
	error?: string;
}

export async function getStrategiesWithMetedata(
	strats: StrategyConfiguration[],
	fetch
): Promise<StrategyMetadata[]> {
	/*
	const exampleData = [
		{
			id: strats[0].id,
			name: 'Data collection test strategy',
			short_description: 'Test',
			long_description: 'Test',
			icon_url:
				'https://upload.wikimedia.org/wikipedia/commons/4/43/Blueberry_pancakes_%283%29.jpg',
			config: strats[0],
			link: `/strategy/${strats[0].id}`,
			started_at: 0
		}
	];*/

	// Load metadata for all strategies parallel
	return await Promise.all(
		strats.map(async (strat) => {
			assert(strat.url, `StrategyConfig URL missing: ${strat}`);

			const resp = await fetch(`${strat.url}/metadata`);
			let error, meta;
			if (resp.ok) {
				meta = await resp.json();
				error = null;
			} else {
				meta = {};
				error = resp.statusText;
			}
			return {
				id: strat.id,
				name: meta.name,
				short_description: meta.short_description,
				long_description: meta.long_description,
				icon_url: meta.icon_url,
				config: strat,
				link: `/strategy/${strats[0].id}`,
				started_at: meta.started_at,
				error: error
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
	return getStrategiesWithMetedata(strats, fetch);
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
	const arr = await getStrategiesWithMetedata([strategyConfig], fetch);
	return arr[0];
}
