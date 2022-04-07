<!--
@component

Display strategy title or id while loading in the strategy layout.
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { currentStrategyName } from './store.ts';

	const strategyId = $page.params.strategy_id;
</script>

<h1>
	{#if currentStrategyName}
		{currentStrategyName}
	{:else}
		{strategyId} (loading)
	{/if}
</h1>
