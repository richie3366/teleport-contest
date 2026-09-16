# Review 1376 — 2201c4e6 — m_move MAIL_DAEMON departure (D-2410)

- SHA: `2201c4e6`, D-2410 (Open row: Knight-92112 step 96,
  mail-daemon writer measured in the `[measure]` row). JS files:
  `js/monmove.js` only (arm + `mongone` import name +
  `PM_MAIL_DAEMON` const).
- Prior reviews closed: none (corpus-owner row, 1 block).

## Intent vs deliverable

Subject promises the `MAIL_STRUCTURES` mail-daemon departure arm in
C order (verbalize + `mongone` + `MMOVE_DIED`). Diff delivers it —
12 added lines plus two import/const joins, no restructuring.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| MAIL_DAEMON arm (`m_move`) | new branch | LIVE — C `monmove.c:1829–1838` |
| `mongone` (mon.js import) | C callee | LIVE — joined existing static edge (`--can` → ALREADY, confirmed pattern) |
| `SetVoice` / `verbalize` | C callees | LIVE — already imported |
| `PM_MAIL_DAEMON` const | local const | module idiom (`monsterNames.indexOf`, cf. Tengu/mhitm arms) |
| `hero_Deaf` / `canseemon` | local gates | `hero_Deaf` documents C `youprop.h Deaf` equivalence; `canseemon` is the D-1548 named stand-in |

No symbols deleted or re-pointed.

## C ↔ JS fidelity

C locus read in pinned source: `monmove.c:1829–1838` (csym range
for `m_move` is `:1714–2075`).

- Guard: C `ptr == &mons[PM_MAIL_DAEMON]` ≡ JS
  `(ptr?.mndx ?? -1) === PM_MAIL_DAEMON` under the module's
  pointer-identity-is-mndx idiom (same shape as the adjacent Tengu
  arm). `ptr` is `mtmp.data` refreshed after `mintrap`
  (`monmove.js:1736–1737`, C: mintrap can polymorph) — the arm at
  :1787 reads post-mintrap `ptr` as C does. ✓
- Speech gate: C `!Deaf && canseemon(mtmp)` ≡ JS
  `!hero_Deaf() && canseemon(mtmp)` with short-circuit preserved;
  `SetVoice(mtmp, 0, 80, 0)` + `verbalize("I'm late!")` verbatim. ✓
- `await mongone(mtmp); return MMOVE_DIED;` ≡ C `mongone(mtmp);
  return MMOVE_DIED;`. C's `#ifdef MAIL_STRUCTURES` is
  unconditionally defined (`global.h:430`, cited in-code) — no
  config arm to port. ✓
- Placement: after the shop/xm switch, before the Tengu arm —
  C order. ✓ RNG-neutral (the arm draws nothing; the daemon's
  peaceful-getitems `rn2(10)` path is correctly skipped). ✓

## Hallucinations / overclaim

None. The D-log is unusually honest: it reports `verify m_move`
as NO MOVEMENT and explains why (Valkyrie pair diverge at the
unrelated mtrack arm, daemon-free paths draw nothing), then shows
movement on the recorded owner `distfleeck`. That is the correct
reading, not a padded PASS.

## Density

~15 `js/` lines for one measured writer with a 3221-draw
C-vs-JS measurement behind it. Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify distfleeck --base 2201c4e6~1`
  → `1 PASS, 0 moved past, 7 unchanged, 0 worse → PROGRESS` —
  reproduces the D-log summary exactly (Knight-92112 → PASS, 0
  worse). Genuine owner movement, no D-1831 shape.
- D-log's green 2/2 + strict ×2 + cohort 7/7 + full 44/44 (shared
  file) accepted as stated.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
