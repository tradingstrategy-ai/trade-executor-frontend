<!--
@component

Display strategy execution overview information as Bootstrap 4 card..
-->
<script type="ts">
	import { currentStrategy } from './store';
	import { getPortfolioLatestStats } from './stats';
	import { formatDollar } from '$lib/helpers/formatters';
    import {formatUnixTimestamp} from "../helpers/formatters";

	// See https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/statistics.py#L67
	$: portfolioStats = getPortfolioLatestStats($currentStrategy.state);

</script>

{#if portfolioStats}
	<div class="overview-details">
		<div class="card">
			<div class="card-header">Strategy performance overview</div>
			<ul class="list-group list-group-flush">
				<li class="list-group-item">Total equity: {formatDollar(portfolioStats.total_equity)}</li>
				<li class="list-group-item">
					Data updated: {formatUnixTimestamp(portfolioStats.calculated_at)}
				</li>
			</ul>
		</div>
	</div>
{:else}
	<p>Stats not available.</p>
{/if}
