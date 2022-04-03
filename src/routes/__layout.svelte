<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<header>
    <div class="container">
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">Trade executor demo</a>
        </nav>
    </div>
</header>

<main>
	<slot />
</main>

<footer>
	<p class="text-center">See <a href="https://kit.svelte.dev">Github repository</a></p>
</footer>
