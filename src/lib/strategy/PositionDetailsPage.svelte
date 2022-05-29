<!--
@component

Renders a full details of a position.

Used for

- Open positions
- Closed positions
- Frozen positions

Position id is picked up from the page store.

Usage:

    <PositionDetails />

For data structure see

- https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/position.py
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { parseStrategyPath } from '../strategy/path';
	import { currentStrategy, portfolio, stats } from '../state/store';
    import {PositionKind } from '../state/interface';
    import type {PositionStatistics} from '../state/interface';
	import {
		formatUnixTimestampAsHours,
		formatDuration,
		formatProfitability,
		formatDollar,
		formatAmount,
        formatTokenAmount
	} from '../helpers/formatters';
	import { getPositionLatestStats } from '../state/stats';
	import TradeList from './TradeList.svelte';
    import {getValueAtOpen, getValueAtPeak, getValueAtClose } from "$lib/state/positionHelpers";

	export let positionKind: PositionKind;

	let positionId;
	let position;
	let currentStats: PositionStatistics;
    let positionStats: PositionStatistics[];
    let failedTrades;
    let navInfo;

	$: {
		if ($portfolio) {
			navInfo = parseStrategyPath($currentStrategy, $page);
			positionId = navInfo.positionId;
			if (positionKind == PositionKind.open) {
				position = $portfolio.open_positions[positionId];
			} else if (positionKind == PositionKind.closed) {
				position = $portfolio.closed_positions[positionId];
			} else if (positionKind == PositionKind.frozen) {
				position = $portfolio.frozen_positions[positionId];
			} else {
				throw new Error('What?');
			}

			currentStats = getPositionLatestStats(positionId, $stats);
            positionStats = $stats.positions[positionId];

            failedTrades = Object.values(position.trades).some((t) => { return t.failed_at });
		} else {
			position = null;
		}
	}
</script>

{#if position && currentStats}
	<h2>Overview</h2>

	<table class="table">
		<tr>
			<th>Pair</th>
			<td>
				<a href={position.pair.info_url}>
					{position.pair.base.token_symbol} - {position.pair.quote.token_symbol}
				</a>
			</td>
		</tr>

        {#if failedTrades}
            <tr class="error-row">
                <th>Errors</th>
                <td>Failed trades</td>
            </tr>
        {/if}

		<tr>
			<th>Opened</th>
			<td>{formatUnixTimestampAsHours(position.opened_at)}</td>
		</tr>

		{#if position.closed_at}
			<tr>
				<th>Closed</th>
				<td>{formatUnixTimestampAsHours(position.closed_at)}</td>
			</tr>

			<tr>
				<th>Duration</th>
				<td>{formatDuration(position.closed_at - position.opened_at)}</td>
			</tr>
		{/if}

		<tr>
			<th>Profitability</th>
			<td
				class:profit-green={currentStats.profitability >= 0}
				class:profit-red={currentStats.profitability < 0}
			>
				{formatProfitability(currentStats.profitability)}
			</td>
		</tr>

		{#if position.closed_at}
			<tr>
				<th>Value at open</th>
				<td>
					{ formatDollar(getValueAtOpen(positionStats)) }
				</td>
			</tr>

			<tr>
				<th>Value before close</th>
				<td>
					{ formatDollar(getValueAtClose(positionStats)) }
				</td>
			</tr>
		{:else}
			<tr>
				<th>Value now</th>
				<td>
					{formatDollar(currentStats.value)}
				</td>
			</tr>

			<tr>
				<th>Quantity</th>
				<td>
					{formatTokenAmount(currentStats.quantity)}
					{position.pair.base.token_symbol}
				</td>
			</tr>
		{/if}

        <tr>
            <th>Value (highest)</th>
            <td>
                { formatDollar(getValueAtPeak(positionStats)) }
            </td>
        </tr>

		<tr>
			<th>Last revaluation</th>
			<td>
				{formatUnixTimestampAsHours(position.last_pricing_at)}
			</td>
		</tr>
	</table>

	<h2>Trades</h2>

	<TradeList baseUrl={navInfo.pageUrl} trades={position.trades} {position} />
{:else}
	<p>Position data could not be loaded at the moment. Position data not available for position #{positionId}</p>
{/if}

<style>
    .error-row {
        color: red;
    }
</style>
