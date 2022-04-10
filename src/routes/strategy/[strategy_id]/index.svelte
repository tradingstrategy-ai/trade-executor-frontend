<script lang="ts">
	import StrategyMenu from '$lib/strategy/StrategyMenu.svelte';
	import Overview from '../../../lib/strategy/AssetOverview.svelte';
</script>

<Overview />

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
</style>
