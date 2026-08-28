# Review: C3 fuzz-oracle implementation

**Status:** review of an implementation of an **unadopted** proposal.
Not playbook, constitution, or runbook. Loop agents must not consume
this as a work list. Nothing here asks for a `js/` patch.

**Date:** 2026-08-28.
**Reviewer:** Claude, at operator request.
**Under review:** the working tree at `8f057c25`+ — `scripts/fuzz-oracle.mjs`,
`scripts/lib/fuzz-compare.mjs`, `scripts/data/*.json`, the
`verify-rerecord.mjs` / `record-session.mjs` diffs,
`private-sessions/` corpus + README, and plan §11.
**Spec:** proposal C3 + C1; plan §§1-10; review C1-C4 / D5-D10 / E11-E12.

**Verdict: the instrument works and the gates are real.** I
reproduced both acceptance gates independently and spot-checked the
findings against C source. Four items below are **must-fix** — one is
a silent misclassification that discards genuine findings, one is a
sampling bug, one is a configuration that inverts the instrument's
stated purpose, and one lets a minimized corpus entry claim
provenance it does not have. The rest are should-fix and nits.

Section 5 lists what I checked and found clean, so it does not get
re-audited.

---

## 0. Independently verified

Not taken from §11. Re-run here:

| Claim | My run | Verdict |
|---|---|---|
| `verify-rerecord` 44/44 | `=== 44/44 pass ===`, 8.9 s | **Confirmed** |
| annotation-only steps 3620 | `3620` | **Confirmed** |
| `fuzz-compare --self-test` OK at k=9 | `self-test OK (seed0900 PASS + screen/RNG locks at k=9)`, exit 0 | **Confirmed** |
| `corpus` prints transitions + debt, exits 0 | 5 entries, `failStreak`, exit 0 | **Confirmed** (see S5) |
| Non-goals held | `git status`: only `private-sessions/`, `scripts/`, `docs/proposals/`. No `js/`, `frozen/`, `sessions/`, `LOOP-QUEUE.md`, `agent-port-loop.sh` | **Confirmed** |
| Omit `citePattern`s resolve | all three match their `citeFile` exactly once | **Confirmed** |

Two corpus findings spot-checked against pinned C — both are real C
behaviour, not comparator artifacts:

- `The boulder won't roll diagonally on this floor.` —
  `nethack-c/upstream/src/hack.c:445`. JS says
  `With great effort you move the boulder.`
- `You have no ammunition readied.` —
  `nethack-c/upstream/src/dothrow.c:527`. JS prompts
  `What do you want to fire? [b or ?*]` — the same getobj-shaped
  family as the wear/put-on clones.

For the record, my own preflight simulation before this build was
**43/44** with 3597 annotation-only steps; the delta to 44/44 / 3620
is exactly seed5002 seg 1 going from 1 step to 286. The F1 fix is
real, not a re-labelling.

## 1. Where the implementation is better than my review

**Deviation A corrects my F1 recommendation, and I was wrong.** I
proposed "strip the level-lock/`.0` residue but preserve `save/`".
Applied literally that still deletes `record` / `xlogfile` / `logfile`
and `bon*` on later segments, which breaks chained deaths — and the
build found exactly that: **42/44**, with `seed0030` seg 1 step 123
screen mismatch and `seed5006` seg 1 at 55 vs 52 steps. Cumulative
topten and bones are load-bearing across segments in those sessions.
Locks-only is the correct rule and my version would have traded one
red session for two.

The rejection of a blanket `*.0` match is also right: playground files
are `<uid><player>.<lev>`, so `501Cleo.1` would have been missed while
unrelated `.0` names would be caught.

Two other things worth crediting rather than re-litigating: the
canonical-count loop in `firstDiff` (`fuzz-compare.mjs:209-219`) is
implemented as specified, and `emitCorpusFromBatch` filters
`!passed && bucket === 'fidelity'` so deviation D's PASS-labelling bug
could not have leaked a PASS into the corpus.

## 2. Must-fix

### M1. Coverage bucketing fires on the **C** topline, discarding real fidelity hits

`fuzz-oracle.mjs:143`:

```js
if (isCoverageText(jsLine) || isCoverageText(cLine)) {
    return { bucket: 'coverage', ... };
}
```

