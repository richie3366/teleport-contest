# Review 88 — b4954c6f — `eat.c` `vomit` cantvomit/Sick/acid poly (D-1127)

## Metadata
- Full / short hash: `b4954c6fe26aea45f2f46671b29fdca7595e381e` / `b4954c6f`
- Parent: `6497347e` (D-1126). This file audits **this SHA only**. Archive row **Addressed:** D-1127 `b4954c6f` was filled by D-1128.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 02:36:54 +0200
- D-id: **D-1127**
- Stats: 15 files, +253 / −72 — `js/eat.js` +91 / −22 (`vomit` body + local `attacktype_fordmg`); `js/mondata.js` +22 (`cantvomit`); `js/zap.js` +46 (`ubreatheu` + `zhitu` ZT_ACID); callers await in `fountain.js` / `apply.js` / `eat.js` `choke`.
- Claims to close: Open queue `eat.c` `vomit` cantvomit/Sick/acid poly arms (named from drinkfountain). Not dryup. D-1126 next-port. `reviews/loop-2026-08-15/` has no open vomit Must-fix.
- JS / map: `eat.js` `vomit`; `mondata.js` `cantvomit`; `zap.js` `ubreatheu` / `zhitu`. `c-js-map/data.md` fountain + `turns.md` eat/zap. timeout `vomiting_dialog`, `zhitu` `acid_damage`/`erode_armor` bodies still named.
- Prior reviews this SHA claims to close: none as Must-fix. Named Open after D-1126.

## Intent vs deliverable

Git subject promises: “Match C eat.c vomit so cantvomit forms only gape, Sick food-poisoning can be cured, and acidic poly spew runs ubreatheu rather than stopping at nomul.”

Old JS `vomit()` was D-0371 `nomul(-2)` only. C `eat.c:3736–3784` also: `cantvomit` jaw-gape (no Sick cure, no spew); else `Sick && SICK_VOMITABLE` → `make_sick(0L,NULL,TRUE,SICK_VOMITABLE)`; FAINTING dry-heave vs `spewed`; then if spewed: yellow-dragon `AT_BREA`/`AD_ACID` `ubreatheu`, `IS_ALTAR` `altar_wrath`, `acidic` `melt_ice`. `nomul` stays gated on `gm.multi >= -2`.

The diff **does** that remaining body, plus `cantvomit` (mndx, because JS `mons()` is a fresh object) and `ubreatheu`→`zhitu` ZT_ACID (resist + `hliquid` + `d(nd,6)` + the three `rn2` gates). `acid_damage` / `erode_armor` **bodies** stay named; the gates are consumed. timeout.c `vomiting_dialog` still does not call `vomit`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `vomit` | C body, **rewritten** | `eat.c:3736–3784`; was nomul-only |
| `cantvomit` | C callee, **new** | `mondata.c:663–673`; mndx vs C `&mons[PM_*]` |
| `attacktype_fordmg` | C callee, **clone** | local in `eat.js` (makemon cycle); `AD_ANY==-1` |
| `make_sick(0,…,SICK_VOMITABLE)` | C callee, **imported** | `potion.js:593`; cure arm |
| `body_part(STOMACH)` | C callee, **imported** | `polyself.js`; `STOMACH=18` ≡ `hack.h` |
| `ubreatheu` | C callee, **new** | `zap.c:3017–3021`; `dtyp=20+adtyp-1` |
| `zhitu` ZT_ACID | C body, **rewritten** | resist/`hliquid`/`d(nd,6)`/`exercise(A_STR)`; `acid_damage`/`erode` bodies named |
| `Acid_resistance()` | C macro, **clone** | zap.js sticky `u.Acid_resistance \|\| H \|\| E`; C is `H\|\|E` only |
| `altar_wrath` | C callee, **imported** | `pray.js:891`; dynamic import |
| `acidic` / `is_ice` / `melt_ice` | C callees, **imported** | `monsters.js` / `zap.js` |
| `nomul(-2)` | C body, **kept** | still `multi >= -2` |
| timeout `vomiting_dialog` | C caller, **named omit** | JS timeout never calls `vomit` |
| `acid_damage` / `erode_armor` | C callees, **named omit** | gates consumed |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Dynamic `import('./zap.js')` / `pray.js` is ESM cycle-breaking, not `fs`. Rule #2 clean.

