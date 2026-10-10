# Review 2622 — 9fec5d504 — throwit THROWN_WEAPON flight via live bhit (D-3756)

Metadata. SHA `9fec5d504` (2026-10-10), D-3756, parent
`da1091aa9` (audit). js diff: `js/dothrow.js` +17/−80
(inline flight loop replaced by the bhit call; `!obj`
return widened to both paths) + `js/zap.js` comment-only
+ `scripts/throwit-rock-bhit-skiprange.test.mjs` (new, 2
its). Ledger: `throwit` ported (D-3756 appended).
Works its HEAD's cliffs head (`zap.c` skiprange, 3
blocked: 95410, 95509, 95518 — verified head of the
parent queue @4dee984b2, same 3 probes).

## Intent vs deliverable

Promise (subject + D-log): all 3 probes kind=rng at
`zap.c:3582` — C `rnd(2)=2 @ skiprange` (thrown-rock
window) vs JS `rn2(100) @ obj_resists` (later-turn
positional fallout); JS never entered bhit for the rock
because plain-THROWN flight was a ~70-line inline loop
with no skiprange/allow_skip draws. Replace it with the
C-ordered bhit call after verifying bhit's THROWN path
arm-by-arm against C `:3827–4139`.

Diff actually adds exactly that, plus the `!obj` early
return for both paths per C `:1684–1691` and
`let range`→const. Promise and diff match. No new
import edge (the tethered arm already used the same
dynamic `./zap.js` import).

## Inventory

Changed JS (1 call site + 1 widened gate):

- throwit flight — `js/dothrow.js:2429–2455` (bhit call
  `:2437`; `game.thrownobj` + bhitpos read-back).
  C: `dothrow.c` `throwit` `:1509–1849` (csym range),
  flight arm `:1674–1679`; bhit `:3827–4139`, rock setup
  `:3855–3858`; staticfn skiprange `:3579–3588`.
- `!obj` return — `js/dothrow.js:2453–2455`.
  C: `:1684–1691`.
- zap.js hunks: comments only (bhit doc + WEB note;
  D-1928 throwit-fly omit retired).

## C ↔ JS fidelity

**bhit call exact.** C `:1674–1679` —
`mon = bhit(u.dx, u.dy, range, tethered_weapon ?
THROWN_TETHERED_WEAPON : THROWN_WEAPON, 0, 0, &obj);
gt.thrownobj = obj;` — is JS line-for-line, including
the `/* obj may be null now */` comment. `null, null`
fhitm/fhito ≡ C's `(int (*)(…)) 0` pair.

**`!obj` return exact.** C `:1684–1691` — `if (!obj) {
if (tethered_weapon) tmp_at(DISP_END, 0);
throwit_return(FALSE); return; }` — is JS
`throwit_tether_end(tethered_weapon, false)` (body read:
no-op unless tethered, else `tmp_at(DISP_END, 0)`) +
`throwit_return(false); return`. The old plain path let
a bars-destroyed obj fall through; now it returns per C.

**bhit THROWN path re-verified (this audit, JS body read
`js/zap.js:6262–6635` against C `:3827–4139`):** kicked
start+range−−; rock window (`weapon === THROWN_WEAPON
&& obj && otyp === ROCK` → `bhit_skiprange(r)` +
`allow_skip = !rn2(3)`, C `:3855–3858`; helper draws
`rnd(tr)`/`rnd(3)` exactly per `:3579–3588`);
DISP_TETHER/DISP_FLASH opens (`:3859–3868`); shkcatch;
WATERWALL/LAVAWALL stop; lamplit + `hits_bars(pobj, x−dx,
y−dy, x, y, point_blank ? 0 : !rn2(5), 1)` — identical
call shape to C `:3901–3917` and to the deleted loop;
WEB `!rn2(3)` (`:3926–3938`); rock skip/rebounce on
post-decrement `r` (`:3944–3970`); shade/mimic-object
(`:3983–3992`); notonhead + THROWN mon-stop with inline
END-if-untethered + map_invisible (`:4016–4026`); null
fhito falls through for THROWN; ZAPPED-only doorlock;
ZAP_POS/closed stop; erase/tmp/delay/sink; ball stops
(`:4095–4119`); END/pay/cleanup (`:4122–4136`, JS
`!bhit_done` guard ≡ C's `goto bhit_done` skips).
Branch order call-for-call; RNG (`rnd(tr)`, `rn2(3)`,
`rn2(5)`) in C order.

**Deleted CLONE removed, not re-pointed elsewhere.**
The inline loop covered only isok/bars/ZAP_POS/m_at/ball
stops — no skiprange, WEB, shade, sink, waterwall,
notonhead, shkcatch, tail. Nothing else called it (it
was inline); bhit is the LIVE callee (named export at
`js/zap.js:6636`, proven by the pre-existing tether
path). Post-hunk flow unchanged: bhitpos round-trip
(read then write-back of the same x,y — harmless),
`throwit_mon_hit(obj, hitmon)` ≡ C `:1695`.

**Callees:** bhit (LIVE), throwit_tether_end (LIVE
helper, body read), throwit_mon_hit (LIVE, untouched).
No stubs. sym.mjs on the re-point target (required
paste; note its blind spot — it misses `export {…}`
lists, but the export at zap.js:6636 was read):

```text
bhit             NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/zap.js:6262
```

Tooling note only: `node scripts/imports.mjs` / the
tether path prove the export resolves; no action.

**Test.** Rock down an open corridor asserts
bhit_skiprange + `rn2(3)@bhit` entries; sword control
asserts none. Re-ran: 2/2 (this audit).

## Hallucinations / overclaim

None. The arm-by-arm list in the subject re-verifies
against the bodies cited. Diff grep (FORCE / DIAG /
getRngLog / fastforward / seed / coords): one hit, a
pre-existing `SPE_FORCE_BOLT` comment context line —
zero added. Rule #2: global re-check at end of this
audit.

## Density

Cliff-phase §2b: parent head skiprange (3 blocked, RNG
lost 44426); this commit ships the writer (throwit's
bhit call — owner already whole as split
`bhit_skiprange` per D-1928, read once per the tag rule)
with 3 FULL PASS. One cliff, one C locus, no bundling;
the ledger note refresh and comment-only zap.js hunks
are same-locus. Correct gates (green/strict/cohort +
full 44/44 in the D-log).

## Verification

D-log Verify (`verify.mjs --fn skiprange,throwit`): 3
PASS, reach skiprange 24-smoke + reach throwit 7/7 →
REACH-OK; green/strict/cohort/full PASS.

Re-measured by this audit (`verify skiprange,throwit
--base 9fec5d504~1 --reach-all`; HEAD code includes 8
later SHAs):

```text
verify skiprange: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
smoke skiprange: no RNG-tagged reach; fixed smoke spread (24 run, 13.0s): 24 PASS, 0 regressed → REACH-OK
verify throwit: no corpus session is blocked on it at 9fec5d504~1 — a vacuous verify is NOT a corpus PASS. […]
reach throwit: 7 baseline-PASS session(s) reach it (7 run, 5.8s): 7 PASS, 0 regressed → REACH-OK
```

All 3 named probes (95410, 95509, 95518) FULL PASS on
current code; 0 worse; no vacuous check (row cited 3,
all 3 itemized; the throwit vacuity note is the tool's
correct usage guidance, with the reach line supplied).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
