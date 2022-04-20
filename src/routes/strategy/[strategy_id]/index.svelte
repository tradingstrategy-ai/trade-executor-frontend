<script lang="ts">
	import StrategyMenu from '$lib/strategy/StrategyMenu.svelte';
	import AssetOverview from '$lib/strategy/AssetOverview.svelte';
	import PerformanceOverview from '$lib/strategy/PerformanceOverview.svelte';
</script>

<div class="overview-card-wrapper">
    <AssetOverview />
</div>

<div class="overview-card-wrapper">
    <PerformanceOverview />
</div>

<div class="strategy-menu-mobile">
	<StrategyMenu />
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
