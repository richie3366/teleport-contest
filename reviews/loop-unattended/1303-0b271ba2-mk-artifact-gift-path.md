# Review 1303 — 0b271ba2 — artifact.c mk_artifact gift path + gates + gen_spe (D-2337)

Metadata: SHA `0b271ba2`, D-2337, C-fidelity residual (queue row cited 0 blocks). Method: `git show` full `js/` hunks (artifact.js +144/−63 reapportion, generated data, 1-word exports in makemon.js/weapon.js) + extractor diff; C `mk_artifact artifact.c:171-309` full body + `dispose_of_orig_obj :312-319` + `race_hostile mondata.h:118` (macro) + `P_BASIC/P_SKILLED skills.h:95-96` + A() macro (`artilist.h:9-10`, gs=arg12/gv=arg13) + Mjollnir row; `sym.mjs` on all 8 new callees; `imports.mjs --can` ×4 + `--rulecheck`; JS `oname`/`mksobj` artif-gate bodies read; added-lines banned grep (rn2 hits only — the C draws); `hidden-proxy verify mk_artifact --base 0b271ba2~1` re-run.

## Intent vs deliverable

Subject promises the by_align gift path, the shared gift_value gate, gen_spe data end-to-end, and the permapoisoned tail. Diff delivers all four + `dispose_of_orig_obj` + stray-dispose + extractor/data regeneration. Caller wiring (`bestow_artifact`) explicitly named as its own row. Promise kept exactly.

## Inventory

- `mk_artifact` full rewrite of the gather/select/christen flow; `dispose_of_orig_obj` local (≡ C `:312-319`, verified verbatim).
- Extractor parses A() args[12]/args[13] → genSpe/giftValue; 34 data rows gain fields; `artifacts_globals_init` maps them.
- 1-word exports: `race_hostile` (makemon.js), `P_MAX_SKILL` (weapon.js). New names into artifact.js: `mksobj`/`obj_extract_self`, `oname`, `obfree`, `race_hostile`, `mons`, `P_MAX_SKILL`, `P_SKILLED`/`P_BASIC`.

## C ↔ JS fidelity

Gather loop vs `:188-245`: exists-skip, SPFX_NOGEN|unique, gift_value-vs-role gate (shared, both paths — JS places it before the by_align split exactly like C) ✓; A_NONE otyp match + `continue` ✓; by_align alignment+race gate with role first-choice break ✓; skill default P_SKILLED, WEAPON_CLASS → `P_MAX_SKILL(|oc_skill|)` ✓; short-circuit RNG order (`!rn2(3)` unaligned / `!rn2(4)` / skilled / basic+`rn2(2)`) char-for-char ✓; fallback `if (!n)` guard + `!n → n=altn` resort ✓ (split arrays proved equivalent to the shared-array overwrite: fallback writes only fire while n==0, main overwrites from index 0 — same final pool both sides). `pool[rn2(n)]` pick ✓.

Christen vs `:255-290`: by_align `mksobj(a.otyp,TRUE,FALSE)` + stray-dispose ✓; oeroded clear BEFORE `oname` (C order) ✓; `oname(otmp,name,0)` subsumes the old manual `artifact_exists` (JS `oname` calls `artifact_exists(obj,n,true,oflgs)` internally at the same flags; pre-checks agree with the loop's exists-skip on the fresh OBJ_FREE obj; shop/wield side arms dead there, C's own arms on the A_NONE path) ✓; `oartifact=m`, `artifact_origin(RANDOM)`, clamped gen_spe (`[-10,10)`) ✓; `!otmp` A_NONE falls through to NULL return like C (old early-return removed, no behavior change) ✓; stray-dispose + permapoisoned tail ✓.

