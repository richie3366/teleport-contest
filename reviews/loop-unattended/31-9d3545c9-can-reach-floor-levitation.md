# Review 31 — 9d3545c9 — `can_reach_floor` Levitation is `youprop.h` `(H||E)&&!B` (D-1070)

## Metadata
- Full / short hash: `9d3545c92e3dfc3ad42fa0e86128eabe7ecd759c` / `9d3545c9`
- Parent: `d35a09a9` (review **30** QUALITY-RISK of `872d1d93` D-1069; Must-fix was this Levitation predicate). JS-touching since last `reviews/loop-unattended/` file (`30-872d1d93-…`): this SHA and `aa96e08c` D-1071 (review **32**). Docs-only in the same window: none after the review file; `8314cc94` cadence **#1355** sits *before* review 30’s subject SHA.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 10:09:21 +0200
- D-id: **D-1070**
- Stats: 13 files, +136 / −56 — `js/engrave.js` +16 / −2 (header + local `Levitation()` + one predicate swap); `js/sit.js` +15 / −8 (header + drop sticky-true on the message clone). Live JS is the helper predicate and the sit message clone, not a new helper file.
- Claims to close: Must-fix from `reviews/loop-unattended/30-872d1d93-dosit-can-reach-floor.md` item 1. Stamped **Addressed:** D-1070 `9d3545c9` on the archive row **and** on review 30 (hash present, not chicken-egg — filled by this SHA / the next real SHA, not predicted here).
- JS / map: `engrave.js` `can_reach_floor`; `sit.js` `dosit` message `Levitation()`. `c-js-map/turns.md` names D-1070; hugs still named until D-1071.
- Prior reviews this SHA claims to close: **30** QUALITY-RISK Must-fix (sticky `u.Levitation` in the helper / sit clone). `reviews/loop-2026-08-15/` has no open Levitation Must-fix. Review **19** / D-1060 is the same *class* (sit claimed `youprop.h` while live bits live on H/E / `uprops[]`); D-1060 was Fire/Cold `uprops[]` because those flats are unmirrored. LEVITATION *is* mirrored (`confer_oc_oprop`, D-0976).

## Intent vs deliverable

Git subject promises: “Match C can_reach_floor Levitation to youprop.h (H||E)&&!B so worn boots and potions tumble when sitting.” Body is empty beyond Co-authored-by. D-log: D-1069 shipped the sit.c three-message envelope, but the helper still keyed Levitation on sticky `u.Levitation` (never written in production). Worn boots / potion `#sit` sat on the dungeon floor. Sit clone sticky-true also ignored `BLevitation`.

Review 30’s Must-fix was exactly that predicate, with those “do not”s: do not rewrite `confer_oc_oprop`; do not OR `uprops[LEVITATION]` as a substitute for skipping H/E; do not pull hugs / `ceiling_hider` / `MZ_HUGE` / pit teeter; do not rewrite every other `Levitation()` clone.

The diff **does** that envelope: new `engrave.js` `Levitation()` is `(H||E)&&!B` with no sticky-true; `can_reach_floor` swaps `u.Levitation` for that call and keeps `!(Is_airlevel || Is_waterlevel)`; sit.js drops `if (u.Levitation) return true` so blocked H/E is false. Hugs comment still says deferred. `do_wear.js` untouched.

It does **not** port hugs / `ceiling_hider` / `MZ_HUGE` / pit teeter / dosit lap. Those were named on review 30, not this Must-fix. It does **not** retouch other `Levitation()` clones (`do.js` / `apply.js` / `pickup.js` / …). Named, and forbidden this iter.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `engrave.js` `Levitation()` | **clone** of `youprop.h:240` | new this SHA; H/E flats + `!B`; no sticky-true |
| `can_reach_floor` Levitation arm | C callee arm, **retouched** | `engrave.c:198`; was sticky `u.Levitation` |
| `sit.js` `Levitation()` | **clone** of the same macro | pre-existing; this SHA **deletes** sticky-true that ignored `B` |
| `dosit` three-message `if` | C call site, **not this SHA** | `sit.c:414–421`; D-1069 |
| `confer_oc_oprop` LEVITATION | imported C callee, **not this SHA** | `do_wear.js:284–288`; already mirrors `ELevitation` (D-0976) |
| `Is_airlevel` / `Is_waterlevel` | imported C | `const.js:2961–2964`; `dungeon.h:115–117` `Lcheck` |
| hugs / `ceiling_hider` / `MZ_HUGE` | C arms, **named omit this SHA** | hugs shipped next as D-1071 |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/engrave.js` and `js/sit.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. The helper reads H/E/B flats, not a seed-shaped levitation table. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### C macro — there is no `u.Levitation` member

C `youprop.h:235–240`:

```
#define HLevitation u.uprops[LEVITATION].intrinsic
#define ELevitation u.uprops[LEVITATION].extrinsic
#define BLevitation u.uprops[LEVITATION].blocked
#define Levitation ((HLevitation || ELevitation) && !BLevitation)
```

