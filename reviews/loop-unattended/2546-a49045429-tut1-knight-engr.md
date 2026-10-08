# Review 2546 — a49045429 — tut-1.lua knight engraving (D-3671)

- SHA: `a49045429cd9e9bd79478441b9cb639ec9ad1e98`
- Subject: cliffs-head read_engr_at writer: tut-1.lua:83-85 knight engraving was deferred, C paints S_engroom backtick (Knight-94259 → PASS) (D-3671)
- D-entry: D-3671. Type: cliff (writer port, ≤10 functions → whole Method on the one changed function).
- Diff size: `js/mklev.js` +4/−1; + test `scripts/tut-knight-engr.test.mjs` (85 lines); ledger `lspo_engraving` D-tag.

## Intent vs deliverable

Promise: role-gate the deferred knight-only `des.engraving` from
`dat/tut-1.lua:83–85` into `load_tut1` in C order, retiring the doc
omission; Knight-94259 → PASS; RNG-neutral.

Diff actually adds: one `if (game.urole?.mnum === PM_KNIGHT)
tut1_engr(12, 1, …)` block between the (5,2) and (2,4) sites, the doc
`- Knight jump (role gate)` retirement, one ledger D-tag, and a
2-case node:test (Knight pins engr, Caveman pins absence).

## Inventory

| JS function | Change | C locus |
|---|---|---|
| `load_tut1` (`js/mklev.js:20276–20279`) | + role-gated `tut1_engr` call | `dat/tut-1.lua:83–85` |

No helpers added, none deleted, none re-pointed. `sym.mjs` re-point
check: not applicable (no local clone → import move).

## C ↔ JS fidelity

C (`dat/tut-1.lua`, verified by line read):

```lua
83:if (u.role == "Knight") then
84:   des.engraving({ coord = { 12,1 }, type = "engrave",
     text = "Knights can jump with '" .. tut_key("jump") .. "'",
     degrade = false });
85:end
```

JS (`js/mklev.js:20276–20279`):

```js
if (game.urole?.mnum === PM_KNIGHT) {
    tut1_engr(12, 1, "Knights can jump with '" + tut_key('jump') + "'");
}
```

Branch-by-branch confirm:

- **Gate:** C `u.role == "Knight"` (role-name string from the lua
  `u` proxy) → JS `game.urole?.mnum === PM_KNIGHT`. Same idiom as
  the in-function Monk precedent (`js/mklev.js:20332`,
  `game.urole?.mnum === PM_MONK`). Mapping role-name → role mnum
  is exact; `PM_KNIGHT` is module-local from `monsterNames`
  (`:280`), already used twice.
- **Order:** call sits between the (5,2) and (2,4) `tut1_engr`
  calls, matching C `:82`→`:84`→`:87` order. Both sides prepend
  (`make_engr_at` sets `game.head_engr = ep`, `js/engrave.js:828`;
  C `make_engr_at` prepends likewise), so list order matches.
- **Type/degrade:** `tut1_engr` defaults `etype = ENGRAVE`
  (`:20226`) and sets `ep.nowipeout = 1` (`:20231`) =
  `type="engrave", degrade=false`. Exact.
- **Text:** `tut_key('jump')` → `cmd_from_ecname('jump')`; the
  committed test pins the composed string byte-exact to
  `"Knights can jump with 'M-j'"`, and D-3670's TEMP-C dump pinned
  C's text to the same. Exact.
- **RNG:** `make_engr_at(x, y, text, null, 0, ENGRAVE)` —
  `engr_type: (e_type > 0) ? e_type : rnd(…)` (`js/engrave.js:820`)
  draws nothing with an explicit type; `e_time = 0`, no other
  draws in the path. RNG-neutral as claimed.
- **Second witness:** D-3670's row-6-col-7 witness is retired with
  a measurement (JS engr revealed=1, mem glyph 3994, paints the
  backtick), not by assertion.

## Hallucinations / overclaim

None. The "Match C" claim covers one `.lua` site, and the diff is
exactly that site. No dispatch-vs-callee gap (no new dispatch).
No FORCE/DIAG/seed/coordinate reads in the diff. Rule #2:
`imports.mjs --rulecheck` clean across scored `js/` (run this
iteration).

## Density

Cliff phase: owner `read_engr_at` was the next live head — the
`mon_wield_item` cliffs head is unworkable per D-3570
RECORDER-ARTIFACT + D-3660 two-no-js/ max, re-shown byte-identical
this iteration (D-log Status). D-3670 `[measure]` named this
writer; this commit ships it. One cliff, one writer, code + ledger
+ verify in one handoff. Right-sized.

Each sampled function verdict: `load_tut1` site — faithful.

## Verification

D-log claim: `verify read_engr_at: 1 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS` + REACH-OK + green/strict/cohort/full 44/44.

Re-measured by this audit
(`hidden-proxy.mjs verify read_engr_at --base a49045429~1 --reach-all`):

```text
scen-tutorial-Knight-94259: PASS
verify read_engr_at: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
smoke read_engr_at: … 24 PASS, 0 regressed → REACH-OK
```

Both summary lines match the D-log exactly. No REGRESSED session.
Not vacuous: baseline names the 1 blocked session and it PASSes.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
