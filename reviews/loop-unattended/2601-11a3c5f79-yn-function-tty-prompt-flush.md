# Review 2601 — 11a3c5f79 — yn_function-head writer tty_yn_function prompt flush (D-3731)

Metadata. SHA `11a3c5f79` (2026-10-09), D-3731, parent `326c32ee2`
(architect §10.19 take). js diff: `js/display.js` +32/−? (new
exported `vpline_flush_vision` + extraction), `js/getline.js` +7/−1
(import name + one call); new `scripts/tty-yn-vision-flush.test.mjs`.
Ledger: `tty_yn_function` partial (D-3731 appended, omit kept). No
prior review claimed closed.

## Intent vs deliverable

Promise (subject + D-log): cliffs-head `yn_function` (8 scen-chain
sessions, screen-kind at the slime-death "Die? [yn] (n)" prompt, 1
stale monster-glyph cell) — writer is `topl.c` `tty_yn_function`:
both prompt arms paint via `custompline` → `vpline`, whose
`:266–271` sequence flushes a pending `vision_full_recalc` before
`flush_screen`/`putmesg`; JS never flushed at the prompt, so the
polymon-blindness recalc stayed pending and the stale glyph survived.
Backed by a temp-C stderr measurement (SEEMON/NEWSYM/VISRECALC/DONE
trace, reverted + rebuilt) and a JS replay probe. Claimed:
3 PASS + 5 moved, REACH-OK, full 44/44.

Diff actually adds: `vpline_flush_vision()` export in display.js
(extracted from `pline_after_consume`'s inline block, which becomes
one call), plus one `vpline_flush_vision()` call in getline.js
`tty_yn_function` before the initial `paint()`. Same-edge import-name
addition only. Promise and diff match.

## Inventory

New/changed JS functions (2):

- `vpline_flush_vision` — `js/display.js:9337` (new export).
  C: `nethack-c/upstream/src/pline.c:266–271` (vpline recalc block).
- `tty_yn_function` — `js/getline.js` (~:2146; one call + import).
  C: `nethack-c/upstream/win/tty/topl.c:364–551`
  (`csym.mjs` range), custompline at `:420` (resp) and `:425`
  (non-resp), repaints via `addtopl` (`:442,458`).
- C glue: `custompline` → `vpline` (`pline.c:296–308`).

