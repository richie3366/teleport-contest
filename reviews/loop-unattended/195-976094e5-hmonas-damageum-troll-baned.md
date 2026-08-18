# Review 195 — 976094e5 — uhitm.c `hmonas`/`damageum` `troll_baned` ternary/`uwep` (D-1233)

## Metadata
- Full / short hash: `976094e5a8cc7258d26754dc8da381f55494112f` / `976094e5`
- Parent: `83624a46` (D-1232). This file audits **this SHA only**. Archive row **Addressed:** D-1233 lacked the short hash; this review commit fills `976094e5`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 22:32:28 +0200
- D-id: **D-1233**
- Stats: 11 files, +357 / −46 — `js/uhitm.js` +265 / −8; `js/mhitm.js` comments; Open refill 7→12.
- Claims to close: Open `uhitm.c` `hmonas` `troll_baned` (named from D-1223 / D-1232 / review **185**). Not hmon_hitmon. `reviews/loop-2026-08-15/` has no unpaid hmonas Must-fix.
- JS / map: `uhitm.js` `damageum` / `hmonas` / `do_attack` Upolyd. `c-js-map/data.md`. AT_HUGS/EXPL/ENGL / altwep / `demonpet` spawn still named.
- Prior reviews this SHA claims to close: **185** item 3 (`:4866–4880`); **194** said not that SHA.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c damageum troll_baned so a poly AT_WEAP/AT_CLAW Trollsbane kill copies mkcorpstat_norevive (ternary/uwep), instead of leaving the revive-ban unset.”

C `damageum` (`uhitm.c:4835–4884`): dice into `mhm`; demonpet gate; `mhitm_adtyping(&youmonst)`; then `mhp -= damage`; on `DEADMONSTER`, if AT_WEAP||AT_CLAW `gm.mkcorpstat_norevive = troll_baned(mdef, uwep) ? TRUE : FALSE` (C FIXME: two-weapon secondary still checks `uwep`); tame unseen / `!verbose` / else `killed`/`xkilled`; always FALSE after. Caller `hmonas` (`:5424+`); `do_attack` (`:565–568`) `Upolyd` → `hmonas` else `hitum(youmonst.data->mattk)`.

Old JS: `do_attack` always `hitum`; `damageum` absent; D-1232 TRUE-only wrap lives in `hmon` (hitting `obj`).

The diff **does** `damageum` with that ternary/`uwep`, a thin `hmonas` (weapon → `known_hitum`; natural → `damageum`), and `Upolyd` dispatch. It does **not** pull AT_HUGS/EXPL/ENGL bodies, altwep, `special_dmgval`, or `demonpet` spawn (`rn2(13)` still burned). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `damageum` | C `:4835–4884`, **new** | ternary `uwep`; always reset |
| `troll_baned` | C macro, **imported** | D-1223 |
| `killed` / `xkilled` | C callee, **already live** | flag copy D-1223 |
| `damageum_ad_phys` | C `mhitm_ad_phys` youmonst `:3989–4020`, **clone** | shade `impossible` omitted |
| `damageum_adtyping` | C `mhitm_adtyping` subset | PHYS + AD_POLY live; rest named |
| `mhitm_ad_poly` | C callee, **imported** | |
| `hmonas` | C `:5424+`, **thin** | WEAP/claw-wep/`known_hitum`; natural `damageum` |
| `missum` | C `:5198–5214`, **new** | natural misses; `known_hitum` still old miss |
| `get_mattk` | C `getmattk` without `sum[]` | pre-existing; disease-stun named |
| `do_attack` Upolyd | C `:565–568`, **wired** | `bhitpos` set; `notonhead` not |
| human `hitum` mattk | C `youmonst.data->mattk` | JS still hardcoded 1d6 AT_WEAP (pre-existing) |
| `demonpet` spawn | C `:2133–2145`, **named omit** | `rn2(13)` burned; return `M_ATTK_MISS` |
| AT_HUGS/EXPL/ENGL | C bodies, **named omit** | JS `continue` (skips passive like C AT_NONE) |
| altwep / `special_dmgval` | **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. New RNG: `d(damn,damd)` + demon `rn2(13)` in C order; hmonas `rnd(20)` per attack like C.

## C ↔ JS fidelity

Pinned C wrap (`uhitm.c:4861–4880`):

```
        if (mattk->aatyp == AT_WEAP || mattk->aatyp == AT_CLAW)
            gm.mkcorpstat_norevive = troll_baned(mdef, uwep) ? TRUE : FALSE;
        if (mdef->mtame && !cansee(mdef->mx, mdef->my)) {
            You_feel("embarrassed for a moment.");
            if (mhm.damage) xkilled(mdef, XKILL_NOMSG);
        } else if (!flags.verbose) {
            You("destroy it!");
            if (mhm.damage) xkilled(mdef, XKILL_NOMSG);
        } else if (mhm.damage) {
            killed(mdef);
        }
        gm.mkcorpstat_norevive = FALSE;
```

JS matches ternary on `u.uwep` (not hitting `obj`), AT_WEAP||AT_CLAW only, three death messages, always FALSE. **Callees `killed`/`xkilled`/`mkcorpstat`/`revive` are live.** Weapon-using poly claw still dies in `hmon` (D-1232 TRUE-only on `obj`) then skips `damageum` if `!survived` — C same (`break` out of the weapon case before the non-PHYS `damageum` call). Natural claw uses this ternary.

