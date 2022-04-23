/**
 * Navigation mapping and breadcrumbs..
 */

import assert from 'assert-ts';
import type { Page } from '@sveltejs/kit';
import type { CurrentStrategyInfo } from '../state/store';

interface StrategyNavigationInfo {
	strategyName?: string;
	baseUrl: string;
	pageUrl?: string;
	pageName: string;
	segments: string[];
	positionId?: string;
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
	const positionId = page.params.position_id;
	const baseUrl = `/strategy/${currentStrategy.id}`;
    let pageName = pageNames[pageSegment];
    let strategyName = currentStrategy?.name;
	let pageUrl;

	if (positionId) {
        // Individual position page
		pageUrl = `/strategy/${currentStrategy.id}/${pageSegment}/${positionId}`;
	} else if (pageSegment) {
        // Strategy subpages
		pageUrl = `/strategy/${currentStrategy.id}/${pageSegment}`;
	} else if(segments.length >= 2) {
        // Root for a single strategy
		pageUrl = `/strategy/${currentStrategy.id}`;
	} else {
        // Strategies root
        pageName = "Overview";
        pageUrl = `/strategy`;
        strategyName = null;
    }
	return {
		strategyName,
		baseUrl,
		pageUrl,
		pageName,
		segments,
		positionId
	};
}
