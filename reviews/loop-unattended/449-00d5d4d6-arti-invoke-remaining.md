# Review 449 — 00d5d4d6 — artifact.c arti_invoke remaining inv_prop (D-1488)

## Metadata
- Full / short hash: `00d5d4d6df3ee176f980382ffe64932c5f0f3c14` / `00d5d4d6`
- Parent: `8d41bd04` (D-1487). This file audits **this SHA only** (fourth of nine `js/` commits since review **445**). Archive **Addressed:** D-1488 `00d5d4d6` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 17:34:52 +0200
- D-id: **D-1488**
- Stats: 10 files, +579 / −151 — `js/artifact.js` +390. Journal rotate in this SHA.
- Claims to close: Open `artifact.c` `doinvoke` remaining `inv_prop` (named from D-1377 / review **337**). Not BLINDING_RAY. `reviews/loop-2026-08-15/` has no unpaid invoke Must-fix.
- JS / map: `artifact.js` `arti_invoke` + helpers. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **337** named remaining specials + INVIS/LEVITATION/CONFLICT toggle after Sunsword.

## Intent vs deliverable

Git subject promises: remaining specials and property-toggle artifacts “heal, boost energy, fling venom, storm, or xor W_ARTI instead of printing nothing_happens.”

Pinned C `arti_invoke` `:2149–2228`: if `inv_prop > LAST_PROP`, **always** `arti_invoke_cost` then the full switch (`TAMING`…`BLINDING_RAY`); else xor `W_ARTI` and CONFLICT/LEVITATION/INVIS. Helpers `:1779–2051`. Cost already D-1377.

Old JS: only `BLINDING_RAY` paid cost; every other special and every property art printed `nothing_happens` with no `rnz`.

The diff **does** cost-then-switch for HEALING / ENERGY_BOOST / UNTRAP / LEV_TELE / ENLIGHTENING / CREATE_AMMO / FLING_POISON / FIRESTORM / SNOWSTORM / BLINDING_RAY, and the property xor arm. It **does not** port TAMING / CHARGE_OBJ / CREATE_PORTAL / BANISH (still `nothing_happens` **without** cost — C would charge then invoke). Named. It **does** call `untrap(true,…)` for UNTRAP. That callee is **not** a working C `untrap`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `arti_invoke` switch | C `:2154–2172`, **partial this SHA** | live list vs C full switch |
| `arti_invoke_cost` | C `:2106–2127`, **already live** | |
| `invoke_healing` | C `:1779–1815`, **wired** | first `Blinded` gate **diverges** |
| `invoke_energy_boost` | C `:1818–1835`, **wired** | |
| `invoke_untrap` | C `:1838–1845`, **dispatch** | callee stub |
| `untrap` | C `trap.c`, **stub** (`void force`; door/floor return 0) | **not live** |
| `level_tele` / `enlightenment` | C, **imported live** | |
| `invoke_create_ammo` | C `:1934–1960`, **wired** | `mksobj`/`rnd`/`hold_another_object` live |
| `aobjnam` | C `objnam.c` `:2242–2258`, **clone matching C** | quan + `cxname` + `otense` |
| `invoke_fling_poison` | C `:2022–2037`, **wired** | `getdir`/`rn2(2)`/`throwit` live |
| `invoke_storm_spell` | C `:2040–2051`, **wired** | temp `P_EXPERT` + `spelleffects` live |
| `arti_invoke_property` | C `:2178–2228`, **wired** | xor `W_ARTI` + flats |
| `float_up` / `float_down` / `spoteffects` | C, **imported live** | |
| `nothing_special` | C `:1761–1766`, **wired** | carried only |
| TAMING / CHARGE_OBJ / CREATE_PORTAL / BANISH | C `:2155–2167`, **named omit** | no cost |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** ENERGY none; CREATE_AMMO `rnd(10)`/`rnd(5)`; FLING `rn2(2)`; property off `rnz(100)` / tired `d(3,10)`; storm uses `spelleffects` dice; cost `rnz(100)` when not tired. UNTRAP never keeps that cost (always refund). Public fortress does not `#invoke` these artifacts.

