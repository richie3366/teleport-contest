# Review 425 — 89aab16d — zap.c zap_steed SPE_DRAIN_LIFE via bhitm (D-1464)

## Metadata
- Full / short hash: `89aab16db5ea694b23214a31cf48947394f4d0de` / `89aab16d`
- Parent: `99a31c84` (D-1463). This file audits **this SHA only** (seventh of nine `js/` commits since review **418**). Archive **Addressed:** D-1464 `89aab16d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 11:17:13 +0200
- D-id: **D-1464**
- Stats: 10 files, +109 / −32 — `js/zap.js` +18 / −9; `js/spell.js` comment (+1).
- Claims to close: Open `zap.c` `zap_steed` SPE_DRAIN_LIFE via bhitm (named from D-1463 / review **424**). Not cancel. `reviews/loop-2026-08-15/` has no unpaid steed-drain Must-fix.
- JS / map: `zap.js` `zap_steed` fallthrough with OPENING/KNOCK; callee `bhitm` SPE_DRAIN_LIFE (D-1436). `c-js-map/turns.md`. Remaining cancel/poly/invis/striking/slow/speed/heal named.
- Prior reviews this SHA claims to close: **424** remaining bhitm-routed after OPENING (drain first); **406** named `zap_steed` drain after zapyourself drain.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed SPE_DRAIN_LIFE via bhitm so a downward drain-life spell while riding hits the steed instead of skipping zap_steed.”

C `zap_steed` `:3129` is in the same `:3115–3134` `bhitm` fallthrough as OPENING/KNOCK (D-1463). `(void) bhitm(u.usteed, obj); steedhit = TRUE`. Caller `weffects` `:3437–3439` disclose + skip `zap_updown`. Callee `bhitm` `:521–544` (D-1436): `seemimic`; `dmg = monhp_per_lvl`; Knight `dbldam` ×2; SPE `spell_damage_bonus`; `resists_drli` → `shieldeff_mon` (no `resist` RNG); else `!resist(..., dmg, NOTELL) && !DEADMONSTER` then extra `mhp`/`mhpmax` -= dmg; dead / `mhpmax<=0` / `m_lev<1` → `killed` else `m_lev--` + weaker pline. No `learn_it`. Fake SPBOOK: `learnwand` no-ops; `disclose` still awards `more_experienced` if the type was unknown.

Old JS: SPE_DRAIN_LIFE defaulted in `zap_steed` so riding-down drain hit `zap_updown` default (nothing) instead of `bhitm`. Lateral `bhitm` drain already live.

The diff **does** add `case SPE_DRAIN_LIFE:` onto the existing `bhitm` + `steedhit=true` arm. It **does not** change `bhitm` drain bodies (comments only). It **does not** add cancel/poly/invis/striking/slow/speed/heal. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_steed` SPE_DRAIN_LIFE arm | C `:3129–3133`, **wired this SHA** | same `bhitm` group as OPENING |
| `weffects` steed-down gate | C `:3437–3439`, **pre-existing** | |
| `bhitm` SPE_DRAIN_LIFE | C `:521–544`, **imported live** (D-1436) | |
| `monhp_per_lvl` / `resists_drli` / `spell_damage_bonus` | C, **imported live** | |
| `shieldeff_mon` | C, **imported live** | unlike poly magm deferral |
| remaining `zap_steed` bhitm otyps | C `:3116–3128`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. Grep `FORCE` is `SPE_FORCE_BOLT` in comments. **New gameplay RNG:** riding-down drain now reaches `resist` NOTELL (and not `resists_drli`’s shield path). Public fortress does not `#cast` drain while mounted.

## C ↔ JS fidelity

`zap_steed` already set `bhitpos` / `notonhead=false`. SPE_DRAIN_LIFE now shares OPENING’s `await bhitm(steed, obj); steedhit=true`. Match C’s combined case list (`:3115–3134` is one fallthrough). **Callee is not a stub.** Hallucination check: “Match C via bhitm” while **`bhitm` `:521–544` is live** is **not** a dispatch-stub lie.

`weffects` disclose on true `zap_steed` skips `zap_updown`. Riding-down drain therefore does not hit the STONE/LOCKING default. Match.

`bhitm` drain at this SHA (unchanged):

