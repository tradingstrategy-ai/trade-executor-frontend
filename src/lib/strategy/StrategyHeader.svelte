<!--
@component

Display strategy title or id while loading in the strategy layout.
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { currentStrategy } from '../state/store';
	import { parseStrategyPath } from './path';

	const strategyId = $page.params.strategy_id;

	$: strategyNavigationInfo = parseStrategyPath($currentStrategy, $page);
</script>

<h1>
	{#if strategyNavigationInfo.tradeId}
		Trade #{strategyNavigationInfo.tradeId}
	{:else if strategyNavigationInfo.positionId}
		Position #{strategyNavigationInfo.positionId}
	{:else if strategyNavigationInfo.pageName}
		{strategyNavigationInfo.pageName}
	{:else}
		{strategyNavigationInfo.strategyName}
	{/if}
</h1>
