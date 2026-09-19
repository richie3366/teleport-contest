# Review 1549 — c0bfe985 — attrib.c exerchk whole-body restart (D-2590)

## Metadata

- SHA: `c0bfe985`
- D-id: D-2590. Next index: 1549.
- Files: `js/allmain.js` (+73/−29), `js/polyself.js` (+3/−1: `export`
  on `uasmon_maxStr`).
- C locus: `nethack-c/upstream/src/attrib.c:597–677` (`exerchk`),
  via `node scripts/csym.mjs exerchk` plus full direct read here;
  `nethack-c/upstream/include/attrib.h:43–45` (ATTRMAX macro);
  `:588–595` (exertext table).

## Intent vs deliverable

Subject promises the whole body in C order with the ATTRMAX
Upolyd-Str arm and the unconditional `You` message path, naming the
D_DEBUG arms and the exerper remainder as omits. Diff delivers
exactly that. Promise matches deliverable.

## Inventory

- Restarted: `exerchk` (`js/allmain.js:606`, sync — no new awaits
  except the pre-existing `adjattrib`/`You` ones).
- Changed: `uasmon_maxStr` gains `export` (`js/polyself.js:611`).
  Required `sym.mjs` output: `uasmon_maxStr js/polyself.js:611
  sync` — single definition, promote-not-clone. Nothing deleted or
  re-pointed otherwise.
- Joined: `You` (display.js) + `uasmon_maxStr` (polyself.js) into
  existing static edges (ALREADY pattern, per subject).
- Callees: `exerper`, `adjattrib`, `You`, `Upolyd`, `uasmon_maxStr`
  — all LIVE.
- RNG call-for-call: `rn2(AVAL)` per tested attr + `rn1(200,800)`
  once at the end, same order as C.

## C ↔ JS fidelity

Full body walked against `js/allmain.js:606–670`:

- `exerper()` first; ready gate inverted to early return
  (`moves >= next && !multi`). Match.
- `ax = AEXE`, `!ax → continue`, `sgn`, `ATTRMIN`, `ATTRMAX`
  capped at 18. Match — and the ATTRMAX arm is macro-exact:
  `(x == A_STR && Upolyd) ? uasmon_maxStr() : urace.attrmax[x]`
  (`attrib.h:43–44`, read here) vs JS `(i === A_STR && Upolyd(u)) ?
  uasmon_maxStr() : ...`. The D-log's "behaviorally convergent but
  ships because C-present" framing is honest.
- Limit gate, Upolyd non-Wis gate → halve-only path. Match.
- `rn2(AVAL) > (Wis ? abs : abs*2/3)` with C integer truncation
  (`Math.trunc` both places). Match.
- `adjattrib` → zero accumulation → unconditional `You('%s %s.')`.
  The removed `if (phrase)` guard was verified safe here, not
  trusted: EXERTEXT Int/Cha are `{0,0}` (read `:588–595`), and all
  260 `exercise(` call sites in `src/` pass only A_CON/A_DEX/A_STR/
  A_WIS (53/57/51/99 counts; the two non-constant sites are DEX/STR
  ternaries). AEXE(Int/Cha) can never go nonzero, so `!ax →
  continue` fires first. Match.
- Halve `(abs(ax)/2)*mod_val` with truncation; `next_attrib_check
  += rn1(200, 800)`. Match.

## Hallucinations / overclaim

None. The exerper Clairvoyant/Regen/Monk remainder is named as open
D-1994 (tracked there), not claimed.

## Density

46 insertions for an 81-line C function + one export keyword — one
function family, right size (§2b).

## Verification

- D-log claims VERIFY PASS with `reach: 12 reach it, 12 PASS,
  0 regressed → REACH-OK` plus green/strict/cohort/full 44/44.
- Re-ran here (required):
  - `hidden-proxy verify exerchk --base c0bfe985~1 --reach-all`
  - → 0 blocked both sides (coverage row, expected)
  - → `reach: 12 baseline-PASS session(s) reach it (12 run):
    12 PASS, 0 regressed → REACH-OK`.
- This is genuine reach evidence (RNG-tagged sessions re-run on this
  SHA's code), not smoke — the strongest verify in this window.
  Claim confirmed.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
