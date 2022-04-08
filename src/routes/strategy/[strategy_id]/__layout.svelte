<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { loadStrategyById } from '$lib/strategy/store';

	import StrategyHeader from '$lib/strategy/StrategyHeader.svelte';
	import StrategyLoadIndicator from '$lib/strategy/StrategyLoadIndicator.svelte';
    import StrategyMenu from "$lib/strategy/StrategyMenu.svelte";

	const strategyId = $page.params.strategy_id;

	// All pages within this layout refer to the same strategy.
	// Toggle its load as soon as layout mounts.
	onMount(async () => {
		await loadStrategyById(strategyId);
	});
</script>

<div class="container">
	<div class="row">
		<div class="col-md-12">
			<StrategyHeader />
		</div>
	</div>
	<div class="row">
		<div class="col-md-3">
			<StrategyMenu />
		</div>
		<div class="col-md-9">
			<StrategyLoadIndicator />
			<slot />
		</div>
	</div>
</div>
