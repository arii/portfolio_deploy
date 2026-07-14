#!/usr/bin/env bash
set -e
export PATH="$(pwd)/node_modules/.bin:$PATH"

# Determine changed files, filtering out directories/submodules
if [ -z "$CHANGED_FILES" ]; then
  # Attempt to find base branch
  BASE_SHA=$(git merge-base origin/main HEAD 2>/dev/null || echo "HEAD~1")
  echo "Comparing against base: $BASE_SHA"
  FILES=$(git diff --name-only $BASE_SHA...HEAD 2>/dev/null || git diff --name-only HEAD~1 2>/dev/null || git ls-files)
  FILTERED=""
  for f in $FILES; do
    if [ -f "$f" ]; then
      if [ -z "$FILTERED" ]; then
        FILTERED="$f"
      else
        FILTERED="$FILTERED,$f"
      fi
    fi
  done
  export CHANGED_FILES="$FILTERED"
fi

# Ensure PR_NUMBER is available for scripts that need it
if [ -z "$PR_NUMBER" ] && [[ "$GITHUB_REF" == refs/pull/* ]]; then
  export PR_NUMBER=$(echo "$GITHUB_REF" | awk -F'/' '{print $3}')
fi

echo "Running: pnpm exec tsx $@"
pnpm exec tsx "$@"
