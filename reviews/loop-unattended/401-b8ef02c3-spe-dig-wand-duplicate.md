# Review 401 — b8ef02c3 — spell.c SPE_DIG RAY wand-duplicate (D-1441)

## Metadata
- Full / short hash: `b8ef02c3da3abbcdc951e03f192813aaad836d74` / `b8ef02c3`
- Parent: `eae376fc` (review D-1432–D-1440). This file audits **this SHA only** (first of nine `js/` commits since review **400**). Archive **Addressed:** D-1441 `b8ef02c3` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 04:02:38 +0200
- D-id: **D-1441**
- Stats: 10 files, +129 / −34 — `js/spell.js` +19 / −6; `js/zap.js` +19 / −4 (zapyourself WAN/SPE_DIG `break` plus comments). Journal rotate accounts for most of the docs churn.
- Claims to close: Open `zap.c` `weffects` SPE_DIG wand-duplicate (named from D-1427). Not IMMEDIATE. `reviews/loop-2026-08-15/` has no unpaid SPE_DIG-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callees `zap.js` `weffects` / `zapyourself`; `dig.js` `zap_dig`. `c-js-map/turns.md` (`spell.c` + `dig.c` rows). MAGIC_MISSILE / FINGER / IMMEDIATE still named at this SHA.
- Prior reviews this SHA claims to close: **400** named SPE_DIG as first Open; **387** named remaining SLEEP/DIG; **396** named remaining DIG.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_DIG wand-duplicate weffects so casting dig fires zap_dig (or self-zaps as a no-op) instead of doing nothing.”

C `spell.c` `:1457–1514` one fallthrough group. `SPE_DIG` is `:1467` (after KNOCK / SLOW / WIZARD_LOCK). `objects.h:1293–1294` `SPELL("dig", … RAY … SPE_DIG)` is `FIRST_SPELL` and sits **before** the “must be in this order; see buzz()” block (`SPE_MAGIC_MISSILE`…`SPE_FINGER_OF_DEATH`, `:1296–1307`). `oc_dir == RAY` so `:1479` takes getdir / atme / self vs `weffects`. Self: `zapyourself` `:2955–2959` (shared `break` with `WAN_DIGGING` / `SPE_DETECT_UNSEEN` / `WAN_NOTHING`; no `learn_it`). Directed: `weffects` `:3456–3468`:

```
        if (otyp == WAN_DIGGING || otyp == SPE_DIG)
            zap_dig();
        else if (otyp >= SPE_MAGIC_MISSILE && otyp <= SPE_FINGER_OF_DEATH)
            ubuzz(BZ_U_SPELL(BZ_OFS_SPE(otyp)), u.ulevel / 2 + 1);
```

DIG is **not** in the missile closed range (`SPE_DIG < SPE_MAGIC_MISSILE`). Fake book is SPBOOK so `learnwand` skips `makeknown`. Then `update_inventory()`.

Old JS: SPE_DIG fell through `spelleffects` “Nothing happens.” after energy. `weffects` already had `WAN_DIGGING || SPE_DIG` → `zap_dig` (D-0516). `zapyourself` defaulted the no-op (`default: break`).