`Levitation` in `engrave.c:198` and `sit.c:417` is that macro. Worn boots / ring go through `setworn` → `oc_oprop` → `uprops[LEVITATION].extrinsic`. JS `confer_oc_oprop` writes that pair **and** mirrors `u.ELevitation` (`do_wear.js:284–288`). Potion / timeout write `u.HLevitation` (`timeout.js` `TIMEOUT_FLAT`, `eat.js`). Floor-trap block is `BLevitation` `I_SPECIAL` (`polyself.js` `float_vs_flight`). Grep of scored `js/`: still **no** `u.Levitation =` assignment.

Review 30 forbade OR-ing `uprops[LEVITATION]` as a substitute for skipping H/E: unlike FIRE_RES/COLD_RES (D-1060), LEVITATION flats **are** written. Reading H/E/B is C `youprop.h` for this property.

### Helper after this SHA — same `if` as C, same exception

C `engrave.c:191–199` (this SHA’s arm only; hugs still omitted here):

```
    if (u.uswallow
        || (u.ustuck && !sticks(gy.youmonst.data)
            && attacktype(u.ustuck->data, AT_HUGS))
        || (Levitation && !(Is_airlevel(&u.uz) || Is_waterlevel(&u.uz))))
        return FALSE;
```

JS `engrave.js` after this SHA (hugs still a comment): swallow FALSE, then `Levitation() && !(Is_airlevel(u.uz) || Is_waterlevel(u.uz))` FALSE. `Is_airlevel` / `Is_waterlevel` (`const.js:2961–2964`) compare `u.uz` to `game.air_level` / `game.water_level` — C `dungeon.h:115–117` `Lcheck` against `air_level` / `water_level`. Keep the exception in the helper. Do not special-case air/water in `dosit`.

New `engrave.js` clone:

```
function Levitation() {
    const u = game.u || {};
    return !!(((u.HLevitation | 0) || (u.ELevitation | 0))
        && !(u.BLevitation | 0));
}
```

`| 0` is ToInt32 on the TIMEOUT / `I_SPECIAL` / `FROMOUTSIDE` masks C stores in a `long`. `I_SPECIAL` `0x10000000` and `TIMEOUT` `0x00ffffff` stay nonzero. Logical `||` / `&&` / `!` match C’s nonzero-long tests. No RNG in this arm (`engrave.c:187–214` has none).

### Sit message clone — sticky-true is gone

C `sit.c:414–421`: after `!can_reach_floor(FALSE)`, `u.uswallow` / `else if (Levitation)` / else air. The message `Levitation` is the **same** macro, not a second storage. A hugged+levitating hero (hugs shipped next SHA) still tumbles: `can_reach_floor` is already false, then `else if (Levitation)` wins over air.

Prior sit clone (`872d1d93`): sticky-true **before** `(H||E)&&!B`, so `BLevitation` could not force false. This SHA deletes that line. The remaining body matches the engrave clone and C. Dead for H/E **before** D-1070 (helper never returned false on H/E, so `dosit` never asked the clone). Live now: helper false on H/E → `dosit` asks the clone → tumble.

| Hero state | C `Levitation` / helper | Prior helper | This SHA |
|------------|-------------------------|--------------|----------|
| `setworn` lev boots, sticky unset, dungeon | true → FALSE → tumble | TRUE → sit floor | **match** tumble |
| potion `HLevitation`, sticky unset | true → FALSE → tumble | TRUE → sit floor | **match** tumble |
| H/E + `BLevitation` `I_SPECIAL` | false → may sit | helper sticky-miss; clone sticky-true | **match** sit (B honored) |
| air/water + `ELevitation` | exception → sit | sit only if sticky | **match** sit |
| swallow | FALSE → no seats (first) | already D-1069 | **keep** |
| sticky `u.Levitation` only | C has no field → sit | FALSE → tumble | **match** sit |

Unskilled `P_RIDING` (`engrave.c:201–202`; `skills.h:95` `P_BASIC=2`) unchanged; dead from `dosit` because usteed already returned. `Flying` still sticky `u.Flying` early-true; with `check_pit==FALSE` Flying vs fallthrough both TRUE — **no live `dosit` gap**. Named.

### Wear / timeout writers this SHA did not touch (and must not)

C `worn.c` `setworn` → `oc_oprop` writes `u.uprops[LEVITATION].extrinsic` as a **slot bitmask**, not a boolean 1. JS `confer_oc_oprop` (`do_wear.js:261–270`) writes that pair for every `oc_oprop`, then the LEVITATION arm (`284–288`) mirrors the same mask onto `u.ELevitation`. Putting boots on ORs `W_ARMOR`/`W_RING*`; taking them off clears that bit. `Levitation()` is still `H || E` where E nonzero means true. Review 30 forbade rewriting this function: the miss was the helper not reading the flats it already writes.

Timeout / blessed-potion `I_SPECIAL` live in `HLevitation` (`timeout.js` `TIMEOUT_FLAT` `[LEVITATION]: 'HLevitation'`; `eat.js` `incr_itimeout_prop`). C `HLevitation` **is** `uprops[LEVITATION].intrinsic`. JS dual-storage: eat also copies the flat into `uprops[LEVITATION].intrinsic`. The helper reads the flat. If those two stay in sync, OR-ing the pair would be redundant, not a second storage that would make worn boots false.