Callee closure: `mksobj`/`obj_extract_self`/`oname`/`obfree`/`race_hostile`/`P_MAX_SKILL`/`permapoisoned` all LIVE sync; `Role_if` pre-existing file-local clone (21-file convention, untouched). `race_hostile` body ≡ C macro (`mflags2 & hatemask`, zero-mask safe both sides). P_BASIC=2/P_SKILLED=3 ≡ C. No recursion: artif=FALSE skips both `mk_artifact` call sites (`mkobj.js:1598/1787` gates read). All four import edges ALREADY (message's "SAFE" for mkobj consistent — ALREADY implies it).

Data: macro positions confirm gs=12/gv=13/cost=14; Mjollnir end-to-end (`0, 8, 4000L` → genSpe 0/giftValue 8/cost 4000) ✓; Sting gs=3 present.

Cited C gather loop (`artifact.c:188-247`, via `csym.mjs mk_artifact` — the heart of this port):

```c
n = altn = 0;    /* no candidates found yet */
eligible[0] = 0; /* lint suppression */
for (m = 1, a = &artilist[m]; a->otyp; a++, m++) {
    if (artiexist[m].exists) continue;
    if ((a->spfx & SPFX_NOGEN) || unique) continue;
    if (a->gift_value > max_giftvalue && !Role_if(a->role)) continue;
    if (!by_align) {
        if (a->otyp == o_typ) eligible[n++] = m;
        continue;
    }
    if ((a->alignment == alignment || a->alignment == A_NONE)
        && (a->race == NON_PM || !race_hostile(&mons[a->race]))) {
        if (Role_if(a->role)) { eligible[0] = m; n = 1; break; }
        skill_compatibility = P_SKILLED;
        if (objects[a->otyp].oc_class == WEAPON_CLASS) {
            schar skill = objects[a->otyp].oc_skill;
            skill_compatibility = P_MAX_SKILL(skill < 0 ? -skill : skill);
        }
        if ((a->alignment != A_NONE || u.ugifts > 0 || !rn2(3)) &&
            (!rn2(4) || skill_compatibility >= P_SKILLED ||
             (skill_compatibility >= P_BASIC && rn2(2)))) {
            eligible[n++] = m;
        } else if (!n) {
            eligible[altn++] = m;
        }
    }
}
if (!n) n = altn;
```

JS equivalence notes beyond the summary: `for (m = 1; ...; m++)` with `if (!a || !a.otyp) break` ≡ C's index-1 start + otyp-terminator ✓; `ax[m]?.exists` ✓; `o_typ`/`unique` formulas char-for-char (incl. `!by_align && !!otmp` in unique) ✓; the removed `if (!otmp) return otmp` early-exit is behaviorally absorbed (o_typ=0 matches no artifact since the loop breaks on the otyp-0 terminator; n=0 → else-branch no-op for !by_align → permapoisoned guard → return NULL, exactly C) ✓; `eligible[n++] = m` indexing (not push) preserves C slot semantics for the role-break overwrite ✓.

Christen order vs `:276-281` (`oeroded` clear → `oname` → `oartifact` → `artifact_origin`) verified line-for-line in the diff ✓. JS `oname` body re-read (`do_name.js:1212-1256`): length clamp, oartifact/exist_artifact refusal (agrees with the loop skip on fresh objects), `new_oname` + `artifact_exists(obj,n,true,oflgs)` at oflgs=0 (subsumes the deleted explicit call at identical flags), uwep/uswapwep/unpaid side arms (C's own — dead on fresh OBJ_FREE gifts, live-but-identical on A_NONE) ✓. A() macro verified at `artilist.h:9-10` (`gs, gv, cost, clr, bn` trailing, all four `#define` variants identical) so extractor args[12]/[13] are unambiguous; pre-existing role/race mapping (args[10]/[11]) untouched and correct (Mjollnir PM_VALKYRIE) ✓.

Recursion gates re-read (`mkobj.js:1598`, `:1787`): both `mk_artifact(otmp)` calls sit under `if (artif && !rn2(...))`; the gift path passes artif=FALSE → unreachable ✓. `mons` import (monsters.js) feeds `race_hostile(mons(a.race))` with the `a.race === NON_PM` short-circuit first, exactly C ✓.

## Hallucinations / overclaim

None. "Provably equivalent" oname claim verified against the `oname` body. "No recursion" verified at the cited gates. Probe caveats disclosed as probe-side, not code.

## Density

+153/−63 across a 139-line C body + extractor + data regen, one falsifier. Dense but single-locus — acceptable.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7/full 44/44, verify after last `js/` edit). Re-measured:

```text
verify mk_artifact: baseline 0b271ba2~1 (scoreboard at 0e191fab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: RNG draws only, 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
