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

-->
<script lang="ts">
	import { page } from '$app/stores';
	import { parseStrategyPath } from '../strategy/path';
	import { currentStrategy, portfolio, stats } from '../state/store';
	import { PositionKind } from '../state/interface';
	import {
		formatUnixTimestampAsHours,
		formatDuration,
		formatProfitability,
		formatDollar,
		formatAmount
	} from '../helpers/formatters';
	import { getPositionLatestStats } from '../state/stats';
	import TradeList from './TradeList.svelte';

	export let positionKind: PositionKind;

	let positionId;
	let position;
	let positionStats;

	$: {
		if ($portfolio) {
			const navInfo = parseStrategyPath($currentStrategy, $page);
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

			positionStats = getPositionLatestStats(positionId, $stats);
		} else {
			position = null;
		}
	}
</script>

{#if position && positionStats}
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
				class:profit-green={positionStats.profitability >= 0}
				class:profit-red={positionStats.profitability < 0}
			>
				{formatProfitability(positionStats.profitability)}
			</td>
		</tr>

		{#if position.closed_at}
			<tr>
				<th>Value (highest)</th>
				<td>
					{formatDollar(positionStats.value_at_max)}
				</td>
			</tr>

			<tr>
				<th>Value (at open)</th>
				<td>
					{formatDollar(positionStats.value_at_open)}
				</td>
			</tr>
		{:else}
			<tr>
				<th>Value</th>
				<td>
					{formatDollar(positionStats.value)}
				</td>
			</tr>

			<tr>
				<th>Units</th>
				<td>
					{formatAmount(positionStats.equity)}
					{position.pair.base.token_symbol}
				</td>
			</tr>
		{/if}

		<tr>
			<th>Last revaluation</th>
			<td>
				{formatUnixTimestampAsHours(position.last_pricing_at)}
			</td>
		</tr>
	</table>

	<h2>Trades</h2>

	<TradeList trades={position.trades} {position} />
{:else}
	<p>Position data could not be loaded at the moment.</p>
{/if}
