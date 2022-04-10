<header>
	<div class="container">
		<nav class="navbar navbar-light bg-light">
			<a class="navbar-brand" href="#">Trade executor demo interface</a>
		</nav>
	</div>
</header>

<main>
	<slot />
</main>

<style>
    :global(:root) {
	    --profit-green: #458b00;
	    --profit-red: #cc0000;
        --profit-black: #000;
    }

    /**
     * Price action and candle colors
     */
    :global(.profit-green) {
        color: var(--profit-green);
    }

    :global(.profit-red) {
        color: var(--profit-red);
    }

</style>