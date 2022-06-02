<!--
@component

Renders a summary list of trading positions.

Used for

- Open positions
- Closed positions
- Frozen positions

Usage:

    <PositionList positions={positions} />

Based on Grid.js and svelte-simple-datatables:
- https://gridjs.io/
- https://github.com/grid-js/gridjs
- https://github.com/iamyuu/gridjs-svelte
- https://gridjs.io/docs/integrations/svelte/
- https://svelte.dev/repl/e772220feac54e65b132615ac4d8eb09?version=3.47.0
- https://gridjs.io/docs/config/columns

-->
<script lang="ts">
	// On-demand CSS
	import 'gridjs/dist/theme/mermaid.css';
	import '../styles/gridjs.css';

	// Typescript
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';

	import type { Stats, TradingPosition } from '../state/interface';
	import { createCombinedPositionList } from '../state/stats';
	import {
		formatUnixTimestampAsHours,
		formatProfitability,
		formatDollar
	} from '../helpers/formatters';
	import { page } from '$app/stores';
	import { parseStrategyPath } from '../strategy/path';
	import { currentStrategy } from '../state/store';
	import { determineProfitColourClass } from '../helpers/profit';

	/**
	 * Position raw data as id -> TradingPosition mapping.
	 * https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/position.py
	 */
	export let positions: TradingPosition[];

	/**
	 * Portfolio statistics data.
	 *
	 * https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/statistics.py#L21
	 */
	export let stats: Stats;

	/**
	 * Datatable settings overrides.
	 */
	export let settings = {};

	/**
	 * Displayed columns overrides.
	 */
	export let columns = {
		profitability: true,
		value: true,
		freeze_status: false,
		details: true,
		value_for_close: false
	};

	/**
	 * Is pagination enabled
	 */
	export let pagination = true;

	/**
	 * Is quick search enabled
	 */
	export let search = false;

	// https://github.com/grid-js/gridjs/discussions/963
	export let sort = '-position_id';

	// Convert position list to suitable format for our presentation
	function transformTabularData(_positions, _stats) {
		if (!_positions) {
			console.log('No positions to display');
			return [];
		}
		const positionList = Object.values(_positions);
		const combined = createCombinedPositionList(positionList, _stats);

		if (columns.freeze_status) {
			combined.map((p) => {
				const lastTrade = Object.values(p.trades).at(-1);
				console.log(lastTrade);
				if (lastTrade.planned_quantity > 0) {
					p.freeze_status = '🟡 Buy';
				} else {
					p.freeze_status = '🛑 Sell';
				}

				// Fix the value to reflect the value of the failed trade
				p.value = lastTrade.planned_reserve;
			});
		}

		// On closed position table
		if (columns.value_for_close) {
			combined.map((p) => {
				console.log(p);
				// Fix the value to reflect the value of the failed trade
				// p.value = lastTrade.planned_reserve;
				p.value_for_close = p.value_at_open;
			});
		}

		return combined;
	}

	let pageUrl;

	$: {
		const navInfo = parseStrategyPath($currentStrategy, $page);
		pageUrl = navInfo.pageUrl;
	}

	const gridJsColumns = [
		{
			id: 'position_id',
			name: 'Id',
			sort: {
				enabled: true
			}
		},
		{
			id: 'ticker',
			name: 'Ticker',
			sort: {
				enabled: true
			}
		}
	];

	if (columns.profitability) {
		gridJsColumns.push({
			id: 'profitability',
			name: 'Profitability',
			sort: {
				enabled: true
			},
			formatter: (cell) => {
				const value = formatProfitability(cell);
				let klass = determineProfitColourClass(cell);
				return html(`<span class="${klass}">${value}</span>`);
			}
		});
	}

	if (columns.value) {
		gridJsColumns.push({
			id: 'value',
			name: 'Value',
			sort: {
				enabled: true
			},
			formatter: (cell) => {
				return formatDollar(cell);
			}
		});
	}

	if (columns.value_for_close) {
		gridJsColumns.push({
			id: 'value_for_close',
			name: 'Value (Open)',
			sort: {
				enabled: true
			},
			formatter: (cell) => {
				return formatDollar(cell);
			}
		});
	}

	if (columns.opened_at) {
		gridJsColumns.push({
			id: 'opened_at',
			name: 'Opened',
			formatter: (cell) => {
				return formatUnixTimestampAsHours(cell);
			},
			sort: {
				enabled: true
			}
		});
	}

	if (columns.closed_at) {
		gridJsColumns.push({
			id: 'closed_at',
			name: 'Closed',
			formatter: (cell) => {
				const d = formatUnixTimestampAsHours(cell);
				console.log(d);
				return d;
			},
			sort: {
				enabled: true
			}
		});
	}

	// Generate link to the position details page
	if (columns.details) {
		gridJsColumns.push({
			id: 'details',
			sort: {
				enabled: false
			},
			name: '',
			formatter: (cell, row) => {
				const positionId = row.cells[0].data;
				return html(`<a href="${pageUrl}/${positionId}">Details</a>`);
			}
		});
	}

	// Frozen positions specific details
	if (columns.freeze_status) {
		gridJsColumns.push({
			id: 'freeze_status',
			name: 'Details',
			sort: {
				enabled: true
			},
			formatter: (cell, row) => {
				const positionId = row.cells[0].data;
				return html(`<a href="${pageUrl}/${positionId}">${cell}</a>`);
			}
		});
	}

	let language = {
		search: {
			placeholder: 'Search token...'
		}
	};

	let gridJsPagination;

	if (pagination) {
		gridJsPagination = {
			enabled: true,
			limit: 20,
			summary: false
		};
	} else {
		gridJsPagination = null;
	}

	$: data = transformTabularData(positions, stats);
</script>

{#if data.length > 0}
	<Grid {search} {sort} pagination={gridJsPagination} {data} columns={gridJsColumns} {language} />
{:else}
	<p>No positions.</p>
{/if}

<style>
	:global(.datatable-positions .th-positions) {
		margin: 20px 0;
	}

	:global(.datatable-positions .th-positions) {
		text-align: left !important;
	}

	:global(.datatable-positions td) {
		padding: 8px 0px 8px 16px;
		border-bottom: 1px solid #eee;
	}

	:global(.gridjs-table a) {
	}

	:global(.datatable-positions tr:last-child td) {
		border: 0;
	}

	:global(td[data-column-id='freeze_status']) {
		white-space: nowrap;
	}

	:global(td[data-column-id='freeze_status'] a) {
		color: red;
	}

	@media (max-width: 992px) {
		.col-opened-at,
		.col-closed-at {
			display: none;
		}
	}
</style>
