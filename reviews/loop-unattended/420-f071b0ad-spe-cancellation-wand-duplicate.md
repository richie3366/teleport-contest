# Review 420 — f071b0ad — spell.c SPE_CANCELLATION IMMEDIATE wand-duplicate (D-1460)

## Metadata
- Full / short hash: `f071b0adef8d2751df7f058fc6aa3f664e791d91` / `f071b0ad`
- Parent: `7634fd61` (D-1459). This file audits **this SHA only** (second of nine `js/` commits since review **418**). Archive **Addressed:** D-1460 `f071b0ad` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 08:43:13 +0200
- D-id: **D-1460**
- Stats: 10 files, +106 / −28 — `js/spell.js` +23 / −5; `js/zap.js` comments only (+2).
- Claims to close: Open `zap.c` `weffects` SPE_CANCELLATION IMMEDIATE wand-duplicate (named from D-1459 / review **419**). Not STONE. `reviews/loop-2026-08-15/` has no unpaid cancellation-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callees `zap.js` `weffects` / `bhit` / `bhitm` `cancel_monst` / `zapyourself` `cancel_monst(&youmonst)` / `bhito` `cancel_item`. `c-js-map/turns.md`. Remaining STONE/TELE named at this SHA.
- Prior reviews this SHA claims to close: **419** remaining IMMEDIATE after POLY (CANCEL first); **418** named CANCEL after TURN.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_CANCELLATION IMMEDIATE wand-duplicate so casting cancellation calls weffects bhit instead of printing Nothing happens.”

C `spell.c` `:1471` is in the `:1457–1514` wand-duplicate fallthrough (after POLY/TELE, before FINGER/LIGHT). `objects.h:1397–1399` `SPELL("cancellation", … IMMEDIATE … SPE_CANCELLATION)`. `oc_dir == IMMEDIATE` so `:1479` takes getdir / atme / self vs `weffects`. Self: `zapyourself` `:2812–2815` `cancel_monst(&youmonst, obj, TRUE, TRUE, TRUE)` (inventory). Directed: `weffects` `:3440–3451` IMMEDIATE `bhit(rn1(8,6), bhitm, bhito)`. Fake book is SPBOOK so `learnwand` skips `makeknown`. `physical_damage` is FORCE_BOLT-only.

C `bhitm` `:335–340`: `seemimic` if disguised; `cancel_monst(mtmp, otmp, TRUE, TRUE, FALSE)` — youattack, allow clay-golem kill, **no** monster inventory. `cancel_monst` `:3149–3215`: youdefend Antimagic / else `resist` NOTELL then optional `cancel_item` invent if `self_cancel`; hero `Upolyd` clay/`Unchanging`/`rehumanize`; monster `mcan=1` + `normal_shape` + clay `killed`. Floor `bhito` `:2313–2317` `cancel_item` + `newsym`. `zap_steed` `:3118–3133` would `bhitm` the mount.

Old JS: SPE_CANCELLATION fell through “Nothing happens.” `weffects` IMMEDIATE `bhit(rn1(8,6))` already live. `bhitm` / `zapyourself` / `bhito` / `cancel_monst` already live for wand cancel.