Ledger line present: `tty_yn_function` partial, `at` bumped,
standing D-3465 omit kept. `vpline_flush_vision` needs no ledger row
(it is vpline's `:266–271` under a shared name, not a new C function).

## C ↔ JS fidelity

C `topl.c:420` and `:425` (verified by line read): both arms call
`custompline(OVERRIDE_MSGTYPE | SUPPRESS_HISTORY, "%s", prompt)`;
the non-resp arm then `readchar()`s and jumps to `clean_up`.
`custompline` (`pline.c:296–308`) sets `pline_flags` and calls
`vpline`. C `vpline:266–271` (verified by grep):

```c
if (gv.vision_full_recalc) {
    int tmp_in_pline = in_pline;
    in_pline = 0;
    vision_recalc(0);
    in_pline = tmp_in_pline;
}
```

followed by `if (u.ux) flush_screen(...)` and `putmesg(line)`.

JS `vpline_flush_vision` (`display.js:9337–9347`): identical
statements over `game.vision_full_recalc` / `_vpline_in_pline` /
`vision_recalc(0)`, wrapped in try/finally. The finally is a
faithful hardening (C has no exceptions; on the non-throw path the
statement order matches call-for-call). Extraction check: the
replaced inline block in `pline_after_consume` held the same
statements; the call site keeps the C order (flush → `flush_screen`
`:277–278` → `putmesg`). Hot path unchanged — pure extraction.

Placement check (both resp arms): the getline.js call sits before
`await paint()` and before the `if (!resp)` split, so resp and
non-resp paints both flush — matching C, where both arms funnel
through `custompline` → `vpline`. Repaints via
`restorePrompt`/`addtopl` are untouched in the diff, matching C's
`addtopl` repaints (`:442,458`, no vpline). Correct.

Cite correction (good): the old inline comment cited `:270–276`;
the new cite `:266–271` matches pinned C exactly. The commit fixed
drift, not introduced it.

No RNG in this arm on either side; branch order preserved.

Clone classification: `vpline_flush_vision` is a C-sequence
extraction (LIVE, body ports C), not a clone or stub. Callee
`vision_recalc` LIVE (pre-existing import). No STUB in the arm.

`sym.mjs` (new export; nothing deleted or re-pointed):

```text
vpline_flush_vision js/display.js:9337   sync
```

Single definition, exported once. Import check:
`imports.mjs --can getline.js display.js vpline_flush_vision` →
"ALREADY: getline.js already statically imports display.js" —
confirms the same-edge claim; no cycle/TDZ question.

C callers of `tty_yn_function`: `csym.mjs --callers` reports 0
static references — expected (window-proc table dispatch, `yn_function`
→ tty proc). JS caller chain unchanged (call added inside the
existing prompt function, not a new wiring).

## Hallucinations / overclaim

None. "Writer, not owner" is stated in the D-log's hidden note
(`tty_yn_function` blocks 0 — honest, matches the region-heuristic
screen owner). Movement is claimed on `yn_function`, the row's owner,
with per-session targets listed. Named omissions are explicit and
scoped (standing ledger omit stays; getlin/getdir/menu prompt paths
are other C files' future rows). The C measurement is described with
its revert discipline; probes stayed in /tmp (no stray files in the
diff — verified via `--stat`).

Diff grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or
coordinate/seed conditionals. Rule #2: clean (re-verified this
audit on the current tree; this SHA adds only an import name + call).

## Density

Cliff-phase §2b: at the parent commit the generated cliffs head is
`cmd.c yn_function` — 8/1113 sessions, RNG lost 329712, top row
(verified via `git show 326c32ee2:docs/LOOP-QUEUE.md`). This commit
works its HEAD's cliffs head through the writer the divergence names
(screen owner + identical toplines = region heuristic; value writer
is the prompt flush) — textbook §10.18/§10.19. One cliff, one
writer arm, code + ledger + verify in one handoff. Not a batch, not
an idiom sweep, not a successor lead. Full 44/44 run (shared files
changed) — correct gate for display/getline edits.

## Verification

D-log Verify (`verify.mjs --fn tty_yn_function,yn_function`):
syntax PASS, rule2 PASS, hidden writer-note, reach smoke 24/24 ×2 →
REACH-OK, `yn_function`: 3 PASS + 5 moved + 0 worse → PROGRESS, green
2/2, strict ×2, cohort 7/7, full 44/44 → VERIFY: PASS. Moved-target
integrity quoted (4 screen-moved kept full RNG; Priest rngM
unchanged). Focused test 0/1 → 1/1.

Re-measured by this audit
(`verify yn_function,tty_yn_function --base 11a3c5f79~1 --reach-all`;
`js/display.js` + `js/getline.js` untouched between this SHA and
HEAD, so the re-run is valid for this function):

```text
verify yn_function: 6 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
smoke yn_function: ... 24 PASS, 0 regressed → REACH-OK
verify tty_yn_function: ... 0 session(s) blocked on it ...
smoke tty_yn_function: ... 24 PASS, 0 regressed → REACH-OK
```

Per-session: 5 named PASS (Barbarian-95427, Healer-95407/95430/95434,
Ranger-95429/95437 — six PASS lines) plus Priest-95402 →
auto_describe@835 (was 62) and Ranger-95416 →
process_menu_window@57 (was 46): strictly later steps, 0 worse, 0
regressed. Better than the ship-time 3+5 because later SHAs advanced
three sessions to PASS — that strengthens, not weakens, the claim
(movement presented at ship time was real; nothing regressed since).
No vacuous check (row cited 8 blocks; all 8 accounted for).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
