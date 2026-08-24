# Review 388 — 19c24f62 — potion.c peffect_polymorph (D-1428)

## Metadata
- Full / short hash: `19c24f62354950ad259f39018a39470804ba34fe` / `19c24f62`
- Parent: `91c11733` (D-1427). This file audits **this SHA only** (sixth of nine `js/` commits since review **382**). Archive **Addressed:** D-1428 `19c24f62` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 01:12:28 +0200
- D-id: **D-1428**
- Stats: 10 files, +146 / −27 — `js/potion.js` +43 / −1; `js/polyself.js` +19 / −6.
- Claims to close: Open `potion.c` `peffect_polymorph` (named from D-1427). Not gain energy. `reviews/loop-2026-08-15/` has no unpaid polymorph-quaff Must-fix.
- JS / map: `potion.js` `peffect_polymorph` / `peffects`; callee `polyself.js` `polyself` (LOW_CTRL downgrade). `c-js-map/turns.md`. potionhit / mix / remaining peffects still named.
- Prior reviews this SHA claims to close: **387** follow-up named `peffect_polymorph`.

## Intent vs deliverable

Git subject promises: “Match C potion.c peffect_polymorph so quaffing a potion of polymorph transforms (or getlin when blessed) instead of doing nothing.”

C `potion.c` `peffect_polymorph` `:1318–1330`:

```
    You_feel("a little %s.", Hallucination ? "normal" : "strange");
    if (!Unchanging) {
        if (!otmp->blessed || (u.umonnum != u.umonster))
            polyself(POLY_NOFLAGS);
        else {
            polyself(POLY_CONTROLLED|POLY_LOW_CTRL);
            if (u.mtimedone && u.umonnum != u.umonster)
                u.mtimedone = min(u.mtimedone, rn2(15) + 10);
        }
    }
```

`peffects` `:1417–1418` then falls through to `return -1` (`:1424`, useup). `Unchanging` is `youprop.h:370–372` `H||E` ≡ `uprops[UNCHANGING]`. Callee `polyself.c` `:506–508` clears `forcecontrol` when `LOW_CTRL` and (draconian / monsterpoly / vamp / were) so blessed poly does **not** `getlin` on those forms. Unchanging **skips** `polyself` (no `"You fail to transform!"` — that pline is only inside `polyself` `:483–485`). SPE_POLYMORPH is not this case.

Old JS: POT_POLYMORPH hit `default` (“not implemented”, return 0, no useup). `polyself` voided `POLY_LOW_CTRL`.

