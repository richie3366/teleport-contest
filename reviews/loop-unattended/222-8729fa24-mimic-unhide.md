# Review 222 — 8729fa24 — hack.c mimic unhide after hideunder (D-1260)

## Metadata
- Full / short hash: `8729fa248e84caea968adb7db9fef6f0c4701e88` / `8729fa24`
- Parent: `78707282` (D-1259). This file audits **this SHA only**. Archive row **Addressed:** D-1260 `8729fa24` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 08:56:20 +0200
- D-id: **D-1260**
- Stats: 10 files, +120 / −38 — `js/hack.js` +22; `js/cmd.js` +3 (call site).
- Claims to close: Open `hack.c` mimic unhide (named from D-1245 / review **207**). Not hideunder. `reviews/loop-2026-08-15/` has no unpaid mimic Must-fix.
- JS / map: `hack.js` `hero_mimic_unhide_after_move`; `cmd.js` `domove`; `c-js-map/turns.md`. `display_self` U_AP_TYPE glyphs / swap-with-pet `seemimic` still named.
- Prior reviews this SHA claims to close: **207** named omit mimic `m_ap_type` unhide after hideunder.

## Intent vs deliverable

Git subject promises: “Match C hack.c domove_core so a stepping hero imitating furniture or an object drops that appearance, instead of staying disguised after hideunder.”

C `domove_core` (`hack.c:2953–2960`) after `hideunder(&youmonst)` (`:2949–2951`), before `check_leash`:

```
    if ((u.dx || u.dy) && (U_AP_TYPE == M_AP_OBJECT
                           || U_AP_TYPE == M_AP_FURNITURE))
        gy.youmonst.m_ap_type = M_AP_NOTHING;
```

`U_AP_TYPE` is `youmonst.m_ap_type & M_AP_TYPMASK` (`monst.h:69–71`). `M_AP_NOTHING=0`, `FURNITURE=1`, `OBJECT=2`, `MONSTER=3`. Assignment is `M_AP_NOTHING` (clears type **and** `M_AP_F_DKNOWN`); `mappearance` leftover. Not `seemimic`.

Old JS: hideunder live (D-1245); this snippet omitted, so a gold-mimic / `#monster` furniture hero kept `m_ap_type` after a real step.

The diff **does** the gate + assignment in a helper after hideunder, before dest `newsym`. It does **not** port `display_self` U_AP_TYPE glyph arms or pet-swap `seemimic`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hero_mimic_unhide_after_move` | C `:2953–2960`, **new** | JS split of `domove` into `cmd.js` |
| `M_AP_TYPMASK` / `M_AP_NOTHING` / `OBJECT` / `FURNITURE` | C `monst.h`, **imported live** | 0x7 / 0 / 2 / 1 |
| hideunder call order | C `:2949–2951` then this, **wired** | after tread (D-1245) |
| `check_leash` | C `:2962`, **pre-existing** | JS D-1005 after occupy, before this helper |
| dest `newsym` | C `:2970`, **pre-existing** | after the helper |
| `display_self` U_AP_TYPE | C `display.h:253–259`, **named omit** | furniture/object/monster glyphs |
| `domove_swap_with_pet` `seemimic` | C, **named omit** | |
| `bump_mon` `stumble_onto_mimic` | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No RNG.** Helper is a clone of the C snippet (not a fake `seemimic`). The assignment is the C effect.

## C ↔ JS fidelity

JS:

```
    if (!(u.dx || u.dy)) return;
    const ap = (you.m_ap_type | 0) & M_AP_TYPMASK;
    if (ap === M_AP_OBJECT || ap === M_AP_FURNITURE) {
        you.m_ap_type = M_AP_NOTHING;
    }
```

`(dx||dy)` then type mask then `M_AP_NOTHING`. `M_AP_MONSTER` (cloned Wizard) keeps appearance. Zero-dir occupy (swallow onto ustuck) keeps appearance. `M_AP_F_DKNOWN` (0x8) does not change the type test; assigning `NOTHING` clears it, like C’s full-byte store. `mappearance` is not cleared — C same.

`cmd.js` calls the helper immediately after `hero_hideunder_after_move()`, before dest `newsym`. C is hideunder → unhide → `check_leash` → `newsym`. JS `check_leash` already ran after occupy (D-1005). Leash stretch does not read `m_ap_type`. Relative to hideunder and `newsym`, the snippet is in C order. This is **not** “Match C dispatch, callee is a stub”: `m_ap_type` is written. Later `M_AP_TYPE(youmonst)` sees NOTHING.

`display_self` still named: dest `newsym` may keep painting furniture/object until that arm exists. The **state** drop matches C; the **glyph** path is the named omit, like review **207** leaving unhide named after shipping hideunder.

## Hallucinations / overclaim

Subject + D-1260 say a stepping furniture/object imitator drops that appearance instead of staying disguised. **The `m_ap_type = M_AP_NOTHING` write after hideunder is the hunk.** Stamping **Addressed:** D-1260 is fair for the C snippet. Do **not** stamp “Match C `display_self` U_AP_TYPE glyphs” or “Match C swap-with-pet `seemimic`.” Helper comment “before check_leash” describes C, not the JS D-1005 split — not a fake unhide.

## Density

One C `if` plus the `cmd.js` site after hideunder. ~20 JS lines. Right size. Did not glue `hitmsg`.

## Branch-by-branch confirm

1. Step `dx||dy`, `M_AP_OBJECT`: type → NOTHING, mappearance leftover. Match.
2. Step, `M_AP_FURNITURE`: same. Match.
3. Step, `M_AP_MONSTER`: unchanged. Match.
4. Step, `M_AP_NOTHING`: unchanged. Match.
5. Zero-dir (`!dx && !dy`): return, keep furniture/object. Match.
6. `M_AP_F_DKNOWN | OBJECT`: mask sees OBJECT; assign 0. Match.
7. Hideunder still runs first (hider/eel / any step). Match C order.
8. Dest `newsym` after. Match relative order.
9. Pet swap `seemimic`: not this function. Match the skip.
10. Public Tourist not imitating: no-op. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Constants match C enums. Plain ESM.

## Verification

Journal: private canary **15**/15 (C order+U_AP_TYPE; helper after hideunder; object/furniture drop; leftover mappearance; zero-dir keep; M_AP_MONSTER keep; F_DKNOWN mask; west dx; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless the hero steps while `U_AP_TYPE` is furniture/object (eat-mimic gold / `#monster`). Cadence this audit: full `sessions` at HEAD `e2aa4dbe` **44**/44 Scr **11405**/11405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. The write matches C. `display_self` still showing a leftover glyph is a named omit of a later function, not an unhide that leaves `m_ap_type` set.

Named omits (map, not Must-fix):

1. `display_self` U_AP_TYPE furniture/object/monster glyphs (`display.h:253–259`)
2. `domove_swap_with_pet` `seemimic`
3. `domove_bump_mon` `stumble_onto_mimic`

Do not Must-fix “JS `check_leash` is before hideunder (D-1005).” Do not Must-fix “helper instead of inlining in `cmd.js`.”

## Callers / RNG ledger

C: only `domove_core`. JS only `cmd.js` `domove` after hideunder. No RNG. Public fortress is not evidence a mimic-hero stepped.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a stepping furniture/object imitator now clears `m_ap_type` like C; `display_self` U_AP_TYPE glyphs stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1260 `8729fa24`.
