<script lang="ts">
	import { portfolio, stats } from '$lib/state/store';
	import PositionList from '../../../../lib/strategy/PositionList.svelte';

	$: closedPositions = $portfolio?.closed_positions;
</script>

<h1>Closed positions</h1>

<PositionList positions={closedPositions} columns={{ closed_at: true }} stats={$stats} />
