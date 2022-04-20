<!--
@component

Display strategy execution overview information as Bootstrap 4 card..
-->
<script type="ts">
	import { currentStrategy } from '../state/store';
	import { getPortfolioLatestStats } from '../state/stats';
	import { formatDollar } from '$lib/helpers/formatters';
	import { determineProfitColourClass } from '../helpers/profit';

	// See https://github.com/tradingstrategy-ai/trade-executor/blob/master/tradeexecutor/state/statistics.py#L67
	$: portfolioStats = getPortfolioLatestStats($currentStrategy.state);

	$: profit =
		(portfolioStats && portfolioStats.unrealised_profit_usd + portfolioStats.realised_profit_usd) ||
		0;
	$: profitCssClass = determineProfitColourClass(profit);
</script>

{#if portfolioStats}
	<div class="overview-details">
		<div class="card">
			<div class="card-header">Performance overview</div>

			<ul class="list-group list-group-flush">
				<li class="list-group-item">
					Current profit:
					<span class={determineProfitColourClass(profit)}>
						{formatDollar(profit)}
					</span>
				</li>
			</ul>

			<ul class="list-group list-group-flush">
				<span class={determineProfitColourClass(portfolioStats.unrealised_profit_usd)}>
					<li class="list-group-item">
						Unrealised profit: {formatDollar(portfolioStats.unrealised_profit_usd)}
					</li>
				</span>
			</ul>

			<ul class="list-group list-group-flush">
				<span class={determineProfitColourClass(portfolioStats.realised_profit_usd)}>
					<li class="list-group-item">
						Realised profit: {formatDollar(portfolioStats.realised_profit_usd)}
					</li>
				</span>
			</ul>
		</div>
	</div>
{:else}
	<p>Stats not available.</p>
{/if}
