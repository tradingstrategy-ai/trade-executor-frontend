<!--
@component

Display strategy execution overview information as Bootstrap 4 card..
-->
<script type="ts">
	import { currentStrategy } from '../state/store';
	import { getPortfolioLatestStats } from '../state/stats';
	import { formatDollar } from '../helpers/formatters';
	import { determineProfitColourClass } from '../helpers/profit';
	import StrategyOverviewCard from './StrategyCard.svelte';

	// See https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/statistics.py#L67
	$: portfolioStats = getPortfolioLatestStats($currentStrategy.state);

	$: profit =
		(portfolioStats && portfolioStats.unrealised_profit_usd + portfolioStats.realised_profit_usd) ||
		0;
	$: profitCssClass = determineProfitColourClass(profit);
</script>

{#if portfolioStats}
	<div class="overview-details">
		<StrategyOverviewCard>
			<div class="card-header">Performance</div>

			<ul class="list-group list-group-flush">
				<li class="list-group-item">
					Current profit:
					<span class={determineProfitColourClass(profit)}>
						{formatDollar(profit)}
					</span>
				</li>
			</ul>

			<ul class="list-group list-group-flush">
				<li class="list-group-item">
					Unrealised profit:
					<span class={determineProfitColourClass(portfolioStats.unrealised_profit_usd)}>
						{formatDollar(portfolioStats.unrealised_profit_usd)}
					</span>
				</li>
			</ul>

			<ul class="list-group list-group-flush">
				<span>
					<li class="list-group-item">
						Realised profit:
						<span class={determineProfitColourClass(portfolioStats.realised_profit_usd)}>
							{formatDollar(portfolioStats.realised_profit_usd)}
						</span>
					</li>
				</span>
			</ul>
		</StrategyOverviewCard>
	</div>
{:else}
	<!-- <p>Stats not available.</p> -->
{/if}
