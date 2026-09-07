# Review 989 — 2ae51922 — get_count echo via live custompline (D-2019)

Metadata: SHA `2ae51922`, D-2019, Open-row port (queue row
`detect.c` dosearch0, 1 session — locus relocated by C-step
trace from multi lifecycle to the count echo). js/ touches 2
files (`js/display.js` +22/−2: `custompline` + dumplog gate;
`js/cmd.js` +5/−2: echo call-site). No stamp owed.

## Intent vs deliverable

Subject promises: count echo through `custompline`
(SUPPRESS_HISTORY) so a later Norep compares against it.
Diff actually adds: exported `async custompline(flags,
msg)`; `pline_after_consume(msg, suppressHistory = false)`
gating `dumplogmsg`; echo `await custompline
(SUPPRESS_HISTORY, qbuf)` in C position (before
flush+setCursor ≈ `mark_synch`). Promise == diff.

## Inventory

- New JS function: `custompline` (`display.js:7287`,
  exported, async — awaited at the call site ✓); changed:
  `pline` (prologue factored into the shared core, default
  `false` = identical behavior), `get_count` echo.
- New helpers: none. No deleted symbols — no `sym.mjs`
  delete audit required. No STUB/clone/no-op.
- Callee closure: `vpline_consume_msg_loc` (same-file `:7194`,
  shared by both paths), `dumplogmsg`, `SUPPRESS_HISTORY =
  4` ≡ C `hack.h:1377` ✓. `--can`: cmd→display edge
  pre-existing (hoisted async name extension); const edges
  pre-existing.
- Named omits kept: rhack `Unknown command` plain pline,
  yn ATR_NOHISTORY, getobj GC_SAVEHIST putmsghistory,
  `nomul_clear` subset (with a silent-equivalence proof on
  this path, both sides multi==0, no message).

## C ↔ JS fidelity

C loci: `pline.c:296–308` (set flags → vpline → reset),
`:235–239` (dumplog gate iff SUPPRESS_HISTORY clear),
`cmd.c:5071–5080` (clear + `custompline(SUPPRESS_HISTORY,
"Count:…")` + `mark_synch`). Confirm: set/try/finally-reset
(C has no exceptions; finally is a safe superset) ✓;
consume + empty-return in both entry points as C's vpline
does ✓; dumplog gate — C reads `gp.pline_flags` inside
vpline, JS passes a param, but equivalence holds:
`custompline` is the sole SUPPRESS_HISTORY setter and the
sole `true` passer, while `gp.pline_flags` remains live for
what the core actually reads (`PLINE_NOREPEAT`/
`OVERRIDE_MSGTYPE`/`URGENT_MESSAGE` at `:7248–7251`) ✓;
echo position before flush+cursor ✓. Mechanism (D-log
measured, multi hypothesis falsified by trace): old echo
wrote `_pending_message` without touching `_prevmsg`, so the
stale step-24 gate text made step-30 Norep see `line ===
_prevmsg` and suppress; now the echo runs full vpline
(putmesg + update_topl + prevmsg) minus dumplog only, as C.
No RNG in this delta.

## Hallucinations / overclaim

None — the entry even records what it did *not* change
after falsifying the multi-lifecycle theory, with the
C-step trace as evidence.

## Density

~33 js/ lines for a 13-line C function plus its call-site
and a default-param core split. Right-sized. (Shared
display core changed — covered by cited full 44/44 plus
this iteration's cadence rerun.)

## Verification

Re-measured myself: `hidden-proxy verify
cmd_safety_prevention --base 2ae51922~1` → `0 PASS, 1 moved
past, 0 unchanged, 0 worse → PROGRESS` (92191 →
dosearch@55, was 30) — identical to the D-log. Plus cited
green 2/2 + strict ×2, cohort 7/7, full 44/44 (shared file
changed). js/ hunk grep: no `FORCE`/`DIAG`/`getRngLog`/
seed/coordinate/`fastforward` (sole hit is the message
quoting Rule #2). Rule #2 clean (re-ran).

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
