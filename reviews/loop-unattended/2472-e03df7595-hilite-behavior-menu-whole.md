# Review 2472 — e03df7595 — hilite behavior menu + menu_add whole (D-3590)

**Metadata.** SHA `e03df7595` (2026-10-07, D-3590). Type: **cliff**:
the cliffs head itself (`botl.c status_hilite_menu_choose_behavior`)
plus same-C-file companion `status_hilite_menu_add`, both ported
whole. `js/` insertions: 611 (`js/botl.js` +611/−42) + committed
test. Ceiling raised (250+), review kept tight anyway.

## Intent vs deliverable

Promise: step 32 shows C's «Select power field hilite behavior:»
vs JS's top-menu bounce because both functions were missing; port
both whole (accelerators as selectors, 4-label state loop, fld
wiring at both sites, No-current-hilites + conditional-X arms) for
Tourist-94111 32→109.

Diff actually adds: the two exports, the fld count-guard/X/create
rewire, import names (`pline`, `trimspaces/strstri/digit`, `getlin`)
on existing edges plus two dynamic `options.js` imports. Promise
matches diff. No symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | status_hilite_menu_choose_behavior | ported whole | [botl.js](/home/debian/dev/teleport-contest/js/botl.js:4099) | botl.c:3706–3808 |
| 2 | status_hilite_menu_add | ported whole | [botl.js](/home/debian/dev/teleport-contest/js/botl.js:4176) | botl.c:3889–4302 |
| 3 | status_hilite_menu_fld wiring | ported (3 arms) | [botl.js](/home/debian/dev/teleport-contest/js/botl.js:4755) | botl.c:4357–4359/:4381–4404/:4445–4447 |

Callee closure (all LIVE): same-file locals (`choose_field`,
`choose_updownboth`, `query_arrayvalue`, `query_conditions`,
`add_threshold`, `reset`, `conditionbitmask2str`, `status_hilite2str`,
`hlattr2attrname`, `ensureCondHilites`, `zeroAnything`,
`s_to_anything`, `blstatFldName` — pre-existing, `sym.mjs` "local"
vocabulary); live async `query_color`/`query_attr`/
`select_menu_pick_one` (options.js:6727/6756/9659, all awaited);
live async `getlin` (getline.js:244, awaited); live `strstri`
(hacklib.js:644). No STUB in any live arm.

## C ↔ JS fidelity

**choose_behavior: arm-for-arm exact.** All 7 menu guards
(:3726/:3735/:3743/:3752/:3761/:3769/:3779) with C's accelerators,
texts, `onlybeh`/`nopts` threading, the `nopts>1` select vs
single-option auto-pick (:3793–3801), guard-clause return
(:3718–3719) ✓. The res 0/−1→cancel fold is exact on every
reachable path: both C menu_add callers (:4370/:4446, via
`csym.mjs --callers`) pass `fld` from `status_hilite_menu_fld`,
whose only caller :4555 routes `a_int−1<0` to viewall — so
`ofld==BL_FLUSH` is unreachable and C's :3928 goto-choose_field
twin can never fire; the :3928/:4115 `ofld==BL_FLUSH` arms are
still ported live for future callers ✓. No RNG either side.

**menu_add threshold parse: in-place emulation verified.**
`trimspaces` (hacklib.c, read) keeps leading whitespace in the
buffer — JS's kept-base + skipped-pointer is exactly C ✓.
Operator/plus blanking (:3968–3979), digit scan, `%`-truncate
accepting trailing junk (:3990), the `"`%s`" not recognized" /
"invisible number" gotos, percent validation incl. the −1/101
exceptions (:4024–4027), `%`-restore for the prompts (:4032),
INT/LONG range plines (:4040–4048), `behavior=ABSOLUTE` fallback
keeping `hilite.behavior` (:4016) ✓. The `gtok` union read is
exact: it only matters when percent (dt=INT, short-circuit
otherwise) with `NO_LTEQGT`, where validation forces val∈[0,100],
so LP64 zero-extension equals `aval.a_int|0` ✓.

**Value/color/store arms: whole.** UPDOWN str/non-str (:4085–4099)
with the EQ/«changes» quirk (:4101–4110, LE/GE noted unreachable);
CONDITION incl. live :4115 ofld arm; TEXTMATCH CAP/ALIGN/HUNGER
arrays (SATIATED/STARVED bounds ✓), TITLE rolelist from
`game.urole.title ?? rank` — the `rank_of` precedent (roles.js:822,
read) confirms `title` IS the 9-entry {m,f} array, C
`gu.urole.rank[9]` ✓; getlin length gate returning FALSE
(:4217–4220) ✓; CRITICALHP falls through with empty queries like C
✓; choose_color cancel routing (:4236–4243) ✓; the 6+6 cond-hilite
bit arms with `>>>0` 32-bit ops + `[clr]` OR (:4250–4270) ✓;
`coloridx = clr|(atr<<8)` (:4280) ✓; TITLE `strstri ' or '` split
(`strstri` returns the match tail or null, hacklib.js:644 — slice
offsets equal C's `*p='\0'` + `p+=4`) with the double add+pline
✓; reset + TRUE tail ✓.

**fld wiring** matches :4370–4375 / :4381–4394 / :4400–4404 (read)
exactly. Imports: botl→getline already static (`--can`: ALREADY);
botl⇄options dynamic use matches 6+ pre-existing sites while
options.js statically imports botl.js (:218–226) — the claimed
cycle precedent is real.

## Hallucinations / overclaim

None. "Both C bodies are whole" is accurate; every fold (res
twin, NUL preloads, GC, Snprintf→template) is disclosed with its
exactness argument, and each argument checks out.

## Density

Cliff §10.18: head owner + same-file companion, each whole, each
with its own `Ledger:` entry (by-design→ported ×2). Per-function
verdicts ACCEPT ×3 → SHA ACCEPT.

## Verification

- Added-code grep: no FORCE/DIAG/RNG/seed/coordinate hits.
- Rule #2: clean this iteration (see 2471).
- Committed test `hilite-behavior-menu.test.mjs`: 1/1 PASS now.
- Re-measure (mine): `verify
  status_hilite_menu_choose_behavior,status_hilite_menu_add --base
  e03df7595~1 --reach-all` → owner **0 PASS, 1 moved past, 0
  unchanged, 0 worse** (Tourist-94111 → handler_paranoid
  @185, was 32 — the D-log's 32→109 plus D-3592) + smoke 24/24
  REACH-OK; menu_add vacuous + smoke REACH-OK. No REGRESSED
  session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
