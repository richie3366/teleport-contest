# Review 915 — 31f18e8a — steal.c stealamulet amulet-steal singleton (D-1945)

## Metadata

- SHA: `31f18e8a` (D-1945). JS: `js/steal.js` +133/−4 (new export `stealamulet` at steal.js:425, async).
- Subject promises: `stealamulet` in C order, `any_quest_artifact` inlined, new shk/teleport/const/artifact-data edges `--can` SAFE, hand probe, full 44/44 forced.
- Prior reviews closed: none.

## Intent vs deliverable

Promise matches diff. One exported async function + 7 otyp consts + 4 extended import lines. No DIAG/FORCE/seed gates (grep count 0). Rule #2 clean (whole-`js/` rulecheck, re-run this iteration).

## Inventory

| Symbol | Class |
|---|---|
| `stealamulet(mtmp)` | new export; ports C `steal.c:688–767` |
| `worn_item_removal`, `freeinv` (local), `mpickobj`, `doname`, `Some_Monnam`, `pline`, `encumber_msg` | pre-existing callees, reused |
| `subfrombill`/`shop_keeper` (shk.js:881/249, sync), `tele_restrict`/`rloc` (teleport.js:872/1235, async), `can_teleport`, `rnd`, `RLOC_MSG`, `ART_ORB_OF_DETECTION` | LIVE imports; async ones awaited |
| `any_quest_artifact` | macro inlined as `(o.oartifact\|0) >= ART_ORB_OF_DETECTION` — genuine macro expansion, not a missed symbol |

## C ↔ JS fidelity

Branch-by-branch against `steal.c:688–767` (via `csym.mjs`, range cited by the tool): quest-artifact sweep (`n=0` init, `++n`/trailing `otmp`, `n>1` → `rnd(n)` + `!--n` pre-decrement reselect) ≡ JS; uhave amulet→bell→book→menorah else-return ≡ JS, including `real`/`fake` init 0 so book/menorah leave `fake` unset exactly as in C (D-log claim verified in the C body); second otyp sweep with `!mtmp->iswiz` fake gate ≡ JS; outer-gear strip order (cloak→suit→weapon/twoweap→gloves→target→subfrombill→freeinv→doname-before-mpickobj→pline→rloc-gate→encumber) ≡ JS. `rnd` semantics match (js/rng.js:97: `RND(x)+1` = 1..n = C `rnd`). `shop_keeper(*u.ushops)` → `(u.ushops||'')[0]` preserves the null-ushops shape. `freeinv` local (steal.js:222) delegates to `freeinv_core` — thin, named in map as pre-existing drift, not a divergent clone. `worn_item_removal` local clone (steal.js:137, async) is awaited at all 5 sites. No RNG beyond the two C `rnd` calls.
- `sym.mjs` callee table (this audit): `stealamulet` js/steal.js:425 ASYNC; `worn_item_removal` 1 local clone (steal.js:137); `mpickobj` makemon.js:1694 sync; `subfrombill` shk.js:881 / `shop_keeper` shk.js:249 sync; `tele_restrict` teleport.js:872 / `rloc` teleport.js:1235 ASYNC; `encumber_msg` invent.js:998 ASYNC. Async-ness matches every call site (`await` on tele_restrict/rloc/encumber_msg/worn_item_removal; sync on subfrombill/shop_keeper/mpickobj).
- Second-sweep reselect verified index-for-index: C `for (otmp = gi.invent; otmp; otmp = otmp->nobj) if (... && !--n) break;` → JS `for ... if (... && !--n) { otmp = obj; break; }` — same trailing-target-then-reselect shape, last match wins when n==1, `rnd` uniform over matches when n>1.
- Otyp consts (`AMULET_OF_YENDOR`, `FAKE_AMULET_OF_YENDOR`, `BELL_OF_OPENING`, `BELL`, `SPE_BOOK_OF_THE_DEAD`, `CANDELABRUM_OF_INVOCATION`) follow the file's `GOLD_PIECE` `indexOf` idiom — constants, not symbols, correctly outside the callee closure.

## Hallucinations / overclaim

None. "Vacuous" hidden-verify note is explicit; no corpus-PASS claim. `--can` re-run at HEAD says ALREADY (edges now static) — consistent with the D-log's pre-commit SAFE check, not a contradiction.

## Cited ranges (tool-pinned)

- C: `steal.c:688–767` (whole body walked above); caller
  `uhitm.c:4584` (`mhitm_ad_samu` `!rn2(20)` arm, still unwired).
- JS: `stealamulet` steal.js:425–538; consts adjacent to `GOLD_PIECE`;
  local `worn_item_removal` steal.js:137, local `freeinv` steal.js:222.
- RNG ledger: exactly two `rnd(n)` sites, both `n > 1` guarded, in C
  order (quest-artifact reselect, then otyp reselect). No other draws.
- D-log hand probe (6 asserts, deleted): empty-uhave silent return,
  real-amulet steal, fake-vs-iswiz, quest-artifact preference,
  two-artifact single steal — all consistent with the C arms above.

## Density

Right-sized §2b: one C function, 133 insertions, code + map + verify + forced full in one handoff (full justified by new static edges).

## Verification

- `hidden-proxy verify stealamulet --base 31f18e8a~1`: 0 blocked at baseline and now — matches D-log (map-driven row, 0 blocks cited); no `--base` re-run owed, none claimed.
- Callee closure: every arm callee LIVE / macro / named pre-existing clone. No stub in a live arm.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
