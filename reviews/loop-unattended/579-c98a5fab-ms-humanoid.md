# Review 579 — c98a5fab — sounds.c domonnoise MS_HUMANOID (D-1618)

## Metadata
- Full / short hash: `c98a5fabaa55940b12b3a2757e023efdd34b9e5b` / `c98a5fab`
- Parent: `5c66e2ab` (D-1617). This file audits **this SHA only** (seventh of nine `js/` commits since review **572**). Archive **Addressed:** D-1618 `c98a5fab`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 03:29:00 +0200
- D-id: **D-1618**
- Stats: `js/sounds.js` +102/−23, `js/mplayer.js` +1/−1. Band **150–350** (js/ insertions **103**).
- Claims to close: Open peaceful MS_HUMANOID after D-1606. Not mplayer_talk. Not MS_BOAST. `reviews/loop-2026-08-15/` has no unpaid sounds Must-fix.
- JS / map: `sounds.js` `domonnoise`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **567** named peaceful MS_HUMANOID, `"threatens you."` (and JS `ECMD_OK` vs C `ECMD_TIME` on that arm), MS_BOAST fallthrough.

## Intent vs deliverable

Git subject promises: peaceful MS_HUMANOID `#chat` uses C’s flee/moan/Huh/race lines (and MS_ORC `same_race`/Hallu remap) and hostile non-mplayers say `"threatens you."`, instead of staying silent after D-1606’s endgame-only arm.

Pinned C `sounds.c` `domonnoise` MS_HUMANOID `:1025–1104`. Remap `:705–709`. Epilogue `:1222–1241` (`verbalize1` = `verbalize("%s", …)` `hack.h:1029`). `--callers domonnoise`: `dochat` `:1408` (and steed/dogmove). `Race_switch` is `gu.urace.mnum` (`you.h:298`). Callees `t_at` / `is_elf` / `is_dwarf` / `likes_magic` / `is_gnome` / `same_race` / `Hallucination` / `mplayer_talk` (D-1606) live.

```1025:1104:nethack-c/upstream/src/sounds.c
    case MS_HUMANOID:
        if (!mtmp->mpeaceful) {
            if (In_endgame(&u.uz) && is_mplayer(ptr))
                mplayer_talk(mtmp);
            else
                pline_msg = "threatens you.";
            break;
        }
        if (mtmp->mflee)
            pline_msg = "wants nothing to do with you.";
        else if (mtmp->mhp < mtmp->mhpmax / 4)
            pline_msg = "moans.";
        /* … Huh / see / trapped / heal / hungry / elf / dwarf /
           likes_magic / S_CENTAUR / gnome / monsndx hobbit|arch|tourist */
        break;
```

Old JS: endgame `mplayer_talk` only; other hostiles and peaceful `ECMD_OK`; invented `` `${Monnam} says: "${verbl_msg}"` ``.

