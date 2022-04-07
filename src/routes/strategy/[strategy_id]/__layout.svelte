<script lang="ts">
	import { page } from '$app/stores';

	import StrategySideMenu from '../../../lib/strategy/StrategyMenu.svelte';
	import StrategyHeader from '../../../lib/strategy/StrategyHeader.svelte';

	const strategyId = $page.params.strategy_id;
</script>

<div class="container">
	<div class="row">
		<div class="col-md-12">
			<StrategyHeader />
		</div>
	</div>
	<div class="row">
		<div class="col-md-3">
			<StrategySideMenu />
		</div>
		<div class="col-md-9">
			<slot />
		</div>
	</div>
</div>
