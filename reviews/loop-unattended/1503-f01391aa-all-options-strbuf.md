# Review 1503 — f01391aa — options.c all_options_strbuf [campaign 1/7] (D-2544)

## Metadata

- SHA: `f01391aa`
- D-id: D-2544. Next index: 1503.
- Files: `js/options.js` (+216: strbuf family + 5 helper arms +
  `all_options_strbuf` skeleton).
- C locus: `nethack-c/upstream/src/options.c:9677–9748`
  (`all_options_strbuf`, 72 L).

## Intent vs deliverable

Subject promises: whole body in C order [campaign 1/7]
(MISSING → partial-live), strbuf + 5 helpers live, 5 callees +
caller named with rows. Diff actually adds exactly that, plus
the BoolOpt/CompOpt loop over an empty registry and two
unconditional bare-identifier calls. Promise matches deliverable
with one unflagged branch-semantics mistranslation (see
C-wrong 1). No RNG in C; none added.

## Inventory

- New: `strbuf_init/append/reserve/empty`,
  `all_options_msgtypes/menucolors/apes/autocomplete`,
  `savedsym_strbuf`, `msgtype2name` (file-local),
  `all_options_strbuf` — all exported except the helper;
  `sym.mjs` confirms the 5 campaign callees
  (`get_option_value`, `get_changed_key_binds`,
  `all_options_conds`, `all_options_statushilites`,
  `parsesymbols`) are ABSENT from `js/` — bare references, not
  stubs.
- New consts: `BoolOpt/CompOpt/OthrOpt` (= 0/1/2, optlist.h:19),
  `SET_IN_CONFIG/GAMEVIEW/GAME` (= 1/3/4, global.h:582–585),
  empty `allopt`/`opt_set_in_config`, `PFX_COND_IDX 245`.
- No deleted or re-pointed symbols → no clone→import audit needed.

## C ↔ JS fidelity

C `:9677–9748` vs JS: header (`yyyymmddhhmmss(0)` live),
call order key_binds/savedsym/menucolors/msgtypes/apes/
autocomplete/statushilites exact (`:9734–9741`), WIZKIT tail
exact, cond guard at index 245 exact. Ifdef resolutions
verified here: STATUS_HILITES defined (config.h:616) →
unconditional statushilites call correct; CHANGE_COLOR
commented out (windconf.h:29) → palette compiled out, no row
needed. Enum values verified against pinned headers. Menucolors
oldest-first, apes/autocomplete/savedsym empty-store shapes all
match C. The allopt-loop condition ≡ C's null-name terminator.

Campaign skeleton defense (explicitly NOT flagged): the two
bare-identifier calls (`get_changed_key_binds`,
`all_options_statushilites`) throw ReferenceError on ANY
invocation — but the function has zero JS callers (grep clean)
and C's sole caller is the unported [7/7] `do_write_config_file`
(cfgfiles.c:200) — so the throw is unreachable dead code, and
all five callees are named in the map (data.md saveoptions
section, this commit) with queued campaign rows [2/7]–[7/7]
present in LOOP-QUEUE. That is the blessed campaign pattern
(verified core + named next steps), not "dispatch ported,
callee stubbed": there is no stub, no live path, no fortress
movement. The next campaign iter must NOT "fix" this by adding
stub functions.

**C-wrong 1 (Must-fix): switch-`break` mistranslated as
loop-`break` (×2).** C `:9691–9721`: the obsolete skip
(`!bool_p || == &flags.female`) and the CompOpt setwhere gate
are `break` statements inside a `switch` — they skip the entry
and continue the `for` loop. JS has no switch (if/else chain),
so its two `break`s exit the entire `for` loop: once [2/7]
fills `allopt`, the first obsolete or non-config entry silently
truncates every later option from saved configs. Fix:
`break` → `continue` ×2 (`js/options.js`
`all_options_strbuf` BoolOpt + CompOpt arms). Doubly-dead today
(empty registry + the unconditional throw below) — which is why
it is one Must-fix line, not a rejection — but it becomes
silent data loss the moment the campaign completes, so it must
land before or with [2/7].

## Hallucinations / overclaim

None on the campaign structure — the "named with rows" claim
checks out (map section + 6 queue rows). The review, not the
D-log, caught the break/continue mistranslation; the D-log's
"whole body in C order" is otherwise accurate.

## Density

One 72-line C function + strbuf family + 5 helper arms, one
file, 216 insertions. Right-sized per §2b; a campaign step with
a live verified core (the /tmp probe exercised the helpers).

## Verification

- D-log: syntax (1 file) · rule2 · hidden 0 blocked · smoke
  24/24 REACH-OK · green 2/2 + strict ×2 · cohort 7/7 · full
  44/44 (shared options.js) → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify all_options_strbuf
  --base f01391aa~1 --reach-all` → 0 blocked both trees
  (vacuous, honestly reported) + smoke 24 PASS, 0 regressed →
  REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean. Diff grep: no FORCE/DIAG/
  getRngLog/fastforward/seed/coordinate logic.

## Actionable C-wrongs

1. `all_options_strbuf` BoolOpt/CompOpt `break` → `continue`
   (C `:9691–9721` switch-break = skip entry; JS loop-break =
   abort loop). One-iter fix; Must-fix prepended under
   LOOP-QUEUE Must-fix, CURRENT Next cluster pointed at it.

Verdict: **QUALITY-RISK**

**Addressed:** D-2547 `a2ab86c1`
