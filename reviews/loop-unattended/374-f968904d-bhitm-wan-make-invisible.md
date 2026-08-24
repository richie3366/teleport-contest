# Review 374 — f968904d — zap.c bhitm WAN_MAKE_INVISIBLE (D-1414)

## Metadata
- Full / short hash: `f968904d406ec618dfee84b7c1d54fd782937f46` / `f968904d`
- Parent: `5d9eaf93` (docs-only review D-1405–D-1413). This file audits **this SHA only** (first of nine `js/` commits since review **373**). Archive **Addressed:** D-1414 `f968904d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 18:13:16 +0200
- D-id: **D-1414**
- Stats: 11 files, +172 / −33 — `js/zap.js` +65 / −5 (`knowninvisible` + `bhitm` case); `js/worn.js` +21 / −2 (`mon_set_minvis`).
- Claims to close: Open `zap.c` `bhitm` WAN_MAKE_INVISIBLE (named from D-1369 / reviews **329** / **373**). Not zapyourself speed. `reviews/loop-2026-08-15/` has no unpaid make-invisible Must-fix.
- JS / map: `zap.js` `bhitm` / `knowninvisible`; `worn.js` `mon_set_minvis`. `c-js-map/turns.md` + `debt.md`. zap_updown / zap_steed / worm `see_wsegs` / `map_invisible` epilogue / WAN_SPEED still named at this SHA.
- Prior reviews this SHA claims to close: **329** named bhitm after zapyourself; **373** queued it as next Open.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhitm WAN_MAKE_INVISIBLE so a monster-aimed wand of make invisible sets minvis and prints turns transparent or vanishes, instead of doing nothing.”

C `zap.c` `bhitm` `:348–368`:

```
    case WAN_MAKE_INVISIBLE: {
        int oldinvis = mtmp->minvis;
        boolean couldsee = canseemon(mtmp);
        ...
        if (disguised_mimic) seemimic(mtmp);
        Strcpy(nambuf, Monnam(mtmp));
        mon_set_minvis(mtmp, FALSE);
        if (!oldinvis && knowninvisible(mtmp)) {
            pline("%s turns transparent!", nambuf);
            reveal_invis = TRUE;
            learn_it = TRUE;
        } else if (couldsee && !canseemon(mtmp)) {
            pline("%s vanishes!", nambuf);
        }
        break;
    }
```

Callee `worn.c` `mon_set_minvis` `:474–484`: `perminvis = !cursed_potion`; if `!invis_blkd` then `minvis = perminvis`, `newsym`, worm `see_wsegs`. `knowninvisible` is `display.h` `_knowninvisible` `:146–151`: `minvis` and (`cansee` cell and (`See_invisible` or `Detect_monsters`)) or (`!Blind` and `HTelepat & ~INTRINSIC` within `BOLT_LIM²`). C `See_invisible` is `youprop.h:152` `HSee_invisible || ESee_invisible` ≡ `uprops[SEE_INVIS]`. `zap_steed` `:3117` default-routes this otyp through `bhitm`. Epilogue `:563–570`: `reveal_invis && cansee && !canspotmon` → `map_invisible`; `learn_it` → `learnwand`.

Old JS: WAN_MAKE_INVISIBLE fell through `default` (no minvis, no pline, no learn).

The diff **does** add the case, snapshot `Monnam` before visibility, call live `mon_set_minvis(FALSE)`, and split transparent vs vanish. It **does not** port `see_wsegs` / `map_invisible` / zap_updown / zap_steed wrapper. Named. It **does** add a local `knowninvisible` that is **not** C’s macro.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhitm` WAN_MAKE_INVISIBLE | C `:348–368`, **wired** | default → body |
| `mon_set_minvis` | C `worn.c:474–484`, **C callee live** | FALSE = perminvis 1 |
| `newsym` | C, **imported live** | cell, not tail |
| `seemimic` | C, **imported live** | disguised mimic first |
| `Monnam` | C, **imported live** | before minvis |
| `canseemon` | C `display.h`, **imported live** | sticky See_invisible clone (pre-existing) |
| `learnwand` | C, **imported live** | only transparent arm |
| `knowninvisible` | C `_knowninvisible`, **clone that diverges** | misses conferral uprops |
| `See_invisible` / `Detect_monsters` | C `youprop.h`, **clone bits** | H/E/sticky; no `uprops[]` |
| `HTelepat & ~INTRINSIC` | C, **wired** | timeout telepathy + `BOLT_LIM²` |
| `see_wsegs` | C `:482–483`, **named omit** | worm tail |
| `map_invisible` epilogue | C `:563–565`, **named omit** | `void reveal_invis` |
| zap_updown / zap_steed wrapper | C `:2330` / `:3117`, **named omit** | steed C-calls this `bhitm` |
| `setworn` w_blocks | C, **named omit** | `invis_blkd` already gates callee |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in this arm (no `rn2`/`d`). `learnwand` may `exercise(A_WIS)` after makeknown. Public fortress never zaps make-invisible at a monster.

