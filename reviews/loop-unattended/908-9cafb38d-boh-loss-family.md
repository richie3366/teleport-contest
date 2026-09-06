# Review 908 — 9cafb38d — bag-of-holding loss family (D-1938)

Metadata: SHA `9cafb38d`, D-1938. Files: `js/pickup.js`
(+98: `is_boh_item_gone`, `mbag_item_gone`,
`do_boh_explosion`, `boh_loss`), `js/objnam.js` (+9:
`Doname2`). Map-driven Open row, 0 corpus blocks cited.

Intent vs deliverable: subject promises the four-function
loss family plus canonical `Doname2`. The diff delivers
exactly that. Promise ≡ diff.

Inventory: four new exports (one sync, three async) +
`Doname2` (single export; 3 pre-existing clones in
do/dokick/dothrow correctly left alone). One new module
edge (`scatter` from explode.js; D-log cites `--can`
clearance). No stub, no new omit.

**C ↔ JS fidelity**: `is_boh_item_gone`
(`pickup.c:2509–2513` via csym) — `!rn2(13)` exact.
`boh_loss` (`:2536–2554`) — Is_mbag gate (checked:
`obj.h:339` = HOLDING||TRICKS; JS same on two local
`indexOf` consts — verified both defined at
pickup.js:141–142 after a `sym.mjs` miss), cursed +
Has_contents, nobj-prefetch loop, loss accumulation —
exact. `do_boh_explosion` (`:2516–2534`) — in_use=1
first, prefetch, gone→extract+silent-mbag vs
stamp+`scatter(ux,uy,4,MAY_HIT|MAY_DESTROY)` — exact,
incl. the no-reset comment. `mbag_item_gone`
(`:2802–2822`) — silent gate → dknown-gated vanish
pline → `*ushops && shop_keeper` short-circuit →
held?unpaid:costly_spot → 5-arg stolen_value →
obfree → loss — exact; async awaits (`stolen_value`,
`scatter` both ASYNC per sym) are the correct JS
idiom. `Doname2` (`objnam.c:2302–2309` via csym) —
`upstart(doname(obj))` is the highc shape. RNG: one
`rn2(13)` per item, call-for-call. Callee closure all
LIVE: shop_keeper/costly_spot/obfree (shk.js),
stolen_value (shk.js, awaited), scatter (explode.js,
awaited), Doname2/currency/MAY_* (existing edges).

Hallucinations / overclaim: none. Hand-probe admits
the bare-import RNG check was blocked — honest, and
the 1/13 rate follows by construction.

Density: ~104 lines for a four-function family — at
the §2b envelope, justified (one C locus family).

Verification: re-measured `hidden-proxy verify
boh_loss --base 9cafb38d~1` → `0 session(s) blocked
(0 at baseline, 0 working)` — vacuous as stated.
D-log gates: preflight + post green 2/2 + strict ×2,
cohort 7/7; full skipped (no shared file) —
legitimate. Rule #2 clean. Diff grep: zero banned
hits (only the message's own denial).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