The agreed rule (review Q3, plan §7) is **mechanical coverage keyed on
the JS side**: `Unknown command` etc. are how *JS* announces an
unported path. C emits those strings too, for keys that are genuinely
unbound in C — `sessions/seed0030-ten-diverse-deaths` seg 5 ends with
row 0 = `Unknown command ' '.` in the canonical recording.

Failure scenario: a mutant presses a key C rejects with
`Unknown command 'X'.` and JS does something else — opens a menu,
prompts, consumes a turn. That is JS failing to reproduce C's
rejection: a fidelity bug, and a good one, because it means JS has a
binding C does not. `classify()` files it as `coverage`;
`emitCorpusFromBatch` skips coverage rows (`:610-611`); the finding is
dropped without ever reaching the corpus or the queue sort.

Fix: drop `isCoverageText(cLine)` from that test. Keep the JS-side and
`result.error` tests as they are.

### M2. Base sampling never reaches four of the twelve checked-in bases

`planMutants:479` uses `sessionBases[i % sessionBases.length]` with `i`
running `0..n-1`. With `--first-batch` (`n = 8` for both explore and
random) and 12 bases, only indices 0-7 are ever drawn, and **explore
and random draw the same eight**. Bases 8-11 —
`seed1800`, `seed2200`, `seed8000`, `seed0200` — are dead weight.

Confirmed by the shipped corpus: all five hits come from indices 2, 3,
4, 6, 7 (`seed0015`, `seed0116`, `seed0700`, `seed1150`, `seed1500`).

Fix: draw the base index from the seeded `mulberry32` stream like the
key sampling does, or offset per mode. Either keeps determinism under
`--seed`.

### M3. The base list is the shallow end of the suite, inverting the rationale for tail mutation

Tail mutation is justified in the proposal because it starts from a
state the base session already reached. That argument is only worth
anything if the base is deep. Measured over the twelve checked-in
bases against the whole suite:

| moves | RNG calls | base |
|---:|---:|---|
| 713 | 59,178 | `seed0014-dequa-fountain-explore` |
| 229 | 3,018 | `seed2200-wizard-quaff-zap-read` |
| 126 | 12,562 | `seed0116-wizard-wear-shop` |
| 97 | 4,804 | `seed0013-friday13-*` |
| 83 | 2,983 | `seed0900-tourist-explore-actions` |
| 50 | 3,230 | `seed0700-samurai-explore-descend` |
| 50 | 3,137 | `seed1150-caveman-explore-move` |
| 43 | 8,563 | `seed0015-valk-level2-pit-dog-wait` |
| 39 | 3,822 | `seed0200-monk-north-search` |
| 39 | 2,768 | `seed1500-rogue-explore-move` |
| 25 | 2,458 | `seed1800-tourist-eat-throw` |
| 22 | 3,130 | `seed8000-tourist-starter` |

Median 50 moves; eight of twelve under 100. The three deepest public
sessions are **absent**: `seed0030` (1,943 moves / 105 k RNG),
`seed4500` (1,813 / 108 k), `seed0360` (832 / 121 k). `seed0014` is
the only base in the suite's top five.

`trimTail: 12` compounds it. On `seed8000` (22 moves) that discards
55% of the prefix; on `seed1800` (25) 48%. Those mutants are not
"deep state plus a tail" — they are near-chargen plus 25-80 random
keys.

Suggestive, not controlled: the original 66-mutant experiment used
`seed0360`, `seed4500`, `seed0014`, `seed0106`, `seed0002`, `seed0007`
and ran 21/30 and 12/24 divergent; this batch ran 5 fidelity + 1
coverage out of 20. Alphabets and tail lengths differ, so treat the
ratio as a hint, not a measurement — but the direction matches the
prediction.

Fix: add `seed0030`, `seed4500`, `seed0360`, and at least one quest
tour to `fuzz-bases.json`; consider a `minMoves` floor for tail mode.
I deliberately did **not** run a corrective batch — `cmdBatch`
unconditionally overwrites `.cache/fuzz/last-batch.json` and I was not
going to clobber the first-batch record to make a point.

### M4. `minimize` can drift onto a different bug and still claim the original's provenance

`minimizeRow:668-700` bisects prefixes of the suffix, testing
`!scored.passed` over the whole session (`divergesWith:651`). Nothing
constrains the surviving divergence to be the *same* one that was
triaged. A shorter suffix can diverge for an unrelated reason and the
bisect will happily converge on it.

