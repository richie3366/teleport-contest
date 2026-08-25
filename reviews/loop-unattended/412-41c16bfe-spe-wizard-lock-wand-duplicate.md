# Review 412 — 41c16bfe — spell.c SPE_WIZARD_LOCK IMMEDIATE wand-duplicate (D-1452)

## Metadata
- Full / short hash: `41c16bfe09d70e39e42d977b9ebae2ae7e708f42` / `41c16bfe`
- Parent: `5c8b73c5` (D-1451). This file audits **this SHA only** (third of nine `js/` commits since review **409**). Archive **Addressed:** D-1452 `41c16bfe` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 06:24:39 +0200
- D-id: **D-1452**
- Stats: 10 files, +123 / −35 — `js/spell.js` +20 / −5; `js/zap.js` comments only (+15 / −4).
- Claims to close: Open `zap.c` `weffects` SPE_WIZARD_LOCK IMMEDIATE wand-duplicate (named from D-1451 / review **411**). Not TURN / POLY. `reviews/loop-2026-08-15/` has no unpaid wizard-lock-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callees `zap.js` `weffects` / `bhit` / `bhitm` / `zapyourself`. `c-js-map/turns.md`. TURN / remaining IMMEDIATE still named at this SHA.
- Prior reviews this SHA claims to close: **411** named LOCK as remaining IMMEDIATE; **385** (D-1425) shipped `bhitm` SPE_WIZARD_LOCK; **394** (D-1434) shipped `zapyourself` SPE_WIZARD_LOCK.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_WIZARD_LOCK IMMEDIATE wand-duplicate so casting wizard lock calls weffects bhit instead of printing Nothing happens.”

C `spell.c` `:1466` is in the `:1457–1514` fallthrough. `objects.h:1334–1336` `SPELL("wizard lock", … IMMEDIATE … SPE_WIZARD_LOCK)`. `oc_dir == IMMEDIATE` so getdir / atme / self vs `weffects`. Self: `zapyourself` `:2948–2954` already live (D-1434). Directed: `weffects` `:3440–3451` IMMEDIATE `bhit(rn1(8,6), bhitm, bhito)`. Fake book is SPBOOK so `learnwand` skips `makeknown`. `physical_damage` is FORCE_BOLT-only.

Old JS: SPE_WIZARD_LOCK fell through “Nothing happens.” after D-1451. `weffects` IMMEDIATE already live (D-1388). `bhitm` WAN/SPE_LOCK already live (D-1425). `zapyourself` WAN/SPE_LOCK already live (D-1434).

The diff **does** add `const SPE_WIZARD_LOCK` and `else if (otyp === SPE_WIZARD_LOCK)` → `wand_duplicate_weffects(pseudo, atme, false)`. It **does not** change `weffects` / `bhit` / `bhitm` / `zapyourself` bodies (`zap.js` comments only). It **does not** dispatch TURN/POLY/CANCEL/STONE. Named. It **does not** add `bhit` `doorlock`, `zap_updown` WAN_LOCKING `close_drawbridge`, or `bhito` boxlock. Named. C `zap_steed` does **not** route locking through `bhitm` (review **385**); JS comment matches.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_WIZARD_LOCK arm | C `:1466–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing wrapper** | |
| `weffects` IMMEDIATE | C `:3440–3451`, **pre-existing live** (D-1388) | `rn1(8,6)` then `bhit` |
| `bhitm` SPE_WIZARD_LOCK | C `:370–375`, **imported live** (D-1425) | `closeholdingtrap` |
| `closeholdingtrap` | C `trap.c:6210–6247`, **imported live** (D-1425) | BEAR_TRAP/WEB |
| `zapyourself` SPE_WIZARD_LOCK | C `:2948–2954`, **imported live** (D-1434) | trap then `boxlock_invent` |
| `boxlock_invent` / `boxlock` | C `zap.c:2687` / `lock.c`, **imported live** | self-dir invent |
| `bhito` boxlock | C `:2395–2403`, **named omit** | JS default `res = 0` |
| `bhit` `doorlock` | C `:4056–4074`, **named omit** | JS empty |
| `zap_updown` LOCKING | C `:3295–3306` `close_drawbridge`, **named omit** | probing-only at this SHA |
| remaining IMMEDIATE cast | C same fallthrough, **named omit** | TURN still “Nothing happens.” |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** directed lock uses existing `rn1(8,6)` plus `closeholdingtrap` / `mintrap` already in D-1425. Self-dir: `boxlock` / trap RNG already in D-1434. Public fortress does not `#cast` wizard lock.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514` for IMMEDIATE. `physical_damage` false. Wizard lock never Maybe_Half_Phys. Match.

`oc_dir` IMMEDIATE. Directed horizontal: `zapsetup` / `bhit(rn1(8,6), bhitm, bhito)` / `zapwrapup`. Disclose stays false. SPBOOK skip makeknown. Match D-1388 keep-path; this SHA only **reaches** it from `#cast` wizard lock.

Self-dir `:2948–2954`: `if (u.utrap || !closeholdingtrap(&youmonst, &learn_it)) boxlock_invent(obj)`. `||` short-circuits: already-trapped skips the trap callee. JS snapshots `alreadyTrapped` then boxlock vs `closeholdingtrap`+invent-iff-`!happened` (D-1434). **Callee is not a stub.** Review **394** already walked Klunk / already-locked / empty invent / BEAR_TRAP snap skips chest.

