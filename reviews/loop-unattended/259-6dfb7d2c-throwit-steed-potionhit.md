# Review 259 — 6dfb7d2c — dothrow.c throwit steed potionhit rn2(6) (D-1297)

## Metadata
- Full / short hash: `6dfb7d2c1ad0a4c2002c4530acb5a6f9420f4a23` / `6dfb7d2c`
- Parent: `993e17ea` (D-1296). This file audits **this SHA only**. Archive row **Addressed:** D-1297 `6dfb7d2c` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 18:33:34 +0200
- D-id: **D-1297**
- Stats: 10 files, +401 / −83 — `js/dothrow.js` +15 / −4; `js/potion.js` +341 / −~40.
- Claims to close: Open `dothrow.c` throwit steed potion (named from D-1283 / reviews **244** / **245** / **254** / **255**). Not boomhit. `reviews/loop-2026-08-15/` has no unpaid steed-potion Must-fix.
- JS / map: `dothrow.js` `throwit`; `potion.js` `potionhit` / `H2Opotion_dip` / `potionhit_mon_water`; `c-js-map/turns.md`. Remaining otyp / shop unpaid / boomhit named.
- Prior reviews this SHA claims to close: **255** named omit steed `rn2(6)` after stamina; **245** named slip/stamina/steed/boomhit after swallowit.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit so a downward potion while mounted can hit the steed (rn2(6)), instead of always hitting the floor.”

C `throwit` (`dothrow.c:1579–1598`) after swallow / returning-ceiling / `toss_up`:

```
        } else if (u.dz > 0 && u.usteed && obj->oclass == POTION_CLASS
                   && rn2(6)) {
            potionhit(u.usteed, obj, POTHIT_HERO_THROW);
        } else {
            hitfloor(obj, TRUE);
        }
```

`rn2(6)` only after the three conjuncts (0 → floor; 1–5 → steed). Callee `potionhit` (`potion.c:1623–1928`): `isyou = (mon == &gy.youmonst)` vs JS `mon == null`; monster crash / saddle `which_armor(W_SADDLE)` + `!rn2(10) || (POT_WATER && ((rnl(10)>7 && cursed) || (rnl(10)<4 && blessed) || !rn2(3)))`; `distu`; evaporate `Tobjnam`; saddle `H2Opotion_dip`; POT_WATER undead/were/vamp / gremlin `split_mon` / iron golem rust; then `potionbreathe` if `distance==0 || (distance<3 && !rn2((1+ACURR(A_DEX))/2))`. Remaining monster otyp switch and shop unpaid named.

Old JS: `u.dz` always `hitfloor` when not ceiling-return / `toss_up`. `potionhit(mon)` stubbed (extract + return) for any non-null `mon`.

