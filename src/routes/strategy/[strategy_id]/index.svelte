<script context="module">
    import {getConfiguredStrategyById} from "$lib/strategy/configuration";

    /**
     * Display chain information and indexing status
     */
    export async function load({ url, params, fetch }) {
        const strategyId = params.strategy_id;

        const strategyConfig = getConfiguredStrategyById(strategyId);

        let strategyState = null;
        if(strategyConfig) {
            const url = `${strategyConfig.url}/state`;
            const resp = await fetch(url);
            if (!resp.ok) {
                console.error("Failed to load", url, resp);
                return {
                    status: resp.status,
                    error: new Error(
                        `Could not load strategy state: ${url}. See console for details.`
                    )
                }
            }
            strategyState = await resp.json();
        } else {
            strategyState = null;
        }

        return {
            props: {
                strategyConfig,
                strategyState
            }
        };
    }
</script>

<script lang="ts">
	import StrategyMenu from '$lib/strategy/StrategyMenu.svelte';
    export let strategyState;
</script>

<h1>Hello world</h1>

<div class="strategy-menu-mobile">
	<StrategyMenu />
</div>

<div>
    {{strategyState}}
</div>

<style>
	.strategy-menu-mobile {
		display: none;
	}

	@media (max-width: 992px) {
		.strategy-menu-mobile {
			display: block;
		}
	}
</style>
