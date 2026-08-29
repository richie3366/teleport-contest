# Review 650 — 658cd53c — engrave.c doengrave non-hands stylus (D-1689)

## Metadata
- Full / short hash: `658cd53ca80ee40ca44c3bfb685642e7aa2a8770` / `658cd53c`
- Parent: `ac894764` (D-1688). This file audits **this SHA only** (sixth of nine `js/` commits since review **644**). Archive **Addressed:** D-1689 `658cd53c`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 23:04:15 +0200
- D-id: **D-1689**
- Stats: `js/engrave.js` +548/−110; `js/objects.js` +20/−1; `js/objnam.js` +22/−0; `js/read.js` +1/−1; `js/rumors.js` +2/−2. Total `js/` insertions **593** >250. Band **200–450**.
- Claims to close: Open non-hands stylus after D-1675 canned IA_ENGRAVE KEY (`getobj_stylus` Never mind). Not yn add-to. Not dulling/marker occupation. Not altar/jello/`disturb_grave` from `doengrave`. `reviews/loop-2026-08-15/` has no unpaid stylus Must-fix.
- JS / map: `engrave.js` `doengrave` / `doengrave_sfx_item` / `_WAN`; `is_blade`/`is_boots`; `Yobjnam2`; `wand_explode` export; `xcrypt` export. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **636** named non-hands body still Never mind.

## Intent vs deliverable

Git subject promises: a non-hands stylus runs `doengrave_sfx_item`/`_WAN` (wand/weapon/marker/towel/gem/boots) instead of Never-minding after D-1675 canned KEY.

`node scripts/csym.mjs doengrave` → `engrave.c:955–1263`. `--callers`: `cmd.c:43`; comments. `doengrave_sfx_item` `:741–892` (`--callers` `:1034`). `doengrave_sfx_item_WAN` `:582–738` (`--callers` `:802`). `doengrave_ctx_init` `:544–579` (`:968`). `doengrave_ctx_verb` `:895–925`. `stylus_ok` `:480–499`. `freehand` `:472–477`. `cant_reach_floor` `:217–228`. `u_can_engrave` `:502–541`. `getobj` `:977`. `zapnodir` `zap.c:2538–2602`. `wand_explode` `read.c` (`--callers` `engrave.c:795`). `is_blade` `obj.h:213–216`. `is_boots` `obj.h:285–287` (`ARM_BOOTS=4`). `Yobjnam2` `objnam.c:2279–2286` (`--callers` `engrave.c:830/:862/:870`). `aobjnam` `:2243–2258`. `yobjnam` `:2261–2276`. `xcrypt` `hacklib.c:399–415`. `blengr` `:1764–1768` / `blind_writing[]` `:1743–1762`. `WAND_BACKFIRE_CHANCE` `hack.h:1410` = 100.

```977:981:nethack-c/upstream/src/engrave.c
    de->otmp = getobj("write with", stylus_ok, GETOBJ_PROMPT);
    if (!de->otmp) {/* otmp == &hands_obj if fingers */
        de->ret = ECMD_CANCEL;
        goto doengr_exit;
    }
```

```1033:1035:nethack-c/upstream/src/engrave.c
    /* SPFX for items */
    if (!doengrave_sfx_item(de))
        goto doengr_exit;
```

Parent: canned KEY then `getobj_stylus` Never-minded any real object. The diff **deletes** `getobj_stylus`/`stylus_lets`, calls live `getobj('write with', stylus_ok, GETOBJ_PROMPT)`, ports sfx by oclass (zappable/`check_unpaid`/`rn2(100)`/`wand_explode`/`zapnodir`, Fire Brand `is_art`, blade `welded`/spe≤−3/`is_blade`, marker MARK, towel wipe/`dry_a_towel`, `oc_tough`, boots DUST, large/silly), `You`+`doname`, type-mismatch wipe without yn. It **does not** port altar/`jello`/`disturb_grave` before sfx, `yn_function` add-to, or carving/ink occupation. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `getobj` | LIVE | invent.js |
| `stylus_ok` | CLONE | C static; SUGGEST weapon/wand/gem/ring + towel/marker |
| `doengrave_sfx_item` / `_WAN` | CLONE | C static; oclass/otyp arms |
| `doengrave_ctx_init` / `_verb` | CLONE | jello always false (named) |
| `zappable` / `learnwand` / `zapnodir` | LIVE | zap.js; NODIR includes STASIS D-1404 |
| `wand_explode` | LIVE | export this SHA; `read.js:593` ASYNC |
| `check_unpaid` | LIVE | shk.js ASYNC |
| `is_blade` / `is_boots` | LIVE | objects.js this SHA = `obj.h` |
| `is_art` / `welded` / `Yname2` | LIVE | |
| `Yobjnam2` / `aobjnam` / `yobjnam` | LIVE export | **`aobjnam` skips C `quan!=1` prefix** |
| `dry_a_towel` / `is_wet_towel` / `hands_obj` | LIVE | weapon.js |
| `xcrypt` | LIVE | rumors.js export this SHA |
| `blengr` | CLONE | C `blind_writing[]` bytes; `rn2(9)` |
| `random_engraving` | LIVE | WAN_POLYMORPH; pre-existing |
| `getobj_stylus` | deleted | was Never-mind clone |

