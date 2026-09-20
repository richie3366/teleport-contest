# Review 1610 — e3df8cae — options.c shared_menu_optfn family (D-2651)

**Metadata:** SHA `e3df8cae`, `options.c` `shared_menu_optfn`,
D-2651. JS: `js/options.js` (+236: 2 exports + 4 file-local
helpers + 13 forwarders + 13 allopt rows wired + CompOpt holder).
No prior review claimed closed.

## Intent vs deliverable

Subject promises: exported `shared_menu_optfn` (init no-op,
set resolve-then-delegate, get_val `to_be_done`, get_cnf_val
clear), file-local check/spcfn/illegal/alias helpers, 13
`optfn_menu_*` forwarders wired into allopt. Diff delivers all of
it. Promise matches deliverable.

## Inventory

- `shared_menu_optfn` (options.js:921, sync, exported) — C
  `options.c:2052–2074`.
- File-local: `check_misc_menu_command` (`:694–706`),
  `illegal_menu_cmd_key` (`:8037–8057`), `add_menu_cmd_alias`
  (exported — C global, extern.h:2317), `spcfn_misc_menu_cmd`
  (`:5452–5476`), `set_optbuf` holder + `to_be_done` const.
- 13 `optfn_menu_*` forwarders (`:2077–2178`, 8-line spacing ⇒
  exactly 13) + 13 allopt `optfn: null` → live.
- `get_option_value` CompOpt arm: string `retbuf` → `{ buf }`
  holder. Verified safe: the 13 new handlers are the ONLY
  non-null CompOpt optfns in allopt, and they are the only
  REQ_GET_VAL/REQ_GET_CNF_VAL handlers in the file — no other
  handler receives the holder.
- Imports joined to pre-existing edges only (const.js
  MAX_MENU_MAPPED_CMDS; objects.js MAXOCLASSES/def_oc_syms).

## C ↔ JS fidelity

C loci read here: `shared_menu_optfn :2052–2074` (full),
`check_misc_menu_command :694–706`, `illegal_menu_cmd_key
:8037–8057`, `spcfn_misc_menu_cmd :5452–5476`,
`add_menu_cmd_alias :8080–8097`. No RNG either side. Confirm:

- Dispatcher shape exact: init→OK, set→resolve (`res < 0`→ERR,
  else delegate), get_val→`to_be_done`, get_cnf_val→clear,
  fallthrough→OK ✓.
- `check_misc_menu_command`: NULL-terminated loop ≡
  length-bounded loop; `match_optname(opts, name, strlen, TRUE)`
  keeps the full-name minimum so abbreviated heads fail like C ✓
  (`match_optname` live, options.js:3914 sync).
- `illegal_menu_cmd_key`: NUL/CR/LF/ESC/space/digit arms ✓;
  `letter() && != '@'` ≡ inline `@–Z/a–z` minus `@` (C counts
  `@` as letter, hacklib :62–72) ✓; `uchar` mask `& 0xff` ✓;
  oc-symbols loop from j=1 ✓; config_error_add arms sunk per the
  map's existing sink line, TRUE/FALSE propagation kept ✓.
- `spcfn`: negated→bad_negation+ERR; `string_for_opt` tail
  reassign (`op =`) preserved; txt2key→illegal→ERR; alias add;
  GET arms clear ✓ — verbatim against C quoted above.
- `add_menu_cmd_alias`: cap→pline (void, no error return — matches
  C), string appends + implicit count ≡ NUL writes ✓.
- `match_optname`/`txt2key` live; **`string_for_opt` +
  `bad_negation` are PRE-EXISTING LOCAL CLONES**
  (`sym.mjs`: NOT EXPORTED, options.js:3925/3938 — output pasted
  per Method §3). The subject's "live `string_for_opt`…
  `bad_negation`" is message-level overclaim (same class as
  D-2646's `badman`): C staticfns ⇒ file-local is the correct
  architecture, no new drift introduced. Noted, not filed.
- OMITs named: parsebindings `:7658–7662` (future BINDINGS row),
  menu_headings/menu_objsyms (own rows, still null in allopt),
  nhl_get_config (pre-existing).

## Hallucinations / overclaim

One, message-only (see above): two pre-existing in-file clones
called "live". Code direction correct; no Must-fix.

## Density

Breadth phase: 236 insertions for a 23 L dispatcher + 4 helpers +
13 wired rows — one C function family, right-sized (shared-file
full 44/44 correctly run).

## Verification

D-log Verify bullet claims PASS + full 44/44 + probe 23/23.
Re-measured here: `hidden-proxy.mjs verify shared_menu_optfn
--base e3df8cae~1 --reach-all` → 0 blocked both sides (vacuous
note quoted verbatim, correctly labeled) + smoke 24/24 REACH-OK,
no REGRESSED. Claim true. Diff grep: no FORCE/DIAG/getRngLog/
seed/coordinates/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