`maybe_smudge_engr` (`engrave.c` via `hack.c`) calls `can_reach_floor(TRUE)`. This SHA’s Levitation arm is live there too: dungeon H/E now fails the helper (C), so walk-smudge `rnd(5)` is skipped while levitating off air/water. That is C, not a new sit-only gate. Pit teeter on that `TRUE` path stays named.

Other `Levitation()` clones (`do.js`, `apply.js`, `pickup.js`, `uhitm.js`, `trap.js`, `steed.js`, `mhitu.js`, `dig.js`, `do_wear.js`, `music.js`) already used `(H||E)&&!B` in most places; `apply.js:5810` and `cmd.js` still OR sticky `u.Levitation`. Review 30 forbade rewriting them this iter. They are not this helper. Do not treat them as remaining Must-fix against D-1070.

### RNG

No `rn2`/`rnd`/`rn1`/`d` at `engrave.c:198` or `sit.c:417`. Fortress path unchanged.

Shared callers of `can_reach_floor` (`engrave.c` `doengrave`/`cant_reach_floor`, `hack.c` `maybe_smudge_engr`, `pickup.c`, `lock.c`, `invent.c`, `sit.c` `dosit` with `FALSE`) all pick up this Levitation predicate. That is C. Do not special-case `dosit`. Public sessions never `#sit` while levitating, so this SHA cannot be proven from the fortress score.

## Hallucinations / overclaim

“Match C can_reach_floor Levitation to youprop.h (H||E)&&!B” is **true for the helper arm and the sit message clone**. It is **not** true that `can_reach_floor` is now the full C function (`engrave.c:187–214`): hugs was still deferred this SHA (shipped D-1071); `ceiling_hider` / `MZ_HUGE` / pit teeter still named. D-log “worn boots / potion `#sit` tumble” holds **if** `ELevitation` / `HLevitation` are set the way `confer_oc_oprop` / timeout / eat already write them. That is how the port stores levitation. This is **not** “Match C dispatch, callee Levitation is a stub”: both clones are the macro. Other files’ `Levitation()` clones were explicitly left alone.

Stamping the Must-fix **Addressed:** D-1070 `9d3545c9` is fair. Hash is on the archive row and on review 30.

## Density (§2b)

Must-fix peel: helper predicate + sit clone (~12 executable lines plus comments). Playbook “too small” would apply to an *invented* one-`if` Open peel. Written-review C-wrongs pop first; this is the size Review 30 asked for. Not “finish `youprop.h`.” Not hugs. Right size for a queued C-wrong. Inserting Open hugs-before-lap in the same commit is queue hygiene (review 30: do not pop ustuck lap before hugs), not a second hypothesis in `js/`.

## Verification

Journal: private node boots/potion tumble `ECMD_OK`; B sits; air/water sit; swallow no-seats; sticky-only reaches. green+strict PASS; cohort **14**/14 (8000/0900/1500/1800/0060/0102/0700/0106/0107/0101/0116/2200/4500/0009). Path **public-unhit**. Green+cohort is regression cover, not a public `#sit` while wearing levitation boots. Cadence **#1355** **44**/44 Scr **11405**/11405 RNG **100%** — fortress, not reach-sit proof.

This review iter did not re-run sessions (not a cadence slot; Must-fix empty after D-1071). The audit is the C predicate vs the two clones.

C read of `youprop.h:235–255`, `engrave.c:187–214`, `sit.c:414–421`, `dungeon.h:115–117`, `skills.h:95`, `do_wear.js:261–288`, `timeout.js` `TIMEOUT_FLAT`, `engrave.js` Levitation + arm, `sit.js:495–504` / `1031–1044`, grep `u.Levitation=` empty, hunk grepped FORCE/fs/seed.

## Actionable C-wrongs

None from this SHA. Review 30 item 1 is the diff.

Named omits (map / Open, not Must-fix): helper hugs **Addressed:** D-1071 `aa96e08c`; `ceiling_hider` / `MZ_HUGE` / `uteetering` / `uescaped_shaft`; `Flying` sticky vs `(H||E||steed flyer)&&!B` (not live at `dosit`+`FALSE`); other `Levitation()` clones; dosit ustuck lap (`sit.c:422–429`) — ship hugs first (done next SHA).

Do not restore sticky `u.Levitation` in this helper or the sit message clone. Do not rewrite `confer_oc_oprop`. Do not OR `uprops[LEVITATION]` as a substitute for skipping H/E. Do not put trailing `confdir` inside shared `getdir`. Do not restore Levitation-only `dosit` (skip swallow / skip air sit / skip air-water exception).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: the helper and sit message now read C `youprop.h` `(H||E)&&!B`, so dungeon boots/potion `#sit` tumbles and `BLevitation` can sit, which is exactly the Must-fix review 30 queued.
- Must-fix stays empty after this SHA (hugs was Open, not this item).
