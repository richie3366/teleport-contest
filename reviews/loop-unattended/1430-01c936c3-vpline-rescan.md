# Review 1430 — 01c936c3 — vpline whole-body port (D-2471)

Metadata: SHA `01c936c3`, `js/display.js` only (217 ins). C
`pline.c:152–291` (140 L, a **staticfn** — JS widens it to an
export). D-log: D-2471.

## Intent vs deliverable

Promise: whole `vpline` in C order (format arms, BUFSZ truncation,
in_pline/raw gate, msgtyp/vision/flush trailer, variadic wrappers).
Diff ships that. But it also silently **redefines the contract of
every pre-existing single-arg `pline` call**: old `pline(msg)` was
literal (D-0330); new `pline(fmt, ...args)` format-scans. The
verbatim-text call sites were not converted and the D-log does not
name them. One is a live, player-reachable C-wrong (below).

## Inventory

- Added: `export async function vpline`, `vpline_expand`,
  `vpline_truncate`, `_vpline_in_pline`, `vpline_msgtyp_gate`,
  `vpline_after_putmesg`; new `You/Your/You_cant/pline_The/There/
  You_feel/You_see` + reworked `verbalize/impossible` bodies;
  `pline/pline_xy/pline_mon/pline_dir/Norep/custompline/
  urgent_pline` now variadic.
- `sym.mjs`: `You` is now a **duplicate export**
  (`js/display.js:7441` new + `js/zap.js:859` pre-existing, 7 files
  import zap-`You`) — undisclosed in the D-log. Net behavior
  currently identical, so debt rather than divergence, but it is a
  second spelling of a C function added without re-pointing.
- No deleted symbols.

## C ↔ JS fidelity — what is right

Branch-by-branch, the `vpline` body itself is exact:
accessiblemsg consume-then-format (= C recurse-with-same-va_list —
sound, the `coord_desc` prefix never contains `%`); `%s`-exact
verbatim arm; `vsnprintf` subset (`%s/%d/%i/%u/%ld/%lu/%x/%X/%o/
%c/%%`, flags/width stripped); truncation indices
(`slice(0, BUFSZ-1-6)` + `...` + last 3 — matches C `:222–230`
exactly); `ln` = actual length (== attempted length — JS has no
BIGBUFSZ cut, so equivalent); `panic` named omit; SUPPRESS_HISTORY
`dumplogmsg` before the gate; `in_pline++` always increments with
try/finally decrement; raw path sets UNKNOWN and returns;
suppress skips vision/flush/putmesg/prevmsg (= `goto pline_done`);
vision dance with in_pline saved at 0; `u.ux` flush gate;
`prevmsg = slice(0, BUFSZ-1)`; STOP→`more()`; SPEECH clear.
`verbalize`/`impossible` keep their (pre-existing, narrow)
pre-format and route via the `%s` arm — net behavior unchanged.
Minor: new `You("")` returns early where C `You`
(`pline.c:365–374`, no empty guard) prints `"You "` —
unreachable in practice, noted not queued.

## C ↔ JS fidelity — the C-wrong

C `engrave.c:396` prints engraving text **as a `%s` argument**:
`You("%s: \"%s\"%s", … "read", et, …)` — `et` is verbatim, so an
engraving reading `%s` prints `%s`. JS `engrave.js:553–555`
interpolates `et` into a single-arg `pline`, which this commit
newly format-scans. Demonstrated with the shipped regex: `%s` →
`""`, `%d` → `"0"`, `%%` → `"%"`, `50% of treasure` →
`"500f treasure"`. Player-reachable (engrave `%s`, read it back),
contradicts C, introduced here (pre-commit `pline` was literal).
Same family, same commit: `rumors.js outrumor` `pline(line)` vs C
`pline1(line)` (= `pline("%s", …)` verbatim macro,
`hack.h:1026`); `pager.js` `pline(outH.s)` (shipped in 981a50f7
under the D-0330 literal contract this commit silently
redefined); `zap.js You(rest)` pre-format + re-scan for its 7
importing files. The author knew the hazard (applied `%s`-routing
to verbalize/impossible) but left these sites unconverted.

## Hallucinations / overclaim

"Single-arg pline has no % expansion" (cited for do_look in the
prior commit) is false after this SHA, and the D-log's "every arm
ported" does not disclose the contract change to ~30
`pline(variable)` sites. The verification claim itself
(0 blocked, smoke REACH-OK) is accurate but structurally blind to
this class: `vpline` draws no RNG, so reach is vacuous by
construction, and message-text divergence surfaces only in a
corpus re-score — which runs on audit, after ship.

## Density

Right-sized as a function port; wrong-sized as an undisclosed
shared-primitive contract change (the call-site audit belonged in
this commit).

## Verification

- `hidden-proxy verify vpline --base 01c936c3~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); smoke
  24/24 → REACH-OK. Matches — and proves nothing about this bug
  class (see above).
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward.
- Positive proof of the C-wrong: node one-liner running the
  shipped `vpline_expand` regex over `You read: "<et>".` (above).

## Actionable C-wrongs

1. (Must-fix, queued) vpline re-scan of verbatim-text call sites —
   engrave.js read-back, rumors.js `pline(line)`, pager.js
   `pline(outH.s)`, audit of `pline(variable)`/`You(var)`/
   zap-`You` importers; route via the `%s` arm; merge the duplicate
   zap.js `You`.

Verdict: **QUALITY-RISK**

**Addressed:** D-2476
