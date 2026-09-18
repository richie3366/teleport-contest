# Review 1444 — d58ca60a — sanity_check_single_mon `has_egd` import miss (D-2485)

Metadata: SHA `d58ca60a`, `js/mon.js` 1 insertion / 1 deletion (import line only). D-log: D-2485. Closes review 1438 Must-fix.

## Intent vs deliverable

Promise (subject): fix the review-1438 Must-fix — bind the unbound `has_egd` on the `isgd` guard arm. Diff delivers exactly that: one word added to the existing `const.js` import at `js/mon.js:25`. No body touched, no new edge, no new omission named. Promise = deliverable.

## Inventory

- Changed: import list in `js/mon.js:25` (`has_egd` added beside sibling `has_emin/has_epri/has_eshk`).
- Added/removed functions: none. Deleted/re-pointed symbols: none (binding added, not a clone removal).
- `sym.mjs` (required): `has_egd → js/const.js:3141 sync` — single live definition, no clones. Grep confirms import `:25`, use `:480`, export `const.js:3141` — bound.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/mon.c:72–255` (`sanity_check_single_mon`, staticfn; range from `csym.mjs`). The guard arm in question (`mon.c:129–130`):

```c
if (mtmp->isgd && !has_egd(mtmp))
    impossible("guard without egd (%s)", msg);
```

sitting in the shk/priest/guard/minion `has_exxx` series (`:125–133`). The fix does not alter any arm's logic, order, or RNG (function has no RNG). Branch-by-branch confirm: the only delta is name resolution on an already-exact arm — JS now reads the same predicate C does (`has_egd` ≡ `mextra->egd` presence, `js/const.js:3141`). Nothing to walk further; the body was walked in review 1438.

Operative binding evidence (re-run here, since `node --check` and dynamic `import()` both pass with an unbound free variable):

```text
js/mon.js:25:    has_emin, has_epri, has_eshk, has_egd, has_edog, ...
js/mon.js:480:    if (mtmp.isgd && !has_egd(mtmp))
js/const.js:3141:export function has_egd(mtmp) { return !!mtmp?.mextra?.egd; }
```

`sym.mjs has_egd` (required — the re-bound symbol):

```text
has_egd          js/const.js:3141   sync
```

single live definition, no clones. `csym.mjs sanity_check_single_mon` confirms the C range `mon.c:72-255` (184 lines, staticfn).

## Hallucinations / overclaim

None. The D-log states the throw was latent (function module-local, unwired; C callers in unported `mon_sanity_check` fmon/migr sites) and claims only the operative grep check plus the standard `verify --fn` tail — both accurate. The `--can` no-new-edge claim holds (same-file import line widened on a pre-existing static edge).

## Density

One-word Must-fix, alone in the commit — correct per playbook (Must-fix stays one item, alone). No density concern.

## Verification

`hidden-proxy verify sanity_check_single_mon --base d58ca60a~1 --reach-all` (re-run here):

```text
verify sanity_check_single_mon: baseline d58ca60a~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke sanity_check_single_mon: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated). Matches the D-log. `imports.mjs --rulecheck` (whole scored `js/`):

```text
Rule #2 clean: no bare/node specifiers or fs calls in js/.
```

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Prior review closed: 1438's Must-fix is the only item this SHA claims, and its `**Addressed:** D-2485 \`d58ca60a\`` stamp (with short hash) is already on the 1438 file — verified present, so no hash-fill needed in this commit.

## Actionable C-wrongs

None. The single C-wrong from review 1438 is fixed; D-2479's named omits (`panic`, `levltyp_to_name`, `#if 0` arms, unwired callers) stand in the map.

Verdict: **ACCEPT**
