# Review 767 — 8767a241 — monmove.c dochug remaining + wormhitu (D-1798)

## Metadata
- Full / short hash: `8767a2412b2100ca3ff6fc59891ce3c43187a29e` / `8767a241`
- Parent: `819bccab` (D-1797 AWD). Map-driven Open. Does not re-open 764.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 02:13:57 +0200
- D-id: **D-1798**
- Stats: `js/monmove.js` +135/−26; `js/worm.js` +24/−1. Total `js/` insertions **159** ≤250. Band **80–350**.
- Claims to close: Open `monmove.c` `dochug` remaining arms + `worm.c` `wormhitu`. Not `m_move`.
- JS / map: `monmove.js` `dochug` / `m_arrival` / `release_hero` / `leppie_stash`; `worm.js` `wormhitu`. `c-js-map/turns.md`. Archive **Addressed:** D-1798 `8767a241`.

## Intent vs deliverable

Git subject promises: Match C `monmove.c` `dochug` remaining arms and `worm.c` `wormhitu` so STRAT_ARRIVE, `leppie_stash`, `release_hero`, MS_BRIBE mux, S_LEPRECHAUN `findgold`, `isgd` vanish, MOVED unstuck/helpless, PHASE FOUR `quest_talk`, and tail-seg `mattacku` actually run, instead of skipping them after muse/watch.

`node scripts/csym.mjs dochug` → `monmove.c:689–989`. `m_arrival` `:572–579`. `release_hero` `:361–372`. `leppie_stash` `:1153–1171`. `wormhitu` `worm.c:343–362`. `--callers wormhitu`: sole live `dochug:975`. `--callers leppie_stash`: `dochug:748`. `--callers release_hero`: `dochug:765` + `monflee:473`.

Parent stopped after muse/watch/wield/bee/cube/`m_move`. The diff **does** add those listed arms. Subject is true for them. It does **not** wire `monflee`’s `release_hero` (`:473`) — still the named comment at `monmove.js:774`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `dochug` | LIVE repaired | remaining C arms |
| `m_arrival` | LIVE local | C `staticfn`; always −1 |
| `release_hero` | LIVE local | dochug Conflict path; **monflee caller named** |
| `leppie_stash` | LIVE local | `mdrop_obj` subset + named remainder |
| `wormhitu` | LIVE new | `js/worm.js`; `mattacku` LIVE |
| `findgold` | CLONE (invent[]) | steal.js export is nobj-only; do **not** add #3 |
| `mdrop_obj` | CLONE subset / OMIT rest | dogmove clone stays; no steal.js export |
| `expels` / `unstuck` / `set_malign` / `in_rooms` / `g_at` / `place_object` / `stackobj` / `bury_an_obj` / `quest_talk` / `tele_restrict` / `is_demon` | LIVE imports | |
| `demon_talk` / `cuss` | OMIT named | NOT FOUND in `js/` |
| `sticks` | LIVE local export | pre-existing in this file |

`node scripts/sym.mjs` (new / re-pointed):

```
wormhitu         js/worm.js:190   ASYNC — await required
m_arrival        NOT EXPORTED — 1 LOCAL (monmove.js:2058) — do NOT write #2
release_hero     NOT EXPORTED — 1 LOCAL (monmove.js:2067) — do NOT write #2
leppie_stash     NOT EXPORTED — 1 LOCAL (monmove.js:2084) — do NOT write #2
findgold         js/steal.js:52   sync  + makemon.js / monmove.js clones — do NOT add #3
mdrop_obj        NOT EXPORTED — 1 LOCAL (dogmove.js:582) — do NOT write #2
bury_an_obj      js/dig.js:383   ASYNC
unstuck          js/mhitu.js:1384   ASYNC
expels           js/mhitu.js:1409   ASYNC
set_malign       js/makemon.js:672   sync
in_rooms         js/hack.js:1187   sync  + mklev.js clone — do NOT add #3
g_at / place_object / stackobj  js/mkobj.js  sync
quest_talk       js/quest.js:414   ASYNC
tele_restrict    js/teleport.js:872   ASYNC
demon_talk       NOT FOUND
cuss             NOT FOUND
is_demon         js/monsters.js:753   sync  + pray.js clone — do NOT add #3
```

