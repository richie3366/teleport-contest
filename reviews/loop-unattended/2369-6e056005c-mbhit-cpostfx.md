# Review 2369 — 6e056005c — mbhit arms + cpostfx omit retired (D-3422)

- SHA: `6e056005c` — "Open head: mbhit arms whole + cpostfx omit retired + 2 sfbase stubs (D-3422)."
- D-entry: D-3422. Diff: js/muse.js (+12/−4), js/eat.js (comment-only),
  js/sfbase.js (+16); ledger muse/eat/sfbase; journal + index + queue.
- Scope: 4 functions (mbhit, cpostfx, 2 stubs) — whole Method per function.
- `sym.mjs`: nothing deleted or re-pointed (one import extension + two
  arms + two stubs) — no paste obligation. New callee resolves to the
  single live home (destroy_drawbridge dbridge.js:851, async, awaited).

## Intent vs deliverable

Promise: ship mbhit's two named arms (unseen-mon map_invisible before
fhitm; STRIKING destroy_drawbridge); retire cpostfx's WIN_MAP-flush
omit as the house more() idiom with proof; append 2 sfbase no-ops.

Diff actually adds: the map_invisible gate (1 line + comment), the
destroy arm (1 await + comment), the dbridge import extension, the
cpostfx doc/inline rewording (zero behavior change), the 2 stubs.
Promise == deliverable.

## Inventory

```text
mbhit                | ported | js/muse.js:mbhit (local, C staticfn) | C muse.c:1733-1812 (csym)
cpostfx              | ported | js/eat.js:1899 (local, C staticfn)   | C eat.c:1128-1328 (csym)
norm_ptrs_vlaunchinfo| ported | js/sfbase.js:572                     | C sfbase.c:1097-1099
norm_ptrs_vptrs      | ported | js/sfbase.js:580                     | C sfbase.c:1102-1104
```

4/4 Ledger entries present; Left open none (true).

## C ↔ JS fidelity

`mbhit` WHOLE — full body walked vs C :1733-1812, not just the delta:
bhitpos/ddx/ddy init, `while (r-- > 0)`, isok back-off break, u_at →
fhitm(youmonst) + range−3 (JS gameover-return ≡ C never-returns),
m_at → NEW `if (cansee(x,y) && !canspotmon(mtmp)) map_invisible(x,y)`
before fhitm + range−3 (≡ C :1763-1765 exactly), fhito_loc + range−1,
ltyp read after fhito (C order), NEW STRIKING + `!= DRAWBRIDGE_UP` +
find_drawbridge → `await destroy_drawbridge(dbxy.x, dbxy.y)`
(≡ C :1776-1783; dbxy mutated in place like C's &dbx/&dby),
else-if door switch (OPENING/LOCKING/STRIKING placeholders →
doorlock → zap_oseen makeknown → D_BROKEN + in_rooms SHOPBASE →
add_damage(x,y,0); `loc` is a live cell ref so the post-doorlock
doormask read is fresh like C's re-read; add_damage verified sync),
ZAP_POS/locked-door stop with back-off break (≡ C :1797-1803).
Callers unchanged (C :864/:978/:1884 → the 2368-verified JS sites).
`ported` correct.

`cpostfx` WHOLE — full 200-line body walked vs C :1128-1328 (the flip
rides no code change, so the walk is the evidence): eatmbuf cleanup,
WRAITH pluslvl, 3× lycanthropy latches, NURSE heal/blind/botl,
STALKER invis arms + newsym + double fallthrough stuns (second stun
reads the already-bumped HStun like C), mimic tmp 10/20/20
fallthrough + S_MIMIC/Unchanging gate + polyselfs-conduct livelog
(`!prev++` shape exact) + dismount/nomul/multi_reason/eatmbuf strings
+ m_ap_type/newsym, QUANTUM HFast toggle, LIZARD clamps, changeling
tin-use + polyself, DISPLACER toggle + d(6,6), DISENCHANTER attrcurse
(C debugpline0 compiled out — `#ifdef DEBUG`, contest builds unset;
established drop idiom), Rider no-op break, MIND_FLAYER rn2(2)/
bland/fallthrough, check_intrinsics block (hallu +200, newt buzz,
corpse_intrinsic −1/+1 arms; JS `prop` ≡ C's reused `tmp`),
lycanthropy set_ulycn + retouch_equipment(2). RNG exact throughout
(rn1(100,50), d(6,6), rn2(2)). The retired omit is proved, not
hand-waved: C eat.c:1222-1224 runs after the mimicking plines (topline
non-empty), and wintty.c tty_display_nhwindow NHW_MAP+blocking is
exactly end_glyphout + forced --More-- (wintty.c:1875-1882) —
curs_on_u's flush_screen + more() with the detect.js:372/dogmove.js:1801
precedents. All 3 C callers wired (:563/:1613/:3964 → eat.js
:2292/:3849/:3449). `ported` correct.

Stubs: C bodies are `{ }` empties (sfbase.c:1097-1099/:1102-1104,
verified); JS no-ops in C order between version_info and you. No
callers (SFCTOOL declarations).

## Hallucinations / overclaim

None. "All three already imported" true (cansee/canspotmon/
map_invisible pre-date the SHA). "Dbridge edge already static" true
(import line extended, no new edge). "House more() idiom" proved
against wintty.c, not asserted. No dispatch rides a stub.

## Density

Four-function iter, no manifest (coverage rows, operator override).
Per-function verdicts: mbhit ACCEPT; cpostfx ACCEPT; both stubs
ACCEPT. Per-function Ledger entries + Verify line present.

## Verification

- Re-measured all 4 fns (`--base 6e056005c~1 --reach-all`): 0 blocked
  everywhere (vacuous, as D-logged) + smoke 24/24 PASS → REACH-OK ×4.
  0 regressed, 0 worse. Claims hold.
- `imports.mjs --rulecheck`: Rule #2 clean (this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