The diff **does** add `const SPE_CANCELLATION` and `else if (otyp === SPE_CANCELLATION)` → `wand_duplicate_weffects(pseudo, atme, false)`. It **does not** change `cancel_monst` / `bhitm` / `zapyourself` / `bhito` bodies (`zap.js` two comment lines). It **does not** dispatch STONE/TELE. Named. It **does not** add `zap_steed` cancel. Named on the D-log.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_CANCELLATION arm | C `:1471–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing wrapper** | |
| `weffects` IMMEDIATE | C `:3440–3451`, **imported live** | `rn1(8,6)` then `bhit` |
| `bhit` ZAPPED_WAND | C, **imported live** | monster → `bhitm`; pile → `bhito` |
| `bhitm` WAN/SPE_CANCELLATION | C `:335–340`, **imported live** | `seemimic` then `cancel_monst(..., false)` |
| `cancel_monst` | C `:3149–3215`, **imported live** | not a stub |
| `cancel_item` | C `:1236+`, **imported live, partial** | blank_novel / corpse-timer named |
| `zapyourself` SPE_CANCELLATION | C `:2812–2815`, **imported live** | `self_cancel=true` |
| `bhito` WAN/SPE_CANCELLATION | C `:2313–2317`, **imported live** | `cancel_item` + `newsym` |
| `normal_shape` | C, **imported live** (`mon.js`) | shapeshifter / mimic |
| remaining IMMEDIATE STONE/TELE | C same fallthrough, **named omit** | still “Nothing happens.” |
| `zap_steed` WAN/SPE_CANCELLATION | C `:3118–3133` `bhitm`, **named omit** | JS still default |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. Grep `FORCE` is `SPE_FORCE_BOLT` in comments. **New gameplay RNG:** directed cast uses existing `rn1(8,6)` plus `cancel_monst` → `resist` NOTELL (already there for wand cancel). Public fortress does not `#cast` cancellation.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514`: atme zeros dirs; cancelled getdir reuses leftover `u.dx/dy/dz` and prints “The magical energy is released!”; self → `zapyourself` (cancel damage 0, no `losehp`); else `weffects`; `update_inventory()`. `physical_damage` false. Match.

`oc_dir` IMMEDIATE. JS `weffects` still does steed-down then IMMEDIATE then NODIR then RAY (`:3437–3468`). Directed horizontal: `zapsetup` / `bhit(rn1(8,6), bhitm, bhito)` / `zapwrapup`. SPBOOK skip makeknown. **Callees are not stubs.** Hallucination check: “Match C SPE_CANCELLATION weffects bhit” while **`weffects` IMMEDIATE + `bhit` + `bhitm` `cancel_monst` + self `cancel_monst(&youmonst)` + `bhito` `cancel_item` are live** is **not** a dispatch-stub lie.

`bhitm` `:335–340`: `disguised_mimic` → `seemimic`; then `cancel_monst(mtmp, otmp, true, true, false)`. JS matches the three booleans call-for-call. `self_cancel=false` so monster inventory is **not** walked (C `:3162` only when `self_cancel`). `youattack=true` so a clay golem that dies uses `killed` not `monkilled`. `allow_cancel_kill=true` so clay dies here (not Magicbane’s deferred kill).

`cancel_monst` `:3149–3215` vs JS `:3344–3414`:

1. `youdefend = mdef === youmonst`. Match.
2. Resist: youdefend `!youattack && Antimagic` else `resist(..., NOTELL)`. Cast/wand is youattack so hero Antimagic does **not** block self-cancel. Monster takes `resist`. Match.
3. `self_cancel`: walk invent / minvent `cancel_item`; hero `find_ac` + botl. JS hero invent is an array (`game.invent`); monster `nobj` chain. Match ownership.
4. Youdefend + `Upolyd`: clay writing-vanishes / light-headed then `mh=0`; `Unchanging && mh>0` amulet heat else `rehumanize`. JS clones Unchanging from uprops. `rehumanize` imported `polyself.js`.
5. Else: `mcan=1`; `normal_shape`; clay `canseemon` pline then `killed`/`monkilled`. JS `s_suffix_zap(mon_nam)` for “from %s head!” — clone of `s_suffix`; string shape matches C `writing_vanishes`.

Self-dir `:2812–2815`: `cancel_monst(&youmonst, obj, TRUE, TRUE, TRUE)` — inventory **is** cancelled. JS `game.youmonst` identity must be the same object `cancel_monst` tests. Pre-existing wand path already used this; this SHA only reaches it from `#cast`.

`bhito` `:2313–2317`: `cancel_item` + `newsym`. JS live. Color-change `newsym` is the C comment; not a stub.

