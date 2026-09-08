# Review 1122 — bfebf129 — makewish wish-delivery verb/oops + The(aobjnam) (D-2156)

Metadata: SHA `bfebf129`, js/ +30/−6 in `zap.js` only. D-log D-2156.
Subject promises: C verb/oops arms + `The(aobjnam)`; 2 sessions PASS
(scen-wish-Ranger-92212, scen-wish-Samurai-91102); queue row
misattributed to `hornoplenty`.

Intent vs deliverable: promise matches diff. Actually adds: (1)
fatal-corpse `wishedfor=1` gate via dynamic `pickup.js` import;
(2) verb ternary (slip/materialize/drop); (3) oops_msg 4-arm ternary
(reach/away/floor/Careful); (4) drop_arg `The(aobjnam(otmp, verb))`
replacing `` `The ${doname(otmp)} ${verb}s` ``. `hornoplenty` untouched.

Inventory: no new functions; one block ported in place. Consumed
callees LIVE: `aobjnam → js/objnam.js:2497 sync`,
`u_safe_from_fatal_corpse → js/pickup.js:1065 sync`,
`st_all → js/pickup.js:167 sync`; `aobjnam` joins the ALREADY
objnam.js edge; the pickup pair arrives via deferred dynamic import
(same-SCC shape as the file's existing dynamic imports — no top-level
TDZ read; `--can` confirms no new static edge needed).

**C ↔ JS fidelity**: confirmed against `zap.c:6401–6420` (csym range for
`makewish :6313–6422`; tail `:6390–6425` read directly). Ternary-for-
ternary exact: slip iff airlevel||uinwater; materialize iff
corpse&&wishedfor (re-read after the gate, like C); oops arms in order
with the `wtyp < IRONBARS || wtyp >= ICE` floor predicate via the house
`game.level?.at?.()` reader. The old code was a genuine C-wrong twice
over: `doname` bakes in an article ("The a boulder") where C passes
article-free `aobjnam` under `The()`, and the verb was hardcoded
"drop" where C picks slip/materialize. The queue-row misattribution
claim (owner string `mkobj.c:2905` is a topline tie-break; true writer
is the makewish tail) is substantiated by the fix itself: touching only
`makewish` moves both sessions to PASS with `hornoplenty` byte-untouched.
`aobjnam`'s latent `quan != 1` count-prefix gap is named in this commit.
No STUB in a live arm; pre-existing makewish defers
(wish_history/menu, MAXWISHTRY retry) unchanged and named.

Hallucinations / overclaim: none. "Match C" is earned line-for-line;
the misattribution analysis names the mechanism (topline tie-break),
not just the conclusion.

Density: 30 insertions, one C block in one module, code+map+verify in
one handoff. Right-sized.

Verification: D-log bullet shows `verify.mjs --fn hornoplenty` → hidden
2 PASS + green/strict/cohort, plus standalone full `sessions` 44/44.
Re-measured: `hidden-proxy.mjs verify hornoplenty --base bfebf129~1` →
"2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS" (both sessions
PASS). True claim. Banned-pattern grep over js/ hunks: zero hits.
Rule #2 covered by D-log verify PASS.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
