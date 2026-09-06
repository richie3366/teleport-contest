# Review 933 — b3282b83 — weapon.c give_may_advance_msg skill-advance message singleton (D-1963)

Metadata: SHA `b3282b83`, D-1963, `js/weapon.js` + `js/hack.js` +
one-word `await` in `js/pray.js`. Reviewer re-ran the C bodies, C
callers, sym on all three symbols, both `--can` edges, Rule #2,
banned grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises the exported
`give_may_advance_msg` in C ternary order, `add_weapon_skill`
awaiting it, and the missing TIP_ENHANCE arm in `handle_tip`.
Diff actually adds exactly that plus comment updates. Promise
kept.

Inventory: one new function (`give_may_advance_msg`,
`js/weapon.js:837`, ASYNC per `sym.mjs`). One changed function
(`add_weapon_skill`, sync → async, sole live JS caller
`pray.js:1634` already `await`s — safe). One new arm
(TIP_ENHANCE first in `handle_tip`, C switch order). No deleted
symbols; both import edges ALREADY existed (`--can` confirms).

C ↔ JS fidelity — against `weapon.c:75–84` (csym prints 75–84;
D-log cites 76–84, off-by-one citation only) and
`hack.c:1851–1881` (via `csym.mjs`), exact:

- Ternary chain P_NONE → `""`, ≤ P_LAST_WEAPON → `"weapon "`,
  ≤ P_LAST_SPELL → `"spell casting "`, else `"fighting "` →
  identical, `| 0` idiom on skill.
- `You_feel("more confident in your %sskills.", ...)` → template
  literal, awaited (pline can reach nhgetch — correct async
  lift; C is sync-only by build).
- `(void) handle_tip(TIP_ENHANCE)` → `await handle_tip(...)`,
  boolean discarded by not using the return — same observable
  effect.
- TIP_ENHANCE arm text `"(Tip: use the #enhance command to
  advance them.)"` matches C byte-for-byte; placed first per C
  switch order; existing SWIM/UNTRAP_MON arms untouched.
- JS `handle_tip` keeps the pre-existing range guard (`tip < 0
  || tip >= 4 NUM_TIPS`) and once-per-bit set-before-switch
  order — both match C.
- `add_weapon_skill` before/after `can_advance` count with
  `before < after` → `give_may_advance_msg(P_NONE)` matches
  `weapon.c:1437–1452`. C's second caller (`attrib.c:1070`
  level-up) is still a deferred comment in JS (`attrib.js:672`,
  not a call), so "sole caller gcrownu" holds JS-side.

No RNG either side. Callee closure: `You_feel` (live),
`handle_tip` (live, same commit) — no stubs, no clones.

Hallucinations / overclaim: none. No dispatch-over-stub shape.

Density: §2b right size — one message function + one arm + one
caller word, three modules that already import each other. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs
--fn give_may_advance_msg` → PASS syntax/rule2/green/strict/
cohort/full-44/44, an explicitly vacuous hidden note (row cited
0 blocks, no corpus-PASS claim), plus deleted /tmp probes (4
kind arms, once-per-bit, slot-crossing fires / silent) PROBE
PASS. Reviewer re-measured: `hidden-proxy verify
give_may_advance_msg --base b3282b83~1` → "0 session(s) blocked
(0 at baseline, 0 in working scoreboard)". Honest. Diff-body
banned grep clean (only hit is D-log prose); Rule #2 clean
(re-ran `imports.mjs --rulecheck` at 932, clean).

Actionable C-wrongs: none. (`use_skill` may-advance arm stays a
named omit with the sync-hot-path reason in this commit.)

Verdict: **ACCEPT**