`--can monmove.js worm.js wormhitu`: **ALREADY**. `--can monmove.js mhitu.js unstuck` / `expels`: **ALREADY**. `--can monmove.js mkobj.js g_at`: **ALREADY**. `--can monmove.js dig.js bury_an_obj`: **ALREADY**. `--can monmove.js makemon.js set_malign`: **ALREADY**. `--can worm.js mhitu.js mattacku`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Callee closure (new arms).** STRAT_ARRIVE → `m_arrival` LIVE. Flee `rloc` success → `leppie_stash` LIVE (`rn2(4)` is C’s continue-if-nonzero; JS `if (!rn2(4)) return`). Conflict peaceful grab → `release_hero` LIVE (`expels` / `unstuck` / `sticks`). MS_BRIBE mux-mismatch LIVE (`tele_restrict`/`rloc`/`set_malign`/`set_msg_xy`); mux==hero `demon_talk` **OMIT named**. S_LEPRECHAUN `mlet === 'S_LEPRECHAUN'` is this port’s mlet token (not C’s `'l'`). `isgd && (dead \|\| !mx)` LIVE. MOVED `mdistu > 2` ≡ C `!m_next2u` (`you.h:560` `distu<=2`). Helpless ≡ `msleeping \|\| !mcanmove`. `wormhitu` LIVE (`distu < 3` as `dx²+dy² < 3`). PHASE FOUR `quest_talk` LIVE. `MS_CUSS !rn2(5) cuss` **OMIT named**. No STUB in a shipped live arm.

**`leppie_stash` (`:1153–1171`).** `in_rooms` returns `''` when not in a shop — JS `if (in_rooms(...)) return` treats `''` as falsy, same as C `!*in_rooms`. Tile ROOM + `!t_at` + gold. Inline drop: `distant_name` → `extract_from_minvent(FALSE,TRUE)` → `place_object`/`stackobj` → `g_at` → `bury_an_obj`. C `mdrop_obj` still runs `flooreffects` / saddle-shop / extrinsics — **named**. RNG: one `rn2(4)` then bury. **Match the call site.**

**`wormhitu` (`:343–362`).** Walk `wtails[wnum]` until dummy `wheads`; skip that co-located seg; each remaining seg `mattacku(worm)` if `distu < 3`. **Match.** `mattacku` is D-1795 LIVE.

**Pre-existing in the edited flee block (not this peel’s claim):** C `return 0` is **after** `if (rloc) leppie_stash` — failed `rloc` still spends the turn. JS `return 0` only on success, then falls into `m_respond`/muse/move. Extra turn on failed flee-teleport. Do **not** treat that as a named omit of `leppie_stash`.

## Hallucinations / overclaim

Subject is **true** for the listed arms. Do **not** stamp “Match C `demon_talk` / `cuss` / `monflee` `release_hero` / steal.c `mdrop_obj`.” Do **not** import steal.js `findgold` for `game.invent` (nobj walk on an array is always null). Do **not** add `mdrop_obj` clone #2 in monmove. Do **not** invent a seed0030 `dochug` peel.

## Density

§2b: remaining `dochug` envelope + its sole `wormhitu` callee. +159. Consecutive Open rows of one C function. Did **not** glue `m_move`. Right size.

## Verification

D-log: green + combat cohort. save-oracle skip (untagged). Public-unhit for leprechaun bury / long-worm tail / vault-guard vanish. seed0030 still the D-1795 offset. This audit: `csym` `:689–989` / `:343–362` vs HEAD `js/monmove.js:2058–2365` / `js/worm.js:190–205`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: `demon_talk`; `cuss`; `monflee:473` `release_hero`; `mdrop_obj` flooreffects/saddle/extrinsics. Pre-existing: flee-teleport `rloc` fail still continues the turn (C returns 0). Do **not** write findgold clone #3.

Verdict: **ACCEPT-WITH-DEBT**
