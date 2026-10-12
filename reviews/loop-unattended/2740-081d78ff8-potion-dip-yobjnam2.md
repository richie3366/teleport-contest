# Review 2740 — 081d78ff8 — potion_dip Yobjnam2 clone (D-3881)

## Metadata

- SHA: `081d78ff8` (cliff-head writer port)
- D-entry: D-3881; Ledger: potion family in `potion.c`
- js diff: `js/potion.js` (+5/−8: clone deleted, call site re-pointed)
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: the `:3486` obj_glows call used the drifted
`Yobjnam2_pot` clone ("Your "+xname, no quan prefix), dropping
the "2" at Priest-582706 s200; re-pointing at live `Yobjnam2`
moves 200→1166.

The diff actually adds: the clone deleted (D-3360-style removal
pointer left at :3240), the call site now `Yobjnam2(obj,
'glow')` with the C `:2462` cite. Promise == deliverable.

## Inventory

- `potion_dip` (`js/potion.js:3480`, async) — one call-site
  expression changed; signature and all other arms untouched.
- Classification: deleted symbol was a **CLONE** of the
  `Yobjnam2` export; re-pointed to a **LIVE** callee. Required
  `sym.mjs` paste:

```
Yobjnam2         js/objnam.js:2909   sync
         !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
           js/sit.js:230  js/wield.js:1298
```

The potion.js clone is gone (no `Yobjnam2_pot` definition
remains; only cite comments mention the name); the 2 remaining
clones are pre-existing in other files, correctly untouched.
Removal hygiene verified: `Yobjnam2` was already imported
(`:122`, no new edge — and `:3893` already called the live
export, an in-file precedent); `xname` still used by
`Tobjnam_pot` (`:3196`); `otense_pot` keeps 9 call sites. No
dead import, no orphaned helper.

## C ↔ JS fidelity

C loci, read from pinned C: `potion_dip` body
`potion.c:2441–2792` (`csym.mjs` range), the call site `:2462`
(`const char *obj_glows = Yobjnam2(obj, "glow");`) inside the
`POT_WATER` arm with the `:2461` useeit gate. JS `:3486` now
reads `Yobjnam2(obj, 'glow')` under the same gate — identical.

Fidelity of the re-pointed callee: live `Yobjnam2`
(`js/objnam.js:2909`) = `upstart(yobjnam(obj, verb))`, and
`yobjnam` builds on `aobjnam` (quan prefix) + `shk_your` — the
two arms the clone dropped ("Your "+xname, no count, no shop
prefix). The divergence fits exactly: verb agreed plural both
sides (quan>1 state matched, `otense` fine), only the count
prefix was missing. No RNG on this path either side.

## Hallucinations / overclaim

None. The D-log claims movement only on `H2Opotion_dip` (0 PASS,
1 moved) with the smoke reach line; the kept clones
(`aobjnam_pot`/`Tobjnam_pot`/`otense_pot`) are named as staying
with "faithful, no divergence names them" — honest, verifiable
scoping. No cheat markers; Rule #2 clean (review 2735 scan).

## Density

Cliff-head writer port with movement — right density. Owner
`H2Opotion_dip` correctly not re-ported (stays whole vs C
`:1497–1589`); the writer is the naming call one frame up. One
cliff, code + ledger + verify in one handoff.

## Verification

Re-measured by this audit
(`verify H2Opotion_dip --base 081d78ff8~1 --reach-all`):

- `verify H2Opotion_dip`: 0 PASS, 1 moved past, 0 worse →
  PROGRESS (Priest-582706: 200 → nhl_gamestate@1166 — exactly
  the ship-time landing; the session is still blocked there per
  the current cliffs head, D-3882 measured).
- `smoke H2Opotion_dip`: 24/24 PASS → REACH-OK.

No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