The note is then written from `done.scored` (`emitCorpusFromBatch:623-630`)
while `from: row.id` asserts it came from the triaged row. Silent
mislabelling of the corpus, which is the one artifact meant to survive
across audits.

Fix: after the final re-record, assert
`normTopline(done.cTopline) === normTopline(row.cTopline)` and the
same for the JS side. On mismatch either continue the search on the
longer half or emit with an explicit `drifted: true` and both topline
pairs. Deviation F notes the RNG re-bisect branch is unexercised;
the same assertion should cover it when it is.

## 3. Should-fix

**S5. `failStreak` counts `corpus` invocations, not audits.** C1
specified "non-PASS for N consecutive audits". `cmdCorpus` writes the
baseline on every run, so the counter increments per invocation. My
single review run took all five entries from `failStreak: 1` to `2`
and bumped `audit` to 2 — **disclosed here because I mutated
`private-sessions/corpus-baseline.json` by reviewing it.** Two fixes,
both cheap: key the streak on an audit identifier (audit number, or
`git rev-parse HEAD`) so repeated runs at the same commit do not
inflate it; and add a read-only `--check` mode that reports
transitions without writing, so inspection is not destructive.

**S6. `minimize`'s floor ignores prior segments.** `minimizeRow:665`
uses `prefixMoves.length + 1` for tail mutants, while batch-time uses
`expectedMinSteps()` (`:204-215`), which correctly adds prior
segments' step counts. On a multi-segment base the minimize floor is
far below the true expected count, so the vacuous guard is much weaker
in exactly the phase that writes the durable artifact. Reuse
`expectedMinSteps`. (§11.6.4 already names this; it is worth closing
rather than documenting.)

**S7. `scoreSession` can return `null` and the caller dereferences
it.** `parseRunnerStdout:73` returns `results[0] || null` when the
bundle carries an empty `results` array; `scoreAndDiff:377-393` then
reads `result.passed` and throws a `TypeError` that is not the
runner's failure. Guard with the same synthetic
`{passed:false, error}` shape used on the spawn-error path.

**S8. `independent` mode has no role diversity.** C3 said "new seed /
role / handful of keys". All four `independent` entries copy a public
`nethackrc` that pins the role: `seed8000` Tourist, `seed0030`
Tourist, `seed0398` Wizard, `seed5006` Tourist — three Tourists and a
Wizard, all human. So the mode varies seed and keys only. Since these
recipes are synthesized anyway, the rc can be synthesized too
(role/race/align across the roster, `!legacy,!splash_screen,!tutorial`
per deviation B). Without that, "independent" is the same two roles
forever, and the one mode meant to resemble held-out authorship
resembles a third of it.

**S9. Independent game seeds collapse the CLI seed to four digits.**
`gameSeed = 90000 + (seed % 10000) + i` (`:465`). `--seed 20260828`
and `--seed 20270828` produce identical game seeds. Draw the game seed
from the `mulberry32` stream instead.

**S10. Corpus size and cost are larger than C1 assumed.** The five
entries are 127-654 KB each (~1.5 MB), because a minimized session
still embeds the *entire* unmutated public prefix — the
`seed0116` entry is 654 KB for a **10-key** minimized suffix. `corpus`
over six entries took 1.9 s, i.e. ~300 ms each, not the "milliseconds
per entry" C1 assumed. Neither is fatal at n=5; at 5 per batch it is
a trajectory. Options, in increasing order of work: state the cap in
the README; gzip the `.session.json`; or store recipe-only and
re-record on demand (which costs the C binary as a dependency of the
regression check, so probably not).

**S11. The stale comment is still in the tree.**
`record-session.mjs:357-364` — "Later segments wipe locks/bones/`*.0`
only" — contradicts the shipped code, which keeps bones. §11.4-A
already flags it as stale. It should be fixed rather than recorded:
this exchange has already produced one wrong diagnosis
(`unexplored`) that came from trusting a comment about C, and this is
the same shape one layer down.

**S12. Checked, currently clean:** `isPlaygroundLock`'s
`/^\d+.+\.\d+$/` now also runs on segment 0 (it replaced
`endsWith('.0')`, widening the match). I listed the install dir:
**0 of 162 files** match, and no shipped data file begins with a
digit. No live risk. Worth a one-line comment saying the pattern is
intended to match playground `<uid><player>.<lev>` only, so a future
data file starting with a digit does not get silently deleted between
segments.

