# Review 2314 — 6e103bb56 — upstart 6-clone removal

Metadata: SHA `6e103bb56`, D-3358, C `hacklib.c:113–119`,
JS live `js/hacklib.js:498` (untouched). Stat: 7 js files, 6
clones deleted, 26 sites rewired, test rewritten (4/4).

Intent vs deliverable: subject promises "upstart 6-clone
removal (trap/pickup/apply/do_name/monmove/readobjnam → live
export)". Diff actually: 6 import extensions, 6 clone
deletions with markers, campaign-doc close. Matches promise.

Inventory: 6 clone→import, three falsy shapes — trap/pickup/
apply `if (!str) return str`; do_name `if (!str) return ''`;
monmove/readobjnam `String(??''/||'')` — all with locale
`toUpperCase`. Live target is the exact **C callee** (null/
`''` passthrough + `String()` + ASCII `highc`). No new
function, no stub.

C ↔ JS fidelity: branch-by-branch confirm against
`hacklib.c:113–119` (`if (s) *s = highc(*s)`; no RNG). The
rewire trades locale-Unicode `toUpperCase` for ASCII
`highc` (≡ C's `('a' <= c && c <= 'z')` gate) and unifies
three falsy shapes into C's passthrough-NULL shape. D-log
Callers maps all 26 sites to real C call sites (trap.c:834/
:1909, pickup.c:405/:3979/:4049, apply.c:1160/:650/:662/
:678, do_name.c ×9, monmove.c:1286, objnam.c:3684/:3815/
:3819, plus 4 JS-context sites named as such) and discloses
both deltas with the domain argument (non-empty ASCII at
every site; `shown` String()ed, `gang` truthy-guarded).
Spot-checked the falsy-sensitive do_name/monmove/readobjnam
sites at HEAD: all interpolate string buffers into plines —
no falsy path reachable; full 44/44 + REACH-OK judge the
rest.

Hallucinations / overclaim: none. The refill note honestly
flags the one NEW edge (questpgr→do_name) as future work,
not shipped here.

Density: 1-function whole-function cluster (upstart) with
D-log C-locus/JS/Callers/Verify/Named bullets + `Ledger:
upstart ported` + `verify.mjs` (syntax 7, rule2, green 2/2,
strict 2/2, cohort 7/7, full 44/44 auto). Out-of-cluster
`upstart_pot` rename-clone queued. ACCEPT.

Verification: re-measured — `verify upstart --base
6e103bb56~1 --reach-all` → "0 blocked" + vacuous-note +
"fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK"; matches the D-log (rows cited 0 blocks).
Scoreboard diff is commit/at metadata only — no row
movement. `--can`: 3/3 sampled ALREADY (all 6 diff edits
extend existing braces). Diff grep: no banned patterns.
`sym.mjs` output (required paste):

```text
upstart          js/hacklib.js:498   sync
```

Single definer — all 8 campaign clones gone.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
