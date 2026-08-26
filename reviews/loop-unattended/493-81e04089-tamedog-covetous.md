# Review 493 — 81e04089 — dog.c tamedog is_covetous / is_demon-vs-hero (D-1532)

## Metadata
- Full / short hash: `81e04089e78897f5f5cbb2b9603b41d6e68dc155` / `81e04089`
- Parent: `3c112783` (D-1531). This file audits **this SHA only** (second of nine `js/` commits since review **491**). Archive **Addressed:** D-1532 `81e04089`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 06:16:15 +0200
- D-id: **D-1532**
- Stats: 12 files, +303 / −234 — `js/dog.js` +56 / −19. Band 150–350 (js/ insertions 56).
- Claims to close: Open `dog.c` `tamedog` is_covetous (named from D-1531 / D-1502). Not leftovers. `reviews/loop-2026-08-15/` has no unpaid tamedog Must-fix.
- JS / map: `dog.js` `tamedog`. `c-js-map/data.md` + `turns.md`.
- Prior reviews this SHA claims to close: none unpaid; Open row after D-1531.

## Intent vs deliverable

Git subject promises: covetous monsters and demons (unless the hero is a demon) stay peaceful rather than tame.

Pinned C `dog.c` `tamedog` `:1143–1281`. The reject `if` is `:1240–1248`; quest leader `:1250`. Same function also: blessed scroll `:1150–1154` / `:1227–1231`; `make_happy_shk` `:1235–1238`; givemsg `pline_mon` `:1169–1173` / `:1270–1272`; `mon_wield_item` `:1277–1280`.

```1240:1251:nethack-c/upstream/src/dog.c
    if (!mtmp->mcanmove
        || mtmp->isshk || mtmp->isgd || mtmp->ispriest || mtmp->isminion
        || is_covetous(mtmp->data) || is_human(mtmp->data)
        || (is_demon(mtmp->data) && !is_demon(gy.youmonst.data))
        || (obj && dogfood(mtmp, obj) >= MANFOOD))
        return FALSE;

    if (mtmp->m_id == svq.quest_status.leader_m_id)
        return FALSE;
```

`mondata.h`: `is_covetous` = `mflags3 & M3_COVETOUS` (`0x001f`); `is_demon` = `mflags2 & M2_DEMON`.

Old JS rejected isshk/isgd/ispriest/isminion/is_human only; comment named covetous/demon. No bless +2, no shk pacify, no success `pline_mon`, no post-tame wield.

The diff **does** import live `is_covetous`/`is_demon`, add the same-if demon-vs-hero, nonzero `leader_m_id`, blessed +2 clamp 10, givemsg `pline_mon`+`Hallucination`, `mon_wield_item`, and call `make_happy_shk`. It **does not** call live `wake_nearto` (clears `msleeping` locally), nor FULL_MOON `rn2(6)`, ustuck `expels`/`unstuck`, `redraw_worm`, big_corpse/Tobjnam, or `has_edog` vs `!mtame`. Named in the map.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| covetous/demon reject | C `:1244–1246`, **LIVE this SHA** | imported macros |
| `is_covetous` | C `mondata.h:153`, **LIVE** | `monsters.js:299` `M3_COVETOUS` |
| `is_demon` | C `mondata.h:110`, **LIVE** | `monsters.js:737`; pray.js clone unused here |
| quest `leader_m_id` | C `:1250`, **LIVE** | JS skips when id 0 |
| blessed_scroll +2 | C `:1150–1154`/`:1227–1231`, **LIVE** | |
| `make_happy_shk` | C `shk.c:1395`, **STUB** | pacify+calms; home/migrate/adjalign/shoppers deferred |
| givemsg `pline_mon` | C `:1169`/`:1270`, **LIVE** | display `Hallucination` |
| `mon_wield_item` | C `weapon.c`, **LIVE** | existing partial wield |
| `attacktype` | C `mondata.h`, **CLONE** `dog.js:116` | 7 clones; not #8 |
| `wake_nearto` | C `:1160–1161`, **OMIT named** | **LIVE** `mon.js:1091`; not called |
| FULL_MOON / ustuck / `redraw_worm` | C, **OMIT named** | |

`node scripts/sym.mjs tamedog is_covetous is_demon is_human make_happy_shk mon_wield_item pline_mon Hallucination canspotmon wake_nearto initedog attacktype pacify_shk dogfood`:

```
tamedog          js/dog.js:352   ASYNC — await required
is_covetous      js/monsters.js:299   sync
is_demon         js/monsters.js:737   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — js/pray.js:754
is_human         js/monsters.js:560   sync
make_happy_shk   js/shk.js:1257   ASYNC — await required
mon_wield_item   js/weapon.js:503   ASYNC — await required
pline_mon        js/display.js:4139   ASYNC — await required
Hallucination    js/display.js:320   sync
                 js/do_name.js:171   sync
canspotmon       js/display.js:527   sync
wake_nearto      js/mon.js:1091   ASYNC — await required
             !! ALSO 4 LOCAL CLONE(S)
initedog         js/dog.js:75   sync
attacktype       NOT EXPORTED — but 7 LOCAL CLONE(S) … js/dog.js:116 …
pacify_shk       NOT EXPORTED — but 1 LOCAL CLONE(S) in js/shk.js:199
dogfood          js/dogmove.js:118   sync
```

