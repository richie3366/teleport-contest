# Review 2462 — 4a0157f83 — doset wizard travel_debug row + playmode get_val (D-3580)

**Metadata.** SHA `4a0157f83` (2026-10-07, D-3580). Type: **cliff**:
writer port for the cliffs head `botl.c do_statusline2`. `js/`
insertions: 8 (`js/options.js` +8/−3).

## Intent vs deliverable

Promise: wizard doset menus held 161 items (7 pages) vs C's 162 (8)
because the 10th wizard bool `travel_debug` was omitted (allopt addr
null, non-DEBUG negateok mirrored); footer «(1 of 8)» vs «(1 of 7)».
Adds the row in C allopt order + live addr + DEBUG-variant negateok,
and routes gameview `playmode` through live `optfn_playmode` get_val.
Probe scen-options-Archeologist-94231 2→optfn_boolean@23; 1 PASS, 9
moved, 1 unchanged, 0 worse.

Diff actually adds: `DOSET_BOOL_ADDR.travel_debug`, the
`insertAfter('travel', 'travel_debug')`, the playmode→optfn_playmode
ternary arm, the live allopt addr, and the `OPT_NEGATEOK_NO` removal
+ doc note. Promise matches diff. No new test file (verify-bullet
only); no symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | doset wizard-bool list (travel_debug row) | partial (pre-existing) | [options.js](/home/debian/dev/teleport-contest/js/options.js:10420) | options.c:8837–8862, optlist.h:786–798 |
| 2 | doset gameview playmode value | partial (pre-existing) | [options.js](/home/debian/dev/teleport-contest/js/options.js:11065) | options.c:9038–9044, 3470–3504 |

Helpers: none added. `optfn_playmode` is the live export
(`sym.mjs`: `js/options.js:8137 sync`, single); `trav_debug` has no
JS consumer yet — named, debug_hunger precedent. No clone→import
re-point, so no `sym.mjs` re-point output is required.

## C ↔ JS fidelity

**travel_debug variant is exactly as cited.** optlist.h:786–798
(read): `#ifdef DEBUG` arm `:790–792` carries `Off, Yes, …,
&iflags.trav_debug`; the `#else` `:793–796` carries `Off, No, …,
(boolean *)0`. patchlevel.h:36 `#define DEBUG` unconditionally
(read) → the compiled row has a live addr and negateok Yes ✓.
Order travel `:786`, travel_debug `:790`, tutorial `:798` ✓, so
`insertAfter('travel', 'travel_debug')` lands the C-relative order
(the commit message's "travel, travel_debug, use_inverse" is the JS
mod-list adjacency, not C allopt — cosmetic wording only).

**Menu-count mechanism confirmed.** C doset bool loop :8837–8862
(read): rows list iff `addr != 0`, `set_wizonly` iff wizard — the
live addr is precisely what admits row 162 in wizard sessions.
Pager wintty.c:2692–2694 (read): `lmax=min(52,rows-1)=23`,
`npages=ceil(n/23)` → 161→7, 162→8 ✓. JS value path is safe:
`doset_bool_value` maps undefined → `DOSET_BOOL_DEFAULT_ON.has`
(read options.js:10444–10449), and travel_debug is correctly absent
(C initval Off) → `[false]`, matching the C recording's `e -
travel_debug [false]` ✓. Negation gate options.c:626 (read:
`negated && !negateok → bad_negation`) is mirrored by
`OPT_NEGATEOK_NO` at options.js:12566 (read) → removal is correct.

**playmode get_val matches C arm-for-arm.** `csym optfn_playmode`
→ options.c:3470–3504: get_val arm `Strcpy(opts, wizard ? "debug"
: discover ? "explore" : "normal")`; JS options.js:8160–8163
(read) is the identical ternary via `set_optbuf` ✓. Dispatch site
C :9038–9044 (read: `optfn(idx, get_val, FALSE, buf2,
empty_optstr)`) matches the `doset_compopt_get_val` shape used by
the sibling rows ✓. No RNG in either arm (screen-only).

Nit (not a C-wrong): the allopt header comment still says "18
BoolOpt rows keep addr null" plus "8 live-field mappings" —
measured 17 null now, travel_debug unlisted. Stale count from this
commit; one-line comment fix for a future touch.

## Hallucinations / overclaim

None. "10 rows now exact vs the compiled allopt" is backed by the
`cc -E` 215-row probe plus the C recording row cited in the D-log.
The wish-92194 unchanged session is disclosed as a separate
symptom, not counted as moved.

## Density

Cliff §10.18: cliffs-head writer, two arms of one pre-existing
partial function, own `Ledger:` touch (doset row gains D-3580 +
rewritten omit). Per-function verdicts ACCEPT ×2 → SHA ACCEPT.

## Verification

- Added-code grep: 0 hits (FORCE/DIAG/getRngLog/fastforward).
- Rule #2: `imports.mjs --rulecheck` clean this iteration (all of
  scored `js/`, run once, cited by every review in this batch).
- Re-measure (mine): `verify do_statusline2 --base 4a0157f83~1
  --reach-all` → **1 PASS, 9 moved past, 1 unchanged, 0 worse** +
  smoke 24/24 REACH-OK — the D-log's numbers exactly, except
  Tourist-94111 now reads do_statusline1@23 (moved further by
  later D-3586 — strictly later, consistent).
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
