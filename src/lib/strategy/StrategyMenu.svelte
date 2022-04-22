<!--
@component

Display strategy menu in
- Sidebar on a desktop browser
- Overview page on a mobile browser

-->
<script lang="ts">
	import { currentStrategy, portfolio } from '../state/store';
	import SummaryCount from './SummaryCount.svelte';
	import { parseStrategyPath } from './path';
	import { page } from '$app/stores';

	// Needed to get strategy root URL
	$: baseUrl = parseStrategyPath($currentStrategy, $page).baseUrl;

	// Get summary counts for the menu.
	// These will evaluate to int or null depending if the strategy has kind of positions
	$: openPositions = Object.keys($portfolio?.open_positions || {}).length;
	$: frozenPositions = Object.keys($portfolio?.frozen_positions || {}).length;
	$: closedPositions = Object.keys($portfolio?.closed_positions || {}).length;
</script>

<div class="card shadow-soft">
	<ul class="nav flex-column">
		<li class="nav-item">
			<a class="nav-link" href={baseUrl}>Overview</a>
		</li>

		<!--

		<li class="nav-item">
			<a class="nav-link" href={baseUrl}>Performance</a>
		</li>

		-->

		<li class="nav-item">
			<a class="nav-link" href="{baseUrl}/open-positions">
				Open positions
				<SummaryCount count={openPositions} />
			</a>
		</li>

		{#if frozenPositions > 0}
			<li class="nav-item">
				<a class="nav-link" href="{baseUrl}/frozen-positions">
					Frozen positions
					<SummaryCount count={frozenPositions} />
				</a>
			</li>
		{/if}

		{#if closedPositions > 0}
			<li class="nav-item">
				<a class="nav-link" href="{baseUrl}/closed-positions"
					>Closed positions
					<SummaryCount count={closedPositions} />
				</a>
			</li>
		{/if}

		<!--

		<li class="nav-item">
			<a class="nav-link" href="#">Deposits and withdraws</a>
		</li>

		<li class="nav-item">
			<a class="nav-link" href="#">Strategy source</a>
		</li>

		<li class="nav-item">
			<a class="nav-link" href="#">System metrics</a>
		</li>

		<li class="nav-item">
			<a class="nav-link" href="#">Logs</a>
		</li>

		-->
	</ul>
</div>