**New RNG on this path:** none in cantvomit/Sick/FAINTING/nomul. Spewed yellow dragon: `zhitu` may `d(nd,6)` then always `rn2(twoweap?3:6)`, `rn2(3)` iff twoweap, `rn2(6)` — C `zap.c:4540–4545` same **count and order**. `hliquid('acid')` may burn **display-rng** when Hallucinating (C does too). `melt_ice` has its own named body RNG only on acidic+ice.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. `u.ux`/`u.uy` are the live hero cell. One await boundary still `nhgetch`. Callers that used sync `vomit()` now `await` (fountain 20 / drinksink 9 / unicorn / choke). JS timeout still has no `vomit()` call — named, not a forgotten await. Do not pull pool dip into this SHA.

## C ↔ JS fidelity

### `vomit` branch order

C `eat.c:3738–3784`: `spewed=FALSE`; if `cantvomit(youmonst.data)` → jaw-gape; else Sick-cure then FAINTING heave vs `spewed=TRUE`; then `if (multi>=-2) nomul`; then if spewed: `attacktype_fordmg(..., AT_BREA, AD_ACID)` → `ubreatheu`; `IS_ALTAR` → `altar_wrath`; `acidic` → ice `melt_ice` (web TODO named).

JS `580–627`: `hero_form_data()` (youmonst.data or `mons(umonnum)`); same order; `nomovemsg = 'You can move again.'` ≡ C `You_can_move_again` (`decl.c:47`). `AT_BREA=12` / `AD_ACID=8` ≡ `monattk.h`. Match on the Open body. Cantvomit **does not** set spewed and **does not** cure Sick — C comment at `:3741–3742`.

### Callers of `vomit`

C: `eat.c` `choke` `:266`; `fountain.c` drinkfountain 20 / drinksink 9; `apply.c` unicorn `:2289`; `timeout.c` `:257` vomiting_dialog. JS awaits the first four. Timeout still named (vomiting_dialog texts). Guard: C `multi>=-2` so an already-immobilized hero does not reset nomul; JS same.

### `cantvomit`

C `mondata.c:663–673`: `mlet==S_RODENT` except `&mons[PM_ROCK_MOLE]` / `WOODCHUCK`; or warhorse/horse/pony. JS `600–612`: `mlet==='S_RODENT'` (generated `mlets[]` strings) and `mndx !== pm('ROCK_MOLE')` etc. Pointer compare is impossible (`mons()` allocates). `pm()` is `monsterNames.indexOf('PM_'+name)`. Human/tourist: not rodent, not horse → false. Match.

### `ubreatheu` / `zhitu` ZT_ACID — not a stub

C `zap.c:3017–3021`: `dtyp = 20 + mattk->adtyp - 1`; `zhitu(dtyp, mattk->damn, flash_str(dtyp, TRUE), u.ux, u.uy)`. AD_ACID 8 → dtyp 27 = `ZT_BREATH(ZT_ACID)`. `zhitu` switches `zaptype(type)%10` → 7 = `ZT_ACID`.

JS `1522–1526`: same dtyp formula; `flash_str(dtyp)` has no Hallu arm (C passes `TRUE` = no-hallu killer). `zhitu` `1480–1494`: `Acid_resistance()` → `"The ${hliquid('acid')} doesn't hurt."` dam=0; else burns + `d(nd,6)` + `exercise(A_STR,false)`; then the three `rn2` gates **without** `acid_damage`/`erode_armor`. C also always burns those three `rn2` after the resist pline (`:4540–4545`). Gate count matches. Missing `monstseesu(M_SEEN_ACID)` — named with other zhitu seen flags.

C `youprop.h:61`: `Acid_resistance` = `HAcid_resistance || EAcid_resistance` (no sticky, no B). JS zap clone ORs sticky `u.Acid_resistance`. Same pattern as this file’s Fire/Shock clones, not a new fountain fake. confer writes `HAcid_resistance`. Named clone, not Must-fix of the Open vomit line.

When a gate is true, C’s `acid_damage`/`erode_armor` may burn **more** RNG; JS does not. That is the named body omit (same shape as D-1121 `fill_pit` vs `flooreffects`). Public path unhit.