The diff **does** add `const SPE_DIG` and an `else if (otyp === SPE_DIG)` that calls `wand_duplicate_weffects(pseudo, atme, false)`. It **does** add explicit `zapyourself` `WAN_DIGGING`/`SPE_DIG` `break` (same 0 damage / no learn as the default). It **does not** change `weffects` / `zap_dig` bodies (comment-only on the weffects banner). It **does not** dispatch SPE_MAGIC_MISSILE / FINGER / remaining IMMEDIATE. Named. It **does not** port `zap_dig` swallow pierce / `u.dz` falling-rock / pitdig (already named on `dig.js`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_DIG arm | C `:1467–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing C callee wrapper** | getdir / atme / zapyourself / weffects / `update_inventory` |
| `weffects` DIG gate | C `:3459–3460`, **pre-existing live** (D-0516) | comment-only this SHA |
| `zap_dig` | C `dig.c:1548+`, **imported live subset** (D-0516) | horizontal `rn1(18,8)`; swallow / `u.dz` / pitdig named |
| `zapyourself` WAN/SPE_DIG | C `:2955–2959`, **wired this SHA** (was default-break) | no `learn_it`; damage 0 |
| `learnwand` | C, **imported live** | SPBOOK skips `makeknown` |
| SPE_MAGIC_MISSILE / FINGER / IMMEDIATE cast | C same fallthrough, **named omit** | still “Nothing happens.” at this SHA |
| `SPE_DETECT_UNSEEN` / `WAN_NOTHING` self | C same `break` group | JS default still `break` — same 0 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** directed ray uses existing `zap_dig` `rn1(18,8)` = `rn2(18)+8`. Self-dir: **zero** new RNG. Public fortress does not `#cast` dig.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514` for non-NODIR: atme zeros dx/dy/dz; `!getdir` prints “The magical energy is released!” and **reuses** previous dir (C FIXME); self (`!dx && !dy && !dz`) → `zapyourself(pseudo, TRUE)` then `losehp` only if damage (dig returns 0); else `weffects`; always `update_inventory()`. `physical_damage` false: C only FORCE_BOLT sets it before FALLTHROUGH. SPE_DIG never Maybe_Half_Phys. Match.

`oc_dir` RAY: JS `game.objects[otyp].oc_dir !== NODIR` then not-all-zero → `weffects`. SPE_DIG is RAY in `objects.h:1293–1294`. Match. (JS weffects tests NODIR before IMMEDIATE; C the reverse. RAY misses both gates either way.)

`weffects` `:3459–3460`: first RAY arm is DIG → `zap_dig()`, then missile `ubuzz` range. JS `:5047–5049` same order. `disclose = true` after `zap_dig` (C sets it once after the RAY chain at `:3468`). JS sets disclose inside the DIG arm. Same learnwand/XP for unknown. Fake SPBOOK still skips `makeknown`. Match D-0516 keep-path; this SHA only **reaches** it from `#cast`.

Self-dir: C `:2955–2959` `break` — no pline, no `learn_it`, damage 0 so `wand_duplicate` skips `losehp`. JS explicit cases match. Sibling `SPE_DETECT_UNSEEN` is NODIR so wand-duplicate never self-zaps it; `WAN_NOTHING` still default-break. Not a new C-wrong.

Directed keep-path `zap_dig` (`dig.c:1612–1623` then the while): not swallowed, `!u.dz`, `digdepth = rn1(18,8)`, `tmp_at(DISP_BEAM)`, door/SDOOR raze (`The door is razed!` when `cansee`), maze_dig one-cell, ordinary `IS_OBSTRUCTED` `may_dig`, shop `add_damage` / `pay_for_damage`. JS `dig.js:1055–1179` walks that horizontal envelope. **Callee is not a stub.**

C swallow `:1568–1581`: pierce / half-HP unique / `expels`. JS `if (u.uswallow) return;` — silent no-op. Named on `dig.js` (`swallowed pierce`), not a keep-path lie on **dispatch**. C `u.dz` `:1584–1609`: ceiling rock `rnd(2 or 6)` / `dighole`. JS `if (u.dz) return;`. Named (`u.dz falling-rock / dighole`). C pitdig `:1631–1667` conjoined / `dighole` / `pit_flow`. JS `if (pitdig) break`. Named. Do **not** stamp “Match C swallow pierce.”

Hallucination check: “Match C SPE_DIG wand-duplicate weffects” while **`weffects` DIG → `zap_dig` is live (D-0516)** is **not** a dispatch-stub lie. The new arm is nine lines that call a live wrapper. “Match C `zap_dig` swallow / `u.dz` / pitdig” **would** be. “Match C SPE_MAGIC_MISSILE / FINGER cast” **would** be (those still printed Nothing happens at this SHA).

## Hallucinations / overclaim

Subject says casting dig fires `zap_dig` or self-zaps as a no-op instead of doing nothing. **True** on the keep-path: `#cast` SPE_DIG now getdir → self `zapyourself` (0) or `weffects` → `zap_dig` `rn1(18,8)`; LIGHT/SLEEP/DRAIN/DETECT_UNSEEN stay wired; MAGIC_MISSILE / FINGER / KNOCK still Nothing happens. **False until named** for swallow pierce / `u.dz` rock/`dighole` / pitdig conjoined, and remaining wand-duplicate MAGIC_MISSILE / FINGER / IMMEDIATE. Stamping **Addressed:** D-1441 for the **cast dispatch** is fair. Do **not** stamp “Match C `zap_dig` swallowed.” Do **not** treat fortress PASS as a dig cast.

## Density

One otyp of the C wand-duplicate group, same size as D-1440 SLEEP / D-1427 LIGHT. ~20 lines of JS plus comments. Playbook §2b right size. Did not glue MAGIC_MISSILE. Acceptable.

## Branch-by-branch confirm

1. Directed SPE_DIG, not swallowed, `dz==0`: `weffects` DIG gate; `zap_dig` `rn1(18,8)` beam. Match `:3459–3460` / `:1612–1623`.
2. Self-dir / atme: `zapyourself` break; no `losehp`; no `learn_it`. Match `:1500–1508` + `:2955–2959`.
3. Cancelled getdir: “magical energy is released!” then reuse dir. Match `:1488–1498`.
4. Unknown type disclose: `learnwand` + XP; SPBOOK skips `makeknown`. Match `:3470–3474`.
5. SPE_MAGIC_MISSILE / FINGER still else “Nothing happens.” C would `ubuzz`. Named at this SHA.
6. Remaining IMMEDIATE (KNOCK / SLOW / LOCK) still Nothing happens. Named.
7. `physical_damage` false. Match (FORCE_BOLT-only).
8. Swallowed / `u.dz` / pitdig: JS early-out vs C pierce/rock/conjoin. **Named omit on callee**, not this dispatch.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `weffects` hunks are comments; the only new `zapyourself` code is an explicit no-op `break`.

## Verification

Journal: private canary **22**/22 (C/JS grep; RAY SPBOOK vs WAN_DIGGING; FIRST_SPELL before MAGIC_MISSILE; door razed; self-dir no-op; swallow early-out; SLEEP/LIGHT/DRAIN/DETECT_UNSEEN still wired; MAGIC_MISSILE/FINGER/KNOCK still Nothing happens; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not a dig cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `weffects`/`zap_dig`/`zapyourself`. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. SPE_MAGIC_MISSILE / SPE_FINGER_OF_DEATH cast dispatch (same C group; RAY `ubuzz` already live) — later SHAs in this window
2. remaining wand-duplicate IMMEDIATE (KNOCK / SLOW / LOCK / …)
3. `zap_dig` swallowed pierce / `expels` (`dig.c:1568–1581`)
4. `zap_dig` `u.dz` falling-rock / `dighole` (`:1584–1609`)
5. `zap_dig` pitdig conjoined / `adj_pit_checks` / `pit_flow`

Do not Must-fix “weffects DIG is a stub” (D-0516 live). Do not Must-fix “SPE_DIG should `ubuzz`” (C `zap_dig` first). Do not Must-fix “self-zap should learnwand.” Do not Must-fix “MAGIC_MISSILE should have shipped in this SHA.”

## Callers / RNG ledger

C callers: `docast` → `spelleffects`. Directed new RNG is existing `zap_dig` `rn1(18,8)`. Public fortress does not cast this.

Verdict: **ACCEPT-WITH-DEBT**
