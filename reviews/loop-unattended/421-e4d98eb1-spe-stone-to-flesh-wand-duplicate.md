# Review 421 — e4d98eb1 — spell.c SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate (D-1461)

## Metadata
- Full / short hash: `e4d98eb1b3b326bb2a2bf407f2b039753a5eea56` / `e4d98eb1`
- Parent: `f071b0ad` (D-1460). This file audits **this SHA only** (third of nine `js/` commits since review **418**). Archive **Addressed:** D-1461 `e4d98eb1` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 09:07:16 +0200
- D-id: **D-1461**
- Stats: 12 files, +539 / −165 — `js/zap.js` +344; `js/spell.js` +30 / −some; `js/uhitm.js` export `that_is_a_mimic` (+1). Journal rotate accounts for most docs churn.
- Claims to close: Open `zap.c` `weffects` SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate (named from D-1460 / review **420**). Not TELE. `reviews/loop-2026-08-15/` has no unpaid stone-to-flesh-cast Must-fix.
- JS / map: `spell.js` `spelleffects`; `zap.js` `bhitm` / `zapyourself` / `bhito` / `stone_to_flesh_obj` / `poly_obj` `mksobj(id)`; `uhitm.js` `that_is_a_mimic`. `c-js-map/turns.md`. Remaining TELE named at this SHA.
- Prior reviews this SHA claims to close: **420** remaining IMMEDIATE after CANCEL (STONE first); **418–419** named STONE after TURN/POLY.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate so casting stone to flesh calls weffects bhit and stone_to_flesh_obj instead of printing Nothing happens.”

C `spell.c` `:1478` is in the `:1457–1514` wand-duplicate fallthrough (last otyp in the group). `objects.h:1406–1408` `SPELL("stone to flesh", … IMMEDIATE … SPE_STONE_TO_FLESH)`. `oc_dir == IMMEDIATE` so `:1479` takes getdir / atme / self vs `weffects`. Self: `zapyourself` `:2966–3003` `polymon(PM_FLESH_GOLEM)` if stone golem, `Stoned` `fix_petrification`, invent `bhito`, paranoid `merged`. Directed: `weffects` `:3440–3451` IMMEDIATE `bhit(rn1(8,6), bhitm, bhito)`. `bhitm` `:490–520` golem `newcham` / stone-mimic `that_is_a_mimic`. `bhito` `:2412–2414` `stone_to_flesh_obj` `:1991–2112`. `poly_obj` `:1728–1736` `mksobj(id)` + `USES_CORPSENM`. Fake book SPBOOK skip makeknown. `physical_damage` FORCE_BOLT-only. C `zap_steed` does **not** `bhitm` STONE — mounted down falls through to `zap_updown` (named at this SHA).

Old JS: SPE_STONE_TO_FLESH fell through “Nothing happens.” Unlike D-1460, **callees were not live** (`stone_to_flesh_obj` missing; `poly_obj` used `mkobj(oclass)` not `mksobj(id)`).

The diff **does** add the `spelleffects` arm **and** ports `stone_to_flesh_obj`, `bhitm` STONE, `zapyourself` STONE, `bhito` STONE, `poly_obj` `mksobj(id)` + invent splice, `stone_object_type` / `stone_furniture_type`, export `that_is_a_mimic`. It **does not** dispatch TELE. Named. It **does not** add `zap_updown` STONE / `zap_map` engraving / worn-slot `poly_obj` remap. Named on the D-log.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_STONE_TO_FLESH arm | C `:1478–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing wrapper** | |
| `weffects` IMMEDIATE | C `:3440–3451`, **imported live** | `rn1(8,6)` then `bhit` |
| `bhitm` SPE_STONE_TO_FLESH | C `:490–520`, **wired this SHA** | golem / mimic / else `wake=false` |
| `stone_object_type` / `stone_furniture_type` | C `mkobj.c` `:1264–1295`, **local C-faithful clones** | S_* nums match `defsym.h` |
| `that_is_a_mimic` | C `uhitm.c`, **imported live** (export this SHA) | Blind/hallu still named in uhitm |
| `zapyourself` SPE_STONE_TO_FLESH | C `:2966–3003`, **wired this SHA** | |
| `polymon` / `fix_petrification` | C `polyself.c` / `eat.c`, **imported live** | |
| `bhito` SPE_STONE_TO_FLESH | C `:2412–2414`, **wired this SHA** | |
| `stone_to_flesh_obj` | C `:1991–2112`, **wired this SHA** | not a stub |
| `poly_obj` `mksobj(id)` | C `:1728–1736`, **wired this SHA** | was `mkobj(oclass)` |
| `poly_obj` invent splice | C `:1904–1913` clone | worn remap **named** |
| `zapyourself` merge loop | C `:2990–3001` **clone** | `mergable` + quan; not `merged()` |
| `animate_statue` | C `trap.c`, **imported live** | ANIMATE_SPELL flesh-golem |
| remaining TELE IMMEDIATE | C same fallthrough, **named omit** | |
| `zap_updown` STONE / `zap_map` engraving | C `:3355+` / `:3652–3657`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. Hardcoded `MAT_GEMSTONE=20` / `MAT_MINERAL=21` match `objclass.h`. `S_VWALL=1` … `S_SINK=36` match `defsym.h` PCHAR indices (same as `display.js`). **New gameplay RNG:** `rn1(8,6)` plus `obj_resists(2,98)` plus statue/figurine `makemon`. Public fortress does not `#cast` stone to flesh.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514`. **Callees are not stubs.** Hallucination check: “Match C weffects bhit **and** `stone_to_flesh_obj`” while this SHA **ports** `stone_to_flesh_obj` and wires `bhito` is **not** a dispatch-stub lie. D-log correctly says STONE callees were not live before (unlike POLY/CANCEL).

