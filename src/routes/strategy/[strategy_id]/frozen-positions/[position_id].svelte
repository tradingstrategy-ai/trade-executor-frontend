<script lang="ts">
	import PositionDetails from '$lib/strategy/PositionDetails.svelte';
	import { PositionKind } from '$lib/state/interface';
</script>

<PositionDetails positionKind={PositionKind.frozen} />
