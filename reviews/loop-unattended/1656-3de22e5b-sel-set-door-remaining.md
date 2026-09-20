# Review 1656 — 3de22e5b — `sp_lev.c` sel_set_door `:4659` orientation in remaining coord-form sites (D-2697)

Metadata: commit `3de22e5b`, D-2697, `js/mklev.js` only (+51/−1). Closes review 1654's Must-fix (stamped `**Addressed:** D-2697` on the 1654 file in this same commit). No prior review claimed closed otherwise.

## Intent vs deliverable

Subject promises: `:4659` orientation call in all remaining coord-form `des.door` sites. Diff actually adds 43 `set_door_orientation(...); // C sel_set_door :4659` one-liners plus an 8-line doc comment on the body. Count verified: 43 insertions in the diff. Promise matches deliverable.

## Inventory

Changed JS: 43 call sites, zero new functions, zero deleted/re-pointed symbols. Same-module local calls — no new import edge, no TDZ risk. `sym.mjs set_door_orientation` output: NOT EXPORTED, 1 local clone at `js/mklev.js:17013` — the pre-existing body review 1654 verified arm-for-arm; no clone #2 created.

## C ↔ JS fidelity

C locus: `sel_set_door` `sp_lev.c:4646–4662` (csym, 17 L, whole body read). Order is typ write → D_SECRET strip → `set_door_orientation(x, y)` (`:4659`) → doormask → SpLev_Map. Every sampled hunk shows the call inserted after the typ write and before `loc.doormask =`, i.e. C order. The JS typ-write line itself (`if (!IS_DOOR...) loc.typ = DOOR`, with the SDOOR/D_SECRET nuance owned by the pre-existing closures) is unchanged by this commit — orientation placement is the only claim here and it is correct.

Completeness (the 1654 miss): tree now holds 61 `set_door_orientation` mentions = 15 (D-2695) + 43 (here) + body doc/def + the `:1133` call inside `link_doors_rooms`. Arithmetic closes exactly. Wall-form exclusions hold: `create_door` has no orientation reference and `splev_room_door` wall-form sites stay unwired, matching C (wall-form never calls orientation). The D-log's per-file lua↔JS census is taken as the enumeration evidence; spot-checks (medusa-2 inline `:3867`, asmoDoor `mx1/my1` form, soko `xstart` form) show coord-form sites wired.

## Callee closure

Only one callee, `set_door_orientation`, invoked at all 43 new sites.
Required `sym.mjs` output (no symbol deleted or re-pointed, but the
closure must still resolve):

```text
set_door_orientation NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:17013
             => Do NOT write clone #2. Check pinned C; if C has one
                function, this is clone drift (map debt / Open row).
```

Classification: CLONE, verified — review 1654 walked the body arm-for-arm
against `sp_lev.c:1041–1085` (isok-gated wall/door/sdoor quads, DOORJOIN
fallback, `? 1 : 0` under `if (loc)`); this commit does not touch the body.
No STUB in any live arm; no OMIT needed. Combined-arm rule holds: every
site's only callee is a verified CLONE.

Site census re-checked in-tree (current `js/mklev.js`):

| Group | Count |
|---|---:|
| D-2695 closures (med/bar/wiz/me/pri/arcDoor) | 15 |
| D-2697 closures (kni/rog/sam/hea/tou/ran/mon/knox/barGoal/tw/astral/tn/castle/valley/asmo/orcus/wiz2/sanct/soko/tut1) + inline blocks | 43 |
| Body doc + def + `:1133` call inside `link_doors_rooms` | 3 |
| Total `set_door_orientation` mentions | 61 |

`grep -c` returns 61. Arithmetic shuts exactly — no site double-wired,
none missing from the D-log census.

## Hallucinations / overclaim

None. The D-log explicitly retracts the queue row's "tut2 inline sites" phrase (`tut-2.lua` has zero `des.door`) and names the `sel_set_door` remainder (SpLev_Map, D_SECRET promotion) as future work rather than claiming it.

## Density

Breadth phase: a Must-fix wiring iteration, one C call-site family, +51 lines in one module. Right-sized; Must-fix ships alone per §2b.

## Verification

Full verify transcript (both summary lines cited):

```text
verify set_door_orientation: baseline 3de22e5b~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify set_door_orientation: no corpus session is blocked on it at 3de22e5b~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke set_door_orientation: no RNG-tagged reach; fixed smoke spread (24 run, 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous (exactly as the D-log discloses) + REACH-OK, no
REGRESSED. D-log Verify bullet (44/44 full, green, cohort) accepted on
its face. Diff grep: no FORCE/DIAG/seed/fastforward; coordinate args are
C-order call arguments, not hardcoded trace values. Global
`imports.mjs --rulecheck`: clean (`Rule #2 clean: no bare/node
specifiers or fs calls in js/`).

Branch-order note: every hunk places the call between the typ write and
the doormask write, reproducing C's `sel_set_door` sequence (typ →
D_SECRET strip → `:4659` → doormask). The one inline site with a
`continue` guard (`val-strt:7561` form) and the `return`-guard closures
keep the call on the fall-through path only, matching C's unconditional
`:4659` after the typ write (C has no early return in `sel_set_door`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
