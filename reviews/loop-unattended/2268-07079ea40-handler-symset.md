# Review 2268 — 07079ea40 — options handler_symset + arms + dispatch

Metadata: SHA
`07079ea40e7be59f723ba09c77d6744808a224e4`
(D-3310, 2026-10-02).
`js/options.js` only
(+55/−8): one new export,
two caller arms, two doset
dispatches. Single
function, fully wired.

Intent vs deliverable:
subject promises the
do_symset wrapper + both
do_handler arms + doset
dispatch wired. The diff
ships handler_symset, the
roguesymset plain-return
arm, the symset glyphid-
wrapped arm, the full-
menu dispatch arms, and
rewires the simple-menu
'symset' row from forced
OPTN_ERR to the real arm.
Delivers what it promises.

Inventory:

- `export function
  handler_symset(_optidx)`
  (js/options.js:2389):
  named do_symset + redraw
  + OPTN_OK.
- optfn_roguesymset
  REQ_DO_HANDLER arm
  (:3605–3607) + optidx
  rename.
- optfn_symset
  REQ_DO_HANDLER arm
  (:3668–3676, glyphid
  wrap) + optidx rename.
- doset_optfn_do_handler
  symset/roguesymset arms
  (:3528–3533).
- doset simple-menu
  'symset' arm (:9345,
  was OPTN_ERR).
- No import touched, no
  symbol deleted, no clone
  added.

**C ↔ JS fidelity**:

`handler_symset` (C
options.c:6320–6328,
staticfn): `reslt =
do_symset(optidx ==
opt_roguesymset);`
(:6325), `go.opt_need_redraw
= TRUE;` (:6326), `return
reslt;` (:6327). JS keeps
C order: named callee,
`mark_opt_need_redraw()`
(:4514, sets
game.go.opt_need_redraw —
the exact flag ✓),
`return OPTN_OK` ✓. The
OPTN_OK modeling rests on
do_symset returning TRUE
on every path — re-
measured, not trusted:
`awk '/return/'` over
symbols.c:908–1100 shows
6 returns, all `return
TRUE`, zero FALSE ✓.
C optn_ok = 1 (enum
:84–86: silenterr −1,
err 0, ok) = TRUE; JS
`OPTN_OK = 1` (:11952) ✓.
Callee do_symset is
ledger by-design (seed:
no scored analogue) with
no JS symbol — correctly
not cloned; the rogueflag
arg feeds only the named
callee, so `_optidx` is
sound ✓. No RNG ✓.

Callers (both C refs
:3583/:4228, confirmed):
roguesymset C :3582–3584
plain `return
handler_symset(optidx)` →
JS :3605–3607 verbatim ✓;
symset C :4223–4233 →
JS :3668–3676 in exact
order (`if (!status)
fill; reslt = handler;
if (status) free; return
reslt`), with :4231–4232
confirmed commented out
in C ✓. Glyphid trio all
LIVE (glyphs.js:240/789/
189) and already imported
(options.js:210 — no new
edge) ✓. Transitive doset
dispatches: C :8663–8666
(simple) and :8935–8938
(full) both call
`optfn(idx, do_handler,
…)` generically —
re-read, confirmed; JS
:9345 and :3528/:3531 do
the same ✓. Behavior
deltas are all in the
C-faithful direction:
simple-menu 'symset' was
forced OPTN_ERR, now the
real arm; full-menu arms
were value-correct but
flag-unmodeled, now set
the redraw flag ✓.
Review 1979 names the
handler only as an
unported-caller note —
no stamp owed ✓.

Hallucinations / overclaim:
none. The load-bearing
“TRUE on all six paths”
is measured and re-
measured here; the
by-design callee is named
in-body with its C range.
No dispatch over stubs —
every callee in the arms
is live.

Density: single function,
47 insertions, below ~80.
Defense holds: 4-line
body over a by-design
callee cannot be longer;
callee closure holds
nothing Open; the head
was the only options.c
queue row. (Observation,
no penalty: options.c
still shows 4 small
unknown gaps — msgtype2name,
msgtype_count,
get_menu_cmd_key PARTIAL,
count_apes THIN, all C
5–6 lines, under the
coverage generator's C≥8
bar — refill-owned, not
this iter's miss.) One
`Ledger:` entry, one
Verify line ✓.

Verification: D-log claims
hidden vacuous note +
REACH-OK smoke 24/24,
green 2/2, strict ×2,
cohort 7/7, full 44/44.
Re-measured: “0 blocked”
+ vacuous note + “fixed
smoke spread (24 run): 24
PASS, 0 regressed →
REACH-OK” — matches ✓
(queue cited 0 blocks).
Diff grep: no FORCE/DIAG/
getRngLog/seed/fastforward/
coords ✓. Rule #2: no
import added ✓.

**Actionable C-wrongs**:
none.

Verdict: **ACCEPT**
