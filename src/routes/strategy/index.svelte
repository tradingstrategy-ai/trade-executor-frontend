<script context="module">
	import {getConfiguredStrategies} from "$lib/strategy/configuration";

    export async function load() {
		let strategies = getConfiguredStrategies();

        console.log(strategies);

        return {
            props: {
                strategies,
            }
        };
	}


</script>

<script lang="ts">
    export let strategies;
</script>

{#if strategies.length > 0}
	<h1>Available strategies</h1>

    {#each strategies as strategy}
        <p>
            <a href="/strategy/{strategy.id}">{strategy.name}</a>
        </p>
    {/each}

{:else}
	<p>No strategies configured</p>
{/if}
