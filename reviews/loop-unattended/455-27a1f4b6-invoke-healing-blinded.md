# Review 455 — 27a1f4b6 — artifact.c invoke_healing Blinded 0/1 (D-1494)

## Metadata
- Full / short hash: `27a1f4b635bd2b75cff4d9c943149759723880e5` / `27a1f4b6`
- Parent: `b09eae48` (audit #1880, reviews **446–454**). This file audits **this SHA only** (first of ten `js/` commits since review **454**). Archive **Addressed:** D-1494 `27a1f4b6` already has the short hash (filled in this port commit).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 19:20:39 +0200
- D-id: **D-1494**
- Stats: 10 files, +87 / −31 — `js/artifact.js` +8 / −5. Must-fix peel; docs + review **449** stamp.
- Claims to close: Must-fix review **449** item 1 (`invoke_healing` first `You_feel("better.")` gate). Not ENERGY. Not UNTRAP. `reviews/loop-2026-08-15/` has no unpaid Blinded Must-fix.
- JS / map: `artifact.js` `Blinded` + `invoke_healing`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **449** QUALITY-RISK item 1 (HBlinded word vs `youprop.h:92` 0/1).

## Intent vs deliverable

Git subject promises: the first `You_feel("better.")` gate uses C `Blinded` as 0/1 versus `ucreamed` instead of the full `HBlinded` word.

Pinned C `artifact.c` `invoke_healing` `:1779–1815`. First gate `:1787` is `healamt || Sick || Slimed || Blinded > creamed`. Macro `youprop.h:92` `#define Blinded (HBlinded && !BBlinded)`. C `&&` on scalars yields **1 or 0**, not the timeout word. `creamed` is `(long) u.ucreamed`. Second gate `:1789` is `BlindedTimeout > creamed` (`youprop.h:93` `HBlinded & TIMEOUT`). Caller `arti_invoke` `case HEALING` `:2154–2172` already paid `arti_invoke_cost` in D-1488.

Old JS (D-1488): local `Blinded_bits()` returned `BBlinded ? 0 : HBlinded`. `50 > 10` was true when C’s `1 > 10` is false, so the first `You_feel("better.")` extra-fired whenever the hero was timeout-blind with `ucreamed >= 1` and no missing HP / Sick / Slimed.

The diff **does** rename that helper to `Blinded()`, return `((HBlinded && !BBlinded) ? 1 : 0)`, and use it only at `:1787`. It **does not** change `BlindedTimeout()`, `make_blinded(creamed,false)`, HP half, `make_sick`/`make_slimed`, or `nothing_special`. It **does not** port UNTRAP. Named follow-up (D-1495). ENERGY unchanged.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Blinded()` | C `youprop.h:92`, **clone this SHA** | 0/1; was `Blinded_bits` word |
| `BlindedTimeout()` | C `:93`, **clone already** | `HBlinded & TIMEOUT` |
| `invoke_healing` | C `:1779–1815`, **wired** (gate only this SHA) | rest D-1488 |
| `You_feel` | C, **LIVE** `display.js` async | |
| `nothing_special` | C `:1761–1766`, **CLONE** matching C | carried only |
| `make_sick` / `make_slimed` | C `potion.c`, **LIVE** | |
| `make_blinded` | C `do.c`, **LIVE** `do.js` | 4 other local clones exist; this arm imports |
| `Upolyd` | C `you.h:554`, **LIVE import** | JS `const.js` still `mtimedone` (named) |
| `arti_invoke` HEALING | C `:2154`, **already live** | not this diff |
| `untrap` | C, **still stub at this SHA** | not this commit |

`node scripts/sym.mjs` on every symbol this diff deletes or re-points (`Blinded_bits` → `Blinded`; first-gate callee names):

```
Blinded          NOT EXPORTED — but 2 LOCAL CLONE(S) in 2 file(s):
               js/artifact.js:896  js/teleport.js:1667
             => Do NOT write clone #3.
Blinded_bits     NOT FOUND in js/** (no export, no local function/const).
BlindedTimeout   NOT EXPORTED — but 11 LOCAL CLONE(S) in 11 file(s):
               js/artifact.js:902  …  (11 files)
invoke_healing   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/artifact.js:1075
You_feel         js/display.js:4072   ASYNC — await required
make_sick        js/potion.js:978   ASYNC — await required
make_slimed      js/potion.js:937   ASYNC — await required
make_blinded     js/do.js:2347   ASYNC — await required
             !! ALSO 4 LOCAL CLONE(S) … IMPORT the export
nothing_special  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/artifact.js:1056
Upolyd           js/const.js:2959   sync
Blind            NOT EXPORTED — but 27 LOCAL CLONE(S)
```

`Blinded_bits` is gone. `teleport.js:1667` is a **boolean** `!!H && !B` clone used as a predicate, not `> creamed`. Do not add clone #3. No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.**

## C ↔ JS fidelity

C macro vs JS helper. `youprop.h:92` is `(HBlinded && !BBlinded)`. For `HBlinded==50`, `BBlinded==0`, C yields **1**. JS `? 1 : 0` yields **1**. For `HBlinded==0`, both yield **0**. For `BBlinded` set, both yield **0**. The first gate is then `1 > creamed` or `0 > creamed`. `ucreamed` is a non-negative count of cream; `1 > 10` is false; `1 > 0` is true. **This SHA matches `:1787`.** Old `Blinded_bits` returning 50 did not.

Second gate. C `:1789` `BlindedTimeout > creamed` then `"%sbetter."` with `"slightly "` when `!healamt && !Sick && !Slimed && (HBlinded & ~TIMEOUT) != 0`. JS unchanged: `BlindedTimeout() > creamed` and `((u.HBlinded | 0) & ~TIMEOUT) !== 0`. **Match `:1789–1796`.** Double `"better."` when `creamed==0` and timeout-blind still matches C’s two separate `if`s (D-1488 / this D-log admit that).

Heal / cure / botl. C `:1801–1814`: add `healamt` to `mh` or `uhp`; `make_sick(0)`; `make_slimed(0)`; `make_blinded(creamed, FALSE)` only if `BlindedTimeout > creamed`; `disp.botl`. JS awaits those three LIVE imports in the same order and sets `disp.botl`/`flags.botl`. **Match.** `else { nothing_special; return ECMD_TIME; }` still sits on the **second** gate, not the first. **Match `:1797–1800`.**

`Upolyd`. C `you.h:554` is `u.umonnum != u.umonster`. JS `const.js:2958–2961` still documents and implements `mtimedone != 0`. That is **pre-existing clone drift**, named in review **449** and in this D-log “Not this iter.” It is not a new contradiction of the Blinded gate. Typical poly (`mtimedone>0` and `umonnum != umonster`) agrees; a form with `umonnum` swapped and `mtimedone==0` would pick the wrong HP pool. Map debt, not this Must-fix.

`HBlinded` source. C reads `u.uprops[BLINDED].intrinsic`. JS reads `u.HBlinded` (flat). Same conferral pattern as D-1488’s `Blinded_bits`. This SHA did not invent a second source. If only `uprops` were written, both old and new helpers would miss; conferral in this port writes the flat.

Callee closure (HEALING arm). LIVE: `You_feel`, `make_sick`, `make_slimed`, `make_blinded`. CLONE matched here: `Blinded` 0/1, `BlindedTimeout`, `nothing_special`. OMIT: none in this arm. STUB: none. **Arm may ship.** UNTRAP is a **different** arm; still stub at this SHA (next commit).

## Hallucinations / overclaim

Subject “Match C … first You_feel better gate … Blinded as 0/1”: **true**. D-log “JS compared the full `HBlinded` word” / “`50 > 10` true when C `1 > 10` is false”: **true** of D-1488. Stamping **Addressed:** D-1494 for **that comparison** is fair. Do **not** stamp “Match C `Upolyd` `umonnum != umonster`.” Do **not** stamp “Match C Master Key `untrap`.” Do **not** treat fortress PASS as a Staff of Aesculapius `#invoke`. Public sessions never wield that artifact.

This is **not** “dispatch ported, callee stubbed.” The live HEALING arm’s callees are LIVE or verified clones. Review **449**’s UNTRAP stub is **not** this SHA.

## Density

Must-fix one item, alone. +8 / −5 in `js/artifact.js`. Playbook §2b: Must-fix stays one item; below ~40 insertions is allowed when C is that small. The C change is one ternary. Did not glue ENERGY or UNTRAP. Acceptable.

## Branch-by-branch confirm

1. Not blinded, missing HP: first and second `You_feel`, half HP. `Blinded()==0`, `0 > creamed` false; `healamt` still fires both. **Match `:1787–1806`.**
2. Timeout-blind, `ucreamed==0`, no HP/Sick/Slimed: `Blinded()==1 > 0`, two `"better."`, then `make_blinded(0,false)`. **Match.**
3. Timeout-blind, `ucreamed==10`, no HP/Sick/Slimed: C `1 > 10` false, skip first `You_feel`; second gate `TIMEOUT > 10` still true → one `"%sbetter."` then `make_blinded(10,false)`. JS now the same. **This SHA’s fix. Match `:1787` vs old word compare.**
4. `BBlinded` (Eyes): `Blinded()==0`; first gate only if HP/Sick/Slimed. **Match `!BBlinded`.**
5. Sick or Slimed, no HP, not blind: both messages, then `make_sick`/`make_slimed`. **Match `:1807–1810`.**
6. Full HP, not sick/slimed, not blind: both gates false → `nothing_special`, no heal. **Match `:1797–1800`.**
7. `HBlinded & ~TIMEOUT` (PermaBlind / FROMFORM) with timeout still set, cream 0: `"slightly better."` on the second line. **Match `:1791–1796`.**
8. `Upolyd` mh pool: JS `mtimedone`; C `umonnum != umonster`. **Named; not this gate.**
9. **Public-unhit** for Staff `#invoke`. Cohort is shared-startup, not this recipe.

## Callers / RNG ledger

C caller: `arti_invoke` → `invoke_healing`. JS `case HEALING`. No new `rn2`/`rnd`. Cost `rnz(100)` already D-1488. Public fortress does not `#invoke` the Staff.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE/DIAG. The `1 : 0` is C `&&`, not a seed screen. Local `Blinded` is a youprop clone, not a glyph stand-in.

## Verification

D-log: private canary **10**/10 (C grep; JS 0/1 not bits; HP 50→75; creamed==0 two `better.`; ucreamed=10 one `better.` + timeout 10; healamt still first; BBlinded skip first; nothing_special; Rule #2). That canary **does** hit the creamed-blind case review **449** named. Green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** Relevant cohort is “did not break shared startup,” not Staff invoke.

## Actionable C-wrongs

None that belong on Must-fix. The cited `:1787` comparison now matches C. Remaining named (map / Open, not this peel): `Upolyd` `umonnum != umonster` vs `mtimedone`; UNTRAP stub (next SHA D-1495); TAMING/CHARGE/PORTAL/BANISH (later D-1502); `teleport.js` boolean `Blinded` clone (do not write #3; not compared to `ucreamed`).

Do not Must-fix “`BlindedTimeout` should have become 0/1” (C `:93` is the **word** masked with TIMEOUT). Do not Must-fix “Eyes `BBlinded` should skip `make_blinded`” (C still uses Timeout vs cream). Do not Must-fix “two `better.` when cream==0 is a JS bug” (C has two `if`s).

Verdict: **ACCEPT**
