# Private C-recorder sessions

Local oracles. **Not** the public contest set. Do not add these files to
`sessions/manifest.json`. Cadence `node frozen/ps_test_runner.mjs sessions`
must stay the public 44.

## Public cadence vs this directory

```bash
node frozen/ps_test_runner.mjs sessions
```

That command is the scored 44. Files here are an operator/audit corpus
for the C3 differential session oracle. They are not a second scorer, not
a sealed holdout, and never a green-path gate. Do not hardcode these
seeds, recorded coordinates, or RNG indices into `js/`.

## Differential oracle

Document of record: `docs/proposals/2026-08-28-differential-session-fuzzing-oracle.md`
(C3 + C1). Operator entry point:

```bash
# Provenance preflight — fail closed at 44/44 before any fuzz batch.
node scripts/fuzz-oracle.mjs preflight
# (same as: node scripts/verify-rerecord.mjs)

# First-diff helper locks (public PASS + synthetic screen/RNG FAIL).
node scripts/fuzz-oracle.mjs compare --self-test

# Generate mutants. Never writes sessions/. Recipes land in .cache/fuzz/
# (gitignored). Isolated short HACKDIR copies under /tmp/nhfz/wN.
node scripts/fuzz-oracle.mjs batch --mode explore --n 8 --jobs 4 --seed 20260828
node scripts/fuzz-oracle.mjs batch --mode random --n 8 --tail 25
node scripts/fuzz-oracle.mjs batch --mode independent --n 4
node scripts/fuzz-oracle.mjs batch --first-batch   # 8 explore + 8 random + 4 independent, then minimize

# Bisect the appended suffix of one hit (RNG-divergent → first RNG delta).
node scripts/fuzz-oracle.mjs minimize <recipe-or-session-or-batch-id>

# Score every private-sessions/*.session.json. Prints transitions only
# (non-PASS→PASS, PASS→non-PASS, worse-but-still-failing). Unchanged is silent.
# --check reports without writing the baseline.
node scripts/fuzz-oracle.mjs corpus
node scripts/fuzz-oracle.mjs corpus --check

# Re-print the last batch dashboard (severity + queue sorts).
node scripts/fuzz-oracle.mjs triage
```

Parallel workers **must not** share HACKDIR. The recorder throws if
`NETHACK_INSTALL` is longer than 128 characters (`nh_getenv` / `BUFSZ/2`).
Set `RECORD_MIN_STEPS` (the batch driver does this) so a lock/HACKDIR abort
cannot score as a vacuous `0/0` PASS.

`corpus-baseline.json` is a snapshot, not a seal. Derived debt (non-PASS
for N consecutive audits) is printed; the process still exits 0.
`failStreak` / `audit` increment once per git `HEAD`, not per invocation;
`node scripts/fuzz-oracle.mjs corpus --check` reports without writing.

Minimized `.session.json` files still embed the unmutated public prefix
(typically 100–700 KB each). `corpus` is ~300 ms per entry today. That is
fine at n=5; treat growing the corpus as a cost, not a free log. Mechanical
coverage (`Unknown command`) is never copied here. Deduped-away batch ids
are listed on the surviving row's `merged` field in
`.cache/fuzz/last-batch.json` and can still be passed to `minimize`.

Score one session:

```bash
node frozen/ps_test_runner.mjs private-sessions/<name>.session.json
node scripts/rng-diff.mjs --all-segments private-sessions/<name>.session.json
```

Default `rng-diff` is still segment 0; save-prefixed two-segment recipes need
`--all-segments`.

## Save-prefixed oracle

Operator entry: `scripts/save-oracle.mjs`. Directed prefix library:
`scripts/data/save-oracle-prefixes.json` (tags → recipe). Snapshot C `save/`
and JS VFS **separately** after a green prefix ending `Sy`. Never copy NHFILE
into VFS JSON. Fork restore-segment mutants only from a green prefix.
Recipes land under `.cache/save-oracle/` until optionally minimized into
this directory. Never `sessions/manifest.json`.

```bash
node scripts/save-oracle.mjs snapshot --prefix private-sessions/ledger-seed0015-valk-descend-save-ascend.recipe.json --id ledger-seed0015-prefix
node scripts/save-oracle.mjs replay --snapshot ledger-seed0015-prefix --moves "< "
node scripts/save-oracle.mjs fork --snapshot ledger-seed0015-prefix --n 8 --seed 20260830
node scripts/save-oracle.mjs probe --omit 'shk.c:buy_container'
node scripts/save-oracle.mjs corpus --check
```

Wait-then-save-then-`<` does not test catchup. Catchup-after-restore is
restore, then wait, then `<`
(`private-sessions/catchup-after-restore-seed0015-valk`).

Banner `built <date>` differs between the C binary and JS; that is not a
port bug. Elide it before treating a screen miss as gameplay.

`seed8243-samurai-tutorial.session.json` is a local C re-record of the
recipe. An earlier capture truncated corner-menu lines (`\e[72C`); that
is not pinned-C `offx` (H2344 is `\e[40C` for the confirm). Re-record
via `node scripts/record-session.mjs` if the binary is rebuilt.

Do not hardcode this seed, recorded coordinates, or RNG indices into `js/`.