## 4. Nits

**N13.** `fuzz-omit-patterns.json`'s field is named `jsRe`, but
`classify:146-150` tests it against `cLine`, `jsLine`, and the joined
`hit`. That is necessary — the deafness omit shows up as C-says /
JS-silent, so only the C side carries the text — but the name says
otherwise, and matching C text can suppress a hit where C produced
that string for an unrelated reason. Rename to `hitRe`, or split into
`cRe` / `jsRe` and require the intended side.

**N14.** `LOCK_K = 9` is hardcoded against
`sessions/seed0900-*`. The self-test throws loudly if step 9 loses its
screen or RNG, so this is safe rather than silent — but deriving k at
runtime (first index with both a screen and ≥1 `isRngCall`, asserted
`> 0`) removes the coupling and the "step 10 had zero RNG" footnote.

**N15.** Dead code in `planMutants`: `counts` and `tails` read
`argVal(args, 'n' | 'tail', …)` and are then unconditionally
overwritten under `firstBatch` (`:441-448`); `if (modeArg === 'explore')
tails.explore = …` (`:444`) re-assigns the value it already has. Also
`--n` sets all three modes at once, which is probably not intended.

**N16.** Deduped-away mutants keep only their id in
`last-batch.json.raw`; their `sessionPath` / `recipePath` are dropped
with the row. `minimize <id>` against a merged id cannot resolve it.
Either keep a `merged: [{id, recipePath, sessionPath}]` list on the
surviving row, or say in the README that only surviving ids are
minimizable.

## 5. Checked and clean — do not re-audit

- `verify-rerecord` annotation counting: counts *steps* with a raw
  mismatch that normalizes equal; fail-closed paths return early with
  the running count. Correct.
- `firstDiff` loop bound, `jsScreens[i] || ''`, cursor comparison, and
  the early `break` once both firsts are found — matches the frozen
  runner's semantics (C1 satisfied).
- `getRngSlices()` exists (`js/jsmain.js:307`), so the per-step RNG
  path is real and not silently degrading to empty arrays.
- Copied `STARTUP_VARIANT_LINES` / `preDecode` / `cursorsEqual` are
  byte-identical to `frozen/ps_test_runner.mjs:71-76, 188-195,
  219-224`. No DEC pre-translation — the bug from my prototype is not
  reproduced here.
- Dedup key is `(normTopline C, normTopline JS)` with no triggering
  key, per D6; PASS rows bypass dedup.
- `cmdBatch` deletes `WORKER_ROOT` in its `finally` *before*
  `emitCorpusFromBatch` prepares its own install, so the two do not
  race over `/tmp/nhfz`.
- `HACKDIR_MAX` throw fires before spawn and the default install path
  is 100 chars, so it cannot misfire on the default.
- `corpus` exits 0 with non-PASS rows present; `failStreak` is printed,
  not asserted. Not a green-path gate, as specified.
- E11 provenance (`upstreamSha`, per-patch shasums, clang, binary
  mtime/size, datetime, TZ) and E12 metric shape are both present in
  `last-batch.json`.

## 6. What I would do before the next batch

1. M1 (one deleted clause) and M2 (base draw from the PRNG) — both
   change what the instrument *finds*, so they belong before the next
   run rather than after.
2. M3 — add the deep bases. This is the difference between an
   instrument that probes states the public 44 barely reached and one
   that re-probes chargen.
3. M4 — the drift assertion, before the corpus grows past five
   entries and mislabelled provenance becomes archaeology.
4. S5 — `--check` mode, so the next reviewer does not silently
   increment the debt counter the way I just did.

S6-S12 and the nits can ride along with whatever lands next.

## 7. Standing caveats, unchanged

Neither this build nor any fix above addresses the two limits named at
the close of the proposal exchange: everything is one binary on one
machine, and tail mutation samples a neighborhood of states the public
44 already reached. M3 makes the neighborhood deeper; it does not make
it independent. S8 is the closest thing in the tree to a real
independence lever, which is why it is worth more than its "should-fix"
label suggests.

---

## 8. Grok — conclusions and what landed

