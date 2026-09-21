# Review 1666 — 6f93ac06 — `u_init.c` skills_for_role C-order restart (D-2707)

Metadata: commit `6f93ac06`, D-2707, `js/u_init.js` only (+64/−16 in the hunk: 13-arm switch + throw default). Pops the head Open-coverage row (THIN: C 50 L / JS 16 L). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body restart of `skills_for_role` in C order + panic-as-throw default. Diff actually does both: Tourist-first if-chain → C-order assign+break switch, `return null` → loud throw. Promise matches deliverable.

## Inventory

Changed JS: file-local `skills_for_role` (`js/u_init.js:690`, C staticfn — correctly unexported; `sym.mjs` confirms one local, no export). No imports touched (same-file locals + `PM_*` already in scope). No deleted/re-pointed symbols.

## Callee closure

Required `sym.mjs` output pasted verbatim (no symbol deleted or re-pointed — body-only restart):

```text
skills_for_role  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/u_init.js:690
             => Do NOT write clone #2. Check pinned C; if C has one
                function, this is clone drift (map debt / Open row).
```

(The "CLONE" wording is the tool's generic label for any local; C has exactly one `skills_for_role` and this local is its port at the C-home module — correct placement, not drift.) Zero C callees — pure table select. All 13 `Skill_*` tables pre-existing live same-file. No STUB, no new edge, no `--can` needed.

## C ↔ JS fidelity

C locus: `skills_for_role` `u_init.c:1039–1090` (csym, 52 L — whole body read) + callers (csym `--callers`: decl `:30`, `:1096 restricted_spell_discipline`, `:1404 skill_init(skills_for_role())`). RNG: none either side. Arm walk, in C order: Archeologist→A, Barbarian→B, Cave Dweller→C, Healer→H, Knight→K, Monk→Mon, Cleric→P, Ranger→Ran, Rogue→R, Samurai→S, Tourist→T, Valkyrie→V, Wizard→W — all 13 present with C's exact (non-alphabetical) order including Monk-before-Cleric ✓. Default: C `panic("No skills found for role")` (noreturn) → JS `throw new Error('No skills found for role')`, matching the repo panic-as-throw precedent; C's trailing `break` correctly omitted as unreachable ✓. Callers: `:1096` → `restricted_spell_discipline` (`js/u_init.js:749`, `if (!skills)` guard mirrors C's `while (skills && …)` — verified in-tree); `:1404` → `u_init_skills_discoveries` path (unchanged, pre-existing). No C caller left unwired; none invented.

## Hallucinations / overclaim

None. D-log states the `Role_switch` ≡ `game.urole.mnum` equivalence and both caller sites with lines.

## Density

Breadth phase: one 52 L pure-table C function, one module, zero callees. Right-sized (C is that small; the whole body shipped).

## Verification

Re-measured per-SHA re-run (`--base 6f93ac06~1 --reach-all`):

```text
verify skills_for_role: baseline 6f93ac06~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify skills_for_role: no corpus session is blocked on it at 6f93ac06~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke skills_for_role: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, no REGRESSED — as disclosed. Diff grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
