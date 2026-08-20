# Review 251 — 44b22432 — objnam.c wizterrainwish trap loop (D-1289)

## Metadata
- Full / short hash: `44b224325bf62390824c286f268a738caf4739e8` / `44b22432`
- Parent: `b741fb93` (D-1288). This file audits **this SHA only**. Archive row **Addressed:** D-1289 `44b22432` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 16:33:58 +0200
- D-id: **D-1289**
- Stats: 10 files, +140 / −38 — `js/readobjnam.js` +55 / −~8; comment `js/zap.js`.
- Claims to close: Open `objnam.c` wizterrainwish traps (named from D-1279 / review **241**). Not door/wall. `reviews/loop-2026-08-15/` has no unpaid trap-wish Must-fix.
- JS / map: `readobjnam.js` `wizterrainwish` / `str_start_is`; live `trap.js` `maketrap` / `trapname`; `c-js-map/turns.md`. Door/wall (D-1290); secret corridor; drawbridge; `pooleffects`; `trapped ` preparse named (preparse shipped next SHA).
- Prior reviews this SHA claims to close: **241** named omit trap loop after furniture `switch_terrain`.

## Intent vs deliverable

Git subject promises: “Match C objnam.c wizterrainwish so a wizard trap-name wish calls maketrap (hole→ROCKTRAP, portal to nowhere), instead of skipping the trap loop.”

C `wizterrainwish` (`objnam.c:3563–3582`) **before** furniture: `for (trap = NO_TRAP+1; trap < TRAPNUM; trap++)` `trapname(trap, TRUE)` + `str_start_is(bp, tname, TRUE)`; first hit: `is_hole && !Can_fall_thru(&u.uz)` → `ROCKTRAP`; `maketrap`; success `pline("%s%s.", An(tname), trap!=MAGIC_PORTAL ? "" : " to nowhere")` with `t->ttyp` refresh; fail `Creation of %s failed.` `an(tname)`; **always** `return &hands_obj`. `trapname` `:7100–7155` with override TRUE skips Hallucination and returns `defsyms[trap_to_defsym].explanation`. `str_start_is` (`hacklib.c:213–237`): caseblind prefix; chkstr may be shorter than str. Dispatch still D-1279 wiztrap `:4975–4979`.

Old JS: furniture envelope only; trap names fell through (or missed).

The diff **does** the loop first via live `maketrap`/`trapname` and a `str_start_is` clone. It does **not** port door/wall, secret corridor, drawbridge under, lava `pooleffects`, or `trapped `/`looted` preparse. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| trap loop | C `:3563–3582`, **new** | before fountain |
| `str_start_is` | C `hacklib.c:213`, **clone** | caseblind prefix; empty-exhaustion order matches |
| `trapname` | C `trap.c:7100`, **imported live** | `_override` unused; call site passes `true` (ignore hallu) |
| `maketrap` | C `trap.c:841`, **imported live** | D-1280 PIT/HOLE `set_levltyp`; rejects TRAPPED_DOOR/CHEST |
| `is_hole` / `Can_fall_thru` | C `trap.h` / `dungeon.c`, **imported live** | hole/trapdoor; dig-down or stronghold |
| `An` / `an` | C `objnam.c`, **imported live** | success `An`; fail `an` |
| `HANDS_OBJ` | C `&hands_obj`, **pre-existing** | always after a name hit |
| door/wall / SCORR | C `:3740–3845`, **named omit** | |
| `trapped ` preparse | C `:4038–4041`, **named omit** | D-1290 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dynamic `import('./trap.js')` is relative ESM. Rule #2 clean. **No new gameplay RNG** in the loop (`maketrap` statue/boulder helpers are C’s when those types hit).

## C ↔ JS fidelity

Pinned C (`objnam.c:3563–3581`):

```
    for (trap = NO_TRAP + 1; trap < TRAPNUM; trap++) {
        tname = trapname(trap, TRUE);
        if (!str_start_is(bp, tname, TRUE))
            continue;
        if (is_hole(trap) && !Can_fall_thru(&u.uz))
            trap = ROCKTRAP;
        if ((t = maketrap(x, y, trap)) != 0) {
            trap = t->ttyp;
            tname = trapname(trap, TRUE);
            pline("%s%s.", An(tname),
                  (trap != MAGIC_PORTAL) ? "" : " to nowhere");
        } else {
            pline("Creation of %s failed.", an(tname));
        }
        return &hands_obj;
    }
```

