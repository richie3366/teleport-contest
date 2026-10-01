# Review 2146 — c1c0d92f4 — inventory action state

SHA `c1c0d92f4`, D-3186; 2026-10-01; +130/-109 JS. No review closure.

## Intent vs deliverable

“Restore inventory menu state before actions and preserve equipment command
results” restarts eight invent.c bodies, preserves empty header labels,
deletes wear prinv/invent empty_handed clones, and re-points feedback callers.

## Inventory — doprarm

Changed async export; wearing_armor/noarmor/obj_to_let verified same-file
C bodies, dispinv_with_action LIVE; no stubbed slot arm.

## C ↔ JS fidelity — doprarm

invent.c:4600–4638: no-armor report, seven armor slots in C order,
obj_to_let per slot, ignored menu result, unconditional ECMD_OK match.
Command-table caller cmd.c:1852–1853 remains wired.

## Inventory — dispinv_with_action

Changed export; display_inventory/itemactions LIVE, header setter adapter.
itemactions retains map-named surface/cantwield omissions, not closed here.

## C ↔ JS fidelity — dispinv_with_action

invent.c:2961–3002 computes mode before temporary flags, displays through
canned-input-aware wrapper, restores sort/header/force before matching
object/action, and returns action result. Eight executable callers wired;
finally additionally cleans state on JS input failure. Empty string is a
nonnull C pointer, so revised setter correctly preserves it.

## Inventory — prinv

Changed export; obj_to_let, xprname, pline LIVE.

## C ↔ JS fidelity — prinv

invent.c:2874–2890 retains long quantity, conditional total, null prefix,
letter reassignment, dot suppression and verbose suffix. JS xprname argument
order correctly maps C's txt/let/dot/cost/quan signature. All 20 executable
C caller sites were compared; deleted/re-pointed wear/wield/pickup sites
now preserve letter reassignment and quantity.

## Inventory — doprwep

Changed export; empty_handed canonical import, prinv/menu LIVE.

## C ↔ JS fidelity — doprwep

invent.c:4549–4574: empty hands; ordinary primary then twoweapon secondary;
menu reassigns primary once then reads swap/quiver letters. Ignores action
result and returns OK. cmd.c:1860–1861 registration wired.

## Inventory — doprring

Changed export; obj_to_let, pline, menu LIVE.

## C ↔ JS fidelity — doprring

invent.c:4641–4675: empty report, right before left, both meat-ring tests,
multiple/menu ordering and singular/plural header match; result discarded.
cmd.c:1854–1855 registration wired.

## Inventory — dopramulet

Changed export; obj_to_let, pline, menu LIVE.

## C ↔ JS fidelity — dopramulet

invent.c:4678–4694 empty report or single-letter Amulet view, then OK.
cmd.c:1850–1851 registration wired; comment-only prinv reference excluded.

## Inventory — doprtool

Changed export; tool_being_used/obj_to_let verified C predicates, menu LIVE.

## C ↔ JS fidelity — doprtool

invent.c:4714–4735 tests usage before 52-letter bound; successor is read
from current identity after reassign moves gold. Empty report or ignored
menu result, then OK. cmd.c:1856–1857 registration wired.

## Inventory — doprinuse

Changed export; is_inuse/pline/menu LIVE.

## C ↔ JS fidelity — doprinuse

invent.c:4738–4757 stops on first in-use object, reports empty or uses
NULL subset/in-use sorting, then OK. csym finds no direct references;
multiline command table cmd.c:1848–1849 is wired.

## Inventory — header and feedback caller adapters

inuse_headers_set_accessories, on_msg, pickup_prinv, ready_weapon,
doquiver_core changed; imports replace clones/direct xprname feedback.

## C ↔ JS fidelity — header and feedback caller adapters

Header pointer assignment invent.c:2984/2990 preserves empty string.
on_msg do_wear.c:75–99 retains ring/amulet/terse-eyewear guard and awaits
canonical prinv. pickup.c:1945–1972 forwards long count unchanged.
ready_weapon wield.c:168–273 prints with temporary W_WEP before restoring
mask/setuwep; doquiver_core :511–679 ready prints after setuqwep, fire
before it. Guards and command callers retained. No new RNG call.

## Hallucinations / overclaim

Eight whole bodies match; “none” is too broad if read as retiring inherited
itemactions terrain/cantwield debt (D-1833 map). No dispatch→empty stub.
Required historical sym output:

```text
prinv js/invent.js:7682 ASYNC — await required
empty_handed js/wield.js:47 sync
display_pickinv_reply js/invent.js:3870 ASYNC — await required
display_inventory js/invent.js:4312 ASYNC — await required
xprname js/objnam.js:3799 sync
```

Full Rule #2 clean; diff has no trace gates. imports --can invent→wield
empty_handed: ALREADY. The deleted “cycle avoids import” clone was unnecessary;
no top-level read added.

## Density

One eight-body invent.c closure, plus its feedback callers; no Must-fix bundled.
Individual Ledger/Verify entries present; named action-menu omissions inherited.

- Ledger: doprarm ported — ACCEPT-WITH-DEBT.
- Ledger: dispinv_with_action ported — ACCEPT-WITH-DEBT.
- Ledger: prinv ported — ACCEPT.
- Ledger: doprwep ported — ACCEPT-WITH-DEBT.
- Ledger: doprring ported — ACCEPT-WITH-DEBT.
- Ledger: dopramulet ported — ACCEPT-WITH-DEBT.
- Ledger: doprtool ported — ACCEPT-WITH-DEBT.
- Ledger: doprinuse ported — ACCEPT-WITH-DEBT.
- Header/feedback repairs — ACCEPT.

## Verification

Historical eight-function `hidden-proxy verify ... --base c1c0d92f4~1 --reach-all`:

| Function | verify summary | reach summary |
|---|---|---|
| doprarm | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| dispinv_with_action | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| prinv | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| doprwep | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| doprring | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| dopramulet | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| doprtool | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| doprinuse | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |

Re-ran extracted-C comparison on this SHA: 1193 cases, 1342/1342 output
lines match, including header restoration, long counts, gold moves and cap.
Dependency sinks do not establish action-menu internals. D-log green/strict,
relevant inventory cohort 7/7 and full 44/44 pass.

## Actionable C-wrongs

None beyond inherited map-named omissions.

Verdict: **ACCEPT-WITH-DEBT**
