# Review 73 — bb552fba — `mlevel_tele_trap` MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP (D-1112)

## Metadata
- Full / short hash: `bb552fbad69799bce2bf0004535a935b297f377d` / `bb552fba`
- Parent: `b0847b88` (D-1111). This file audits **this SHA only**. The fix stamped **Addressed:** D-1112 without the short hash; this review commit fills `bb552fba`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 22:36:08 +0200
- D-id: **D-1112**
- Stats: 10 files, +214 / −71 — `js/teleport.js` +112 / −18 (`mlevel_tele_trap` portal/levelport/no-trap arms + local `seetrap` / `mon_has_amulet` / `is_home_elemental`).
- Claims to close: Open queue `teleport.c` `mlevel_tele_trap` MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP (named). Not hole path. `reviews/loop-2026-08-15/` has no open mlevel Must-fix.
- JS / map: `teleport.js` `mlevel_tele_trap`. `c-js-map/turns.md` teleport + trap rows. valley_level stronghold dest, botlevel hole avoid pline, hero `level_tele_trap` / `domagicportal` still named.
- Prior reviews this SHA claims to close: none as Must-fix. Named Open after D-1111 refill.

## Intent vs deliverable

Git subject promises: “Match C teleport.c mlevel_tele_trap so MAGIC_PORTAL stays for amulet or home elementals before rn2(7), and LEVEL_TELEP/NO_TRAP migrate or stay.”

Old JS MAGIC_PORTAL in endgame always burned `rn2(7)` (amulet / home-elemental short-circuit deferred), always set `mconf` on `is_xport`, and **early-returned** LEVEL_TELEP / NO_TRAP without `random_teleport_level` / same-level migrate. C `teleport.c:2033–2095` short-circuits stay as `In_endgame && (mon_has_amulet || is_home_elemental || rn2(7))`, ports LEVEL_TELEP/NO_TRAP, sets `mconf` only if `is_xport && !control_teleport(data)`, and prints in_sight migrate/shimmer/disorient lines.

