# Review 1095 — 7fca2bb6 — prayer_done Inhell angrygods gate (D-2129)

Metadata: SHA `7fca2bb6`, `js/pray.js` +4/−1 only. Queue row `pray.c`
prayer_done, scen-tour-Healer-92198 step 105/165, RNG-first at
`pray.c:2311`: C `rnl(10)=4 @ prayer_done` vs JS `rn2(5)=4 @
distfleeck`. Toplines: C «Since you are in Gehennom, Hermes can't
help you.--More--» vs JS the same line without `--More--` (C runs the
anger arm behind the MORE; JS returns). No prior review claimed
closed.

## Intent vs deliverable

Subject promises: the skipped `rnl(record)` + `angrygods` in the
Inhell arm. Diff actually adds: the 2-line gate plus one doc line.
Promise matches diff — a 3-line C gate, ported as 3 lines.

## Inventory

Changed JS: `prayer_done` Inhell arm (pray.js). Callee closure:

| Symbol | Status | Evidence |
|---|---|---|
| `rnl` | LIVE (`rng.js:105` sync) | pre-existing import (pray.js:36) |
| `angrygods` | LIVE, same-file (D-0969) | local function with full body (maxanger arithmetic, `rn2(maxanger)` switch) — read and confirmed, not a stub |

No new edge, no clone, no stub, no `--can` needed. This is the good
case of the dispatch/callee pattern: dispatch ported, callee already
live with a real body.

## C ↔ JS fidelity

C locus `pray.c:2276-2343` (`csym.mjs prayer_done`), Inhell arm read
verbatim:

```
if (Inhell) {
    pline("Since you are in Gehennom, %s can't help you.", ...);
    /* haltingly aligned is least likely to anger */
    if (u.ualign.record <= 0 || rnl(u.ualign.record))
        angrygods(u.ualign.type);
    return 0;
}
```

JS is line-for-line identical:

```
if (((u.ualign?.record | 0) <= 0) || rnl(u.ualign?.record | 0))
    await angrygods(u.ualign?.type ?? 0);
return 0;
```

The load-bearing detail is the `||` short-circuit: when `record <=
0`, C draws nothing and still calls angrygods; JS `||` preserves both
(no draw + call). RNG call-for-call: exactly one `rnl(record)` where
C draws `rnl(10)=4`. Remaining p_type −2/−1/1/2 outcome bodies +
`pray_revive` stay header-named with no corpus reach this iter.

## Hallucinations / overclaim

None. "Exact C order + short-circuit" verified true against the C
text quoted above.

## Density

+4/−1 — C is that small; the whole envelope. Acceptable.

## Verification

D-log Verify bullet: `verify.mjs --fn prayer_done` → PASS syntax +
PASS rule2 + hidden PROGRESS with the session going full PASS + green
2/2 + strict ×2 + cohort 7/7 (full skipped, no shared file).
Re-measured myself: `hidden-proxy.mjs verify prayer_done --base
7fca2bb6~1` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (Healer-92198 fully PASS; D-log cites 165/165 screens,
31202/31202 RNG). Strongest verification of the batch — a full
session PASS, not just a move. Grep: no FORCE/DIAG/seed/fastforward/
coords. Queue row archived; map updated.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
