# Review 1268 — d961718b — light.c do_light_sources SHOW skeleton + trim (D-2302)

Metadata: SHA `d961718b`, D-2302, C-fidelity residual (no corpus owner; `verify` 0 blocked). Method: `git show` stat + full `js/light.js` diff; `csym.mjs do_light_sources` body; C `zap.c:653–709` location arms read directly; `LSF_SHOW` `#define` verified by grep; `hidden-proxy verify --base` re-run; diff grep for banned patterns.

## Intent vs deliverable

Subject promises: per-recalc `LSF_SHOW` skeleton + at-hero duplicate trim in C order over the untouched ring/paint arms, FALSE arms zeroing `ls.{x,y}`, and an `undefined`-mx corner fix.
Diff actually adds (`git show d961718b -- js/light.js`, single file): file-local `LSF_SHOW`, `at_hero_range` + hoisted hero pos, SHOW set/clear per arm, verbatim trim, `SHOW`-gate before paint, `m.mx<=0` → `(m.mx|0)<=0` with zeroing. Promise kept.

## Inventory

- `do_light_sources` (js/light.js) — skeleton added; refresh conditions and paint arms untouched.
- `LSF_SHOW = 0x1` file-local const — new, matches C `light.c:41` (verified by grep; `LSF_NEEDS_FIXUP 0x2` alongside at `:42`).

## C ↔ JS fidelity

C locus `light.c:168–250` (csym; JS cites `:177`/`:204–211`, exact). Skeleton walk in C order:

| C (`light.c` / `zap.c`) | JS (`do_light_sources`) | Match |
|---|---|---|
| clear-SHOW up front (`:179`) | `ls.flags &= ~LSF_SHOW` first in loop | verbatim |
| LS_OBJECT range-0 flash → SHOW, caller-set x,y (`:187–190`) | SHOW set, x,y untouched (D-1597) | verbatim |
| `get_obj_location(...,0)` TRUE arms → SHOW | INVENT→hero / FLOOR→ox,oy / MINVENT→carrier, all +SHOW | verbatim |
| FALSE arms → `*xp=*yp=0`, no SHOW (`zap.c:685`) | `ls.x = ls.y = 0`, SHOW stays cleared | verbatim |
| LS_MONSTER via `get_mon_location(...,0)` (`zap.c:691–709`) | `(m.mx\|0)<=0` → 0,0 else mx,my+SHOW | verbatim modulo named refinements |
| trim (`:204–211`) incl. `>=`, running on cleared-SHOW entries | identical, with the stale-feed called out in comments | verbatim |
| range-0 flash at hero: SHOW set then `0 >= 0` clears it | same (JS comment notes it) | verbatim |
| `if (flags & LSF_SHOW)` gates paint | `if (!(flags & SHOW)) continue` | verbatim |

Arm-order swap (JS does MONSTER before OBJECT; C OBJECT first) is immaterial — disjoint arms, no shared state. The `undefined`-mx corner fix is real and verified: old `m.mx <= 0` is false for `undefined`, falling through to paint at `(0|0, 0|0)`; new `(m.mx|0)<=0` zeroes instead — matching C's `mon->mx > 0` requirement (`zap.c:699`). Extra `range < 0 → continue` is a harmless superset (unreachable for SHOW entries).
Callee closure: no imports added or needed (file-local flag per the `COULD_SEE` precedent); no STUB in the skeleton. Named carry-overs are accurate: `LSF_NEEDS_FIXUP`, youmonst/usteed-identity + `mburied` gate + `OBJ_BURIED`/`OBJ_CONTAINED` (all D-2157 inline-refresh territory), pre-existing `lamplit` gate (with the end_burn/del_light_source justification for not lifting it).

## Hallucinations / overclaim

None material. Vacuous note explicit; 24-check probe claims are specific and checkable (dup-trim both orders, flash at/off hero, dead-entry zeroing, stale-pos trim feed, undefined-mx). `zap.c:685/:705` citations check out (`:685` obj FALSE arm, `:705`-area mon FALSE arm).

## Density

One C function skeleton, one module, ~45 insertions. Right-sized; the 24-check probe is proportionate to display-state risk.

## Verification

D-log: preflight clean-tree green, `verify --fn do_light_sources` syntax/rule2/green/strict/cohort PASS (full skipped — single non-shared file), hidden vacuous (NOT a corpus PASS, stated). Re-measured by this review:

```text
verify do_light_sources: baseline d961718b~1 (scoreboard at 614cdcf0) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

`LSF_SHOW` value verified against pinned C. Diff grep: no FORCE/DIAG/seed/coordinate/RNG-index reads.

## Actionable C-wrongs

1. `LS_OBJECT` MINVENT arm drops C's `obj->ocarry->mx` nonzero gate (`zap.c:672–677`: `if (obj->ocarry->mx)` TRUE, else break → 0,0 + FALSE). JS sets SHOW with x,y = carrier mx,my even when the carrier is migrating (mx=0) — C paints nothing, JS paints a corner ring. Pre-existing (D-2157 inline refresh had the same shape), doubly-unreachable in practice (needs a lit object in a migrating monster's inventory while its light source survives migration — the migration light-source arm is itself unported), display-only, no RNG. Queueable in one port iter (add the nonzero-carrier gate to the MINVENT condition); belongs with the map's `get_obj_location` refinement note, not a Must-fix — hence WITH-DEBT rather than ACCEPT.

Verdict: **ACCEPT-WITH-DEBT**
