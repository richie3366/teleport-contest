# Review 1321 — aba73268 — apply.c use_lamp shop billing: lamp check_unpaid + fresh-candle verbalize/bill_dummy (D-2355)

Metadata: SHA `aba73268`, D-2355, debt-named row (0 sessions
blocked). Method: full `js/` hunk read (`js/apply.js`,
+22/−5); C `use_lamp`
(`nethack-c/upstream/src/apply.c:1627-1700` via `csym.mjs`,
full body read) + callers (4 refs: `apply.c:22/1403/1417/4347`);
`sym.mjs` on `check_unpaid` / `bill_dummy_object` /
`costly_spot` / `verbalize` / `objects` (pasted below);
added-line banned grep (0 hits); `imports.mjs --rulecheck`
(clean, re-run); `hidden-proxy verify use_lamp --base
aba73268~1` re-run. No symbol deleted or re-pointed (one name
added to an existing `objects.js` edge) → liveness checks only.

## Intent vs deliverable

Subject promises two latent C-wrongs on the otherwise-live
body (core D-1023/D-1052/D-1025): lamp lighting skipped the
shop usage fee; burning a fresh unpaid candle skipped the
sale. Diff delivers both with C line citations, one file, no
new modules/edges. Promise kept.

## Inventory

- `js/apply.js` `use_lamp` lamp arm: `await check_unpaid(obj)`
  before the "is now on" pline; `objects` joins the existing
  `objects.js` import.
- `use_lamp` candle arm: after the flame pline, `unpaid &&
  costly_spot(ux,uy) && age === 20*oc_cost` → `await
  verbalize("You burn them/it, you bought them/it!")` + `await
  bill_dummy_object(obj)`; `SetVoice` omitted (named).
- Doc header cites `:1628–1700`/`:1683`/`:1690–1698`; old
  "shop check_unpaid; candle unpaid SetVoice / bill_dummy"
  omit retired to the SetVoice-only line.
- Named: candle `SetVoice` (audio voice no-op, `use_candle`
  precedent); `Shk_Your_apply` thin prefix, `shk_your` /
  `Yname2_oil` / `s_suffix_apply` clones (pre-existing).

## C ↔ JS fidelity

Arm-by-arm confirm. (1) Lamp: C `:1683-1685`
`check_unpaid(obj)` then `pline("%s%s is now on.")` — JS
awaits the ASYNC live `check_unpaid` (`shk.js:3286`) before
its pline, same order ✓. (2) Candle: C `:1686-1698` pline
FIRST, then the `unpaid && costly_spot(u.ux,u.uy) && age ==
20*objects[otyp].oc_cost` gate with `them/it` on `quan > 1`,
`SetVoice`, `verbalize("You burn %s, you bought %s!")`,
`bill_dummy_object(obj)` — JS keeps pline-before-gate order,
identical predicate (`|0` int coercions; `?.` guards are
no-op on live objects), identical message, both callees LIVE
async and awaited (`verbalize` `display.js:7327`,
`bill_dummy_object` `shk.js:1025`) ✓. (3) `SetVoice` omit:
C guards it `VOICEONLY` with a `shop_keeper(*in_rooms(...))`
arg — compiled out of this build configuration, zero
screen/RNG surface; named with the `use_candle` precedent ✓.
No RNG in either arm; branch order exact on both.

## Hallucinations / overclaim

None. Subject says "shop billing", not "Match C", and names
the one dropped call with its precedent. No dispatch-with-stub
shape — every callee in both live arms is imported and live.

## Density

Right-sized: one C function, two adjacent arms, ~22
insertions. Below the 80-line heuristic only because the C
locus itself is ~10 lines — §2b allows it.

## Verification

D-log is honest: `verify --fn use_lamp` vacuous (0 blocked)
stated as vacuous, green 2/2 + strict ×2 + cohort 7/7 PASS.
Re-run `--base aba73268~1`: "0 session(s) blocked on it (0
at baseline, 0 in the working scoreboard)" — matches the
claim exactly. Row cited 0 blocks so no deeper `--base` owed.

```
check_unpaid     js/shk.js:3286   ASYNC — await required
bill_dummy_object js/shk.js:1025   ASYNC — await required
costly_spot      js/shk.js:801   sync
verbalize        js/display.js:7327   ASYNC — await required
objects          js/objects.js:75   sync
Rule #2 clean: no bare/node specifiers or fs calls in js/.
```

## Actionable C-wrongs

None. Both arms verified against C; the sole dropped call is
a compiled-out no-op, map-named.

Verdict: **ACCEPT**
