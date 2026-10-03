# Review 2278 — cb36dc362 — a_monnam trap+hack clone removals

- SHA: `cb36dc362` (D-3322)
- Files: `js/hack.js`, `js/trap.js` (+ `scripts/amonnam-rewire.test.mjs`, docs, ledger)
- Insertions: ~5 js / ~22 deletions; rewire-to-live shape

## Intent vs deliverable

Subject promises: "`do_name.c` a_monnam trap+hack clone removals
(animate_statue / moverock_core rewires)". The diff delivers exactly that:
deletes both local `a_monnam` clones, extends the existing `do_name.js`
imports, adds one C-cite comment per site. Call-site expressions
unchanged. No DIAG/FORCE/seed; Rule #2 clean (iteration-wide rulecheck).

## Inventory

- Two deleted clones (trap.js:247-then, hack.js:300-then), two extended
  imports. No new/changed function bodies; live export re-verified here.
- `scripts/amonnam-rewire.test.mjs`: 5 subtests (an-eel / a-rat /
  named-saddled + 2 census), with an authentic pre-change failure noted.

## C ↔ JS fidelity

C body (nethack-c/upstream/src/do_name.c:1151–1156): `x_monnam(mtmp,
ARTICLE_A, 0, has_mgivenname(mtmp) ? SUPPRESS_SADDLE : 0, FALSE)`. Live JS
(do_name.js:1221): identical argument order over live `x_monnam`
(`ARTICLE_A`, `null`, `has_mgivenname ? SUPPRESS_SADDLE : 0`, `false`) —
C-exact, no RNG. Both deleted clones were real C-wrongs: trap's `` `a
${mon_nam}` `` (wrong article before vowels, no SUPPRESS_SADDLE/hallu
arms) and hack's PM_-tag-derived lowercase names (own doc deferred
hallu/invisible/named-pet arms). Sites: trap.js:444 `canspotmon(mon) ?
a_monnam(mon) : something` ≡ trap.c:848; hack.js:1044 "There's … on the
other side" ≡ hack.c:462. `sym.mjs a_monnam` → single sync export,
zero `a_monnam` clones left (the `Amonnam` capitalized-twin locals in
fountain/mhitu/teleport/zap are a different function, pre-existing):

```
a_monnam         js/do_name.js:1221   sync
```

The remaining music.js:266 clone serving music.c:124 is disclosed in
Named omissions and was queued as its own row in this commit (shipped
next, D-3323) — named, not silent.

## Hallucinations / overclaim

None. "Two real C-wrongs fixed" verified against the deleted clone texts.
Pre-change census failure honestly reported.

## Density

Single-function rewire; defended exception shape. `Ledger:` a_monnam
ported. Per-function Verify lines present.

## Verification

Re-measured (`hidden-proxy.mjs verify a_monnam --base cb36dc362~1
--reach-all`): 0 blocked (vacuous; rows cited 0 blocks, honestly noted) +
smoke 24/24 PASS, 0 regressed → REACH-OK — the D-log tail verbatim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
