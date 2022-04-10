<script lang="ts">
	import StrategyMenu from '$lib/strategy/StrategyMenu.svelte';
	import { portfolio } from '$lib/strategy/store';
	import PositionList from '$lib/strategy/PositionList.svelte';

	$: openPositions = $portfolio?.open_positions;
</script>

<h1>Open positions</h1>

<PositionList positions={openPositions} />