## C ↔ JS fidelity

Order matches `:348–368`: `oldinvis` / `couldsee` **before** `seemimic` / `Monnam` / `mon_set_minvis(FALSE)`. Transparent iff `!oldinvis && knowninvisible`; else vanish iff `couldsee && !canseemon`. Strings `" turns transparent!"` / `" vanishes!"` match C `pline`. Already-minvis is silent (no second transparent, no vanish unless `couldsee` then `!canseemon`). `invis_blkd`: callee sets `perminvis` and skips `minvis`/`newsym` — then `knowninvisible` is false (`!minvis`) and vanish needs `couldsee && !canseemon` (still visible). Match that. Wake stays default true → `wakeup` / `m_respond` / shop `hot_pursuit`. Match `:552–557`.

`mon_set_minvis` is a **C callee**, not a stub: `perminvis = cursed_potion ? 0 : 1`; `!invis_blkd` copies to `minvis` + `newsym`. Wand passes `false`. Match `:478–481` except worm `see_wsegs` (named).

`knowninvisible` is a **clone**. C `See_invisible` is `uprops[SEE_INVIS].intrinsic || extrinsic`. JS `confer_oc_oprop` (`do_wear.js:262–290`) writes ring-of-see-invisible **only** to `uprops[SEE_INVIS].extrinsic`. It mirrors `EBlinded`/`EFast`/`ETelepat`/`EStealth`/`ELevitation`, **not** `ESee_invisible`. `timeout.js` `See_invisible()` already ORs those uprops. This SHA’s helper does not:

```
const See_invisible = !!((u.HSee_invisible | 0)
    || (u.ESee_invisible | 0) || u.See_invisible);
```

A seeing hero wearing `RIN_SEE_INVISIBLE` (Wizard kit; conferral-only) is `See_invisible` in C and **not** in this clone. `!oldinvis && knowninvisible` fails. `canseemon` after `minvis` is also false (`display.js` sticky `u.See_invisible` only). JS then prints vanish and **does not** `learnwand`. C prints transparent and learns. That is a **C-wrong** on the keep-path this SHA promised, not a named omit of sparkle. Same miss on conferral `Detect_monsters` (`youprop.h:190`). Timeout `HSee_invisible` / sticky `u.See_invisible` still take the C arm — the canary’s “See_invisible transparent+learn” can pass without ever wearing the ring.

Telepathy arm: `!Blinded_for_invis()` then `HTelepat & ~INTRINSIC` and `dx²+dy² <= BOLT_LIM²`. `INTRINSIC` bits match `prop.h:140`. `BOLT_LIM` is 8. C uses `mdistu`. Match the timeout-telepathy geometry. `Blinded_for_invis` is closer to C `Blind` than the sticky `Blind()` alone (`confer_oc_oprop` **does** mirror `EBlinded`).

`void reveal_invis` drops C `:563–565` `map_invisible` when the hero saw the cell but cannot spot the monster. Transparent+See_invisible still `canspotmon`, so that epilogue is idle on the C transparent arm. Vanish is `reveal_invis` false in C too. Named; not the dice/learn split.

Hallucination check: “Match C `bhitm` WAN_MAKE_INVISIBLE” while **`mon_set_minvis` is the live worn.c export** is not a dispatch-stub lie. “Match C `knowninvisible` / See_invisible transparent+learn” while **the clone misses conferral uprops** **is** an overclaim on the ring-of-SI arm this SHA newly keyed. Do **not** stamp “Match C `youprop.h` See_invisible.” Do **not** stamp “Match C `see_wsegs`.” Do **not** stamp “Match C zap_updown WAN_MAKE_INVISIBLE.”

## Hallucinations / overclaim

