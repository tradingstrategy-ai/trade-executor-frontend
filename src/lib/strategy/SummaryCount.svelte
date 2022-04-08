<!--
@component

Display count in parenthesis if loaded

Not loaded (null):

- Open positions

Loaded:

- Open positions (3)
-->
<script lang="ts">
	export let count: number;
</script>

{#if count}
	<span class="summary-count">({ count })</span>
{/if}
