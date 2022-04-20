<!--
@component

Display strategy execution overview information as Bootstrap 4 card..
-->
<script type="ts">
	import { currentStrategy } from '../state/store';
	import { getPortfolioLatestStats } from '../state/stats';
	import { formatDollar } from '$lib/helpers/formatters';
	import TimeAgo from '$lib/time/TimeAgo.svelte';

	// See https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/statistics.py#L67
	$: portfolioStats = getPortfolioLatestStats($currentStrategy.state);
</script>

{#if portfolioStats}
	<div class="overview-details">
		<div class="card">
			<div class="card-header">Asset holding overview</div>
			<ul class="list-group list-group-flush">
				<li class="list-group-item">Total equity: {formatDollar(portfolioStats.total_equity)}</li>
				<li class="list-group-item">Cash: {formatDollar(portfolioStats.free_cash)}</li>
				<li class="list-group-item">
					Portfolio last valued at: <TimeAgo time={portfolioStats.calculated_at} />
				</li>
			</ul>
		</div>
	</div>
{:else}
	<p>Stats not available.</p>
{/if}
