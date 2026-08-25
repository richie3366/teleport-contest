# Review 400 — 530eaa3c — spell.c SPE_SLEEP RAY wand-duplicate (D-1440)

## Metadata
- Full / short hash: `530eaa3c37ce7794d889654fddb759eac4961b30` / `530eaa3c`
- Parent: `f6dd492b` (D-1439). This file audits **this SHA only** (ninth / last of nine `js/` commits since review **391**). Archive **Addressed:** D-1440 had no `%h` on disk at review time — filled `530eaa3c` in this audit commit.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 03:34:06 +0200
- D-id: **D-1440**
- Stats: 11 files, +241 / −151 — `js/spell.js` +19 / −3; `js/zap.js` +13 / −5 **comments only** (no RAY-arm logic change). Journal rotate accounts for most of the docs churn.
- Claims to close: Open `zap.c` `weffects` SPE_SLEEP wand-duplicate (named from D-1427). Not DIG. `reviews/loop-2026-08-15/` has no unpaid SPE_SLEEP-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callees `zap.js` `weffects` / `ubuzz` / `zapyourself` / `zhitm`/`zhitu` `ZT_SLEEP`. `c-js-map/turns.md`. DIG / MAGIC_MISSILE / FINGER still named.
- Prior reviews this SHA claims to close: **396** (DRAIN weffects) named remaining SLEEP; **391** named remaining wand-duplicate SLEEP/DIG.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_SLEEP wand-duplicate weffects so casting sleep fires a sleep ray (or self-zaps) instead of doing nothing.”

C `spell.c` `:1457–1514` one fallthrough group. `SPE_SLEEP` is `:1462` (after FORCE_BOLT sets `physical_damage`). `objects.h:1304–1305` `SPELL("sleep", … RAY … SPE_SLEEP)` sits **between** `SPE_MAGIC_MISSILE` and `SPE_FINGER_OF_DEATH` (`:1297–1307`, comment “must be in this order; see buzz()”). `oc_dir == RAY` so `:1479` takes getdir / atme / self vs `weffects`. Self: `zapyourself` `:2851–2866`. Directed: `weffects` `:3456–3468`:

```
        if (otyp == WAN_DIGGING || otyp == SPE_DIG)
            zap_dig();
        else if (otyp >= SPE_MAGIC_MISSILE && otyp <= SPE_FINGER_OF_DEATH)
            ubuzz(BZ_U_SPELL(BZ_OFS_SPE(otyp)), u.ulevel / 2 + 1);
```

`BZ_OFS_SPE` is `abs(otyp - SPE_MAGIC_MISSILE) % 10` (`hack.h:1478`). Sleep is offset 3 (`ZT_SLEEP` = `AD_SLEE - 1` = 3). `BZ_U_SPELL(3)` = 13. `nd = u.ulevel/2+1`. Fake book is SPBOOK so `learnwand` skips `makeknown`. Then `update_inventory()`.

Old JS: SPE_SLEEP fell through `spelleffects` “Nothing happens.” after energy. `weffects` RAY range + `ubuzz` already live (D-1386). `zapyourself` SPE_SLEEP already live (D-0156).

The diff **does** add `const SPE_SLEEP` and an `else if (otyp === SPE_SLEEP)` that calls `wand_duplicate_weffects(pseudo, atme, false)`. It **does not** change `weffects` / `ubuzz` / `zhitm` bodies. Comment-only on `zap.js`. It **does not** dispatch SPE_DIG / MAGIC_MISSILE / FINGER. Named. It **does not** add `resists_sleep` to `sleep_monst_zap` (already named on that clone).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_SLEEP arm | C `:1462–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing C callee wrapper** | getdir / atme / zapyourself / weffects / `update_inventory` |
| `weffects` RAY range | C `:3461–3462`, **pre-existing live** (D-1386) | comment-only this SHA |
| `ubuzz` / `dobuzz` | C, **imported live** | `BZ_U_SPELL(BZ_OFS_SPE)` + `ulevel/2+1` |
| `zapyourself` SPE_SLEEP | C `:2851–2866`, **imported live** | shieldeff / monstseesu named |
| `zhitm` `ZT_SLEEP` | C `:4292–4298`, **live subset** | `sleep_monst_zap` clone; resists/oclass named |
| `zhitu` `ZT_SLEEP` | C `:4454–4462`, **live subset** | `fall_asleep(-d(nd,25))`; shieldeff named |
| SPE_DIG / MAGIC_MISSILE / FINGER cast | C same fallthrough, **named omit** | still “Nothing happens.” |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** directed ray uses existing `dobuzz` / `zhitm` dice (`d(nd,25)` sleep amt, `resist` named-omit on clone). Self-dir: `rnd(50)` already in `zapyourself`. Public fortress does not `#cast` sleep.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514` for non-NODIR: atme zeros dx/dy/dz; `!getdir` prints “The magical energy is released!” and **reuses** previous dir (C FIXME); self (`!dx && !dy && !dz`) → `zapyourself(pseudo, TRUE)` then `losehp` only if damage (sleep returns 0); else `weffects`; always `update_inventory()`. `physical_damage` false: C only FORCE_BOLT sets it before FALLTHROUGH. SPE_SLEEP never Maybe_Half_Phys. Match.

`oc_dir` RAY: JS `game.objects[otyp].oc_dir !== NODIR` then not-all-zero → `weffects`. SPE_SLEEP is RAY in `objects.h`. Match. (JS weffects tests NODIR before IMMEDIATE; C the reverse. RAY misses both gates either way.)