## C ↔ JS fidelity

Enums: `TAMING = LAST_PROP+1` … `BLINDING_RAY = LAST_PROP+14` with `LAST_PROP=68`. Match `artifact.h`. Extracted `inv_prop` already D-1377.

**HEALING.** C `:1787` `Blinded > creamed` uses `#define Blinded (HBlinded && !BBlinded)` — a **0/1** value (`youprop.h:92`). `1 > creamed` is true only when `ucreamed==0`. JS `Blinded_bits()` returns the **full** `HBlinded` word (or 0 if blocked). `50 > 10` is true when C’s `1 > 10` is false. First `You_feel("better.")` therefore extra-fires whenever `ucreamed>=1` and the hero is blinded. Second gate `BlindedTimeout > creamed` matches C `:1789`. Double `"better."` when `creamed==0` matches C’s two `if`s (D-log admits that). HP half, `make_sick(0)`, `make_slimed(0)`, `make_blinded(creamed,false)`, `botl`: order matches **after** the messages. `Upolyd` uses `const.js` `mtimedone` (C `you.h` is `umonnum != umonster`); pre-existing, not this SHA’s recipe.

**ENERGY.** Half missing Pw, cap 120, else if `<12` fill to max; `re-energized` vs `nothing_special`. Match `:1820–1833`. No dice.

**UNTRAP. Hallucination:** D-log says callee `untrap` is already live. **False.** `trap.js` `untrap` `void force`, door disarm returns 0, seen floor trap returns 0. `invoke_untrap` is therefore “cost, then always fail”: `age=0`, `ECMD_CANCEL`. C `:1840–1844` refunds only when `untrap` returns false (cancel / no trap). A seen trap C would disarm stays refunded in JS. **Dispatch to a stub.** Subject did not list untrap; the D-log and switch still ship it as live.

**LEV_TELE / ENLIGHTENING.** `level_tele()` / `enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS)`. Callees are not stubs. Match `:2160–2164`.

**CREATE_AMMO.** `mksobj(ARROW,true,false)`; BUC copy; blessed `quan+=rnd(10)`; cursed `spe=0`; else `quan+=rnd(5)`; `weight`; `hold_another_object("Suddenly %s out.", aobjnam(...,"fall"))`. Clone `aobjnam` matches `:2242–2258`. Match `:1934–1959`.

**FLING_POISON.** `getdir` else `Never_mind` + `age=moves` + cancel; `rn2(2)` venom; `mksobj`; `spe=1`; `throwit`. **Callee `throwit` is live.** Match `:2022–2036`. Cost uses `SPELL_LEV_PW(5)` for FLING (already in cost_pw D-1377).

**STORM.** `SNOWSTORM`→`SPE_CONE_OF_COLD` else fireball; `P_SKILL=P_EXPERT`; `spelleffects(storm,false,true)`; restore. **Callee live.** Match `:2040–2050`.

**Property.** xor `W_ARTI` on `uprops[].extrinsic` plus JS `EInvis`/`ELevitation`/`EConflict` flats (gates read flats). Tired only when turning **on**; off sets `age=moves+rnz(100)`. Other-source `(eprop & ~W_ARTI) || iprop` → `nothing_special`. CONFLICT messages; LEV `float_up`+`spoteffects` / `float_down(I_SPECIAL|TIMEOUT, W_ARTI)`; INVIS `BInvis||Blind` then `newsym` + transparency. Local `Blind()` is C `((H||E)&&!B)`. Match `:2178–2227` for those three props.

Named specials skip cost: C would `rnz(100)` then taming/charge/portal/banish. Named, not this SHA’s live list lie except UNTRAP which **is** on the live list.

## Hallucinations / overclaim