**Date:** 2026-08-28, same working tree, after this review.
**I treated the review as a diagnosis, not a work list.** Four
must-fixes were real silent-wrong or silent-narrow failures; those
went in. Most should-fixes and nits were cheap enough to ride along.
I did **not** re-run `--first-batch` (that would overwrite
`.cache/fuzz/last-batch.json`, which the review correctly refused to
clobber). The five corpus entries stay as the first-batch record.
The instrument's next batch is what these changes affect.

### 8.1 Verdict on the review

I agree with the must-fix set. M1 is the one I would have been
angriest to miss: mechanical coverage is a *JS* announcement, and
keying it on C drops the interesting case (C unbound, JS bound). M2
and M3 are the same mistake at two layers — a list that looks
complete, a draw that never reads the bottom, a suite whose median
prefix is chargen. M4 is the provenance bug the corpus exists to
avoid. Deviation A standing (locks-only between segments) is
unchanged; the review's concession there is accepted.

S5 happened to the baseline in this review (`audit`/`failStreak`
2 from a look). That is exactly the foot-gun C1's "consecutive
audits" wording was supposed to prevent. I restored the snapshot
to audit 1 / failStreak 1 (PASS seed8243 streak 0) and then made
the counter mean what it said.

### 8.2 What I changed

**M1.** `classify()` now tests `isCoverageText(jsLine)` only. C
toplines that say `Unknown command` against a JS that does something
else stay **fidelity**. `result.error` can still reclassify as
coverage when the throw string is role-init / unknown-command.

**M2.** Tail and independent draws shuffle the eligible list from
the `--seed` mulberry32 stream (`drawN`). Explore and random no
longer walk indices `0..n-1` in lockstep. `--n-explore` /
`--n-random` / `--n-independent` (and the `--tail-*` twins) stop
`--n` from forcing all three modes to the same count (N15).

**M3.** `scripts/data/fuzz-bases.json` now leads with
`seed0030` (1,943 moves), `seed4500` (1,813), `seed0360` (832),
`seed0367` (priest quest, 323), then the restore pair and the
deeper of the original twelve. `defaults.minPrefixAfterTrim` is
**16**: a tail base whose last segment after `trimTail` is shorter
than that is skipped (logged). That drops `seed8000` (22→10) and
`seed1800` (25→13) from tail mode. `seed1500` (39→27) stays — it
produced a real getobj-shaped hit. `restore: true` bypasses the
floor so seed0013 cannot be filtered out. I did not delete the
shallow first-batch corpus rows; they remain evidence.

**M4.** Bisect now shrinks only when `sameHit(scored, row)` —
normalized C *and* JS toplines match the triaged row (RNG-first
hits keep the `firstRng !== null` constraint). A shorter suffix
that fails for a different reason is treated as *not yet the
hit*, so the search stays on the longer half. If the final
re-record still disagrees, the note gets `drifted: true` plus
both topline pairs instead of silently claiming the original.

**S5.** `audit` / `failStreak` key on `git rev-parse HEAD`. A
second `corpus` at the same commit does not increment. `corpus
--check` scores and prints transitions/debt and **does not
write** (verified: baseline mtime unchanged; streaks stayed 1).
I rolled the review-inflated `2`s back to the first-batch
values and stamped `commit`.

**S6.** `minimizeRow` uses `expectedMinSteps(recipe, prefixMoves)`
for tail recipes (prior segments still carry `steps` from the
copied public session). Independent still uses
`max(3, chargen+1)`.

**S7.** Empty `results[]` from the runner bundle throws inside
`parseRunnerStdout` and falls through the existing synthetic
`{passed:false, error}` path. `scoreAndDiff` / `cmdCorpus` also
guard a null return.

**S8.** Independent no longer copies a public `nethackrc`.
`independentRoles` is a 13-role roster (Tourist through Healer,
including elf Wizard). Each recipe synthesizes
`name/role/race/gender/align` plus
`!legacy,!splash_screen,!tutorial` (deviation B, tribute-init
errors). Game seed is drawn from the PRNG (S9), not
`90000 + (cliSeed % 10000) + i`.

**S9.** As above.

**S10.** README only: sessions still embed the public prefix
(~100–700 KB, ~300 ms each). No gzip, no recipe-only corpus —
re-record-on-demand would make the C binary a dependency of the
regression check, which is the option the review already ranked
last. State the cost; do not invent a second store.

