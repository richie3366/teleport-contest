# Review 442 — 4642b8b1 — zap.c bhito uchain unpunish WAN_OPENING (D-1481)

## Metadata
- Full / short hash: `4642b8b1df6baa9a134fdfce8aaefb04144013ed` / `4642b8b1`
- Parent: `a65834a1` (D-1480). This file audits **this SHA only** (sixth of nine `js/` commits since review **436**). Archive **Addressed:** D-1481 `4642b8b1` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 15:28:43 +0200
- D-id: **D-1481**
- Stats: 10 files, +100 / −39 — `js/zap.js` +32 / −11.
- Claims to close: Open `zap.c` `bhito` uchain unpunish WAN_OPENING (named from D-1467 / review **428**). Not boxlock. `reviews/loop-2026-08-15/` has no unpaid uchain Must-fix.
- JS / map: `zap.js` `bhito`; callee `read.js` `unpunish` already live (D-0981 zapyourself Punished). `c-js-map/turns.md`. Poly-arm `reset_pick` named.
- Prior reviews this SHA claims to close: **428** named uchain `unpunish` after boxlock; **436** named uchain after LOCKING doorlock.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhito so a WAN_OPENING/SPE_KNOCK zap that hits the punishment chain unpunishes instead of treating uchain like uball.”

C `bhito` `:2181–2188` after the floor-or-STONE check. `res` starts 1. `obj==uball` → `res=0`. Else `obj==uchain`: WAN_OPENING/SPE_KNOCK → `learn_it=TRUE; unpunish()` (res stays 1); else `res=0`. Both skip the otyp switch (no boxlock/breaks on the iron). Epilogue `:2421–2422` `if (learn_it) learnwand`. Callee `read.c` `unpunish` `:3066–3077`: savechain, `setworn(0,W_CHAIN)`, `delobj(savechain)`, `setworn(0,W_BALL)` (ball persists). Callers `bhitpile` / `bhit` `fhito` / `zap_updown` down. Self-zap Punished is `zapyourself`, not this.

Old JS: `if (obj === uball || obj === uchain) return 0` before the switch. Boxlock arms live (D-1467).

The diff **does** split that gate into C’s if/else-if/else-switch. It **does not** change `unpunish`. It **does not** add poly-arm `boxlock` `:2202–2204`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhito` uball / uchain split | C `:2181–2188`, **wired this SHA** | |
| `unpunish` | C `read.c` `:3066–3077`, **imported live** | not a clone this SHA |
| `learnwand` | C `:2421–2422`, **imported live** | SPBOOK skip |
| `setworn` / `delobj` | C, **imported live** (inside `unpunish`) | newsym-under-chain named on callee |
| poly-arm `boxlock` `reset_pick` | C `:2202–2204`, **named omit** | |
| boxlock OPENING on `Is_box` | C `:2393–2403`, **unchanged** (D-1467) | chain is not a box |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none (`unpunish` has no `rn2`). Public fortress does not zap opening at a punishment chain.

## C ↔ JS fidelity

JS `res=1; learn_it=false` then:

```
if (obj === uball) res = 0;
else if (obj === uchain) {
  if (OPENING || KNOCK) { learn_it = true; unpunish(); }
  else res = 0;
} else switch (otyp) …
if (learn_it) learnwand(otmp);
return res;
```

Matches `:2181–2188` / `:2421–2423`. Identity is `game.u.uball` / `uchain` (this port’s `uball` globals). **Callee is not a stub:** `unpunish` clears W_CHAIN, `delobj`s the chain, clears W_BALL, leaves the ball. Hallucination check: “Match C unpunish” while **`read.js` `unpunish` is live** is **not** a dispatch-stub lie.

LOCKING/STRIKING/SLOW on `uchain`: `res=0`, skip switch (no smash, no boxlock). Match the else branch. Loose iron chain that is **not** `uchain` still takes the switch (non-box → boxlock `res=0`). Canary claimed that.

uball OPENING: `res=0`, no `unpunish`. Hero remains punished if only the ball cell is zapped. Match. SPE_KNOCK SPBOOK skips `makeknown` inside `learnwand`. Match.

Poly arm still skips `if (Is_box) boxlock` at this SHA (HEAD later D-1483). Named here.

## Hallucinations / overclaim

Subject says WAN_OPENING/SPE_KNOCK on the punishment chain unpunishes instead of treating uchain like uball. **True:** learnwand + `unpunish`; uball still no-op; other otyps on the chain still `res=0`. **False until named** for poly-arm `reset_pick`, `delobj` hide-under-chain polish. Stamping **Addressed:** D-1481 for **the split gate + live `unpunish`** is fair. Do **not** stamp “Match C poly-arm `boxlock`.” Do **not** treat fortress PASS as a knock at the iron chain.

## Density

One `bhito` predicate plus the callee C already uses. ~20 lines. Playbook §2b. Did not glue poly-arm. Acceptable.

## Branch-by-branch confirm

1. Floor `uchain` + WAN_OPENING: `unpunish`, `learn_it`, `learnwand`, res=1. Match `:2184–2186`.
2. SPE_KNOCK: same body; SPBOOK skip makeknown. Match.
3. WAN_LOCKING / STRIKING / SLOW on `uchain`: res=0, still punished. Match `:2187–2188`.
4. `uball` any otyp: res=0, no `unpunish`. Match `:2181–2182`.
5. Floor chest still Klunk/Klick (D-1467). Unchanged.
6. Non-`uchain` chain object: switch, not `unpunish`. Match.
7. Poly-arm boxlock still skipped. Named.
8. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. No hardcoded ball coordinates.

## Verification

Journal: private canary **16**/16 (C/JS grep; Rule #2; OPENING unpunish+learn; KNOCK skip makeknown; LOCKING/STRIKING/SLOW still punished; uball no-op; loose chain non-box; D-1467 chest; weffects-down bhitpile; poly-arm still named); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The split matches C. `unpunish` is a C callee, not a glyph stand-in.

Named omits (map / Open, not Must-fix):

1. poly-arm `boxlock` `reset_pick` — Open after this SHA (later D-1483)
2. `unpunish` `delobj` newsym / hide-under-chain (callee debt)
3. `zap_updown` default — Must-fix from review **437**

Do not Must-fix “`unpunish` is a stub.” Do not Must-fix “uball OPENING should unpunish” (C `res=0`). Do not Must-fix “LOCKING on uchain should boxlock.”

## Callers / RNG ledger

C callers: `bhitpile` / `bhit` / down `zap_updown`. No new dice. Public fortress does not hit the new arm.

Verdict: **ACCEPT-WITH-DEBT**
