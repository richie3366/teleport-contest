# Review 431 — 444e2080 — zap.c zap_steed WAN_CANCELLATION/SPE_CANCELLATION via bhitm (D-1470)

## Metadata
- Full / short hash: `444e2080b2dec80e9b65c201293f74b6ed2ae0ec` / `444e2080`
- Parent: `245c783d` (D-1469). This file audits **this SHA only** (fourth of nine `js/` commits since review **427**). Archive **Addressed:** D-1470 `444e2080` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 12:49:39 +0200
- D-id: **D-1470**
- Stats: 11 files, +120 / −33 — `js/zap.js` +27 / −6; `js/spell.js` comment (+2 / −1).
- Claims to close: Open `zap.c` `zap_steed` WAN_CANCELLATION/SPE_CANCELLATION via bhitm (named from D-1469 / review **430**). Not POLY. `reviews/loop-2026-08-15/` has no unpaid steed-cancel Must-fix.
- JS / map: `zap.js` `zap_steed` / existing `bhitm` CANCEL (D-0952) / `cancel_monst`. Caller `weffects` `:3437–3439`. `c-js-map/turns.md` + `debt.md`. Remaining bhitm-routed steed otyps named.
- Prior reviews this SHA claims to close: **430** named remaining `zap_steed` after HEALING (CANCEL first); **424** named remaining after OPENING.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed WAN_CANCELLATION/SPE_CANCELLATION via bhitm so a downward cancel while riding hits the steed instead of skipping zap_steed.”

C `zap_steed` `:3118–3119` in the `:3115–3134` “Default processing via bhitm()” list: `(void) bhitm(u.usteed, obj); steedhit = TRUE`. Caller `weffects` `:3437–3439`: mounted, `!dx && !dy`, `dz>0`, `zap_steed` true → `disclose=TRUE` and **skip** IMMEDIATE `bhit`/`zap_updown`. Callee `bhitm` `:335–340` (already D-0952): `seemimic` then `cancel_monst(mtmp, otmp, TRUE, TRUE, FALSE)` — `youattack` true, `allow_cancel_kill` true, **`self_cancel` false** so minvent (saddle) is not `cancel_item`’d. `cancel_monst` `:3150–3215`: `resist(..., 0, NOTELL)` then `mcan=1` + `normal_shape`; clay golem `killed` if allow.

Old JS: CANCEL defaulted `zap_steed` false so `weffects` fell through to `zap_updown`. `bhitm` CANCEL already live for lateral zaps.

The diff **does** add `case WAN_CANCELLATION: case SPE_CANCELLATION:` to the existing `bhitm(steed)` group. It **does not** change `bhitm`/`cancel_monst` bodies (comment only). It **does not** add poly/invis/striking/slow/speed/CURE_SICKNESS steed arms. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_steed` WAN/SPE_CANCEL arm | C `:3118–3133`, **wired this SHA** | |
| `weffects` steed-down gate | C `:3437–3439`, **pre-existing** | disclose if true |
| `bhitm` WAN/SPE_CANCEL | C `:335–340`, **imported live** (D-0952) | |
| `cancel_monst` | C `:3150–3215`, **imported live** | invent=FALSE this caller |
| `resist` NOTELL | C `:3158–3160`, **imported live** | inside cancel_monst |
| remaining `zap_steed` bhitm otyps | C `:3116–3126`, **named omit** | POLY next at this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** riding-down cancel now reaches `resist` inside `cancel_monst` (already in `bhitm`). Public fortress does not zap cancel while mounted.

## C ↔ JS fidelity

`zap_steed` already set `bhitpos` to steed and `notonhead=false`. CANCEL now `bhitm` then `steedhit=true`. Match `:3118–3134` / `:3140`. **Callee is not a stub.** Hallucination check: “Match C via bhitm” while **`bhitm` CANCEL → live `cancel_monst(..., FALSE)`** is **not** a dispatch-stub lie.

`weffects`: true steedhit skips `zap_updown`. Disclose/`learnwand` still fire even when `resist` returns false (C `(void) cancel_monst`). Match D-log “high-mr resist still disclose.” SPE_CANCEL SPBOOK skips `makeknown`.

`bhitm` `:335–340` unchanged: `disguised_mimic` `seemimic`; `cancel_monst(mtmp, otmp, true, true, false)`. `self_cancel=FALSE` skips the minvent `cancel_item` loop (`:3162–3167`). Saddle stays. Then `mcan=1` + `normal_shape` unless `resist` NOTELL. Clay golem `killed` if `allow_cancel_kill`. Match `:3196–3211`. Steed is not youmonst, so the youdefend arm is not this caller.

Pinned C `zap_steed` default group (this SHA only adds CANCEL to the JS fallthrough that already had OPENING/DRAIN/HEALING):

```3115:3134:nethack-c/upstream/src/zap.c
    /* Default processing via bhitm() for these */
    case SPE_CURE_SICKNESS:
    case WAN_MAKE_INVISIBLE:
    case WAN_CANCELLATION:
    case SPE_CANCELLATION:
    // ... POLY / STRIKING / SLOW / SPEED / HEALING / DRAIN / OPENING ...
        (void) bhitm(u.usteed, obj);
        steedhit = TRUE;
