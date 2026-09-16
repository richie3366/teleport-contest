# Review 1381 — 2f0f9f76 — shkinit MON_AT insurance rloc (D-2418)

- SHA: `2f0f9f76`, D-2418 (Open row: Ranger-92033 step 70,
  minetn shk-insurance writer). JS files: `js/shknam.js`
  (`shkinit`/`stock_room` async + insurance arm + imports),
  `js/mklev.js` (`fill_special_room` async + 3 awaited sites).
- Prior reviews closed: none (corpus-owner row, 1 block).

## Intent vs deliverable

Subject promises the `:658–660` insurance arm (`(void)
rloc(m_at, RLOC_NOMSG)`) with async threaded to all callers.
Diff delivers it — and deletes a genuine C-wrong: the old
`blocker.mx = 0; blocker.my = 0` parked the squatter at (0,0)
instead of relocating it.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| insurance arm (`shkinit`) | new branch | LIVE — C `shknam.c:658–660` |
| `rloc` (teleport.js:1236, async) | C callee | LIVE — awaited; joined pre-existing static edge (`--can` → ALREADY, no new edge; D-log's "new import edge" overstates, same pattern as 1375/1378) |
| `RLOC_NOMSG` (const.js:2406) | const | LIVE — pre-existing export |
| `shkinit` / `stock_room` / `fill_special_room` async threading | signature changes | complete — `fill_special_room` file-local with 4 awaited sites (3 callers + recursion); `stock_room` has exactly one call site (`mklev.js:24460`, awaited); no sync caller left dangling |

No symbols deleted or re-pointed (`rloc` body untouched per D-0686).

## C ↔ JS fidelity

C locus read in pinned source: `shknam.c:657–660` (`if
(MON_AT(sx, sy)) (void) rloc(m_at(sx, sy), RLOC_NOMSG); /*
insurance */`).

- Guard: JS `blocker = m_at(sx, sy); if (blocker)` ≡
  `MON_AT`/`m_at` pair. Result ignored like C's `(void)`. ✓
- Placement: before `makemon(PM_SHOPKEEPER, MM_ESHK)` — C
  order (insurance runs before the shopkeeper birth, so the
  birth draw stream matches the measured C sequence: 2 tries
  per squatter). ✓
- RNG direction: the old hack drew nothing; C draws the
  arrival `rnd(79)` stream; JS now draws through canonical
  `rloc`. Toward C by construction. ✓
- Named (not charged): `assign_level` clones,
  `good_shopdoor`/`nameshk` locals — pre-existing, untouched. ✓

## Hallucinations / overclaim

None. The D-log is explicit that `verify shkinit` is vacuous
(owner is `rloc`) and verifies under the recorded owner
instead — the prescribed handling.

## Density

~15 functional `js/` lines (arm + awaits) for one measured
arrival writer. Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify rloc --base 2f0f9f76~1` →
  `1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Ranger-92033 → mktrap@98, strictly later; Healer-92042 →
  PASS via the later D-2419). Extends the D-log in the same
  direction, 0 worse. No D-1831 shape.
- D-log's green/strict/cohort/full-44/44 accepted as stated
  (shared `mklev.js` changed, full auto-ran per the runner).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
