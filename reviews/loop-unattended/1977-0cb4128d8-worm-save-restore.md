# Review 1977 — 0cb4128d8 — worm save/restore closure

Metadata: SHA `0cb4128d8` (D-3017). Scored diff: `js/worm.js` (+67/−2) +
wiring in `js/lev_json.js` (save + blob plumb), `js/do.js` (stash save +
getlev restore), `js/save.js` + `js/bones.js` (restore installs). Subject
promises: port `worm.c:527–568` + `:577–603` whole as plain records, wire
save at `serLevel`/goto-stash and restore at all three getlev installs.

## Intent vs deliverable

Promise: `save_worm`/`rest_worm` plain-record pair (list length IS the C
count, dummy head included; empty ⇔ null; full wgrowtime row), Sfo/Sfi
named, release arm at callers.
Diff actually adds exactly that, and deletes the `save/rest wsegs` line
from the file's Named-omissions header. Promise kept.

## Inventory

- `save_worm` (worm.js:687, exported — C `:527–568` extern),
  `rest_worm` (worm.js:713, exported — C `:576–603` extern). Linkage
  matches.
- Callers: save.c:543 analogue (serLevel live + stash re-serialize),
  restore.c:1147 analogue (dorecover/goto_level/getlev_bones); blob
  plumb through deserLevel/levelBlobFromPayload (head_engr precedent).

## C ↔ JS fidelity

### save_worm — verdict: exact-C modulo named codec omit, ACCEPT

C (`:527–568`, csym range): slots 1..MAX-1, count-then-coords tail-first
walking `wtails[i]` via `nseg` (`:536–548`); full `wgrowtime[0..MAX-1]`
row (`:549–550`); slot 0 always null. JS: same slots, same walk, `{wx,
wy}` lists + `Array.from(wgrowtime)`. List length IS the C count — dummy
head included, matching C `:524` (counts every node); live code at
worm.js:129 confirms `wtails` is the dummy head, so including it is
faithful, and the round trip is order-preserving (tail-first both
directions). `update_file` arm always snapshots (JS saves always snapshot
— sound); `release_data` free+zero lives at callers (`clear_wormdata`
teardown; GC frees). Sfo binary encode ⇔ plain records, named (engrave
D-3005 precedent). Confirm.

### rest_worm — verdict: exact-C, ACCEPT

C (`:576–603`):

```c
for (curr = (struct wseg *) 0, j = 0; j < count; j++) {
    temp = newseg();
    temp->nseg = (struct wseg *) 0;
    Sfi_coordxy(nhfp, &(temp->wx), "worm-wx");
    Sfi_coordxy(nhfp, &(temp->wy), "worm-wy");
    if (curr)
        curr->nseg = temp;
    else
        wtails[i] = temp;
    curr = temp;
}
wheads[i] = curr;
```

JS: `curr = null`, one `newseg()` per list entry with `nseg = null`,
wx/wy read, first→`wtails[i]` / chain-link / last→`wheads[i]` (`:585–597`
cites); full `wgrowtime` row (`:599–601`). The explicit count-0
`wtails[i] = null` reproduces C's BSS-zero slot on a reused table —
identical on C-reachable (fresh-table) inputs, safer on reuse. Legacy
nullish stored reads as all-zero counts. RNG: none in C closure, none
added. Confirm.

### Callee closure

`newseg` file-local (worm.js:35); module tables
`wtails`/`wheads`/`wgrowtime` (const arrays, element-mutated). No imports
needed, no clones, no stubs. Required `sym.mjs` output: single exports
`save_worm` (js/worm.js:687) / `rest_worm` (js/worm.js:713), no clones.

## Hallucinations / overclaim

None. D-log cites the prior debt (review 657 on the Sy path) as
motivation with evidence, and honestly scopes the ghostly-residency
follow-up out. Named omissions retained in map. Diff grep: no banned
patterns.

## Density

Breadth-phase: 2 whole functions + 5 wiring points, ~67 new lines. One
closure, compliant.

## Verification

Re-measured (`hidden-proxy.mjs verify save_worm,rest_worm
--base 0cb4128d8~1 --reach-all`):

```text
verify save_worm/rest_worm: 0 session(s) blocked at baseline (vacuous, honest)
smoke ×2: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches D-log.

## Actionable C-wrongs

None.

Ledger: closure ported, REACH-OK via smoke.
Verify lines: hidden vacuous ×2 (honest) + smoke per D-log, re-run
confirms.

Verdict: **ACCEPT**
