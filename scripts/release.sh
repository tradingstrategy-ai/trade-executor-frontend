#!/bin/bash
#
# Manually create the package with npm
# https://github.com/tradingstrategy-ai/trade-executor-frontend/pull/1
# https://github.com/tradingstrategy-ai/frontend/pull/117
#
npm version patch
git push
git push --tags
