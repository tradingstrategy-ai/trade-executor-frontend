<!--
@component

Render strategy load indication message when navigating in strategy pages
- Sidebar on a desktop browser
- Overview page on a mobile browser

Also renders any load error.
-->
<script lang="ts">
	import Spinner from 'svelte-spinner';

	import { currentStrategy } from '../state/store';

	$: error = $currentStrategy.error;
	$: state = $currentStrategy.state;
</script>

<div class="strategy=load-indicator">
	{#if error}
		<div class="alert alert-danger">
			Strategy data load failed: {error}. See Web Developer Console for details.
		</div>
	{:else if !state}
		<div class="alert alert-info"><Spinner /> Loading strategy data</div>
	{/if}
</div>
