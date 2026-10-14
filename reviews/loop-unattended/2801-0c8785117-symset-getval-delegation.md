# Review 2801 — 0c8785117 — O-menu symset rows delegate to live get_val

- **SHA:** `0c8785117` (Wed 2026-10-14) — cliffs-head writer (D-3952).
- **D-entry:** D-3952. **Ledger:** `doset_simple_menu` + `doset` D-tagged.
- **Diff size:** `js/options.js` +8/−13, +1 test.
- **Method:** cliff (≤10 fns) — whole Method on both arms + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: both O-menu symset rows (simple hand-roll,
full-doset literal) delegate to the live `optfn_symset` get_val via
the sibling `doset_compopt_get_val` shape, with the C k-swap on the
simple arm — 8 PASS + 27 moved.

The diff does exactly that. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | simple symset arm → `doset_compopt_get_val` + k-swap | `doset_simple_menu` :8603–8618 | call-for-call |
| 2 | full-doset symset row → `get_val` | `doset_add_menu` :9038–9043 | call-for-call |
| 3 | symset-loader +1 row-wiring test | — | failed pre-fix, 17/17 post per D-log |

No helper added, no import change (same file), no symbol deleted.
Delegation targets are LIVE: `optfn_symset` exported sync
(options.js:3694, get_val mirrors :4205–4215 — name-or-default,
active gate, handler tail, OPTN_OK); `optfn_roguesymset` exported
(:3632); `doset_compopt_get_val` is the shared local for C's
repeated `(*optfn)(idx, get_val, FALSE, buf2, empty_optstr)` shape
(single site, correct reuse).

## C ↔ JS fidelity

C `doset_simple_menu` :8603–8618: k-swap to `opt_roguesymset`
(including the name swap) on rogue levels, then the uniform optfn
get_val call, then buf2-or-"unknown". JS: value half
`Is_rogue_level() ? get_val(optfn_roguesymset) :
get_val(optfn_symset)` + the pre-existing name half at :10101
(`dispName` swap) — both halves of the swap live. C
`doset_add_menu` :9038–9043: same call shape — JS row matches, and
the sibling rows (suppress_alert, versinfo, …) already use the same
helper, so this also heals a shape inconsistency. The "behavior-dead
gate" claim holds: C `:4205–4215` unconditionally returns optn_ok
with a non-empty buffer (name or "default"), so buf2-or-"unknown"
can never fire for symset — matching every sibling row. The
Boolean-DECgraphics no-fallback claim holds mechanistically: rc
`decgraphics` runs `optfn_DECgraphics` do_set, which dupstrs the
name + `read_sym_file` + `switch_symbols` (C :1409–1419,
BACKWARD_COMPAT live per optlist.h:15; JS :8273–8289 mirrors it),
loading the gs slot the get_val reads.

**Cite error (observation, not a C-wrong):** the D-log/commit cites
"optfn_DECgraphics do_set (:5191/:5327)" — those lines are inside
`optfn_boolean`; the real locus is :1394–1425. Mechanism verified
true on both sides; only the numbers are wrong.

Diff grep: zero banned patterns in added lines. Rule #2 clean
(iteration-wide, SHA 2796).

## Hallucinations / overclaim

None. The 12 same-step re-attributions are disclosed with the count
and the landing owner (handler_menu_colors — the live next cliff,
same screen, next differing row); the verify tool labels them moved
and my re-measure reproduces the exact triple. The `js-throw`
landings are all at strictly later steps (0 worse by construction).

## Density

Cliff discipline holds: one writer, two rows, the commit's own
Verify line is the deliverable (8 + 27 + 0 + 0). The `doset`
D-3457-audited partial correctly stays partial.

## Verification

Re-measured myself
(`verify optfn_symset --base 0c8785117~1 --reach-all`) — reproduces
the D-log **exactly**:

```
verify optfn_symset: 8 PASS, 27 moved past (12 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS
smoke optfn_symset: 24 PASS, 0 regressed → REACH-OK
```

No REGRESSED session. The `js-throw` landings (e.g. 87→189,
114→712) are later-step owner-null screens per the D-3951
precedent, never earlier.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
