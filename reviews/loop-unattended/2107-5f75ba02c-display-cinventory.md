# Review 2107 — 5f75ba02c — display_cinventory restart + cinv_ansimpleoname

- SHA: `5f75ba02cf00eee568d86384978ede0c62105d91` (D-3147)
- Date: 2026-09-30. `js/` delta: +45/−30 across `js/invent.js` only
  (stat shows 75 changed lines; net +45/−30 in the two hunks + 2 import lines).
- Cluster: `display_cinventory` restart + new `cinv_ansimpleoname`, one C file.
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "`invent.c` display_cinventory restart + cinv_ansimpleoname".
Diff actually adds: new module-local `cinv_ansimpleoname` (`:4576`), the
restarted `display_cinventory` (`:4603`) over live `safe_qbuf` +
`query_objlist`, and two import-line name additions (`safe_qbuf`,
`allow_all`). Promise matches deliverable.

## Inventory

| JS function | Change | Class |
|---|---|---|
| `display_cinventory` (invent.js:4603, async export — C is extern) | whole-body restart in C order | whole C function |
| `cinv_ansimpleoname` (invent.js:4576, local — C is `staticfn`) | new, in C order | whole C function |

Callee closure: `safe_qbuf` (LIVE `js/objnam.js:3140`, real C-porting body,
returns the title string, `null` buf accepted), `query_objlist` (LIVE
`js/pickup.js:802`, async, awaited, returns `{n, pick_list}` with
`{obj,count}` entries), `allow_all` (LIVE `js/pickup.js:311`),
`ansimpleoname` (LIVE, same import line), `strsubst` (LIVE
`js/hacklib.js:636`, first-occurrence, no-op on empty orig/miss —
exactly C semantics), `invdisp_nothing` (ledger `split` at both callers;
inline hdr/`''`/`(empty)` PICK_NONE sequence kept). No clones, no stubs.

`sym.mjs` (required — nothing deleted/re-pointed; both names are additions
to pre-existing edges):

```text
safe_qbuf        js/objnam.js:3140   sync
query_objlist    js/pickup.js:802   ASYNC — await required
allow_all        js/pickup.js:311   sync
strsubst         js/hacklib.js:636   sync
cinv_ansimpleoname NOT EXPORTED — but 1 LOCAL CLONE(S): js/invent.js:4576
display_cinventory js/invent.js:4603   ASYNC — await required
```

(C `staticfn` → local is the correct shape.) `--can` on both touched
edges: `ALREADY: invent.js already statically imports objnam.js/pickup.js`
— no new edge, no TDZ question.

## C ↔ JS fidelity

**`cinv_ansimpleoname`** — C `invent.c:5422–5441` (`csym` range cited).
`ansimpleoname` result; `otrapped` gate (`?.` = falsy-skip, C-compatible);
the three mismatch-fired `strncmp` arms kept verbatim as `!==` chains
(`strncmp`≠0 ⟺ prefix differs, including short-string NUL cases); the
final else arm: C `strsubst(result,"","trapped ")` inserts at the front,
JS prepends explicitly (verified: JS `strsubst` no-ops on empty orig, so
a literal call would be wrong — the prepend is the faithful spelling).
Branch-by-branch confirm — no gap. No RNG either side.

**`display_cinventory`** — C `invent.c:5444–5473` (`csym`; D-log cites
from `:5446`, same body). `(void) safe_qbuf(qbuf,"Contents of ",":",obj,
cinv_doname,cinv_ansimpleoname,"that")` → identical argument order;
`if (obj->cobj)` → same branch with chain-order array fill;
`query_objlist(qbuf,&cobj,INVORDER_SORT,&selected,PICK_NONE,allow_all)` →
same flags; else `invdisp_nothing(qbuf,"(empty)"); n=0` → same inline
sequence + `n=0`; `n>0 → selected[0].item.a_obj` → `pick_list[0].obj`;
`cknown=1; return ret` in C order. The dropped `if (!obj)` guard is
C-faithful: C is NONNULLARG1, the sole JS caller (`zap.js:5633`, sole C
caller `zap.c:2255`) dereferences `obj` (`obj.dknown`, `Is_container`)
before the call, and no other JS caller exists. No RNG either side.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

One wording imprecision, not a code issue: the message says both names
were "already imported" — the *module edges* were (confirmed by `--can`
ALREADY), but the `safe_qbuf`/`allow_all` names are new in this diff.
"Dispatch ported, callee stubbed" does not occur: every callee is a real
body.

## Density

- Whole-function verdicts: both functions whole — every arm, every callee
  live or ledger-split, the sole caller wired. No arm-only sale, no silent
  stub.
- Cluster: one C file, 2 functions ≤ 10, no Must-fix bundled. One
  `Ledger:` entry + one Verify sub-bullet per function — present.
- Size (+45/−30 net) is below the breadth target but the closure (restart
  + its staticfn helper) is complete as claimed.

## Verification

Re-measured myself (`--base 5f75ba02c~1 --reach-all`, one call, both fns):

```text
verify display_cinventory: baseline 5f75ba02c~1 — 0 session(s) blocked on it
smoke display_cinventory: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
verify cinv_ansimpleoname: baseline 5f75ba02c~1 — 0 session(s) blocked on it
smoke cinv_ansimpleoname: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; the D-log's hidden-note + smoke claims match exactly.
No seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
