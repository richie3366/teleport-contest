# Review 2815 — 7d4cd240b — pay menu restarted over select_menu_pick_any

- **SHA:** `7d4cd240b` (Thu 2026-10-15) — cliffs-head writer (D-3969).
- **D-entry:** D-3969. **Ledger:** `shk.c` (menu_pick_pay_items).
- **Diff size:** `js/shk.js` −78/+74 net (loop deleted, raw-list adapter); +1 test.
- **Method:** cliff (1 restart) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: shop-Monk-50255713 s384 diverges only in paint
timing — post-ESC-dismiss row 23 C «T:35» vs JS «T:36», RNG fully
matched (25992/25992), both sides moves=36 — because the private pay-menu
loop repainted `docrt()+flush_screen()` per key, committing fresh status
C never paints (windows.c select_menu scopes `gb.bot_disabled`; corner
dismiss is docorner). The fix restarts the clone as a C-order raw-list
builder delegating to `select_menu_pick_any` (bot_disabled + paging +
keep_status dismiss inside), ESC→0, queuedpay per pick. 1 moved
(384→683).

The diff is exactly the restart. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | raw list: amt width, used-up/unpaid headings, paydoname quan swap, `"%*ld Zm"` text, `a_int: i+1`, ITEMFLAGS_NONE, end_menu prompt rows | shk.c menu_pick_pay_items :1666–1739 (:1684–1691, :1696–1700, :1704–1708, :1710–1713, :1717–1720, :1723) | C-exact, in C order |
| 2 | `select_menu_pick_any(raw, {cancelValue: null})` → `!picked → 0`, queuedpay per pick, return `picked.length` | :1724–1725 select+destroy, :1727–1735 queuedpay loop, FIXME :1729–1732 (counts ignored — C behavior), :1738 `max(n, 0)` | C-exact |
| 3 | stale-T kept via pager's bot_disabled + keep_status dismiss | windows.c select_menu :1859–1863 (save/set/restore around win_select_menu) | C-exact (verified in pager) |
| 4 | `pay-menu-pager.test.mjs` (2/2) | 50255713 s384 | test-only |

`sym.mjs` on the re-pointed symbol (required):

```
select_menu_pick_any js/options.js:10226   ASYNC — await required
```

LIVE and awaited ✓. Pager internals re-verified: per-page accelerator
restart, `set_bot_disabled(true)`→restore, `dismiss_nhw_menu({
keep_status: true })` (docorner, never docrt+bot), `{cancelValue}`
returned on ESC (empty-finish still returns `[]` → length 0 ≡ C's
`max(n, 0)` either way) ✓. `gselector: ''` matches C's 0/0 accel ✓;
`a_int` round-trips ✓. Import edge: `imports.mjs --can
js/shk.js js/options.js select_menu_pick_any` → "ALREADY: shk.js
already statically imports options.js. No new edge needed." — zero
new cycle/TDZ surface. Diff grep: no banned patterns. Rule #2 clean
(2808).

## C ↔ JS fidelity

**List build (confirmed cite by cite).** C :1684–1691 largest_amt→width
✓, :1696–1700 used-up heading (plural iff `ibillct>1 && ibill[1]`
used up) ✓, :1704–1708 seam heading (plural iff `i < ibillct−1`) ✓,
:1710–1713 quan swap ✓, :1717 format ✓, :1718–1720 `a_int`+FLAGS ✓ —
the adapter follows in the same order with identical predicates.

**Counts (C behavior, correctly not flowing).** Unlike the D-3968
pickup adapter, subset counts are ignored per C's own FIXME
(:1729–1732: "buying doesn't have any support for that") — the
D-log names this as C behavior rather than an omission ✓ right call.

**Empty-bill guard (JS-necessary, named).** C :1696 dereferences
`ibill[0]` (callers guarantee non-empty); the kept `if (!ibill.length)
return 0` prevents a throw on an un reachable-in-C path ✓. Sole
caller contract (returns n, ESC→0) unchanged ✓.

## Hallucinations / overclaim

None. The "no turn-setup block at 380–383" RNG-owner analysis and the
moves=36-both-sides probe pin the divergence to paint timing before
any code is touched, and the `js-throw` label is disclosed as the
null-owner fallback with the runner evidence — I re-confirmed
(683, owner null, error null, jsPanic null, rngM 25992 exactly as
cited).

## Density

One writer, whole (the entire private loop deleted — no half-migrated
key handling left behind), Ledger tagged, D-3968 precedent followed
(adapter over the pager, not a second pager). No bundled work. The
empty-ibill and pager-inherited omits are named; nothing silent.

## Verification

Re-measured myself (`verify do_statusline2 --base 7d4cd240b~1
--reach-all`) — reproduces the D-log **exactly** (this SHA is HEAD):

```
verify do_statusline2: 0 PASS, 1 moved past, 14 unchanged, 0 worse → PROGRESS
smoke do_statusline2: fixed smoke spread (24 run, 19.2s): 24 PASS, 0 regressed → REACH-OK
```

The 1 moved is shop-Monk 384→683 ✓. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
