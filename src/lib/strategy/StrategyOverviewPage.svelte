<!--
@component

Strategy overview page content

-->
<script lang="ts">
	import StrategyMenu from './StrategyMenu.svelte';
	import AssetOverviewCard from './AssetOverviewCard.svelte';
	import PerformanceOverviewCard from './PerformanceOverviewCard.svelte';
	import type { StrategyRuntimeState } from './runtimeState';

	export let strategy: StrategyRuntimeState;
</script>

{#if strategy}
	<p class="lead">{@html strategy.long_description}</p>
{/if}

<div class="strategy-menu-mobile">
	<StrategyMenu />
</div>

<div class="overview-card-wrapper">
	<AssetOverviewCard />
</div>

<div class="overview-card-wrapper">
	<PerformanceOverviewCard />
</div>

<style>
	.strategy-menu-mobile {
		display: none;
	}

	@media (max-width: 992px) {
		.strategy-menu-mobile {
			display: block;
		}
	}

	.overview-card-wrapper {
		margin-bottom: 20px;
	}
</style>
