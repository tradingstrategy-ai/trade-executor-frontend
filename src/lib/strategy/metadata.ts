/**
 * Strategy metadata fecthing.
 */

import { getConfiguredStrategies } from './configuration';
import type { StrategyConfiguration } from './configuration';

/**
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

/**
 * Get list of configured strategies and pings server for the latest metadata.
 *
 * Typedefs JSON load from the config.
 */
export async function getStrategiesWithMetadata(fetch): Promise<StrategyMetadata[]> {
	const strats = getConfiguredStrategies();

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
    const metadatas = await Promise.all(strats.map(async strat => {
         const resp = await fetch(`${strat.url}/metadata`);
         let error, meta;
         if(resp.ok) {
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
			config: strats,
			link: `/strategy/${strats[0].id}`,
			started_at: meta.started_at,
            error: error,
		}
    }));

    return metadatas;
}
