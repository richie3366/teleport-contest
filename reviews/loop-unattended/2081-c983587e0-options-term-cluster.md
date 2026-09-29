# Review 2081 — c983587e0 — options doset-term + roguesymset cluster

- SHA: `c983587e0` (D-3121)
- Subject: "`options.c` doset-term + roguesymset cluster (9 functions; CHANGE_COLOR pair by-design)"
- js/ insertions: ~135 (js/options.js) + 128 (scripts/doset-terms.test.mjs, new, 10/10 pass)
- Prior index: 2080; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: 7 same-file code functions (term_for_boolean,
string_for_opt, enhance_menu_text, doset_add_menu,
complain_about_duplicate, optfn_roguesymset, handler_sortloot
verified-whole) + 2 by-design ledger sets (all_options_palette,
count_alt_palette) + a pinning test.

Diff actually adds: exactly that — 2 new exports, 1 no-op port,
3 completions/restarts, 2 call-site rewires, 5 termpref row tags,
the allopt roguesymset optfn, and the test. Matches the promise.

## Inventory

Per function (cluster of 9):

- `all_options_palette` / `count_alt_palette` — no code.
  By-design: both live inside `#ifdef CHANGE_COLOR` (options.c
  :9656–9674, call site :9731–9733 guarded; coloratt.c
  :1033–1166), and the flag is defined only in amiconf.h
  (Amiga) + outdated macconf.h — commented out in windconf.h
  and the linux hints, absent from unixconf.h, sys/unix
  Makefiles, and all 6 contest patches. Verified, not trusted.
- `handler_sortloot` (js/options.js:6681, async export) — no
  code this SHA; verified whole vs C :6166–6203 (menu build,
  PICK_ONE, n>0 arm, perm_invent refresh). The n>1 fold
  (preselect + new-key → effective pick inside
  select_menu_pick_one) matches the helper's documented
  preselect semantics and the botl :3429 precedent.
- `term_for_boolean` (js/options.js:8956, export) — C
  :8737–8752. Live: whole body, table + gate verbatim.
- `enhance_menu_text` (js/options.js:8974, local) — C
  :10154–10180. Live: degenerate remainder (null guard; size
  arithmetic feeds only the `#if 0` TTY_PERM_INVENT arm).
- `string_for_opt` (js/options.js:10231, local) — C
  :6664–6680. Live: whole body now (missing-param arm wired
  to live config_error_add, the botl.js no-op sink).
- `complain_about_duplicate` (js/options.js:10352, local) —
  C :6789–6809. Live: stub restarted whole (MACOS9 out,
  using_alias tail, CompOpt ternary).
- `doset_add_menu` (js/options.js:8420, local) — C
  :9017–9065 (read at range; csym misses the split
  signature). Live: split-doc — get_val dispatch in callers,
  `:9060–9064` tail in helper; OthrOpt rows rewired through
  it. `:8901` + `:9050–9054` PREFIX loop named — and in fact
  compiled out (PREFIXES_IN_USE needs VAR_PLAYGROUND/
  NOCWD_ASSUMPTIONS, both absent from unix trees).
- `optfn_roguesymset` (js/options.js:3066, export) — C
  :3544–3586. Live: do_init/do_set/get_val in C order;
  read_sym_file failure arm + do_handler named (sibling
  optfn_symset precedent, ledger `partial`).

Helpers: `assign_graphics` added to the existing display.js
edge (live export :3098, sym.mjs single site — no new static
edge). `Is_rogue_level` live (const.js). `OPT_ALIAS`/
`usingAliasOpt` replicate C :503/:603/:610 (reset/match/set
sites verified). Nothing deleted or re-pointed.

## C ↔ JS fidelity

`term_for_boolean`: table (:8742–8745) and triple gate (:8749)
verbatim. Row tagging complete: the only non-Term_False rows in
optlist.h are bgcolors/idlecheckpoint/perm_invent/sounds
(Term_Off) and voices (Term_Excluded without SND_SPEECH —
`define SND_SPEECH` appears nowhere in upstream, so the :842
row is compiled; JS voices row is SET_GAMEVIEW to match).
`doset_bool_term` unification fixes two live wrongs: perm_invent
true/false → on/off and voices-true 'excluded' → 'included' —
both C-correct and pinned by the new test.

`doset_add_menu`: verified all 31 JS-listed compound rows are
set_in_game in C (indexoffset=1 exact) and all 7 Othr rows are
set_in_game (STATUS_HILITES defined, so the 7th row is live C).
Caller map :8875→:9132, :8892→:9152 exact; :8901 compiled out.

`optfn_roguesymset`: do_set store/mirror, rogue-level
assign_graphics, combined get_val ('default', ', active') all in
C order. Two disclosed deviations, both code-commented: the
:3567–3568 redraw flags are optInitial-gated though C sets them
unconditionally (shipped optfn_symset precedent verified in
place), and get_val reads a home union whose ", active" test is
broader than C's gs-only test until homes unify (corner case,
ledger `partial`). Neither is silent; neither is queued.

Callers: term :8854 / enhance :8856 / add_menu :8875/:8892
verified by reading C :8828–8902; complain's 4 sites match csym
exactly (:2758 inside CHANGE_COLOR :2694, compiled out; the
other three wired); roguesymset 0 direct refs (table-driven,
wired via allopt + doset); string_for_opt "39 call sites" is
exact (43 csym refs − decl − def − 2 patchlevel comments).

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (iteration-wide).

## Hallucinations / overclaim

One imprecise sentence: "all listed rows render identically" —
perm_invent changes (true/false → on/off). The change is toward
C and pinned by test vector, so this is wording, not a wrong.
Everything else checks: "0 blocked ×7" honestly framed as
notes, named omits all real (menu_add-style caller gaps named
per function).

## Density

9-function one-C-file cluster (the coloratt.c by-design set is
head + callee, no code), ≤10, no Must-fix bundled,
per-function Ledger + Verify lines, full 44/44 on the shared
file. Per-function verdicts: all nine ACCEPT. SHA: ACCEPT.

## Verification

Re-measured (`--base c983587e0~1 --reach-all`, all 7 in one
call + 1 confirm): 0 blocked at baseline and working tree
each, vacuous notes, smoke 24/24 → REACH-OK ×7. Matches the
D-log; no REGRESSED session. New test re-run: 10/10 pass.
Shared gates per D-log: syntax, rule2, green 2/2, strict ×2,
cohort 7/7, full 44/44.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
