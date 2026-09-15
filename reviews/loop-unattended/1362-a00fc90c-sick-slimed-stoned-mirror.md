# Review 1362 — a00fc90c — make_sick/slimed/stoned uprops mirror (D-2396)

- SHA: `a00fc90c`, D-2396. JS files: `js/potion.js` only (+26), plus
  `hidden-corpus/scoreboard.json` rescore (Valkyrie-92229 false→true,
  board commit e2d16801→4da5695d).
- Prior reviews closed: none (corpus first-diff owner, 1 block).

## Intent vs deliverable

Subject promises TIMEOUT-bit mirrors to `u.uprops` intrinsics in the
make_sick onset/partial/full-cure arms plus make_slimed/make_stoned.
Diff adds exactly those five mirror stanzas, nothing else. The
commit message honestly attributes the writer (diseasemu→make_sick,
not slimed_to_death). Promise kept.

## Inventory

| JS change | Kind | Status |
|---|---|---|
| `make_slimed` mirror stanza | added write | LIVE (C single storage) |
| `make_stoned` mirror stanza | added write | LIVE |
| `make_sick` onset mirror | added write | LIVE |
| `make_sick` partial-cure mirror | added write | LIVE |
| `make_sick` full-cure `intrinsic = 0` | added clear | LIVE (C `:173 Sick = 0L`) |

Required checks: no new/changed functions, imports, or edges
(game-local writes only); no symbols deleted or re-pointed → no
`sym.mjs` obligation; no callees touched → no LIVE/CLONE/STUB table
owed.

## C ↔ JS fidelity

C loci opened: `make_sick` (`potion.c:134–192`, csym range),
`set_itimeout` (`:75–79`, read in source), onset/partial/full arms.

- C single-storage confirmed: `Sick`/`Slimed`/`Stoned` ≡
  `uprops[].intrinsic`; `set_itimeout` writes TIMEOUT bits only and
  preserves flags. Each mirror matches that shape: create slot when
  missing, `(intrinsic & ~TIMEOUT) | itimeout(xtime)`, full cure
  clears the whole intrinsic. ✓
- The claimed mechanism is real and verified in-tree: SICK/SLIMED/
  STONED are absent from `TIMEOUT_DEDICATED` (`js/timeout.js:81`), so
  they tick in the generic uprops `--` loop (`:1010+`), which writes
  the decremented value back into the flat (`u[flat] = (flat &
  ~TIMEOUT) | (next & TIMEOUT)`); `sync_timeout_flats` only fills
  uprops when its TIMEOUT is empty (`:326`), so a flat-only write by
  `make_sick` was clobbered by the stale uprops value on the next
  tick — exactly the "Sick stays large" symptom behind the C-"even
  worse"/JS-"much worse" topline (the `xtime <= Sick/2` gate itself
  was already live in JS). ✓
- Onset/partial/full message gates and `usick_type` handling are
  pre-existing and untouched — out of scope. ✓
- One pre-existing note (not this SHA): partial cure computes
  `itimeout((old & TIMEOUT) * 2)` while C `:169` passes full
  `Sick * 2` into `set_itimeout` — identical unless non-TIMEOUT flag
  bits are set (all flag bits sit above TIMEOUT, `prop.h:135–140`,
  so C's `>= TIMEOUT` clamp would fire where JS doubles the masked
  value). The mirror faithfully copies the flat computation, so any
  residual there belongs to the older port, not this diff. Not
  Actionable here.
- "Named: make_vomiting/stunned/confused writers share the shape
  (own rows if a session blocks)" — proper conditional deferral, not
  invented filler. ✓

## Hallucinations / overclaim

None. Reports the verify as exactly 1 PASS (not a suite claim);
attributes the writer correctly; states "no new imports/edges"
(truly game-local writes).

## Density

One dual-storage defect + rescore in one handoff. Right-sized (§2b).

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|hardcod` → 0.
- **Independently re-measured:** `verify slimed_to_death --base
  a00fc90c~1` → `1 session(s) blocked (1 at baseline, 0 working);
  scen-death-Valkyrie-92229: PASS; 1 PASS, 0 moved past, 0 worse →
  PROGRESS`. The D-log claim is true — no D-1831-class regression.
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
