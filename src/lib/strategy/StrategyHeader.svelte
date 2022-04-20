<!--
@component

Display strategy title or id while loading in the strategy layout.
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { currentStrategy } from '../state/store.ts';
	import { parseStrategyPath } from './path';

	const strategyId = $page.params.strategy_id;

	$: strategyNavigationInfo = parseStrategyPath($currentStrategy, $page);
</script>

<h1>
	{#if strategyNavigationInfo.pageName}
		{strategyNavigationInfo.pageName}
	{:else}
		{strategyNavigationInfo.strategyName}
	{/if}
</h1>