`node scripts/sym.mjs` on deleted/re-pointed:

```
getobj_stylus    NOT FOUND in js/** (no export, no local function/const).
wand_explode     js/read.js:593   ASYNC — await required
xcrypt           js/rumors.js:19   sync
Yobjnam2         js/objnam.js:1920   sync
             !! ALSO 2 LOCAL CLONE(S) — sit.js:250  wield.js:1111
aobjnam          js/objnam.js:1903   sync
             !! ALSO 1 LOCAL CLONE — artifact.js:1086
yobjnam          js/objnam.js:1910   sync
             !! ALSO 1 LOCAL CLONE — eat.js:2019
is_blade         js/objects.js:128   sync
             !! ALSO 2 LOCAL CLONE(S) — dothrow.js:492  lock.js:1150
is_boots         js/objects.js:138   sync
             !! ALSO 3 LOCAL CLONE(S) — do_wear.js:165  u_init.js:1005  worn.js:107
doengrave        js/engrave.js:1034   ASYNC — await required
```

`--can js/engrave.js js/read.js wand_explode` / `zap.js zapnodir` / `objnam.js Yobjnam2`: ALREADY static. Cycle = existing SCC; no new TDZ. FORCE/DIAG/getRngLog/fastforward/seed names: none. `imports.mjs --rulecheck` clean at HEAD.

## C ↔ JS fidelity

`doengrave` `:977` getobj then `:993` freehand then reach `:1003–1011` then **C altar `:1013–1017` / grave `:1019–1030` then sfx `:1034`**. JS jumps from reach to sfx. Altar/`jello`/`disturb_grave` named. After sfx C `:1037–1046` grave → HEADSTONE if ENGRAVE/`type==0` else force DUST; JS omits (same named grave row).

**`stylus_ok` / `freehand` / ctx.** C `stylus_ok` `:480–499` SUGGEST weapon/wand/gem/ring + towel/marker else DOWNPLAY; null obj SUGGEST (hands). JS clone. `freehand` `:472–477` `!uwep || !welded || (!bimanual && (!uarms || !uarms->cursed))`. JS export. `doengrave_ctx_init` `:544–579` DUST default; demon/vampire `ENGR_BLOOD`; `frosted = is_ice`; `jello` swallow named (JS always false). `doengrave_ctx_verb` `:895–925` adding vs first-write strings — JS clone including BURN frost melt.

**`u_can_engrave`.** C `:502–541` swallow Jonah / whirly `cant_reach` / lava/pool/fountain You_cant surface / AIR thin air or cloud / `!ACCESSIBLE` “write here” / `cantwield` / `check_capacity`. JS floor-gate + one generic pline from `doengrave`. Named messages. `cantwield`/`check_capacity` still deferred.

Sfx WAND: `zappable` then `check_unpaid` then `cursed && !rn2(100)` then `wand_explode(..., 0)` `ECMD_TIME` / FALSE — same order as C `:791–797`. Empty wand `spe<0` dust vs worn-out pline `:808–814`. WAN `_WAN` otyp via `objectNames` strings vs C `case WAN_*`; NODIR `await zapnodir` LIVE (light/findit/stasis/`create_critters`/wish/enlighten). POLY: `type=0` + `random_engraving` `{text,pristine}` ≡ C outbuf wiped / ebuf pristine. Blind POLY `xcrypt(blengr())`. COLD FALLTHROUGH into cancel/invis. Dig/fire/lightning `wand_learn` ≡ C `flags.verbose` + `doknown`. Backfire RNG one `rn2(100)` after zappable’s wrest/`spe--`.

WEAPON: Fire Brand BURN else blade welded scratch / spe≤−3 `Yobjnam2(...,'are')` else ENGRAVE. TOOL ublindf FAIL; MAGIC_MARKER/TOWEL via `objectNames.indexOf` (not undefined). ARMOR boots DUST else FALLTHROUGH large-object. RING/GEM `oc_tough` (extract `r[4]`).

**Callee closure (sfx live arms).** WAND zappable: LIVE `zappable` / `check_unpaid` / `wand_explode` / `doengrave_sfx_item_WAN` / `zapnodir`. WEAPON: LIVE `is_art` / `is_blade` / `welded`. TOOL marker/towel: LIVE `dry_a_towel` / `is_wet_towel` / `Yobjnam2`. GEM/RING: table `oc_tough`. BOOTS: LIVE `is_boots`. Large/silly/venom/illobj: pline only (C `You_cant` / `impossible` for ILLOBJ). STUB in these arms: **none**. Occupation dull/ink after getlin is **OMIT** named (finger DUST rate 10 still runs). Combined-arm ships.

