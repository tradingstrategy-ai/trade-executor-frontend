/**
 * Navigation mapping and breadcrumbs..
 */

// https://github.com/fram-x/assert-ts/issues/23
import { assert } from 'assert-ts';

import type { Page } from '@sveltejs/kit';
import type { CurrentStrategyInfo } from '../state/store';

interface StrategyNavigationInfo {
	strategyName?: string;
	baseUrl: string;
	pageUrl?: string;
	pageName: string;
	segments: string[];
	positionSegmentName?: string;
	positionSegmentUrl?: string;
	positionId?: string;
	positionUrl?: string;
	tradeId?: string;
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

	const segments = page.url.pathname.split('/');
	const pageSegment = segments[3];
	const positionId = page.params.position_id;
	const tradeId = page.params.trade_id;
	const baseUrl = `/strategy/${currentStrategy.id}`;
	let pageName = pageNames[pageSegment];
	let strategyName = currentStrategy?.name;
	let pageUrl;
	let positionUrl;
	let positionSegmentUrl;
	let positionSegmentName;

	if (tradeId) {
		// Individual trade page
		pageUrl = `/strategy/${currentStrategy.id}/${pageSegment}/${positionId}/trade-${tradeId}`;
		positionUrl = `/strategy/${currentStrategy.id}/${pageSegment}/${positionId}`;
		positionSegmentUrl = `/strategy/${currentStrategy.id}/${pageSegment}`;
		positionSegmentName = pageName;
	} else if (positionId) {
		// Individual position page
		pageUrl = `/strategy/${currentStrategy.id}/${pageSegment}/${positionId}`;
		positionUrl = `/strategy/${currentStrategy.id}/${pageSegment}/${positionId}`;
		positionSegmentUrl = `/strategy/${currentStrategy.id}/${pageSegment}`;
		positionSegmentName = pageName;
	} else if (pageSegment) {
		// Strategy subpages
		pageUrl = `/strategy/${currentStrategy.id}/${pageSegment}`;
		positionSegmentUrl = `/strategy/${currentStrategy.id}/${pageSegment}`;
		positionSegmentName = pageName;
	} else if (segments.length >= 2) {
		// Root for a single strategy
		pageUrl = `/strategy/${currentStrategy.id}`;
	} else {
		// Strategies root
		pageName = 'Overview';
		pageUrl = `/strategy`;
		strategyName = null;
	}
	return {
		strategyName,
		baseUrl,
		pageUrl,
		pageName,
		segments,
		positionSegmentName,
		positionSegmentUrl,
		positionId,
		positionUrl,
		tradeId
	};
}
