# Review 1684 — 360259cf5 — `allmain.c` welcome remainder (D-2725)

Metadata: commit `360259cf5`, D-2725, `js/allmain.js` + `js/do.js` + `js/read.js`. Coverage row citing 16 corpus blocks owner=welcome. No prior review claimed closed.

## Intent vs deliverable

Subject promises: `:860` nhcore call + doomed-restore early return + Hallu arm + restore tail → live, restore caller wired. The diff delivers every arm plus a `currentgend` Upolyd fix. Promise matches deliverable.

## Inventory

Changed JS: `welcome` (`js/allmain.js:674`, whole body restarted in C order); `hellish_smoke_mesg` (`js/do.js:2170`, `function`→`export`, body unchanged); `udeadinside` (`js/read.js:2387`, `function`→`export`, body unchanged). New imports join existing edges except `udeadinside` (new `./read.js` edge, `--can` IN-SCC/CHECK runtime-only per message). No deleted symbols, no clones.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (newly exported names):

```text
udeadinside      js/read.js:2387   sync
hellish_smoke_mesg js/do.js:2170   ASYNC — await required
```

Both LIVE single defs (no clone #2 — diffs are export-only, bodies untouched). All other callees join pre-existing edges (`l_nhcore_call`, `ugenocided`, `print_level_annotation`, `NHCORE_*`, `align_str`/`Hello`, `livelog_printf`). No STUB in any arm.

## C ↔ JS fidelity

C locus read: `welcome — allmain.c:853-929` (csym range; message cites `:854–929`). Branch-by-branch:

- `:858–859` `currentgend = Upolyd ? u.mfemale : flags.female`, adrift ✓ (fixes the old `!!flags.female`-always shape).
- `:860` `l_nhcore_call(START/RESTORE)` ✓ awaited.
- `:862–866` doomed-restore early return (`!new_game && Upolyd && ugenocided()` → `udeadinside` pline + return) ✓ exact.
- `:869–870` `if (Hallucination)` → `Hallucination()` call: correct adaptation (JS binding is a predicate function per `js/display.js:1047`; the iteration's own mid-point FAIL proved the bare binding paints unconditionally, then fixed) ✓.
- buf build: align arm with adrift prefix ✓, gender-adj gate (`!name.f`, both-genders on new / initgend compare on restore) ✓, race + role-name arms ✓ (pre-existing, kept), `#if 0` dead arm correctly skipped with note ✓.
- welcome/welcome-back pline formats ✓ verbatim; new-game livelog ✓; restore tail (`hellish_smoke_mesg` + `print_level_annotation`) ✓ exact.
- Callers (`--callers`: `allmain.c:843`, `restore.c:948`): TRUE at `js/allmain.js:888` ✓, FALSE at `js/jsmain.js:252` ✓ — the D-log honestly notes the row's "unwired" claim was stale (wired since D-0335), no edit needed.
- RNG: no draw added/removed/reordered.

## Hallucinations / overclaim

None. The message discloses the mid-iteration FAIL and the stale-row correction. No FORCE/DIAG/seed/coordinate gates (only hit is the pre-existing `fastforward` import line). `Hello(role.mnum)` arg shape flagged pre-existing, untouched.

## Density

Breadth-phase remainder: whole 77-line C body, three small modules, no new static edges except one runtime IN-SCC import. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base 360259cf5~1 --reach-all`):

```text
verify welcome: baseline 360259cf5~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify welcome: no corpus session is blocked on it at 360259cf5~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke welcome: no RNG-tagged reach; fixed smoke spread (24 run, 6.1s): 24 PASS, 0 regressed → REACH-OK
```

The stored-scoreboard baseline holds 0 welcome blocks, so the D-log's "16 blocked all PASS" PROGRESS cannot be re-derived from that snapshot — but it is independently corroborated: the live `hidden-proxy queue` this iteration shows 24 owners with **no** welcome entry (0 untagged-eligible), i.e. the 16 moved off welcome and stayed PASS, and the iteration's own mid-point FAIL→fix→clean cycle proves the new arms execute on fortress sessions. No REGRESSED anywhere. Green/strict/cohort/full-44 per D-log. Not a vacuous check: the fix demonstrably paints row 0.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
