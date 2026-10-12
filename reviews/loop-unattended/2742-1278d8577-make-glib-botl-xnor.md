# Review 2742 — 1278d8577 — make_glib botl XNOR

Metadata: SHA `1278d8577`, D-3885, `js/potion.js` only (+ focused test
`scripts/make-glib-botl.test.mjs`), 1 function. Cliff-phase writer fix.

Intent vs deliverable: subject promises the `:464` botl arm is XNOR
(`!Glib ^ !!xtime`), JS tested XOR, and the fix moves Barb-582613 s1083
(HP:0(0) stale paint) to PASS. Diff actually adds: one predicate flip
`was !== now` → `was === now` + a 4-line C cite comment. Promise = diff.

Inventory: `make_glib` (js/potion.js:880) — changed, predicate only.

C ↔ JS fidelity: C `nethack-c/upstream/src/potion.c:460-468` (via
`csym.mjs`): `disp.botl |= (!Glib ^ !!xtime); set_itimeout(&Glib,
xtime); if (uarmg) update_inventory();`. Truth table: C sets botl iff
`(!Glib) != (!!xtime)`. JS `was=!!intrinsic`, `now=!!xtime`,
`was === now`. All four cells agree (0,0→set; 0,+→clear; +,0→clear;
+,+→set). `Glib` macro is `u.uprops[GLIB].intrinsic`
(youprop.h:112), which is exactly what `glib_uprop(u).intrinsic` reads —
no extrinsic/intrinsic mismatch. Rest of the JS body already whole:
`set_itimeout` equivalent (`p.intrinsic` TIMEOUT rewrite + `HGlib`/`Glib`
flats), `u.uarmg → update_inventory()`. 14 C call sites
(`csym --callers`, apply/polyself/sit/timeout/…): JS keeps the same
export/signature; caller wiring untouched. No RNG in the body; branch
order trivially C-exact.

Hallucinations / overclaim: none. D-log is explicit that the corpus
verify ran on `do_statusline2` (the blocked owner), not `make_glib`
(`note hidden verify make_glib (0 blocked)`), and names the
different-writer no-movement session (Priest-582714, later fixed by
D-3891). No "Match C" dispatch-over-stub shape: the callee
`update_inventory` is live.

Density: cliff-phase writer commit, one C function whole, one probe
session named, movement claimed. Owner-vs-writer resolved correctly
(screen-owner `do_statusline2` is the region heuristic; writer is the
botl arming in `make_glib`, polyself.c:852 call path). Ledger entry
present (potion.c.jsonl touched). Not unreached work: session-reaching.

Verification: re-measured myself. `verify make_glib --base 1278d8577~1`:
0 blocked at baseline — vacuous, as the D-log itself says. `verify
do_statusline2 --base 1278d8577~1 --reach-all`: 2 blocked at baseline,
both PASS on current code (`scen-sweep-Barbarian-582613: PASS`,
`scen-sweep-Priest-582714: PASS`), `2 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS`, smoke 24/24 REACH-OK. The D-3885 movement claim
(Barb-582613 PASS) reproduces; no REGRESSED row. Rule #2:
`imports.mjs --rulecheck` → clean across scored `js/`. No symbol
delete/re-point, so no `sym.mjs` output required. No FORCE/DIAG/seed/
coordinate reads in the diff.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
