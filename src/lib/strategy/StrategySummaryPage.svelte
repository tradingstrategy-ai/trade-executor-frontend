<!--
@component

Render listing of all configured strategies and their metadata.
-->
<script lang="ts">
	import type { StrategyMetadata } from './metadata';
	import StrategySummaryCard from './StrategySummaryCard.svelte';

	export let strategies: StrategyMetadata[];

	console.log(strategies);
</script>

<div class="container">
	{#if strategies.length > 0}
		<h1>Trading strategies</h1>

		<p>Currently available strategies.</p>

		<div class="card-deck">
			{#each strategies as strategy}
				<StrategySummaryCard {strategy} />
			{/each}
		</div>
	{:else}
		<p>No strategies configured</p>
	{/if}
</div>