`altar_wrath` and `melt_ice` are real imports. Web-destroy is a C `TODO` — JS comments it; not a miss.

Local `attacktype()` now `!!attacktype_fordmg(..., -1)`. Remaining eat.js caller (`AT_MAGC` newt) still gets a boolean. `NATTK` walk is `slots.length` (generated `mattk[]` is 6).

## Hallucinations / overclaim

D-log / subject say cantvomit only gapes, SICK_VOMITABLE can be cured, and acidic poly spew runs `ubreatheu` rather than stopping at nomul. That is the hunk: jaw-gape, `make_sick(0)`, FAINTING vs spewed, `ubreatheu`→zhitu ZT_ACID, altar, melt_ice. They name timeout dialog and acid_damage bodies. Stamping **Addressed:** D-1127 is fair. Hash `b4954c6f` is on the archive row (filled by D-1128). This is **not** “Match C dispatch, callee is a stub”: `cantvomit`, `ubreatheu`, `zhitu` ZT_ACID damage, `altar_wrath`, and `melt_ice` are real. Do not read it as a close of `acid_damage`/`erode_armor` or vomiting_dialog.

## Density

One C function plus the callees that body needs (`cantvomit`, `ubreatheu`/`zhitu` ZT_ACID). Not “finish zap.c” and not a one-`if` FAIL peel. Related pool dip left named. ~91+22+46 JS. Right size for that queue line (§2b caller/callee cluster).

## Verification

Journal: private canary **27**/27 (rodent/horse/mole/chuck predicates; human nomul; SICK_VOMITABLE cure; SICK_ALL partial; FAINTING; yellow spew); green+strict seed8000/0900; cohort **22**/22 including 0014 fountain + 0002 drinksink + 0012 vomit + 0360/2200/4500; path **public-unhit** except existing nomul. Cadence fortress is not a yellow-dragon spew proof. This audit’s full `sessions` (cadence **#1435**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `eat.c:3736–3784`, `mondata.c:42–56` / `:663–673`, `zap.c:3017–3021` / `:4528–4546`, `youprop.h:61`; JS `eat.js:309–331` / `:580–627`, `mondata.js:600–612`, `zap.js:1477–1526`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| rodent/horse (not mole/chuck) | jaw-gape; no cure; no spew; maybe nomul | **same** |
| `Sick && SICK_VOMITABLE` | `make_sick(0)` | **same** |
| `uhs>=FAINTING` | dry-heave; no spew | **same** |
| else spew + yellow dragon | `ubreatheu` → zhitu ZT_ACID | **same dtyp/gates** |
| spew + altar | `altar_wrath` | **same** |
| spew + acidic + ice | `melt_ice` | **same** |
| `acid_damage`/`erode` | maybe extra RNG | **named skip**; gates consumed |
| timeout countdown | `vomiting_dialog` → `vomit` | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open `vomit` body matches `eat.c:3736–3784`. Gate RNG on ZT_ACID matches `zap.c:4540–4545`.

Named omits / do-nots (map / Open, not Must-fix):

1. timeout.c `vomiting_dialog` cantvomit/Hallu texts + the `vomit()` call (`timeout.c:257`).
2. `zhitu` `acid_damage(uwep/uswapwep)` / `erode_armor(..., ERODE_CORRODE)` bodies (`zap.c:4540–4545`).
3. `monstseesu`/`monstunseesu` M_SEEN_ACID on the ZT_ACID arm.
4. zap.js `Acid_resistance()` sticky vs youprop `H\|\|E` only.
5. C web-destroy TODO before ice — do not invent a JS web peel.
6. potion.c pool dip yn — **Addressed:** D-1128 `5b3923d7` (next SHA).
7. Do not restore nomul-only `vomit`. Do not skip the three `rn2` gates. Do not await a missing timeout caller. Do not Unchanging-gate vomit.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `vomit` now gapes cantvomit forms without curing Sick, cures SICK_VOMITABLE, dry-heaves when FAINTING, and on spew runs real `ubreatheu`→zhitu ZT_ACID plus altar/`melt_ice`, while acid_damage/erode bodies and timeout `vomiting_dialog` stay named.
- Must-fix stays empty for this SHA; next port popped Open `potion.c` pool dip yn. **Addressed:** D-1128 `5b3923d7`. Not drinkfountain.
