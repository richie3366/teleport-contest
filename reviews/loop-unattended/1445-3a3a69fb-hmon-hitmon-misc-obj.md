# Review 1445 — 3a3a69fb — hmon_hitmon_misc_obj whole-body port (D-2486)

Metadata: SHA `3a3a69fb`, `js/uhitm.js` +313/−15, `js/dothrow.js` +34, `js/mhitm.js` one-word export. C `uhitm.c:1118–1383` (266 L, staticfn) + `dothrow.c:2456–2470` + dispatch `uhitm.c:1386–1433`. D-log: D-2486.

## Intent vs deliverable

Promise: whole `hmon_hitmon_misc_obj` in C order + `release_camera_demon` live + do_hit dispatch + shade export. Diff delivers all of it: module-local `hmon_hitmon_misc_obj` (all 9 otyp arms), exported `release_camera_demon` wired into both C callers (`breakobj` camera arm, misc camera arm), `shade_aware` export, `dryit` plumbing. Promise = deliverable.

## Inventory

- Added: `hmon_hitmon_misc_obj` (module-local, C-staticfn shape), `release_camera_demon` (export, dothrow.js), `dryit` field + post-msg application in `hmon_hitmon`, potion/GEM/shade/misc dispatch subdivision.
- Re-pointed (required `sym.mjs`): `shade_aware → js/mhitm.js:4470 sync`, single definition, no clones — clean one-word export. No deleted symbols.
- Import widenings only, all verified live via `sym.mjs`: `minstapetrify` (trap.js:3380 async, awaited), `monflee` (monmove.js:937 async, awaited), `setmangry` (mon.js:1334 async, awaited), `explode` (explode.js:417 async, awaited), `You`/`Your`/`pline_The` (display async, awaited), `breaktest`/`makemon`/`set_malign`/`mons`/`canspotmon`/`pmname`/`s_suffix`/`mbodypart`/`the`/`An`/`vtense`/`singular`/`xname`/`ysimple_name`/`corpse_xname`/`change_luck`/`dmgval`/`place_object`/`obj_stop_timers`/`weight`/`exercise`/`touch_petrifies`/`resists_ston`/`resists_acid`/`mon_hates_silver`/`mon_hates_blessings`/`is_wet_towel`/`useupall`/`useup`/`obfree`/`observe_object`/`haseyes`/`is_undead`/`is_vampshifter`/`NEUTRAL`/`FACE` — all sync-called, all live. `is_undead`/`Your`/`useup`/`s_suffix`/`canspotmon`/`the` have clones elsewhere, but this diff imports the live exports — correct direction.
- `makemon` is sync (`js/makemon.js:3127`), so the unawaited call inside `release_camera_demon` is correct.

## C ↔ JS fidelity

Walked C `:1119–1383` arm-by-arm — exact: boulder/ball/chain dmgval; mirror breaktest/−2 luck/useup + three flags + dmg 1; camera You + demon + useup + doreturn; corpse petrify (`munstone`-FALSE named) + resists_ston break + msize+1; egg `useup_eggs` closure ≡ C macro `:1178–1185`, luck `−cnt/−5`, petrify/pyrolisk (`d(3,6)`)/transform (`!stale_egg` direction matches C, `2*200` ≡ `obj.h:316`)/splat + `A_WIS` exercise; garlic undead/vampshifter `monflee d(2,4)` + dmg 1; pie/venom `msleeping=0`, `can_blnd` three message arms, `setmangry`, `mcansee=0`, `rn1(25,21)`, 127 cap, consume; acid resists arms + consume; default veggy/paper (SPBOOK exempt), `(owt+99)/100`, `rnd`, cap 6, wet-towel (`mndx === PM_IRON_GOLEM` ≡ `mon->data == &mons[…]`, `rnd`, `rn2(spe+1)>0`), `hmd->material == SILVER` via ctx, blessed `rnd(4)`. RNG call order preserved in every arm. `#if 0` statue arm and commented `learn_egg_type` kept disabled like C.

C context pins (re-read, not trusted from the message): `hmd` init (`uhitm.c:1767/1774/1778/1790`) — `mdat = mon->data`, `material = oc_material`, `get_dmg_bonus = TRUE`, `dryit = FALSE` — matches the JS `mctx` literal; `dryit` application (`:1872–1874`, `dry_a_towel(obj, -1, TRUE)` post-msg) matches the JS tail. Dispatch (`hmon_hitmon_do_hit :1415–1429`):

```c
if (obj->oclass == WEAPON_CLASS || is_weptool(obj)
    || obj->oclass == GEM_CLASS) {
    hmon_hitmon_weapon(hmd, mon, obj); ...
} else if (obj->oclass == POTION_CLASS) {
    hmon_hitmon_potion(hmd, mon, obj); ...
} else {
    if (hmd->mdat == &mons[PM_SHADE] && !shade_aware(obj)) {
        hmd->dmg = 0;
    } else {
        hmon_hitmon_misc_obj(hmd, mon, obj);
    }
}
```

JS order (GEM→dmgval, potion→dmgval, shade→0, else misc) follows the same decision tree. `release_camera_demon` ≡ C `:2456–2470` (`!rn2(3)` gate, `rn2(3)` homunculus/imp second draw, MM_NOMSG, `!cursed` peaceful, malign, Hallucination ternary).

Callee closure: misc arms all LIVE; `hmon_hitmon_potion` OMIT (unported, map-cited); GEM keep-dmgval OMIT (C callee `hmon_hitmon_weapon` has no JS counterpart — `sym.mjs` NOT FOUND pasted below; melee-only routing would itself be C-wrong for thrown gems; pre-existing behavior preserved, map cites dispatch `:1415–1429`); `munstone`/msg_silver/recalc named.

Required pastes — `sym.mjs` on the re-pointed symbol plus edge checks:

```text
shade_aware      js/mhitm.js:4470   sync
makemon          js/makemon.js:3127   sync
release_camera_demon js/dothrow.js:1234   ASYNC — await required
hmon_hitmon_weapon NOT FOUND in js/**
hmon_hitmon_potion NOT FOUND in js/**
ALREADY: uhitm.js already statically imports shk.js. No new edge needed.
ALREADY: uhitm.js already statically imports dothrow.js. No new edge needed.
```

(`makemon` sync ⇒ the unawaited call inside `release_camera_demon` is correct; every ASYNC callee — minstapetrify, monflee, setmangry, explode, You/Your/pline_The, dry_a_towel — is awaited at its call site.)

## Hallucinations / overclaim

None. "Whole body" is true of `misc_obj`; the two keep-dmgval arms are disclosed in the commit Caller paragraph and the map, not sold as ported. `--can` claims verified (both edges pre-exist: ALREADY).

## Density

Right-sized: one C staticfn + its small callee + dispatch wiring, 3 files, ~340 lines.

## Verification

`hidden-proxy verify hmon_hitmon_misc_obj --base 3a3a69fb~1 --reach-all` (re-run here):

```text
verify hmon_hitmon_misc_obj: baseline 3a3a69fb~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
reach hmon_hitmon_misc_obj: 12 baseline-PASS session(s) reach it (12 run): 12 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated); reach matches the D-log's 12/12. `imports.mjs --rulecheck` (whole scored `js/`): Rule #2 clean. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Prior-review cross-check: none of D-2486's named omits (`munstone`, msg_silver, recalc/bump, D-0693 precedence, potion, mirror-`unarmed`) is unbound or misrouted — the potion/GEM arms keep pre-commit `dmgval`, so the dispatch subdivision changes behavior only where C's misc arm now runs (previously bare `dmgval` for everything).

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