No symbol deleted. `is_covetous`/`is_demon` are imports, not new clones. `make_happy_shk` is exported but its body is not C `:1395–1435`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New RNG:** blessed path `rnd(10)` already existed; FULL_MOON `rn2(6)` still omitted (no extra dice).

## C ↔ JS fidelity

Reject `if`. Order: `!mcanmove`, extras, `is_covetous`, `is_human`, `is_demon(mtmp) && !is_demon(youmonst)`, then `obj && dogfood >= MANFOOD` (JS splits the last conjunct; short-circuit still skips `dogfood` when covetous). **Match `:1240–1248` bits.** `M3_COVETOUS` `0x001f` **match `monflag.h:168`.** Demon vs `game.youmonst?.data`: if `youmonst` is missing, optional chaining treats the hero as non-demon and extra-rejects; after init `youmonst` is set.

Leader. C compares `m_id == leader_m_id` with no zero gate. JS `if (leader_m_id && …)`. Equivalent iff live `m_id` is never 0 (makemon ids start at 1). **Match the intended C quest-leader reject.**

Blessed bump. Scroll/spellbook sets `blessed_scroll` then `obj=NULL` before food logic. `mtame<10`: `rnd(10)` then `+2` clamp 10, `return FALSE`. **Match `:1224–1232`.**

Givemsg. `canspotmon` then `pline_mon` chill/amiable; `givemsg=false`; success line approachable/friendly. `Hallucination()` is display’s `HHallucination && !resist` (D-1493). **Match `:1169–1173` + `:1270–1272`.**

Wield. Local `attacktype` walks `mattk[].aatyp`; `AT_WEAP=254` **match `monattk.h`.** `NEED_HTH_WEAPON` + live `mon_wield_item`. **Match `:1277–1280` for the call.** Callee still defers weld/artifact_light (pre-existing).

**isshk arm is not C.** C `:1235–1238` + `make_happy_shk` `:1395–1435`: `pacify_shk`; `following=0`; `robbed=0`; **`adjalign` unless Rogue**; if `!inhishop`: `home_shk` or `mdrop_special_objs`+`migrate_to_level`+`dismiss_kops`; then **`make_happy_shoppers`** (`kops_gone`/`pacify_guards`). JS `:1257–1268`: pacify, zero follow/robbed, `calms down` if `ANGRY`; comment `home_shk / migrate / shoppers deferred`; `_silentkops` unused. **STUB in a live arm they just wired.** Old JS was `isshk → return false` after the bump (also not C, but it did not pretend to pacify). This SHA claims the C call.

Callee closure. Covetous/demon/leader/bless/pline/wield: LIVE or verified CLONE. `wake_nearto`/FULL_MOON/ustuck/`redraw_worm`: OMIT named (`wake_nearto` is nevertheless LIVE in `mon.js` and `dog.js` already imports `mon.js`). **isshk: STUB `make_happy_shk`.** That arm should have stayed an Open row, not ridden the covetous envelope.

## Hallucinations / overclaim

Subject covetous/demon stay peaceful: **true of `:1244–1246`.** D-log/map “Match C `make_happy_shk`” is **false** — dispatch to a stub. This **is** “dispatch ported, callee stubbed” for the isshk arm. Stamping **Addressed:** D-1532 is fair for **covetous/demon/leader/bless/+2/pline/wield**. Do **not** stamp “Match C `make_happy_shk`.” Do **not** stamp “Match C `wake_nearto`.” Do **not** stamp “Match C FULL_MOON S_DOG.”

## Density

+56 JS: one C function leftover cluster (§2b OK) **except** gluing the isshk call onto an unfinished `make_happy_shk`. Did not glue `o->lit`.

## Branch-by-branch confirm

1. Covetous (any `M3_WANTS*`): reject, already peaceful. **Match.**
2. Demon vs non-demon hero: reject. **Match.**
3. Demon vs demon hero: not that conjunct. **Match.**
4. Human / priest / gd / minion / frozen: reject. **Match.**
5. Quest leader nonzero id: reject. **Match.**
6. Blessed scroll already-tame: +2 clamp 10, not newly tame. **Match.**
7. Success givemsg + AT_WEAP wield. **Match the calls.**
8. isshk: pacify stub, no adjalign/home/migrate/shoppers. **Not C.**
9. Sleep: local `msleeping=0`, no `wake_nearto`. **Named omit.**
10. FULL_MOON dog `rn2(6)`: skipped. **Named omit.**

## Callers / RNG ledger

C callers: throw food, read/zap taming, potion, trap, music, demonpet. Public seed0004 feeding-pony stays FULL (already-tame food path). Covetous/demon/shk taming public-unhit. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log canary **19**/19 (lich covetous, horned devil vs human/demon hero, quest leader, blessed +2, Rule #2); green+strict; cohort **7**/7 including seed0004. Canary does **not** exercise `make_happy_shk` leftover callees. Public-unhit for covetous/shk.

## Actionable C-wrongs

1. **`shk.c` `make_happy_shk`** (`:1395–1435`): port `adjalign` (non-Rogue), `!inhishop` `home_shk` / `mdrop_special_objs`+`migrate_to_level`+`dismiss_kops`, and `make_happy_shoppers` (`kops_gone`/`pacify_guards`) so `tamedog` `:1235–1238` matches C, not pacify+“calms down” only. One port. Do **not** re-do covetous/demon.

Verdict: **QUALITY-RISK**