The diff **does** those arms and the shared in_sight / mconf close. Hole/trapdoor dest (D-0250) is **untouched** except that in_sight migrate plines now fire for holes too (C always did). valley_level / botlevel avoid pline stay named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mlevel_tele_trap` MAGIC_PORTAL | C body, **rewritten** | `teleport.c:2033–2047` |
| `mlevel_tele_trap` LEVEL_TELEP / NO_TRAP | C body, **new** | `teleport.c:2048–2078`; was early-return |
| in_sight migrate / `seetrap` | C body, **new** | `teleport.c:2084–2091` |
| xport `mconf` | C body, **retouched** | `teleport.c:2092–2093` |
| `seetrap` | C callee, **clone** | `trap.c:3578–3584`; local (cycle) |
| `mon_has_amulet` | C callee, **clone** | `wizard.c:106–114`; local (apply.js cycle) |
| `is_home_elemental` | C callee, **clone** | `makemon.c:33–50`; local (makemon.js cycle) |
| `onscary(0,0)` | C callee, **clone** | D-1110 local; auditory |
| `random_teleport_level` | C callee, **imported** | same file; pre-existing D-0575 |
| `get_level` | C callee, **imported** | `dungeon.js:537–560` |
| `control_teleport` | C macro, **imported** | `monsters.js` `M1_TPORT_CNTRL` |
| `is_xport` | C macro, **imported** | `const.js` ≡ `trap.h:124` |
| `migrate_to_level` | C callee, **imported** | same file; D-0250 |
| `teleport_pet` | C callee, **imported** | pre-existing envelope |
| hole `valley_level` / botlevel pline | C, **named omit** | dest arm unchanged |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **New RNG:** endgame MAGIC_PORTAL `rn2(7)` only when amulet and home-elemental both false (C same short-circuit); LEVEL_TELEP `random_teleport_level` (`rn2(5)` stay, then range `rn2`). Clang LTR `||` matches.

## Constitution / playbook

Grep of the `js/teleport.js` hunk: no trace-index gates. Local clones are cycle breaks. Contest Rule #2: no Node builtins. New `pline` is display-only; input still at `nhgetch`. `teleport_pet` already awaited.

## C ↔ JS fidelity

### Envelope C actually writes

C `teleport.c:2012–2097`: ustuck → Finished; `teleport_pet` false → Finished; then hole / MAGIC_PORTAL / LEVEL_TELEP|NO_TRAP / `impossible`; then in_sight migrate pline + `seetrap`; then `is_xport && !control_teleport(data)` → `mconf`; then `migrate_to_level`. JS `1847–1932`: same. Hole dest body is the pre-existing D-0250 arm (stronghold `valley_level` if set else Finished; botlevel Finished **without** the `in_sight && tseen` avoid pline). Named, not this subject.

### MAGIC_PORTAL stay vs migrate

C `2033–2047`:

```
if (In_endgame(&u.uz) && (mon_has_amulet(mtmp)
                          || is_home_elemental(mtmp->data)
                          || rn2(7))) {
    if (in_sight && mtmp->data->mlet != S_ELEMENTAL) {
        pline_mon(..., "%s seems to shimmer for a moment.", Monnam(mtmp));
        seetrap(trap);
    }
    return Trap_Effect_Finished;
} else {
    assign_level(&tolevel, &trap->dst);
    migrate_typ = MIGR_PORTAL;
}
```

JS `1876–1891`: same `In_endgame && (amulet || home-elemental || rn2(7))`. Short-circuit: amulet or home elemental **does not burn** `rn2(7)`. Away-elemental in endgame burns it. Non-endgame never takes the stay arm (no `rn2(7)`). Then `trap.dst` + `MIGR_PORTAL`. Shimmer skips `S_ELEMENTAL`. `seetrap` sets `tseen` + `newsym` only when `!tseen`. Match.

`mon_has_amulet`: walk `minvent` for `otyp == AMULET_OF_YENDOR`, return 1/0. Cheap plastic is a different otyp. JS `AMULET_OF_YENDOR < 0` is extractor-miss armor; the name exists. Match.

`is_home_elemental`: `mlet == S_ELEMENTAL` then `monsndx` vs plane (`Is_airlevel` … `Is_waterlevel`). JS `ptr.mndx` (`mons()` stamps it) + the four `Is_*level` imports. Default (stalker etc.) false. Match.

### LEVEL_TELEP / NO_TRAP

C `2048–2078`: stay if `mon_has_amulet || In_endgame || (tt==NO_TRAP && onscary(0,0,mtmp))` with disorient pline. Else NO_TRAP → `assign_level(&tolevel, &u.uz)`; else `nlev = random_teleport_level()` and if `nlev == depth(&u.uz)` shudder-stay else `get_level(&tolevel, nlev)`. JS `1892–1915`: same. `onscary(0,0)` is the D-1110 clone: Wizard/rider/Angel/lminion/shk-in-shop/priest-in-temple return **false** (they migrate); ordinary return **true** (they stay). C comment lists those as “onscary true”; the **code** returns false for them. JS follows the code. Canary named ordinary stay vs wiz/rider migrate.

`random_teleport_level` / `get_level` are real pre-existing functions (hero `level_tele` D-0575 / D-0515), not stubs. Named omits inside `random_teleport_level` (quest locate polish already ported; some clamps still named on the map) are shared with the hero path, not a fake dispatch.

Unexpected `tt` (WEB, etc.): C `impossible` then Finished. JS Finished without the impossible string. Same control result.

### Shared migrate close

in_sight: `Suddenly, %s %s` with hole / trap door / “disappears out of sight”, then `seetrap` if trap. JS same tokens via `mon_nam`. HOLE vs TRAPDOOR vs portal/levelport/NO_TRAP (the last three share “disappears”). Match.

`is_xport(tt)` is `ttyp >= TELEP_TRAP && ttyp <= MAGIC_PORTAL` (`trap.h:124`; TELEP_TRAP=15, LEVEL_TELEP=16, MAGIC_PORTAL=17). HOLE/TRAPDOOR/NO_TRAP are **outside**; MAGIC_PORTAL and LEVEL_TELEP are inside. `control_teleport(ptr)` is `mflags1 & M1_TPORT_CNTRL`. Old JS set `mconf` on every `is_xport`. New JS matches C: TPORT_CNTRL skips mconf. Match.

NO_TRAP migrate uses `MIGR_RANDOM` (initial `migrate_typ`) to `u.uz`. LEVEL_TELEP uses `get_level` after a depth that is not current. Portal overwrites `migrate_typ = MIGR_PORTAL`. Match.

`migrate_to_level(..., ledger_no(tolevel), migrate_typ, NULL)` unchanged.

`teleport_pet` (steed false; cursed leash `yelp` unless `force_it`; else `m_unleash`) still gates the whole function. This SHA does not restub that. `pline_mon` vs `pline`+`Monnam` is screen-only; public-unhit.

Callers: C `trap.c` monster hole/trapdoor/portal/level-teleport already `mlevel_tele_trap`. JS `trap.js` `trapeffect_hole` / MAGIC_PORTAL already awaited this export (D-0250 / D-0782). LEVEL_TELEP / NO_TRAP were the dead arms behind that same call. Wiring the arms does not invent a second dispatch. Hero `domagicportal` / `level_tele_trap` remain named (different functions).

## Hallucinations / overclaim

“Match C so MAGIC_PORTAL stays for amulet or home elementals before rn2(7), and LEVEL_TELEP/NO_TRAP migrate or stay” is **true for those three arms, the `||` RNG order, `onscary(0,0)` stay, `random_teleport_level`/`get_level`, in_sight plines, `seetrap`, and `!control_teleport` mconf.** It is **not** true that stronghold holes now go to `valley_level` when that d_level is unset, that botlevel holes print “avoids the hole”, or that the hero `level_tele_trap` / `domagicportal` path moved.

This is **not** “Match C dispatch, callee is a stub.” `mon_has_amulet`, `is_home_elemental`, `onscary`, `random_teleport_level`, `get_level`, `control_teleport`, `migrate_to_level`, and `seetrap` are real clones or imports.

Stamping **Addressed:** D-1112 is fair for the Open portal/levelport/no-trap line. Hash `bb552fba` is filled on the archive row by this review commit.

## Density (§2b)

One Open cluster: C’s remaining `mlevel_tele_trap` switch arms (MAGIC_PORTAL stay was a deferred conjunct; LEVEL_TELEP/NO_TRAP were a deferred pair in the same function) plus the three callees those arms name. Hole dest correctly left named. Not “finish teleport.c.” Right size.

## Verification

Journal: private canary **53**/53 (ustuck; portal migrate + MIGR_PORTAL/mconf; TPORT_CNTRL skip mconf; endgame amulet/home-elemental skip `rn2(7)`; away-elemental burns it; LEVEL_TELEP amulet/endgame stay vs ordinary `rn2(5)` stay/migrate; NO_TRAP ordinary stay vs wiz/rider same-level migrate; WEB impossible; hole dest regression; shimmer tseen); green+strict seed8000/0900; cohort **36**/36 including 0360/0030/4500/0373/0367/0014 + strict 0360/0014/4500/2200/0367/0009/0004/0030. Path **public-unhit**. Cadence fortress is not an endgame-portal proof.

C read of `teleport.c:2006–2097`, `wizard.c:106–114`, `makemon.c:33–50`, `trap.c:3578–3584`, `trap.h:124`, `mondata.h:83`; JS `teleport.js:1796–1932` / `381–416` / `1416–1459`, `dungeon.js:537–560`, `monsters.js:863–865`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| endgame + Amulet | stay, no `rn2(7)` | **same** |
| endgame + home air elem | stay, no `rn2(7)` | **same** |
| endgame + fire elem on air | `rn2(7)` | **same** |
| not endgame portal | migrate `MIGR_PORTAL` | **same** |
| portal + TPORT_CNTRL | migrate, no mconf | **same** |
| LEVEL_TELEP + Amulet | stay, disorient | **same** |
| LEVEL_TELEP ordinary, `!rn2(5)` | shudder stay | **same** |
| NO_TRAP ordinary | stay (`onscary(0,0)`) | **same** |
| NO_TRAP Wizard | migrate `u.uz` | **same** |
| HOLE dest | unchanged named arm | **same** |
| WEB | Finished | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The three arms match `teleport.c:2033–2095`.

Named omits / do-nots (map / Open, not Must-fix):

1. stronghold hole → `valley_level` when that d_level is live; botlevel hole avoid pline (`teleport.c:2021–2028`). Named. Not portal arms.
2. hero `level_tele_trap` / `domagicportal`. Named.
3. `tele_trap` Antimagic wrenching; `teleds` `fill_pit`. Already Open.
4. Do not restore LEVEL_TELEP/NO_TRAP early-return. Do not skip amulet/`is_home_elemental` before `rn2(7)`. Do not always-`mconf` on xport. Do not import `trap.js` `seetrap` / `apply.js` `mon_has_amulet` / `makemon.js` `is_home_elemental` (cycles).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: monster MAGIC_PORTAL now stays for amulet or home elementals before `rn2(7)`, LEVEL_TELEP/NO_TRAP migrate or stay through real `random_teleport_level`/`onscary(0,0)`, and xport mconf honors `control_teleport`, while hole dest and hero levelport stay named.
- Must-fix stays empty for this SHA; next port pops Open `fountain.c` `dipsink`.
