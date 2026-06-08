#!/usr/bin/env bash
# Pre-commit gate for port batches — enforces peel moratorium (see c-to-js-port-strategy.md).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail=0

warn() { printf 'port-batch-gate: WARNING: %s\n' "$*" >&2; }
die() { printf 'port-batch-gate: FAIL: %s\n' "$*" >&2; fail=1; }

# Diff scope: staged js, or working tree js if nothing staged
if git diff --cached --quiet -- js 2>/dev/null; then
    DIFF_FILES=$(git diff --name-only -- js 2>/dev/null || true)
    DIFF_CMD=(git diff -- js)
else
    DIFF_FILES=$(git diff --cached --name-only -- js 2>/dev/null || true)
    DIFF_CMD=(git diff --cached -- js)
fi

if [[ -z "$DIFF_FILES" ]]; then
    printf 'port-batch-gate: no js/ changes — skip peel checks\n'
    exit 0
fi

ADDED=$("${DIFF_CMD[@]}" 2>/dev/null | grep -E '^\+' | grep -v '^\+\+\+' || true)

# Moratorium: no new numbered comma-U peels beyond TwentyFourth / ordinal > 24
if echo "$ADDED" | grep -qE '_wizD1CommaPost(TwentyFifth|TwentySixth|TwentySeventh|TwentyEighth|TwentyNinth|Thirtieth|[0-9]{2,})'; then
    die 'new _wizD1CommaPostTwentyFifth+ (or high ordinal) peel — forbidden; see c-to-js-port-strategy.md §5'
fi

# Warn on any NEW PostTwenty* addition (TwentyFourth already at ceiling — prefer deletion)
if echo "$ADDED" | grep -qE '_wizD1CommaPostTwenty'; then
    if echo "$ADDED" | grep -qE '_wizD1CommaPostTwentyFourth'; then
        warn 'touching PostTwentyFourth — ensure batch deletes older peel or ports C; no TwentyFifth+'
    else
        die 'new _wizD1CommaPostTwenty* peel flag — moratorium; port C movemon or delete a peel band'
    fi
fi

# Warn if many new PendingLikeC without oracle/debt doc updates
NEW_PENDING=$(echo "$ADDED" | grep -cE '_\w+PendingLikeC' || true)
if [[ "$NEW_PENDING" -gt 2 ]]; then
    MOVED=$(echo "$DIFF_FILES" | grep -E 'c-oracles/|c-to-js-port-harness-debt' || true)
    if [[ -z "$MOVED" ]]; then
        die "added $NEW_PENDING PendingLikeC lines without c-oracles/ or harness-debt update"
    fi
fi

if [[ "$fail" -ne 0 ]]; then
    printf '\nSee .cursor/reports/c-to-js-port-strategy.md and tools/port-batch-gate.sh\n'
    exit 1
fi

printf 'port-batch-gate: OK\n'
exit 0