JS copies that order, including mutating the loop index to `ROCKTRAP` then **returning** (so the next `trap++` never runs). `trapname` explanations match `defsym.h` (`"arrow trap"` … `"anti-magic field"` via PCHAR2 desc, `"trapped door"`). Override TRUE: JS never hallu-names; C with TRUE also uses defsym. Call-site match.

`str_start_is` clone: str exhausted → chkstr must be exhausted; chkstr exhausted → TRUE; caseblind `toLowerCase`. Wish `"arrow trap extra"` matches `"arrow trap"`; `"arrow"` does not. `"spiked pit"` does not prefix-match `"pit"`. First ID wins. Match `hacklib.c:221–230`.

`maketrap` is live D-1280 (STONE/SCORR → CORR for PIT/HOLE), not a no-op. Furniture reject still returns `hands_obj` after `"Creation of … failed."` — C same, not a fall-through to fountain. This is **not** “Match C dispatch, callee is a stub.”

Hole on `hardfloor` / botlevel: `Can_fall_thru` false → ROCKTRAP then maketrap. Portal success appends `" to nowhere"` after `An` (no extra space before `to` — C `"%s%s."` with `" to nowhere"`). Match.

`trapped door` at **this** SHA still matches `TRAPPED_DOOR` then `maketrap` returns null (named preparse). D-1290 strips `trapped ` first so remaining `"door"` hits the door arm. Review 241 named that prefix; do not treat the D-1289 fail-path as a trap-loop C-wrong.

## Hallucinations / overclaim

Subject + D-1289 say a trap-name wish calls `maketrap` (hole→ROCKTRAP, portal to nowhere). **The loop + live callees are the hunk.** Stamping **Addressed:** D-1289 is fair. Do **not** stamp “Match C door/wall.” Do **not** stamp “Match C `trapped ` preparse.” Do **not** stamp “Match C hallu `trapname` without override.” Do **not** stamp “Match C `looted` prefix.”

## Density

One C loop at the top of `wizterrainwish` plus the `str_start_is` helper. ~55 JS lines. Did not glue door/wall. Right size.

## Branch-by-branch confirm

1. Wizard `"pit"` on STONE: `maketrap` PIT; D-1280 typ→CORR; `An("pit")`. Match.
2. `"spiked pit"`: SPIKED_PIT, not PIT (prefix). Match ID order.
3. `"arrow trap extra"`: prefix hit ARROW_TRAP. Match `str_start_is`.
4. `"hole"` + `!Can_fall_thru`: ROCKTRAP then maketrap. Match `:3571–3572`.
5. `"hole"` + Can_fall_thru: HOLE. Match.
6. `"magic portal"` success: `"A magic portal to nowhere."` Match `:3576–3577`.
7. `"pit"` on fountain: maketrap fail; `"Creation of a pit failed."`; `HANDS_OBJ` (no fountain). Match return.
8. `"trapped door"`: TRAPPED_DOOR fail + `hands_obj`. Named preparse (D-1290).
9. `"fountain"`: no trap prefix; furniture arm (D-1279) still `switch_terrain`. Match loop miss.
10. Non-wizard / wizkit: skip `readobjnam_wish` terrain. Match `:4976`. Public-unhit unless a wizard wishes a `trapname`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **20**/20; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a wizard wishes a trap by `trapname`. Cadence this audit: full `sessions` at HEAD `67c863ad` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Loop order, `str_start_is` polarity, hole rewrite, portal suffix, fail/`hands_obj`, and live `maketrap` match C `:3563–3582`.

Named omits (map, not Must-fix):

1. Door / wall / secret corridor (Open then D-1290 for door/wall)
2. Drawbridge under; lava `pooleffects`; water/fire_damage_chain
3. `trapped `/`looted`/`disturbed` preparse (trapped shipped D-1290)
4. Hallu `trapname` when override is false (not this call site)

Do not Must-fix “`str_start_is` is a local clone.” Do not Must-fix “JS `trapname` ignores hallu always.” Do not pull door/wall this SHA.

## Callers / RNG ledger

C: `readobjnam` wiztrap ← `makewish`. JS: `readobjnam_wish` ← `makewish`. No new positional RNG in the loop. Public fortress is not evidence a wizard dropped a pit.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: trap-name wishes now call live `maketrap` before furniture; door/wall and `trapped ` preparse stayed named for D-1290.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1289 `44b22432`.
