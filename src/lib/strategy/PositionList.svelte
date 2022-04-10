<!--
@component

Renders a summary list of trading positions.

Used for

- Open positions
- Closed positions
- Frozen positions

Usage:

    <PositionList positions={positions} />
-->
<script lang="ts">
	import PositionSummary from './PositionSummary.svelte';

	export let positions = null;
</script>

{#if positions}
	<table class="table table-striped table-mobile-responsive">
		<thead>
			<tr>
				<th>#</th>
				<th>Profit</th>
				<th>Opened at</th>
				<th>Closed at</th>
				<th>Duration</th>
				<th>Trades</th>
			</tr>
		</thead>
		{#each Object.entries(positions) as [id, position]}
			<PositionSummary {id} {position} />
		{/each}
	</table>
{:else}
	<p>No positions.</p>
{/if}
