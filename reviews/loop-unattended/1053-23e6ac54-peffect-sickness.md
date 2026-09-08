# Review 1053 — 23e6ac54 — peffect_sickness poisontell + Fixed_abil gate (D-2083)

## Metadata

- SHA: `23e6ac54` — `potion.c peffect_sickness dropped poisontell and the Fixed_abil gate (queue owner peffect_sickness) (D-2083).`
- JS diff: `js/potion.js` ~20 lines (one import name, gate block, header cite/omission update).
- Docs: D-2083 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1053.

## Intent vs deliverable

Subject promises the missing `poisontell` call and `Fixed_abil`
gate for non-healer sickness quaffs. Diff adds exactly that, plus
a header cite (`:964–1011`) and omission update. Promise == diff;
no scope creep.

## Inventory

- Changed: `peffect_sickness` (potion.js) — one gated block.
- `poisontell`: `sym.mjs` → live async export `js/attrib.js:270`,
  awaited at call time — LIVE.
- `Fixed_abil`: local clone `js/potion.js:1789`, pre-existing,
  C-cited (`youprop.h:385`, confirmed: `#define Fixed_abil
  u.uprops[FIXED_ABIL].extrinsic`) with documented JS-side
  mirroring — verified CLONE, not a new stub. (`sym.mjs` notes 3
  file-local clones repo-wide; pre-existing drift, untouched by
  this SHA.)
- Diff grep: no `FORCE`/`DIAG`/seed reads, no RNG change.

## C ↔ JS fidelity

C `potion.c:964–1011` (read directly); the `:987–992` block is
verbatim:

```c
if (!Fixed_abil) {
    poisontell(typ, FALSE);
    (void) adjattrib(typ, Poison_resistance ? -1 : -rn1(4, 3),
                     1);
}
```

JS ports gate, then poisontell, then adjattrib in C order with
identical arguments (`false` = FALSE). Both symptom channels
explained: the Poison_resistance path gains the poisontell
overflow line (kit-Rogue --More--), the non-resist path gains it
before the damage roll (normal-Rogue «very sick»). Neither call
adds RNG, consistent with screen-first sessions. Remaining named
omit (full `make_hallucinated` body) stays mapped. No gap found.

## Hallucinations / overclaim

None.

## Density

~20 lines on one function — the accepted corpus-row exception.

## Verification

D-log Verify bullet: `verify --fn peffect_sickness` → `1 PASS,
1 moved past, 0 unchanged, 0 worse → PROGRESS` (Rogue-92209 PASS;
kit-Rogue-92225 47→show_conduct@82, strictly later). Re-measured
myself: `hidden-proxy.mjs verify peffect_sickness --base
23e6ac54~1` → identical destinations, 0 worse. Claim reproduced
exactly. Rule #2 clean (prior step).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
