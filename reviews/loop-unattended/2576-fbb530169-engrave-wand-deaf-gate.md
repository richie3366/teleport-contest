# Review 2576 — fbb530169 — doengrave WAN Deaf-macro gate (D-3706)

## Metadata

- SHA: `fbb530169cf71793940c88cecffcc059453b8059` (2026-10-09, D-3706)
- Scope: ≤10-function refill — whole Method on `doengrave_sfx_item_WAN`
  (1 shared const feeding 2 gates)
- Diff: `js/engrave.js` +5/−1 (**new static import** `hero_Deaf` from
  monmove.js + const swap), new
  `scripts/engrave-wand-deaf-gate.test.mjs` (158 lines), ledger
  D-tag, scoreboard header + **full re-stamp** (see Verification)
- Context: omit-2 family, same-iteration map refill+ship; queue empty,
  batch no gap

## Intent vs deliverable

Subject promises: C gates the blind digging-wand text on
`(Blind && !Deaf)` and the blind lightning-wand text on `!Deaf`; JS
read raw `game.u?.Deaf` (stuck false), so a macro-deaf blind hero
heard "drilling"/"crackling" where C feels "tremors"/"hair stands
up". Fix: import `hero_Deaf`, one const swap. The diff delivers
exactly that — one import line, one const, cites — nothing else in
`js/`. Promise matches deliverable.

## Inventory

- `doengrave_sfx_item_WAN` (`js/engrave.js:936`): the `deaf` const
  (:943) feeds both wand gates (:1022, :1049). No new JS function.
- Callee: `hero_Deaf js/monmove.js:1197 sync` — canonical export,
  hoisted `export function` declaration (verified by reading it).
  Nothing deleted or re-pointed.
- **New edge audit (required — this SHA adds a static import):**
  `js/monmove.js:17` already statically imports `./engrave.js`, so
  the new `engrave.js:77` import closes a 2-cycle. Cycle-safe as
  claimed: `hero_Deaf` is a hoisted function declaration, used only
  at runtime inside function bodies on both sides — no top-level TDZ
  read. (The historical `--can: SAFE` cannot be re-run post-commit —
  it now reads ALREADY — but the safety reasoning was confirmed
  independently from the declaration shape, and the committed tree
  loads: all gates below ran on it.)

## C ↔ JS fidelity

C locus (`csym.mjs`: body `engrave.c:582–738`; callers: the ctx
dispatch inside engrave.c — `staticfn`, no extern callers):

```c
/* :693 digging */ (Blind && !Deaf) ? "You hear drilling!"
    : Blind ? "You feel tremors." : IS_GRAVE ... headstone ...
/* :730 lightning */ if (!Blind) { "Lightning arcs..."; doblind }
    else { !Deaf ? "You hear crackling!" : "Your hair stands up!" }
```

JS WAN_DIGGING (:1022–1032): `(Blind() && !deaf)` drilling /
`Blind()` tremors / grave / frosted / drawbridge / gravel — full
ladder matches C `:693–700` arm for arm, strings byte-identical.
JS WAN_LIGHTNING (:1044–1051): `!Blind()` arcs + `doblind`, else
`!deaf` crackling / hair — matches C `:725–732` exactly. The
`const deaf = hero_Deaf()` swap is the whole delta and lands in both
gates with C polarity. RNG: none either side (message text only) —
"no RNG delta" confirmed. Branch-by-branch confirm.

## Hallucinations / overclaim

None. "No corpus divergence", no movement claimed. The Next-lead
triage (noises `:31` = same swap shape; mdig_tunnel = You_hear-rewire
shape, needs its own row; mthrowu/sounds raw reads honestly
"unverified against C") is careful scoping, not padding.

## Density

Legitimate refill under the D-3699 precedent: one C const, two gates,
`js/engrave.js` only + its test, ledger `ported` kept `ported` with a
D-3706 tag, three neighbor suites re-run (8/8). Not a no-op; the new
import edge is the documented, checked cost of using the canonical
reader instead of a fourth clone. No bundling.

## Verification

- Focused test: `node --test scripts/engrave-wand-deaf-gate.test.mjs`
  → 8/8 pass (re-ran here).
- Re-measure (`verify doengrave_sfx_item_WAN --base fbb530169~1
  --reach-all`): `0 session(s) blocked on it` at baseline — matches
  the D-log's "note hidden" honestly — and `smoke
  doengrave_sfx_item_WAN: no RNG-tagged reach; fixed smoke spread (24
  run, 11.9s): 24 PASS, 0 regressed → REACH-OK`. Zero regressions.
- Scoreboard hunk: header re-stamp **plus** `fullCommit/fullAt`
  re-stamp at 0b624251c — the disclosed incidental full `score`
  (still 939/953, zero row changes). Harmless: this audit's rescore
  is the last hidden-proxy command of the iteration per the ALSO
  block, and it re-stamps `full` again.
- Diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2573).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
