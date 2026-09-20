# Review 1625 — 0c0acef3 — light.c write_ls whole-body port (D-2666)

**Metadata:** SHA `0c0acef3`, `light.c` `write_ls` +
`whereis_mon` (both dead callees), D-2666. JS:
`js/light.js` (+131: flags, `whereis_mon`,
`write_ls`) + `js/lev_json.js` (import + `serLight`
delegates + Null skips at 3 call sites).

## Intent vs deliverable

Subject promises: serialize one light source with the
pointer→id fixup + chain verification, wired into
`serLight`. Diff delivers exactly that. Promise matches
deliverable.

## Inventory

- `whereis_mon(mon, fmflags)` (light.js:344, sync,
  file-local — matches C `staticfn`).
- `write_ls(ls)` (light.js:385, sync, exported — C is
  `staticfn`, exported here because the JS save writer
  lives in lev_json.js; D-log names the sites).
- `LSF_IS_PROBLEMATIC` const; `FM_YOU/FMON/MIGRATE/
  MYDOGS` join the const.js import. Callees LIVE:
  `find_oid` (shk.js:4907, sync),
  `find_mid` (mon.js:3462, sync, `(mid, _fm)` — flag
  passed, fmon-only body is the named standing omit).
  `--can lev_json.js light.js write_ls` → ALREADY (no
  new edge). No deletions, no clones.

## C ↔ JS fidelity

C loci read in full: `write_ls :633–702` (70 L, body
above), `whereis_mon :397–417` (21 L). No RNG. Confirm:

- `whereis_mon`: FM_YOU → FMON → MIGRATE → MYDOGS
  identity scans in C order, `return 0 :416` ✓; flag
  values byte-equal to hack.h:1294–1298 (checked both
  sides) ✓; `!mon → 0` is C-equivalent (C links never
  Null-match) ✓; Array-vs-`nmon` shaping named ✓.
- `write_ls`: type gate (bad-type → impossible + no
  write; JS Null skipped by all 3 callers) ✓;
  NEEDS_FIXUP arm writes untouched ✓; OBJECT arm
  (`arg_save`, `a_uint`, `find_oid` check → impossible
  + PROBLEMATIC `:646–654`) ✓; MONSTER arm
  (`whereis_mon(FM_EVERYWHERE) :674` before reading
  `m_id`, `find_mid(id, monloc) :677`, DEADMONSTER
  `mhp<1 :678–681`, dangling-ptr else `:684–687`) ✓;
  PROBLEMATIC TODO no-op `:690–691` ✓; NEEDS_FIXUP set
  `:693`, record ≡ `Sfo_ls_t :694` (JSON VFS per
  §1.5/§1.6, named), pointer restore `:695`, both flags
  cleared `:696–697` (net zero — scratch-probed) ✓.
- OMITs all named in-commit: binary layer, `zeroany`
  collapse, `%u`-via-template, Null-id guards, fmon-only
  `find_mid`.

## Hallucinations / overclaim

None.

## Density

Breadth phase: one-function port + 3 call-site
rewires, 2 files — right-sized.

## Verification

D-log Verify bullet claims PASS (syntax 2 files ·
rule2 · hidden note · REACH-OK smoke 24/24 · green ·
strict · cohort 7/7 + scratch probe ALL-OK). Re-
measured here: `hidden-proxy.mjs verify write_ls
--base 0c0acef3~1 --reach-all` → 0 blocked both sides
(vacuous note, correctly labeled coverage row) + smoke
24/24, 0 regressed → REACH-OK. Claim true. Diff grep: 0
hits for FORCE/DIAG/getRngLog/fastforward/coordinate
reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
