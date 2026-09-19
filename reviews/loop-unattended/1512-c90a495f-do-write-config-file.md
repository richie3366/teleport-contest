# Review 1512 — c90a495f — cfgfiles.c do_write_config_file [campaign 7/7] (D-2553)

## Metadata

- SHA: `c90a495f`
- D-id: D-2553. Next index: 1512.
- Files: `js/cfgfiles.js` (+72, new), `js/getline.js` (+7:
  EXT_CMDS `saveoptions` entry), `js/options.js` (comment
  refreshes only — caller notes bare→live).
- C locus: `nethack-c/upstream/src/cfgfiles.c:168–210`
  (`do_write_config_file`, 43 L; `csym.mjs` range, cited as
  that range).

## Intent vs deliverable

Subject promises: the overwrite-gated VFS write in C order
as the final saveoptions-family activation, every callee
already live. Diff delivers exactly that: new module,
one-line dynamic dispatch entry, two comment flips. Promise
matches deliverable. No RNG in C; none added. The campaign
[1/7]–[7/7] is now fully resolvable — no bare identifier
remains on the writer path.

## Inventory

- New: `do_write_config_file()` (exported async,
  `js/cfgfiles.js`), EXT_CMDS `saveoptions` entry (dynamic
  `import()`, sibling pattern).
- Callees, all LIVE per `sym.mjs` (this iteration):
  `get_configfile` (`js/options.js:359`, sync),
  `tty_wait_synch` (`js/display.js:7303`, async — awaited),
  `paranoid_query` (`js/getline.js:1358`, async — awaited),
  `strbuf_init`/`all_options_strbuf`/`strbuf_empty` (live
  since [1/7]), `vfsWriteFile` (`js/storage.js:36`, sync),
  `pline` (display.js). No clones, no stubs.
- No deleted or re-pointed symbols → no clone→import audit.

## C ↔ JS fidelity

Body vs C `:168–210`, in order:

- `:174` `!configfile[0]` → `get_configfile() || ''` +
  falsy check, same pline text, `return ECMD_OK`. Exact.
- `:178` alert gate: C zero-init `flags.suppress_alert`
  (no JS setter exists) → `?? 0`; `FEATURE_NOTICE_VER(3,7,0)`
  recomputed from `hack.h:1504–1506` as `(3<<24)|(7<<16)`
  — verified exact here (patch<<8|0 contributes nothing).
  Three plines each followed by `wait_synch` → three
  `pline` + `tty_wait_synch`, literal text byte-checked
  (the `:183–184` two-source-line literal is one string).
  Exact.
- `:187–190` overwrite prompt: `BUFSZ - sizeof(prompt) - 2`
  (sizeof incl. NUL) → `BUFSZ - (length + 1) - 2`; `%.*s`
  truncation → `slice(0, N)`. Exact.
- `:191–192` `!paranoid_query(TRUE, tmp) → ECMD_OK`. Exact.
- `:194–209` fopen block: VFS boolean stands in for `fp`
  (Rule #2 — no fopen); the silent `fopen`-failure path is
  preserved (false → skip → `ECMD_OK`, C has no message
  there either). `strbuf_init` → `all_options_strbuf` →
  `strlen` → `fwrite`+`fclose` → `strbuf_empty` order kept.
  The `:205–208` partial-write pline is map-named as
  unrepresentable (atomic VFS writes) — honestly disclosed,
  not silently dropped.
- Caller: C's only reference is the extcmdlist row
  (`cmd.c:1843–1845`, data table — which is why `csym.mjs
  --callers` prints 0 function references). JS wires it as
  an EXT_CMDS entry with `wiz:false, autocomplete:false`,
  matching the row's `IFBURIED|GENERALCMD|NOFUZZERCMD`
  (no key, no AUTOCOMPLETE) and the sibling `save` entry
  convention. `imports.mjs --can` on the new
  cfgfiles.js→options.js edge: safe (calls happen inside
  the async body; the getline.js dispatch is dynamic).

## Hallucinations / overclaim

None. The "VFS boolean for fp" and "partial-write named"
claims are both accurate as far as they go; the D-log does
not pretend the partial arm is tested.

## Density

One 43-line C function + dispatch, ~80 insertions across 3
files. Right-sized per §2b; closes the 7-step campaign.

## Verification

- D-log: `verify.mjs --fn do_write_config_file` → VERIFY:
  PASS.
- Re-run here: `hidden-proxy.mjs verify do_write_config_file
  --base c90a495f~1 --reach-all` → 0 blocked both trees
  (vacuous, honestly reported) + smoke 24 PASS, 0 regressed
  → REACH-OK. Matches; the path is reachable only via the
  new extended command.
- `imports.mjs --rulecheck`: clean (re-run this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates
  or hardcoded coordinates. No `fs` import — VFS only.

## Actionable C-wrongs

None. Body, macro arithmetic, prompt truncation, caller
flags, and all callees check out against pinned C; the one
unrepresentable arm is map-named.

Verdict: **ACCEPT**
