# Review 1367 — eb9ad04a — dogmove.c droppables tool-keeping arms (D-2401)

- SHA: `eb9ad04a`, D-2401 (verified missing arm, 0 blocks). JS file:
  `js/dogmove.js` only (+98/−12).
- Prior reviews closed: none (map/arm row, not a first-diff owner).

## Intent vs deliverable

Subject promises the full C-order port (FALLTHROUGH structure,
`|0` artifact idiom, canonical `MON_WEP`/`which_armor`, live
imports, never-returned dummy). Diff delivers exactly that over
the 9-line animal-only stub. Promise kept in full.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `droppables` body | stub → full port | LIVE, branch-exact (below) |
| `MON_WEP` (weapon.js:84) | C callee, edge ALREADY | LIVE sync, awaited-n/a |
| `which_armor` (worn.js:404) | C callee, edge ALREADY | LIVE sync (other files' clones untouched — this commit imports the canonical, correct) |
| `is_pick` (objects.js:136) | C callee, extended edge | LIVE sync |
| `is_animal/mindless/tunnels/needspick/nohands/verysmall` | C callees, extended edge | LIVE (existing monsters.js edge) |
| otyp consts (`indexOf`) | numeric, all resolve (71/259/261/221/222/223/438, no −1) | verified live |
| dummy sentinel | fresh per-call `{otyp:GOLD_PIECE, oartifact:1}` | equivalent (C static never returned/mutated; only otyp/oartifact read) |

Nothing deleted; no clone → import swaps. No `sym.mjs` owed beyond
the LIVE checks above (all pasted).

## C ↔ JS fidelity

C locus: `droppables` (`dogmove.c:27–136`, csym range) + callers
(`:416` dog_invent, `:502` dog_has_minvent, `steal.c:892` relobj).

- Preamble exact: zeroobj+GOLD_PIECE+oartifact=1 → sentinel;
  `wep = MON_WEP(mon)` (replaces the `mon.mwep` approximation —
  canonical `mon.mw`); animal/mindless → all-dummy; else
  `!tunnels||!needspick` → pickaxe=dummy,
  `nohands||verysmall` → key=dummy; wielded `is_pick` → pickaxe,
  wielded horn → unihorn. ✓
- Switch exact arm-for-arm: mattock `which_armor(mon, W_ARMS)`
  reject + pick-preference with `pickaxe!=wep` and
  `(!oartifact||obj-oartifact)` (JS `|0` normalizes undefined ≡ C
  0 — checked all four combinations); PICK_AXE / UNICORN_HORN
  (cursed reject + artifact preference) / SKELETON_KEY →
  LOCK_PICK → CREDIT_CARD preference chain with C's FALLTHROUGHs
  in C positions; default break; tail
  `!owornmask && obj!==wep` return; final null return. ✓
- Dummy-safety: every `pickaxe.otyp`/`key.otyp` compare reads
  GOLD_PIECE on the dummy (never PICK_AXE/LOCK_PICK/CREDIT_CARD),
  and dummy `oartifact=1` reproduces C's "real artifact won't
  override don't-keep-it" — the one subtle behavior, ported. ✓
- Caller closure: all three C sites have live JS callers into the
  upgraded body — :687 dog_invent apport (≡ :416), :417
  dog_has_minvent (≡ :502), :673 relobj loop (≡ steal.c:892, via
  the pre-existing dogmove.js `mdrop_obj` subset). No wiring owed. ✓
- Named omits legitimate: `mdrop_obj` flooreffects/vault-gold/
  worn-shop extrinsics (pre-existing subset comment, map narrowed);
  `dog_has_minvent` standalone export (inlined at :417). ✓
- No RNG either side. ✓

## Hallucinations / overclaim

None. D-log states the vacuous verify explicitly ("row cited no N
so no --base owed") and claims only gates + C citation. Re-measured
below.

## Density

One C function (110 lines) + import closure + map + verify, one
module. Right-sized (§2b).

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|rn2|hardcod` → 0.
- Re-measured: `hidden-proxy verify droppables --base eb9ad04a~1`
  → `0 session(s) blocked (0 at baseline, 0 working)`. Matches.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter under
  1363; no new edges here beyond ALREADY ones).
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted (single
  non-shared module; full-suite skip justified).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
