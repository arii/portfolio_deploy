#!/usr/bin/env bash
set -e
export PATH="$(pwd)/node_modules/.bin:$PATH"

# Determine changed files, filtering out directories/submodules
if [ -z "$CHANGED_FILES" ]; then
  # Attempt to find base branch
  # Use origin/main as primary base, fallback to main, then HEAD~1
  BASE_SHA=$(git merge-base origin/main HEAD 2>/dev/null || git merge-base main HEAD 2>/dev/null || echo "HEAD~1")
  echo "Comparing against base: $BASE_SHA"

  # Get all changed files between base and current
  FILES=$(git diff --name-only $BASE_SHA...HEAD 2>/dev/null || git diff --name-only HEAD~1 2>/dev/null || git ls-files)

  FILTERED=""
  for f in $FILES; do
    # Skip directories (like submodules) and ensure it's a regular file
    if [ -f "$f" ] && [ ! -d "$f" ]; then
      if [ -z "$FILTERED" ]; then
        FILTERED="$f"
      else
        FILTERED="$FILTERED,$f"
      fi
    fi
  done
  export CHANGED_FILES="$FILTERED"
fi

echo "CHANGED_FILES: $CHANGED_FILES"

# Ensure PR_NUMBER is available for scripts that need it
if [ -z "$PR_NUMBER" ] && [[ "$GITHUB_REF" == refs/pull/* ]]; then
  export PR_NUMBER=$(echo "$GITHUB_REF" | awk -F'/' '{print $3}')
fi

echo "Running: pnpm exec tsx $@"
pnpm exec tsx "$@"