`weffects` `:4724–4729`: `otyp >= SPE_MAGIC_MISSILE && otyp <= SPE_FINGER_OF_DEATH` → `ubuzz(BZ_U_SPELL(BZ_OFS_SPE(otyp)), trunc(ulevel/2)+1)`. SPE_SLEEP is in that closed range in both C object order and JS `objectNames`. Offset 3 → type 13. Disclose + `learnwand` on SPBOOK does not `makeknown`. Match D-1386 keep-path; this SHA only **reaches** it from `#cast`.

Self-dir: `zapyourself` WAN/SPE_SLEEP: `learn_it`; Sleep_resistance → “You don't feel sleepy!” (C also `shieldeff` + `monstseesu` — named); else ordinary “The sleep ray hits you!” + `fall_asleep(-rnd(50), TRUE)`. Damage 0 so `wand_duplicate` skips `losehp`. Match keep-path.

Directed hit-mon: `zhitm` `ZT_SLEEP` tmp=0, `sleep_monst_zap(mon, d(nd,25))`. C `sleep_monst(mon, d(nd,25), '\0')` because type is spell not `ZT_WAND`. Clone freezes `mcanmove`/`mfrozen` like C `:1234–1243` **when it takes the affect arm**. It **skips** `resists_sleep` / `defended(AD_SLEE)` / `resist(..., how, 0, NOTELL)` / mimic `seemimic` (`:1226–1233`). D-log names `sleep_monst` oclass resist. Pre-existing clone, not a new keep-path lie on **dispatch**. Sleep-resistant monsters can freeze in JS; C would shieldeff. Named omit on the callee.

Hero in ray: `zhitu` `ZT_SLEEP` Sleep_resistance “don't feel sleepy.” else `fall_asleep(-d(nd,25), TRUE)`. C also shieldeff/monstseesu. Named.

Hallucination check: “Match C SPE_SLEEP wand-duplicate weffects” while **`weffects` RAY + `ubuzz` + `zapyourself` SPE_SLEEP are live** is **not** a dispatch-stub lie. The new arm is seven lines that call a live wrapper. “Match C `sleep_monst` resist/defended” **would** be. “Match C SPE_DIG / MAGIC_MISSILE cast” **would** be (those still print Nothing happens).

## Hallucinations / overclaim

Subject says casting sleep fires a sleep ray or self-zaps instead of doing nothing. **True** on the keep-path: `#cast` SPE_SLEEP now getdir → self `zapyourself` or `weffects` → `ubuzz` type 13 nd=`ulevel/2+1`; LIGHT/DRAIN/DETECT_UNSEEN stay wired; DIG still Nothing happens. **False until named** for SPE_DIG / MAGIC_MISSILE / FINGER_OF_DEATH (same C fallthrough), `sleep_monst` resist/oclass, zhitu/zapyourself shieldeff. Stamping **Addressed:** D-1440 for the **cast dispatch** is fair. Do **not** stamp “Match C `sleep_monst`.” Do **not** treat fortress PASS as a sleep cast.

## Density

One otyp of the C wand-duplicate group, same size as D-1427 LIGHT / D-1436 DRAIN. ~16 lines of JS plus comments. Playbook §2b right size. Did not glue DIG. Acceptable.

## Branch-by-branch confirm

1. Directed SPE_SLEEP: `weffects` RAY range; `ubuzz` 13, `ulevel/2+1`. Match `:3461–3462`.
2. Self-dir / atme: `zapyourself` SPE_SLEEP; no `losehp`. Match `:1500–1508`.
3. Cancelled getdir: “magical energy is released!” then reuse dir. Match `:1488–1498`.
4. Sleep_resistance self: no sleepy pline; no `rnd(50)`. Match keep-path; shieldeff named.
5. SPE_DIG still else “Nothing happens.” C would `zap_dig`. Named. Match **this** SHA’s named omit.
6. SPE_MAGIC_MISSILE / FINGER still Nothing happens. Named (Open).
7. `physical_damage` false. Match (FORCE_BOLT-only).
8. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `zap.js` hunks are comments.

## Verification

Journal: private canary **36**/36 (C/JS grep; RAY SPBOOK vs WAN_SLEEP; MAGIC_MISSILE..FINGER range; BZ_OFS 3; DIG still Nothing happens; LIGHT/DRAIN/DETECT_UNSEEN still wired; zapyourself `rnd(50)` usleep; resist no nomul; WAN_SLEEP regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `530eaa3c` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838. Fortress PASS is not a sleep cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `weffects`/`ubuzz`/`zapyourself`. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. SPE_DIG wand-duplicate (`zap_dig`) — first Open
2. SPE_MAGIC_MISSILE / SPE_FINGER_OF_DEATH cast dispatch (same C group; RAY callees already live)
3. `sleep_monst` `resists_sleep` / `defended(AD_SLEE)` / `resist` oclass / mimic `seemimic`
4. zhitu / zapyourself sleep `shieldeff` / `monstseesu`

Do not Must-fix “weffects RAY is a stub” (D-1386 live). Do not Must-fix “SPE_SLEEP should Maybe_Half_Phys.” Do not Must-fix “DIG should have shipped in this SHA.”

## Callers / RNG ledger

C callers: `docast` → `spelleffects`. Directed new RNG is existing buzz/zhitm. Public fortress does not cast this.

Verdict: **ACCEPT-WITH-DEBT**
