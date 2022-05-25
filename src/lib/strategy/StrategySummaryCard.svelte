<!--
@component

Renders a strategy overview in strategy listing using Bootstrap 4 horizontal cards.

Related Bootstrap example: https://getbootstrap.com/docs/4.3/components/card/#horizontal
-->
<script lang="ts">
	import { goto } from '$app/navigation';

	import type { StrategyMetadata } from './metadata';

	export let strategy: StrategyMetadata;

	function handleClick(e) {

        if(strategy.error) {
            return;
        }

		goto(strategy.link);
	}
</script>

<div class="card shadow-soft border-light mb-3" style="max-width: 540px;" on:click={handleClick} class:error={strategy.error}>
	<div class="row no-gutters">
		<div class="col-md-4 col-left" style={`background-image: url(${strategy.icon_url})`}>
			<!-- Image styles here using background CSS -->
		</div>
		<div class="col-md-8">
			<div class="card-body">
				<h5 class="card-title">{strategy.name}</h5>
                {#if strategy.error}
                    <p class="text-danger">Data not available currently.</p>

                    <p class="text-danger">Strategy executor not running.</p>
                {:else}
                    <p class="card-text">{strategy.short_description}</p>
                    <a class="card-link btn btn-sm" href={strategy.link}>View details</a>
                {/if}
			</div>
		</div>
	</div>
</div>

<style>
    /* Hint the user cards are clickable */
	.card:not(.error) {
		cursor: pointer;
	}

	.col-left {
		background-size: cover;
        min-height: 180px; /* Must be good enough for all images */
	}

	.btn {
		float: right;
		display: block;
		margin: 0 1.5em 1.5em 0;
	}
</style>