Directed `bhitm` `:370–375`: disguised `box_or_door` mimic then `wake = closeholdingtrap(mtmp, &learn_it)`. JS keep-path live (D-1425): `box_or_door` clone + `seemimic` + `wake = happened`. `that_is_a_mimic` Wait-pline named. **Callee is not a stub.** Review **385** already walked WEB/BEAR snap / already-trapped silent / non-box mimic.

`bhito` C `:2395–2403` `boxlock` on `Is_box`. JS default `res = 0` — floor chest is **not** locked by a directed wizard-lock beam. Named (Open `bhito` boxlock). Same gap as knock.

`bhit` door cell: C `doorlock` for SPE_WIZARD_LOCK. JS empty. Named. Knocking/locking a **door** from `#cast` still does not lock it.

`zap_updown` `:3295–3306`: non-striking LOCKING `close_drawbridge` when down at DRAWBRIDGE_DOWN or at an open portcullis. JS probing-only at this SHA. Named (Open `zap_updown` WAN_LOCKING). Later D-1456 ports STRIKING destroy, not this close arm.

Hallucination check: “Match C SPE_WIZARD_LOCK wand-duplicate weffects bhit” while **`weffects` IMMEDIATE + `bhitm`/`zapyourself` LOCK are live** is **not** a dispatch-stub lie. The new arm is nine lines that call a live wrapper. “Match C `doorlock` / `close_drawbridge` / `bhito` boxlock” **would** be. “Match C SPE_TURN_UNDEAD cast” **would** be at this SHA.

## Hallucinations / overclaim

Subject says casting wizard lock calls weffects bhit instead of Nothing happens. **True:** `#cast` getdir → self `zapyourself`/`boxlock_invent` or `weffects` → `bhit` → `bhitm` `closeholdingtrap`; KNOCK/SLOW/SLEEP/DIG/MAGIC_MISSILE/FINGER/LIGHT/DRAIN stay wired; TURN still Nothing happens. **False until named** for doorlock, up/down close_drawbridge, floor boxlock, remaining IMMEDIATE. Stamping **Addressed:** D-1452 for the **cast dispatch** is fair. Do **not** stamp “Match C `close_drawbridge`.” Do **not** treat fortress PASS as a wizard-lock cast.

D-log follow-up popped `bhito` SPE_DRAIN next, not TURN. That is queue order, not a claim that TURN shipped here.

## Density

One otyp of the C wand-duplicate IMMEDIATE group, same size as D-1450/D-1451. ~20 lines of JS plus comments. Playbook §2b right size. Did not glue TURN. Acceptable.

## Branch-by-branch confirm

1. Directed SPE_WIZARD_LOCK at a monster: `weffects` IMMEDIATE `rn1(8,6)` `bhit` → `bhitm` `closeholdingtrap`. Match `:3440–3451` + `:370–375`.
2. Monster WEB/BEAR: snap; `wake` from callee. Match D-1425 keep-path.
3. No trap: `wake` false. Match.
4. Self-dir no trap: `boxlock_invent` Klunk. Match `:2951–2953`.
5. Self-dir already `utrap`: boxlock; skip `closeholdingtrap`. Match `||` short-circuit.
6. Cancelled getdir: reuse dir. Match `:1488–1498`.
7. Door cell: C `doorlock`; JS empty. Named.
8. Up/down drawbridge: C `close_drawbridge`; JS probing default. Named.
9. Floor box: C `boxlock`; JS `res = 0`. Named.
10. TURN still Nothing happens. Named.
11. `physical_damage` false. Match.
12. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `zap.js` hunks are comments.

## Verification

Journal: private canary **20**/20 (C/JS grep; IMMEDIATE SPBOOK vs WAN_LOCKING; atme not Nothing happens; unlocked chest Klunk + olocked; directed kobold TIME; SPBOOK skip makeknown; TURN/POLY still Nothing happens; KNOCK/SLOW/SLEEP/DIG/MAGIC_MISSILE/FINGER/LIGHT/DRAIN still wired; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `01edf8b9`. Fortress PASS is not a wizard-lock cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `weffects`/`bhitm`/`zapyourself`. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. remaining wand-duplicate IMMEDIATE (TURN / POLY / CANCEL / STONE / TELE)
2. `bhit` `doorlock` WAN_LOCKING/SPE_WIZARD_LOCK (C `:4056–4074`)
3. `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK `close_drawbridge` (C `:3295–3306`; Open already)
4. `bhito` boxlock WAN_LOCKING/SPE_WIZARD_LOCK (C `:2395–2403`; Open already)
5. `that_is_a_mimic` MIM_REVEAL pline (D-1425 debt)
6. hero WEB `trapeffect_web` `dotrap` (D-1425 debt)

Do not Must-fix “bhitm LOCK is a stub” (D-1425 live). Do not Must-fix “TURN should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “zap_steed should bhitm locking” (C does not).

## Callers / RNG ledger

C callers: `docast` → `spelleffects`. Directed new RNG is existing `rn1(8,6)` plus trap/`boxlock` already in D-1425/D-1434. Public fortress does not cast this.

Verdict: **ACCEPT-WITH-DEBT**
