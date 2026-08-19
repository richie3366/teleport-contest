# Review 208 — 2cce0dc8 — monmove.c `bee_eat_jelly` (D-1246)

## Metadata
- Full / short hash: `2cce0dc812593f9a35d69d621be812350ee883f8` / `2cce0dc8`
- Parent: `e86c2788` (reviews **204–207** + cadence **#1580**). JS parent `6115dc58` (D-1245). This file audits **this SHA only**. Archive row **Addressed:** D-1246 `2cce0dc8` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 02:06:03 +0200
- D-id: **D-1246**
- Stats: 12 files, +362 / −173 — `js/monmove.js` +78 / −11; `js/mhitm.js` +109 / −20; comment `js/display.js`.
- Claims to close: Open `monmove.c` `bee_eat_jelly` (named from D-1238 / D-1227 / review **200** / **207**). Not mind_blast / iron bars. `reviews/loop-2026-08-15/` has no unpaid bee Must-fix.
- JS / map: `monmove.js` `find_pmmonst` / `bee_eat_jelly` / `dochug`; `mhitm.js` `grow_up` killer-bee `!victim` → queen; `c-js-map/turns.md`. IRONBARS / `mon_yells` / `gelcube_digests` / `little_to_big` still named.
- Prior reviews this SHA claims to close: **200** named omit `bee_eat_jelly`; **207** next Open was bee_eat.

## Intent vs deliverable

Git subject promises: “Match C monmove.c bee_eat_jelly so a killer bee on royal jelly with no queen on the level eats it and grow_ups into a queen, instead of walking past the jelly.”

C `find_pmmonst` (`monmove.c:375–388`): if `G_GENOD` skip the walk and return null; else `fmon`/`nmon`, skip `DEADMONSTER`, break on `mtmp->data == &mons[pm]`. `bee_eat_jelly` (`:394–420`): `find_pmmonst(PM_QUEEN_BEE)`; if none, delay blessed 3 / uncursed 5 / cursed 7; `quan>1` `splitobj(1)`; `canseemon` `pline_mon` eats `an(xname)`; `delobj`; bump `m_lev` to `mons[PM_QUEEN_BEE].mlevel-1` when below; `grow_up(mon, 0)`; dead → 1 (genocided queen); else `mfrozen=delay`, `mcanmove=0`, return 0; live queen → −1. Caller `dochug` (`:868–874`) after wield, before `gelcube_digests`: `mdat == &mons[PM_KILLER_BEE] && (otmp=sobj_at(LUMP_OF_ROYAL_JELLY)) && (res=bee_eat_jelly)>=0` return `res`. `makemon.c` `grow_up` (`:2066–2067`): `newtype = (oldtype==PM_KILLER_BEE && !victim) ? PM_QUEEN_BEE : little_to_big(oldtype)`; `!victim` `rnd(8)` both HP fields then `++m_lev`; form-change when `m_lev >= mons[newtype].mlevel && newtype!=oldtype` (geno `mondied`, else `set_mon_data` + `pline_mon`).

Old JS: named omit after D-1238 `mind_blast`; `grow_up` was HP/`m_lev++` only and returned before any form-change.

The diff **does** `find_pmmonst` + eat body + `dochug` slot + the killer-bee `!victim` arm inside `grow_up`. It does **not** pull `gelcube_digests`, postmov IRONBARS, `mon_yells`, or `little_to_big`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `find_pmmonst` | C `:375–388`, **new** | `G_GENOD` / `mhp<1` / `data.mndx` (JS `mons()` allocates) |
| `bee_eat_jelly` | C `:394–420`, **new** | delay 3/5/7; freeze after grow |
| `sobj_at_monmove` | C `mkobj.c` `sobj_at`, **clone** | same `objects_at`/`nexthere` walk as `hack.js` `sobj_at` |
| `dochug` bee arm | C `:868–874`, **wired** | after wield; `gelcube_digests` still named |
| `grow_up` | C `makemon.c:2051–2178`, **extended** | was HP-only; now async + bee `!victim` form-change |
| `splitobj` / `delobj` | C `mkobj.c`, **imported live** | |
| `pline_mon` / `display_canseemon` | C `pline.c` / `display.h`, **imported live** | not the local door stub |
| `set_mon_data` / `mondied` | C `mondata.c` / `mon.c`, **imported live** | geno path |
| `YMonnam_grow` / `mhe_grow` | C `YMonnam` / `mhe`, **clone** | `highc(y_monnam)`; Hallu on `mhe` named |
| `little_to_big` / mleashed `update_inventory` | C `:2067` / `:2161–2162`, **named omit** | `newtype` stays `oldtype` when not bee+`!victim` |
| `gelcube_digests` | C `:876–878`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New RNG:** `grow_up(!victim)` one `rnd(8)` (C `:2103`). Eat body has none. `splitobj` may burn object RNG if the stack splits — C same.

## C ↔ JS fidelity

Pinned C `bee_eat_jelly` (`monmove.c:399–419`):

```
    if (!mtmp) {
        m_delay = obj->blessed ? 3 : !obj->cursed ? 5 : 7;
        if (obj->quan > 1L)
            obj = splitobj(obj, 1L);
        if (canseemon(mon))
            pline_mon(mon, "%s eats %s.", Monnam(mon), an(xname(obj)));
        delobj(obj);
        if ((int) mon->m_lev < mons[PM_QUEEN_BEE].mlevel - 1)
            mon->m_lev = (uchar) (mons[PM_QUEEN_BEE].mlevel - 1);
        (void) grow_up(mon, (struct monst *) 0);
        if (DEADMONSTER(mon))
            return 1;
        mon->mfrozen = m_delay, mon->mcanmove = 0;
        return 0;
    }
    return -1;
```

JS: live queen → −1 first (C same). Delay BUC match. `quan>1` split then `delobj` the lump. `display_canseemon` is the live `display.js` `canseemon` (infrared/`mon_visible`), not `monmove.js`’s door stub (`cansee && !minvis`). Eat pline is `pline_mon`. Level bump then `grow_up(mon, null)`. Dead after grow → 1. Else freeze and return 0. Match.

`find_pmmonst`: C `data == &mons[pm]`. JS `(data.mndx ?? mnum) === pm` because `mons()` allocates a new object. Same identity as other JS mndx tests (D-0928 #1130). `G_GENOD` returns null without walking — a genocided queen species looks absent, eat proceeds, `grow_up` geno-dies. Match C.

`dochug`: JS tests `mdat.mndx === PM_KILLER_BEE`, `sobj_at` jelly, `res>=0` return. Slot is after the armed wield spend and before `want_move`. C puts `gelcube_digests` between bee and `want_move`; a killer bee is not a cube, so the bee path is the same until that omit is ported.

`grow_up` bee `!victim`: C `newtype = PM_QUEEN_BEE` (not `little_to_big` — C comment at `:2062–2065`). JS same ternary. `rnd(8)` added to `mhpmax` and `mhp`, then `m_lev++`. Form-change when `newtype!=oldtype && m_lev >= queen.mlevel`. After `bee_eat_jelly`’s bump to `queen.mlevel-1`, `++` hits the threshold. Geno: `canspotmon` `pline` (not `pline_mon`) + `set_mon_data` + `mondied` + return null. Live: `pline_mon` `YMonnam` + verb (`changes into` / `becomes` / `grows up into`) + `set_mon_data` + cham if shapeshifter + `newsym` + `female`. RNG: one `rnd(8)`, no extra `rn2` on this arm. Match the claimed bee path.

JS `!victim` still caps `m_lev` at 50 before the form-change test; C uses `lev_limit` after (49 for ordinary `mlevel`). Queen `mlevel` is far below that. Pre-existing `!victim` cap; named with mplayer/golem/home-elemental `lev_limit`. `little_to_big` stays identity so a dog that kills still does not become a large dog. Named.

`YMonnam_grow` is `highc(y_monnam)` via first-char upper — same as unexported `do_name.js` `highc_name`. `mhe_grow` uses local `gender()` (neuter/`female`, Hallu named). Only the geno pline uses `mhe`. Not a no-op `grow_up`.

## Hallucinations / overclaim

Subject + D-1246 say a killer bee on jelly with no queen eats and becomes a queen. **`find_pmmonst` + eat + freeze + `grow_up(!victim)` queen arm are the hunk.** Stamping **Addressed:** D-1246 is fair. This is **not** “Match C dispatch, callee is a stub”: `grow_up` now does the bee form-change through live `set_mon_data`/`mondied`. Do **not** stamp “Match C `little_to_big`” or “Match C `gelcube_digests`” or “Match C mleashed `update_inventory`.” `sobj_at_monmove` is a clone of live `sobj_at`, not a floor-object fake.

## Density

One C caller site + the two callees C actually uses (`find_pmmonst`, `bee_eat_jelly`) + the one `grow_up` arm C documents as not in `little_to_big`. ~80 JS lines in `monmove.js` plus the form-change envelope. Right size. Did not glue IRONBARS or `mon_yells`.

## Branch-by-branch confirm

1. Live queen on `fmon`: −1, bee still takes its move. Match.
2. No queen, uncursed jelly `quan==1`: delay 5, eat, `m_lev` bump, `rnd(8)`, queen form, freeze 5. Match.
3. Blessed / cursed: delay 3 / 7. Match.
4. `quan>1`: `splitobj(1)` then `delobj` one lump. Match (fallback `|| lump` only if split returns null).
5. Queen species `G_GENOD`: `find_pmmonst` null, eat, `grow_up` geno `mondied`, return 1. Match.
6. Unseen bee: no eat pline; still delobj + grow + freeze. Match.
7. Wraith `grow_up(magr, null)` (not a bee): `newtype==oldtype`, no form-change, still one `rnd(8)`. Match this SHA’s envelope; `little_to_big` named.
8. Killer bee `grow_up(mtmp, victim)` from a kill: `!victim` is false, `newtype==oldtype`. C same (`little_to_big` does not map bee→queen). Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `grow_up` export does not import `fs`.

## Verification

Journal: private canary **31**/31 (C body+caller; delay BUC; split; live/dead/geno queen; dochug return; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a killer bee `dochug`s on royal jelly with no living queen. Cadence this audit: full `sessions` after D-1249.

## Actionable C-wrongs

None for Must-fix. Caller through live eat + live `grow_up` bee `!victim`. Clones (`sobj_at_monmove`, `YMonnam_grow`) match C `sobj_at` / `highc(y_monnam)`.

Named omits (map, not Must-fix):

1. `gelcube_digests` after this `dochug` arm
2. `grow_up` `little_to_big` / mleashed `update_inventory` / `lev_limit` 49
3. postmov IRONBARS; `mon_yells`

Do not Must-fix “JS `newtype=oldtype` when not bee+`!victim`.” Do not pull AT_HUGS.

## Callers / RNG ledger

C: `dochug` after wield. JS `dochug` same slot. Eat: no RNG. Grow `!victim`: `rnd(8)`. Public fortress is not evidence a bee ate jelly.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a killer bee on jelly with no queen now eats, `grow_up`s into a queen, and freezes; `little_to_big` and `gelcube_digests` stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1246 `2cce0dc8`.
