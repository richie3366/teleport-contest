# Review 2269 — bdd35be25 — monst_globals_init erinys-reset Must-fix

Metadata: SHA `bdd35be25703b2797d6f5a756321b84b99906b7d`
(D-3311, 2026-10-02). Closes review 2266 QUALITY-RISK Actionable 1.
`js/monsters.js` (+8/−7: one added call + doc rewording),
`scripts/monst-globals-init.test.mjs` (new, 39 lines). Must-fix ships alone.

Intent vs deliverable: subject promises the missing erinys-reset
effect inside `monst_globals_init` plus corrected doc wording. The diff
adds exactly one statement — `reset_erinys()` inside
`monst_globals_init()` — rewrites the falsified "immutable baseline /
only channel / sole writers" comment to name both channels, and adds a
2-case node:test regression file. Delivers the shape it promises;
no scope creep, no caller changes.

Inventory:

- `monst_globals_init()` (js/monsters.js:220–223 at SHA): unchanged
  overlay clear plus same-module `reset_erinys()` call.
- No new export, no deleted symbol, no import edge added or removed,
  no clone created. `reset_erinys` is a pre-existing same-module
  `export function` declaration (hoisted — no TDZ risk from the call).
- `scripts/monst-globals-init.test.mjs`: adj_erinys(60)→init→baseline
  round-trip + overlay-clear arm.

**C ↔ JS fidelity**:

C body (`csym.mjs monst_globals_init`):
nethack-c/upstream/src/monst.c:71–76 —
`memcpy(mons, mons_init, sizeof mons)`. No branches, no RNG, no
callees. C callers (`--callers`): allmain.c:42, makemon.c:1841,
makedefs.c:306 (util/ build tool, by-design). Both live sites were
wired in D-3308 (jsmain.js:133, makemon.js:883); this SHA touches
neither — correct, the fix is purely in the function body.

The C-wrong from 2266: C's memcpy resets `mons[PM_ERINYS]`, which
live game code rewrites in place via `adj_erinys` (mon.c:5918–5966:
mflags1, mattk[0..2], mlevel, difficulty). JS models erinys outside
the `pm_fixup` overlay — `adj_erinys` (js/monsters.js:288 at SHA)
mutates the generated baseline arrays in place — so the overlay-only
clear left the boost in place. Fix restores the second channel.

Completeness of the restore, field-by-field against the writer at
this SHA: `adj_erinys` writes exactly four baseline slots —
`mflags1s[PM_ERINYS]` (`|=` at six abuse gates), `mattks[PM_ERINYS]`
(`[0].damn`, full `[1]`, full `[2]`), `mlevels[]`, `difficulties[]`.
`reset_erinys()` restores all four from the module-load `ERINYS_BASE`
snapshot, and the `mattk` loop runs over the full
`ERINYS_BASE.mattk.length` with `Object.assign`, so every attack slot
is a full-struct restore, not a 3-slot partial. `mons()` reads
mlevel/mflags1/mattk/difficulty straight from the baseline arrays
(no overlay for those fields) while the overlay covers only
msound/mflags2/mflags3/maligntyp, which `adj_erinys` never writes —
so overlay-clear + erinys-reset is jointly a full `mons[]` restore.
The `game.mvitals` exclusion stands on the D-3308 analysis (genocide
state lives in `svm.mvitals[].mvflags`, never in `mons[]`).
Branch-by-branch confirm: the one-statement fix plus the pre-existing
helper exactly implement the one-statement C body over the two
divergence channels. No gap.

Hallucinations / overclaim: none. The D-log's previous false claims
("sole live writers", "only divergence channel", "immutable
baseline") are the words this SHA deletes; the replacement comment
names both channels with C cites (role.c:2029–2056, mon.c:5918–5966)
that match the ranges 2266 verified. "Whole C body live (overlay
clear + erinys reset ≡ memcpy)" is now accurate. The "no-op at both
wired sites" note repeats 2266's own mitigation finding (clean erinys
at dump_mongen and newgame/restore) rather than inventing coverage.

Density: Must-fix ships alone per rule — 8 insertions is below the
~80 bar and defended in the D-log on the D-3308 precedent (monst.c is
a single-function file, 0 C callees, nothing more Open to grow with).
One `Ledger:` entry (`monst_globals_init ported`), one Verify line.
Correct density call; bundling more here would have violated the
Must-fix-alone rule.

Verification: D-log claims hidden vacuous note + REACH-OK (smoke
24/24), green 2/2, strict ×2, cohort 7/7, full 44/44, plus
/tmp/erinys-init-probe PASS (was FAIL pre-fix) and the new test 2/2.
Re-measured at HEAD: `hidden-proxy.mjs verify monst_globals_init
--base bdd35be25~1 --reach-all` → "0 session(s) blocked on it (0 at
baseline, 0 in the working scoreboard)" + the explicit vacuous note +
"smoke … (24 run): 24 PASS, 0 regressed → REACH-OK". Both summary
lines match the D-log; the queue row cited 0 blocks, so the vacuous
shape is legitimate here, not the D-1831 false-PASS shape. I ran the
new test myself: `node --test scripts/monst-globals-init.test.mjs` →
2 pass, 0 fail. Diff grep: no FORCE/DIAG/getRngLog/seed names/
fastforward/coordinates. `imports.mjs --rulecheck` over scored `js/`:
"Rule #2 clean". No seed/step/coordinate reads added.

**Actionable C-wrongs**: none. Review 2266 Actionable 1 is fully
addressed: the call is in, the wording is corrected, and the probe
(adj_erinys(60)→init→baseline) passes. The Must-fix row was already
checked off and archived by the port iteration; no queue action owed.

Verdict: **ACCEPT**
