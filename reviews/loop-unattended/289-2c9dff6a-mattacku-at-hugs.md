# Review 289 — 2c9dff6a — mhitu.c mattacku AT_HUGS grab/crush (D-1327)

## Metadata
- Full / short hash: `2c9dff6a46ec099b7d53f46bae9894efa3ed5a4d` / `2c9dff6a`
- Parent: `9570f32a` (D-1326). This file audits **this SHA only**. Archive **Addressed:** D-1327 `2c9dff6a` already has the short hash (filled by D-1328).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 01:57:02 +0200
- D-id: **D-1327**
- Stats: 9 files, +221 / −39 — `js/mhitu.js` +158 / −~20.
- Claims to close: Open `mhitu.c` AT_HUGS (named from D-1326 / reviews **271**). Not explmu. Not hmonas AT_HUGS (review **212** / D-1250 is the poly’d **hero** hug). `reviews/loop-2026-08-15/` has no unpaid monster-hug Must-fix.
- JS / map: `mhitu.js` `mattacku` / `mhitm_ad_phys_u` / `u_slip_free` / `failed_grab`; `c-js-map/turns.md`. gazemu / AD_WRAP `mhitm_ad_wrap` caller / mhitu AD_DRIN still named at this SHA.
- Prior reviews this SHA claims to close: **271** named AT_HUGS with explmu; **212** is a different C locus (`hmonas`).

## Intent vs deliverable

Git subject promises: “Match C mhitu.c mattacku AT_HUGS so an owlbear-class hug actually grabs or crushes after two hits, instead of falling out of the attack switch.”

C `mattacku` (`mhitu.c:823–830`):

```
        case AT_HUGS: /* automatic if prev two attacks succeed */
            /* Note: if displaced, prev attacks never succeeded */
            if ((!range2 && i >= 2 && sum[i - 1] && sum[i - 2])
                || mtmp == u.ustuck) {
                if (!failed_grab(mtmp, &gy.youmonst, mattk))
                    sum[i] = hitmu(mtmp, mattk);
            }
            break;
```

C `mhitm_ad_phys` mhitu (`uhitm.c:4023–4037`): `AT_HUGS && !sticks(pd)` then `!ustuck && rn2(2)` → `u_slip_free` (zero dmg + `M_ATTK_MISS`) else `set_ustuck` + `"grabs you!"`; else if `ustuck == magr` → `exercise(A_STR, FALSE)` + choke (rope golem) / crush. **Else** is the weapon/`hitmsg` arm — hugs do **not** fall into silver/poison. After the if/else there is no extra hug epilogue.

C `u_slip_free` (`mhitu.c:1045–1085`): AT_ENGL never; cloak else suit else shirt; AD_DRIN overwrites with `uarmh`; greased/`OILSKIN_CLOAK` && (`!cursed || rn2(3)`); WRAP verb vs grab-cannot-hold; grease `!rn2(2)` wears off.

C `failed_grab` (`mhitm.c:597–639`): unsolid/`notonhead` **and** (AT_HUGS / AD_WRAP / AD_STCK / AD_DGST); vis/youmonst pline gulp/adhere/grab pass-through or tail miss.

Old JS: no `case AT_HUGS`; `mhitm_ad_phys_u` treated hugs as ordinary `hitmsg`; `failed_grab` returned true with no pline.

