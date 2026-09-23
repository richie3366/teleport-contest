# Review 1703 — 51018d7f6 — `lock.c` pick_lock whole body (D-2744)

Metadata: commit `51018d7f6`, D-2744, `js/lock.js` only. Coverage row (C 294 L `lock.c:358–656` / JS was 218 L), 0 corpus blocks. No prior review claimed closed.

## Intent vs deliverable

Subject promises the whole body: dummy, resume, box, door, clone purge to live imports. The diff restarts `pick_lock` (`js/lock.js:1134–1399`) and deletes the local `yname` / `an` / `the` / `simple_typename` clones. One half of `!IS_DOOR` stays the historical always-`LEARNED` return, named in the function and queued as its own Open row after that half regressed the fortress. That is the two-fix rule, not a silent stub.

## Inventory

Changed JS: `pick_lock`; new file-local `Levitation` / `Underwater` (youprop macros). Imports extended on existing edges: `You_cant`, `There`, `pline_The`, `impossible`, `is_lava`, `is_pool`, `ysimple_name`, `ansimpleoname`, `simple_typename`, `safe_qbuf`, `yname`, `an`, `the`, `hliquid`, `could_untrap`, `untrap`, `touch_artifact`. No new function export.

## Callee closure

Required `sym.mjs` (clones removed from this file, calls re-pointed at the exports):

```text
yname            js/objnam.js:2775   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/music.js:151  js/pickup.js:206  js/uhitm.js:4314
an               js/objnam.js:2361   sync
the              js/objnam.js:1759   sync
simple_typename  js/objnam.js:3850   sync
is_magic_key     js/artifact.js:2426   sync
```

`lock.js` is not in the `yname` clone list. `--can` for `touch_artifact`, `safe_qbuf`, and `untrap` is ALREADY. `is_magic_key(game.youmonst, pick)` replaces `is_magic_key(null, pick)` at both sites (`:1161`, `:1395`), matching C `&gy.youmonst`.

## C ↔ JS fidelity

C `lock.c:357–656` (`csym`). Callers: `apply.c:4288`, `lock.c:882`, `pickup.c:2125` (`:2117` is a comment). All three are live: `apply.js:2514` `pick_lock(obj)` (defaults `0,0,null`), `lock.js:907` `pick_lock(unlocktool, x, y, null)` (C passes `(struct obj *)0`), `pickup.js:4376` `pick_lock(unlocktool, ox, oy, cobj)` including the `0` tool for UNTRAP-only. `hasTool` is `pick != null && pick !== 0`, so the dummy path matches `pick == &dummypick`.

Arms checked against the body:

- Null tool → `{ otyp: 0 }` (STRANGE_OBJECT). Resume: nohands / swallowed-or-unreachable `pline` with the C `"Unfortunately, you can no longer %s %s."` split, then `You("resume…")`, `set_occupation`, `DID_SOMETHING`. ✓
- Fresh nohands `You_cant` + `doname`; swallowed `You_cant("%sunlock %s.")` with the credit-card empty prefix. ✓
- `impossible` only when `hasTool` and the otyp is not key/pick/card. ✓
- `rx !== 0` uses the given coord; else `get_adjacent_loc(null, "Invalid location!")`, whose body adds `u.ux/u.uy` itself (`lock.js:766–768`). ✓
- Underfoot: stale `dz`, lava `yname`, pool `pline_The` + `hliquid`, box loop with autounlock filter, reach, verb/it, UNTRAP `safe_qbuf` + `yn_function`, APPLY_KEY prompt, interactive `safe_qbuf` + `lknown`, broken/card/`touch_artifact`, chance `ACURR+rogue` numbers identical to `:521–532`, `Math.trunc(ch/2)` for cursed. ✓
- Door: pit rim returns `DID_NOTHING` (not LEARNED). Visible non-mimic shk/Oracle `verbalize` vs the appreciate pline. Door-mimic uses ungated `stumble_onto_mimic` (`is_door_mappear` inlined). `maybe_absorb_item` is not called (named; no JS port). ✓
- `!IS_DOOR`: messages match (`drawbridge` / `feel|see`), and `feel_location` + `update_mapseen_for` run, but the return is always `PICKLOCK_LEARNED_SOMETHING`. C `:579–586` stays `DID_NOTHING` unless `door->glyph` or `lastseentyp` changed. Named, and already the Open row that asks for a glyph-id measurement before another attempt.
- doormask NODOOR/ISOPEN/BROKEN; UNTRAP uses `flags.autounlock & AUTOUNLOCK_UNTRAP` with no extra `autounlock` coord gate, matching `:605`. Card-only-unlock, Lock/Unlock `ynq` text, `touch_artifact`, door chances `:634–644`. Tail: `context.move = 0`, chance/picktyp/magic_key/usedtime, `set_occupation`. ✓
- No RNG in this function (chances are occupation fuel). `Levitation` is `(H||E) && !B`. `Underwater` is `u.uinwater`.

## Hallucinations / overclaim

"Whole body" is one named half short, and the D-log says so (not a hidden stub). "every `--can` ALREADY" matches the three sampled edges. The D-log's caller line `lock.js:913` is `907` now; the call is the right one. No FORCE/DIAG/seed/coordinate/`fastforward` in the shipped body (the D-log notes a seed name was removed from a comment before the final tree). Rule #2 clean.

## Density

One C function, one module, ~280 JS lines. The reverted `!IS_DOOR` half is the fortress exception the prompt allows, and it is queued rather than left unnamed.

## Verification

Re-measured (`--base 51018d7f6~1 --reach-all`). Parent scoreboard is `09e6ef90d`. Row cited 0 blocks. D-log says note 0 blocked, not a fake PASS.

```text
verify pick_lock: baseline 51018d7f6~1 (scoreboard at 09e6ef90d) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify pick_lock: no corpus session is blocked on it at 51018d7f6~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke pick_lock: no RNG-tagged reach; fixed smoke spread (24 run, 2.9s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. D-log also claims full `sessions` 44/44 after the clone deletion; this audit's cadence run is the public re-score.

## Actionable C-wrongs

None new. `maybe_absorb_item` and the `!IS_DOOR` return half are named. The return half is already Open (`lock.c:578–593`, measure before porting). Not a second Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
