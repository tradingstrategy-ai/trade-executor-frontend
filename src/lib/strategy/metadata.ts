/**
 * Strategy metadata fetching.
 */

import { getConfiguredStrategies } from './configuration';
import type { StrategyConfiguration } from './configuration';
// https://github.com/fram-x/assert-ts/issues/23
import { assert } from 'assert-ts';
import loadError from "../assets/load-error.jpg";

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
	// A developer readable reason why the strategy cannot be loaded.
    // If set the strategy is not accessible.
	error?: string;
}

export async function getStrategiesWithMetadata(
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

            let resp;

            try {
                // Because we load from the executor, we need to be able to
                // catch HTTP 500 from Cloudflare (no CORS headers)
                // https://github.com/sveltejs/kit/issues/5074
                resp = await fetch(`${strat.url}/metadata`);
            } catch(e) {
                // TypeError: Failed to fetch
                // but happens only on client-side.
                // The exception is hard to distinguish from
                // any other exception, because it lacks metadata
                // (class name, attributes).
                console.error("fetch() raised an error", e)
                // Temporary work around
                resp = {ok: false, statusText: e.message};
            }

			let error, meta;
			if (resp.ok) {
				meta = await resp.json();
				error = null;
			} else {
				meta = {};
				error = resp.statusText;
			}

            if(meta.id) {
                assert(strat.id === meta.id, `Mismatch on strategy id. We have ${strat.id}, server has ${meta.id}` );
            }

			return {
				id: strat.id,
				name: meta.name || strat.name,
				short_description: meta.short_description,
				long_description: meta.long_description,
				icon_url: meta.icon_url || loadError,
				config: strat,
				link: `/strategy/${strat.id}`,
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
