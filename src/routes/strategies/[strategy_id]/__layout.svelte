<script lang="ts">
    import StrategySideMenu from "$lib/strategy/StrategySideMenu.svelte";
</script>

<div class="container">
	<div class="row">
		<div class="col-md-3">
            <StrategySideMenu />
        </div>
        <div class="col-md-9">
            <slot />
        </div>
	</div>
</div>
