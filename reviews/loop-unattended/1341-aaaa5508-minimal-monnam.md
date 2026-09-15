# Review 1341 — aaaa5508 — do_name.c minimal_monnam body + m_detach/place_monster wires

- SHA: `aaaa5508`, D-2375. JS files: `js/do_name.js` (new export), `js/mhitm.js`
  + `js/steed.js` (wires, clone deleted).
- Prior reviews closed: none.

## Intent vs deliverable

Subject promises: sync `minimal_monnam` port + `m_detach`/`place_monster` wires.
Diff actually adds: exported sync `minimal_monnam(mon, ckloc)` (`js/do_name.js:658`),
`m_detach` already-detached wire (FALSE), `place_monster` bounds (TRUE) + overlap
(FALSE/TRUE) wires, deleted `place_mon_nam` clone (`mon_plain` kept). Matches the
promise; no extra scope.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `minimal_monnam` (do_name.js:658) | C callee port (do_name.c:1252–1285) | LIVE, exported sync |
| deleted `place_mon_nam` (steed.js) | local clone → import | retired ✓ |
| `mon_plain` | kept clone, still used by mount/dismount plines | unchanged, out of scope |

`node scripts/sym.mjs minimal_monnam` → `js/do_name.js:658 sync`.
`sym.mjs place_mon_nam` → NOT FOUND anywhere (retirement complete). Required
re-point output pasted. No new helper, no clone added — cleanest classification
this audit.

## C ↔ JS fidelity

C body (`csym` → `do_name.c:1252–1285`, 34 lines) vs JS, branch by branch:
null mon → `[Null monster]` ✓; null data → `[Null mon->data]` ✓;
`ptr < &mons[0]` → `mndx < 0`, `ptr >= &mons[NUMMONS]` → `mndx >= NUMMONS` ✓ with
disclosed pointer adaptations (numeric `data.mndx ?? mon.mnum`; `0x` hex for
`fmt_ptr`; table ends named symbolically — unobservable: wild pointers cannot occur
in JS and both arms fire only on `impossible` paths); non-numeric data falls through
to the normal arm ✓; ckloc worm-tail arm (`ckloc && LONG_WORM && mx && grid != mon`
→ tail name) ✓ with `mx !== 0` ≡ `mon->mx` and `game._level_monsters` ≡
`svl.level.monsters`; tame/peaceful prefix + `mon_pmname` + `<mx,my>` ✓;
`cham != NON_PM → {…}` ✓ (`?? NON_PM` skips undefined-cham, avoiding garbage no C
state can produce). One `nextmbuf` slot per call (x_monnam idiom) ✓ — the steed
overlap double-call keeps both tags, as C's two `outbuf`s do.
Callers (`csym --callers`, 7 refs): `mon.c:2793` FALSE ✓, `steed.c:910` TRUE ✓,
`:924` FALSE + `:925` TRUE ✓ — every flag exact. `wizcmds.c:1587` named (no JS migr
UI; own row when ported) ✓. Combined-arm closure: no dispatch, no stubs — a pure
debug-tag function whose outputs reach only `impossible` diags (no RNG, no screen
surface in normal play).

## Hallucinations / overclaim

D-log Verify bullet claims green/cohort + an explicitly non-PASS hidden note —
honest. "No new static edges / runtime-only, no top-level TDZ" — the added imports
(`NUMMONS` onto an existing edge, `minimal_monnam` onto existing do_name edges,
`monsterNames`-derived consts evaluated like neighbors) support it. No overclaim.

## Density

~50 js/ insertions for a 34-line C function + 3 wires + clone retirement: one C
locus, right-sized (§2b).

## Verification

- `imports.mjs --rulecheck` → Rule #2 clean (this review, whole-tree).
- Diff grep `FORCE|DIAG|getRngLog|fastforward` → 1 hit, commit-message prose only.
- Re-measured: `hidden-proxy verify minimal_monnam --base aaaa5508~1` → "0 at
  baseline, 0 working" — row cited 0 blocks, vacuous note correctly labeled.
  No seed/step/coordinate reads in the diff.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log (accepted; diag-only surface, probe
  /tmp/probe-minimal-monnam.mjs 16/16 kept out of tree).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
