# Review 2864 — af8d2b0d6 — see_monsters async, Sting stop-glow awaited

## Metadata

- SHA: `af8d2b0d6d992832323075e92969d3cbb789dd520` (D-4022)
- Cliff writer: row 2 `mhitm.c` hitmm @1c7d7bc15 (row 1
  D-4016-kin, re-verified first-hand); owner misattributed,
  both messages are mhitu-vs-hero
- js/ diff: `js/display.js` +8/-2 (async + awaited Sting
  block), `js/allmain.js` +3/-3 (3 awaits);
  `scripts/sting-stop-more-order.test.mjs`
- Method: full per-function (cliff commit)

## Intent vs deliverable

Promise: sync `see_monsters` fired async `Sting_effects`
unawaited, so the Orcrist stop-glow landed after the screen
capture (Knight s319 lost its overflow `--More--`). Make it
async: call Sting (text computes sync from the old count),
update the count sync (C order), await the pline. Await at
the 3 C-allmain call sites. Probe FULL PASS.

Diff actually: exactly that. Promise == diff.

## Inventory

- `see_monsters` (`js/display.js:6809`, C `display.c:1487-`
  `1529`): sync→async + Sting block reorder.
- `moveloop_preamble` (`js/allmain.js:328`, C `:90-94`) +
  `moveloop_core` (`:1477`, `:1487`, C `:457`/`:468`): 3
  awaits added, nothing else.

## C ↔ JS fidelity

- C `display.c:1519-1524` (read): `if (new !=
  gw.warn_obj_cnt) { Sting_effects(new); gw.warn_obj_cnt =
  new; }` — JS now: call, update, await. Same order.
- C stop arm (`artifact.c:2496-2499`, read): `orc_count==0
  && warn_obj_cnt>0` → verb from the OLD `gw.warn_obj_cnt`.
  JS `Sting_effects` (`js/artifact.js:947-968`, read whole):
  all count reads (`oldstr` `:954`, the `:956`/`:965`
  guards, the `:966`/`:961` verbs) execute before the first
  `await` — `Blind`/`u_wield_art`/`glow_*` are all sync —
  so the template text is fixed from the old count during
  the call, before the update on the next line. The D-log's
  "computes synchronously at call time" holds; the `await`
  only flushes emission before the caller proceeds, which is
  what C's synchronous `pline` does.
- Unchanged-count calls execute zero awaits — sync callers
  are behaviorally identical (ignored promise as before).
- `sym.mjs`: both functions ASYNC; late-bind `_Sting_effects`
  registration untouched. Nothing deleted or re-pointed.

## Hallucinations / overclaim

None. The stray-chain autopsy (JS320 bare More, JS321
Unknown-command, rejection outliving runSegment) is
diagnostic color consistent with the mechanism, not load-bearing.

## Density

Writer port on a live row-2 (row-1 park re-verified, falsifier
unfired; history tag D-1351 read, not re-ported). The 31
unawaited sites are a NAMED omission with a per-row ride-along
rule, not a silent stub — correct handling. `Ledger:`
see_monsters partial + moveloop_core ported.

## Verification

Re-measured `--base af8d2b0d6~1 --no-reach`: `verify hitmm:
1 PASS, 0 moved past, 0 unchanged, 0 worse`
(Knight-51050073) — claim exact.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