The diff **does** the auto-hit gate, PHYS grab/crush, live `u_slip_free`, and the pass-through pline. It does **not** wire `mhitm_ad_wrap` (AD_WRAP still named as the **caller**). Named. It does **not** port gazemu.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mattacku` `AT_HUGS` | C `:823–830`, **wired** | `AT_HUGS=7` exported from `mhitm.js` |
| `hitmu` | C, **imported live** | via existing `mhitm_adtyping_u` |
| `mhitm_ad_phys_u` hug | C `:4023–4037`, **wired** | `return` skips weapon else — matches C if/else |
| `rn2(2)` grab | C `:4024`, **live RNG** | |
| `u_slip_free` | C `:1045–1085`, **new export** | not a no-op |
| `cloak_simple_name` | C `objnam.c:5492–5509`, **clone** | robe/wrapping/smock-vs-apron |
| `sticks` | C `mondata.c`, **clone** | AD_STCK / WRAP&&!ENGL / AT_HUGS; do not import `monmove.js` |
| `attacktype_aatyp` | C `attacktype`, **clone** | `mattk[].aatyp` |
| `set_ustuck` | C `mon.c`, **pre-existing live** | |
| `failed_grab` pline | C `:609–635`, **wired** | was silent true; `some_mon_nam` tail still a stand-in |
| `PM_ROPE_GOLEM` choke | C `:4036`, **wired** | `mndx` / `mnum` |
| AD_WRAP `mhitm_ad_wrap` | C, **named omit** | helper is live; caller is not |
| gazemu | C `:832`, **named omit** this SHA | |
| hmonas AT_HUGS | C `uhitm.c:5671`, **already D-1250** | different locus |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG on the hug path:** auto-hit itself has none; `hitmu` still `d(damn,damd)` then `rn2(2)` when `!ustuck`; slip `rn2(3)` / grease `rn2(2)`; `failed_grab` has **no** RNG. `sticks` poly skips the hug if and burns **no** `rn2(2)` (C else is weapon). Range2 + not ustuck: no `rn2`.

## C ↔ JS fidelity

Auto-hit predicate is call-for-call `:825–826`. `sum[i-1] && sum[i-2]` uses C `M_ATTK_HIT=0x1` (truthy) vs `MISS=0`. Displaced HTH already `wildmiss`s without setting `sum`, so hugs do not auto-hit unless `ustuck` — C comment at `:824`. JS copies that. `ustuck` still hugs at range (`\|\| mtmp === u.ustuck` is outside `!range2`).

PHYS hug: JS `return`s after the hug block so the weapon/`hitmsg` else does not run. That is C’s if/else, not an early return that drops a shared epilogue — silver/poison/AC-in-phys sit only in the else. Leftover `mhm.damage` from `hitmu`’s `d()` still flows to hitmu’s later AC/`mdamageu` unless slip zeroed it. Failed `rn2(2)` (not grabbing, not already held) also leaves dice — C does nothing in the hug if then still damages. Match.

`u_slip_free`: AT_ENGL false; `uarmc` else `uarm` else `uarmu`; AD_DRIN → `uarmh`; oilskin undiscovered uses `cloak_simple_name` not `xname`. Grease wear-off `update_inventory` via dynamic `invent.js` (ESM cycle, not fs). AD_WRAP verb is live in the **helper**; `mhitm_ad_wrap` still does not call it. Named caller omit, not a dead helper.

`failed_grab`: mhitu `mdef` is youmonst so the vis gate is always true (`mdef == youmonst`). magr is the monster → `s_suffix(Monnam)` not `"Your"`. `some_mon_nam` tail is `s_suffix(mon_nam)+' tail'` — named stand-in. Predicate matches C (unsolid/`notonhead` **and** hug/wrap/stick/digest). Previously silent true was the C-wrong; this SHA prints.

`sticks` clone matches `mondata.c` (AD_STCK, WRAP without AT_ENGL, or AT_HUGS). Hero-owlbear poly takes the weapon else — C. Do not import `monmove.js` `sticks` (don’t-recheck).

Hallucination check: dispatch is `hitmu` / `mhitm_ad_phys_u`, not a stub. `u_slip_free` is the real C function body.

## Hallucinations / overclaim

Subject + D-1327 say an owlbear-class hug grabs or crushes after two hits instead of falling out of the switch. **The case plus PHYS hug if plus `u_slip_free` are the hunk.** Stamping **Addressed:** D-1327 is fair. Do **not** stamp “Match C `mhitm_ad_wrap` AD_WRAP.” Do **not** stamp “Match C hmonas AT_HUGS” (already D-1250). Do **not** stamp “Match C gazemu.” Do **not** treat fortress PASS as an owlbear `"grabs you!"`.

## Density

One `switch` arm plus the PHYS hug envelope C actually runs for that arm (`u_slip_free`, `sticks`, `failed_grab` pline). ~110 executable JS lines. gazemu correctly not glued. Right size (§2b). Related deferral AD_WRAP caller stays named on the same helper.

## Branch-by-branch confirm

1. Adjacent, `i>=2`, both prior `sum` hit, `!ustuck`: `failed_grab` then `hitmu` then `rn2(2)` grab. Match `:825–828` + `:4024–4032`.
2. Already `ustuck` even at `range2`: crush/choke, no new `rn2(2)`. Match `:826` + `:4033–4037`.
3. Rope golem: `"choked"`. Match `:4036`.
4. Greased cloak / oilskin: slip, `damage=0`, `M_ATTK_MISS`. Match `:1065–1082`.
5. AT_ENGL: `u_slip_free` false. Match `:1054–1055`.
6. `sticks(youmonst)`: skip hug if, weapon else. Match `:4023` false → else.
7. Unsolid: pass-through pline, no `hitmu`. Match `:827` + `:633–635`.
8. Displaced / `range2` / `i<2` without ustuck: no hug. Match.
9. AD_WRAP eel. Still omitted caller. Named.
10. **Public-unhit** unless a session is hugged.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `AT_HUGS` is `monattk.h` 7, not a recorded glyph. Dynamic `import('./invent.js')` is an ESM cycle. Plain ESM.

## Verification

Journal: private canary **27**/27; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on monster hugs. Cadence this audit: full `sessions` at HEAD `a7a5a835` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not evidence `rn2(2)` grabbed.

## Actionable C-wrongs

None for Must-fix. Auto-hit gate, PHYS grab/crush, `u_slip_free`, and `failed_grab` pline match C `:823–830` / `:4023–4037` / `:1045–1085` / `:597–639`. Helpers are not no-ops.

Named omits (map, not Must-fix):

1. `mhitm_ad_wrap` AD_WRAP caller of `u_slip_free` (queue Open)
2. `some_mon_nam` tail (stand-in)
3. gazemu (next SHA)
4. mattackm AT_HUGS

Do not Must-fix “local `sticks` clone” (matches C; `monmove.js` import is banned). Do not Must-fix hmonas AT_HUGS (D-1250). Do not Must-fix the PHYS `return` (C if/else).

## Callers / RNG ledger

C: `mattacku` AT_HUGS → `hitmu` → PHYS hug `rn2(2)` / crush. JS: same. Public fortress is not evidence the grab `rn2` or choke pline fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: owlbear-class hugs now auto-hit after two successes (or while holding) and grab/crush/`u_slip_free`; AD_WRAP still does not call the helper.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1327 `2c9dff6a` already filled by the next port commit.
