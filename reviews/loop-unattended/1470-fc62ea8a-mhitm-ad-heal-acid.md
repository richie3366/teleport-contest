# Review 1470 — fc62ea8a — `uhitm.c` mhitm_ad_heal + mhitm_ad_acid arms (D-2511)

Metadata: SHA `fc62ea8a`, `js/mhitm.js` +69/−~8, `js/uhitm.js` +15/−~5. C `uhitm.c:4296–4385` (heal) + `:2742–2786` (acid). D-log: D-2511.

## Intent vs deliverable

Promise: uhitm HEAL row via the live delegate, uhitm ACID row (zero-or-keep, no mcan gate), new exported `mhitm_ad_acid` in C order, `mdamagem` AD_ACID dispatch on the sibling tail. Diff delivers all of it. Promise = deliverable.

## Inventory

- `AD_HEAL = 27` const (≡ `monattk.h:69` ✓), `mhitm_ad_heal` + `defended` import words (both `--can` ALREADY), two `damageum_adtyping` rows.
- New `export async function mhitm_ad_acid` (mhitm.js:1336) + `acid_damage` trap-edge word + `mdamagem` AD_ACID dispatch.
- `sym.mjs` (required): nothing deleted or re-pointed (delegate and `defended` are import-word additions on live edges).

## C ↔ JS fidelity

HEAL row ≡ `:4300–4304`: delegate called with `magr=game.youmonst` takes C's uhitm branch (`mhitm_ad_phys`; the delegate's `is_youmonst(mdef)` guard is inert here since damageum targets are monsters); `done` propagates via mhm to `damageum`'s `if (mhm.done) return` (confirmed in-tree) ≡ C `:4856–4858` ✓.

ACID uhitm row ≡ `:2747–2751` exactly (zero on `resists_acid||defended`, else keep; no mcan gate) ✓. `mhitm_ad_acid` ≡ `:2769–2786`: mcan→zero+return ✓; resists/defended→vis-gated harmless pline + zero (text-identical) ✓; else vis-gated `pline_mon` + `It burns` ✓; unconditional `!rn2(30)` erode + `!rn2(6)` weapon acid ✓, RNG call-for-call. `_mm_vis` is the established `gv.vis` convention shared by all mhitm arms (set at mhitm.js:5072). Dispatch reuses the 26×-established knockback/done/HP tail — pattern fidelity is the earlier rows', correctly instantiated here.

Callees all LIVE (`erode_armor` same-file export, `acid_damage`, `MON_WEP`, `monsndx`, `experience` family). `munstone`-era locals not involved. `resists_acid` binds the mhitm.js:419 local whose bits-only body is textually identical to the live `monsters.js:695` export (same documented worn/artifact omit) — equivalent, pre-existing, not introduced here. `helpless` inlined exactly per `monst.h:251`.

Ride-along: the `random_teleport_level` Stale park cites a live export (teleport.js:2250) with wired callers — light-checked, carries its own falsifier.

## Hallucinations / overclaim

None. "Every arm of both functions is now live" holds for the two shipped bodies (dren/conf rows stay open under D-2247 as stated).

## Density

Two small arms + dispatch, two modules, ~84 insertions. Right size for paired coverage rows.

## Verification

Re-ran both: `verify mhitm_ad_heal --base fc62ea8a~1 --reach-all` and `verify mhitm_ad_acid --base …`: 0 blocked both trees both times (rows cited 0 blocks); smoke 24/24 PASS each → REACH-OK. Matches the D-log. Diff grep clean. Rule #2 clean globally.

## Actionable C-wrongs

None.

## Evidence appendix

C loci read in full: `uhitm.c:4296–4385` (heal three-way) + `:2742–2786`
(acid three-way). HEAL: uhitm `:4300–4304` is phys + done-check with no
other statements — so the delegate's missing early-`return` is structural
no-op; the only observable is `mhm.done`, which `damageum` checks
(`if (mhm.done) return mhm.hitflags|0`, confirmed in-tree) ≡ C `:4856–4858`
✓. The mhitu nurse envelope (`:4305–4378`: mcan/petrify gate, naked-heal
with `rnd(7)`/`rn2(7)`/`rn2(13)`/`rn2(3)`×2, Healer-cooperate voice,
`M_ATTK_DEF_DIED`/`HIT|DEF_DIED` goaway/flee arms) belongs to
`mhitm_ad_heal_u` (D-2059, live) — correctly not reduplicated here. ACID
mhitm `:2769–2786` vs JS mhitm.js:1336+: mcan→zero+return ✓; harmless pline
text-identical (`"%s is covered in %s, but it seems harmless."`) ✓; burns
pair (`pline_mon` + `"It burns %s!"`) ✓; `!rn2(30)` erode before `!rn2(6)`
acid-dice, both outside the vis conditional ✓ — RNG order exact.

`resists_acid` deep-check: C is `Resists_Elem(mon, ACID_RES)` (`monst.h:278`)
= resistance bits + wielded-artifact `defends` + worn/carried `oc_oprop` +
alchemy-smock pair + carried-artifact `defends_when_carried`
(`mondata.c:129–193`). Both JS versions (live `monsters.js:695` export and
mhitm.js:419 local) implement the bits-only subset with the same documented
omit — textually identical to each other, so the new arm's binding is
equivalent to LIVE. The remaining artifact-carry gap is a pre-existing
documented omit owned elsewhere, not this SHA. `helpless` inlined exactly
(`monst.h:251`). `AD_HEAL 27` ≡ `monattk.h:69` ✓. Dispatch tail is the
26×-established `mhitm_knockback` sibling pattern (this SHA instantiates
it for AD_ACID; pattern fidelity is the earlier rows').

Ride-along Stale park (`random_teleport_level`): live sync export
teleport.js:2250 with wired callers (:2455, :2990 +) against C's 5 call
sites; park line carries its own rescore falsifier — light-checked,
plausible, not re-litigated here.

Re-run outputs: `verify mhitm_ad_heal --base fc62ea8a~1`: 0 blocked both
trees + smoke 24/24 PASS; `verify mhitm_ad_acid --base …`: identical.
Both match the D-log.

Verdict: **ACCEPT**
