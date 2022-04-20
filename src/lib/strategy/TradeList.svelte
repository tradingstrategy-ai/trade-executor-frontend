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

	import type { TradeExecution, TradingPosition } from '../state/interface';
    import {
        formatUnixTimestampAsHours,
        formatDollar,
        formatAmount, formatTokenAmount
    } from '../helpers/formatters';

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
                if(cell.warning) {
                    return html(`<span class=warning>${cell.id}</span>`);
                } else {
                    return cell.id;
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
				return html(formatUnixTimestampAsHours(cell, true));
			}
		},
		{
			id: 'executed_at',
			name: 'Executed',
			sort: {
				enabled: true
			},
		    formatter: (cell) => {
				return html(formatUnixTimestampAsHours(cell, true));
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
			name: `Quantity (${position.pair.base.token_symbol})`,
			sort: {
				enabled: true
			},
			formatter: (cell) => {
				return formatTokenAmount(cell);
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
    function transformData(trades): object[] {
        let result = []
        for(let t of Object.values(trades)) {
            let o = {...t}
            // Decimal string -> float conversion
            o.quantity = o.executed_quantity ? parseFloat(o.executed_quantity) : parseFloat(o.planned_quantity);
            o.value = o.executed_reserve ? parseFloat(o.executed_reserve) : parseFloat(o.planned_reserve);
            // If we did not execute the trade set the warning flag
            o.id_and_warning = { id: o.trade_id, warning: !o.executed_at };
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
	<Grid sort className={className} {data} columns={gridJsColums} />
{:else}
	<p>No trades.</p>
{/if}

<style>
	:global(.table-trades.gridjs-table) {
		font-size: 80%;
	}

	:global(.table-trades.gridjs-table .warning):before {
        content: '⚠️ ';
        color: red;
		font-size: 150%;
	}

</style>
