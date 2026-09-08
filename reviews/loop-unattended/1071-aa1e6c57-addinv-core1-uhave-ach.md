# Review 1071 — aa1e6c57 — addinv_core1 uhave/ACH arms (D-2105)

Metadata: SHA `aa1e6c57`, D-2105 (Open row `end.c` disclose, 3 sessions). JS: `js/u_init.js` +57/−9. Next NN 1071.

## Intent vs deliverable

Subject promises `addinv_core1` in exact C order: COIN botl, AMULET/CANDELABRUM/BELL/BOOK uhave+ACH, oartifact W_ART, mines/soko prize chain. Diff actually adds: new sync `addinv_core1(obj)` + single call site replacing the inline oartifact line + import-name extensions. Promise matches deliverable.

## Inventory

New JS: `addinv_core1` (u_init.js, sync). Changed: `addinv` call site (comment re-points `:984–991` → `:1082`, existing line moved into the new function). Re-pointed symbol check (`sym.mjs`, this iteration — all live sync):

```text
record_achievement js/insight.js:280   sync
is_mines_prize   js/mkobj.js:2729   sync
is_soko_prize    js/mkobj.js:2735   sync
set_artifact_intrinsic js/artifact.js:808   sync
```

No deleted exports. Import audit: mkobj/const names join existing edges; the insight.js line is names-only in effect — `imports.mjs --can js/u_init.js js/insight.js record_achievement` reports `ALREADY: u_init.js already statically imports insight.js`, and insight.js has no back-import of u_init.js. `record_achievement` is a hoisted `export function` (insight.js:280) called at runtime inside `addinv_core1` — no top-level TDZ read by construction.

## C ↔ JS fidelity

C locus: `invent.c:959–1005` (`addinv_core1`, full 47-line body read) + call site `:1082` (`addinv_core0` calls it before merge). C body:

```c
if (obj->oclass == COIN_CLASS) {
    disp.botl = TRUE;
} else if (obj->otyp == AMULET_OF_YENDOR) {
    if (u.uhave.amulet)
        impossible("already have amulet?");
    u.uhave.amulet = 1;
    record_achievement(ACH_AMUL);
} else if ... CANDELABRUM ... BELL ... BOOK ... (same shape)
} else if (obj->oartifact) {
    if (is_quest_artifact(obj)) {
        ...
        u.uhave.questart = 1;
        artitouch(obj);
    }
    set_artifact_intrinsic(obj, 1, W_ART);
}
if (is_mines_prize(obj)) {
    record_achievement(ACH_MINE_PRIZE);
    svc.context.achieveo.mines_prize_oid = 0;
    obj->nomerge = 0;
} else if (is_soko_prize(obj)) { ... }
```

Arm-by-arm: COIN → `disp.botl` ✓ (JS also sets `flags.botl` — extra but display-only, no RNG; both set together so no divergent state); AMULET → uhave.amulet + ACH_AMUL ✓; CANDELABRUM → menorah + ACH_CNDL ✓; BELL → bell + ACH_BELL ✓; BOOK → book + ACH_BOOK ✓; oartifact → questart/artitouch sub-arm then W_ART ✓ (JS keeps W_ART, names the questart arm — no live `artitouch`/`is_quest_artifact` export exists, clone-only, so a named omit is the only correct option); separate prize chain with achieveo oid clear + `nomerge=0` ✓. The already-have `impossible()` arms are dropped with a named reason (async-pline precedent, cf. artifact.js:496) — display-neutral, no RNG. Otyp compares use the `objectNames.indexOf(...)` idiom the file already uses for C otyp numbering. Call order (once, before the merge loop) matches `:1082`. No RNG anywhere on either side; pure state/achievement writes.

Callee closure: all four callees LIVE, no clones, no stubs in the shipped arms; questart is a named omit in this commit's map row.

## Hallucinations / overclaim

None. The D-log is explicit about what is NOT covered (prize arms share the body but no corpus session reaches them yet; Priest-92179@100 is a different mechanism under matching toplines — left for its own row rather than claimed). No dispatch-over-stub.

## Density

One C function, one JS module, one queue row. §2b-compliant.

## Verification

D-log claims `verify --fn disclose` → 1 PASS, 2 moved past, 1 unchanged + green/strict/cohort. Re-measured this iteration:

```text
verify disclose: baseline aa1e6c57~1 — 4 session(s) blocked on it
  scen-genesis-Barbarian-91118: moved → save_dungeon at step 113 (was 110)
  scen-wish-Monk-92031: PASS
  scen-wish-Priest-92098: moved → save_dungeon at step 88 (was 85)
  scen-wish-Priest-92179: still disclose at step 100 (matching toplines)
verify disclose: 1 PASS, 2 moved past, 1 unchanged, 0 worse → PROGRESS
```

Exact match, including the honest "unchanged" (not dressed as movement). Diff grep via commit (rule2 PASS, no DIAG/FORCE/seed gates); the js/ hunk shows only state writes and imports. The two moved sessions rest at Parked `save_dungeon` — correctly left alone per that row's misattribution verdict (true writers `done_in_by`/`print_mapseen`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
