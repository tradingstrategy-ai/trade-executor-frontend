# Trade executor user interface

**This package is still in alpha.**

[Web Frontend for trading strategy executor](https://github.com/tradingstrategy-ai/trade-executor).

- This is a [SvelteKit](https://kit.svelte.dev/) based frontend library
- Display active trading strategies
- Display open/closed trading position
- Show profitability metrics like profit and loss, trades won
- Explore trades

# Features

- Uses Bootstrap 4 for the layout (to be compatible with [Trading Strategy frontend](https://github.com/tradingstrategy-ai/frontend))

# Requirements

- Node.js 16+ ([Array.at() used](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at))

# Running

The package comes with a demo site with its `.env` configuration file.
To get started with development do:

```
# Edit .env to point the environment to your trade executor instance
npm run dev
```

# Architecture

- `src/lib` contains reusable Svelte components to render trading strategy execution
- `src/routes` contains the default SvelteKit application pages. It needs to be copy-pasted to the parent project as is.
  This code is minimal and most of the code is in reusable components.

# Development

## Helpful links

- [Documenting Svelte components](https://svelte.dev/faq#how-do-i-document-my-components)

- [Rich Harris on creating SvelteKit libraries](https://www.youtube.com/watch?v=qD6Pmp45sO4&t=30s)

## Workflow to update routes

[SvelteKit does not support route re-use at the moment](https://stackoverflow.com/questions/71728342/creating-sveltekit-library-with-reusable-routes).
To update routes in the main application:

- Update routes in `trade-executor-frontend`
- Copy-paste `routes/strategy` to `frontend` package
- Update `frontend/package.json` with all dependencies needed to run `trade-executor-frontend`

## Updating strategy executor data

Each strategy executor is its own web server, with own domain.

The executor frontend must have id, name and URL configured for each executor.

For the demo app you can update URLs like this:

```shell
# Edit scripts/demo.env
source scripts/demo.env
echo $VITE_PUBLIC_STRATEGIES
# Edit .env
```

## Tag & Pubish Package

To make a new release, update the version number and create a tag:

```shell
npm version [major | minor | patch]
git push
git push --tags
```

Pushing the tag will trigger the `publish.yml` GitHub action to run, which automatically
packages and publishes the new version to the GitHub package registry.
