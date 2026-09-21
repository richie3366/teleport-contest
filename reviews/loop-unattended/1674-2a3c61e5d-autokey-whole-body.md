# Review 1674 — 2a3c61e5d — `lock.c` autokey whole C body (D-2715)

Metadata: commit `2a3c61e5d`, D-2715, `js/lock.js` only (+66/−32 js hunks: +3 imports, autokey restart, local clone deleted). Coverage row (not corpus). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body `autokey` restart (akey/apick/acard split, `is_magic_key` displacement, `!opening` card+acard drop, C-order fallbacks), deletion of the local `is_magic_key` clone, both C callers wired. Diff delivers exactly that: new imports, full body, clone deleted, callers cited `js/lock.js:911` / `js/pickup.js:4373` (both verified below). Promise matches deliverable.

## Inventory

Changed JS: `autokey` (restart, sync, still `js/lock.js:392`); deleted local `function is_magic_key` (`return false` stub-clone); added imports `is_magic_key` (`./artifact.js`), `is_quest_artifact` (`./quest.js`), `ART_ORB_OF_DETECTION` (`./generated/artifacts_data.js`). No other symbols touched.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (one symbol deleted/re-pointed — the local clone → live import):

```text
is_magic_key     js/artifact.js:2426   sync
autokey          js/lock.js:392   sync
is_quest_artifact js/dogmove.js:150   sync
                 js/quest.js:277   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/detect.js:290  js/mon.js:1743
```

`--can lock.js→artifact.js is_magic_key`: `ALREADY: lock.js already statically imports artifact.js. No new edge needed.` Same ALREADY for `lock.js→quest.js is_quest_artifact`. No STUB in the arm: every callee is LIVE. (The two `is_quest_artifact` local clones in `detect.js`/`mon.js` and the second export in `dogmove.js` are pre-existing, untouched by this diff; the import used here is the C-locus `quest.js:277` one.)

## C ↔ JS fidelity

C loci read: `lock.c:288–344` (csym range; commit message cites `:289–344`, same body), `obj.h:271` (`any_quest_artifact(o)` = `(o)->oartifact >= ART_ORB_OF_DETECTION`), `artifact.c:2773–2786` (`is_magic_key`), `questpgr.c:66–70` (`is_quest_artifact`), callers `lock.c:881` + `pickup.c:2122`. No RNG in the C body — nothing to walk call-for-call.

- Scan loop: `any_quest_artifact && !is_quest_artifact` → a-slots vs plain slots ✓; JS `((o.oartifact|0) >= ART_ORB_OF_DETECTION) && !is_quest_artifact(o)` is the macro verbatim (bit-or-zero is the house null-guard idiom).
- SKELETON_KEY arm: `if (!key || is_magic_key(&gy.youmonst, o))` → JS `if (!key || is_magic_key(game.youmonst, o))` ✓ (displacement, not first-wins).
- `!opening` → `card = acard = null` ✓ (old code dropped only `card` — the exact bug named).
- Fallbacks `if (!key && !pick && !card) key = akey; if (!pick && !card) pick = apick; if (!card) card = acard;` ✓ order and predicates exact; return ternary chain exact.
- Callers: `lock.c:881` → `js/lock.js:911` `autokey(true)` ✓; `pickup.c:2122` → `js/pickup.js:4373` `autokey(true)` ✓ (both read above).
- Live `is_magic_key` body (`artifact.js:2426–2433`) matches C `:2778–2785`: rogue→`!cursed`, else `blessed`, gated on `is_art(MASTER_KEY)` ✓.

Two pre-existing live-body nuances, both unreachable from this diff and not Must-fix: `is_magic_key` JS treats null `mon` as hero-role while C's null falls to the non-rogue arm (no caller passes null — `has_magic_key` defaults null to youmonst first); `is_quest_artifact` JS adds a `want !== 0` guard C lacks (unreachable inside `autokey`, where `any_quest_artifact` already requires an artifact). Named here so no future review re-opens them.

## Hallucinations / overclaim

None. "Whole body ported, none named" is accurate — no deferral, no stub. Diff grep: 0 hits for FORCE/DIAG/getRngLog/fastforward. No seed/step/coordinate logic.

## Density

Breadth-phase whole-function restart, one module, +66/−32, no new import edges. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base 2a3c61e5d~1 --reach-all`) — both lines, matching the D-log:

```text
verify autokey: baseline 2a3c61e5d~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify autokey: no corpus session is blocked on it at 2a3c61e5d~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke autokey: no RNG-tagged reach; fixed smoke spread (24 run, 3.6s): 24 PASS, 0 regressed → REACH-OK
```

The D-log correctly reports "note hidden (no corpus session blocked)" rather than a PASS — the vacuous note is stated, not sold. Green 2/2 + strict + cohort 7/7 per D-log; `imports.mjs --rulecheck`: `Rule #2 clean`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
