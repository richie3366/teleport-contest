# Review 1526 — eb5f9f62 — engrave.c make_engr_at restart (D-2567)

## Metadata

- SHA: `eb5f9f62`
- D-id: D-2567. Next index: 1526.
- Files: `js/engrave.js` (+43/−16: restarted `make_engr_at`, `N_ENGRAVE` import join).
- C locus: `nethack-c/upstream/src/engrave.c:407–457` (`make_engr_at`, 51 L; `csym.mjs` range), extern decl `extern.h:1016`, 8 C call sites.

## Intent vs deliverable

Subject promises: restarted `make_engr_at` in C order with `:line` cites — smem/havepristine, replace-at, record literal with sizes, pristine gating, Elbereth arms, `N_ENGRAVE` import. Diff delivers exactly that. Promise matches deliverable.

## Inventory

- Restarted: `make_engr_at` (`js/engrave.js:572`, sync; `sym.mjs`: single export, no clone).
- Import join: `N_ENGRAVE` (`js/const.js:1136`, value 6 — ALREADY-edge, no new module).
- Callees LIVE: `engr_at`, `del_engr` (null no-op verified `js/engrave.js:156–157`, matching the `:423–424` `!= 0` guard), `exercise`. Arena (`newengr`/`engr_text_space`) named omit (by design — JS strings need no arena; sizes kept on the record).
- Pre-existing export, so the 8 C call sites needed no re-pointing; `return ep` (C is void) kept as a named JS extension the mklev lua/des handlers depend on.

## C ↔ JS fidelity

Branch-by-branch vs C `:407–457`: smem `Strlen+1` ✓ (`String(text ?? '')` coerces null — safe extension of NONNULLARG3, reasonable); pristine sizing/max ✓; replace-at via null-no-op `del_engr` ✓; newengr/memset/prepend/coords ✓ (arena named); three text slots defaulting to `s` with pristine overwrite iff `havepristine` ≡ C's loop-then-conditional ✓; Elbereth `in_mklev → guardobjects` / else `exercise(A_WIS)` ✓; `engr_time`/`engr_type`/`engr_szeach`/`engr_alloc` in C order ✓; eread/erevealed left 0 per the `:455–456` caller comment ✓. RNG call-for-call: single `rnd(N_ENGRAVE − 1)` at the C position; the old `rnd(HEADSTONE − 1)` was numerically identical (both 6) with the wrong name — now the name matches C too. `e_time || 0` is outcome-identical for numeric longs.

## Hallucinations / overclaim

None. The D-log frames the verify as a coverage gap (0-blocked) honestly and names both omits (arena, `return ep`) in the map section, not Must-fix.

## Cited evidence

C (`nethack-c/upstream/src/engrave.c:407–457`, via `node scripts/csym.mjs make_engr_at` — 9 refs: 8 call sites + `extern.h:1016` decl with `NONNULLARG3`):

```c
    unsigned smem = Strlen(s) + 1;
    boolean havepristine = FALSE;
    if (pristine_s != NULL) {
        unsigned prmem = Strlen(pristine_s) + 1;
        if (prmem > smem)
            smem = prmem;
        havepristine = TRUE;
    }
    if ((ep = engr_at(x, y)) != 0)
        del_engr(ep);
    ep = newengr(smem * 3);
    (void) memset((genericptr_t) ep, 0, (smem * 3) + sizeof (struct engr));
    ...
    for(i = 0; i < text_states; ++i)
        Strcpy(ep->engr_txt[i], s);
    if (havepristine)
        Strcpy(ep->engr_txt[pristine_text], pristine_s);
    if (!strcmp(s, "Elbereth")) {
        if (gi.in_mklev)
            ep->guardobjects = 1;
        else
            exercise(A_WIS, TRUE);
    }
    ep->engr_time = e_time;
    ep->engr_type = (xint8) ((e_type > 0) ? e_type : rnd(N_ENGRAVE - 1));
    ep->engr_szeach = smem;
    ep->engr_alloc = smem * 3;
    /* we do not set ep->eread or ep->erevealed;
     * the caller will need to if required */
```

Guard + constant checks (re-run here):

```text
make_engr_at     js/engrave.js:572   sync       # sym.mjs: single export, no clone #2
N_ENGRAVE = 6                        (js/const.js:1136 — ALREADY-edge; old HEADSTONE name was numerically identical but wrong)
export function del_engr(ep) {
    if (!ep) return;                 # js/engrave.js:156-157: null no-op ≡ C `!= 0` guard
```

RNG walk: the single `rnd(N_ENGRAVE − 1)` sits at the C `:452` position; no other draws in either tree. `e_time || 0` is outcome-identical for numeric longs; `(e_type > 0) ? e_type : …` matches C's gate before the `(xint8)` cast (values are small; no truncation observable).

Verify output (re-run here):

```text
verify make_engr_at: baseline eb5f9f62~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke make_engr_at: no RNG-tagged reach; fixed smoke spread (24 run, 3.8s): 24 PASS, 0 regressed → REACH-OK
```

## Density

One 51-line C function, one file, ~43 insertions. Right-sized per §2b. The `hidden-corpus/scoreboard.json` hunk is a commit/at re-stamp only (2 lines), not a baseline rewrite.

## Verification

- D-log: `verify.mjs --fn make_engr_at` → PASS.
- Re-run here: `hidden-proxy.mjs verify make_engr_at --base eb5f9f62~1 --reach-all` → 0 blocked both trees (vacuous, honestly reported) + smoke 24 PASS, 0 regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration). Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
