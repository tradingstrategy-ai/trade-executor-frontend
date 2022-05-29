<!--
@component

Trade details page. Display trade debug information.

Used for trades on any position.

Usage:

    <TradeDetailsPage positionKind={PositionKind.frozen} />

For data structure see

- https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/trade.py
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
    import {getBlockchainExplorerLink, getChainName} from "$lib/helpers/chain-explorer";

    export let positionKind: PositionKind;

	let positionId;
    let tradeId;
    let trade;
	let position;
	let positionStats;
    let failedTrades;
    let prettyJSON;

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
            tradeId = navInfo.tradeId;
			trade = position.trades[tradeId];
            prettyJSON = JSON.stringify(trade, null, "  ");
		} else {
			position = null;
            trade = null;
		}
	}
</script>

{#if trade}

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
			<th>Executed at</th>
			<td>{formatUnixTimestampAsHours(trade.executed_at)}</td>
		</tr>

        <tr>
			<th>Expected value</th>
			<td>{formatDollar(trade.planned_reserve)}</td>
		</tr>

        <tr>
			<th>Expected quantity</th>
			<td>{formatAmount(trade.planned_quantity)} {trade.pair.quote.token_symbol}</td>
		</tr>

    </table>

	<h2>Blockchain transactions</h2>


	<table class="table">
        <thead>
            <tr>
                <th>Chain</th>
                <th>Transaction hash</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
			{#each trade.blockchain_transactions as tx }
				<tr>
                    <td>
                        {getChainName(tx.chain_id)}
                    </td>

                    <td>
                        <a target="_blank" rel="external" href={getBlockchainExplorerLink(tx.chain_id, tx.tx_hash)}>
                            {tx.tx_hash}
                        </a>
                    </td>

                    <td class:error={tx.status == 0} class:success={tx.status==1}>
                        {#if tx.status}
                            Succeed
                        {:else}
                            Failed: {tx.revert_reason}
                        {/if}
                    </td>
                </tr>
			{/each}
        </tbody>
    </table>

    <h2>Raw data</h2>

    <pre>{prettyJSON}</pre>

{:else}
	<p>Trade data could not be loaded at the moment. Trade data not available for trade #{tradeId}</p>
{/if}

<style>
    .error {
        color: red;
    }
</style>
