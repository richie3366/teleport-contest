# Review 985 — e495002e — disclose conduct 'and achievements' suffix (D-2015)

Metadata: SHA `e495002e`, D-2015, Open-row port (queue row
`end.c` disclose, 7 sessions). js/ touches 1 file (`js/end.js`,
+10/−8: conduct arm suffix + one import name). No stamp owed.

## Intent vs deliverable

Subject promises: conduct prompt gains `" and achievements"`
via live `count_achievements`. Diff actually adds: `acnt =
count_achievements()` with the `(acnt > 0)` suffix built in
exact C position, `yn_function` asked only when `ask`.
Promise == diff.

## Inventory

- Changed JS function: `disclose` conduct arm only
  (`js/end.js:788`).
- New helpers: none. No deleted symbols — no `sym.mjs` delete
  audit required. No STUB/clone/no-op.
- Callee closure: `count_achievements` (`insight.js:202`,
  sync — the un-awaited call is correct) is a verbatim port
  of C `insight.c:2493–2501` (count non-zero `uachieved`
  entries) ✓; `should_query_disclose_option('c')` is the
  pre-existing local port, untouched; `yn_function`/
  `show_conduct` arg shape untouched. `--can`: end→insight
  edge pre-existing (name extension only).

## C ↔ JS fidelity

C locus: `end.c:668–680` (`if
(should_query_disclose_option('c', &defquery)) { acnt =
count_achievements(); Sprintf(qbuf, "…conduct%s?",
acnt>0 ? " and achievements" : ""); c = yn_function(…); }
else c = defquery; if (c=='y') show_conduct(…)`).
Branch-by-branch confirm: ask-gate ✓, `acnt>0` suffix in the
same Sprintf position (including C's noted
singular/plural non-distinction) ✓, yn-only-when-ask with
`'ynq'`+`defquery` (4th-arg TRUE is the pre-existing call
shape shared with every other disclose arm in this function)
✓, else-`defquery` ✓. No RNG in this arm.

## Hallucinations / overclaim

None. The 2 unchanged sessions (wish-Monk-92031@49,
wish-Priest-92098@85, identical toplines) are disclosed as a
different mechanism — wished Bell/Candelabrum set
ACH_BELL/ACH_CNDL via `addinv_core1` in C while JS `addinv`
never records uhave/achievements — with the C cite
(`invent.c:960–986`) and its own re-queue note; the defer is
named in the map (`u_init.js` addinv doc), not hidden.

## Density

~18 lines for a one-prompt C arm that closes two full
sessions. Right-sized.

## Verification

Re-measured myself: `hidden-proxy verify disclose --base
e495002e~1` → `2 PASS, 5 moved past (2 still disclose at a
later step), 2 unchanged, 0 worse → PROGRESS` — same PASS
pair (92205, 92082), same unchanged pair with identical
toplines, 0 worse; the 2 extra moved sessions vs the D-log
(92208@9→10, 92227@12→13, each 1 step later under later
re-attribution) are additional movement, not contradiction.
Claim CONFIRMED. Plus cited green 2/2 + strict ×2, cohort
7/7. js/ hunk grep: no `FORCE`/`DIAG`/`getRngLog`/
seed/coordinate/`fastforward` (sole hit is the message
quoting Rule #2). Rule #2 clean.

## Actionable C-wrongs

None in this delta (the addinv ACH residual is a named map
defer with its own future row, per the D-log Next).

Verdict: **ACCEPT**
