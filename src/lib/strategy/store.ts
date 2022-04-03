import { writable } from 'svelte/store';

export const currentStrategyId = writable(null);

export const currentStrategyName = writable(null);

export const currentStrategyState = writable(null);

/**
 * Toggles loading of a new strategy state.
 *
 * The frontend can keep only one strategy state in the memory once.
 *
 * @param strategyId
 */
export async function loadStrategy(strategyId: string, strategyWebhookServer: string) {}
