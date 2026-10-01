# Review 2157 — 139f221a9 — any fallthrough + vanish pline + wizterrainwish

SHA `139f221a9`, D-3197; 2026-10-01; +227/−110 (readobjnam.js + 1-word
mklev.js export). Coverage cluster (readobjnam remainder + Open callees
wizterrainwish + dbterrainmesg); no prior review closure.

## Metadata

- Subject: "`objnam.c` readobjnam any→typfnd fallthrough + vanish pline +
  wizterrainwish completion + dbterrainmesg"
- Delivers: any→finish fallthrough, finish create fix, vanish mark/emit
  split, wizterrainwish completion (dbridge arms, chains, gates, recounts),
  new local dbterrainmesg, count_level_features export.

## Intent vs deliverable

Promise: any-path fine-tune via the shared finish; `d.typ ? mksobj :
mkobj(d.oclass)`; vanish pline on the async wish path; wizterrainwish
whole with dbridge/dbterrainmesg/damage-chains/pooleffects/melt/ice_descr/
recounts/live is_ice+reset_utrap. Diff delivers each; remaining omissions
(glob y_n, sync-caller pline, two callers) stay named. Promise kept.

## Inventory — readobjnam (any/finish/vanish)

`readobjnam_any` shrunk to the C `any:` + `return readobjnam_finish(d)`;
finish head straight-line C order; vanish arm marks `d.vanished`, `ret()`
propagates `missOut.d`, `readobjnam_wish` emits the pline. New bindings:
`something`, `HAND` (const), `body_part` (dynamic polyself import). No
symbol deleted or re-pointed (the inline any body was anonymous).

## C ↔ JS fidelity — readobjnam

any (`:4994–4996`): `if (!oclass) oclass = WRPSYMS[rn2(len)]` + fallthrough
✓ — the whole fine-tune now runs on the any path as C does. Finish head:
oclass recompute → wizard remap → pudding→glob →
`d.typ ? mksobj : mkobj(d.oclass)` ✓ — this FIXES the unconditional-mksobj
gap review 2155 noted as inherited (verified fixed here); the dead
both-unset `mkobj(0)` arm is correctly gone (unreachable: every finish
caller sets typ or oclass). Vanish (`:5371–5380`): state arm unchanged,
`d.vanished = 1` marked, wrapper emits `For a moment, you feel ${something}
in your ${makeplural(body_part(HAND))}, but it disappears!` — text,
`something` ("something"), and HAND (= 6, verified against hack.h:138)
all C-exact. Emit gate (`otmp === HANDS_OBJ && missOut.d?.vanished`)
cannot misfire on trap/terrain HANDS_OBJ (those return before the check)
or on no_wish (≠ HANDS_OBJ, vanished unset). Sync-caller pline properly
named (async pline in a sync chain).

## Inventory — wizterrainwish

Changed async fn (js/readobjnam.js:574, ~350 lines). All touched callees
LIVE (sym-verified single exports; dynamic hoisted-function edges):
water/fire_damage_chain (async, awaited), pooleffects (async, awaited),
ice_descr, reset_utrap (sync — un-awaited call correct),
start_melt_ice_timeout, count_level_features (newly exported),
Levitation/Flying (canonical mhitu.js imports — no clone #11/8 added),
is_ice (canonical zap.js import — no clone #6). No stub in any live arm.

```text
Levitation       js/mhitu.js:717   sync
Flying           js/mhitu.js:725   sync
reset_utrap      js/trap.js:3012   sync
is_ice           js/zap.js:900   sync
ice_descr        js/trap.js:3070   sync
water_damage_chain js/trap.js:6415   ASYNC — await required
fire_damage_chain js/trap.js:6388   ASYNC — await required
pooleffects      js/pickup.js:2233   ASYNC — await required
start_melt_ice_timeout js/zap.js:1019   sync
count_level_features js/mklev.js:1172   sync
body_part        js/polyself.js:622   sync
```

## C ↔ JS fidelity — wizterrainwish

Audited against C `objnam.c:3553–3916` (full body read). Else-if chain
order matches C across all 16 arms (trap → … → room). Changed arms:
pool/lava/ice each select ltyp, split dbridge (typ+flags vs
`drawbridgemask &= ~DB_UNDER |= DB_*`), del_engr, message branch
(EHalluc save/restore + waterbody_name; lava pool/wall pline +
`(!(Levitation() || Flying()) || LAVAWALL)` pooleffects gate on the
canonical boolean accessors; "melting " → melt timeout + ice_descr),
dbterrainmesg under dbridge, awaited damage chain over `objects_at(x, y)`
(= `level.objects[x][y]`), madeterrain — all in C positions. Room arm:
gate (ROOM / furniture+CAN_OVERWRITE / ICE / pool||lava ≡
is_pool_or_lava), ROOM + IS_FURNITURE→recount + deltrap, dbridge elif
(DB_FLOOR + msg), else badterrain. Postamble: feel_newsym,
uinwater/docrt vs lava-utrap→live reset_utrap(false) + recalc,
fountain/sink→recount (hand-decrements removed), !is_ice→spot_stop
(is_ice verified C-exact against dbridge.c:85–97, UP-only DB_ICE),
horizontal clear (split fields zeroed ≡ C overlay), switch_terrain.
Fountain `horizontal = !!blessedftn` (rm.h:404) matches the grave
precedent. DB consts verified equal to rm.h:291–295 (28/0/4/8/16).
Pre-existing arms (fountain–corridor) re-read for chain integrity; order
and entry conditions match C.

## Inventory — dbterrainmesg + count_level_features

New local async `dbterrainmesg` (:559; C staticfn → local is correct, sole
caller family in-file); async only for pline. 4 call sites in C position.
`count_level_features` local→export (1 word); body verified vs C
mklev.c:828–841 (x=1 lower bound, full recount).

## C ↔ JS fidelity — dbterrainmesg

C `:3919–3926`: `pline("%s %s the drawbridge.", newtype, typ ==
DRAWBRIDGE_UP ? "in front of" : "under")` — JS interpolates identically,
same disjunct, same argument order. C-exact.

Diff grep: no FORCE/DIAG/getRngLog/seed gate/fastforward. Rule #2 clean
(iteration-wide rulecheck). No cycle-forced clone claimed; the mklev
dynamic import reads lazily inside the fn body (no TDZ risk at module
top level).

## Hallucinations / overclaim

None. "21 bindings resolve" corroborated for every binding used in a live
arm (each sym-resolves above; reach sessions execute them). "Whole"
holds: no remaining arm is stubbed or unnamed.

## Density

Three whole C functions of one C file (objnam.c) + a 1-word enabler
export, 227 insertions, no Must-fix bundled. Per-function Ledger
(readobjnam partial; wizterrainwish ported; dbterrainmesg ported) and
Verify lines present.

- Ledger: readobjnam partial — ACCEPT.
- Ledger: wizterrainwish ported — ACCEPT.
- Ledger: dbterrainmesg ported — ACCEPT.

## Verification

Re-measured (current tree = this SHA for `js/`):

```text
verify readobjnam: 0 blocked at 139f221a9~1 (vacuous — coverage row, 0 cited)
reach readobjnam: 46 baseline-PASS sessions reach it: 46 PASS, 0 regressed → REACH-OK
verify wizterrainwish: 0 blocked; reach 1/1 PASS → REACH-OK
verify dbterrainmesg: 0 blocked; smoke 24/24 PASS → REACH-OK
```

Matches the D-log (green 2/2, strict ×2, cohort 7/7, full 44/44 auto).
No REGRESSED session; no vacuous-PASS overclaim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
