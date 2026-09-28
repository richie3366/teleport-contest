# Review 1985 — 15ff0060a — options.c roleopt/initoptions cluster (D-3025)

Metadata: SHA `15ff0060a` (D-3025). Coverage cluster: 4
functions + saveoptvals by-design. Scored diff:
`js/options.js` (+122) + comment-only cfgfiles/earlyarg.
Subject promises unsaveoptstr + freeroleoptvals + initoptions
+ initoptions_finish with saveoptvals by-design.

## Intent vs deliverable

Promise: the `js/options.js:6618–6742` block in C order,
SET_IN_SYSCONF enum join, display/glyphs import extensions,
two new SAFE edges (cfgfiles, end), two stale comments
refreshed. Diff actually adds exactly that. Promise kept.

## Inventory

- `unsaveoptstr` (js/options.js:6632, file-local — correct, C
  staticfn): whole body.
- `freeroleoptvals` (js/options.js:6645, export): whole body.
- `saveoptvals` (+`restoptvals`): no symbol by design — C
  `#if 0 /* not needed */` (`options.c:797`, verified
  in-tree).
- `initoptions` (js/options.js:6668, export): whole body.
- `initoptions_finish` (js/options.js:6700, export): whole
  body.

## C ↔ JS fidelity (per function)

### unsaveoptstr — verdict: exact-C, ACCEPT

C (`options.c:775–783`, csym range):

```c
int roleoptindx = opt2roleopt(optidx);
if (roleoptvals[roleoptindx][ophase])
    free((genericptr_t) roleoptvals[roleoptindx][ophase]),
    roleoptvals[roleoptindx][ophase] = 0;
```

JS: opt2roleopt, `|0` phase, non-null guard, slot-clear for
the free (comma expr → two statements). Exact. `sym.mjs`
reports it file-local — the canonical home for a C
staticfn, not drift. Confirm.

### freeroleoptvals — verdict: exact-C, ACCEPT

C (`:786–794`, csym range): literal-4 × num_opt_phases
loops → unsaveoptstr(roleopt2opt[i], j). Constants verified:
`num_opt_phases = 7` (global.h:592–601 enum count) = JS
NUM_OPT_PHASES; ROLEOPT2OPT order = C roleopt2opt
(`:709–711`: opt_role/race/gender/alignment). Exact.

### initoptions — verdict: exact-C modulo named omits, ACCEPT

C (`:7078–7115`, csym range): `go.opt_phase != builtin_opt`
guard → SYSCF_FILE block (`:7093–7102`) → deferred_showpaths
arm → finish call. Ifdef liveness verified in config.h:
SYSCF `:233`, SYSCF_FILE `:234` both defined, so porting
(rather than omitting) the block is right. Named with loci
in this commit: initoptions_init (`:7118–7305`, 186-line
MISSING, own future row), assure_syscf_file (POSIX open +
exit, Rule #2), do_deferred_showpaths (ATTRNORETURN exit).
C `set_in_sysconf` ≡ new SET_IN_SYSCONF=0 on the global.h:581
enum line. Confirm.

### initoptions_finish — verdict: exact-C modulo named omits, ACCEPT

C (`:7323–7384`, csym range) arm by arm: `:7327` rcfile →
`:7329`+`:7341` fruit via same-file init_fruit_chain →
`:7343–7347` boulder showsyms (named: get_othersym
by-design) → `:7348` reglyph_darkroom → `:7349`
reset_glyphmap (named: CURRENT Do-not guard) →
`:7360–7363` STATUS_HILITES (config.h:616 live —
implemented incl. the `hilite_delta = 0` clear) →
`:7366` rest_on_space → `:7370–7374` tiled/ascii fallback
(comma-operator chaining mirrors C) → `:7378–7381`
ENHANCED_SYMBOLS (config.h:368 live; `2|1` =
do_custom_symbols|do_custom_colors) → `:7382–7383`
opt_initial=FALSE. `raw_printf`'s `windowprocs.name`
adapted as `?? 'tty'` with cite — reasonable. Confirm.

### Callee closure — verdict: ACCEPT

Required `sym.mjs` outputs:

```text
freeroleoptvals  js/options.js:6645   sync
initoptions      js/options.js:6668   sync
initoptions_finish js/options.js:6700   sync
```

New names join pre-existing edges (display, glyphs); the
cfgfiles + end edges are ALREADY-imported (`--can` both:
"No new edge needed"), runtime-use only. No STUB in a live
arm. No RNG in the cluster.

### Callers — verdict: all wired or named, ACCEPT

unsaveoptstr ← freeroleoptvals wired; freeroleoptvals ←
dead `#if 0` + save-freeing (no JS counterpart, named);
initoptions ← scores_only keeps its named omit (comment
updated to explain why calling now would be wrong — the
init half is unported), unixmain n/a, two comment cites;
initoptions_finish ← initoptions `:7114` wired. No unwired
live caller.

## Hallucinations / overclaim

None. Ledger honestly marks initoptions/initoptions_finish
partial rather than ported.

## Density

One-C-file cluster (4 fns + 1 by-design ruling), ≤10
functions, ~125 lines. Right-sized.

## Verification

Re-measured (all five `--base 15ff0060a~1 --reach-all`): 0
blocked each (labeled notes), REACH-OK ×5 (24/24, ~7.5s).
Zero REGRESSED. Matches the D-log.

## Actionable C-wrongs

None.

Ledger: unsaveoptstr/freeroleoptvals ported;
initoptions/initoptions_finish partial (named).
Verify lines: hidden vacuous ×5 (honest) + smoke ×5.

Verdict: **ACCEPT**
