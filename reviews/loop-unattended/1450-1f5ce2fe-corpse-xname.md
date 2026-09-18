# Review 1450 — 1f5ce2fe — corpse_xname whole-body restart + food_xname (D-2491)

Metadata: SHA `1f5ce2fe`, `js/objnam.js` +60/−20 (restart in place), `js/eat.js` +24 (rewire). C `objnam.c:1822–1920` + caller `eat.c:217–235`. D-log: D-2491.

## Intent vs deliverable

Promise: C-order restart of `corpse_xname` with `:line` cites + `food_xname` rewired to C + TDZ revert (static edges backed out, file-local copies kept). Diff delivers it: every C block cited, no new static edges in the final tree (only widened pre-existing `objnam.js`/`const.js` imports), local-copy reuse disclosed. Promise = deliverable.

## Inventory

- Changed: `corpse_xname` body (same export/signature), `food_xname` (now delegates).
- `sym.mjs` (required): no deleted symbols; no local→import re-points (direction here is the reverse — a backed-out edge). Reused locals verified identical: `s_suffix_objnam` ≡ `s_suffix` (do_name.js:386, body-identical), `mungspaces_objnam` ≡ squeeze+trim (order-only difference, same outcome); `type_is_pname_objnam` is the one-line M2_PNAME test. `the_unique_pm`/`obj_pmname_corpse`/`an` file-local or same-file. New imports all live on pre-existing edges: `corpse_xname` (objnam), `CXN_SINGULAR` (const.js:1746), `the`/`singular`/`type_is_pname`/`mons` (pre-existing eat.js imports, verified).

## C ↔ JS fidelity

Walked C `:1822–1920` block-by-block — exact. Key blocks (re-read):

```c
glob = (otmp->otyp != CORPSE && otmp->globby);
...
if (glob) {
    mnam = OBJ_NAME(objects[otmp->otyp]); /* "glob of <monster>" */
} else if (omndx == NON_PM) { /* paranoia */
    mnam = "thing";
} else {
    mnam = obj_pmname(otmp);
    if (the_unique_pm(&mons[omndx]) || type_is_pname(&mons[omndx])) {
        mnam = s_suffix(mnam);
        possessive = TRUE;
        if (type_is_pname(&mons[omndx]))
            no_prefix = TRUE;
        else if (the_unique_pm(&mons[omndx]) && !no_prefix)
            the_prefix = TRUE;
    }
}
```

JS: glob as `(otyp|0) !== CORPSE && globby` (old string-compare fixed); NON_PM → `thing` (+ disclosed null-safety); `obj_pmname` valid arm via `obj_pmname_corpse` (possessive/pname-no_prefix/unique-the_prefix). Mutual exclusion; forced `"the "` (never `the()` — the C comment explaining why is preserved in spirit); adjective placement both arms with `mungspaces` in both (matching C's post-if placement); ASCII `digit` via charCode 48–57 (old `/^\d/` Unicode-width fixed); ` corpse` + literal-`s` plural with `quan > 1` clearing prefix (`?? 1` ≡ C for all real values); `an()` tail. Buffers-as-strings per D-2483 idiom (named).

`food_xname` ≡ C `eat.c:217–235`:

```c
if (food->otyp == CORPSE) {
    result = corpse_xname(food, (const char *) 0,
                          CXN_SINGULAR | (the_pfx ? CXN_PFX_THE : 0));
    if (type_is_pname(&mons[food->corpsenm]))
        the_pfx = FALSE;
} else {
    result = singular(food, xname);
}
if (the_pfx)
    result = the(result);
```

JS follows it line for line (pname suppresses `the()`; else `singular(xname)`), fixing the old inlined neutral-only name (no possessive/gender/glob).

Residual gap, pre-existing and preserved: glob `mnam` keeps an `|| 'glob'` fallback where C would dereference NULL `OBJ_NAME` — unreachable in practice (no nameless globby otyp), defensive only. Named omits (zap/trap/pickup arms, buffers, dothrow/eat/wield residuals) carry C cites.

TDZ revert (verified in the final diff, not trusted from the message): the mid-iteration fault (`Cannot access '_shk_owns_prefix' before initialization` — new static do_name/getline edges reordering cycle eval past `shk.js:832`) was backed out in-commit; the final diff carries no new static edges, only two widened pre-existing import blocks (`corpse_xname` into eat.js's objnam import, `CXN_*` into its const import — `the`/`singular`/`type_is_pname`/`mons` all pre-existing there). The reused file-local copies were diffed against the live exports: `s_suffix_objnam` body-identical to `s_suffix` (do_name.js:386); `type_is_pname_objnam` is the one-line M2_PNAME test (≡ do_name.js:590); `mungspaces_objnam` is squeeze+trim (order-only difference from the live shape, same outcome).

## Hallucinations / overclaim

None. The "bodies identical" claim verified for the two copies I diffed; the revert story is consistent with the final diff (no do_name/getline edges present).

## Density

Right-sized restart + caller fix, 2 files.

## Verification

`hidden-proxy verify corpse_xname --base 1f5ce2fe~1 --reach-all` (re-run here):

```text
verify corpse_xname: baseline 1f5ce2fe~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke corpse_xname: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated). Matches. `imports.mjs --rulecheck` (whole scored `js/`): Rule #2 clean. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. `sym.mjs` spot checks: `CXN_SINGULAR → js/const.js:1746 sync`; `the_unique_pm`/`obj_pmname_corpse` file-local in objnam.js (pre-existing arrangement). Old-vs-new behavior note: the pre-commit `food_xname` produced `the <neutral> corpse` with no possessive, gender, or glob path — the rewire strictly widens toward C on every input class.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
