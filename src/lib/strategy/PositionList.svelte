<!--
@component

Renders a summary list of trading positions.

Used for

- Open positions
- Closed positions
- Frozen positions

Usage:

    <PositionList positions={positions} />
-->
<script lang="ts">
	import '../styles/datatable.css';
	import { Datatable } from 'svelte-simple-datatables';
	import type { Stats, TradingPosition } from '../state/interface';
	import { createCombinedPositionList } from '../state/stats';
	import {
		formatUnixTimestampAsHours,
		formatProfitability,
		formatDollar
	} from '../helpers/formatters';

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
	export let columns = {};

	export let defaultColumns = {
		position_id: true,
		ticker: true,
		profitability: true,
		size: true
	};

	// https://vincjo.fr/svelte-simple-datatables/#/settings
	let defaultDatatableSettings = {
		columnFilter: false,
		sortable: true,
		pagination: true,
		rowsPerPage: 50,
		scrollY: false,
		css: false,
		blocks: {
			searchInput: true,
			paginationButtons: true,
			paginationRowCount: true
		}
	};

	let combinedSettings = { ...defaultDatatableSettings, ...settings };

	let activeColumns = { ...defaultColumns, ...columns };

	// Convert position list to suitable format for our presentation
	function transformTabularData(_positions, _stats) {
		if (!_positions) {
			console.log('No positions to display');
			return [];
		}
		const positionList = Object.values(_positions);
		const combined = createCombinedPositionList(positionList, _stats);
		return combined;
	}

	$: data = transformTabularData(positions, stats);

	let rows;
</script>

{#if data.length > 0}
	<Datatable
		settings={combinedSettings}
		{data}
		bind:dataRows={rows}
		classList="datatable-positions"
	>
		<thead>
			<tr>
				<th data-key="position_id" class="th-positions sortable"># <span /></th>
				<th data-key="ticker" class="th-positions sortable">Pair <span /></th>
				<th data-key="profitability" class="th-positions sortable">Profit <span /></th>
				<th data-key="size" class="th-positions sortable">Size <span /></th>

				{#if activeColumns.opened_at}
					<th data-key="opened_at" class="th-positions col-opened-at sortable">Opened <span /></th>
				{/if}

				{#if activeColumns.closed_at}
					<th data-key="last_trade_at" class="th-positions col-closed-at sortable"
						>Closed <span /></th
					>
				{/if}

				<th />
			</tr>
		</thead>
		<tbody>
			{#if rows}
				{#each $rows as row}
					<tr>
						<td>{row.position_id}</td>
						<td>
							{row.ticker}
						</td>

						<td class:profit-green={row.profitability > 0} class:profit-red={row.profitability < 0}>
							{formatProfitability(row.profitability)}
						</td>

						<td>g
							{formatDollar(row.equity)}
						</td>

						{#if activeColumns.opened_at}
							<td class="col-opened-at">
								{formatUnixTimestampAsHours(row.opened_at)}
							</td>
						{/if}

						{#if activeColumns.closed_at}
							<td class="col-closed-at">
								{formatUnixTimestampAsHours(row.last_trade_at)}
							</td>
						{/if}

						<td>
							<a href="#"> Details </a>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</Datatable>
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

	:global(.datatable-positions tr:last-child td) {
		border: 0;
	}

	@media (max-width: 992px) {
		.col-opened-at,
		.col-closed-at {
			display: none;
		}
	}
</style>
