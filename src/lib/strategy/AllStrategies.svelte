<!--
@component

Renders a strategy overview in strategy listing.

Related Bootstrap example: https://getbootstrap.com/docs/4.3/components/card/#horizontal
-->
<script lang="ts">
    import { goto } from '$app/navigation';

	import type { StrategyMetadata } from './metadata';

	export let strategy: StrategyMetadata;

    function handleClick(e) {
        goto(strategy.link);
    }
</script>

<div class="card shadow-soft border-light mb-3" style="max-width: 540px;" on:click={handleClick}>
	<div class="row no-gutters">
		<div class="col-md-4 col-left" style={`background-image: url(${strategy.icon_url})`}>
			<!-- Image styles here using background CSS -->
		</div>
		<div class="col-md-8">
			<div class="card-body">
				<h5 class="card-title">{strategy.name}</h5>
				<p class="card-text">{strategy.short_description}.</p>
                <a class="card-link btn btn-sm" href={strategy.link}>View details</a>
			</div>
		</div>
	</div>
</div>


<style>
    .card {
        cursor: pointer;
    }

    .col-left {
        background-size: cover;
    }

    .btn {
        float: right;
        display: block;
        margin: 0 1.5em 1.5em 0;
    }

</style>