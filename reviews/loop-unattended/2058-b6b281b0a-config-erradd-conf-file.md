# Review 2058 — b6b281b0a — config_erradd in_lua arm + parse_conf_file (D-3098)

Metadata: SHA `b6b281b0a`, D-3098, 2-function cfgfiles.c cluster.
js/cfgfiles.js (+38/−7).

## Intent vs deliverable

Promise: port config_erradd's in_lua error-list arm + export the
string-fed parse_conf_file (rename of local parse_conf_text) and
rewire read_config_file. Diff delivers exactly that (+ dupstr
import, + module-level configErrorMsg list). Promise kept.

## Inventory (per function)

- `config_erradd` (extended js/cfgfiles.js:275): new in_lua arm —
  prepend `{line_num, errormsg: dupstr(text), next}` to the new
  module-level `configErrorMsg` list (C `:1467` file-static,
  verified). Callee dupstr LIVE sync (dungeon.js:264,
  NUL-truncate ≡ C) ✓. No clones/stubs/deletions.
- `parse_conf_file` (renamed+exported :1057, body untouched):
  init / free / fgets-replay loop with pbreak / done / free /
  return rv — C order :1848–1859 ✓. Old name has zero stragglers
  (`sym.mjs parse_conf_text` → NOT FOUND) ✓.

## C ↔ JS fidelity (per function)

config_erradd (C cfgfiles.c:1543–1589): the in_lua arm
`:1566–1574` — alloc ≡ object literal, `next` captures the old
head before reassignment (≡ C's field-then-head order) ✓,
`line_num` from configErrorData ✓ (unguarded deref both sides —
C would segfault on null too; and nothing sets in_lua today, so
the arm is currently unreachable in JS), `dupstr(text)` ≡
`dupstr(buf)` (text already carries C's Unknown-error
substitution) ✓, early return ✓. wait_synch `:1562` stays named
(windowed input boundary, pre-existing) ✓; the l_get_config_errors
drain (lua-stack sink, nhlua.c:1887) is named with the no-Lua-state
precedent ✓. No RNG. Confirm.

parse_conf_file (C :1843–1860): rename-only change; loop replays
fgets(inbufsz−1) chunking with newline-included ✓, pbreak ✓,
done/free/rv ✓. FILE*→text is the required Rule #2 adaptation.
Callers: C :1638 read_config_file → js/cfgfiles.js:1091 wired ✓;
files.c:2594 read_wizkit keeps its parse_wizkit_text subset clone
(files.js:119, live use :192 — named review-154 debt) ✓;
files.c:2646 read_sym_file MISSING in JS (only a map-named comment
— named, own future row) ✓. config_erradd's C caller :1889 →
js :310 ✓. No RNG. Confirm.

`sym.mjs` output (Method §3 — rename, no deletions):

```text
dupstr           js/dungeon.js:264   sync
config_erradd    js/cfgfiles.js:275   sync
parse_conf_file  js/cfgfiles.js:1057   sync
parse_conf_text  NOT FOUND (clean rename)
```

`imports.mjs --can cfgfiles→dungeon dupstr` → ALREADY (edge
pre-exists; D-log "SAFE" overcautious, harmless).

## Hallucinations / overclaim

None. The "callee closure verified whole" claim (dupstr gap
unreachable, free_config_sections, cnf_parser_done) is consistent
with the code read.

## Density

One C file, 2 functions (one arm + one rename-export), ~30 js
insertions — below the ~80 line with a real excuse (head's file
holds no further Open row; closure verified). `Ledger:`
partial + ported ✓. Per-function: both ACCEPT → SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify
  config_erradd,parse_conf_file --base b6b281b0a~1 --reach-all`:
  both `0 blocked (0/0)` + `smoke 24/24, 0 regressed →
  REACH-OK`. Matches; honestly vacuous.
- Ban-grep: 0. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
