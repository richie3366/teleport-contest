# Review 2389 — c107c3e18 — D-3453 wincap2 model + moveloop + audits

Metadata: SHA `c107c3e18`, D-3453, Open head ×4. js/ +78/−26 (5 files)
+ `scripts/wincap2-tty-bits.test.mjs` (new, 90 lines).

## Intent vs deliverable

Subject promises: (a) TTY_WINCAP2 model (C's 13 tty bits minus the 4
status bits) fixing spurious "not supported" + statuslines 'unknown';
(b) moveloop restarted to C order; (c) strncmpi + Strlen_ audits (no
JS change). The diff delivers exactly that: one const, two fallback
swaps, comment/doc updates, moveloop head rewrite. No scope drift.

## Inventory

| Change | C locus |
|---|---|
| const.js TTY_WINCAP2 (9 bits) | win/tty/wintty.c:111–125 + config.h:575/:616 |
| install_tty_wincap2 + windowprocs_wincap2 fallbacks | same |
| doset_skip_unsupported doc (arm stays unwired, named) | options.c:8846–8888 |
| moveloop preamble + tutorial + loop | allmain.c:587–597 |
| strncmpi / Strlen_ re-stamps (zero JS hunks — verified) | hacklib.c:716–734, strutil.c:80–98 |

## C ↔ JS fidelity

Bit composition (recomputed from C, not trusted): unix tty sets
SELECTSAVED (config.h:575 on) + 4 STATUS_HILITES bits (:616 on) +
DARKGRAY/SUPPRESS_HIST/URGENT_MESG/STATUSLINES/U_UTF8STR/PETATTR +
EXTRACOLORS (NO_TERMS off) + EXTRASTATUS = 13. TTY_WINCAP2 carries
exactly 13 − 4 status bits. Exact.

Newly-on bit consumers audited: EXTRACOLORS/U_UTF8STR have zero JS
consumers (inert); SELECTSAVED bit unread (no wc2_options name; the
`selectsaved` row is config plumbing); DARKGRAY/STATUSLINES/PETATTR/
EXTRASTATUS flip exactly the two claimed arms C-ward —
optfn_statuslines REQ_GET_VAL now reads '2'/'3' (C :4101) instead of
'unknown' (C :4103), extrastatus toggles now take C :5350–5351
(botl; via_windowport false skips the named-omission
status_initialize) instead of the spurious :5338 message. Menu_shift
stays off, matching C's set.

Unwired skip arm: C shows all 10 supported wc2 names; the model lacks
the 4 status bits, so wiring would wrongly drop hilite_status/
statushilites/hitpointbar (all three render in
scen-options-Samurai-94071 today — falsifier valid). "No other wc2
row diverges" verified structurally: none of the 8 C-skipped names
(fullscreen/guicolor/menu_shift/softkeyboard/term_cols/term_rows/
windowborders/wraptext) appears in dosetSimpleOpts or the doset()
curated bool lists — I read both lists in full. The omission is
correctly kept and precisely named.

moveloop: C allmain.c:587–597 is preamble(resuming) + `!resuming`
tutorial + `for(;;) core` — JS matches in C order; callees live
(allmain.js:274/:1067); the gameover break is a disclosed harness
adaptation (C never returns; sole C caller unixmain.c:320). The
export has no direct JS callers (dead; entries hoist the head), so
the restart is inert at runtime. The dropped vision_recalc/docrt/
flush head was restore-path residue C never had here. Ledger
partial→ported (omit was exactly those calls): true.

strncmpi (js/hacklib.js:615): walked against C :716–734 — asymmetric
`(*s1!=0)`→1-or-0 return, -1 arm, lowc compare, n-exhaust 0. Whole;
omit is caller-side as ledgered. Strlen_ (js/options.js:11279):
bounded scan to LARGEST_INT, throw with C's message (house panic
idiom), unsigned return. Whole modulo the named panic presentation.
Both re-stamps true.

sym.mjs (no deletions this SHA; re-pointed symbols):

```text
moveloop         js/allmain.js:1607   ASYNC — await required
doset            js/options.js:10881   ASYNC — await required
strncmpi         js/hacklib.js:615   sync
Strlen_          js/options.js:11279   sync
```

Single definitions each. No import-edge changes (TTY_WINCAP2 joins
existing const edges). Diff grep: no FORCE/DIAG/RNG/seed/coordinate
reads. Wincap2 suite 5/5 on this tree.

## Hallucinations / overclaim

None. Every audited-consumer claim I spot-checked (statuslines :8360,
boolean :10482/:10576, via_windowport sites, botl const-0, menu
lists) holds. The "13 bits" count is exact.

## Density

≤10-function SHA, whole Method per row (2 code rows + 2 audits; C
bodies + bit table + both menu lists read). Ledger: moveloop ported,
doset/strncmpi/Strlen_ partial with true omits; Verify bullet names
all four. No Left-open. No Must-fix bundled (override disclosed,
heads still queued).

## Verification

Re-measured (`--base c107c3e18~1 --reach-all`): 4× vacuous (0 blocked
— disclosed: "rows cited none") + 4× smoke REACH-OK 24/24, 0
regressed. Claim true. (Full 44/44 + falsifier session re-checked by
this audit's cadence score.)

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
