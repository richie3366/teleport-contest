# NetHack 5.0 recorder patches

Six patch files that turn upstream NetHack 5.0 into a deterministic,
reproducible "recorder" build whose run-to-run behavior is exactly
what the JS port has to match.

| # | Patch | What it does | Why it's needed |
|---|---|---|---|
| 001 | `deterministic-runtime` | Pin date/time and RNG seed via env vars (`NETHACK_FIXED_DATETIME`, `NETHACK_SEED`) | Time-of-day affects moon phase, shopkeeper greetings, hire date — non-determinism unless pinned |
| 002 | `deterministic-qsort` | Replace `qsort` with a stable sort | Tie-breaking order in standard `qsort` varies by libc implementation |
| 003 | `rng-log-core` | Log `rn2/rnd/rne/rnz/rnl/d` calls to `NETHACK_RNGLOG` (`rn1` is a macro over logged `rn2`) | Core ISAAC64 stream |
| 004 | `rng-log-lua-context` | Tag Lua-side PRNG calls with their `<file>:<line>` source location | Lua scripts (special levels) use the same PRNG; need to know which call is which |
| 005 | `rng-display-logging` | Log the display/hallucination ISAAC64 stream to `NETHACK_RNGLOG_DISP` | Hallucination uses a separate stream so it doesn't perturb gameplay RNG |
| 006 | `nomux-capture` | Deterministic 24×80 capture, including raw output and snapshots at input boundaries | Captures exact visible state when `tty_nhgetch` blocks |

## Apply

```bash
bash ../build-recorder.sh    # one-shot: clones submodule, applies patches, builds
```

Or by hand:

```bash
git submodule update --init nethack-c/upstream
cp -r nethack-c/upstream nethack-c/recorder
cd nethack-c/recorder
for p in ../patches/*.patch; do patch -p1 < "$p"; done
# ...build per sys/unix/Makefile.unix
```

## What's NOT in here

These patches are **only what the contest needs**. They produce a
build whose externally-observable PRNG sequence and screen output
are deterministic. They do **not** add internal debugging hooks
(event_log, midlog, mapstate hashing, etc.) — those are
teleport-internal aids that would leak the porting strategy.
