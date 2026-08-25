# Review 409 — 70c2b8e6 — spell.c SPE_FINGER_OF_DEATH RAY wand-duplicate (D-1449)

## Metadata
- Full / short hash: `70c2b8e692f5e78683cdde56db4c8d2267cfd871` / `70c2b8e6`
- Parent: `20f59004` (D-1448). This file audits **this SHA only** (ninth / last of nine `js/` commits since review **400**). Archive **Addressed:** D-1449 had no `%h` on disk at review time — filled `70c2b8e6` in this audit commit.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 05:40:08 +0200
- D-id: **D-1449**
- Stats: 10 files, +121 / −36 — `js/spell.js` +19 / −5; `js/zap.js` comments only (+9 / −5).
- Claims to close: Open `spell.c` SPE_FINGER_OF_DEATH wand-duplicate RAY (named from D-1440 / review **408**). Not MAGIC_MISSILE. `reviews/loop-2026-08-15/` has no unpaid finger-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callees `zap.js` `weffects` / `ubuzz` / `zapyourself` / `zhitm` `ZT_DEATH`. `c-js-map/turns.md`. Remaining IMMEDIATE still named.
- Prior reviews this SHA claims to close: **408** named FINGER as remaining RAY; **400** named FINGER with MAGIC_MISSILE.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_FINGER_OF_DEATH RAY wand-duplicate so casting finger of death calls weffects ubuzz instead of printing Nothing happens.”