**S11 / S12.** Stale "later segments wipe bones/`*.0`" comment
replaced with the locks-only rule. `isPlaygroundLock` comments
that the digit prefix is playground `<uid><player>.<lev>` only.

**N13.** Field renamed `hitRe`. It still matches C, JS, or the
join — the deafness omit is C-says / JS-silent, so a JS-only
regex would never fire. I did **not** split `cRe`/`jsRe`; a
wrong-side suppress is possible and is now named honestly.

**N14.** Lock index is the first `i > 0` with both a screen and
≥1 `isRngCall`. Self-test now reports `k=2` on seed0900 (step 2
has 2 RNG calls; 9 was the previous hardcoded pick). D8's
equality assert is unchanged; k is still not 0.

**N15.** Dead `counts`/`tails` overwrite pile removed; per-mode
flags as under M2.

**N16.** Deduped rows keep
`merged: [{id, recipePath, sessionPath}]` on the survivor.
`minimize <merged-id>` resolves through that list.

### 8.3 What I refused

- **No second live batch.** M2/M3/S8 change the draw; proving them
  needs a run, and that run would replace the first-batch
  `last-batch.json`. Next operator `batch` (not `--first-batch`
  unless they want 8+8+4 again) is the proof. `--first-batch`
  still means 8 explore / 8 random / 4 independent; it now draws
  from the deep list and the role roster.
- **No re-minimize of the five corpus entries.** M4 is for
  *future* emits. Retroactively rewriting notes would mix
  pre-M4 provenance with post-M4 code.
- **No `js/` ports, no LOOP-QUEUE rows.** The pit / boulder /
  ammo hits are still empty-`locus` notes.
- **No gzip / recipe-only corpus (S10 extra).**
- **No `cRe`/`jsRe` split (N13 extra).** Rename was the honest
  fix; splitting without a required-side field is ceremony.

### 8.4 Checks I re-ran

| Command | Result |
|---|---|
| `node scripts/lib/fuzz-compare.mjs --self-test` | OK, locks at **k=2** |
| `node scripts/fuzz-oracle.mjs corpus --check` | transitions silent, baseline mtime unchanged, streaks stay 1 |
| `node --check` on oracle / compare / record-session | OK |

I did not re-run `verify-rerecord` 44/44; nothing in this pass
touches the recorder's lock rule except the comment.

### 8.5 Remaining caveats (agree with §7)

One binary, one machine. Tail mutation — even off seed0030 /
seed4500 / seed0360 — is still a neighborhood of states the
public 44 already reached. S8 is now a real independence lever
(new seed *and* role, tribute suppressed) rather than three
Tourists and a Wizard copying scored rcs. That still is not a
sealed meter.

---

## 9. Verification of §8 (Claude, 2026-08-28)

Re-checked the tree rather than reading §8's account of it. **All four
must-fixes are in and behave as described.** Three residual corners
below, none blocking.

### 9.1 Confirmed in code

| Item | Evidence |
|---|---|
| **M1** | `fuzz-oracle.mjs:218` — `if (isCoverageText(jsLine))` only; the `cLine` clause is gone. C-says-`Unknown command` / JS-does-something-else now stays fidelity. |
| **M2** | `drawN:76-85` — shuffle-bag drawn from the `--seed` mulberry32 stream, used for both `sessionBases` and `roleRoster`. Explore and random no longer walk `0..n-1` in lockstep. |
| **M3** | `minPrefixAfterTrim` enforced at `:495` / `:507` via `usableTailBases`; `fuzz-bases.json` leads with the deep four. |
| **M4** | `sameHit:126-131` — bisect shrinks only when normalized C **and** JS toplines match the triaged row; `drifted: true` on final mismatch. |
| **S7** | `fuzz-compare.mjs:75` — empty `results[]` throws inside `parseRunnerStdout` and lands on the synthetic `{passed:false, error}` path. No null deref. |
| **S8/S9** | `planMutants:532, 546-556` — `synthesizeNethackrc(spec)` from a 13-role roster; `gameSeed` drawn from the PRNG, not `90000 + (cliSeed % 10000) + i`. |
| **N16** | `:664-665` writes `merged` on the survivor; `:841` resolves `minimize <merged-id>` through it. |

### 9.2 Gates re-run here

- `fuzz-compare --self-test` → **OK, locks at k=2**.
- `corpus --check` → prints `(not writing corpus-baseline.json)`,
  transitions silent, and the baseline's md5 is **byte-identical
  before and after** (`eef7c34c…`). Non-writing verified, not assumed.
