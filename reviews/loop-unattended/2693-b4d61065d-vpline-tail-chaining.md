# Review 2693 — b4d61065d — vpline completion-tail chaining

Metadata: SHA `b4d61065d`, D-3830, cliffs head `mcastu.c` castmu
writer (castmu untouched — whole). JS: `js/display.js` (+65/−18:
tail link + chain-await + `msg_stack_nested`). Test:
`scripts/pline-float-flush.test.mjs` (3 its).

## Intent vs deliverable

Promise: the fire-and-forget exercise→encumber_msg float held
`in_pline=1` across its More-wait, so the lich cast + two
smoulders hit the legacy drop; chain contended entries behind
the in-flight tail instead of dropping (true nesting keeps the
drop). Claimed: 95316 681→940 (moved). Diff actually does:
exactly that. Match.

## Inventory

- `vpline` (js/display.js:9185) — changed: sync tail link at
  entry; contended+non-nested awaits the previous tail; legacy
  gate kept as the backstop; release in the outer finally. C
  `pline.c:152–291` (csym): `:243–249` `in_pline++ ||
  !window_inited` → raw_print (named omit) + UNKNOWN +
  pline_done; the C premise is verified — `exercise :516–517`
  calls `encumber_msg()` as a sync tail (read) and encumber_msg
  `:1999–2019` (read) prints-then-sets-botl synchronously: no
  float exists in C, the overlap is JS-only.
- `msg_stack_nested` (js/display.js) — new JS-only mechanism
  helper (no C counterpart; serialization shim, not a callee
  clone): true iff ≥2 `vpline` frames above it (own frame
  skipped).
- No caller changes (all message wrappers funnel through
  vpline); no deletes or re-points — nothing for `sym.mjs`.

## C ↔ JS fidelity

Behavioral contract vs C: serial message order with no loss —
the chain restores exactly C's sync print-then-wait sequence
for the float case (holder prints + consumes its ack, followers
print after). Mechanism audit: tail linked synchronously (a
sync-immediate arrival chains correctly); FIFO per entry order
(each entry awaits only its predecessor — no wait cycle except
via nesting, which the probe excludes); inner-finally
(decrement) runs before outer-finally (release), so a woken
follower always reads `in_pline == 0`; release-only tail (a
throwing holder still releases); uncontended path is zero-tick
(byte-identical interleaving to pre-SHA). Probe soundness: no
`stackTraceLimit` tampering in `js/` (default 10 both runtimes);
the only `vpline`-named frames that can appear above an inner
call are genuine ancestors-or-self (consume/gate helpers run
below/after the probe or imply true nesting), so false
positives degrade to the legacy drop (status quo, never a
hang); the one hang vector (nesting path deeper than ~8 frames
hiding the outer frame) would surface as ETIMEDOUT, and 1165
re-measure runs plus full 44 show none. Degradation analysis:
a nested entry interleaved between siblings, or an
uncontended arrival in the release→resume microtask gap, falls
back to the legacy drop — the pre-SHA behavior, never
corruption or misorder. No RNG surface (ordering only). Gap:
none. (Pre-existing doc nit, untouched: the
`vpline_flush_vision` comment says recursion-during-recalc
"takes the raw_print path" — C `:266–271` zeroes in_pline so it
prints normally; behavior matches C, comment inverted.)

## Hallucinations / overclaim

None. The D-log discloses the mechanism's boundaries (73 eager
`impossible()` sites, trailing-float-vs-nhgetch race) as noted-
not-ported with a concrete follow-up, and the tick-interleaving
analysis (stale-HP paint, stray Burdened) shows the eager-call-
untouched design was measured, not assumed.

## Density

Cliff-phase: head writer correct (message-serialization
mechanism the dropped texts name; castmu/erode_obj verified
C-exact and untouched). vpline whole on the ported path
(raw_print stays named). Ledger: `vpline ported`. Verify
bullet: moved + REACH-OK ×2 (80/80 spreads) + green + strict +
cohort + full 44 (auto on shared-file change). Not unreached:
probe moved strictly later (681→940).

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify castmu,exercise --base b4d61065d~1
--reach-all` → `verify castmu: 1 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS` (95316 PASS at HEAD — subsumes
the claimed move; the 681→940 step is corroborated by D-3831's
onward work from process_menu_window@940), `reach castmu:
146/146 → REACH-OK`, `reach exercise: 1019/1019 → REACH-OK`
(supersets of the D-log's 80/80 spreads). Zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
