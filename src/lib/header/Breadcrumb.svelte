<!--
@component

Display Bootstrap 4 path bar with Google SEO support.

For Google breadcrumbs SEO metadata see

https://developers.google.com/search/docs/data-types/breadcrumbs

Test at:

https://search.google.com/structured-data/testing-tool]

Usage:

    <Breadcrumb />
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { parseStrategyPath } from '../strategy/path';
	import { currentStrategy } from '../state/store';
	import type { CurrentStrategyInfo } from '../state/store';
	import type { Page } from '@sveltejs/kit';

	// build crumbs info under /strategy route end point
	function buildCrumbs(currentStrategy: CurrentStrategyInfo, page: Page) {
		const navInfo = parseStrategyPath(currentStrategy, page);
		let crumbs = [
			{
				url: '/',
				name: 'Home'
			},

			{
				url: '/strategy',
				name: 'Strategies'
			}
		];

		if (navInfo.strategyName) {
			crumbs.push({
				url: navInfo.baseUrl,
				name: navInfo.strategyName
			});
		}

		if (navInfo.pageName) {
			crumbs.push({
				url: navInfo.pageUrl,
				name: navInfo.pageName
			});
		}

		for (let c of crumbs.slice(0, -1)) {
			c.linkActive = true;
		}

		return crumbs;
	}

	$: breadcrumbs = buildCrumbs($currentStrategy, $page);
</script>

<nav aria-label="breadcrumb breadcrumb-gray" data-test-id="breadcrumb">
	<ol class="breadcrumb breadcrumb-gray" itemscope itemtype="http://schema.org/BreadcrumbList">
		{#each breadcrumbs as breadcrumb, i}
			<li
				class="breadcrumb-item"
				itemprop="itemListElement"
				itemscope
				itemtype="http://schema.org/ListItem"
			>
				{#if breadcrumb.linkActive}
					<a itemprop="item" href={breadcrumb.url} itemtype="http://schema.org/Thing">
						<span itemprop="name">
							{breadcrumb.name}
						</span>
					</a>
				{:else}
					<span itemprop="item" href={breadcrumb.url} itemtype="http://schema.org/Thing">
						<span itemprop="name">
							{breadcrumb.name || 'Overview'}
						</span>
					</span>
				{/if}
				<meta itemprop="position" content={i + 1} />
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumb {
		box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;
		margin: 10px 0;
		padding: 12px 12px;
		background: var(--soft);
	}

	.breadcrumb-item,
	.breadcrumb-item a {
		color: #232833;
		font-weight: 300;
		font-size: 0.9rem;
	}

	.breadcrumb-item a {
		font-weight: 500;
	}

	.breadcrumb-item a:hover {
		text-decoration: underline;
	}
</style>
