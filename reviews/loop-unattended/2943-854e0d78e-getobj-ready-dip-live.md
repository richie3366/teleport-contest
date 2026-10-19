# Review 2943 — 854e0d78e — force_invmenu in iflags, end_menu prompt order, ready/dip call the live getobj

- SHA: `854e0d78e` (cliff, near-pass pick: the cliffs head is still the
  12 parked rows of D-4016 / D-4028; board owner `getobj` ×8)
- D-entry: D-4102; Ledger: doquiver_core, dodip, display_used_invlets
  `ported`; display_pickinv `split`
- `js/` diff: options.js ±8, invent.js +7/−2, wield.js +6/−116,
  potion.js +8/−148, dothrow.js ±1 (comment)

## Intent vs deliverable

Promise: (1) force_invmenu was stored in `flags`, but C keeps it in
`&iflags`. (2) tty_end_menu's prompt rows were prepended in the wrong
order. (3) The ready and dip getobj clones skipped compactify and the
`!fixinv` reassign. They now call the live getobj, which gives 5 FULL
PASS and 1 moved session.

Diff: options.js moves 5 address slots to `iflags` (3 in both tables, 2
in allopt only). invent.js swaps the two `unshift`s and gives the prompt
a heading attr. wield.js deletes `getobj_ready`, `ready_suggest_lets`
and the local GETOBJ_* constants (1/2/3), imports const.js's values
(2/1/−3) and calls `getobj`. potion.js shrinks `getobj_dip` to the C
call and deletes `compact_lets`, `dippable_lets` and
`dippable_lets_raw`. Promise = diff.

## Inventory

- `doquiver_core`: wield.js:912–1052; C wield.c:511–679 (getobj call
  :532).
- `ready_ok`: wield.js:886–904; C wield.c:292–327. Unchanged, but it is
  now read against the const.js ranks.
- `getobj_dip`: potion.js:2499–2505; C potion.c dodip :2279.
  `dip_ok`/`dip_hands_ok` are at potion.js:2692/2706, C :2213–2237.
- `display_pickinv_reply` query rows (invent.js:4170–4179) and
  `display_used_invlets` (invent.js:10839–10845); C wintty.c
  tty_end_menu :2680–2690 and tty_add_menu :2621–2622.
- options.js DOSET_BOOL_ADDR plus allopt rows for force_invmenu,
  herecmd_menu, sounds, extmenu, toptenwin; C optlist.h
  :303/336/357/697–703/780.

## C ↔ JS fidelity

```c
item->next = cw->mlist; cw->mlist = item;            /* wintty.c :2621–2622 prepend */
tty_add_menu(…, ATR_NONE, clr, "", …);               /* :2685–2686 */
tty_add_menu(…, tty_menu_promptstyle.attr, …, prompt, …); /* :2687–2689 */
```

Because each row is prepended, the prompt (added second) ends up on
row 0 and the blank on row 1. The JS now unshifts the blank and then the
prompt, so the order matches. The attr does not. JS uses invent.js's
local `add_menu_heading_attr()` (`gameover ? 0 : ATR_INVERSE`), which
models windows.c add_menu_heading. C uses `tty_menu_promptstyle`, which
is relayed from `iflags.menu_headings` by adjust_menu_promptstyle
(options.c:5790) and has no gameover gate. The live reader
`menu_prompt_style()` (options.js:6274, `sym.mjs`: sync export) already
exists and getline.js:1615 uses it. Both readers give the same result
under default options. They differ only when `menu_headings` is not
inverse (attr or color), or when a getobj query runs during gameover.
No corpus recipe sets menu_headings (grep over `hidden-corpus/`: 0
hits). This is the 2922 debt family, with 2 more sites.

optlist.h :336–337, :357–358, :697–703, :303–304 and :780–781 all say
`&iflags.<name>`. Every live JS reader (`invent.js:3784/3798`,
`apply.js:2927`, `iactions.js:935–956`, `end.js:841`,
`getline.js:1647`) reads `iflags`. A regex for non-`i` `flags.<key>`
over `js/` finds no reader left on `flags`.

`ready_ok` is branch-for-branch C: null → SUGGEST/DOWNPLAY on
`uquiver`; wielded ×1 → DOWNPLAY; ammo → SUGGEST iff it matches a
launcher; launcher → DOWNPLAY; weapon or coin → SUGGEST; otherwise
DOWNPLAY. Every rank comparison left in wield.js is symbolic
(`=== GETOBJ_*`), so the 1/2/3 → 2/1/−3 renumbering cannot flip an
ordinal test. `dip_ok` and `dip_hands_ok` match C :2213–2237. The
inaccessible check goes through apply.js `equipment_is_inaccessible`
(pre-existing wrapper). No RNG is drawn on any changed path.

`doquiver_core` walk (C :511–679 vs JS :912–1052). The `!invent`, hands,
split-child, already-quivered, worn, uwep (weld, ynq split, decline
Shk_Your) and quivering arms are all in C order. Two divergences predate
this commit, but the commit's own comment and the ledger's `ported`
cover them:

