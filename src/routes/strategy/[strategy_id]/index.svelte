<script>
    import StrategyMenu from "$lib/strategy/StrategyMenu.svelte";
</script>

<h1>Hello world</h1>

<div class="strategy-menu-mobile">
    <StrategyMenu />
</div>

<style>

    .strategy-menu-mobile {
        display: none;
    }

    @media(max-width: 992px) {
        .strategy-menu-mobile {
            display: block;
        }
    }
</style>