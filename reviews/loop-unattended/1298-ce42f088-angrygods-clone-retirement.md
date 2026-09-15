# Review 1298 — ce42f088 — pray.c angrygods relearn-drain + poly-creature + hcolor clone retirement (D-2332)

Metadata: SHA `ce42f088`, D-2332, C-fidelity residual (queue row cited 0 blocks). Method: `git show` full `js/` hunk (`js/pray.js` +9/−41); C `angrygods pray.c:703-784` full body + `losexp exper.c:206-291` body + `hcolor do_name.c:1460-1466` body + angrygods callers (via `csym.mjs` + `--callers`); `sym.mjs` on `losexp_divine` (deleted clone — pasted below), `hcolor`, `losexp`; `imports.mjs --can` ×2 + `--rulecheck`; added-lines banned-pattern grep (0 hits); `hidden-proxy verify angrygods --base ce42f088~1` re-run.

## Intent vs deliverable

Subject promises three fixes inside `angrygods`: relearn-drain via live `losexp`, poly-aware mortal/creature noun, canonical Hallu-aware `hcolor`. Diff delivers all three plus deletion of both local clones. No "high-anger" arms were missing (C `rn2(maxanger)`, maxanger clamped 1–15, lands on cases 0–8/default — re-verified in the printed body). Promise kept exactly.

## Inventory

- Import joins only: `losexp` (exper.js), `hcolor` (do_name.js) — both ALREADY edges, no new module edge.
- Deleted 29-line `losexp_divine` clone (sole caller was case 2/3); case 2/3 now `await losexp(null)`.
- Deleted Hallu-blind local `hcolor`; all 5 use sites (`:497/:816/:1255/:1623/:2022`) resolve to the canonical export unchanged.
- `mortal` follows C: `(mlet || 'S_HUMAN') === 'S_HUMAN'`.
- Docstring omits retire to SetVoid pitch only.

Required sym paste (deleted clones → imports):

```text
losexp_divine    NOT FOUND in js/** (no export, no local function/const).
hcolor           js/do_name.js:327   sync (4 other local clones remain in detect/do/sit/wield — untouched, out of scope)
losexp           js/exper.js:312   ASYNC — await required (awaited at the call site)
```

## C ↔ JS fidelity

Case 2/3 vs C `:740-751`: godvoice → pline mortal/creature (`gy.youmonst.data->mlet == S_HUMAN`, `:745`) → SetVoice → verbalize relearn → `adjattrib(A_WIS,-1,FALSE)` → `losexp((char *)0)` (`:750`) ✓ branch order exact. The old clone dropped `adjabil`, the "Goodbye level N." pline, `resists_drli` gate, `uexp = newuexp-1` reset, Upolyd mh path, and the L1 `uexp=0` shape differed (clone set ulevel-stays but skipped adjabil/livelog text); live `losexp` (D-1894) carries all of them. Strict upgrade, no behavior invented.

Cases 7/8 vs C `:767-778`: same mlet predicate (`:775`) — the single `mortal` const serves both sites, matching C using the identical expression twice ✓.

Case 4/5 vs C `:760-765`: `An(hcolor(NH_BLACK))` (`:763`) — canonical `hcolor` ≡ C verbatim (`Hallucination || !colorpref → hcolors[display-rng]`, else pref; `do_name.c:1460-1466`). Sober identity holds on every pray.js site: all pass non-empty literals (`'amber'`/`'black'`), where clone (`|| 'odd'`) and canonical agree; the `''`-pref divergence class has no site. Hallu now draws the display stream like C (positional RNG untouched — display draws are not positional). ✓

`mlet` representation: JS mlets are `'S_*'` strings throughout (`mon.js`/`makemon.js` convention); unset-slot-reads-human matches C (`youmonst.data` never NULL in play). ✓

## Hallucinations / overclaim

None. "Sober output identical" is checked true (all 5 sites pass non-empty literals). "C has no shieldeff anywhere in this function" verified — the printed `:703-784` body contains none. No-probe disclosure honest (0 blocks, no --base owed); probe kept in /tmp.

## Density

+9/−41 in one file, one C function, one falsifier. Dense.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7, final verify after last `js/` edit — no D-1831 gap). Re-measured:

```text
verify angrygods: baseline ce42f088~1 (scoreboard at 0e191fab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean (full-tree re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
