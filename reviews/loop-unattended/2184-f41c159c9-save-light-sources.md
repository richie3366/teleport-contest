# Review 2184 — f41c159c9 — save_light_sources write peel (bad-type inverted)

SHA `f41c159c9`, D-3224; 2026-10-01; lev_json.js (+~20/−~20) +
mkobj.js (+~22/−~6) + light.js (doc-only). Single-function cluster
(light.c). Closes no prior review.

## Metadata

- Subject: "`light.c` save_light_sources whole-body: write passes via
  maybe_write_ls + peel diagnostics (D-3224)".
- Promises: snapshots run discard_flashes + vision_full_recalc = 0
  then the shared maybe_write_ls selector; peel mirrors the release
  loop in C order with both impossible() diagnostics; count/panic +
  FREE_ALL_MEMORY caller named.

## Intent vs deliverable

Kept except one inverted arm in the new peel (C-wrong, Must-fix
below). The write-pass unification, the no-id diagnostic, and all
three named omits verify clean.

## Inventory — save_light_sources

`snapshotLocalLights`/`snapshotGlobalLights` (lev_json.js) rewritten
to discard + shared-selector shape; `save_light_sources` peel
(mkobj.js) rewritten with C-order diagnostics; light.js doc-only
(Named → Wired). Imports: maybe_write_ls/discard_flashes join the
lev_json→light edge (ALREADY per message ✓ — both pre-existing
edges); mkobj drops the now-unused light_is_local import from its
own edge (same-file fn — the import line removed is the re-export
line; `light_is_local` stays defined in mkobj.js and the peel calls
it — verified no dangling reference, syntax clean). impossible is
file-local via display.js edge (pre-existing). Deleted/re-pointed:
none (no clone→import).

## C ↔ JS fidelity — save_light_sources

C `light.c:420–471` (csym range):

Write passes (`:427–439`) ✓: discard_flashes + vision_full_recalc=0
(NEW in snapshots — the old inline loops never discarded; C :427
runs first in the same function ✓ fidelity improvement) then
`maybe_write_ls(range, serLight)` ≡ C `:434–436`. The shared selector
(light.js, pre-existing) re-read against C `light.c:570–603`: no-id
impossible+continue ✓, LS_OBJECT obj_is_local ✓, LS_MONSTER mx>0 ≡
C `mon_is_local` (light.c:373 `#define mon_is_local(mon)
((mon)->mx > 0)` — read in pinned C ✓), bad-type local+impossible ✓,
`is_global ^ (range==RANGE_LEVEL)` select ✓ — exact. Single-pass
instead of C's count+write pair: equivalent (deterministic selection
over an unmutated list; JSON length is implicit) ✓. Count/panic
(`:437–439`) + FREE_ALL_MEMORY caller (save.c:1117) named ✓ sound.

Peel (`:441–469`) — ONE ARM INVERTED: C no-id (`:444–446`) → local +
impossible ✓ JS matches (override `!ls.id ? true` fixes the
obj_is_local(null)→global read ✓); C LS_OBJECT/LS_MONSTER locality
(`:449–452`) ✓ via light_is_local; **C bad-type (`:454–459`) →
is_global = 0 = LOCAL + impossible — JS fires the impossible ✓ but
classifies GLOBAL**: `is_local = !ls.id ? true : light_is_local(ls)`
falls into `light_is_local`, whose fallthrough is `return false`
(= global — read in full). For RANGE_LEVEL C peels the entry and JS
drops it; for RANGE_GLOBAL the reverse. The justifying comment
("light_is_local already maps bad-type → local") is false about the
code it cites. Reachability is impossible-class (a corrupt
light_source type — the alarm itself fires correctly), but this is
new save-path code contradicting C with a false comment, sold as
"mirrors the release loop in C order". One-line fix (force local
for bad-type-with-id) + comment correction — Must-fix below.

Peel contract ✓: `lights: save_light_sources(RANGE_LEVEL)` (do.js:
1758) stores the return; the stash re-writes it via serLightList
(lev_json.js:695 — verified call site) ✓; FREEING caller (do.js:1770)
drops the return ✓. serLightList's silent null-id skip (lev_json.js:
369) is downstream of the peel's impossible() report, so the "pre-
peel-reported" justification holds ✓. `void impossible(...)` with
`%d` substitution (vpline_expand — verified) matches the write_ls
fire-and-forget precedent ✓. No RNG in C; none added ✓.

Diff grep: 0 hits. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

"Peel mirrors the release loop in C order" overclaims by the bad-type
classification (inverted) and its false comment. The D-3060-closure,
serLightList, and stash-architecture claims all check out.

## Density

One whole C function (52 lines) across its three JS homes, no
Must-fix bundled. Save-path proof (seed0013 save/restore + seed0030)
re-verified by this audit's full 44/44 below.

- Ledger: save_light_sources ported — QUALITY-RISK (bad-type arm).

## Verification

Re-measured (current tree incl. this SHA):

```text
verify save_light_sources: baseline f41c159c9~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke save_light_sources: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note + REACH-OK, green/strict/cohort, save
proofs). No REGRESSED session — the C-wrong needs a corrupt type no
session produces, hence Must-fix with a code falsifier.

## Actionable C-wrongs

1. Peel bad-type classification (mkobj.js save_light_sources): C
   `:454–459` forces bad-type → local; JS falls through
   light_is_local's `return false` (global). Force local:
   `const is_local = (!ls.id || (t !== LS_OBJECT && t !== LS_MONSTER))
   ? true : light_is_local(ls)` (or equivalent) and correct the
   "already maps bad-type → local" comment. Falsifier: construct a
   `{ type: 99, id: {} }` entry — RANGE_LEVEL peel must include it,
   RANGE_GLOBAL must exclude it. One port iter. Queueable below.

Verdict: **QUALITY-RISK**

**Addressed:** D-3225 `e45cb9654`
