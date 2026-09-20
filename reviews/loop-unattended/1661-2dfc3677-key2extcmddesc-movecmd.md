# Review 1661 — 2dfc3677 — `cmd.c` key2extcmddesc whole body + live movecmd (D-2702)

Metadata: commit `2dfc3677`, D-2702, `js/dokeylist.js` (+61) + `js/pager.js` (+105/−restored table). Pops the first Open-coverage row. No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole C body of `key2extcmddesc` + live `movecmd`. Diff actually restarts the thin 36 L hardcoded table as a ~70 L C-order port and adds `movecmd` + shared `MISC_KEYS`/`SPKEYS_DEFAULT` exports. Promise matches deliverable.

## Inventory

New/restarted JS: `key2extcmddesc` (`js/pager.js`), `movecmd` (`js/dokeylist.js:313`, sync export), `MISC_KEYS`/`SPKEYS_DEFAULT` const exports. No deleted/re-pointed symbols (`sym.mjs`: all three resolve to the new exports; `cmdbind_get` live). Imports extended on already-live edges only.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (no symbol deleted or
re-pointed by this diff — `movecmd`, `MISC_KEYS`, `SPKEYS_DEFAULT` are
additions):

```text
movecmd          js/dokeylist.js:313   sync
MISC_KEYS        js/dokeylist.js:79   sync   export const
cmdbind_get      js/dokeylist.js:292   sync
```

| JS callee | Class |
|---|---|
| `movecmd` | new LIVE export (body read vs `:3868–3898` above) |
| `cmdbind_get` | LIVE (pre-existing; `key & 0xff` mask, null on key 0) |
| `MISC_KEYS` / `SPKEYS_DEFAULT` | new shared exports, values verified vs C tables above |
| `digit` → inline `0x30–0x39` range; `unmeta` → `& 0x7f`; `strncmpi/strcmpi` → lower-compares; `strsubst` | LIVE or exact inline equivalents |
| `xdir/ydir/zdir`, `MV_*`, `N_DIRS_Z` | LIVE consts (direction tables runtime-verified) |

No STUB in any live arm. `movecmd`'s txt-vs-funct matching is sound
because JS binds are built key→EXTCMDLIST-index (`build_default_cmdbinds`),
so txt↔row is 1:1 in this tree. `lock.js` keeps its pre-existing
`apply_dirsym` clone for the getdir site (name kept deliberately; its
"no separate JS export" comment at `:128` is now stale prose —
comment-only drift, not behavior).

## C ↔ JS fidelity

C loci: `key2extcmddesc` `cmd.c:2560–2621` (csym, 62 L) + `movecmd :3868–3898` (csym, 31 L), both whole bodies read; callers of the former (`pager.c:2588` live → `dowhatdoes_core`, `:1826`/`:2085` comments, `extern.h:450` decl) all accounted for. RNG: none both sides.

- Movement probe WALK→"move"/RUSH→"rush"/RUN→"run" with fall-through (no return) ✓ — probe side effect (dx/dy/dz) preserved and disclosed.
- Digit arms: `digit` → inline 0x30–0x39; `unmeta` → `& 0x7f`; buffer reset; `'5'`/M5 run-vs-rush XOR (`!!pcHack_compat ^ (key==M_5)` reproduced exactly); `'0'`/M0 synonym; return-only-if-non-empty ✓. `num_pad` dual-read (`Cmd.num_pad || iflags.num_pad`) is tree convention (`js/lock.js:155` same shape). Confirm.
- misc_keys loop: ESC-always / COUNT-only-if-numpad; descs byte-exact vs C `:2088–2094` (table read); `spkeys` with `SPKEYS_DEFAULT` fallback `{0:27, 5:110}` matching C `spkeys_binds` `:3161` (ESC→27, COUNT→'n') ✓.
- cmdbind arm: `"desc (#txt)"`, reqmenu two-line rewrite (strncmpi/strcmpi → lower-compares, replacement text exact incl. `\n`), `(##)` strip, NULL→null ✓.
- `movecmd`: high-to-low scan (`N_DIRS_Z−1 … > −1` ≡ `> DIR_ERR`), MV_ANY any-column vs single-column, rows 8–9 down/up, `u.dx/dy/dz` from `xdir/ydir/zdir` (runtime-verified vs `decl.c`: standard tables), `!u.dz` return, `u.dz=0` tail ✓. ef_funct-identity → extcmd-txt comparison: sound because JS binds are built key→EXTCMDLIST-index (`build_default_cmdbinds`), i.e. txt↔row is 1:1 in this tree; disclosed in the comment. `bind && bind.txt` ≡ `bind && bind->cmd` given the tree's bind shape (`cmdbind_get` returns null on key 0). Confirm.

Two doc-completeness remarks (not C-wrongs, no Must-fix): the D-log names only `:4095` as movecmd's other C caller, omitting `dig.c:1130` and `getpos.c:914/921` — both keep pre-existing cited inline handling (`js/dig.js:2482`, getpos comments) and belong to their own rows, so nothing is unwired by this commit; and `js/lock.js:128` ("no separate JS export") is now stale prose next to the pre-existing `apply_dirsym` clone — comment-only drift.

## Hallucinations / overclaim

None on behavior. "Whole C body" earned; omits (rest_on_space, dir layouts, getdir MV_ANY site, BIND= overlays) named with locus.

## Density

Breadth phase: one whole C function + one callee + shared tables, ~166 lines over two coupled modules. Right-sized.

## Verification

Full verify transcript (both summary lines cited):

```text
verify key2extcmddesc: baseline 2dfc3677~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify key2extcmddesc: no corpus session is blocked on it at 2dfc3677~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke key2extcmddesc: no RNG-tagged reach; fixed smoke spread (24 run, 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, as disclosed. No REGRESSED. Probe cases
(`h`→move-west desc with dx=−1, `m` two-line reqmenu, `#` strip,
space→null per `#if 0` + `commands_init`, M5→rush-prefix) each cite a C
mechanism rather than a corpus expectation. Diff grep: no FORCE/DIAG/seed/
fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