1. `seemimic` if disguised. Match `:522–523`.
2. `dmg = monhp_per_lvl`; Knight questart ×2; SPE `spell_damage_bonus`. JS recomputes `dbldam` in-arm (`Role_if(PM_KNIGHT) && uhave.questart`) ≡ C `:165` used at `:525–528`. Match.
3. `resists_drli` → `shieldeff_mon`, **no** `resist()` call. Match `:529–530` (unlike poly’s deferred shield).
4. Else `!resist(dmg, NOTELL) && still alive` then extra `mhp`/`mhpmax` -= dmg. C `!DEADMONSTER` after resist has already applied the NOTELL hit. JS `(mhp|0) >= 1`. Same intent.
5. Then `mhp<1 || mhpmax<=0 || m_lev<1` → `killed` else `m_lev--` + weaker. Match `:536–542`.
6. No `learn_it`. Type-id is `weffects` `disclose` only; SPBOOK skip makeknown. Match.

C `resist` NOTELL consumes RNG and applies `dmg` as a hit; the extra subtract is the drain-max/level effect. JS `resist` is the imported zap.c port (D-1436). Not a clone.

## Hallucinations / overclaim

Subject says downward drain-life while riding hits the steed instead of skipping `zap_steed`. **True:** `bhitm` drain + disclose; OPENING/KNOCK/TELE/PROBING stay; cancel still default. **False until named** for remaining bhitm-routed steed otyps. Stamping **Addressed:** D-1464 for the **steed switch arm** is fair. Do **not** stamp “Match C zap_steed WAN_CANCELLATION.” Do **not** treat fortress PASS as a riding-down drain. Comment “zap_steed routes here in C” was already true; this SHA makes JS match.

## Density

One otyp added to an existing `bhitm` fallthrough. ~3 lines of real JS plus comments. Playbook §2b sibling arm. Did not glue cancel. Acceptable (same family as D-1463).

## Branch-by-branch confirm

1. Riding `dz>0` SPE_DRAIN_LIFE: `bhitm(steed)` then disclose. Match `:3129–3133` / `:3437–3439`.
2. `resists_drli` (undead steed): shield, no `resist` RNG, still disclose. Match `:529–530` + caller disclose.
3. Else `resist` NOTELL then extra strip / `m_lev--` or `killed`. Match `:531–542`.
4. Knight + questart: `dbldam` before SPE bonus. Match `:165` / `:525–528`.
5. SPBOOK `learnwand` skip makeknown; `disclose` may still XP. Match.
6. OPENING/KNOCK/TELE/PROBING unchanged. Match.
7. Cancel/poly still `zap_steed` false. Named.
8. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `resist` NOTELL is C `:531`, not a recorded index.

## Verification

Journal: private canary **18**/18 (C/JS grep; Rule #2; riding-down drain mr=0 `m_lev--` + weaker + disclose XP; SPBOOK skip makeknown; undead `resists_drli` still disclose; opening/teleport/probing siblings; cancel/poly/locking still default; no-steed / dx / dz<0 skip); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session zaps drain-life while riding down. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `bhitm` drain. `shieldeff_mon` is called (not a deferred empty `if`).

Named omits (map / Open, not Must-fix):

1. remaining `zap_steed` bhitm-routed (cancel/poly/invis/striking/slow/speed/heal)
2. `resists_drli` defended AD_DRLI polish (D-1436 named)
3. `zap_updown` LOCKING/STONE; `bhito` boxlock

Do not Must-fix “cancel should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “`learn_it` missing on drain” — C does not set it; `disclose` does.

## Callers / RNG ledger

C callers: `weffects` via `zap_steed`; lateral drain already reached `bhitm`. Dice: `resist` NOTELL unless `resists_drli`. `monhp_per_lvl` may use HD. Public fortress does not hit the new arm.

`dbldam` in the drain arm is computed locally; C computes it once at `bhitm` entry (`:165`). Same predicate. SPE bonus uses `spell_damage_bonus` (D-1388).

C `resist(..., dmg, NOTELL)` applies the hit then the drain arm subtracts `mhp`/`mhpmax` again and may `m_lev--`. JS imported `resist` (D-1436) does the same; this SHA does not re-port that. Riding-down drain therefore consumes the same NOTELL roll as a lateral drain.

Verdict: **ACCEPT-WITH-DEBT**
