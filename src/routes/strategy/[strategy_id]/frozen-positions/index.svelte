<script lang="ts">
	import { portfolio, stats } from '$lib/state/store';
	import PositionList from '$lib/strategy/PositionList.svelte';

	$: frozenPositions = $portfolio?.frozen_positions;
</script>

<div class="alert alert-info">
	Frozen positions could not be automatically open or closed,
	usually due to a problem with related tokens or blockchains. These positions may need manual
	intervention.
</div>

<PositionList
	positions={frozenPositions}
	stats={$stats}
	columns={{ opened_at: true }}
    pagination={false}
/>