**`doengrave_sfx_item_WAN` otyp.** C `switch (de->otmp->otyp)` `:585–737`: NODIR six wands `zapnodir`; STRIKING/SLOW/SPEED post_engr_text; POLY `random_engraving` / `xcrypt(blengr())`; NOTHING/UNDEAD/OPEN/LOCK/PROBE break; MAGIC_MISSILE holes; SLEEP/DEATH bugs stop; COLD FALLTHROUGH cancel/invis vanish; TELEPORT `teleengr`; DIG/FIRE/LIGHTNING type+learn+post text (dig surface/grave/frost/drawbridge). JS `objectNames[otyp]` strings, same cases including WAN_STASIS via `zapnodir` (D-1404). `blengr` `rn2(9)` over C `blind_writing[]` bytes `:1743–1762`.

Post-sfx: `doknown`→`learnwand`/`more_experienced(0,10)`; `teleengr`/`dengr`; `*buf` `make_engr_at`; zapwand dust `useup`; `!ptext` TIME + wand `cant_reach(..., TRUE)`. Add-to: same-type defaults `'y'` without `yn_function` (named). HEADSTONE always-append C `:1114–1116` unhit because grave type conversion omitted. Mix-up `rn2(25/11/7/4/2)` + `rnd(96-2)` matches `:1223–1226`. `set_occupation(..., 0)` not timed. `doblind` uses `!(Blind||Unaware)` not C `!resists_blnd(&youmonst)` `:1248`.

**Empty getlin.** C `:1199–1209` zapwand glow/fade TIME else `Never_mind`. JS `doengrave_empty_text`. **Match.** `You`+`doname` with `"1 of "` when ENGRAVE && quan>1 `:1176–1181`. JS the same. C literate livelog on first non-`x` `:1213–1216` named.

**`engrave` occupation.** C `engrave()` after this SHA still named for carving rate / marker ink / dull. JS `engrave_occupation` keeps finger DUST rate 10 and invent-walk stylus gone. Not a stub inside the sfx arms.

**Reach / wand gesture.** C `:1003–1011` non-wand `cant_reach_floor(..., FALSE)`; wand “You gesture… towards the surface below you.” JS extra `is_hands_stylus` is redundant (hands are not WAND). `WAND_BACKFIRE_CHANCE` 100 (`hack.h:1410` / `js/const.js:1773`). `zappable` wrest `rn2(WAND_WREST_CHANCE)` then `spe--` before backfire `rn2(100)` — C `zap.c` then engrave `:791–797`.

**Towel / marker.** C towel wipe only DUST/ENGR_BLOOD/MARK; wet `dry_a_towel(-1, TRUE)`; Blind dusty/frosty. Marker `spe<=0` dried else MARK. JS the same. `disturb_grave` exists in `engrave.js` for kick; `doengrave` still does not call it (named).

```791:797:nethack-c/upstream/src/engrave.c
        if (zappable(de->otmp)) {
            check_unpaid(de->otmp);
            if (de->otmp->cursed && !rn2(WAND_BACKFIRE_CHANCE)) {
                wand_explode(de->otmp, 0);
                de->ret = ECMD_TIME;
                return FALSE;
```

JS `await` those three callees in that order. `is_blade` `obj.h:213–216` P_DAGGER..P_SABER; `is_boots` `obj.h:285–287` ARM_BOOTS=4 stored in `oc_skill`.

`aobjnam` `:2248–2251` prefixes `"%ld "` when `quan!=1`; JS `cxname`+verb only. Dull/towel `Yobjnam2` therefore drops the stack count. `u_can_engrave` swallow/lava/pool still return false with one generic pline (named messages).

## Hallucinations / overclaim

Not “dispatch ported, callee stubbed.” Sfx callees are LIVE. Overclaim would be “full `doengrave`.” Map names occupation/yn/altar. `u_can_engrave` is still a floor-gate clone, not C `:502–541`.

## Density

§2b: one `doengrave` sfx cluster (related oclass arms + `is_blade`/`is_boots`/`Yobjnam2`/`wand_explode`/`xcrypt`). Not a one-bullet peel.

## Verification

Journal: private canary **10**/10; green+strict seed8000/0900; seed0101; cohort **7**/7 + strict. Public suite unhit for stylus oclass (fortress). Cadence later at HEAD.

## Actionable C-wrongs

1. **`aobjnam` quan prefix** — `objnam.c:2248–2251` `strprepend` count when `quan!=1`. One port: add that prefix (keep `cxname`/`otense`). Sit/wield `Yobjnam2` clones stay until they import.
2. Named only (map, not Must-fix): `yn_function` add-to `:1120`; altar/`jello`/`disturb_grave` + grave HEADSTONE `:1013–1046`; occupation dull/ink; `resists_blnd` vs Unaware; `u_can_engrave` Jonah/You_cant; livelog literate; BUFSZ add-room `:1163`.

Do **not** restore `getobj_stylus`. Do **not** skip `zappable` before backfire. Do **not** invent DUST for non-hands.

Verdict: **ACCEPT-WITH-DEBT**
