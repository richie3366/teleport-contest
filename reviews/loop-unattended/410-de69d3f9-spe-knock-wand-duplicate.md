# Review 410 — de69d3f9 — spell.c SPE_KNOCK IMMEDIATE wand-duplicate (D-1450)

## Metadata
- Full / short hash: `de69d3f9f7450ed1d61489bf48992cf5c86ff272` / `de69d3f9`
- Parent: `7b112b40` (review D-1441–D-1449, audit #1820). This file audits **this SHA only** (first of nine `js/` commits since review **409**). Archive **Addressed:** D-1450 `de69d3f9` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 06:09:27 +0200
- D-id: **D-1450**
- Stats: 11 files, +241 / −147 — `js/spell.js` +21 / −4; `js/zap.js` comments only (+12 / −2). Journal rotate accounts for most of the docs churn.
- Claims to close: Open `zap.c` `weffects` SPE_KNOCK IMMEDIATE wand-duplicate (named from D-1427 / review **409**). Not SLOW. `reviews/loop-2026-08-15/` has no unpaid knock-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callees `zap.js` `weffects` / `bhit` / `bhitm` / `zapyourself`. `c-js-map/turns.md`. Remaining IMMEDIATE still named at this SHA.
- Prior reviews this SHA claims to close: **409** named remaining IMMEDIATE (KNOCK first); **400** named IMMEDIATE after SLEEP; audit #1820 Next was this Open row.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_KNOCK IMMEDIATE wand-duplicate so casting knock calls weffects bhit instead of printing Nothing happens.”

C `spell.c` `:1464` is in the `:1457–1514` wand-duplicate fallthrough (after FORCE_BOLT/SLEEP/MAGIC_MISSILE, before SLOW/LOCK/DIG). `objects.h:1316–1318` `SPELL("knock", … IMMEDIATE … SPE_KNOCK)`. `oc_dir == IMMEDIATE` so `:1479` takes getdir / atme / self vs `weffects`. Self: `zapyourself` `:2929–2946` already live (D-0981). Directed: `weffects` `:3440–3451`:

```
    } else if (objects[otyp].oc_dir == IMMEDIATE) {
        zapsetup();
        if (u.uswallow) {
            (void) bhitm(u.ustuck, obj);
        } else if (u.dz) {
            disclose = zap_updown(obj);
        } else {
            (void) bhit(u.dx, u.dy, rn1(8, 6), ZAPPED_WAND, bhitm, bhito,
                        &obj);
        }
        zapwrapup();
```

Fake book is SPBOOK so `learnwand` `:133` skips `makeknown`. `physical_damage` is FORCE_BOLT-only (`:1458–1459`).

Old JS: SPE_KNOCK fell through “Nothing happens.” after D-1449. `weffects` IMMEDIATE `bhit(rn1(8,6))` already live (D-1388 FORCE_BOLT). `bhitm` / `zapyourself` SPE_KNOCK already live (D-0981).

The diff **does** add `const SPE_KNOCK` and `else if (otyp === SPE_KNOCK)` → `wand_duplicate_weffects(pseudo, atme, false)`. It **does not** change `weffects` / `bhit` / `bhitm` / `zapyourself` bodies (`zap.js` comments only). It **does not** dispatch SLOW/LOCK/TURN/POLY. Named. It **does not** add `bhit` `doorlock`, `zap_updown` OPENING, `bhito` boxlock, or `zap_steed` bhitm-routed OPENING. Named on the D-log.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_KNOCK arm | C `:1464–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing wrapper** | |
| `weffects` IMMEDIATE | C `:3440–3451`, **pre-existing live** (D-1388) | `rn1(8,6)` then `bhit` |
| `bhit` ZAPPED_WAND | C `:3869+`, **imported live** | monster → `bhitm`; doorlock empty |
| `bhitm` SPE_KNOCK | C `:382–432`, **imported live** (D-0981) | mhurtle `rnd(2)` / doesn't budge |
| `zapyourself` SPE_KNOCK | C `:2929–2946`, **imported live** (D-0981) | hold / Punished / traps / `boxlock_invent` |
| `bhito` boxlock / uchain | C `:2184–2186` / `:2393–2403`, **named omit** | JS `uball\|\|uchain` return 0 |
| `bhit` `doorlock` | C `:4056–4074`, **named omit** | JS empty; Open queue already |
| `zap_updown` OPENING | C `:3263–3288`, **named omit at this SHA** | probing-only switch |
| `zap_steed` OPENING | C `:3130–3133`, **named omit** | probing-only switch |
| remaining IMMEDIATE cast | C same fallthrough, **named omit** | still “Nothing happens.” |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** directed knock uses existing `rn1(8,6)` (weffects) plus `bhitm` `rnd(2)` on small non-steadfast. Self-dir: trap/boxlock RNG already in D-0981. Public fortress does not `#cast` knock.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514` for IMMEDIATE: atme zeros dirs; cancelled getdir reuses leftover `u.dx/dy/dz` and prints “The magical energy is released!”; self → `zapyourself` then `losehp` only if damage (knock returns 0); else `weffects`; `update_inventory()`. `physical_damage` false. Knock never Maybe_Half_Phys. Match.

`oc_dir` IMMEDIATE. SPE_KNOCK is IMMEDIATE. JS `weffects` still does steed-down then IMMEDIATE then NODIR then RAY, same order as C `:3437–3468`. Directed horizontal: `zapsetup` / `bhit(rn1(8,6), bhitm, bhito)` / `zapwrapup`. Disclose stays false on that arm (C only sets disclose from `zap_steed` / `zap_updown` / RAY). SPBOOK skip makeknown. Match D-1388 keep-path; this SHA only **reaches** it from `#cast` knock.

Self-dir `:2929–2946`: `ustuck` `release_hold`; Punished `unpunish`; invent hit iff `!utrap || !openholdingtrap`; then `boxlock_invent` + `openfallingtrap`. JS uses `uball` for Punished (same as D-0981). **Callee is not a stub.**

Directed `bhitm` `:382–432`: disguised box_or_door mimic; `wake = FALSE`; ustuck `release_hold`; else `openholdingtrap` / `openfallingtrap`; else SPE_KNOCK: `wake = TRUE`, `ret = 1`, `msize < MZ_HUMAN && !m_is_steadfast` → “knocked back” + `mhurtle(..., rnd(2))` else “doesn't budge”; then `!DEADMONSTER` `wakeup` + `abuse_dog`. Wand OPENING takes the saddle `mdrop_obj` arm instead. JS keep-path live (D-0981): mhurtle / budge / saddle extract. `that_is_a_mimic(MIM_REVEAL)` vs unguarded `seemimic` is pre-existing D-0981 debt (C comments `/*seemimic()*/` but still gates `box_or_door`). `ret = 1` is unused: C `weffects`/`bhit` discard `bhitm`'s return; JS always `return 0`. Not a Must-fix for this dispatch.

`bhit` door cell `:4056–4074`: C `IS_DOOR || SDOOR` then `doorlock` for WAN_OPENING/SPE_KNOCK/LOCKING/STRIKING/FORCE. JS at this SHA: `IS_DOOR || typ === STONE` with an **empty** body (`// doorlock deferred`). Beam still stops on `!ZAP_POS || closed_door`. Knock at a **door** therefore does not open it. That is the already-queued Open `bhit` `doorlock` family, not a stub of `weffects`/`bhitm`. Do not Must-fix “dispatch is a stub” because the door arm is empty.

`zap_updown` at this SHA is probing-only; down/up knock falls off `default` and returns false. C `:3263–3288` opens portcullis / quest ripple / holding+falling traps. Named; later window SHA D-1454. `zap_steed` OPENING would `bhitm` the mount (C `:3130–3133`); JS probing-only, returns false so weffects falls through to `zap_updown`. Named.

`bhito` C `:2184–2186` unpunishes `uchain` on WAN_OPENING/SPE_KNOCK; C `:2393–2403` `boxlock` on boxes. JS `uball || uchain` returns 0; no boxlock case. Named (Open `bhito` boxlock).

Hallucination check: “Match C SPE_KNOCK wand-duplicate weffects bhit” while **`weffects` IMMEDIATE + `bhit` + `bhitm`/`zapyourself` SPE_KNOCK are live** is **not** a dispatch-stub lie. The new arm is eight lines that call a live wrapper. “Match C `doorlock` / `zap_updown` OPENING / `bhito` boxlock” **would** be. “Match C SPE_SLOW_MONSTER cast” **would** be at this SHA.

## Hallucinations / overclaim

Subject says casting knock calls weffects bhit instead of Nothing happens. **True:** `#cast` getdir → self `zapyourself` or `weffects` → `bhit(rn1(8,6), bhitm, bhito)`; SLEEP/DIG/MAGIC_MISSILE/FINGER/LIGHT/DRAIN stay wired; SLOW/LOCK still Nothing happens. **False until named** for doorlock, up/down OPENING, steed OPENING, bhito boxlock/uchain, remaining IMMEDIATE. Stamping **Addressed:** D-1450 for the **cast dispatch** is fair. Do **not** stamp “Match C `doorlock`.” Do **not** treat fortress PASS as a knock cast.

## Density

One otyp of the C wand-duplicate IMMEDIATE group, same size as D-1448/D-1449 RAY. ~16 lines of JS plus comments. Playbook §2b right size. Did not glue SLOW/LOCK. Acceptable.

## Branch-by-branch confirm

1. Directed SPE_KNOCK at a monster: `weffects` IMMEDIATE `rn1(8,6)` `bhit` → `bhitm`. Match `:3440–3451` + `:382–432` keep-path.
2. Small non-steadfast: “knocked back” + `mhurtle` `rnd(2)`. Match `:401–408`.
3. Human-or-larger / steadfast: “doesn't budge.” Match `:409–411`.
4. Self-dir: `release_hold` / Punished / traps / `boxlock_invent`. Match `:2929–2946`.
5. Cancelled getdir: reuse dir. Match `:1488–1498`.
6. Swallow: `bhitm(ustuck)`. Match `:3442–3443`.
7. Door cell: C `doorlock`; JS empty. Named.
8. Up/down: C `zap_updown` OPENING; JS probing default. Named at this SHA.
9. SLOW/LOCK still Nothing happens. Named.
10. `physical_damage` false. Match.
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `zap.js` hunks are comments.

## Verification

Journal: private canary **19**/19 (C/JS grep; IMMEDIATE SPBOOK vs WAN_OPENING; atme not Nothing happens; directed human doesn't budge + kobold knocked back; SPBOOK skip makeknown; SLOW/LOCK still Nothing happens; SLEEP/DIG/MAGIC_MISSILE/FINGER/LIGHT/DRAIN still wired; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `01edf8b9` after all nine SHAs. Fortress PASS is not a knock cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `weffects`/`bhit`/`bhitm`/`zapyourself`. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. remaining wand-duplicate IMMEDIATE (SLOW / LOCK / TURN / POLY / …) — first Open at this SHA
2. `bhit` `doorlock` WAN_OPENING/SPE_KNOCK (C `:4056–4074`; JS empty; Open already)
3. `zap_updown` WAN_OPENING/SPE_KNOCK (later D-1454 in this window)
4. `zap_steed` WAN_OPENING/SPE_KNOCK via `bhitm` (Open already)
5. `bhito` boxlock / uchain unpunish (Open already)
6. `bhitm` `that_is_a_mimic` + `box_or_door` gate (D-0981 debt)

Do not Must-fix “weffects IMMEDIATE is a stub” (D-1388 live). Do not Must-fix “SLOW should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `docast` → `spelleffects`. Directed new RNG is existing `rn1(8,6)` plus `bhitm` `rnd(2)` on the hurtle arm. Public fortress does not cast this.

`learnwand` skips SPBOOK (`zap.c:133` / JS `learnwand` early return). Directed IMMEDIATE does not set weffects `disclose`, so type-id is from `bhitm` `learn_it` (hold/saddle) only — same as C.

Verdict: **ACCEPT-WITH-DEBT**
