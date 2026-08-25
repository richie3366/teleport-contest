# Review 411 — 5c8b73c5 — spell.c SPE_SLOW_MONSTER IMMEDIATE wand-duplicate (D-1451)

## Metadata
- Full / short hash: `5c8b73c52e64d60b8f99f123ca354eab9127777e` / `5c8b73c5`
- Parent: `de69d3f9` (D-1450). This file audits **this SHA only** (second of nine `js/` commits since review **409**). Archive **Addressed:** D-1451 `5c8b73c5` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 06:16:44 +0200
- D-id: **D-1451**
- Stats: 10 files, +121 / −35 — `js/spell.js` +17 / −4; `js/zap.js` comments only (+15 / −4).
- Claims to close: Open `zap.c` `weffects` SPE_SLOW_MONSTER IMMEDIATE wand-duplicate (named from D-1450 / review **410**). Not LOCK. `reviews/loop-2026-08-15/` has no unpaid slow-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callees `zap.js` `weffects` / `bhit` / `bhitm` / `zapyourself`. `c-js-map/turns.md`. LOCK / remaining IMMEDIATE still named at this SHA.
- Prior reviews this SHA claims to close: **410** named SLOW as remaining IMMEDIATE; **384** (D-1424) shipped `bhitm` SPE_SLOW; **393** (D-1433) shipped `zapyourself` SPE_SLOW.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_SLOW_MONSTER IMMEDIATE wand-duplicate so casting slow monster calls weffects bhit instead of printing Nothing happens.”

C `spell.c` `:1465` is in the `:1457–1514` fallthrough. `objects.h:1331–1333` `SPELL("slow monster", … IMMEDIATE … SPE_SLOW_MONSTER)`. `oc_dir == IMMEDIATE` so getdir / atme / self vs `weffects`. Self: `zapyourself` `:2868–2874` already live (D-1433). Directed: `weffects` `:3440–3451` IMMEDIATE `bhit(rn1(8,6), bhitm, bhito)`. Fake book is SPBOOK so `learnwand` skips `makeknown`. `physical_damage` is FORCE_BOLT-only.

Old JS: SPE_SLOW_MONSTER fell through “Nothing happens.” after D-1450. `weffects` IMMEDIATE already live (D-1388). `bhitm` WAN/SPE_SLOW already live (D-1424). `zapyourself` WAN/SPE_SLOW already live (D-1433).

