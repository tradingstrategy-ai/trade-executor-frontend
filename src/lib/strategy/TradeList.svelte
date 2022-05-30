<!--
@component

Renders a summary list of executed trades.

Used for trade lists in position details.

Usage:

    <TradeList trades={trades} />

Based on Grid.js and svelte-simple-datatables:
- https://gridjs.io/
- https://github.com/grid-js/gridjs
- https://github.com/iamyuu/gridjs-svelte
- https://gridjs.io/docs/integrations/svelte/
- https://svelte.dev/repl/e772220feac54e65b132615ac4d8eb09?version=3.47.0
- https://gridjs.io/docs/config/columns

-->
<script lang="ts">
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';
	import 'gridjs/dist/theme/mermaid.css';
	import '../styles/gridjs.css';

	import type { TradeExecution, TradingPosition } from '../state/interface';
	import {
		formatUnixTimestampAsHours,
		formatDollar,
		formatAmount,
		formatTokenAmount
	} from '../helpers/formatters';
	import { getBlockchainExplorerLink } from '../helpers/chain-explorer';

	/**
	 * List of position trades
	 */
	export let trades: Record<number, TradeExecution>;

	export let position: TradingPosition;

	/**
	 * Datatable settings overrides.
	 */
	export let settings = {};

	/**
	 * Displayed columns overrides.
	 */
	export let columns = {};

	/**
	 * Base URL for individual trade details page links.
	 *
	 * E.g. /strategy/foobar/open-positions/1
	 */
	export let baseUrl;

	/**
	 * Is pagination enabled
	 */
	export let pagination = true;

	const gridJsColums = [
		{
			id: 'id_and_warning',
			name: 'Id',
			sort: {
				enabled: true
			},
			formatter: (cell, row) => {
				const label = cell.quantity > 0 ? 'Buy' : 'Sell';

				if (cell.warning) {
					return html(`<span class=warning>#${cell.id}: ${label}</span>`);
				} else {
					return `#${cell.id}: ${label}`;
				}
			}
		},
		{
			id: 'started_at',
			name: 'Started',
			sort: {
				enabled: true
			},
			formatter: (cell) => {
				return html(formatUnixTimestampAsHours(cell, true, true));
			}
		},
		{
			id: 'executed_at',
			name: 'Executed',
			sort: {
				enabled: true
			},
			formatter: (cell) => {
				return html(formatUnixTimestampAsHours(cell, true, true));
			}
		},
		{
			id: 'value',
			name: 'Value',
			sort: {
				enabled: true
			},
			formatter: (cell) => {
				return formatDollar(cell);
			}
		},
		{
			id: 'quantity',
			name: `Quantity`,
			sort: {
				enabled: true
			},
			formatter: (cell) => {
				return formatTokenAmount(cell);
			}
		},
		// For transactions, generate a list of Etherscan links,
		// with a color and warning if the transaction failed
		{
			id: 'blockchain_transactions',
			name: `Txs`,
			sort: {
				enabled: false
			},
			formatter: (cell) => {
				const blockchain_transactions = cell;

				// Transaction information
				//
				// https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/blockhain_transaction.py

				const outSpans = blockchain_transactions.map((tx, idx) => {
					console.log(tx);
					const link = getBlockchainExplorerLink(tx.chain_id, tx.tx_hash);
					const label = link ? idx + 1 : 'Explorer link broken';
					const classes = tx.status == 1 ? '' : 'tx-warning';
					const html = `<a class="${classes}" href="${link}">Tx&nbsp;${label}</a>`;
					return html;
				});

				return html(outSpans.join(', '));
			}
		},
		{
			id: 'details',
			name: '',
			sort: {
				enabled: false
			},
			formatter: (cell, row) => {
				const tradeId = row.cells[0].data.id;
				const link = `${baseUrl}/trade-${tradeId}`;
				const out = `<a href="${link}">Details</a>`;
				return html(out);
			}
		}
	];

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

	// Massage data
	// https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/trade.py
	function transformData(trades): object[] {
		let result = [];
		for (let t of Object.values(trades)) {
			let o = { ...t };
			// Decimal string -> float conversion
			o.quantity = o.executed_quantity
				? parseFloat(o.executed_quantity)
				: parseFloat(o.planned_quantity);
			o.value = o.executed_reserve ? parseFloat(o.executed_reserve) : parseFloat(o.planned_reserve);
			// If we did not execute the trade set the warning flag
			o.id_and_warning = { id: o.trade_id, warning: !o.executed_at, quantity: o.quantity };
			result.push(o);
		}
		return result;
	}

	const className = {
		table: 'table-trades'
	};

	$: data = transformData(trades);
</script>

{#if data.length > 0}
	<Grid sort {className} {data} columns={gridJsColums} />
{:else}
	<p>No trades.</p>
{/if}

<style>
	:global(.table-trades.gridjs-table) {
		font-size: 80%;
	}

	:global(.table-trades.gridjs-table .tx-warning):before {
		content: '⚠️ ';
		color: red;
		font-size: 150%;
	}

	:global(.table-trades.gridjs-table .tx-warning) {
		color: red;
	}
</style>