Demonpet: C `is_demon && !rn2(13) && !uwep && umonnum != AMOROUS_DEMON && != BALROG` then `demonpet(); return M_ATTK_MISS`. JS burns `rn2(13)` and returns MISS without spawn. Control-flow match; spawn named.

`hmonas` weapon path: `find_roll_to_hit` / `rnd(20)` / `known_hitum`; non-PHYS/SPEL extra `damageum`. Natural: seduce / shade miss / hit pline / `damageum`. AT_HUGS/EXPL/ENGL/MAGC (non-kobold) `continue` — C MAGC non-weapon falls through to AT_NONE continue (skip passive). Hug **bodies** that would `damageum` are named skips, not wrong hug math.

`do_attack` now sets `bhitpos` (hmonas later-attack `m_at` contract) but not `gn.notonhead = (bhitpos != mtmp mx/my)`. C sets both in one block (`:518–520`). Hug/`failed_grab` use notonhead; hugs are named skipped. Incomplete clone of that 3-line block — named with hugs, not a Must-fix of the ternary.

`damageum_ad_phys` matches the youmonst arm (shade zero; AT_WEAP extra phys 0; thick-skin kick/claw/touch/hug; `udaminc`). Remaining `mhitm_ad_*` named: a rust-form bite still applies PHYS dice.

Human `else hitum({AT_WEAP,1d6})` still is not `youmonst.data->mattk`. Comment overclaims; the row is pre-existing; Tourist 1d6 matches human mattk[0]. Not this SHA’s wrap.

`missum` is C-faithful; `known_hitum` weapon misses still use the old short pline. Pre-existing hitum path; hmonas natural misses use the new function.

## Hallucinations / overclaim

Subject + D-1233 say poly AT_WEAP/AT_CLAW Trollsbane copies `norevive` via ternary/`uwep`. **`damageum` wrap + live death callees + Upolyd→hmonas are the hunk.** Stamping **Addressed:** D-1233 is fair. Do **not** stamp “Match C AT_HUGS/gulpum” or “Match C `demonpet` spawn” or “Match C `youmonst.data->mattk` for unpoly.” `hmonas` is thin, not a stub that no-ops `damageum`.

## Density

C `damageum` + the `hmonas`/`do_attack` callers the wrap needs. ~265 JS lines. Upper bound of §2b; one poly-melee family, not unrelated potions. Did not glue passivemm.

## Branch-by-branch confirm

1. Natural AT_CLAW Trollsbane vs troll: ternary TRUE; `norevive`; twitch. Match.
2. Same with `uwep` null: ternary FALSE. Match.
3. AT_BITE kill: do not touch the flag in the WEAP/CLAW arm; leftover TRUE would copy (C same) then reset. Canary leftover. Match.
4. Weapon-using claw kill: `hmon` TRUE-only (D-1232); no second `damageum` if dead. Match C `!survived` break.
5. Unpoly hero: still `hitum`, not `hmonas`. Match `if (Upolyd)`.
6. Demon `rn2(13)` hit: return MISS, no spawn. Named spawn; RNG order Match.
7. AT_HUGS slot: continue, no `damageum`. **Named.**
8. Shade natural: miss pline, no `damageum`. Match C skip (JS wording “hit” vs C “claws” — `special_dmgval` named).
9. `passive` + knockback RNG after a live hit. `passive` already live; knockback still burns `rn2` only.
10. Human form hardcoded 1d6. **Pre-existing, not this wrap.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `PM_SHADE` / `ART_TROLLSBANE` are extracted.

## Verification

Journal: private canary **38**/38 (C ternary vs hmon TRUE-only; Trollsbane claw `norevive`+twitch; leftover TRUE cleared on WEAP/CLAW not BITE; null/ogre/plain unset; hmonas kill; hmon leftover unchanged); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a public session Upolyd-melees a troll with Trollsbane. Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. The ternary writes the live env flag around live `killed`/`xkilled`. Hug skip is a named omit, not a wrong hug implementation.

Named omits (map, not Must-fix):

1. AT_HUGS / AT_EXPL `explum` / AT_ENGL `gulpum` bodies
2. two-weapon `uswapwep` altwep (C FIXME still `uwep` here)
3. `demonpet` spawn body (`rn2(13)` already burned)
4. remaining `mhitm_ad_*` youmonst; `special_dmgval`; `failed_grab`; pit kick; `skipdrin`
5. `do_attack` `notonhead` from `bhitpos`; unpoly `youmonst.data->mattk`
6. `known_hitum` still not calling new `missum`

Do not Must-fix “finish every poly attack type.” Do not restore always-`hitum` for Upolyd.

## Callers / RNG ledger

C `damageum` callers: `hmonas` (several cases). JS `hmonas` natural + weapon non-PHYS. `do_attack` is the only production caller of `hmonas`. New `d()` + `rn2(13)` + per-slot `rnd(20)` match C. Public fortress is not evidence a poly Trollsbane troll kill ran.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: poly AT_WEAP/AT_CLAW kills now set `mkcorpstat_norevive` from `troll_baned(mdef, uwep)` around live `killed`/`xkilled`; hug/expl/engl, altwep, and `demonpet` spawn stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1233 `976094e5`.