`bhitm` `:490–520`: snapshot `Monnam` then stone golem `newcham(FLESH, NO_NC_FLAGS)` / flesh “fleshier” / other golem “fleshy for a moment”; `canseemon` pline. Else stone furniture/object mimic: `cansee` then `set_msg_xy` + `that_is_a_mimic(MIM_REVEAL\|MIM_OMIT_WAIT)`. Else `wake=FALSE`. JS `mlet === 'S_GOLEM'` / `'S_MIMIC'` is this port’s mlet encoding (`is_golem` uses the same). `newcham(..., 0)` ≡ `NO_NC_FLAGS`. Order matches.

`zapyourself` `:2966–3003`: stone-golem `polymon`; `Stoned` `fix_petrification`; snapshot invent then `bhito` (learn if res); merge skip worn. JS snapshots `[...invent]` then `bhito` — matches `onxt = nobj` before mutate. Merge: C `merged(&otmp, &onxt)` (`invent.c`: globby `obj_absorb`, age-weighted average, `obj_stop_timers`, known XOR). JS imports `mergable` then **clones** quan/`owt`/known OR + `obj_extract_self`. Gate matches; body drops age/timers/globby/bypass. Meatball stacks still combine. **C-wrong clone**, not named on the D-log. Not a no-op.

`stone_to_flesh_obj` `:1991–2112` vs JS: mineral/gemstone else 0; `obj_resists(2,98)`; `get_obj_location(..., 0)` (invent → ux,uy live). ROCK/TOOL: boulder `ENORMOUS_MEATBALL`; statue/figurine: golem_xform / vegetarian `MEATBALL` break; statue `animate_statue(..., ANIMATE_SPELL)` (live; forces flesh golem); figurine `makemon(NO_MINVENT\|MM_NOMSG)` + shop `stolen_value` + timers/`useup`/`delobj` + “turns to flesh and animates”; then redundant golem `newcham`; else G_NOCORPSE\|G_UNIQ `res=0` else dump `cobj` + `poly_obj(CORPSE)`. RING/WAND/GEM meat; WEAPON FALLTHROUGH default `res=0`. Smell: Monk / `!unvegetarian` / `!carnivorous` odor else delicious. `newsym`. Branch order and RNG (`obj_resists`) match. `in_rooms`/`shop_keeper` imported.

`poly_obj` non-STRANGE path: C `mksobj(id, FALSE, FALSE)` + `USES_CORPSENM`. JS now `mksobj` (was `mkobj(oclass)` — that was a C-wrong this SHA **fixes**). Invent: C `replace_object` + `freeinv_core`/`addinv_core*`. JS array splice; worn remap named.

`bhito` `:2178–2179` allows STONE on invent (not floor-only). JS comment + case live.

## Hallucinations / overclaim

