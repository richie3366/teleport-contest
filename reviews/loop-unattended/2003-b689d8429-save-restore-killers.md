# Review 2003 — b689d8429 — save_killers/restore_killers pair + read.c stale

Metadata: SHA `b689d8429`, D-3043, js/end.js (+47) + js/save.js (+10/−2).

## Intent vs deliverable

Subject promises "read.c stale pair + end.c save/restore_killers pair".
Diff actually adds: `save_killers`/`restore_killers` exports + dosave0 /
try_restore_save wiring; no read.c code changes. Matches promise.

## Inventory

- `save_killers` (new sync export) — C end.c:1759–1776.
- `restore_killers` (new export) — C end.c:1779–1790.
- Stale pair `hawaiian_motif` / `seffect_mail` — ledger notes only, no
  code (verified: no read.js hunk in the stat).

## C ↔ JS fidelity

`save_killers` vs C `:1759–1776`: update_file arm `:1764–1767`
(sentinel-first loop writing each node) → record array with the struct's
data fields id/format/name (hack.h:598–606 verified) ✓. VFS always
writes so no update_file gate — correct JSON-analogue mapping (same
precedent as save_oracles). release_data FREEING arm `:1769–1774`
(free nodes past sentinel) omitted with in-memory state kept — named in
the doc comment, same precedent; GC owns memory in JS. save.c:1097
exit-free has no JS path — named, correct (GC).

`restore_killers` vs C `:1779–1790`: Sfi loop reading into the sentinel
then alloc'ing each further node → rebuild chain from records ✓; field
mapping id/format/name with `|0`/String normalization ✓;
null-termination per node (`next: null`, C :1786) ✓. Missing/empty key →
keep the fresh-boot sentinel (restore_oracles precedent) — the honest
old-save mapping. Wired at the restore.c:653 analogue (after
restore_oracles) and the save.c:293 analogue (dosave0 payload), both via
the pre-existing lazy save→end dynamic-import edge — no new static edge.

No RNG in either C body; none added. No clones, no stubs. Named omits
live in the doc comments + map header (hawaiian_design staticfn for the
stale half). Round-trip probe (3-node chain identical; empty keeps
sentinel; find_delayed_killer walks restored chain) + seed0013
save-then-restore PASS (RNG 4804/4804, screens 99/99) cited in D-log.

## Hallucinations / overclaim

None. The line-count-artifact explanation for the stale pair
(THIN/PARTIAL complete in JS) is checkable and the commit touched no
read.js code, consistent with a stale finding.

## Density

One whole sibling pair + wiring + a same-iteration stale pop — within
§2b. Ledger entries for all four functions per message. OK.

## Verification

D-log cites verify.mjs → PASS + REACH-OK ×2 + green/strict/cohort, plus
the round-trip probe and seed0013 direct evidence. Re-measured:
`hidden-proxy.mjs verify save_killers,restore_killers --base
b689d8429~1 --reach-all` → 0 blocked (vacuous, expected — D-log says
so), smoke 24/24 PASS each → REACH-OK, no regressions. Diff grep: no
FORCE/DIAG/RNG-log/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
