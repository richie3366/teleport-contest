# Review 892 — 7868cc8b — mintrap dispatch body (D-1922)

Metadata: SHA `7868cc8b`, D-1922. Files: `js/trap.js` (+83/−28:
trapped-arm escape/chew, fresh-arm gates, unhide envelope).
Map-driven Open row, 0 corpus blocks cited. Next index 892.

Intent vs deliverable: subject promises the trapped-arm escape
gate, boulder arm, `easily` adverb, metallivorous chew, fixed-tele
force, usteed/Sokoban skips, `setmangry`, mutated-flags threading,
and the unhide+appears envelope. The diff delivers all nine.
Promise ≡ diff.

Inventory: no new helpers (reuses file-local `m_easy_escape_pit`/
`sobj_at`/`conjoined`-family and existing edges). New imports all
LIVE on existing edges: `sym.mjs setmangry` → `js/mon.js:1120
ASYNC` (awaited), `sym.mjs maybe_unhide_at` →
`js/monmove.js:1142 ASYNC` (awaited; `--can` → edge ALREADY
exists), `sym.mjs Amonnam` → `js/do_name.js:1132 sync`
(canonical import, not clone #7 — the six pre-existing clones
elsewhere are untouched). No stub, no new omit. The known gap —
dead pit-fiend identity arm in the pre-existing helper (`data ===
mons[PM_PIT_FIEND]` indexes the `mons()` function → undefined) —
is queued as its own Open row, not hidden; the `msize>=MZ_HUGE`
arm works (probe-confirmed).

**C ↔ JS fidelity** (`csym mintrap` → `trap.c:3732-3840`, plus
`csym m_easy_escape_pit` → `:3725-3730`, both read in full):
seetrap gate, `!rn2(40) || (is_pit && easy)` short-circuit, boulder
`!rn2(2)` + `fill_pit` (stays trapped on failure), `set_msg_xy` +
`easily` ternary, bear-trap eat (`deltrap`, `meating=5`,
`mtrapped=0`) vs spiked-pit munch (`ttyp=PIT`, keeps `mtrapped`),
`metallivorous(mptr)` read position, `trap_result` fold — exact.
`m_easy_escape_pit` is a pure predicate (no RNG), so C's double
call (gate + message) is RNG-safe and the JS double call mirrors
it. Fresh arm: flag parsing, fixed-tele mutation threaded to both
`check_in_air` and the selector (local `trflags` copy ≡ C param
mutation), usteed skip, Sokoban skip with the repo idiom,
`floor_trigger`/`already_seen && rn2(4)` gates, `mon_learns_traps`
+ `mons_see_trap`, `madeby_u && rnl(5)` → `setmangry(…,false)` —
exact. Unhide envelope with `(mhp|0)>0` ≡ `!DEADMONSTER`
(`mhp<=0`). RNG order preserved end to end. The probe is a true
falsifier (pre-fix huge-in-pit stuck 97.5%; chew arm state effects
exact; in-air gate fires before trap learning).

Hallucinations / overclaim: none. No corpus claim; probe labeled
with exact observed values.

Density: 111-line single-function body — right-sized per §2b.

Verification: re-measured `hidden-proxy verify mintrap --base
7868cc8b~1` → `0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)` — vacuous as stated, nothing owed.
`imports.mjs --rulecheck` → Rule #2 clean (HEAD). D-log gates:
green 2/2 + strict ×2, cohort 7/7. Diff grep: no FORCE/DIAG/seed/
coordinate patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