```

Caller (unchanged): mounted, `!dx&&!dy`, `dz>0`, `zap_steed` true → `disclose=TRUE` and skip IMMEDIATE `bhit`/`zap_updown`:

```3437:3439:nethack-c/upstream/src/zap.c
    if (u.usteed && (objects[otyp].oc_dir != NODIR) && !u.dx && !u.dy
        && (u.dz > 0) && zap_steed(obj)) {
        disclose = TRUE;
```

Callee this SHA does **not** rewrite (`invent=FALSE` is the fifth arg):

```335:340:nethack-c/upstream/src/zap.c
    case WAN_CANCELLATION:
    case SPE_CANCELLATION:
        if (disguised_mimic)
            seemimic(mtmp);
        (void) cancel_monst(mtmp, otmp, TRUE, TRUE, FALSE);
```

JS after this SHA: `case WAN_CANCELLATION: case SPE_CANCELLATION:` share the `await bhitm(steed, obj); steedhit = true;` group (`js/zap.js` `:5905–5928`). `bhitm` still `cancel_monst(mtmp, otmp, true, true, false)` (`:3837–3843`). POLY/INVIS/STRIKING/SLOW/SPEED/CURE_SICKNESS stay on `default` `steedhit=false` at this SHA.

## Hallucinations / overclaim

Subject says downward cancel while riding hits the steed instead of skipping `zap_steed`. **True:** `steedhit=true` → no `zap_updown`; `bhitm` `cancel_monst` may set `mcan`; saddle not cancelled; disclose still learns. **False until named** for remaining bhitm-routed steed otyps. Stamping **Addressed:** D-1470 for the **steed switch arm** is fair. Do **not** stamp “Match C zap_steed POLY.” Do **not** stamp “Match C `self_cancel` TRUE on a steed.” Do **not** treat fortress PASS as a riding-down cancel.

## Density

One `zap_steed` otyp pair through existing `bhitm`. ~8 lines of real JS plus comments. Playbook §2b. Did not glue POLY. Acceptable.

## Branch-by-branch confirm

1. Riding, `dz>0`, WAN_CANCELLATION: `bhitm(steed)` then disclose. Match `:3118–3133` / `:3437–3439`.
2. mr=0: `mcan=1`, saddle stays (`self_cancel` false). Match `:3162` / `:3197`.
3. High-mr `resist` NOTELL: no `mcan`; still disclose. Match `:3158–3160` + weffects disclose.
4. SPE_CANCELLATION: same arm; SPBOOK skip makeknown. Match.
5. POLY/INVIS still default `zap_steed` false → `zap_updown`. Named.
6. No steed / `dx` / `dz<=0`: `zap_steed` not taken. Unchanged.
7. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `resist` is C `:3158`, not a recorded index.

## Verification

Journal: private canary **21**/21 (C/JS grep; Rule #2; riding-down WAN_CANCELLATION mr=0 `mcan` + saddle stays + disclose learn; SPE skip makeknown; high-mr resist still disclose; opening/teleport/probing/drain siblings; poly/invis/locking still default; no-steed / dx / dz<0 skip); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session zaps cancel while riding down. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The switch arm matches `:3118–3133`. `cancel_monst` is a C callee with `self_cancel` false. Remaining steed otyps are **named**.

Named omits (map / Open, not Must-fix):

1. `zap_steed` WAN/SPE_POLYMORPH via bhitm — Open already after this SHA
2. remaining invis / striking / slow / speed / SPE_CURE_SICKNESS
3. `zap_map` engraving; `bhit` doorlock LOCKING

Do not Must-fix “dispatch is a stub.” Do not Must-fix “saddle should cancel.” Do not Must-fix “resist failure should skip disclose.”

## Callers / RNG ledger

C callers: `weffects` steed-down. Flavor/cancel arm: `resist` dice inside `cancel_monst`. Public fortress does not hit the new arm.

Verdict: **ACCEPT-WITH-DEBT**
