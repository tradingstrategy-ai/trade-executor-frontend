<script lang="ts">
	import { portfolio, stats } from '$lib/state/store';
	import PositionList from '$lib/strategy/PositionList.svelte';

	$: openPositions = $portfolio?.open_positions;
</script>

<PositionList
	positions={openPositions}
	stats={$stats}
	columns={{ opened_at: true }}
	pagination={false}
/>
