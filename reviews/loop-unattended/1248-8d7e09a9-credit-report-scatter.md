# Review 1248 — 8d7e09a9 — shk.c credit_report + scatter shop arms

- SHA: `8d7e09a9` — "`shk.c` credit_report: shop credit/debit report +
  scatter shop arms (D-2282)"
- D-log: D-2282. Queue row: `shk.c` credit_report (D-2274 residual). Row
  cited 0 blocks.
- Character: new-function port + two caller arms in a second module. The
  largest of this batch (+116/−22 `js/`).

## Intent vs deliverable

Subject promises: async `credit_report(shkp, idx, silent)` export in
`js/shk.js` in C position with module-level `credit_snap`, plus the three
C `scatter` caller arms (baseline `:744–747`, per-object gold bill
`:913–929`, tail report `:944–945`), retiring two stale omit comments.
Diff actually does exactly that and nothing else. Promise matches diff.

## Inventory

- Added JS: `credit_report` (`js/shk.js`, now `:453` per `sym.mjs`,
  ASYNC) + `credit_snap` 2×3 module static + BEFORE/NOW const imports.
- Wiring in `js/explode.js` `scatter`: `shop_origin` computation +
  `credit_report(shkp, 0, true)` baseline; per-stmp `obj_left_shop` +
  hero-shop gate + gold-only `addtobill(...,true)`; `if (lostgoods)
  credit_report(shkp, 1, false)` tail. Imports extended, no other logic
  touched.
- Required `sym.mjs` output: `credit_report  js/shk.js:453  ASYNC —
  await required` — pasted, confirmed. Both call sites `await` it
  (`scatter` is async). Single definition, zero clones.
- Required `--can` output: `ALREADY: explode.js already statically
  imports shk.js.` — pasted, confirmed. No new module edge; call-time
  use only.

## C ↔ JS fidelity

C `credit_report` (`shk.c:627–661`, 35 lines via `csym.mjs`) vs JS,
arm-for-arm: `!idx` zeroes both rows; else `idx = 1` normalization;
snapshot credit/debit/loan; `idx && !silent` report with the exact
priority chain (credit-reduced → debit-up → loan-up, C else-if order kept);
`if (amt)` gate; `` `Your ${msg} by ${amt} ${currency(amt)}.` `` — C
`Your("%s by %ld %s.")` with capital Y. BEFORE=0/NOW=1 verified in
`js/const.js:838–839`. `|0` reads = C `long` zero-init. ✓ Async-ness is
forced (JS `pline` awaits) and contained: C's only two callers
(`explode.c:747`, `:945` — confirmed the full caller list via `--callers`)
are both ported here with `await`. No other C caller exists to desync.

C `scatter` arms (`explode.c:744–747`, `:905–945`, read directly):

1. `shop_origin = (shop_keeper(*in_rooms(sx,sy,SHOPBASE)) != 0 &&
   costly_spot(sx,sy))`. JS: `in_rooms` (string-returning, verified
   `js/hack.js:1250`) → `shop_keeper(rooms ? rooms.charCodeAt(0) : 0)` —
   the house idiom, byte-identical to `shk.js:490` — then `!!shkp &&
   costly_spot(sx,sy)`. `shop_keeper(0)` → null both sides (C: invalid
   room; JS: `0 < ROOMOFFSET` guard). ✓
2. `obj_left_shop` declared fresh-FALSE per loop iteration in C — JS `let
   obj_left_shop = false` inside the for-of. Set under the same
   moved-off-origin condition (`shop_origin && !costly_spot(x,y)`). ✓
3. Hero-shop gate `strchr(u.urooms, *in_rooms(u.ux,u.uy,SHOPBASE))`
   **including** the `'\0'` quirk (strchr finds the terminator → true
   outside shops). JS preserves it deliberately with a comment:
   `(heroShopRooms || '')[0] || ''` + `includes('')`. Quirk-for-quirk. ✓
4. Gold-only `addtobill(obj, FALSE, FALSE, TRUE)` + `lostgoods = TRUE`,
   with C's gold-comment rationale kept. JS awaits the live async
   `addtobill` (`js/shk.js:3583`). Other goods fall through to the
   default asking-price path on both sides (no JS invention). ✓
5. `if (lostgoods) credit_report(shkp, 1, FALSE)` tail — "implies
   shop_origin, therefore shkp valid" holds in JS identically. ✓

Callee closure, all LIVE: `shop_keeper` (`shk.js:251` sync),
`costly_spot` (`:809` sync), `addtobill` (`:3583` async, awaited),
`in_rooms` (`hack.js:1250` sync), `GOLD_PIECE` via the house
`objectNames.indexOf` idiom (5 files). No stub in a live arm. No RNG in
any ported arm.

## Hallucinations / overclaim

None. The trickiest claim — the `strchr(…, '\0')` quirk — is real C
semantics and the JS comment explains exactly why `includes('')` is
correct rather than sloppy. "Remote_burglary-idiom" for the shop_keeper
call matches `shk.js:490` verbatim.

## Density

§2b ok: one C function + its two C call sites, two already-coupled
modules, ~116 insertions. Ceiling untouched.

## Verification

- Added-line banned-pattern scan: 0 hits. Rule #2 clean (re-checked this
  iteration).
- Re-measured corpus claim myself: `verify credit_report --base
  8d7e09a9~1` → 0 blocked at baseline and working — matches the D-log's
  vacuous note, correctly not called a PASS.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log; /tmp hand probe 8/8
  through the real modules (credit-reduced / debit-up / loan-up messages,
  silent + no-change + credit-increase silence, idx-7 normalization,
  debit-beats-loan priority, real `currency` oracle). Strongest
  verification of the six — appropriate for the only commit here with
  player-visible message output.

## Actionable C-wrongs

None. Residuals (`sobj_at` boulder-restack, VIS_EFFECTS-commented-in-C)
are named in the map-adjacent row, not Must-fix.

Verdict: **ACCEPT**
