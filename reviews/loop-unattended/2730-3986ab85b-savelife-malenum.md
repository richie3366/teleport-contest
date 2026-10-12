# Review 2730 — 3986ab85b — savelife urole.malenum → mnum (D-3870)

## Metadata

- SHA: `3986ab85b` (cliffs-head writer port)
- D-entry: D-3870; Ledger: `savelife ported`
- js diff: `js/end.js` one field (`+2/−2` with the cite comment)
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: `savelife` read nonexistent `urole.malenum`, so every
role took the non-Tourist `:736` arm; one-field fix to `mnum` moves
Tourist-578210 622→PASS.

The diff actually adds: exactly that field rename with a `you.h:247`
cite. No imports/edges. Promise == deliverable.

## Inventory

- `savelife` (`js/end.js:2176`, async) — `game.urole?.malenum` →
  `game.urole?.mnum` in the `multi_reason` ternary. No symbol deleted
  or re-pointed (no `sym.mjs` paste required). This audit confirms
  `malenum` now has zero occurrences repo-wide in `js/`.

## C ↔ JS fidelity

C locus, read from pinned C: `end.c` savelife `:735–736`
(`gm.multi_reason = Role_if(PM_TOURIST) ? "being toyed with by Fate" :
"attempting to cheat Death"`) with `Role_if(X) ≡ gu.urole.mnum == X`
(`you.h:247`, verified by grep). JS now reads `game.urole?.mnum`,
matching every other Role_if port in the file tree (e.g.
`js/roles.js:1388` PM_CLERIC; `Role_switch ≡ game.urole.mnum` at
`js/u_init.js:701`). Previously `rolePm` was always `undefined`
(`malenum` existed nowhere), so the Tourist arm was dead for all
roles — the fix restores exactly C's two-valued branch. The printed
strings are unchanged and match C verbatim. RNG: none on this path.

## Hallucinations / overclaim

None. No "Match C" overreach — the claim is one field, and the field
is right. No markers in the hunk; Rule #2 clean (review 2727 scan).
`savelife` otherwise-whole claim (D-3260/D-2191/D-0868) is inherited,
not re-audited here; the pre-existing stop-travel assist and fuzzer
caller are correctly disclosed as untouched.

## Density

Cliff-head writer port with movement (print_mapseen row's writer; the
painter correctly untouched — the divergence was the value it read).
Minimal one-field handoff with corpus-session regression cover and no
bespoke script — appropriate density for the change. `Ledger: savelife
ported` — single entry, right owner.

## Verification

Re-measured by this audit
(`verify savelife,print_mapseen --base 3986ab85b~1 --reach-all`):

- `verify print_mapseen: 1 PASS → PROGRESS`
  (scen-sweep-Tourist-578210: PASS).
- `verify savelife`: vacuous (0 blocked — expected; D-log said so).
- Smoke spreads 24/24 REACH-OK ×2; 0 regressed.

No REGRESSED session. The "1 PASS" movement claim is confirmed on
current code.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
