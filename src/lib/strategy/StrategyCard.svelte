<!--
@component

Generic card component to be used in strategy components.

Add some Bootstrap 4 styles related to the theme.
-->
<div class="card card-strategy-overview shadow-soft">
	<slot />
</div>

<style>
	.card-strategy-overview {
		border: 0;
		margin: 2rem 0;
	}

	.card-strategy-overview :global(.card-header) {
		background: #f2dfd1;
		font-family: 'Exo 2', sans-serif;
		font-weight: 400;
		font-size: 1.25rem;
		padding: 1em;
	}
</style>