Subject says cast calls weffects bhit **and** `stone_to_flesh_obj` instead of Nothing happens. **True:** `#cast` getdir → self `polymon`/`fix_petrification`/invent `bhito` or `weffects` → `bhit` → `bhitm` golem/mimic + pile `stone_to_flesh_obj`; POLY/CANCEL stay; TELE still Nothing happens. Canary invent FLINT → MEATBALL is the `mksobj(id)` path. **False until named** for TELE, `zap_updown` STONE, `zap_map` engraving, worn remap, `merged()` body. Stamping **Addressed:** D-1461 for **dispatch plus the STONE callees** is fair. Do **not** stamp “Match C SPE_TELEPORT_AWAY” or “Match C zap_updown STONE.” Do **not** treat fortress PASS as a stone-to-flesh cast. `that_is_a_mimic` is exported live, not a glyph stand-in.

## Density

One IMMEDIATE otyp **plus** the callee cluster C actually runs (`stone_to_flesh_obj` / `bhitm` / `zapyourself` / `poly_obj` `mksobj`). ~344 lines of `zap.js` sits at the top of playbook §2b (50–300). Related envelope, not a second subsystem. Did not glue TELE. Acceptable but tight — merge clone is the quality tax.

## Branch-by-branch confirm

1. `#cast` directed: `weffects` `bhit(rn1(8,6))`. Match `:1478–1510`.
2. atme / leftover 0,0,0: `zapyourself`; stone golem `polymon`; Stoned `fix_petrification`; invent `bhito`; no `losehp`. Match `:2966–3003`.
3. Invent FLINT (MINERAL): `obj_resists(2,98)` then GEM? no, ROCK boulder? no, default ROCK `res=0` — wait: FLINT is GEM_CLASS in C → MEATBALL. Match GEM arm. Canary claimed this.
4. Boulder: `ENORMOUS_MEATBALL` + smell. Match `:2014–2016`.
5. Vegetarian statue: MEATBALL, no animate. Match `:2021–2025`.
6. Stone golem monster: `newcham` flesh + “turns to flesh!”. Match `:496–498`.
7. Non-stone mimic: `wake=false`. Match `:517–519`.
8. TELE still Nothing happens. Named.
9. Mounted down STONE is **not** `zap_steed` `bhitm` (absent from C `:3116–3134`); `zap_updown` still default. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `obj_resists(2,98)` is C `:2006`, not a recorded index. Local S_* / MAT constants match pinned headers, not session screens.

## Verification

Journal: private canary **17**/17 (C/JS grep; IMMEDIATE SPBOOK; atme TIME skip makeknown; zapyourself damage 0; bhitm kobold; east cast TIME; invent FLINT → MEATBALL; TELE still skips weffects; prior POLY/CANCEL/TURN/KNOCK/SLOW/LOCK/RAY/NODIR/DRAIN stay; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not a stone-to-flesh cast.

## Actionable C-wrongs

1. `zapyourself` SPE_STONE_TO_FLESH invent merge is a **local clone** of `invent.c` `merged()`: `mergable` then quan/`owt`/known OR + `obj_extract_self`. C `:2996` `merged(&otmp, &onxt)` also age-weights, stops timers, copies bypass, globby `obj_absorb`. `mkobj.js` `merged` exists and is not exported. **Not Must-fix** (typical meatball stack still merges; public-unhit). Next port should not skip Open TELE to chase this unless a later review elevates it.

None else for Must-fix. Dispatch reaches live `stone_to_flesh_obj`. `mksobj(id)` fix is real.

Named omits (map / Open, not Must-fix):

1. SPE_TELEPORT_AWAY IMMEDIATE — Open already at this SHA
2. `zap_updown` SPE_STONE_TO_FLESH; `zap_map` engraving
3. `poly_obj` worn-slot remap / sokoban_guilt / egg/leash
4. `that_is_a_mimic` Blind/hallu polish; globby merge in `stone_to_flesh_obj` smell path

Do not Must-fix “TELE should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “`mlet === 'S_GOLEM'` is a hallucination” (this port’s encoding). Do not Must-fix “FLINT is ROCK_CLASS” (it is GEM).

## Callers / RNG ledger

C callers: `spelleffects`; no wand STONE (spell-only). Dice: `rn1(8,6)`; `obj_resists(2,98)`; `animate_statue`/`makemon`. Public fortress does not hit the new cast.

`weffects` IMMEDIATE does not set `disclose` on the horizontal `bhit` arm. Fake SPBOOK skips `makeknown`. `bhito` STONE does not set `learn_it` (`:2412–2414`); self-invent learn is from `bhito` nonzero return only.

Verdict: **ACCEPT-WITH-DEBT**