C `spell.c` `:1472` is in the `:1457–1514` fallthrough. `objects.h:1306–1307` `SPELL("finger of death", … RAY … SPE_FINGER_OF_DEATH)` ends the buzz-order block. `oc_dir == RAY` so getdir / atme / self vs `weffects`. Self: `zapyourself` `:2885–2902` already live (D-0156 / D-0928 #1103). Directed: `weffects` `:3461–3462` `ubuzz(BZ_U_SPELL(BZ_OFS_SPE(otyp)), u.ulevel/2+1)`. Finger is offset 4 (`ZT_DEATH`). `BZ_U_SPELL(4)` = 14. `nd = u.ulevel/2+1`. Fake book is SPBOOK so `learnwand` skips `makeknown`. FIREBALL (offset 1) and CONE (offset 2) sit in the same C closed range but have their own `spelleffects` arms (unskilled getdir vs skilled scatter); this SHA does not route them through `wand_duplicate_weffects`. SLEEP (offset 3) is already D-1440.

Old JS: SPE_FINGER_OF_DEATH fell through “Nothing happens.” after D-1448. `weffects` RAY range + `ubuzz` already live (D-1386). `zapyourself` WAN_DEATH/SPE_FINGER already live.

The diff **does** add `const SPE_FINGER_OF_DEATH` and `else if (otyp === SPE_FINGER_OF_DEATH)` → `wand_duplicate_weffects(pseudo, atme, false)`. It **does not** change `weffects` / `ubuzz` / `zhitm` bodies (comment-only on `zap.js`). It **does not** dispatch remaining IMMEDIATE (KNOCK / SLOW / LOCK / …). Named. It **does not** add `zhitm` `PM_DEATH` heal / `is_vampshifter` / `defended(AD_MAGM)` (already named on that helper).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_FINGER_OF_DEATH arm | C `:1472–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing wrapper** | |
| `weffects` RAY range | C `:3461–3462`, **pre-existing live** (D-1386) | includes FINGER as the high bound |
| `ubuzz` / `dobuzz` | C, **imported live** | type 14, `nd=ulevel/2+1` |
| `zapyourself` WAN_DEATH/SPE_FINGER | C `:2885–2902`, **imported live** | undead harmless; else `done(DIED)` |
| `zhitm` `ZT_DEATH` | C `:4299–4341`, **live subset** | nonliving/demon/`resists_magm` shield; `mhp+1`; PM_DEATH / vampshifter named |
| `zhitu` `ZT_DEATH` | C, **live subset** | breath/disintegrate named |
| remaining IMMEDIATE cast | C same fallthrough, **named omit** | still “Nothing happens.” |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** directed death ray uses existing buzz/`zhitm` (no `d()` on the death keep-path; `tmp = mhp+1`). Self-dir: `done(DIED)` already in `zapyourself`. Public fortress does not `#cast` finger of death.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514` for RAY. `physical_damage` false. Finger never Maybe_Half_Phys. Self-dir `zapyourself` returns 0 on the undead arm and does not resume after `done(DIED)` on the living arm, so `losehp` is unused. Match.

`oc_dir` RAY. Finger is RAY. Closed range `SPE_MAGIC_MISSILE .. SPE_FINGER_OF_DEATH` includes this otyp as the **upper bound**. Offset `abs(FINGER - MAGIC_MISSILE)%10 = 4` (FIREBALL/CONE/SLEEP sit between). Type 14. Disclose + SPBOOK skip makeknown. Match D-1386 keep-path; this SHA only **reaches** it from `#cast`.

Self-dir: nonliving/demon “You seem no deader than before.” (spell, not wand harmless-beam); else learn + killer “shot him/herself with a death ray” + irradiate/die + `done(DIED)`. JS live D-0156. Match keep-path.

Directed `zhitm` `ZT_DEATH` (not breath): C heals `PM_DEATH` (`healmon` 3/2 mhpmax), shields nonliving/demon/`is_vampshifter`/`resists_magm`, sets `type = -1` (no save), else `tmp = mhp+1`. JS `:1656–1676` shields nonliving/demon/`resists_magm` then `mhp+1`. **Callee is not a stub** on that keep-path. `PM_DEATH` heal / `is_vampshifter` / `defended(AD_MAGM)` named. Breath arm (`abs(type)==ZT_BREATH(DEATH)`): C may destroy shield/suit; JS `MAGIC_COOKIE` or `resists_disint`. Named (finger cast is wand-spell death, not breath).

`zhitu` `ZT_DEATH`: JS nonliving/demon “unaffected”; Antimagic “aren’t affected”; else `losehp(uhp+1)` + `done`. C also `shieldeff` on the Antimagic arm. Named. Hero in a **directed** finger ray can take this path; self-dir uses `zapyourself` instead.

Hallucination check: “Match C SPE_FINGER wand-duplicate weffects” while **`weffects` RAY + `ubuzz` + `zapyourself` death are live** is **not** a dispatch-stub lie. The new arm is eight lines that call a live wrapper. “Match C `zhitm` `PM_DEATH` heal / vampshifter” **would** be. “Match C SPE_KNOCK IMMEDIATE” **would** be.

## Hallucinations / overclaim

Subject says casting finger of death calls weffects ubuzz instead of Nothing happens. **True:** `#cast` getdir → self `zapyourself` or `weffects` → `ubuzz` type 14 `nd=ulevel/2+1`; SLEEP/DIG/MAGIC_MISSILE/LIGHT/DRAIN stay wired; KNOCK still Nothing happens. **False until named** for remaining IMMEDIATE, `zhitm` PM_DEATH/vampshifter/`defended`, zhitu breath disintegrate. Stamping **Addressed:** D-1449 for the **cast dispatch** is fair. This review fills archive hash `70c2b8e6`. Do **not** stamp “Match C `healmon(PM_DEATH)`.” Do **not** treat fortress PASS as a finger cast.

## Density

One otyp of the C wand-duplicate group, same size as D-1448 missile. ~16 lines of JS plus comments. Playbook §2b right size. Did not glue KNOCK. Acceptable. FIREBALL/CONE remain on their own `spelleffects` arms even though they sit inside the C `weffects` RAY numeric range; routing them here would be a different cluster.

## Branch-by-branch confirm

1. Directed SPE_FINGER: `ubuzz` 14, `ulevel/2+1`. Match `:3461–3462`.
2. Self-dir undead/demon: no-deader pline; damage 0. Match `:2887–2891`.
3. Self-dir living: irradiate/die/`done(DIED)`. Match `:2893–2901`.
4. Cancelled getdir: reuse dir. Match `:1488–1498`.
5. Directed living mon: `tmp = mhp+1` (no save). Match keep-path `:4340`.
6. Directed undead/demon/`resists_magm`: shield. Match `:4308–4312`.
7. Remaining IMMEDIATE still Nothing happens. Named.
8. `physical_damage` false. Match.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `zap.js` hunks are comments.

## Verification

Journal: private canary **25**/25 (C/JS grep; RAY SPBOOK vs WAN_DEATH; BZ_OFS 4; undead self-dir 0 dmg; directed SPBOOK skip makeknown; KNOCK still Nothing happens; SLEEP/DIG/MAGIC_MISSILE/LIGHT/DRAIN still wired; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `70c2b8e6`. Fortress PASS is not a finger cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `weffects`/`ubuzz`/`zapyourself`. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. remaining wand-duplicate IMMEDIATE (KNOCK / SLOW / LOCK / POLYMORPH / …) — first Open
2. `zhitm` `PM_DEATH` heal / `is_vampshifter` / `defended(AD_MAGM)`
3. `zhitu` breath disintegration
4. FIREBALL/CONE through this same RAY range (they have their own `spelleffects` arms)

Do not Must-fix “weffects RAY is a stub” (D-1386 live). Do not Must-fix “KNOCK should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `docast` → `spelleffects`. Directed death keep-path has no extra `d()` (HP+1). Public fortress does not cast this.

`BZ_OFS_SPE` is `abs(otyp - SPE_MAGIC_MISSILE) % 10`. Finger is the last buzz-order spell, so the offset is 4 and the type is 14. That is the C contract this SHA reaches; it is not a local invent.
Public fortress still does not `#cast` this otyp, so the cadence PASS is not evidence of the death-ray keep-path.

Verdict: **ACCEPT-WITH-DEBT**
