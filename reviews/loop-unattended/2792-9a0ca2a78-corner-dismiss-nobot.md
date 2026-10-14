# Review 2792 — 9a0ca2a78 — pickup corner-menu dismiss without bot freshen

- **SHA:** `9a0ca2a78` (Wed 2026-10-14) — do_statusline2-row writer (D-3940).
- **D-entry:** D-3940. **Ledger:** `query_objlist` ported (pickup clone).
- **Diff size:** `js/pickup.js` +14/−6 (two 1-line dismissals + cites),
  new 4-it test.
- **Method:** cliff commit (≤10 fns) — whole Method on both sites.

## Intent vs deliverable (promise vs diff)

The subject promises: 6 scen-shop sessions show JS T = C T +1 on the
pickup-menu key because the inline dismiss ran docrt+flush (fresh
bot); dismissing via live `dismiss_nhw_menu({ keep_status: true })`
at both hand-rolled sites (plus the same-cause loot sibling) moves
5→PASS and Monk 300→783.

The diff does exactly that — two call swaps, C cites, no import or
signature changes. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `query_objlist_pickup` dismiss (pickup.js:1815) | wintty.c erase_menu_or_text :965–984, corner :982–984 → docorner :3649–3721 (bot only :3715–3720) | whole arm vs C |
| 2 | `loot_which_containers_menu` dismiss (pickup.js:4372) | same | same cause, same fix |
| 3 | `scripts/pickup-menu-corner-dismiss.test.mjs` (new, 4 it) | — | passes 4/4 (ran) |

`sym.mjs`: `dismiss_nhw_menu` live async export (invent.js:3191),
`erase_menu_or_text` live async export (display.js:8505). No symbol
deleted or re-pointed — no required re-point output. Import was
already present (pickup.js:17): zero new edges. ✓

## C ↔ JS fidelity

C: fullscreen destroy is docrt()+flush (:978–981); corner destroy is
docorner, which bots only when the menu wrecked the status rows
(:3715–3720 `ymax >= offy → botlx; bot()`). JS callee chain is all
LIVE and C-ordered: `dismiss_nhw_menu` routes corner geom
(paint_corner sets offx≠0 geom) to `erase_menu_or_text` corner arm →
`docorner`, whose `y1 >= 22 && !paging → botlx+bot()` matches C's
gate; the fullscreen fallback is docrt+flush with `keep_status`
skipping the status wipe (C-fresh repaint, no D-0467 blank). The
established no-arg shape (:2802) takes the identical corner path —
`keep_status` only differs on the fullscreen fallback, where true is
the C-faithful choice. Callers match the D-log (:2100/:2120/:3699 +
:4409). No RNG in the path. ✓

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (iteration-wide, SHA 2790).

## Hallucinations / overclaim

None. The "measured both T:92 commits" instrument claim is reverted
temp evidence; the durable proof (5 PASS + focused test) reproduces.
"6 unchanged are different writers" is forward-confirmed: the live
board still lists do_statusline2 HP/state rows, and Monk-783 is the
predicted message-timing div (screen, owner null, Mjollnir topline —
verified in the working row). Note: verify prints such moves as
"→ js-throw" via the `r.owner || 'js-throw'` display fallback
(hidden-proxy.mjs:676); scores.json shows error/jsPanic null — no
throw exists.

## Density

Cliff phase (§10.18): parent head was do_statusline2 12/2296
(verified in `9a0ca2a78~1:docs/LOOP-QUEUE.md`), Must-fix empty.
Writer arm ported with movement on all 6 probes; the sibling fix is a
same-C-file same-cause companion, not a second cliff. Own Ledger
entry. ✓

## Verification

Re-measured myself (`--base 9a0ca2a78~1 --reach-all --jobs 8`, current code):

```
verify do_statusline2: 5 PASS, 1 moved past, 19 unchanged, 0 worse → PROGRESS
  (same 5 PASS; Monk 300→783 unattributed screen div)
smoke do_statusline2: 24 PASS, 0 regressed → REACH-OK
```

The D-log's "5 PASS, 1 moved, 6 unchanged" reproduces on the 12
baseline sessions; the extra 13 unchanged are post-commit Grow #6
arrivals. No REGRESSED session.

## Actionable C-wrongs

None. Both sites C-exact via a live chain, movement and reach
reproduce clean.

Verdict: **ACCEPT**