Subject heal / energy / fling / storm / xor `W_ARTI`: **true** for those arms (HEALING message gate aside). D-log “callees already live: `untrap`” is **false**. Stamping **Addressed:** D-1488 for the **switch envelope** overclaims UNTRAP. Do **not** stamp “Match C Master Key untrap.” Do **not** treat fortress PASS as `#invoke` Staff/Mitre/Key. TAMING/CHARGE/PORTAL/BANISH named without cost is honest.

## Density

One C switch plus its helpers, four specials left named. ~390 JS lines. Playbook §2b “whole practical switch” is the right envelope. The miss is stub-dispatch and the Blinded 0/1 gate, not width.

## Branch-by-branch confirm

1. Staff HEALING, not creamed, missing HP: one or two `better.`, half HP. **Match if `ucreamed==0`.**
2. Staff HEALING, `ucreamed>=1`, timeout blind: C skips first `You_feel`; JS prints it. **Contradicts `:1787`.**
3. Mitre ENERGY empty/full. **Match `:1826–1832`.**
4. Master Key UNTRAP, direction at a seen trap: C disarm `ECMD_TIME`. JS always refund cancel. **Contradicts `:1840–1844`.**
5. Master Key getdir cancel: both refund. **Match.**
6. Orb LEV_TELE: `level_tele`. **Match.**
7. Eyes ENLIGHTENING: MAGIC. **Match.**
8. Longbow CREATE_AMMO blessed `rnd(10)`. **Match.**
9. Grimtooth FLING `rn2` + `throwit`. **Match.**
10. Fire/Frost Brand storm `P_EXPERT` `spelleffects`. **Match.**
11. Sunsword BLINDING_RAY unchanged (D-1377).
12. Orb/Ahriman/Sceptre xor on/off/tired. **Match `:2183–2194`.**
13. TAMING/CHARGE/PORTAL/BANISH: still no cost. Named.
14. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed gates. Plain ESM. Local `Your`/`aobjnam`/`Hallucination` are C-shaped, not trace tables.

## Verification

Journal: private canary **18**/18 (enum; HEALING 50→75; ENERGY 0→20 / full surge; CHARGE_OBJ/BANISH still named no `rnz`; CONFLICT on/off/tired; INVIS on; FLING cancel refund; CREATE_AMMO quan; Sunsword cancel; Rule #2). That canary **does not** claim a successful Key untrap or creamed-blind Staff. Green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

1. `artifact.c` `invoke_healing` first `You_feel("better.")` gate must use C `Blinded` as 0/1 (`HBlinded && !BBlinded`, `youprop.h:92`) compared to `ucreamed`, not the full `HBlinded` word (`artifact.c :1787`). Keep the second `BlindedTimeout` gate. Not ENERGY. Not UNTRAP.

**Addressed:** D-1494 `27a1f4b6`

2. `artifact.c` `invoke_untrap` is on the live cost+switch list while `trap.c` `untrap` always returns 0 (force ignored; door/floor disarm deferred). Either port the C `untrap(TRUE,0,0,NULL)` success path (`:1838–1845`) or keep UNTRAP named (no cost) until that callee can return true. Do not stamp “Match C Master Key.”

**Addressed:** D-1495

Named omits (map / Open, not Must-fix):

1. TAMING `seffects(SCR_TAMING)`
2. CHARGE_OBJ `recharge`+getobj
3. CREATE_PORTAL dungeon menu + `goto_level`
4. BANISH `migrate_mon`

Do not Must-fix “storm `spelleffects` is a stub” (it is live). Do not Must-fix “xor `W_ARTI` should have waited.” Do not Must-fix “TAMING should have shipped in this SHA.”

## Callers / RNG ledger

C caller: `doinvoke` → `arti_invoke`. JS same. New dice as above; UNTRAP refunds `rnz` cost. Public fortress does not hit these arts.

Verdict: **QUALITY-RISK**

**Addressed:** D-1494 `27a1f4b6`

**Addressed:** D-1495
