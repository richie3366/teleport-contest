# Review 213 — e097a5df — uhitm.c explum / hmonas AT_EXPL (D-1251)

## Metadata
- Full / short hash: `e097a5dfa2781fa51cc8e4c817daffaddf4f9e60` / `e097a5df`
- Parent: `87b4705a` (D-1250). This file audits **this SHA only**. Archive row **Addressed:** D-1251 `e097a5df` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 03:36:44 +0200
- D-id: **D-1251**
- Stats: 12 files, +167 / −35 — `js/uhitm.js` +75 / −5; `js/explode.js` export `adtyp_to_expltype`.
- Claims to close: Open `uhitm.c` AT_EXPL (named from D-1233 / D-1250). Not AT_HUGS. `reviews/loop-2026-08-15/` has no unpaid explum Must-fix.
- JS / map: `uhitm.js` `explum` + `hmonas` AT_EXPL + `dhit===-1` `rehumanize`; `explode.js` export. fight_empty `explum(null)` / AT_ENGL still named.
- Prior reviews this SHA claims to close: **195** named omit AT_EXPL; D-1250 follow-up.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c explum so a poly'd exploding form actually flashes or blasts then rehumanizes, instead of skipping the slot like AT_NONE.”

C `explum` (`uhitm.c:4891–4928`): always `d(damn,damd)`; AD_BLND `!resists_blnd` blind+cap 127; AD_HALU `haseyes&&mcansee` → `mconf`; AD_COLD/FIRE/ELEC `explode(u.ux,u.uy,(adtyp-1)+20,tmp,MON_EXPLODE,adtyp_to_expltype)` then `DEADMONSTER` → `M_ATTK_DEF_DIED` (skips `wake_nearto`); else `wake_nearto(7*7)` + `M_ATTK_HIT`. `hmonas` AT_EXPL (`:5762–5767`): `dhit=-1`, `wakeup`, `You explode!`, `explum`, `break`. Post-switch (`:5821–5824`): `u.mh=-1; rehumanize()` then passive. Other caller `hack.c` fight_empty (`:2324–2333`) named.

Old JS: AT_EXPL in the AT_NONE `continue` set (no explum, no rehumanize, no passive).

The diff **does** `explum` + the AT_EXPL arm + the `dhit===-1` rehumanize before passive. It does **not** wire fight_empty `explum(null)` or AT_ENGL. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `explum` | C `:4891–4928`, **new** | exported; fight_empty unwired |
| `hmonas` AT_EXPL | C `:5762–5767`, **wired** | not `continue` |
| `dhit===-1` rehumanize | C `:5821–5824`, **wired** | before `passive` |
| `explode` | C `explode.c`, **imported live** | `you_exploding` = MON_EXPLODE && type>=0 |
| `adtyp_to_expltype` | C `explode.c`, **imported live** | visual; JS explode voids `_expltype` |
| `rehumanize` | C `polyself.c`, **imported live** | Unchanging+mh<1 `done(DIED)` |
| `wakeup` / `wake_nearto` | C `mon.c`, **imported live** | |
| `resists_blnd_mon` | C `mondata.c:248–272`, **clone** | already-blind/noeyes/sleep; AT_EXPL/GAZE AD_BLND + arti named |
| `d()` | C, **imported** | always before the switch |
| fight_empty `explum` | C `hack.c:2324`, **named omit** | |
| AT_ENGL `gulpum` | **named omit** | still `continue` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New RNG:** `d(damn,damd)` always; blast path then `explode`’s existing combat RNG. BLND/HALU add no extra `rn2`.

## C ↔ JS fidelity

Pinned C AT_EXPL + rehumanize (`uhitm.c:5762–5824`):

```
        case AT_EXPL: /* automatic hit if next to */
            dhit = -1;
            wakeup(mon, TRUE);
            You("explode!");
            sum[i] = explum(mon, mattk);
            break;
        ...
        if (dhit == -1) {
            u.mh = -1; /* dead in the current form */
            rehumanize();
        }
```

JS: `dhit = -1`, `wakeup(mon,true)`, `You explode!`, `explum`, then the same `u.mh=-1; rehumanize()` before `passive`. AT_BOOM stays with AT_NONE `continue` (C gas-spore kill boom is AT_BOOM, not this case). Yellow/black light and freezing/flaming/shocking spheres are AT_EXPL (`monsters.h:343–360,1171,1183`). Match the claimed slot.