Subject says a monster-aimed wand sets minvis and prints transparent or vanishes instead of doing nothing. **True for a hero whose sticky/`H`/`E` See_invisible bits are set, and for a hero with none of those bits (vanish).** **False for conferral-only See_invisible** (ring of see invisible) until the helper reads `uprops[SEE_INVIS]` like C / `timeout.js`. D-log “See_invisible transparent+learn” does not name that gap. Stamping **Addressed:** D-1414 for deleting the default no-op is fair. It is **not** fair for “Match C transparent vs vanish.” Do **not** treat fortress PASS as `" turns transparent!"` or `" vanishes!"`.

## Density

One C `bhitm` case plus the `worn.c` callee the minvis write needs. ~80 lines of JS. Playbook §2b caller/callee cluster. Did not glue WAN_SPEED (next Open after this SHA’s follow-up). Right size. `timeout.js` already had a C-shaped `See_invisible()`; cloning a worse local copy is the quality miss, not the envelope width.

## Branch-by-branch confirm

1. Visible monster, no See_invisible: `couldsee`; after minvis `!canseemon`; `" vanishes!"`; no learn. Match.
2. Timeout/`H`/`E`/sticky See_invisible, was visible: `" turns transparent!"`; `learn_it`; wakeup. Match those bits.
3. **Conferral ring-of-SI only:** C transparent+learn; **JS vanish, no learn. C-wrong.**
4. Already `minvis`: `oldinvis` truthy; skip transparent; vanish only if `couldsee && !canseemon` (usually silent). Match.
5. `invis_blkd` (mummy wrapping analogue): perminvis 1, minvis unchanged, no newsym. Match callee; worm tail still named.
6. Disguised mimic: `seemimic` before `Monnam`. Match.
7. zap_updown object no-op / zap_steed wrapper / `see_wsegs` / `map_invisible`. Named.
8. zapyourself WAN_MAKE_INVISIBLE unchanged (D-1369). Match.
9. **Public-unhit** unless a session zaps make-invisible at a monster.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded overlay text. Plain ESM. The See_invisible miss is a **clone**, not a trace index. `void reveal_invis` is a named epilogue skip, not ALIGN.

## Verification

Journal: private canary **10**/10 (C/JS grep; vanish no learn; See_invisible transparent+learn; already minvis silent; `invis_blkd` perminvis-only; WAN_SPEED still default; zapyourself D-1369 still a case; Rule #2). The See_invisible case would **not** have caught conferral-only uprops. green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` is running at HEAD `9f2a3a08` (score rewrite at end of this review iter). Fortress PASS is not a monster-aimed wand of make invisible.

## Actionable C-wrongs

1. **Must-fix:** `zap.js` `knowninvisible` must use C `See_invisible` / `Detect_monsters` (`H||E` ≡ `uprops[SEE_INVIS]` / `DETECT_MONSTERS`, as `timeout.js` `See_invisible()` already does) so a conferral ring-of-see-invisible still takes the transparent + `learnwand` arm, not vanish. One port iter; do not rewrite `canseemon` in the same commit unless that is required to keep the vanish predicate honest after the helper fix.

Named omits (map / Open, not Must-fix):

1. `worn.c` `see_wsegs` after `mon_set_minvis`
2. `bhitm` `map_invisible` epilogue (`reveal_invis`)
3. `zap_updown` / `zap_steed` WAN_MAKE_INVISIBLE wrappers (steed C-calls this `bhitm`)
4. `bhitm` WAN_SPEED / WAN_SLOW / WAN_LOCKING / WAN_PROBING (already Open)

Do not Must-fix “already minvis should print transparent again” (C skips). Do not Must-fix “vanish should learnwand” (C learn only on transparent). Do not Must-fix “`invis_blkd` should still flip `minvis`” (C skips). Do not Must-fix “dispatch is a stub” (`mon_set_minvis` is live).

## Callers / RNG ledger

C callers: IMMEDIATE `weffects` → `bhit` → `bhitm`; `zap_steed` default. No new `rn2`/`d` in the case. `learnwand` → `makeknown` may `exercise(A_WIS)` (`rn2(19)` typical) only on the transparent arm. Conferral SI currently skips that exercise in JS and burns no extra dice on vanish either — the wrong **message/learn**, not a prefix RNG chew. Public fortress never needs these.

Verdict: **QUALITY-RISK**

**Addressed:** D-1423
