# Review 2541 — f833c81a8 — display_pickinv fabricated message

Metadata: SHA `f833c81a831721ee3669793eb477a558a4edc9bc`, D-3664,
cliff-head `invent.c` display_pickinv. js diff +9/−3 in `js/invent.js`
(three arms of `display_pickinv_reply`); + focused test
`scripts/pickinv-empty-invent.test.mjs`.

## Intent vs deliverable

Promise: Samurai-94239 @78 showed C `Not carrying anything.` vs a JS
fabrication `Not carrying anything appropriate.` on three arms. Print
C's text on n==0; drop the pline (silent `'\0'`) on the other two. Diff
does exactly that; nothing bundled.

## Inventory

- `display_pickinv_reply` (`js/invent.js:3939`, the D-3621 split reply
  half): (1) n===0 `:3965`; (2) lets[0]-absent `:3991`; (3) empty-menu
  `:4099`. C: `staticfn char display_pickinv`, `invent.c:3056–3414`
  (`csym.mjs` misses the `staticfn`-macro definition; body verified by
  direct read of `:3130–3180` and `:3360–3414`).
- No helpers/imports touched; no symbols deleted or re-pointed.

## C ↔ JS fidelity

- Arm (1): C `:3140–3143` `if (n == 0) { pline("%s.",
  not_carrying_anything); return 0; }` ✓; literal
  `not_carrying_anything[] = "Not carrying anything"` (`:3066`) +
  `"%s."` = JS's `'Not carrying anything.'` exactly ✓.
- Arm (2): C `:3162–3170` n==1 path — `ret = '\0'`, `if (otmp)` guard,
  silent else ✓. JS sits inside the matching `n===1 &&
  !force_invmenu && !menu_requested` gate, sets `out_cnt.n = -1`
  before the branch (C `:3171–3172` order ✓), returns null — the
  function's documented `'\0'` (`@returns … null if cancelled`) ✓.
  `lets` non-null is pre-existing (`lets.length` at `:3978`).
- Arm (3): C `:3378–3415` — empty menu still runs end/select with no
  pline; `!n → '\0'` ✓. JS returns null silently. The input-consumption
  gap (C waits for a key) is honestly Named with "no session reaches
  it"; return value matches.
- Fabrication claim verified: `Not carrying anything appropriate`
  appears nowhere in `nethack-c/upstream/src/`; remaining
  "anything appropriate" hits are C `role.c`'s own comment, mirrored
  in `js/roles.js` ✓. The wizid half already had the right text.
- Callee closure: `pline`, `reassign`, `message_menu` live; no new
  calls. Callers unchanged; null was already the n==0 return.

## Hallucinations / overclaim

None. The D-log's extra claims (pre-change `--no-cohort` PASS, forced
full 44/44, stash-verified 0/1→1/1) are all consistent with the diff
shape; the stash check I did not re-run, but the mechanism (literal
swap) leaves no room for a false green.

## Density

Cliff-phase §2b: one cliff, owner ported whole across its three
affected arms with C cites, callers table standing, Ledger `split`
row updated. Per-arm: ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/coords/`fastforward`.
- Re-measure on the SHA's own code (scratch worktree):
  `verify display_pickinv --base f833c81a8~1 --reach-all` →
  `1 PASS (Samurai-94239), 0 worse → PROGRESS` + smoke 24/24
  REACH-OK. Claim reproduced exactly; no REGRESSED.
- Focused test on SHA code: 1/1 green.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
