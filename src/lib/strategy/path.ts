/**
 * Navigation mapping and breadcrumbs..
 */

import assert from 'assert-ts';
import type { Page } from '@sveltejs/kit';
import type { CurrentStrategyInfo } from '../state/store';

interface StrategyNavigationInfo {
	strategyName: string;
	baseUrl: string;
	pageUrl?: string;
	pageName: string;
	segments: string[];
}

// Map the page slug to longer name.
// Map by the last path segment of URL
const pageNames = {
	'open-positions': 'Open positions',
	'closed-positions': 'Closed positions',
	'frozen-positions': 'Frozen positions'
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

	const segments = page.routeId.split('/');
	const pageSegment = segments.at(2);
	const pageName = pageNames[pageSegment];
	const baseUrl = `/strategy/${currentStrategy.id}`;

	let pageUrl;
	if (pageSegment) {
		pageUrl = `/strategy/${currentStrategy.id}/${pageSegment}`;
	} else {
		pageUrl = `/strategy/${currentStrategy.id}`;
	}
	return {
		strategyName: currentStrategy.name,
		baseUrl,
		pageUrl,
		pageName,
		segments
	};
}
