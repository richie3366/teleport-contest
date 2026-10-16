# Review 2837 — 7005cc234 — domove ux0/uy0 write ordering

## Metadata

- SHA: `7005cc2343a83f680a01cb76056d20af3c2298aa` (D-3992)
- Cliffs-head writer: `mthrowu.c` thrwmu @c22183fa1, 8 blocks
- js/ diff: `js/cmd.js` 15 lines (2 moved + cites); new `scripts/domove-ux0-early-return.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise (subject + D-3992): JS wrote the hero trail `u.ux0/u.uy0` at
domove top, before the early-return gates; C writes it after them at
`hack.c:2780-2781`, just before bhitpos — so a failed move keeps the
stale previous-turn square that `URETREATING` reads. Move the write to
the C position; 8/8 thrwmu sessions PASS.

Diff actually: deletes the two writes at domove top (dx/dy stay),
re-inserts them immediately before the bhitpos write, fixes the stale
`:2775` bhitpos cite to `:2782-2783`, adds aFocused regression test.
No new import, no helper, no signature change. Promise == diff.

## Inventory

- `domove` (`js/cmd.js:6704`, merged C `domove`+`domove_core`): 2-line
  move only. Status: whole-move, JS `cmd.js:6803-6804`, C `:2780-2781`.

## C ↔ JS fidelity

C locus (`nethack-c/upstream/src/hack.c`, `domove_core`
`:2711-2991` via `csym.mjs`): carrying_too_much return (`:2732`),
uswallow arm (`:2734-2739`, no return — falls through), else-arm
returns (air_turbulence, impaired_movement, water_turbulence,
move_out_of_bounds, avoid_running_into_trap_or_liquid,
escape_from_sticky_mon), shared `m_at` + run-gate returns
(`:2763-2777`), then `u.ux0 = u.ux; u.uy0 = u.uy;` (`:2780-2781`)
and bhitpos (`:2782-2783`). Verified by direct read.

JS order now mirrors C return-for-return: carrying `return` at
`cmd.js:6730`, air 6752, impaired 6758/6765, bounds 6769,
trap/liquid 6770, sticky 6773, run gate 6794 — then the write at
6803-6804 and bhitpos at 6805-6807. The swallow arm (`:6737+`)
falls through to the write exactly like C's (`:2734-2739`).

Reader check: `URETREATING` is `mthrowu.c:18-19` verbatim
(`distmin(u.ux,u.uy) > distmin(u.ux0,u.uy0)`); the thrwmu gate
`rn2(BOLT_LIM - distmin(...))` sits at `:1258` exactly as cited.
The displacer-beast mux gate the D-log calls "post-write" is the
helper defined at `cmd.js:6674` but *called* at `:6824`, after the
write — execution order matches C's `:2786+` displaceu. The
"js/cmd.js:6682" cite is the def line, slightly stale, but the
"post-write" claim is true where it matters. No RNG drawn,
reordered, or removed by the move itself — the thrwmu `rn2(6)`
reappears because the gate predicate now reads the C value.

Helper classification: none added, none deleted, none re-pointed
— `sym.mjs` run not required (no symbol touched).

Diff grep: no `FORCE`/`DIAG`/`fastforward`/seed/coordinate reads;
`getRngLog` appears only in the `scripts/` regression test, not
scored `js/`.

## Hallucinations / overclaim

None. "Covering the swallow arm by fall-through exactly like C"
holds (both fall through). "dx/dy stay: C sets those in movecmd
before domove" — C `movecmd` does set `u.dx/u.dy` before calling
domove; consistent. The bhitpos cite correction `:2775`→`:2782-2783`
is accurate. D-log does not claim "Match C" on any dispatch.

## Density

Cliff phase §10.18: one cliff (thrwmu-head writer), one C locus,
whole move, code + ledger + verify + regression test in one
handoff. Right-sized. `Ledger: domove_core partial` kept with its
audited D-3432 omit — no new omit, no ledger-text padding.

## Verification

Re-measured myself on HEAD code, baseline parent:

- `hidden-proxy.mjs verify thrwmu,domove_core --base 7005cc234~1 --no-reach`
- `verify thrwmu: 8 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (all 8 baseline sessions PASS by name)
- `verify domove_core: no corpus session is blocked on it at 7005cc234~1`
  — expected: domove_core is the writer, thrwmu the owner; the D-log
  says exactly this ("domove_core no blocked + smoke 24/24").

Ship-time claim was `8 PASS, 0 moved, 0 unchanged, 0 worse` — the
re-measure is byte-identical in shape. No PASS→FAIL, no vacuous
"PASS hidden" (the owner verify names 8 real sessions). Ship-time
also ran reach 47/47 + 24/24, green, strict, cohort 7/7, full
44/44 (cmd.js is turn-loop-shared) — the full-44 precedent this
SHA set was followed by later cmd.js SHAs in this window.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
