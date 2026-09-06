# Review 930 — 0af4de34 — do.c better_not_try_to_drop_that corpse-drop guard singleton (D-1960)

Metadata: SHA `0af4de34`, D-1960, `js/do.js` (new guard + `drop`
wiring + 5 import edits) plus two one-line exports (`objnam.js`,
`pickup.js`). Reviewer re-ran C guard, C `drop` site, C `obj_pmname`,
C `u_safe_from_fatal_corpse`, sym on all six touched symbols, the
`--can` edge, both `menudrop_split` ends, banned grep, and
`hidden-proxy verify --base`.

Intent vs deliverable: subject promises the corpse-drop guard with
callee imports (no clone #2) wired into `drop` after `canletgo`.
Diff actually adds all of that: async guard, `drop` wiring
returning ECMD_FAIL, `st_all` + `obj_pmname_corpse` exports,
`paranoid_ynq`/`HAND`/`obj_pmname_corpse`/`u_safe_from_fatal_corpse`/
`st_all` added to existing edges, one `body_part` import from
`polyself.js`. Promise kept; callee closure verified below.

Inventory: one new function (`better_not_try_to_drop_that`,
`js/do.js:2278`, ASYNC, awaited). Callees, all LIVE via `sym.mjs`:
`u_safe_from_fatal_corpse` (`pickup.js:1064`, sync — body read,
4-term OR matches `pickup.c:272–281`), `st_all` (`pickup.js:166`,
newly exported const, value unchanged), `obj_pmname_corpse`
(`objnam.js:1090`, sync — local→export re-point, single def, no
clone per `sym.mjs`), `paranoid_ynq` (`getline.js:1301`, ASYNC,
awaited), `body_part` (`polyself.js:396`, hoisted `export
function`, runtime-use only). New `do.js`→`polyself.js` statement
joins an already-cyclic SCC; `--can` at HEAD reports ALREADY and
the import is body-use-only (no top-level TDZ read) — safe as
claimed. Using the real `body_part` over `body_part_latebound`
for HAND is the more faithful choice (form-dependent parts).

C ↔ JS fidelity — against `do.c:946–962` + `:720` (read at HEAD):

- `(otmp?.otyp | 0) === CORPSE && !u_safe_from_fatal_corpse(otmp,
  st_all)` ≡ C `otmp->otyp == CORPSE &&
  !u_safe_from_fatal_corpse(otmp, st_all)` (`?.` is benign
  hardening; `drop` already rejects null). Same short-circuit.
- Snprintf `"Drop the %s corpse without %s protection on?"` →
  template literal with `obj_pmname_corpse(otmp)` /
  `body_part(HAND)`. `obj_pmname_corpse` checked against
  `do_name.c:1320–1359`: `#if 0` omit named, CORPSE/STATUE/
  FIGURINE + ismnum guard, cgend/mgend/mndx computation, and the
  ALIGNED_CLERIC+CORPSTAT_RANDOM→PM_CLERIC remap all match; the
  fallthrough (`'thing'` vs C's `impossible` + joke string) is
  pre-existing and unreachable at this call site (CORPSE
  guarded, valid corpsenm). Same on the live path.
- `(await paranoid_ynq(true, buf, false)) !== 'y'` keeps C
  `!= 'y'` shape and arg order. No RNG in this path.
- Wiring vs `:720`: guard sits after `canletgo`, before unwield,
  returning ECMD_FAIL — identical placement, including the
  double CORPSE check (C checks in both `drop` and the guard).
  `menudrop_split`→`drop(otmp)` delegation confirmed on both
  sides (C `:976`, JS `do.js:2484`), so menu drops ride the guard
  per C, as claimed.

Hallucinations / overclaim: none. Every callee claim (export
sites, no-clone, edge safety, trap.js subset clone staying named)
verified. No dispatch-over-stub shape — guard + all callees live.

Density: §2b upper end of right size — one guard + its C-mandated
wiring + export-only callee changes across three files, one
caller/callee cluster. Full suite auto-run (shared files). OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs --fn
better_not_try_to_drop_that` → PASS syntax/rule2/green/strict/
cohort/full-44/44, explicitly vacuous hidden note with no
corpus-PASS claim, plus a 4-case probe (PROBE PASS). Reviewer
re-measured: `hidden-proxy verify better_not_try_to_drop_that
--base 0af4de34~1` → "0 session(s) blocked (0 at baseline, 0 in
working scoreboard)". Honest. Diff-body banned grep clean; Rule
#2 clean (intra-`js/` ESM only).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
