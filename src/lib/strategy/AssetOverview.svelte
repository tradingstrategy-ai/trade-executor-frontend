<!--
@component

Display strategy execution overview information as Bootstrap 4 card..
-->
<script type="ts">
	import { currentStrategy } from '../state/store';
	import { getPortfolioLatestStats } from '../state/stats';
	import { formatDollar } from '../helpers/formatters';
	import TimeAgo from '../time/TimeAgo.svelte';
    import StrategyOverviewCard from "./StrategyOverviewCard.svelte";

	// See https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/statistics.py#L67
	$: portfolioStats = getPortfolioLatestStats($currentStrategy.state);
</script>

{#if portfolioStats}
	<div class="overview-details">
		<StrategyOverviewCard>
			<div class="card-header">Current assets</div>
			<ul class="list-group list-group-flush">
				<li class="list-group-item">
                    Value in trading positions: <strong>{formatDollar(portfolioStats.total_equity)}</strong>
                </li>
				<li class="list-group-item">
                    Cash:
                    <strong>{formatDollar(portfolioStats.free_cash)}</strong>
                </li>
				<li class="list-group-item">
					Last valuation:
                    <strong>
                        <TimeAgo time={portfolioStats.calculated_at} />
                    </strong>
				</li>
			</ul>
		</StrategyOverviewCard>
	</div>
{:else}
	<!-- <p>Stats not available.</p> -->
{/if}
