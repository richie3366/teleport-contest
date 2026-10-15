# Review 2832 — 6a88a53cc — do_symset menu browser whole

- SHA: `6a88a53cc` (D-3987)
- Files: `js/options.js` (+171/−50); no focused test (29-session
  movement is the evidence)
- Method: cliff owner (1 C function, 192 lines); whole Method.
- Cites: C `symbols.c:908–1099` (csym range; message says –1098, the
  closing brace is :1099 — trivial cite drift), `options.c:6325`,
  `sym.h:132–135`, `config.h:368`, `global.h:29` — read directly.

## Intent vs deliverable

Promise: 29 scen-symset sessions diverge C «Select symbol set:» vs JS
«Options» — port the whole browser. Diff adds `export async function
do_symset`, makes `handler_symset` async around it, makes
`optfn_symset` DO_HANDLER free the glyphid cache via promise chain,
adds the `roguesymset` arm to the simple menu. Promise and diff agree.

## Inventory

- `do_symset` — `js/options.js:2448` (new export async) vs C
  `symbols.c:908–1099`. Status: whole body live.
- `handler_symset` — `js/options.js:2597` (sync→async) vs C
  `options.c:6320–6328`. Status: wired to live browser.
- `optfn_symset` DO_HANDLER — `js/options.js:3911` (promise-chain
  free) vs C `options.c:4223–4233`. Status: order preserved.
- Simple-menu `roguesymset` arm — `js/options.js:9836` vs C
  `options.c:8663–8666`. Status: added.

## C ↔ JS fidelity

Branch-by-branch confirm (C order):

- List pick `:924–931` (null-name flag, read_sym_file, restore) ✓;
  `res && list` gate `:933` + `!res` / empty arms `:1040–1047`
  (pline/There wordings, SYMBOLS="symbols" `global.h:29` ✓).
- Filter loops `:937–958` / `:977–1000`: rogue?primary:rogue ✓, H_MAC
  skip ✓ (H_MAC=4 both sides), H_UTF8 skip compiled out ✓
  (`config.h:368` defines ENHANCED_SYMBOLS), setcount/biggest/big_desc
  measure ✓, `!setcount` There+TRUE ✓.
- `%-<biggest+2>s %s` (`Sprintf :965` → padEnd ✓); Default row a_int 1
  + defindx ✓; per-set a_int idx+2 ✓; strcmpi→strncmpi(·,-1) full
  compare ✓ (n=-1 loops to string end); defindx preselect ✓.
- Menu-index mapping: C n>0 take pick[0], n==2&&==defindx take pick[1],
  −2; n==0&&defindx>0 take defindx−2. `select_menu_pick_one`
  (`options.js:10057`) returns the letter-hit directly (= the
  non-preselected one, subsuming the n==2 rule), Enter/space returns
  the preselected entry (subsuming n==1 and `:1016`), ESC → cancel
  (subsuming n==−1), Enter with none preselected → cancel (= C chosen
  stays −2 → nothing_to_do) ✓ — all four C landings reachable and equal.
- Transfer `:1021–1039` (find by idx, clear_symsetentry, dupstr name,
  ready/nothing flags) ✓; cleanup `:1051–1058` (frees=GC) ✓;
  init_rogue/primary `:1064–1067` ✓; reload `:1069–1085` (glyphid
  wrap, ok→ready else clear+TRUE) ✓; switch/assign/customize tail
  `:1087–1097` ✓ (`do_custom_symbols|do_custom_colors` = 2|1
  `sym.h:132–135` ✓; `preference_update` no-op = genl default, tty has
  no hook ✓).
- Sole C caller `options.c:6325` ✓ (csym --callers: 1 ref);
  rogueflag `optidx==opt_roguesymset` → `allopt_idx('roguesymset')`
  (established lookup) ✓.
- Async safety: every REQ_DO_HANDLER caller awaits (`doset_compound`
  `:9835/9839` ✓; `doset_optfn_do_handler` is async and already
  returned handler promises ✓; `:3764/3767` unreachable pre-existing
  dead arms). TRUE→OPTN_OK per `options.c:84` ✓. No RNG in C body;
  none added. Callee closure: all imports pre-existing except H_MAC +
  There (both live exports) — no clones, no stubs. `sym.mjs`:
  handler_symset async as shipped; nothing deleted/re-pointed.

## Hallucinations / overclaim

None. The Valkyrie-50359001 "js-throw" label is proven quirk, not a
throw: `show` gives error null, jsPanic null, owner null, screen diff
@782 («Done.» vs «unexplored area») — the null-owner fallback.

## Density

Cliff head of its parent (`do_symset` x29, 14 kRNG + 1.6 k screens)
✓. Whole C function, sole caller wired, both `Ledger:` entries
touched (`symbols.c`/`options.c` jsonl), full 44/44 (shared file) ✓.

## Verification

Ship-time: `verify do_symset: 18 PASS, 11 moved past, 0 unchanged, 0
worse`.
Re-measure (`verify do_symset --base 6a88a53cc~1 --no-reach` on HEAD):
`19 PASS, 10 moved past, 0 unchanged, 0 worse → PROGRESS` — same 29,
0 worse; the +1 PASS (Priest-50455024, was →enlightenment@740) and
later landings (Knight-50555046 →dotogglepickup@461, was dochug@371)
are later window SHAs healing further. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