The diff **does** hostile else `"threatens you."` then stop; peaceful chain; MS_ORC remap; epilogue `pline` then `verbalize`; gnome `Hallucination && (rn2(4)%2)` short-circuit; mndx not `mons()` pointer. It **does not** port `case MS_ORC` `"grunts."` (`:987–990`), MS_BOAST (`:1006–1023`) including peaceful FALLTHROUGH, guardian/isshk/gecko remaps, `verbl_msg_mcan`, Death ucase. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `domonnoise` MS_HUMANOID | C `:1025–1104`, **LIVE this SHA** | |
| MS_ORC remap | C `:705–709`, **LIVE this SHA** | else-if after leader only |
| epilogue `verbalize` | C `:1222–1238`, **LIVE this SHA** | retired invented `says:` |
| `mplayer_talk` | C, **LIVE** | D-1606; `return ECMD_TIME` ≡ C break+empty epilogue |
| `t_at` / `same_race` / `is_elf` / `likes_magic` / `is_gnome` | C, **LIVE** | trap.js export, not steed clone |
| `Hallucination` | C youprop, **LIVE** | `display.js` (not do_name #2) |
| `case MS_ORC` grunts | C `:987–990`, **OMIT named** | remap-miss stays silent |
| MS_BOAST + FALLTHROUGH | C `:1006–1024`, **OMIT named** | Open row |
| isshk / guardian / gecko remap | C `:699–714`, **OMIT named** | |
| `verbl_msg_mcan` / Death ucase | C `:1224–1235`, **OMIT named** | |

`node scripts/csym.mjs` on `domonnoise` is the whole fn; arm citations above. `MS_ORC=24` `MS_HUMANOID=25` `MS_BOAST=43`.

RNG: conf/stun `!rn2(3)` then `rn2(2)`; gnome `rn2(4)` only if Hallu. Call-for-call with C. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
domonnoise       js/sounds.js:607   ASYNC — await required
mplayer_talk     js/mplayer.js:368   ASYNC — await required
same_race        js/mondata.js:211   sync
t_at             js/trap.js:974   sync  (+ steed.js:137 local clone; imported the export)
verbalize        js/display.js:4650   ASYNC — await required
Hallucination    js/display.js:344   sync
is_elf           js/monsters.js:565   sync
likes_magic      js/monsters.js:605   sync
is_gnome         js/monsters.js:575   sync
```

`--can sounds.js trap.js t_at`: ALREADY. `--can sounds.js mondata.js same_race`: ALREADY. `--can sounds.js display.js verbalize`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `t_at` #3. Do **not** add `Hallucination` #9. Do **not** restore `Monnam says:`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Hostile. Endgame `is_mplayer` → `mplayer_talk` then TIME. Else `pline_msg = "threatens you."` then **break** (no peaceful). JS if/else then epilogue. **Match `:1026–1031`.** Review **567**’s silent `ECMD_OK` on this arm is gone.

Peaceful order. flee → mhpmax/4 moan → conf/stun Huh ternary → `!mcansee` → trapped `t_at` `tseen=1` → mhpmax/2 heal → tame `!isminion` hungry → elf → dwarf → `likes_magic` → `mlet==S_CENTAUR` (`'S_CENTAUR'` as elsewhere) → gnome → `monsndx` hobbit/arch/tourist/default. Integer `/4` `/2`. **Match `:1034–1103`.** Hungry uses `edog?.hungrytime|0` vs C `EDOG(mtmp)` (live pets have edog).

Gnome RNG. C `Hallucination && (gnomeplan = rn2(4)) % 2`: skip `rn2` when !Hallu; odd → underpants (1) or profit (3); even → dungeon line. JS the same. **Match `:1063–1079`.**

MS_ORC remap. `same_race(ptr, youmonst.data) \|\| same_race(ptr, &mons[Race_switch]) \|\| Hallucination`. JS `mons(urace.mnum)`; `same_race` uses mndx. **Match `:705–709`.** Chained after leader only; C also has guardian/isshk **before** ORC. Named. Unmapped MS_ORC still `case` `"grunts."` in C; JS silent. Named other-MS.

Epilogue. `pline("%s %s", Monnam, pline_msg)` then `verbalize1(verbl_msg)`. JS pline then `verbalize` (`"${msg}"`). **Match `:1222–1238` minus mcan/Death.** Invented `says:` deleted. **C-wrong retired.**

Callee closure (HUMANOID arm). LIVE: `mplayer_talk`, `t_at`, `same_race`, `is_elf`/`is_dwarf`/`is_gnome`/`likes_magic`, `Hallucination`, `verbalize`, `rn2`. OMIT named: MS_BOAST, MS_ORC grunt, SetVoice. STUB: none. Arm may ship.

## Hallucinations / overclaim

Subject peaceful chatter + threatens + gnome-reachable remap: **true.** D-log “invented `says:` retired”: **true.** Do **not** stamp “Match C `case MS_ORC` `"grunts."` (`:987`).” Do **not** stamp “Match C MS_BOAST (`:1006`) / peaceful giant FALLTHROUGH.” Do **not** stamp “Match C isshk→MS_SELL / guardian genus / gecko.” Do **not** stamp “Match C `verbl_msg_mcan` / Death ucase.” Public `#chat` with a peaceful humanoid is unhit.

## Density

One `domonnoise` arm plus its remap and epilogue. +103 JS. Did not glue MS_BOAST. §2b OK.

## Branch-by-branch confirm

1. Hostile endgame mplayer: `mplayer_talk`, TIME. **Match** (D-1606).
2. Hostile else: `"threatens you."`, TIME. **Match this SHA.**
3. Peaceful flee/moan/Huh/see/trap/heal/hungry/races/default. **Match.**
4. Gnome Hallu odd/even / !Hallu no `rn2`. **Match.**
5. MS_ORC same_race/Hallu → HUMANOID. **Match.**
6. MS_ORC grunt / MS_BOAST / isshk. **Named.**

## Callers / RNG ledger

Wired: `domonnoise` (`dochat` / steed). Conf: up to two `rn2`. Gnome: one `rn2(4)` iff Hallu. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not restore `Monnam says:`. Do not compare `data` pointer for hobbit/arch/tourist. Do not import `Hallucination` from `do_name.js`. Do not add `t_at` in `sounds.js`. mplayer_talk is D-1606.

## Verification

D-log private canary **34**/34; green+strict seed8000/0900; cohort **9**/9 + strict. **Public-unhit** for peaceful HUMANOID / `"threatens you."` / gnome gag (`#chat` not in public traces). Fortress does not prove Huh vs What vs Eh. MS_BOAST unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): MS_BOAST hostile + peaceful FALLTHROUGH (`sounds.c:1006–1024`); `case MS_ORC` `"grunts."` (`:987–990`); guardian/isshk/gecko remaps (`:699–714`); `verbl_msg_mcan`; Death ucase; other MS_*. Do not glue MS_BOAST into this arm. Do not add `domonnoise` #2.

Verdict: **ACCEPT-WITH-DEBT**
