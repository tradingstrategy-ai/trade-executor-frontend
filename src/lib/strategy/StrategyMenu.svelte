<!--
@component

Display strategy menu in
- Sidebar on a desktop browser
- Overview page on a mobile browser

-->
<script lang="ts">
	let frozenPositions = false;
</script>

<ul class="nav flex-column">
	<li class="nav-item">
		<a class="nav-link" href="#">Overview</a>
	</li>

	<li class="nav-item">
		<a class="nav-link" href="#">Performance</a>
	</li>

	<li class="nav-item">
		<a class="nav-link" href="#">Open positions</a>
	</li>

	{#if frozenPositions}
		<li class="nav-item">
			<a class="nav-link" href="#">Frozen positiosn</a>
		</li>
	{/if}

	<li class="nav-item">
		<a class="nav-link" href="#">Closed positions</a>
	</li>

	<li class="nav-item">
		<a class="nav-link" href="#">Diagnostics</a>
	</li>

	<li class="nav-item">
		<a class="nav-link" href="#">Logs</a>
	</li>

	<li class="nav-item">
		<a class="nav-link" href="#">Strategy source</a>
	</li>
</ul>
