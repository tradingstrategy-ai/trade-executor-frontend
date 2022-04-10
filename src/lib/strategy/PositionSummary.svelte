<!--
@component

Renders one position in a summary list.

Usage:

    <PositionSummary position={position} />
-->
<script lang="ts">
	export let id;
	export let position;
</script>

<tr class="position-summary">
	<td>{id}</td>
</tr>
