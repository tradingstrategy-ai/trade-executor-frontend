<script lang="ts">
	import { portfolio, stats } from '$lib/state/store';
	import PositionList from '$lib/strategy/PositionList.svelte';

	$: frozenPositions = $portfolio?.frozen_positions;
</script>

<PositionList
	positions={frozenPositions}
	stats={$stats}
	columns={{ opened_at: true }}
	settings={{ blocks: { searchInput: false, paginationButtons: false, paginationRowCount: false } }}
/>