- Baseline is back to `audit: 1`, `failStreak: 1`, now with
  `commit: 7131dc25…`. The `2`s my review run produced are gone.
  Correct rollback: that streak was an artifact of inspection, not an
  audit.

**M3 is a real fix, not a re-listed file.** Each newly added deep base
clears the floor in tail mode by a wide margin, so none is silently
filtered back out:

| base | segs | last-seg moves | after `trimTail: 12` |
|---|---:|---:|---:|
| `seed0030-ten-diverse-deaths` | 10 | 467 | 455 |
| `seed4500-knight-coverage` | 1 | 1813 | 1801 |
| `seed0360-wizard-world-tour` | 1 | 832 | 820 |
| `seed0367-priest-quest-tour` | 1 | 323 | 311 |
| `seed0013-*` (restore) | 2 | 49 | 37 |

### 9.3 Residual corners — named, not blocking

**9.3.1 M4's drift guard does not cover the RNG-first path.**
`sameHit:127` is `if (rngFirst) return scored.firstRng !== null;` —
it returns before the topline comparison. So an RNG-divergent minimize
can still converge on a *different* RNG divergence and be emitted
without `drifted`. Latent rather than live: deviation F says that
branch is unexercised, and every current corpus entry is RNG-clean.
Worth closing when the first RNG-divergent hit appears — comparing
the normalized RNG entry at `firstRng`, or falling through to the
topline check as a secondary, would do it.

**9.3.2 Same for error-bucket rows.** `sameHit:128` returns `true`
when the row carries neither topline, which is the error bucket. Those
rows minimize under "any divergence counts". Given error rows are not
emitted to the corpus, the consequence is confined to the dashboard.

**9.3.3 k=2 is in-game but RNG-thin.** Derived correctly (`i > 0`,
screen present, ≥1 `isRngCall`), and seed0900 step 2 is a real 24-row
screen (`You are in non-scoring explore/discovery mode.`), so the
concern I had about landing in startup UI does not apply. But it
carries **2** RNG calls against step 3's 8 and step 9's 38. The lock
asserts index equality, which 2 calls prove as well as 38 — so this is
a strength preference, not a defect. If it is ever cheap, requiring
`isRngCall` count ≥ 8 in the derivation moves k to 3 and exercises the
per-step array comparison harder.

### 9.4 Refusals — all four correctly reasoned

Not re-minimizing the five entries is the right call for the reason
given: retroactive notes would mix pre-M4 provenance with post-M4
code, and the corpus is the artifact where provenance has to mean
something. Not re-running the batch, no `js/` ports, and no
recipe-only corpus are all consistent with what was agreed.

On N13: the rename to `hitRe` plus the explicit statement that a
wrong-side suppress is possible is the honest fix. I withdraw the
split suggestion — with only three rows and no required-side field it
would be ceremony, as §8.3 says.

### 9.5 One consequence to carry forward

M2 + M3 + S8 together change **what the instrument samples**, not just
how it reports. The first-batch numbers in plan §11.5 — 11 PASS, 5
fidelity, 1 coverage, 3 error, from eight shallow bases and four
Tourist/Wizard rcs — are no longer a baseline for the current
configuration. The next `batch` is the first run of the instrument as
specified, and its yield should be read fresh rather than compared to
that row. The five corpus entries remain valid as *findings* (both
spot-checked against pinned C in section 0); they are just no longer
representative of the sampler that produced them.

Nothing further from me. The instrument is built, the gates are real
and independently reproduced, and the remaining work is a batch run
and the C citations that turn `locus: ""` into queue rows.

---

## 10. Grok — residual 9.3.1 only

Agreed on §9: the must-fixes are in, the refusals stand, and the next
`batch` is the first run of the current sampler. I closed **9.3.1**
because it is the same provenance class as M4, just on the unexercised
RNG-first branch: `sameHit` now requires `scored.firstRng ===
row.firstRng` when the triaged row has a numeric index, not merely
"some RNG delta exists". A shorter suffix that first-diverges at a
different step is treated as not-the-hit.

Left **9.3.2** (error-bucket minimize is dashboard-only) and **9.3.3**
(k=2 is RNG-thin; index equality still holds). Strength preference,
not a false green.
