# Review 2890 — 739b6f73b — rest_stairs reversal writer

- SHA: `739b6f73b` (cliff, writer port: 1 C function + 2 install sites)
- D-entry: D-4049; Ledger: restore.c (`rest_stairs split`)
- `js/` diff: `js/do.js` +6/−1 (revisit install), `js/lev_json.js`
  +30/−1 (new `rest_stairs_chain` + `deserLevel` line); new
  `scripts/rest-stairs-reversal.test.mjs`

## Intent vs deliverable

Promise (subject + D-log): the stairs chain must reverse on every
level restore because C's `rest_stairs` rebuilds via per-node
prepend; ports that as `rest_stairs_chain` wired at the revisit
install and `deserLevel`; probe session Healer-50055044 s1195→FULL
PASS. The diff delivers exactly that: one new exported helper plus
two call sites, no signature changes, no new module edges (same-edge
`lev_json` import word in `do.js`). Promise = diff.

## Inventory

- `rest_stairs_chain(src)` — new export, lev_json.js:870.
  C: `rest_stairs` restore.c:954–985 (csym range).
- `deserLevel` stairs line — now via `rest_stairs_chain`
  (lev_json.js:936).
- `goto_level` revisit install — now via `rest_stairs_chain`
  (do.js:2085).

## C ↔ JS fidelity

C `rest_stairs` (restore.c:954–985, csym):

```c
staticfn void
rest_stairs(NHFILE *nhfp)
{
    int buflen = 0;
    stairway stway = UNDEFINED_VALUES;
    ...
    stairway_free_all();
    while (1) {
        Sfi_int(nhfp, &buflen, "stairs-staircount");
        if (buflen == -1)
            break;
        Sfi_stairway(nhfp, &stway, "stairs-stairway");
        if (program_state.restoring != REST_GSTATE
            && stway.tolev.dnum == u.uz.dnum) {
            stway.tolev.dlevel += u.uz.dlevel;   /* relative→absolute */
        }
        stairway_add(stway.sx, stway.sy, stway.up, stway.isladder,
                     &(stway.tolev));            /* prepends: stairs.c:22-23 */
        newst = stairway_at(stway.sx, stway.sy);
        if (newst)
            newst->u_traversed = stway.u_traversed;
    }
}
```

`save_stairs` (save.c:664–691) writes head→tail, verified; each
`stairway_add` prepends (stairs.c:22–23, verified), so every restore
reverses. Sole C caller `getlev :1113` confirmed via csym (decl :24
+ that call only). JS:

```js
export function rest_stairs_chain(src) {
    let out = null;
    for (let s = src; s; s = s.next) {
        out = {
            sx: s.sx | 0,
            sy: s.sy | 0,
            up: !!s.up,
            isladder: !!s.isladder,
            u_traversed: !!s.u_traversed,
            tolev: { dnum: s.tolev?.dnum | 0, dlevel: s.tolev?.dlevel | 0 },
            next: out,
        };
    }
    return out;
}
```

All 7 `struct stairway` fields (stairs.h:8–15: sx, sy, tolev, up,
isladder, u_traversed, next) are carried; `tolev` is a fresh copy
(C `assign_level`, stairs.c:21); nodes are fresh (C allocs).
Round-trip parity holds on every path: the revisit install flips
the in-memory stash once (C flips per save+restore round trip);
`deserLevel` flips once from blob order for dorecover-current
(save.js:1125), restoreOtherLedgers (save.js:305) and bones
ghostly (bones.js:659) — matching C's single restore (the D-log's
`restlevelfile :755–771` re-save note keeps multi-cycle counts
aligned). `null`/`undefined` input returns `null`, same as the old
`|| null`. No RNG in the C body; none added. The relative-dlevel
dance (save :672–682 / restore :972–976) is named in the D-entry
and the jsdoc as file-format-only (JS values stay absolute) —
true, and the stash path never relativizes.
Helper classification: `rest_stairs_chain` is a C-callee port (of
`rest_stairs` + `stairway_add` net effect), not a clone; no stubs
touched. `sym.mjs` shows the single export at lev_json.js:870 with
exactly the two wired consumers (do.js:2085, lev_json.js:936).

## Hallucinations / overclaim

None. The D-log's "sole caller getlev :1113" is verified; the
callers table (goto_level revisit, dorecover current/others, bones
ghostly) matches the three `deserLevel` call sites plus the
revisit install. The "every round-trip flips" claim is grounded in
save.c:664–691 + stairs.c:22–23, both read, not assumed.

## Density

Cliff-phase writer port with movement: owner `rloc_to_core` was the
actionable row (region heuristic on a map row; parks/stale
head-skips re-verified live in the D-entry). Whole-function: the
full :955–985 body is modeled (free+alloc+prepend+fixup net
effect, relative-dlevel named). One `Ledger:` entry
(`rest_stairs split` + 3 JS sites + D-4049), accurate — verified in
the jsonl diff since `ledger.mjs sql` errors on this box
(`node:sqlite` missing). No unreached work: the probe session
PASSes.

## Verification

Re-measure:

```text
verify rloc_to_core: baseline 739b6f73b~1 — 1 session(s) blocked on it
  scen-sweep-Healer-50055044: PASS
verify rloc_to_core: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Matches the D-log exactly. `imports.mjs --rulecheck`: Rule #2
clean across scored `js/`. No FORCE/DIAG/getRngLog/fastforward in
the diff or the new test. No `--can` needed (no new module edge).
Focused test RED→GREEN claimed; test pins revisit order
[(73,4),(47,18)] + ape placement + screen Y.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