- **Cancel.** C :534–536 `if (!newquiver) return ECMD_CANCEL;` vs JS
  :923 `return 0` (ECMD_OK, const.js:1975/1977). C rhack :3810 does
  `reset_cmd_vars(TRUE)` (clearing CQ_CANNED and CQ_REPEAT) only on
  CANCEL. dofire's `res != ECMD_OK && res != ECMD_TIME` (dothrow.c:551)
  returns at once in C. JS continues to `if (!obj) return 0`, which
  prints the same output but leaves the repeat queue set.
- **uswapwep decline.** C :641–644 uses `Shk_Your(qbuf, uswapwep)`. JS
  hardcodes `Your ` (:1036). The uwep arm right above it does call
  `Shk_Your(uw)`. An unpaid alternate weapon would read «Your …» where
  C names the shopkeeper.

`sym.mjs` (deleted / re-pointed):

```text
getobj_ready       NOT FOUND in js/** (no export, no local function/const).
ready_suggest_lets NOT FOUND in js/** …
compact_lets       NOT FOUND in js/** …
dippable_lets      NOT FOUND in js/** …
dippable_lets_raw  NOT FOUND in js/** …
getobj             js/invent.js:10536   ASYNC — await required
getobj_dip         js/potion.js:2499   ASYNC — await required
GETOBJ_SUGGEST     js/const.js:2245   sync   export const
add_menu_heading_attr NOT EXPORTED — 1 LOCAL CLONE(S): js/invent.js:3709
menu_prompt_style  js/options.js:6274   sync
```

Callee closure: `getobj` is LIVE (invent.js, unchanged here). `ready_ok`,
`dip_ok` and `dip_hands_ok` are LIVE. `add_menu_heading_attr` is a CLONE
that diverges from tty_menu_promptstyle (see above). The commit adds no
STUB.

## Hallucinations / overclaim

- The fix bullet says doquiver_core «treats null as cancel like C». C
  returns ECMD_CANCEL; JS returns ECMD_OK. The flow matches but the
  value does not.
- The D-log cites «tty_menu_promptstyle (menu_headings, options.c:5790)»
  and then ships the add_menu_heading clone, not that style.
- Stale comments: potion.js:2768 and :2798 still say «as in getobj_dip»
  for the gold/botl order of the deleted clone loop.

The counts are correct (see Verification). No "Match C" is claimed for a
stubbed dispatch.

## Density

One cliff family: the getobj prompt (options storage, end_menu rows, two
clones → live). It is −275 lines of clone and moves 6 of 8 board rows.
Each touched function has a Ledger bullet. The sessions for the 2 rows
left (invoke `[*]`, impaired zap) have other causes, and the D-log names
them as Next. Per function:

- doquiver_core: getobj rewire is right; cancel value and uswapwep
  Shk_Your are pre-existing C-wrongs → **debt**.
- getobj_dip: **ok**. It is the C call verbatim.
- display_pickinv_reply / display_used_invlets: row order **ok**; attr
  clone → **debt**.
- options address flips: **ok**. All 5 match optlist.h.

## Verification

Re-measure on HEAD, `hidden-proxy verify getobj,doquiver_core,dodip
--base 854e0d78e~1 --no-reach`:

```text
verify getobj: 5 PASS, 1 moved past, 2 unchanged, 0 worse → PROGRESS
  (Healer-50255907, Wizard-50457001, Archeologist-50457000, Wizard-50255903,
   sweep-Rogue-50450065 PASS; Priest-50355006 → study_book s149 (was 147);
   Rogue-50557417 s145 invoke, impaired-Monk-51251030 s138 zap unchanged)
verify doquiver_core: 0 blocked at baseline (vacuous — owner is getobj)
verify dodip: 0 blocked at baseline (vacuous — owner is getobj)
```

This matches the D-log line for line. The two vacuous lines are expected,
because the board attributes these rows to `getobj`. Rule #2: `imports.mjs
--rulecheck` reports clean. The diff has no FORCE, DIAG, seed,
coordinate or RNG-index read.

## Actionable C-wrongs

All three are unreached by the corpus (§10.19). They are debt and are
not queued as Must-fix:

1. `doquiver_core` cancel: wield.c:534–536 returns `ECMD_CANCEL`; JS
   wield.js:923 returns 0. Also fix the `@returns` doc.
2. `doquiver_core` uswapwep decline: wield.c:641–644 `Shk_Your(qbuf,
   uswapwep)`; JS wield.js:1036 hardcodes «Your ».
3. tty_end_menu prompt attr at invent.js:4178 / :10844: use
   `menu_prompt_style()` (wintty.c:2687–2689), not the
   `add_menu_heading_attr` clone. This is the same family as review
   2922's ×10 sites.

Verdict: **ACCEPT-WITH-DEBT**