## Hallucinations / overclaim

Subject says casting cancellation calls weffects bhit instead of Nothing happens. **True:** `#cast` getdir → self `cancel_monst` invent or `weffects` → `bhit` → `bhitm` `cancel_monst` (no invent); POLY/TURN/KNOCK/SLOW/LOCK/RAY stay wired; STONE still Nothing happens. **False until named** for remaining IMMEDIATE STONE/TELE, `zap_steed` cancel, `cancel_item` blank_novel / corpse-timer polish. Stamping **Addressed:** D-1460 for the **cast dispatch** is fair. Do **not** stamp “Match C SPE_STONE_TO_FLESH.” Do **not** treat fortress PASS as a cancellation cast. Comment “cancel_monst already live” is true for the resist / `mcan` / clay / invent-when-self spine.

## Density

One IMMEDIATE otyp dispatch through the existing wrapper. ~28 lines of real JS plus two comment lines in `zap.js`. Playbook §2b caller/callee. Did not glue STONE. Acceptable.

## Branch-by-branch confirm

1. `#cast` SPE_CANCELLATION directed: `weffects` `bhit(rn1(8,6))`. Match `:1471–1510`.
2. atme / leftover 0,0,0: `zapyourself` `cancel_monst(..., true)` invent; no `losehp`. Match `:1500–1508` / `:2812–2815`.
3. Monster hit: `seemimic` then `cancel_monst(..., false)`. No minvent cancel. Match `:335–340`.
4. Monster `resist` NOTELL: return false, no `mcan`. Match `:3158–3160`.
5. Clay golem youattack: `killed`. Match `:3206–3208`.
6. Hero poly clay + Unchanging: `mh=0` then `rehumanize` (mh not >0). Match `:3184–3194`.
7. SPBOOK skip makeknown. Match.
8. Floor object `bhito` still `cancel_item`. Unchanged live.
9. STONE/TELE still Nothing happens. Named.
10. Mounted down cancel still misses `zap_steed` `bhitm`. Named.
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `resist` NOTELL is C `:3158`, not a recorded index.

## Verification

Journal: private canary **18**/18 (C/JS grep; IMMEDIATE SPBOOK; atme TIME skip makeknown; zapyourself damage 0; bhitm kobold cancel/resist; east cast TIME; STONE still Nothing happens; prior POLY/TURN/KNOCK/SLOW/LOCK/RAY/NODIR stay; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not a cancellation cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `weffects`/`bhit`/`cancel_monst`. `bhitm` booleans `(true, true, false)` and self `(true, true, true)` match C. `cancel_monst` is a C callee, not a clone-stub.

Named omits (map / Open, not Must-fix):

1. SPE_STONE_TO_FLESH / TELEPORT_AWAY IMMEDIATE — Open already (STONE first at this SHA)
2. `zap_steed` WAN/SPE_CANCELLATION via `bhitm` (C `:3118–3133`)
3. `cancel_item` blank_novel / corpse revive→rot timer (header named)
4. `bhit` doorlock / `zap_updown` LOCKING/STONE / `bhito` boxlock / `zap_map` cancel engraving

Do not Must-fix “STONE should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “`self_cancel=false` on bhitm skips invent” — that **is** C.

## Callers / RNG ledger

C callers: `spelleffects`; wand cancel already reached `bhitm`/`bhito`/`zapyourself`. Dice: `rn1(8,6)` then `resist` NOTELL inside `cancel_monst` (monster only). Hero self-cancel has no extra `rn2` at this locus. Public fortress does not hit the new cast.

`weffects` IMMEDIATE does not set `disclose` on the horizontal `bhit` arm (`:3447–3449`). Fake SPBOOK still skips `makeknown` in `learnwand` (`:133`). `bhitm` cancel does not set `learn_it`; identification is from other arms / `zapwrapup` only if `obj_zapped`.

Verdict: **ACCEPT-WITH-DEBT**
