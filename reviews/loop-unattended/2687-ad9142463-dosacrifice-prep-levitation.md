# Review 2687 — ad9142463 — dosacrifice off-altar prep (live Levitation/Flying)

Metadata: SHA `ad9142463`, D-3823, cliffs head `pray.c`
dosacrifice. JS: `js/pray.js` (+10/−5: import + prep arm +
altaralign reorder). Test:
`scripts/dosacrifice-levitation-prep.test.mjs`. Ledger row
applied (`docs/ledger/pray.c.jsonl` touched).

## Intent vs deliverable

Promise: the `:1860–1864` prep read dead `u.Levitation`/`u.Flying`
flats (always "on"); read the live mhitu exports; altaralign
above the guards in C order. Claimed: 95337 729→798 (moved).
Diff actually does: exactly that. Match. (This SHA also committed
a stale `scoreboard.json` re-failing 4 sessions — process failure
covered below; repaired by D-3824, no js/ involved.)

## Inventory

- `dosacrifice` (js/pray.js:2747) — changed: prep arm reads
  `Levitation() || Flying()` (mhitu.js imports on the pre-
  existing edge); `altaralign` hoisted above the guard. C
  `pray.c:1853–1896` (csym): `:1857` altaralign first, `:1860–
  1864` `(Levitation || Flying) ? "over" : "on"`, extcmd-only
  dispatch (no direct C call sites).
- Imported readers: `Levitation` (js/mhitu.js:699, sync) and
  `Flying()` — both LIVE (one clone fewer each; `sym.mjs`
  Levitation shows 10 remaining local clones elsewhere —
  untouched, named for future rows, not this one).
- `a_align` (js/pray.js) — verified pure level read (no RNG, no
  writes), so the reorder is order-only. C `Levitation ≡
  (H||E)&&!B`, `Flying ≡ (H||E||steed)&&!B` (`youprop.h:238–
  256`, read).

## C ↔ JS fidelity

Prep arm now matches C `:1860–1864` exactly, in C order
(altaralign `:1857` first — two pure reads, unobservable
reorder). Reader soundness verified writer-by-writer: zero
writers of the `u.Levitation`/`u.Flying` summary flats in `js/`
(the old read was dead; the new readers' first-line sticky arms
are dead-but-harmless); every sampled `uprops[LEVITATION]` slot
write derives from the flats (eat.js:3110, timeout.js:1317–18,
potion sync, do.js:3144 co-write, do_wear mirror) — so mhitu
`Levitation()` (flats-only, D-1085 slot union deferred and
named) ≡ C everywhere today, and `Flying()` (flats+slots+steed,
blocked union) ≡ C `Flying` arm-for-arm. At the probe step this
is exactly the measured state (uprops intrinsic 8, H-flat 8,
summary undefined → "over"). No RNG; none added. Gap: none.

## Hallucinations / overclaim

The D-log Verify bullet (1 moved, REACH-OK, gates) is accurate
for the js/ — but this SHA's committed `scoreboard.json`
re-failed 4 already-PASS sessions (95230/95244/95231/95210) with
rows matching their pre-D-3820/21/22 states: a verify-then-edit-
then-commit (D-1831 shape), documented and repaired by D-3824
(board-only, sanctioned scorer). Process debt, not a C-wrong:
the js/ never contradicted C, the 4 sessions PASS live, and this
audit's closing full rescore re-verifies the board. No Must-fix
— nothing remains to ship.

## Density

Cliff-phase: head writer correct (prep arm the divergence names;
D-1667 read honored). dosacrifice now whole on the prep path
(D-1667/D-1678/D-2345 arms pre-existing). Ledger entry applied.
Verify bullet: moved + REACH-OK + green + strict + cohort.
Moved-only (not PASS) is legitimate PROGRESS for a writer row;
the session's onward PASS (D-3825) corroborates the 729→798 move
chain. Not unreached: probe moved strictly later.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify dosacrifice --base ad9142463~1
--reach-all` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (95337 PASS at HEAD — subsumes the claimed move; the
729→798 step itself is corroborated by D-3824's live diff and
D-3825's onward PASS from You_see@798) and smoke 24/24 REACH-OK.
Zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
