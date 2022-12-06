<!--
@component

Render listing of all configured strategies and their runtime state.
-->
<script lang="ts">
	import type { StrategyRuntimeState } from './runtimeState';
	import StrategySummaryCard from './StrategySummaryCard.svelte';

	export let strategies: StrategyRuntimeState[];

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
