# Review 1388 — 13f2a1ea — mktrap victim-gate burn (D-2429)

- SHA: `13f2a1ea`, D-2429 (Open row: scen-tour-Ranger-92033 step
  98/138 kind=rng — C burns two victim-gate `rnd(4)` JS never drew).
  JS files: `js/mklev.js` only (2 tail calls in `load_minend_3` + a
  doc-bullet retirement).
- Prior reviews closed: none (corpus-owner writer row, 1 block).

## Intent vs deliverable

Subject promises: capture `ttmp` from the two
`maketrap(LEVEL_TELEP)` calls in `load_minend_3` and run the already-
live `mktrap_seen_victim(ttmp, {})` tail in C order, burning the
`rnd(4)` the gate draws before LEVEL_TELEP fails the kind tail
check. Diff delivers exactly the two calls plus a C-order comment.
Promise == diff.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| 2× `mktrap_seen_victim(ttmp, {})` (`load_minend_3`) | new call sites | LIVE — existing clone, C `mklev.c:2137–2150` gate |
| `mktrap_seen_victim` (`js/mklev.js:17652`) | C callee (local) | verified CLONE — `&&` chain incl. `rnd(4)` position matches C (this review) |
| `maketrap` (`js/trap.js:930`) | C callee | LIVE — returns `ttmp` on success (`:1051`/`:1055`), so the capture is real, not a no-op |
| `mktrap_victim` (`js/mklev.js:28445`) | downstream of clone | CLONE — unreached on this path (gate fails for LEVEL_TELEP); body not audited here |
| JS `mktrap` (`js/mklev.js:28525`) | related | CLONE — pre-existing; the retired doc bullet now points at it (see below) |

No symbols deleted or re-pointed (helper pre-existed with ~10 call
sites at the parent — `git grep` confirms; nothing for `sym.mjs`
to resolve beyond the clone listing, pasted below).

Required clone listing:

```text
mktrap_seen_victim NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:17652
```

## C ↔ JS fidelity

C locus read directly (`mklev.c:2036–2150` `mktrap`; `csym.mjs`
has no index entry for the K&R-multiline header — the range the
D-log cites is the range I cite). Victim gate:

```c
if (gi.in_mklev
    && kind != NO_TRAP && !(mktrapflags & MKTRAP_NOVICTIM)
    && lvl <= (unsigned) rnd(4)          /* drawn here … */
    && kind != SQKY_BOARD && kind != RUST_TRAP
    && !(kind == ROLLING_BOULDER_TRAP && …)
    && !is_pit(kind) && (kind < HOLE || kind == MAGIC_TRAP)) {
```

The clone replicates the chain in the same order with the same
short-circuit (`game.in_mklev && kind !== NO_TRAP && !novictim &&
lvl <= rnd(4) && …`), so LEVEL_TELEP burns exactly one `rnd(4)`
per call and then fails the tail — two calls, two draws, matching
the measured C draw order (`rnd(4)=1, rnd(4)=2` extra). The `{}` opts
give seen/novictim false and no spider flag; D-log's "not-WEB so
spider moot" holds (spider arm is `kind === WEB`-gated). Branch
order and RNG call-for-call confirmed.

Doc-bullet retirement ("populate_maze trap loop is live via
mktrap"): verified — `populate_maze` calls `mktrap(0,
MKTRAP_MAZEFLAG, …)` (~18331); the old "no JS mktrap" claim was
factually stale. (That `mktrap` is itself a local clone — the
retirement is still correct as a staleness fix, not a fidelity
claim.)

Observation, not a C-wrong: this file now carries three local
clones of one C family (`mktrap`, `mktrap_seen_victim`,
`mktrap_victim`) with the tail-call pattern spreading site by
site. Each new site inherits any drift in the victim *body*
unaudited. The D-log names the remaining bare-`maketrap` NO-TAIL
sites with per-site C reasons (MAGIC_PORTAL portal path,
VIBRATING_SQUARE early-return, etc.) — that list is the right
scope for the next audit, not this one.

## Hallucinations / overclaim

None. No "Match C" dispatch-over-stub: the wired callee is a live
body whose gate order I verified against C here.

## Density

~5 net JS lines for a 1-session writer arm with a measured
two-draw mechanism — minimal and right-sized (C is that small).

## Verification

D-log claims `hidden-proxy verify mktrap` → PROGRESS
(Ranger-92033 PASS) + green + cohort + full 44/44. Re-measured
myself at the parent baseline:

`node scripts/hidden-proxy.mjs verify mktrap --base 13f2a1ea~1` →
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(scen-tour-Ranger-92033: PASS). Confirmed, not vacuous. Diff
grep: no FORCE/DIAG/getRngLog/fastforward/seed gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
