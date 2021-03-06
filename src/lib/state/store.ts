import { derived, writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { getConfiguredStrategyById } from '../strategy/configuration';
import type { Portfolio, State, Stats } from './interface';

/**
 * Describe loaded strategy
 */
export interface CurrentStrategyInfo {
	id?: string;
	name?: string;
	state?: State;
	error?: string;
}

/**
 * The internal Svelte store for the strategy load cycle.
 *
 * The application navigation can manage only one loaded strategy at a time.
 *
 * currentStrategy.state contains the Python trade executor state dump as per state.py.
 */
export const currentStrategy = writable({
	id: null,
	name: null,
	state: null,
	error: null
});

/**
 * Current portfolio alias it for simplify coding.
 * One state can contain only one portfolio ATM.
 */
export const portfolio: Readable<Portfolio> = derived(
	currentStrategy,
	($currentStrategy) => $currentStrategy?.state?.portfolio
);

/**
 * Current portfolio statistics alias it for simplify coding.
 * One state can contain only one portfolio ATM.
 */
export const stats: Readable<Stats> = derived(
	currentStrategy,
	($currentStrategy) => $currentStrategy?.state?.stats
);

/** The current strategy id shortcut - can be used in links, etc. */
export const strategyId = derived(currentStrategy, ($currentStrategy) => $currentStrategy?.id);

let currentStrategyId;

// Assume we do not need to unsubscribe because
// module code is run only once
currentStrategy.subscribe(($currentStrategy) => {
	currentStrategyId = $currentStrategy.id;
});

/**
 * Toggles loading of a new strategy state.
 *
 * The frontend can keep only one strategy state in the memory once.
 * If the strategy is already loaded, do nothing.
 *
 * https://github.com/tradingstrategy-ai/spec/blob/main/trade-executor-api.yaml
 *
 * @param webhookUrl Hook the trade executor webhook server
 */
export async function loadStrategyState(id: string, name: string, webhookUrl: string) {
	const url = `${webhookUrl}/state`;

	if (id == currentStrategyId) {
		// Already loaded the current strategy state, do nothing.
		// Assume user hits Refresh in the browser to reload.
		return;
	}

	// reset the loader
	console.log('Loading strategy', id, name, webhookUrl);
	currentStrategy.set({ id, name, state: null, error: null });

	// Load the state file from the server;
	try {
		let resp;

		try {
			resp = await fetch(url);
		} catch (e) {
			console.error('Fetch error', e, e.message);
			resp = { ok: false, status: e.message };
		}

		if (!resp.ok) {
			console.error('Failed to load', url, resp.status);
			currentStrategy.set({ id, name, state: null, error: resp.status });
			return;
		}

		const state = await resp.json();

		// Hurray, our server managed to spit out a non-crashing reply
		currentStrategy.set({
			id,
			name,
			state,
			error: null
		});

		console.log('Loaded strategy state', id, state);
	} catch (e) {
		console.log('Problem handling state load');
		console.error(e);
		currentStrategy.set({
			id,
			name,
			state: null,
			error: e.toString()
		});
	}
}

/**
 * Load strategy using the webhook URL from the configs.
 */
export async function loadStrategyById(strategyId: string) {
	const strategyConfig = getConfiguredStrategyById(strategyId);
	if (strategyConfig) {
		await loadStrategyState(strategyConfig.id, strategyConfig.name, strategyConfig.url);
	} else {
		throw new Error(`Unknown strategy: ${strategyId}`);
	}
}
