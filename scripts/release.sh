#!/bin/bash
#
# Release the package with npm
# https://github.com/tradingstrategy-ai/trade-executor-frontend/pull/1
#
npm version patch
git push
git push --tags