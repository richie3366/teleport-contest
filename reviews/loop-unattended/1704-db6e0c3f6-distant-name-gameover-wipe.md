# Review 1704 — db6e0c3f6 — `objnam.c` distant_name gameover o_id wipe (D-2745)

Metadata: commit `db6e0c3f6`, D-2745, `js/objnam.js` only. Missing-arm row (`objnam.c:382–383` and `:406`), 0 corpus blocks. Also Stale-parks `possibly_unwield`. No prior review claimed closed.

## Intent vs deliverable

Subject promises the gameover `o_id` wipe inside `distant_name`, and a stale park of `weapon.c` `possibly_unwield`. The diff adds the wipe and the restore. It does not rewrite callers. Promise matches deliverable.

## Inventory

Changed JS: `distant_name` (`js/objnam.js:1128`). No new symbol, no deleted symbol, no new import.

## Callee closure

Nothing was deleted or re-pointed. `func` is the caller-supplied formatter (`xname` / `doname`). Helpers `object_neardist`, `distu_xy`, `cansee_xy`, `get_obj_loc_for_distant` are the pre-existing file-locals; this commit does not change their bodies. `possibly_unwield` (`js/weapon.js:141`) matches `weapon.c:746–795`: `MON_WEP` miss → `MON_NOWEP`; minvent scan; `attacktype_fordmg(..., AT_WEAP, -1)` is `attacktype` because `attacktype` is `attacktype_fordmg(..., AD_ANY)` and `AD_ANY == -1`; the drop tail calls live `distant_name` before `obj_extract_self`. The stale park is not an empty stub. The drop helper is async because `flooreffects` is async; that split predates this commit.

## C ↔ JS fidelity

C `objnam.c:345–409` (`csym`). No RNG.

- `r = xray_range > 2 ? xray_range : 2`, `neardist = (r*r)*2 - r` in `object_neardist`. ✓
- New: `save_oid = obj.o_id`; if `game.program_state.gameover` (set at `js/hack.js:1773` and `:1793`) then `obj.o_id = 0`, before location lookup. That is `:382–383`. ✓
- Near: location && cansee && (artifact || distu <= neardist) → `func(obj)` with no `distantname` bump. ✓
- Far: increment, `func(obj)`, decrement in an inner `finally`. ✓
- Outer `finally` writes `obj.o_id = save_oid` (`:406`). A `return` inside `try` evaluates `func` first, then `finally`, so the wipe is in force during `xname` and restored before the caller sees the object. C has no early return between wipe and restore; the `finally` covers both arms. ✓
- Early `if (!obj || typeof func !== 'function')` is a JS guard. C would fault on a null object. Real callers pass an object and a function.

Named, unchanged: `get_obj_location` buried/contained (`locflags` other than 0); artifact-find side effects only via the near observe path. `mon?.mx` in the minvent loc helper treats x 0 as missing; that helper is not in this diff.

Callers: this commit adds no call. `--callers` is 57 references, many comments. The D-log's three non-wires are named: `priest.c:131` (no JS), `steal.c:823` `mdrop_obj` (map), `objnam.c:1077` `minimal_xname` (stand-in `simpleonames`). Not re-audited one by one; none were edited here.

## Hallucinations / overclaim

"No new import, no caller rewiring" matches the diff. The park's "whole C body already live" matches the weapon.c walk above, including the `AD_ANY`/-1 identity. No FORCE/DIAG/seed/coordinate/`fastforward`. Rule #2 clean.

## Density

One missing arm (save / wipe / restore) inside an already-live function, plus a same-commit stale park. Under the 200-line target because the row was that arm. Right-sized.

## Verification

Re-measured (`--base db6e0c3f6~1 --reach-all`). Parent scoreboard is `8eb4bf416`. Row cited 0 blocks. D-log says note 0 blocked.

```text
verify distant_name: baseline db6e0c3f6~1 (scoreboard at 8eb4bf416) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify distant_name: no corpus session is blocked on it at db6e0c3f6~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke distant_name: no RNG-tagged reach; fixed smoke spread (24 run, 2.9s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. Gameover is end-of-game only, so the wipe is not corpus-hit. Green/strict/cohort per the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
