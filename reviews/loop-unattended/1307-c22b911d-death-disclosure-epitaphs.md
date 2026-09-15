# Review 1307 — c22b911d — death-disclosure epitaph writers (D-2341)

Metadata: SHA `c22b911d`, D-2341, misattributed-`save_dungeon` epitaph writers. Method: full `js/` hunks read (4 files); C `done_in_by end.c:184-344` + `dynamic_multi_reason uhitm.c:102-123` + `formatkiller topten.c:89-162` bodies (via `csym.mjs`), `mhitm_ad_plys uhitm.c:3430-3462` + `goto_level do.c:1678-1684` + `pm_to_cham mon.c:535-546` + `makemon.c:1355-1359` arms; `sym.mjs` on `dynamic_multi_reason`/`builds_up`/`m_monnam`/`the_unique_pm`/`is_vampshifter`/`BUFSZ`; added-lines banned grep (0 hits); `imports.mjs --rulecheck` (clean); `hidden-proxy verify save_dungeon --base c22b911d~1` re-run.

## Intent vs deliverable

Subject promises the epitaph writers behind 8 owner-`save_dungeon` sessions: imitator / priest-minion nouns, helpless `, while …` trim, Sokoban `ureached` min-track. Diff delivers all four: `done_in_by` imitator + ispriest/isminion + trim arms (`end.js`), `formatkiller` helpless arm (`end.js`), exported `dynamic_multi_reason` (`uhitm.js`) + 3 call sites (`uhitm.js` ×2, `mhitu.js` ×1), `goto_level` builds_up min-track (`do.js`). Promise kept — except the new imitator arm's gate predicate mistranslates C pointer identity (Actionable 1).

## Inventory

- `end.js`: imports `strstri`/`the_unique_pm`/`is_vampshifter`/`m_monnam`/`BUFSZ` (all LIVE per `sym.mjs`); `formatkiller` helpless arm; `done_in_by` imitator/priest-minion/trim arms.
- `uhitm.js`: exported `dynamic_multi_reason` (single def, sync) + gaze/cube call sites in C position.
- `mhitu.js`: `dynamic_multi_reason` import (existing uhitm edge) replacing the static `'paralyzed by a monster'`.
- `do.js`: `builds_up` import (live `hacklib.js:46`) + Sokoban min-track else-arm.
- Named: ghost arms, vampshifter-alt/mimicker sub-arms, gaze/frozen sites, `nomovemsg=0`, all cited with no corpus reach.

## C ↔ JS fidelity

Imitator arm (`:230-255`) branch order ✓ (realnm/fakenm → mimicker-`mappearance` → vampire-bat → article rules → three format strings), `strstri` truthiness ✓ (JS returns null-or-slice, matching C pointer semantics), priest/minion `m_monnam` (`:262-267`) ✓, trim (`:288-316`) ✓ — C truncates only `multireasonbuf` because `multi_reason` points into it; JS truncates both strings, behaviorally equal since JS strings are values (first-space index identical: the `m_id:` prefix holds no space). `dynamic_multi_reason` (`:102-123`) exact incl. suppress mask and gaze `s_suffix`+` gaze`; all 3 C call sites wired (`:3459` mhitu, `:6045`/`:6062` passive). `formatkiller` helpless (`:145-155`) ✓ within one NUL-accounting char, display-only, no overflow possible in JS. `goto_level` builds_up (`do.c:1678-1684`) ✓ against the pre-existing `dunlev_ureached` mapping.

**Gate bug:** `const imitator = mptr !== champtr || mimicker` (`end.js:1208`, pre-existing line, newly load-bearing via this arm) compares JS object identity where C compares permonst pointers (`end.c:184-190`). `mons()` is a factory returning a fresh object per call (`monsters.js:203`), so whenever `ismnum(mtmp.cham)` JS reports imitator=true while C reports false for a true-form shifter. Birth state proves reachability: `makemon.c:1355-1359` sets `cham = pm_to_cham(mndx) = mndx` (own index per `mon.c:535-546`) with `data = &mons[mndx]` — C `mptr == champtr`, imitator false. Effects: (a) this arm prints "chameleon imitating a chameleon" (Vlad: "in Vlad the Impaler form"); (b) the G_UNIQ `"the "` gate (`:195-205`, `!(imitator && !mimicker)`) wrongly suppresses for true-form unique shifters. One-line fix: compare permonst indices (`mndx`), not object identity.

## Hallucinations / overclaim

None. The "js-throw label is null-owner print" claim verified true (`show` 92075: `error: null`, RNG 8022/8022 matched). "All added calls draw-free" holds (92075 positional RNG fully matched). Comment "8 with NUL" miscounts (`", while "` is 8 chars + NUL = 9) — trivial, code within one char of C, not queued.

Companion details confirmed while auditing (no action):
- The `mhitm_ad_plys` gate sits in the mhitu arm (`uhitm.c:3443-3462`, `multi >= 0 && !rn2(3) && !negated`); uhitm/mhitm arms correctly untouched (C `--callers` lists exactly these three sites).
- Gaze `s_suffix(who) + " gaze"` and cube plain form match `:6045`/`:6062`; the `nomovemsg` line stays pre-existing code.
- `%u` vs `|0` on `m_id` differs only past 2^31 (sequential small ids in practice).
- Trim regex vs `sscanf("%u:%c")` differs only on leading-whitespace buffers the sole producer never emits.
- The `imitator` predicate predates this SHA (it fed the G_UNIQ gate); this commit newly exposes it via the epitaph arm — hence charged here.

## Density

4 files, one death-disclosure envelope, one falsifier family. Good.

## Verification

D-log tail PASS (syntax/rule2/hidden/green/strict/cohort/full, after last `js/` edit). Re-measured:

```text
verify save_dungeon: baseline c22b911d~1 (scoreboard at 0e191fab) — 8 session(s) blocked on it
  ...7 PASS... 92075: moved → js-throw at step 80 (was 78)
verify save_dungeon: 7 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
```

Matches the D-log exactly (7 PASS + 92075 → 80, owner-null single-cell). Banned grep 0 hits; `--rulecheck` clean.

## Actionable C-wrongs

1. `done_in_by` imitator predicate uses object identity (`mptr !== champtr`) where C compares permonst identity — true-form shifters (birth-state `cham == mndx`) take the imitator arm and lose G_UNIQ `"the "`. Fix: compare `mndx` indices. One port iter; falsifier: true-form-shifter killer epitaph vs C. **Addressed:** D-2348 `aa08fdb3`

Verdict: **QUALITY-RISK**