The diff **does** add the helper, wire the case (`return -1`), OR uprops in a local `Unchanging`, and implement the LOW_CTRL downgrade. It **does not** port potionhit/mix or remaining peffects. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peffect_polymorph` | C `:1318–1330`, **wired** | |
| `peffects` POT_POLYMORPH | C `:1417–1418`, **wired** | return -1 → useup |
| `Unchanging` | C `youprop.h:372`, **clone via uprops** | conferral amulet writes extrinsic |
| `Hallucination()` | C, **imported live** | `do_name.js` |
| `polyself` | C `polyself.c:468+`, **imported live** | getlin / shock / polymon |
| `POLY_LOW_CTRL` downgrade | C `:506–508`, **wired** | was void |
| `rn2(15)+10` | C `:1327`, **wired** | 10..24 |
| controllable_poly getlin | C `:481/:513`, **named omit** | ring of poly control, unblessed |
| potionhit / mix | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** unblessed `polyself` may `rn2(20)` system shock + `rnd(30)`; blessed `rn2(15)` duration clamp; `getlin` itself is not RNG. Public fortress never quaffs this potion.

## C ↔ JS fidelity

`You_feel("a little strange/normal.")` Match (`You_feel` prefixes `"You feel "`). `!Unchanging` then unblessed **or** `umonnum != umonster` → `POLY_NOFLAGS`; else `POLY_CONTROLLED|POLY_LOW_CTRL` then `mtimedone = min(mtimedone, rn2(15)+10)` while still poly. Match `:1321–1328` branch order. Flags `0x00` / `0x01` / `0x08` match `hack.h:730–734`. `peffects` return `-1` matches C’s post-switch return (useup). Default “not implemented” no longer swallows this otyp.

Unchanging skip does **not** call `polyself`, so no `"You fail to transform!"`. Match the potion keep-path. The local helper ORs flats **and** `uprops[UNCHANGING]` (amulet conferral writes extrinsic only, same D-1423 lesson). Match `youprop.h:372`.

LOW_CTRL: `forcecontrol && low_control && (draconian \|\| monsterpoly \|\| isvamp \|\| iswere)` → `forcecontrol = false`. Match `:506–508`. Blessed original-form human then `getlin`. Blessed already-poly uses `POLY_NOFLAGS` (no getlin). Were/vamp/dragon-armor blessed: downgrade, no getlin. Match. `POLY_REVERT` still named (potion does not pass it).

`polyself` is not a stub: Unchanging fail-pline, system shock `rn2(20)>CON`, forcecontrol `getlin` / ESC Never mind, `name_to_mon` / `polymon`. `controllable_poly` (ring, unblessed) still does not open getlin — named callee omit, not this potion’s blessed `forcecontrol` arm.

Hallucination check: “Match C `polyself` getlin when blessed” while **`polyself` is the live export and LOW_CTRL is no longer voided** is not a dispatch-stub lie. “Match C ring-of-poly-control getlin on an unblessed potion” **would** be. Do **not** stamp “Match C potionhit POT_POLYMORPH.” Do **not** stamp “Match C SPE_POLYMORPH.”

## Hallucinations / overclaim

Subject says quaffing transforms, or getlin when blessed, instead of doing nothing. **True** for unblessed `POLY_NOFLAGS`, blessed original-form `getlin`, blessed already-poly no getlin, Unchanging feel-only, hallu “normal”, `mtimedone` 10..24. **False until named for potionhit/mix and unblessed Poly_control getlin.** Stamping **Addressed:** D-1428 for `:1318–1330` + `:506–508` is fair. Do **not** treat fortress PASS as a polymorph quaff.

## Density

One peffect plus the callee flag the blessed arm needs. ~50 lines. Playbook §2b caller/callee. Did not glue gain energy. Right size.

## Branch-by-branch confirm

1. Unchanging: feel, no poly, no fail-pline, useup. Match.
2. Hallu: “a little normal.” Match.
3. Unblessed: `POLY_NOFLAGS` (shock possible). Match.
4. Blessed original: `getlin`; ESC Never mind. Match forcecontrol.
5. Blessed already `umonnum!=umonster`: no getlin. Match.
6. Blessed were/vamp/dragon-armor: LOW_CTRL clears forcecontrol. Match.
7. Still Upolyd after blessed: `mtimedone` min `rn2(15)+10`. Match.
8. Gain energy still default at this SHA. Named.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `rn2(15)+10` is C, not a recorded duration. Plain ESM.

## Verification

Journal: private canary **15**/15 (C/JS grep; Unchanging feel no fail-to-transform; hallu normal; blessed original getlin ESC Never mind; blessed jackal mtimedone 10..24; blessed already-poly no getlin; were LOW_CTRL skips getlin; uncursed POLY_NOFLAGS; gain energy still not-implemented; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD. Fortress PASS is not a polymorph quaff.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Feel / Unchanging skip / blessed getlin / LOW_CTRL / `mtimedone` clamp match `:1318–1330` + `:506–508`. `polyself` is live, not a no-op.

Named omits (map / Open, not Must-fix):

1. `controllable_poly` getlin (unblessed + Polymorph_control)
2. potionhit / potionbreathe / mix / dipsink POT_POLYMORPH
3. `polyself` were/vamp merge / POLY_REVERT / placeholder substitutes
4. remaining peffects (gain energy / acid / gain level / blindness)

Do not Must-fix “Unchanging should print fail to transform on quaff” (C skips `polyself`). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `dopotion` → `peffects`. New RNG: `rn2(15)` on the blessed-success clamp; `polyself` shock `rn2(20)`/`rnd(30)` on `POLY_NOFLAGS`. Public fortress does not quaff this.

Verdict: **ACCEPT-WITH-DEBT**
