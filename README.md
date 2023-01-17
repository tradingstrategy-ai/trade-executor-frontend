# Trade executor user interface

**This package is still in alpha.**

[Web API client for trading strategy executor](https://github.com/tradingstrategy-ai/trade-executor).

- This is a [SvelteKit](https://kit.svelte.dev/) based frontend library
- Load active trading strategies
- Load open/closed trading positions
- Load profitability metrics like profit and loss, trades won
- Explore trades

# Requirements

- Node.js 16.14+ or 18+ (minumum required by SvelteKit)

# Architecture

- `src/lib/strategy` contains utilities for loading configured strategies
- `src/lib/state` contains utilities for exploring strategy positions and stats
- `src/lib/helpers` contains various UI helpers for correctly rendering data

# Development

## Helpful links

- [Documenting Svelte components](https://svelte.dev/faq#how-do-i-document-my-components)
- [Rich Harris on creating SvelteKit libraries](https://www.youtube.com/watch?v=qD6Pmp45sO4&t=30s)

## Tag & Pubish Package

To make a new release, update the version number and create a tag:

```shell
npm version [major | minor | patch]
git push
git push --tags
```

Pushing the tag will trigger the `publish.yml` GitHub action to run, which automatically
packages and publishes the new version to the GitHub package registry.