The diff **does** the `throwit` arm **and** the monster `potionhit` crash/saddle/`H2Opotion_dip`/POT_WATER envelope the arm needs. It does **not** port remaining otyps, shop unpaid, boomhit, or `sho_obj_return_to_u`. Named. Hero crash-on-head / evaporate wording **kept** (not `Tobjnam` / `body_part(HEAD)`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| throwit steed `if` | C `:1590–1594`, **new** | after `toss_up`, before `hitfloor` |
| `potionhit` monster | C `:1642–1904`, **rewired** | was stub destroy |
| `which_armor(W_SADDLE)` | C `worn.c`, **imported live** | `worn.js` |
| saddle RNG | C `:1647–1651`, **new** | `rn2(10)` / `rnl` / `rn2(3)` short-circuit |
| `H2Opotion_dip` | C `:1497–1586`, **new** | unpaid / `mentioned_water` named |
| `potionhit_mon_water` | C `:1831–1865`, **new** | split of the POT_WATER case |
| `potionbreathe` DEX | C `:1907–1911`, **wired** | was always-breathe on hero |
| `Tobjnam_pot` / `otense_pot` / `aobjnam_pot` | C `objnam.c`, **local clones** | match `The(xname)`+`otense`; `quan!=1` like dothrow `otense` |
| `s_suffix_pot` / `upstart_pot` | C `hacklib.c`, **local clones** | match it/you/s |
| `Blind_pot` | C `youprop.h Blind`, **local clone** | extra `u.Blind\|\|u.ublind`; misses file-local `Blind()` `uroleplay` |
| `carried_pot` | C `invent.c carried`, **local clone** | eat.js already exports `carried` |
| `Protection_from_shape_changers_pot` | C `youprop.h`, **local clone** | H\|\|E fields; uprops named elsewhere |
| remaining otyp switch | C `:1731–1896`, **named omit** | skip to wakeup |
| boomhit | C after `u.dz`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `rn2(6)` on the throwit arm; saddle `rn2`/`rnl`; `rn2(5)` shard hp; water `d(2,6)` / `d(1,6)`; `potionbreathe` DEX `rn2` on monster hits (incl. `mthrowu` now that the stub is gone).

## C ↔ JS fidelity

Pinned C throwit (`dothrow.c:1590–1594`) is copied call-for-call: `dz>0 && usteed && POTION_CLASS && rn2(6)` then `potionhit(u.usteed, obj, POTHIT_HERO_THROW)`. Dart / non-potion / no-steed never consume `rn2(6)`. `rn2(6)==0` falls through to `hitfloor`.

Monster `potionhit`: `your_fault = how <= POTHIT_HERO_THROW` (BASH=0 THROW=1); JS constants match `obj.h:475–478`. Saddle `if` uses assignment-in-condition `saddle = which_armor` and the same `||` / `&&` short-circuit as C `:1647–1651` (`rn2(10)` first; water extras only if that failed and `otyp==POT_WATER`; first `rnl` always then; second `rnl` only if the cursed conjunct was false). `rn2(5) && mhp>1 && !hit_saddle` decrements after the crash line; `rn2(5)` still runs when `hit_saddle` (C order). Distance is `dist2(ux,uy,tx,ty)` ≡ `distu`. Evaporate skips oil and saddle; monster arm uses `Tobjnam` clone; **hero arm keeps** `The ${xname} evaporates` (pre-existing, documented).

`H2Opotion_dip` BUC glow matches C `:1514–1584` (blessed: uncurse amber / bless light-blue altfmt; cursed: unbless brown / curse black altfmt; uncursed + `carried` → `water_damage`). Unpaid `alter_cost` / `costly_alteration` and `mentioned_water` `makeknown` named — idle on a typical steed saddle (`carried` false). POT_WATER body: hates-blessings/were/vampshifter holy pain `d(2,6)` + `killed` / `new_were`; unholy heal + maybe beast; gremlin `split_mon`; iron golem rust `d(1,6)`. Live callees (`which_armor`, `split_mon`, `killed`, `healmon`, `wakeup`, `new_were`). Remaining otyps skip to `wakeup`/`msleeping=0` if alive — **named omit, not a silent stub of the throwit dispatch.**

`potionbreathe` gate now matches C DEX `rn2` + `breathless||haseyes`. Hero still `distance=0` so first conjunct true (same as old always-breathe unless poly’d breathless and eyeless). Monster hits (steed, `mthrowu`) newly consume that `rn2`.

This is **not** “Match C throwit dispatch, callee is a stub.” Crash/saddle/water run. Healing/sickness/etc. **are** skipped — the D-log names them; the subject does not claim them.

`Blind_pot` is a **diverging clone** of C `Blind` and of this file’s own `Blind()` (`:962–967`, D-0716, includes `uroleplay.blind`, no sticky `u.Blind`). It is used only for saddle `useeit`. Extra `u.Blind||u.ublind` is dead if D-0716 held; missing `uroleplay.blind` would let a born-blind hero see the glow. Public-unhit. Do **not** Must-fix a one-line Blind swap ahead of seemimic; name it.

## Hallucinations / overclaim

Subject + D-1297 say a downward potion while mounted can hit the steed. **The `rn2(6)` arm plus crash/saddle/water are the hunk.** Stamping **Addressed:** D-1297 is fair. Do **not** stamp “Match C remaining potionhit otyp switch.” Do **not** stamp “Match C shop unpaid `stolen_value`.” Do **not** stamp “Match C hero evaporate `Tobjnam`.” Do **not** stamp “Match C boomhit.” Do **not** stamp “Match C `Blind()` ≡ `Blind_pot`.” Do not stamp “Match C `is_plural` in `otense`” (quan≠1 clone, idle on quan=1 potions).

## Density

Throwit is four lines. potion.js +341 is the **callee envelope C’s comment names** (holy water vs cursed saddle). Upper end of §2b (~300), not “finish potions”: remaining otyps / dip callers / `impact_arti_light` stayed out. Local clones bulk the file; they match C except `Blind_pot`. Acceptable cluster; do not split in a follow-up peel without a C-wrong.

## Branch-by-branch confirm

1. Down potion + steed + `rn2(6)≠0`: `potionhit(usteed)`. Match `:1590–1594`.
2. `rn2(6)==0`: `hitfloor`. Match else.
3. No steed / not potion / `dz<=0`: no `rn2(6)`. Match short-circuit.
4. Saddle worn + `rn2(10)==0`: `hit_saddle`, no shard `mhp--` effect (but `rn2(5)` still rolled). Match.
5. Holy water on cursed saddle: `H2Opotion_dip` uncurse + glow if `useeit`. Match `:1715–1720`.
6. POT_WATER vs undead: pain / `d(2,6)` / maybe `killed`. Match `:1832–1844`.
7. Gremlin: `split_mon`. Iron golem: rust. Match.
8. POT_HEALING at steed: skip to wakeup (named otyp omit). Not a throwit miss.
9. Hero-hit path: still crash-on-head + acid; evaporate xname kept. Match documented keep.
10. boomhit still skipped. Named. Public-unhit unless a session throws a potion down while mounted (or `mthrowu` hits a monster with a potion — crash/saddle RNG now live).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `rn2(6)` is C’s dice, not a trace index.

## Verification

Journal: private canary **18**/18; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless mounted downward potion / monster-thrown potion-at-mon. Cadence this audit: full `sessions` at HEAD `086eb03d` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary. seed0103/0104 ride sessions still PASS (no downward potion).

## Actionable C-wrongs

None for Must-fix. throwit order, `rn2(6)` short-circuit, live `potionhit` crash/saddle/water, and DEX `potionbreathe` match C `:1590–1594` / `:1623–1911`.

Named omits (map, not Must-fix):

1. remaining monster otyp switch (heal / sickness / confuse / invis / sleep / para / speed / blind / oil explode / acid / poly)
2. shop unpaid `stolen_value` / `subfrombill`
3. boomhit; `sho_obj_return_to_u`; throw_gold swallow
4. hero evaporate `Tobjnam`; `body_part(HEAD)`; `Soundeffect`
5. `Blind_pot` vs file-local `Blind()` (saddle `useeit` only)
6. `H2Opotion_dip` unpaid / `mentioned_water`; `#dip` caller still its own path

Do not Must-fix “`You`/`pline_The` expanded.” Do not Must-fix “`isyou` via `null` not `youmonst`.” Do not Must-fix “`Tobjnam_pot` local clone.” Do not pull skipdrin this SHA.

## Callers / RNG ledger

C: `throw_obj` → `throwit`; `mthrowu` → `potionhit`. JS same; monster-target stub removal **adds** saddle/DEX RNG on `mthrowu` potion-at-mon. Public fortress is not evidence a holy-water bottle hit a saddle.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: downward potions while mounted now consume `rn2(6)` and can splash the steed via live crash/saddle/water; remaining otyps and boomhit stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1297 `6dfb7d2c`.
