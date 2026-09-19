# Review 1547 — 8c4c1b1f — invent.c freeinv_core whole-body port (D-2588)

## Metadata

- SHA: `8c4c1b1f`
- D-id: D-2588. Next index: 1547.
- Files: `js/invent.js` (+60/−13).
- C locus: `nethack-c/upstream/src/invent.c:1355–1399`
  (`freeinv_core`), via `node scripts/csym.mjs freeinv_core` plus a
  full direct read of `:1355–1400` here.

## Intent vs deliverable

Subject promises the whole 45-line body in C order (coin return, four
uhave clears, questart clear, loadstone re-curse, luck moreluck+botl,
tin clear), staying sync with async callees floating un-awaited.
Diff delivers all of it. Promise matches deliverable.

## Inventory

- Restarted: `freeinv_core` (`js/invent.js`, export name/signature
  unchanged — both C callers, sync `freeinv` and zap poly, ride it).
- Joined: `curse` (mkobj.js), `set_moreluck` (attrib.js),
  `confers_luck` (artifact.js), `is_quest_artifact` (quest.js).
  Required `sym.mjs` output:
  - `confers_luck js/artifact.js:663 sync` — LIVE.
  - `set_moreluck js/attrib.js:722 sync` — LIVE.
  - `is_quest_artifact` — TWO identical exports:
    `js/quest.js:275` + `js/dogmove.js:145` (both cite questpgr.c,
    same `want !== 0` guard). The commit imports the quest.js one —
    the C-locus-correct home. The dogmove twin is pre-existing clone
    drift, not this SHA's doing (one line, not a C-wrong here).
  - Required `--can`: `invent.js already statically imports
    quest.js. No new edge needed.` (confers_luck/set_moreluck/curse
    extend existing static edges — same ALREADY pattern).
- New otyp consts via `objectNames.indexOf` (file precedent).
- No deleted symbols. No RNG in C and none added.

## C ↔ JS fidelity

Full body walked arm by arm against the C read:

- `:1358–1360` COIN_CLASS → botl + return. Match (flags+disp botl
  per `invent.js:1089` precedent).
- `:1361–1376` amulet/menorah/bell/book uhave clears with the
  `impossible` guards. Match, same messages, same order.
- `:1377–1383` oartifact → `is_quest_artifact` → questart clear →
  `set_artifact_intrinsic(obj, 0, W_ART)` (`false` = off). Match.
- `:1386–1387` LOADSTONE → `curse(obj)`. Match; the float rationale
  verified independently here: `curse` (`js/mkobj.js:581–599`) flips
  cursed/blessed/set_moreluck at `:586–591` before its first `await`
  at `:598`, and a loadstone is never lamplit so the tail never
  fires — sync callers observe C order. `impossible`
  (`js/display.js:7992`, async) floats per the cited getrumor
  precedent — stated in the header, not hidden.
- `:1388–1390` `confers_luck` → `set_moreluck` + botl. Match.
- `:1391–1392` figurine timed → `stop_timer(FIG_TRANSFORM, obj)`
  (present at `js/invent.js:7760`; obj_to_any identity documented).
  Match.
- `:1395–1397` tin clear (`obj === tin.tin`, null + o_id 0, eat.js
  `game.context.tin` path). Match.

## Hallucinations / overclaim

None. The sync-float design is argued in the header with the exact
mechanism (flip-before-await + never-lamplit), checkable above. The
revoke_invoked_property envelope relationship is restated, not
re-claimed.

## Density

60 insertions for a 45-line C function + 4 import joins — one
function family, right size (§2b).

## Verification

- D-log claims `verify.mjs --fn freeinv_core` → VERIFY: PASS
  (coverage row, 0 blocked at baseline — honestly stated).
- Re-ran here (required):
  - `hidden-proxy verify freeinv_core --base 8c4c1b1f~1 --reach-all`
  - → 0 blocked both sides (vacuous note, expected)
  - → smoke 24/24 REACH-OK.
- Claim confirmed, not vacuous-by-rewrite.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
