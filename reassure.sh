#!/usr/bin/env bash
set -e

BASELINE_BRANCH=${GITHUB_BASE_REF:="master"}

# Required for `git switch` on CI
git fetch origin

# Gather baseline perf measurements
git switch "$BASELINE_BRANCH"
pnpm install
pnpm reassure --baseline

# Gather current perf measurements & compare results
git switch --detach -
pnpm install
pnpm reassure

git switch -
