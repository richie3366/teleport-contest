# Review 2905 — f5ebab89b — digactualhole's 5 extra newsyms deleted

- SHA: `f5ebab89b` (cliff writer: newsym removal, 1 session)
- D-entry: D-4066; Ledger: dig.c (`digactualhole ported`,
  +D-4066 tag)
- `js/` diff: `js/dig.js` +10/−5 (4 removals → comments,
  tail → comment; pure deletion); new
  `scripts/digactualhole-no-tail-newsym.test.mjs`

## Intent vs deliverable

Promise: C digactualhole issues zero newsyms, so delete all
5 JS extras (4 early-arm + tail); Monk-50255213 s992 →
FULL PASS. The diff deletes exactly those 5 call sites and
nothing else — no imports, no signature change, callers
untouched. Promise = diff.

## Inventory

- `digactualhole` mtmp arms (dig.js:958/962/976/985):
  `newsym(x, y); return;` → comment + bare `return`. C:
  dig.c:802–805, :806–807, :812–813, :814–817.
- `digactualhole` tail (dig.js:1003–1006): unconditional
  `newsym(x, y)` → C-cite comment. C: :640–829 falls out
  silently.

No added functions, no deleted symbols, no re-pointed
clones — step-3 paste not triggered. No callee closure to
check (pure removal).

## C ↔ JS fidelity

Confirmed against pinned C (csym `digactualhole`):

- `grep -c newsym` over the full csym body: **0**. The
  "C body has zero" claim is exact, not sampled.
- Early arms: C :802–805 `!grounded‖worm‖huge → return`,
  :806–807 `u.ustuck → return`, :814–817 botlevel
  pline + `return` — all bare, verified by sed
  :795–830. JS now matches each.
- Tail: C ends :823–829 with the migrate block close and
  silent fall-out. JS tail comment's redraw story holds:
  the function still calls `maketrap` (:815) +
  `seetrap` (:820), and zero `newsym(` calls remain in
  js/dig.js:766–1007.
- The display-RNG mechanism (each hero-cell statue map
  burns draws JS-side only, shifting later hallu glyphs)
  is consistent with the observed fix: game RNG was
  already 40728/40728, only screens diverged — exactly
  what a display-draw shift produces.

One comment-precision nit (not a C-wrong): the :976
comment labels C :812–813 "bare return", but C there is
`if (Is_stronghold) assign_level(...)` with **fall-through**
to migrate_to_level — no return. The JS `else { return; }`
it annotates is a pre-existing `game.valley_level`-missing
guard (a state C never exhibits: `valley_level` is always
populated), untouched semantically by this diff. The
operative claim — "no newsym" — is exactly right at all
5 sites. Not queueable (comment-only; no behavior delta).

## Hallucinations / overclaim

None. The D-log states the digactualhole verify is vacuous
(0 blocked) and claims movement only on use_pick_axe2
plus reach lines — honest framing, no "PASS hidden" on an
empty check. The bundled Tourist-50650015 stale flip is
disclosed in-commit with its rescore provenance.

## Density

Cliff writer, first live row past re-verified parks
(18× D-4016 + 95340 + fresh D-4064/D-4065 parks, each
falsifier quoted unfired). Owner use_pick_axe2 proven
symptom with the ledger standing; writer shipped whole
(the entire C body audited for newsym, not just the tail).
One `Ledger:` entry, verified. Named omissions: none —
correct, since the removal completes the function. The
5-site bundle is one C contradiction, REACH-guarded. No
unreached work.

## Verification

Re-measure (`--base f5ebab89b~1 --no-reach`):

```text
verify use_pick_axe2: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Monk-50255213: PASS
verify digactualhole: no corpus session is blocked on it at f5ebab89b~1
```

Exact match, vacuity disclosed as such. Focused test
1/1 green on HEAD (`node --test`, 1.9 s). No
FORCE/DIAG/seed/coords in the `js/` hunks. Rule #2 clean
(window rulecheck). Reach lines (35 + 3/3) per the pasted
verify tail; the audit's full rescore below is the
regression check.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
