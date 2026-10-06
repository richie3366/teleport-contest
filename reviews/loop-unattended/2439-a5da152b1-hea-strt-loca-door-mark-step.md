# Review 2439 — a5da152b1 — Hea-strt/Hea-loca des.door :4661 campaign step

**Metadata.** SHA `a5da152b1` (2026-10-06, D-3554). Type: legacy breadth-phase
Open-head + campaign step (landed before the cliff-phase process commit
`aa9ebd345`; judged under §10.17 rules, not §10.18). `js/` insertions: 17
(2 closures + doc lines in `js/mklev.js`); 1 new test file
(`scripts/lspo-door-hea-strt-loca-spmap.test.mjs`, 146 lines).

## Intent vs deliverable

Promise (subject + body): "impossible audit + Hea-strt/Hea-loca des.door
:4661 game-mark campaign step (16 sites, 2 bitmaps C-complete)" — the D-3552
Next step, same recipe, per-loader des verification this iter, provably
neutral (no whole-set read, no reader on these paths).

Diff actually adds: the guarded `g.SpLev_Map.add(...)` mark (C `:4661`) in
the `heaDoor` (load_hea_strt) and `heaLocaDoor` (load_hea_loca) closures, in
C order between the `:4660` doormask write and the flags mirror; `:4660`
cites; des line cites; `sel_set_door` + loader doc close-out lines; the new
test suite. No other JS function added or changed. Promise matches diff.

## Inventory

| # | Function / unit | Status | JS locus | C range |
|---|----------------|--------|----------|---------|
| 1 | `impossible` (audit only, no JS change) | audited | [display.js](/home/debian/dev/teleport-contest/js/display.js:8971) | pline.c:583–634 (`csym.mjs`) |
| 2 | `sel_set_door` :4661 campaign sites (Hea-strt 12 + Hea-loca 4) | ported (inlined closures) | [mklev.js](/home/debian/dev/teleport-contest/js/mklev.js:10707) `heaDoor`, `:10856` `heaLocaDoor` (at-SHA lines; current tree shifted) | sp_lev.c:4646–4662 (`csym.mjs`) |

## C ↔ JS fidelity

**`sel_set_door` (sp_lev.c:4646–4662).** C body, in order: typ-from-arg;
coord-form x/y; `IS_DOOR`/`SDOOR` typ fix-up; `D_SECRET` strip + clamp to
`D_CLOSED`; `set_door_orientation(x, y)` (:4659); `doormask = typ` (:4660);
`SpLev_Map[x][y] = 1` (:4661). The JS closures emit: typ fix-up, orientation
(:4659 cite), doormask (:4660 cite), guarded set-add (:4661 cite), flags
mirror. Branch order matches. The `D_SECRET` arm is absent from both
closures — correct on these paths: all 16 des sites are `locked`/`closed`
(verified below), so the arm is unreached; the live `sel_set_door` (untouched
by this SHA) carries the general case. No RNG in C; none in JS. No helpers
added: no clone/stub/omit classification needed beyond the pre-existing
established split (inlined closures, named in the D-entry).

Des evidence re-verified against pinned dat (not taken from the D-log):
`Hea-strt.lua:44` stair + `:50–61` exactly the 12 claimed doors in the
claimed order; `Hea-loca.lua:28–31` exactly the 4 claimed doors, `:33/:34`
the up/down stairs; zero `des.mazewalk`/`des.drawbridge`/`des.ladder` in
either file; all doors coord-form; `Hea-goal/fila/filb.lua` carry 0
`des.door`. JS call sites at-SHA: 12 `heaDoor(...)` in des order
(`sed -n` on `a5da152b1:js/mklev.js`), 4 `heaLocaDoor(...)` (asserted
in-test, suite green). Stair/door des order kept on both sides. The
`if (g.SpLev_Map)` guard mirrors C's unconditional write given
`splev_level_init` (C :6366) creates the set before the doors run — the same
guarded idiom as the 10 prior accepted campaign steps.

**`impossible` (pline.c:583–634, audit).** JS body read whole
([display.js](/home/debian/dev/teleport-contest/js/display.js:8971)): recursion fatal :591–592
(throw idiom) before the latch; latch :593; vsnprintf chop :595–597;
paniclog :598 named (filesystem, Rule #2); fuzzer panic :599–600; URGENT
pline :602–604; sanity early-return :606–610; disorder/report/support
:612–619 with the non-NULL empty-string pointer test; CRASHREPORT :621–631
named as a unit (yn/raw_print/network); latch clear. Arm census matches the
D-log exactly; the `audited` declaration is true.

## Hallucinations / overclaim

None. The commit says "VERIFY: PASS" with "2× hidden note (none blocked —
normal; rows cited none)" — it does not claim a corpus PASS or movement, and
the rows cited none. "2 bitmaps C-complete" is scoped to the four C writer
sites (:4189/:4661/:5760/:6292) with :5760 correctly absent (no drawbridge in
either des file). Neutrality proof enumerates whole-set reads and readers;
the test asserts the load-bearing halves (no mazewalk/drawbridge/solidify,
no `for (const key of sp)` in either body).

## Density

Legacy §10.17 unit: Open-head row (`impossible`) + campaign step, 2
functions, `Left open: none`, one Verify line per function via
`verify.mjs --fn impossible,sel_set_door`, sweep line present (full 44/44).
No manifest (no `batch --write`; disclosed in the D-entry). Per-function
verdicts: `impossible` ACCEPT (audit true); `sel_set_door` sites ACCEPT
(des evidence exact, C order exact). SHA verdict is the worst: ACCEPT.
(Process note, not a C-wrong: the playbook later closed this 10-step
des.door campaign as moving 0 sessions — breadth-phase campaigns are now
superseded by §10.18; this SHA was legitimate under the rules at its time.)

## Verification

- Grep of the `js/` diff for `FORCE|DIAG|getRngLog|fastforward`: clean.
- `node scripts/imports.mjs --rulecheck`: "Rule #2 clean: no bare/node
  specifiers or fs calls in js/." (whole scored tree, this iteration).
- `node --test scripts/lspo-door-hea-strt-loca-spmap.test.mjs`: 6/6 pass
  on this tree.
- Re-measure (mine):
  `hidden-proxy.mjs verify sel_set_door,impossible --base a5da152b1~1 --reach-all`
  → `verify sel_set_door: 0 session(s) blocked`; smoke 24/24 PASS, 0
  regressed → REACH-OK; `verify impossible: 0 session(s) blocked`; smoke
  24/24 PASS, 0 regressed → REACH-OK. No REGRESSED session. The D-log's
  "none blocked" claim is true, not vacuous-PASS dressing.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
