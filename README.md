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

## Release

To make a new release…

### Update version number tag

```shell
npm version [major | minor | patch]
npm push
npm push --tags
```

### Publish package to GitHub package registry

**TODO:** add a GitHub action to automatically package and publish a release
when a new tag is pushed.

In order to publish the package, you'll need to log into the GitHub package
registry using a Personal Access Token (PAT). Follow the instructions outlined
[here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token)

```shell
npm login --scope-@tradingstrategy-ai --registry=https://npm.pkg.github.com

> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

You should only need to do this once (until your PAT expires). Once you're
authenticated, you can publish the new package:

```
npm run package
(cd package && npm publish)
```
