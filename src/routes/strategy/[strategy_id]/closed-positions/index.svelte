<script lang="ts">
	import StrategyMenu from '../../../../lib/strategy/StrategyMenu.svelte';
	import { portfolio } from '../../../../lib/state/store';
	import PositionList from '../../../../lib/strategy/PositionList.svelte';

	$: closedPositions = $portfolio?.closed_positions;
</script>

<h1>Closed positions</h1>

<PositionList positions={closedPositions} />