`explum` switch order matches. BLND: `resists_blnd_mon` then pline + `mblinded=min(+tmp,127)` + `mcansee=0`. HALU: `haseyes&&mcansee` → conf pline. COLD/FIRE/ELEC: `explode` at hero xy with type `(ad-1)+20` (C comment: player-caused is +20..+29 so `type>=0`). JS `MON_EXPLODE` is the port sentinel `-1` (C is `MAXOCLASSES+2`); `explode.js` already keys `you_exploding` off that constant, and sets `uhurt=0` for the exploding hero. Not a recorded-coordinate blast. If the target’s `mhp<1`, return `M_ATTK_DEF_DIED` **before** `wake_nearto` — C `DEADMONSTER` same. Else wake radius `7*7`, return HIT. Match.

`rehumanize` is live `polyman` / `nomul(0)` / botl / vision, not a stub that leaves Upolyd. Loop then `if (!Upolyd) break` like C after `passivedone`. Outer `let dhit=0` is not reset each slot; AT_WEAP uses a shadowed `const dhit`. After explode, `!Upolyd` exits so a leftover `-1` does not rehumanize twice. Latent if rehumanize failed to unpoly; C would also still be Upolyd. Not Must-fix.

`resists_blnd_mon` omits C’s `dmgtype_fromattack(AD_BLND, AT_EXPL|AT_GAZE)` and artifact arms. A yellow light exploding at another yellow light/Archon blinds in JS when C `resists_blnd` is true. Named in the helper comment; explum still rolls `d`, still rehumanizes. Clone deferral of extra resist, not a stub flash.

JS comment “Always rolls d then wake_nearto” is slightly wrong on the DEF_DIED return (C skips wake too). Comment, not a JS/C split.

## Hallucinations / overclaim

Subject + D-1251 say a poly exploding form flashes or blasts then rehumanizes instead of AT_NONE-skip. **`explum` + live `explode`/`rehumanize`/`wakeup` are the hunk.** Stamping **Addressed:** D-1251 is fair. This is **not** “Match C dispatch, callee is a stub”: `explode` damages adjacent mons when `you_exploding`; `rehumanize` calls `polyman`. Do **not** stamp “Match C fight_empty `explum(null)`” or “Match C `resists_blnd` AT_EXPL/GAZE” or “Match C AT_ENGL `gulpum`.”

## Density

One C function plus its `hmonas` case and the one-line post-switch `dhit==-1` that C ties to that case. ~70 JS lines + a one-line export. Right size. Did not glue `demonpet`.

## Branch-by-branch confirm

1. Yellow light AT_EXPL AD_BLND, seeing target: `d`, blind pline, cap 127, `dhit=-1`, rehumanize, passive. Match (unless target is itself an AT_EXPL-blinder — named resist).
2. Already-blind / noeyes / sleep: still rolls `d`, no blind pline. Match the clone’s covered arms.
3. Black light AD_HALU, seeing eyed: conf pline. Match.
4. HALU vs eyeless / `!mcansee`: no conf. Match.
5. Fire sphere: `explode` type `(AD_FIRE-1)+20`, hero unhurt (`you_exploding`), adjacent can die, DEF_DIED skips wake. Match.
6. Cold / elec: same type math. Match.
7. `mdef` null (API): BLND/HALU no-op after `d`; blast still `explode`. fight_empty caller named.
8. AT_BOOM still `continue`: no explum. Match C.
9. After rehumanize, `!Upolyd` stops further `hmonas` slots. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `(ad-1)+20` is C’s you-caused range, not a trace index. Plain ESM.

## Verification

Journal: private canary **42**/42 (C switch/dhit/-1 rehumanize; JS not continue-skip; BLND/HALU/null-mdef; already-blind still `d`; FIRE adjacent without hero HP; yellow-light `hmonas` rehumanize); green+strict seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a public session Upolyd-explodes. Cadence this audit: full `sessions` at HEAD `d384e339` **44**/44.

## Actionable C-wrongs

None for Must-fix. Dispatch through live `explode` / `rehumanize`. `resists_blnd` AT_EXPL/GAZE/arti is a named clone deferral on an extra-resist arm, not a no-op `explum`.

Named omits (map, not Must-fix):

1. fight_empty `explum(null)` (`hack.c`)
2. `resists_blnd` yellow-light/Archon/gaze and artifact
3. AT_ENGL `gulpum`; altwep

Do not Must-fix “JS `MON_EXPLODE === -1`.” Do not Must-fix shadowed AT_WEAP `dhit`.

## Callers / RNG ledger

C: `hmonas` AT_EXPL; fight_empty named. JS the first only. RNG: `d(damn,damd)` then explode combat if blast. Public fortress is not evidence a light exploded.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: poly AT_EXPL now flashes or `explode`s then `rehumanize`s through live callees; fight_empty `explum(null)` stays named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1251 `e097a5df`.
