import assert from 'assert-ts';
import type { Page } from '@sveltejs/kit';
import type { CurrentStrategyInfo } from './store';

interface StrategyNavigationInfo {
	strategyName: string;
	baseUrl: string;
	pageName: string;
}

// Map the page slug to longer name.
// Map by the last path segment of URL
const pageNames = {
	'open-positions': 'Open positions'
};

/**
 * Parse the stragy path and get the name for the strategy page
 *
 * @param currentStrategy Currently loaded strategy in store
 * @param page SvelteKit page object from store
 */
export function parseStrategyPath(
	currentStrategy: CurrentStrategyInfo,
	page: Page
): StrategyNavigationInfo {
	assert(currentStrategy, 'currentStrategy is null');

	const pageSegment = page.routeId.split('/').at(-1);
	const pageName = pageNames[pageSegment] || 'Overview';
	const baseUrl = `/strategy/${currentStrategy.id}`;
	return {
		strategyName: currentStrategy.name,
		baseUrl,
		pageName
	};
}
