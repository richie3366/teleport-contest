# Review 1530 — e84600e8 — zap.c create_polymon (D-2571)

## Metadata

- SHA: `e84600e8`
- D-id: D-2571. Next index: 1530.
- Files: `js/zap.js` (+131/−~8: file-local `create_polymon`, 9 PM_* + 12 MAT_* consts, 2 import joins, bhitpile wire + JSDoc update).
- C locus: `nethack-c/upstream/src/zap.c:1545–1633` (`create_polymon`, 89 L; `csym.mjs` range). Sole C caller `bhitpile` `:2485` (`:2484–2485` gate).

## Intent vs deliverable

Subject promises: whole-body port (material→golem table, bhitpile wire) closing the review-1326 named omit, with the `mons[pm_index].cwt`-not-mdat subtlety kept. Diff delivers that. Promise matches deliverable.

## Inventory

- New: `create_polymon(obj, okind)` (file-local async, `js/zap.js:5549`; `sym.mjs` single local — correct, C is `staticfn`, `bhit_skiprange` precedent).
- Consts: 12 MAT_* values verified exact against `objclass.h:14–35` (FLESH 4 … MINERAL 21); 9 new PM_* golem/skeleton consts — all 12 names (incl. pre-existing CLAY/STONE/FLESH) confirmed present in `js/generated/monsters_data.js`.
- Import joins (ALREADY-edges, live): `a_monnam` (`js/do_name.js:1189` — the export, not a 5th clone), `G_GENOD` (`js/const.js:746`).
- Callees LIVE: `makemon` (null-mdat → random via `anymon`, C order), `polyuse` (async, awaited), `cansee`, `pline`, `rn2`, `rnd_class`-free path, `objects_at`. `recreate_pile`/`fill_pit` stay map-named with own rows (review 1326) — untouched.
- No deleted symbols.

## C ↔ JS fidelity

Arm-by-arm vs C `:1545–1633`: bypass-head walk ✓; single-object guard (`!nexthere && quan == 1`) ✓; full material switch in C order incl. lithic `rn2(2)` fork, `case 0`/FLESH organic, BONE→skeleton, default straw ✓; genocide gate (`mvflags & G_GENOD`, safe-nav extension) with `mdat` null → `makemon` random ✓; `polyuse(obj, okind, mons[pm_index].cwt)` — archetype weight, not the nulled mdat, exactly as C ✓; `cansee` → pline with the C format string as a template ✓. RNG call-for-call (lithic `rn2(2)` at its C position; capital `rnd(100)` untouched elsewhere). Wire: C `:2484–2485` `if (gp.poly_zapped >= 0)` → JS `if ((game._poly_zapped | 0) >= 0)`; the `| 0`-on-undefined hazard is closed because `bhitpile` sets `game._poly_zapped = -1` at entry (`js/zap.js:5673`, before the walk) and only the poly arm raises it (`:4898`, first-hit `?? -1` guard) ✓.

## Hallucinations / overclaim

None. The D-log frames the verify as a coverage gap with smoke REACH honestly and keeps the remaining tails named.

## Cited evidence

C tail (`zap.c:1622–1632`, via `csym.mjs` — the subtle half of the port):

```c
    if (!(svm.mvitals[pm_index].mvflags & G_GENOD))
        mdat = &mons[pm_index];

    mtmp = makemon(mdat, obj->ox, obj->oy, MM_NOMSG);
    polyuse(obj, okind, (int) mons[pm_index].cwt);

    if (mtmp && cansee(mtmp->mx, mtmp->my)) {
        pline("Some %sobjects meld, and %s arises from the pile!",
              material, a_monnam(mtmp));
    }
```

JS keeps the C subtlety: `polyuse(obj, okind, mons(pm_index)?.cwt | 0)` feeds the *archetype* weight even when `mdat` stayed null (genocided) — exactly C's `mons[pm_index].cwt`-not-`mdat`. The `!nexthere && quan == 1` lone-object refusal and the bypass-head walk are verbatim from `:1553–1565`.

Material + wire checks (re-run here):

```text
MAT_FLESH/PAPER/CLOTH/LEATHER/WOOD/BONE = 4/5/6/7/8/9; IRON/METAL/COPPER/SILVER/GOLD/PLATINUM/MITHRIL = 11–17; GLASS = 19
  (all exact vs objclass.h:14–35; GEMSTONE 20 / MINERAL 21 pre-existing)
12/12 PM_* golem/skeleton names present in js/generated/monsters_data.js (incl. pre-existing CLAY/STONE/FLESH)
create_polymon  file-local js/zap.js:5549   # sym.mjs single local — correct, C is staticfn
polyuse         js/zap.js:6864   ASYNC      # awaited at the call site
a_monnam        js/do_name.js:1189  sync    # the export joins the import — not a 5th clone
G_GENOD         js/const.js:746  (0x02)     # ALREADY-edge, live
game._poly_zapped = -1 at bhitpile entry (js/zap.js:5673), raised only by the poly arm (:4898, `?? -1` first-hit guard)
  → `if ((game._poly_zapped | 0) >= 0)` ≡ C `:2484–2485 gp.poly_zapped >= 0`; the `|0`-on-undefined hazard is closed
```

RNG walk: lithic-arm `rn2(2)` is the only draw in the body, at its C position; capital paths untouched.

Verify output (re-run here):

```text
verify create_polymon: baseline e84600e8~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke create_polymon: no RNG-tagged reach; fixed smoke spread (24 run, 5.8s): 24 PASS, 0 regressed → REACH-OK
```

## Density

One 89-line C function + tables + wire, one file, ~131 insertions. Right-sized per §2b. Scoreboard hunk is a commit/at re-stamp only.

## Verification

- D-log: `verify.mjs --fn create_polymon` → PASS.
- Re-run here: `hidden-proxy.mjs verify create_polymon --base e84600e8~1 --reach-all` → 0 blocked both trees (vacuous, honestly reported) + smoke 24 PASS, 0 regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration). Diff grep: 0 hits for FORCE/DIAG/getRngLog/fastforward/hardcoded.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
