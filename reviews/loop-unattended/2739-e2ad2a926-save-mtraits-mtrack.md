# Review 2739 — e2ad2a926 — save_mtraits mtrack copy (D-3880)

## Metadata

- SHA: `e2ad2a926` (cliff-head writer port)
- D-entry: D-3880; Ledger: `save_mtraits ported js=mkobj.js:save_mtraits`
- js diff: `js/mkobj.js` (+8), one deep-copy block
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: `save_mtraits` shared the mtrack array by
reference, so `dealloc_monst` wiped the corpse snapshot's track
and the revived troll lost its M28 draw at Barbarian-582719 s713;
deep-copy moves the session s713→PASS.

The diff actually adds: exactly that — an `Array.isArray`-guarded
slot deep-copy after the key loop, with the C cite. Promise ==
deliverable.

## Inventory

- `save_mtraits` (`js/mkobj.js:4383`, sync) — one block appended
  after the key-copy loop, before the pointer invalidation; no
  signature change, no new function, no import.
- Classification: no helper — direct fix of the copy semantics to
  match C's struct assignment. No symbol deleted or re-pointed, so
  no `sym.mjs` paste is required.

## C ↔ JS fidelity

C locus, read from pinned C: `save_mtraits` body
`mkobj.c:2156–2195` (`csym.mjs` range; the D-log cites
`:2157–2195`, same body). The operative line is `:2168`
(`*mtmp2 = *mtmp;`) followed by mextra/mnum/nmon/data/minvent/mw
invalidation and the mhp clamps — the JS body mirrors every one
of those lines in order (read `js/mkobj.js:4385–4430` whole this
audit).

Branch-by-branch confirm of the fixed semantics:

- C `*mtmp2 = *mtmp` copies the struct by value, including the
  embedded `coord mtrack[MTSZ]` (`monst.h:111`). This audit
  confirms it is the only array field in `struct monst` (all
  other fields scalar or pointer) — the "snapshot is now exactly
  C's" claim holds for the copy itself.
- Old JS assigned `mtmp2.mtrack = mtmp.mtrack` (shared ref) via
  the key loop. The wipe path is real in JS: `dealloc_monst`
  (`js/mon.js:3485`) → `applyZeromonst` (`:3422`), which zeroes
  array slots **in place** (`el[ek] = 0`) — so the corpse
  snapshot's track was wiped when the dead mon was deallocated
  after the snapshot. Mechanism reproduced from live code, not
  inferred.
- New JS maps each slot to a fresh `{x, y}` (`|0`-guarded);
  `undefined` stays `undefined` via the `isArray` guard. The
  copy-then-invalidate order matches C (copy first, then
  mextra/mnum/nmon/data/minvent/mw/wormno/mhp/mstate).

No RNG in `save_mtraits` on either side; the RNG effect is
downstream (the revived troll's M28 track draw), which is why the
movement verify runs on `m_move`.

## Hallucinations / overclaim

None. The D-log labels the `save_mtraits` hidden line `note` (0
blocked, "NOT a corpus PASS") and claims movement only on
`m_move` (1 PASS). The C-side ground truth (save-oracle prefix,
fmon[0] MREVIVED with the 4-slot westward trail) is a §7
measurement with byte offsets and a falsifier, and the D-3879
`[measure]` → D-3880 writer chain is exactly the playbook's
two-step. The "Next:" latent note (get_mtraits/copy_oextra
sharing, no probe path) is honest scoping with its own
falsifier. No cheat markers; Rule #2 clean (review 2735 scan).

## Density

Cliff-head writer port with a full PASS — right density. Owner
`m_move` proven faithful (park + D-3879 measurement), correctly
not re-ported; deliverable is the writer. `Ledger: save_mtraits
ported` — right owner. Pinning test
(`scripts/save-mtraits-track.test.mjs`) re-ran green this audit;
forced full 44/44 at ship time (right gate for a revive-path
change). One cliff, code + ledger + verify in one handoff.

## Verification

Re-measured by this audit
(`verify save_mtraits,m_move --base e2ad2a926~1 --reach-all`):

- `verify save_mtraits`: 0 blocked — vacuous, as stated.
- `smoke save_mtraits`: 24/24 PASS → REACH-OK.
- `verify m_move`: 1 PASS, 0 worse → PROGRESS
  (Barbarian-582719: PASS — exactly the ship-time landing).
- `reach m_move`: 1120/1120 PASS → REACH-OK (full spread;
  stronger than ship-time 80/80).

No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
