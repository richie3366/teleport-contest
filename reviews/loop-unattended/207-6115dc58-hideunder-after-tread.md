# Review 207 — 6115dc58 — hack.c hideunder after tread (D-1245)

## Metadata
- Full / short hash: `6115dc589bd819c1eec1d973cf8e73b0a1c014cf` / `6115dc58`
- Parent: `293059d0` (D-1244). This file audits **this SHA only**. Archive row **Addressed:** D-1245 lacked the short hash; this review commit fills `6115dc58`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 01:39:23 +0200
- D-id: **D-1245**
- Stats: 11 files, +105 / −35 — `js/hack.js` +23 / −3; `js/cmd.js` +4 / −1; comment `js/mon.js`.
- Claims to close: Open `hack.c` hideunder after impact (queue wording; C is after tread, named from D-1229 / D-1214). Not container_impact. `reviews/loop-2026-08-15/` has no unpaid hideunder Must-fix.
- JS / map: `hack.js` `hero_hideunder_after_move`; `cmd.js` after tread; `mon.js` `hideunder` youmonst (D-1131); `c-js-map/turns.md`. Mimic unhide / container_impact / hitfloor `dropz(TRUE)` still named.
- Prior reviews this SHA claims to close: D-1229 named omit hideunder after tread.

## Intent vs deliverable

Git subject promises: “Match C hack.c hideunder after tread so a polyed hider or eel re-evaluates u.uundetected on the dest, instead of skipping hideunder after occupy.”

C `domove_core` (`hack.c:2944–2960`): tread `disturb_buried_zombies` if `!Levitation && !Flying && !Stealth && cwt >= WT_ELF/2`; then `if (hides_under(youmonst.data) || youmonst.data->mlet == S_EEL || u.dx || u.dy) hideunder(&youmonst)`; then mimic `U_AP_TYPE` furniture/object clear if `dx||dy`; then `check_leash`. `hideunder` (`mon.c:4726–4778`) youmonst writes `u.uundetected` (eel pool; `hides_under` under object; trap/ustuck clear).

Old JS: tread live (D-1214); `hideunder` live for teleds (D-1131); `domove` never called it after occupy.

The diff **does** the gate + `hideunder(youmonst)` after tread, before dest `newsym`. It does **not** pull mimic `m_ap_type` unhide, `check_leash` (already elsewhere), `container_impact_dmg`, or hitfloor `dropz(TRUE)`. Named. `can_hide_under_obj` / pet cursed / cockatrice skip stay named inside the callee (D-1131).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hero_hideunder_after_move` | C `:2949–2951`, **new wrapper** | |
| `hides_under` | C `mondata.h:35`, **imported live** | M1_CONCEAL |
| `data.mlet === 'S_EEL'` | C `S_EEL` mlet, **JS table string** | same encoding as other JS mlet tests |
| `u.dx \|\| u.dy` | C `u.dx`/`u.dy`, **wired** | leftover hidden non-hider clears |
| `hideunder` | C `:4726–4801`, **imported live** | D-1131 youmonst `u.uundetected` |
| mimic `m_ap_type` unhide | C `:2958–2960`, **named omit** | |
| `container_impact_dmg` / hitfloor `dropz(TRUE)` | C other sites, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** (`hideunder` has none on the youmonst path).

## C ↔ JS fidelity

Pinned C (`hack.c:2949–2951`):

```
    if (hides_under(gy.youmonst.data) || gy.youmonst.data->mlet == S_EEL
        || u.dx || u.dy)
        (void) hideunder(&gy.youmonst);
```

JS: `if (!(hides_under(data) || data.mlet === 'S_EEL' || u.dx || u.dy)) return; hideunder(you);` after occupy so `u.ux/uy` are dest (C `hideunder` is_u uses `u.ux,u.uy`). Match.

`dx||dy` is the important non-hider arm: a leftover `u.uundetected` tourist who steps must clear. Wait (`dx=dy=0`) only hiders/eels re-evaluate. Match.

Callee `hideunder` (already D-1131): ustuck / `utrap` / non-pit `t_at` → undetected false; eel `is_pool && !Is_waterlevel && (!Underwater || !couldsee)`; `hides_under` + `objects_at` + `!is_pool && !is_lava`. `can_hide_under_obj` / cursed pet pile / cockatrice skip still named — a cave spider can hide under coins C would reject. **Named callee omit, not a no-op `hideunder`.** Youmonst writes `u.uundetected`, not `mundetected`. Match C `:4775–4777`.

Swallow: JS `do_attack` success returns before tread/hideunder. C attack-success also returns before this locus. Journal canary “swallow skip” is that return, not a skipped C call on the occupy path. If swallow zeros `dx/dy` and fell through, only hider/eel would hideunder (C same).

Order vs dest `newsym`: C hideunder before `ux0!=ux` `newsym(ux0)` / `vision_recalc`. JS after tread, before `newsym(old)`. Match the claimed slot. Mimic unhide / `check_leash` still sit later in C and are still unnamed in JS occupy. Named.

## Hallucinations / overclaim

Subject + D-1245 say a polyed hider/eel re-evaluates `u.uundetected` on dest. **Gate + live youmonst `hideunder` are the hunk.** Stamping **Addressed:** D-1245 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C mimic unhide” or “Match C `can_hide_under_obj`.” Queue “after impact” meant the D-1229 follow-up; C is after **tread**, and the hunk is there.

## Density

One C caller site plus the already-live callee. ~20 JS lines. Right size. Did not glue container_impact.

## Branch-by-branch confirm

1. Tourist step `dx||dy`: `hideunder` clears leftover `uundetected`. Match.
2. Wait `dx=dy=0`, not hider/eel: skip. Match.
3. Cave spider on object, not pool/lava, not trapped: set `u.uundetected`. Match (filter named).
4. Same on trap non-pit: stay visible. Match.
5. Eel in pool, not waterlevel: hide. Match.
6. Eel on land: not pool, stay visible. Match.
7. `hides_under` in pool: C `!is_pool_or_lava` fails; JS `!is_pool && !is_lava`. Match D-1131.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **23**/23 (C order; tourist clear; swallow skip; cave spider hide/reveal/trap/pit/pool; eel pool vs land; west dx; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless Upolyd `hides_under`/eel or leftover `u.uundetected`. Cadence this audit: full `sessions` **44**/44.

## Actionable C-wrongs

None for Must-fix. Caller through live `hideunder` youmonst `u.uundetected`. Callee filters (`can_hide_under_obj`, cockatrice, pet cursed) are named D-1131 omits, not a wrapper that sets `uundetected=1` unconditionally.

Named omits (map, not Must-fix):

1. mimic `m_ap_type` unhide after this call
2. `container_impact_dmg`; hitfloor `dropz(TRUE)`
3. `hideunder` `can_hide_under_obj` / pet cursed / cockatrice / You_see

Do not Must-fix “skip `dx||dy` for non-hiders.” Do not pull giant pickup.

## Callers / RNG ledger

C: `domove_core` after tread. JS `cmd.js` `domove` same slot. No RNG. Public fortress is not evidence a polyed hider hid.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: after tread, hiders/eels and any `dx||dy` step now call live `hideunder(&youmonst)`; mimic unhide and container_impact stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1245 `6115dc58`.