The diff **does** add `const SPE_SLOW_MONSTER` and `else if (otyp === SPE_SLOW_MONSTER)` → `wand_duplicate_weffects(pseudo, atme, false)`. It **does not** change `weffects` / `bhit` / `bhitm` / `zapyourself` bodies (`zap.js` comments only). It **does not** dispatch LOCK/TURN/POLY. Named. It **does not** add `zap_steed` SPE_SLOW `bhitm` routing (C `:3124–3133`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_SLOW_MONSTER arm | C `:1465–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing wrapper** | |
| `weffects` IMMEDIATE | C `:3440–3451`, **pre-existing live** (D-1388) | `rn1(8,6)` then `bhit` |
| `bhitm` SPE_SLOW | C `:218–232`, **imported live** (D-1424) | `resist` then `mon_adjust_speed(-1)` |
| `mon_adjust_speed` | C `worn.c`, **imported live** (D-0871) via `muse.js` | |
| `zapyourself` SPE_SLOW | C `:2868–2874`, **imported live** (D-1433) | `HFast&(TIMEOUT\|INTRINSIC)` then `u_slow_down` |
| `u_slow_down` | C `mhitu.c:161–171`, **imported live** (D-1433) | |
| `bhito` SPE_SLOW | C `:2404–2410` `res = 0`, **match via default** | JS default `res = 0` |
| `zap_steed` SPE_SLOW | C `:3124–3133` → `bhitm`, **named omit** | probing-only switch |
| `zap_updown` shared tail | C `:3382–3410`, **named omit at this SHA** | JS probing-only |
| remaining IMMEDIATE cast | C same fallthrough, **named omit** | LOCK still “Nothing happens.” |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** directed slow uses existing `rn1(8,6)` plus `bhitm` `resist` (`rn2`). Self-dir: `u_slow_down` `rn2(2)` already in D-1433. Public fortress does not `#cast` slow monster.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514` for IMMEDIATE (same wrapper as D-1450). `physical_damage` false. Slow never Maybe_Half_Phys. Match.

`oc_dir` IMMEDIATE. SPE_SLOW_MONSTER is IMMEDIATE. Directed horizontal: `zapsetup` / `bhit(rn1(8,6), bhitm, bhito)` / `zapwrapup`. Disclose stays false. SPBOOK skip makeknown. Match D-1388 keep-path; this SHA only **reaches** it from `#cast` slow.

Self-dir `:2868–2874`: `HFast & (TIMEOUT|INTRINSIC)` then `learn_it` + `u_slow_down()`. Boots-only `EFast` misses. JS ORs `u.HFast` with `uprops[FAST].intrinsic` (D-1433; `HFast` **is** that intrinsic). **Callee is not a stub.** Review **393** already walked `u_slow_down` plines / `FROM_FORM` miss / TIMEOUT+EFast “less natural.”

Directed `bhitm` `:218–232`: `!resist(..., 0, NOTELL)` then `seemimic` if disguised, `mon_adjust_speed(mtmp, -1, otmp)`, `check_gear_next_turn`, whirly engulfer `expels`. **No** `helpful_gesture` (unlike WAN_SPEED). JS keep-path live (D-1424): same order, dynamic-import live `mon_adjust_speed`. **Callee is not a stub.** Review **384** already walked resist / MSLOW / MFAST→0 / asleep skip-learn / whirly.

`bhito`: C explicit `res = 0` (no effect on objects). JS `default: res = 0`. Same observable. C `impossible` default never fires for this otyp.

`zap_steed`: C routes SPE_SLOW through `bhitm(usteed)`. JS probing-only, returns false, weffects falls through to `zap_updown`. Named (Open already).

`zap_updown`: SPE_SLOW is not a special case; C `:3378–3380` `default` then down `bhitpile`+`zap_map` / up hideunder `bhito`. JS at this SHA returns false on default, so skips `zap_map`. For slow, `bhito` is a no-op, so the miss is the shared engraving/`zap_map` tail. Named (other zap_updown otyps).

Hallucination check: “Match C SPE_SLOW wand-duplicate weffects bhit” while **`weffects` IMMEDIATE + `bhitm`/`zapyourself` SPE_SLOW are live** is **not** a dispatch-stub lie. The new arm is eight lines that call a live wrapper. “Match C `zap_steed` SPE_SLOW `bhitm`” **would** be. “Match C SPE_WIZARD_LOCK cast” **would** be at this SHA.

## Hallucinations / overclaim

Subject says casting slow monster calls weffects bhit instead of Nothing happens. **True:** `#cast` getdir → self `zapyourself`/`u_slow_down` or `weffects` → `bhit` → `bhitm` `mon_adjust_speed(-1)`; KNOCK/SLEEP/DIG/MAGIC_MISSILE/FINGER/LIGHT/DRAIN stay wired; LOCK still Nothing happens. **False until named** for zap_steed slow, zap_updown shared tail, remaining IMMEDIATE. Stamping **Addressed:** D-1451 for the **cast dispatch** is fair. Do **not** stamp “Match C `zap_steed` slow.” Do **not** treat fortress PASS as a slow cast.

## Density

One otyp of the C wand-duplicate IMMEDIATE group, same size as D-1450 KNOCK. ~16 lines of JS plus comments. Playbook §2b right size. Did not glue LOCK. Acceptable.

## Branch-by-branch confirm

1. Directed SPE_SLOW at a monster: `weffects` IMMEDIATE `rn1(8,6)` `bhit` → `bhitm`. Match `:3440–3451` + `:218–232`.
2. `!resist`: `mon_adjust_speed(-1)` + `I_SPECIAL`. Match D-1424 keep-path.
3. Resist: no speed change; still `wake` (can anger). Match (no `helpful_gesture`).
4. Whirly engulfer: disrupt + hole + `expels`. Match `:226–230`.
5. Self-dir with TIMEOUT/INTRINSIC: `u_slow_down`. Match `:2870–2872`.
6. Self-dir boots-only EFast: no-op. Match.
7. Cancelled getdir: reuse dir. Match `:1488–1498`.
8. Floor object: `bhito` res 0. Match `:2404–2410`.
9. LOCK still Nothing happens. Named.
10. `physical_damage` false. Match.
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `zap.js` hunks are comments.

## Verification

Journal: private canary **19**/19 (C/JS grep; IMMEDIATE SPBOOK vs WAN_SLOW; atme not Nothing happens; HFast You slow down; directed kobold moving slower + permspeed MSLOW; SPBOOK skip makeknown; LOCK still Nothing happens; KNOCK/SLEEP/DIG/MAGIC_MISSILE/FINGER/LIGHT/DRAIN still wired; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `01edf8b9`. Fortress PASS is not a slow cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `weffects`/`bhitm`/`zapyourself`. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. remaining wand-duplicate IMMEDIATE (LOCK / TURN / POLY / …) — first Open at this SHA
2. `zap_steed` SPE_SLOW / WAN_SLOW via `bhitm` (C `:3124–3133`; Open already)
3. `zap_updown` shared `bhitpile`/`zap_map` tail for non-probing IMMEDIATE
4. `expels` land-hard / `spoteffects` (D-1424 debt)
5. `mon_adjust_speed` `oc_oprop==FAST` vs SPEED_BOOTS otyp (D-0871)

Do not Must-fix “bhitm SPE_SLOW is a stub” (D-1424 live). Do not Must-fix “LOCK should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `docast` → `spelleffects`. Directed new RNG is existing `rn1(8,6)` plus `resist` `rn2`. Self-dir may burn `u_slow_down` `rn2(2)` already in D-1433. Public fortress does not cast this.

Verdict: **ACCEPT-WITH-DEBT**
