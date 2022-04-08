<!--
@component

Display strategy title or id while loading in the strategy layout.
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { currentStrategy } from './store.ts';

	const strategyId = $page.params.strategy_id;

    $: name = $currentStrategy.name;
</script>

<h1>
    { name }
</h1>
