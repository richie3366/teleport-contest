# Review 1969 — 70c901367 — options.c doset_simple_menu restart (D-3009)

Metadata: SHA `70c901367`, D-3009, two-function `options.c`
cluster (restart + callee) with a real corpus block.
Stat: `js/options.js` +176/−96ish, `js/generated/
optlist_data.js` +96/−(descr ×32), `js/dothrow.js` 3-line
read fix, `scripts/extract-optlist.py` +12. No prior review
file on disk. Cluster commit → Method per function below.

## Intent vs deliverable

Subject promises a C-order restart moving scen-options-
Wizard-94291 17→65 via the fireassist iflags fix, with the
wc-gate revert disclosed. Diff actually does that: menu
rewrite, extractor descr data, iflags moves. Promise and
diff match, including the honest "first cut regressed 3
fortress sessions, reverted" arc.

## Inventory (per function)

- `doset_simple_menu` (RESTART, `js/options.js:7286`
  region): width/format/section loop/pick dispatch in C
  order. Ledger honestly marks it **partial**.
- `longest_option_name` (NEW, `:7255`): two-pass max width
  (C staticfn → file-local or exported per D-log).
- Support: `preference_update` file-local no-op (`:7279`);
  `dosetSimpleNameWidth` const (23); extractor descr emit;
  fireassist addrs → `game.iflags` + dothrow read →
  `game.iflags`.
- No symbol deleted or clone→import re-pointed, so no
  `sym.mjs` deletion output is required.

## C ↔ JS fidelity (per function)

`longest_option_name`, `csym` `options.c:8507–8532`
(cited; body shape confirmed via the D-log locus +
callers): two passes, BoolOpt+addr filter, setwhere
range, wc gate, max — D-log names both C call sites
(`:8556` menu width → live call; `:8825` doset width →
value-wired const 23, outcome-equal on tty, flagged as a
doset-campaign candidate). No contrary evidence found.
Verdict: OK.

`doset_simple_menu`, `csym` `options.c:8535–8702` (168
lines; head `:8535–8599` + pick dispatch `:8640–8702`
read in C): fmtstr width/tab arms `:8555–8560` ✓ (live
`longest_option_name(SET_GAMEVIEW, SET_IN_GAME)` call);
help header `:8570–8578` ✓; section loop `:8580–8584` ✓
with null-addr + tiled/color skips; wc gate `:8588–8590`
deliberately NON-gating — consistent with the D-3003
finding (runtime wincap2 lacks 9 WC2_SUPPORTED bits, so
gating hides hitpointbar/statuslines; the reverted first
cut proved it against 3 fortress sessions) ✓; BoolOpt
row `:8594–8599`, Comp/Othr + rogue symset `:8600–8614`,
autopickup note, help descr (extractor data), five
go-resets `:8635–8639` ✓; select `:8640–8643` ✓;
help toggle `:8647–8650` ✓; compound hasHandler/getlin
arms `:8658–8686` ✓; preference gate `:8688–8691` ✓
with `preference_update` as an empty function — verified
faithful: C `genl_preference_update` (`windows.c:461`)
is literally an empty "Just return in this genl one"
✓, so "no-op stub per genl" is exact, not a gap; redo
`:8694–8697` + return `:8699` ✓. RNG: none in C, none
in JS. Root-cause fix verified: C reads
`&iflags.fireassist` (optlist.h:310) and dothrow.c
`:518,557` reads `iflags.fireassist`; JS moved both
✓ — this is what flips row 18 `[X]`→`[ ]`.

Gap (real, ledger-honest partial): the BoolOpt pick arm
`:8651–8657` keeps `simple_bool_toggle` (bag flip +
hilite_pet + glyph-reset subset) instead of C's
`parseoptions("!name")` → full `optfn_boolean` do_set
chain (sex-change logic, perm_invent gate, toggled pline,
showscore status/botl, vision recalc, fixinv regroup,
custom* flags). Ledger says `partial`; D-entry names it
with an own row. That disclosure is what keeps this out
of Must-fix — BUT the parenthetical justification is
stale (see Overclaim). Verdict: OK-as-partial.

Callers: sole C caller `doset_simple options.c:8724` →
pre-existing wired `await doset_simple_menu()` ✓.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed hits.
Rule #2 clean (re-verified 1963).

## Hallucinations / overclaim

One stale rationale, present in BOTH the D-entry Named
bullet and the shipped code comment (`js/options.js`
bool-pick arm): "allopt bool rows carry optfn:null vs C
&optfn_boolean". False at this SHA — D-3003 (ancestor
`bff5e68ae`, verified in review 1963) wires all 113
BoolOpt rows to `optfn_boolean` (loop still present at
this SHA, `:9199`). The gap the sentence defends (bool
pick skips the optfn chain) is real and ledger-named, but
its stated mechanism is wrong, and a reader following it
would misjudge the now-available fix (routing the pick
through parseoptions, modulo the 1963 sync-dispatch
debt). Correction recorded as debt below; the code
behavior itself is as disclosed (partial), so this is not
a hidden C-wrong.

## Density

One-C-file cluster, 2 functions, ~+270 lines with a
corpus block moved — inside the §2b envelope.
Per-function verdicts: longest_option_name OK;
doset_simple_menu OK-as-partial. SHA verdict: debt
(stale rationale), not risk.

## Verification

D-log: `verify.mjs` → syntax · rule2 · hidden PROGRESS
(scen-options 17→65, later owner handler_autounlock) ·
REACH-OK ×2 · green · strict ×2 · cohort · full 44/44.
Re-measured here (`--base 70c901367~1 --reach-all`):
`verify doset_simple_menu: 1 session(s) blocked on it
(1 at baseline, 0 in the working scoreboard)` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
+ `fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK`; longest_option_name 0-blocked + REACH-OK
(all lines observed in-session). The movement claim is
TRUE: exactly the queued session moved past, zero worse,
zero REGRESSED. No seed/step/coordinate/RNG-index reads.
The 3-session first-cut regression + revert is the honest
kind — caught by the fortress, disclosed, reverted.

## Actionable C-wrongs

None queued. The one defect found is a stale rationale
for a ledger-named partial (prose, not a hidden code
wrong). Debt recorded (review-debt, unqueued):

1. D-3009 bool-pick rationale ("rows carry optfn:null")
   is stale since D-3003; correct the code comment when
   the pick arm is next touched, and evaluate routing the
   BoolOpt pick through `parseoptions` (C `:8654–8656`)
   now that `optfn_boolean` is wired — blocked only on
   the 1963 sync-dispatch debt. Ledger `partial` stands.

Verdict: **ACCEPT-WITH-DEBT**
