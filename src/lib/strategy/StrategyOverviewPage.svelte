<!--
@component

Strategy overview page content

-->
<script lang="ts">
	import StrategyMenu from 'trade-executor-frontend/strategy/StrategyMenu.svelte';
	import AssetOverviewCard from 'trade-executor-frontend/strategy/AssetOverviewCard.svelte';
	import PerformanceOverviewCard from 'trade-executor-frontend/strategy/PerformanceOverviewCard.svelte';
	import type { StrategyMetadata } from './metadata';

	export let metadata: StrategyMetadata;
</script>

{#if metadata}
	<p class="lead">{@html metadata.long_description}</p>
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
