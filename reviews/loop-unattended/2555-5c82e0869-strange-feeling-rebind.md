# Review 2555 — 5c82e0869 — strange_feeling clone deletion (D-3680)

- SHA: `5c82e0869da2899195133a9dfb28df830ea560af`
- Subject: missing-arm `potion.c` strange_feeling: H-only read/wield clones deleted, 4 sites → live detect.js export (extrinsic-hallu text) (D-3680)
- D-entry: D-3680. Type: missing-arm pop (clone consolidation, 0 corpus blocks by its own honest account).
- Diff size: `js/read.js` +8/-23, `js/wield.js` +7/-28; +1 new test, +1 case; ledger D-tag.

## Intent vs deliverable

Promise: JS had three `strange_feeling` bodies; the two clones
read `u.Hallucination` only, "dropping the C potion.c:1465
Hallucination-macro extrinsic arm"; rebind all 4 sites to the
live `(H||HH)` export so "beginner + extrinsic-only
hallucination → C/live print normal"; switch-safe (identical
useup/trycall/pline).

Diff actually does: the consolidation as described — import
added to an existing detect.js import in read.js, new
strange_feeling import in wield.js, both clones deleted with
tombstone cites, 4 call sites rebound (same signatures). The
mechanics check out; the C rationale does not (below).

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `js/read.js:113` import | `strange_feeling` joins existing detect.js import | — (no new edge) |
| `js/read.js:1215` | `strange_feeling_scroll` clone deleted → tombstone | `potion.c:1460–1476` |
| `js/read.js:1268/:1320/:1557` | 3 sites renamed to live | `read.c:1334/:1388/:1128` |
| `js/wield.js:36` import | new `strange_feeling` from detect.js | — (`--can`: ALREADY post-change; hoisted fn, no TDZ) |
| `js/wield.js:1299` | `strange_feeling` clone deleted → tombstone | `potion.c:1460–1476` |
| `js/wield.js:1351` | same-name call rebinds to live | `wield.c:943` |

`sym.mjs` (required paste — deleted/re-pointed symbols):

```text
strange_feeling  js/detect.js:241   ASYNC — await required
strange_feeling_scroll NOT FOUND in js/** (no export, no local function/const).
```

Clone count is now 1. No STUB, no new arm.

## C ↔ JS fidelity

C (`csym`: `potion.c:1460–1476`; `--callers`: 18 refs —
`read.c:1128/:1334/:1388`, `wield.c:943`, `detect.c` ×6,
`potion.c:288/:314/:401` — exactly the D-log's table):

```c
if (flags.beginner || !txt)
    You("have a %s feeling for a moment, then it passes.",
        Hallucination ? "normal" : "strange");
```

Verified-faithful mechanics: read-local useup (`js/read.js:280`)
is line-identical to detect-local useup (`js/detect.js:223`),
both carrying the `invent.c:1326` cite — zero delta at the 3
read sites. `chwepon` has exactly one C caller
(`read.c:1672`, sobj) and one JS caller (`js/read.js:1208`,
sobj), so otmp at `:1351` is always the scroll: the deleted
`setuwep(null)` arm was dead, and the `+in_use=false` delta
moves toward C `invent.c:1326`. `trycall` is the canonical
`do_name.js` import in all three files. `!obj`/`dknown`/pline
template identical. No RNG in the body.

The C-wrong is the text arm's predicate. C
(`youprop.h:114–120`, emphasis in the source):

```c
/* Hallucination is solely a timeout */
#define HHallucination u.uprops[HALLUC].intrinsic
#define Hallucination (HHallucination && !Halluc_resistance)
```

There is **no extrinsic hallucination** in C — only extrinsic
hallucination *resistance*. `HHallucination` is the intrinsic
timeout, and the JS flat of the same name is exactly that
(`potion.js:1184` cites C `:395 set_itimeout(&HHallucination)`;
`PROP_FLAT` maps `HALLUC→'HHallucination'`). `u.Hallucination`
is its sticky mirror, `!!(HH&TIMEOUT) && !resist`, re-mirrored
at every mutation site (`potion.js:1178/:1185`, `artifact.js`
flip). The commit's "extrinsic arm" does not exist; its
"extrinsic-only" test state (`H=false, HH=1, R=0`) is a
mirror-invariant violation no writer produces unresisted.

Worse, the rebind **regresses a reachable state**: resisted +
hallucinated + beginner. C sets the timeout unconditionally
under resistance (`potion.c:393–395`: resistance gates only
`changed`, not `set_itimeout`), so `T=1,R=1` is real, and the
macro reports FALSE → C prints "strange". Reachability is all
live-ported: poly into a black light (polyok — no M2_NOPOLY,
`monsters.h:1180–1192`; `PROPSET` ported at
`js/polyself.js:835`) → hallucinate via `make_hallucinated`
(JS re-mirrors `H=false`) → read a scroll as a beginner. At
the 4 rebound sites: pre-change clones printed "strange" = C
(the mirror carries the `!resist` gate); post-change live
(`H||HH`, no resistance read) prints "normal" ≠ C. The clones
were C-right exactly where live is C-wrong.

## Hallucinations / overclaim

The D-log/commit/test comments assert a "C potion.c:1465
Hallucination-macro extrinsic arm" ("authentic pre-change
'strange' vs C 'normal'"). C says the opposite ("solely a
timeout"). Both new tests pin the phantom state and would
fail against C in the only reachable reading of their
constructed state (resistance present → C prints "strange").
No FORCE/DIAG/seed reads; Rule #2 clean (iteration `--rulecheck`).

## Density

Legitimately popped, not a head violation: Must-fix was empty,
the cliffs head was a maxed recorder-artifact park (§10.18
"not worked a third time", D-3570 + D-3660, NO MOVEMENT
re-verified this iteration), coverage was empty, and
`batch --write` was dry — the missing-arm row was the only
live work. The pop rationale in the D-log Status bullet is
honest. Verdict driver is fidelity, not density.

## Verification

D-log claim: pins fail pre (6/8) → pass post (8/8);
`verify strange_feeling` → 0 blocked (honestly "expected,
coverage-class", no movement claimed) · REACH-OK · green ·
strict · cohort · forced full 44/44. Audit re-measure
(`verify strange_feeling --base 5c82e0869~1 --reach-all`):

```text
verify strange_feeling: baseline 5c82e0869~1 — 0 session(s) blocked on it
smoke strange_feeling: no RNG-tagged reach; fixed smoke spread (24 run, 13.2s): 24 PASS, 0 regressed → REACH-OK
```

Reproduced; no REGRESSED session. Verification is truthful —
but it cannot see the resisted-state regression (no session
goes near black-light poly), which is why the C audit, not
the gates, catches it.

## Actionable C-wrongs

1. `strange_feeling` text arm ignores the C macro's
   `!Halluc_resistance` gate (live `H||HH` vs C `HH && !R`,
   `youprop.h:120`): resisted + hallucinated + beginner now
   prints C-wrong "normal" at the 4 D-3680 rebound sites (3
   read.js + chwepon) — and was already wrong at live's 3
   detect.js sites. Fix (one port iter): gate live's arm on the
   resistance check (e.g. the sticky `u.Hallucination` mirror,
   which already carries `!resist`, or `HH &&
   !hallucResisted(u)`); rewrite both tests to construct
   reachable states (resisted+halluc → "strange"; unresisted
   halluc → "normal"); correct the "extrinsic arm" rationale
   in the fixing D-entry.

Verdict: **QUALITY-RISK**

**Addressed:** D-3688 `0560c51fd`
