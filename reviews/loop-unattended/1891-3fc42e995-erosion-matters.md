# Review 1891 — 3fc42e995 — erosion_matters (D-2932)

- SHA: `3fc42e995` (coverage; `objnam.c` `erosion_matters`, same-file `ansimpleoname`, wish erosion, eyewear `has_head`)
- Files: `js/mkobj.js` (`erosion_matters` switches on `obj.oclass`; local `is_weptool` deleted). `js/read.js` deletes `erosion_matters_obj` and calls the export. `js/readobjnam.js` applies wished erosion only when the type can erode. `js/objnam.js` remaps the fake Amulet. `js/do_wear.js` refuses eyewear with no head.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (the `mkobj.js` name-list `is_weptool` and the `read.js` clone are gone; the call is the `wield.js` export):

```
erosion_matters  js/mkobj.js:818   sync
is_weptool       js/wield.js:112   sync
             !! ALSO 7 LOCAL CLONE(S) in 7 files — IMPORT the export; do NOT add another
               js/dothrow.js:377  js/iactions.js:447  js/lock.js:1665  js/objnam.js:337  js/u_init.js:1252  js/worn.js:284  …and 1 more
ansimpleoname    js/objnam.js:2878   sync
has_head         js/monsters.js:367   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files
               js/shk.js:4696
```

`imports.mjs --can js/mkobj.js js/wield.js is_weptool` → `ALREADY`. `--can js/read.js js/mkobj.js erosion_matters` → `ALREADY`. `--can js/readobjnam.js js/mkobj.js erosion_matters` → `ALREADY`. This SHA did not add an eighth `is_weptool`.

## Intent vs deliverable

Subject promises `erosion_matters` switches on `obj.oclass`, tools go through `is_weptool`, wishes store `eroded` / `eroded2` / `erodeproof` only when erosion matters, the fake Amulet is compared as the real one, and a headless hero cannot wear lenses. The diff is that. No RNG in `erosion_matters`. The proof bit uses `Luck` and wizard mode, which is the wish arm, not this predicate.

## Inventory

| JS | Class | C |
|----|-------|---|
| `erosion_matters` | live sync `mkobj.js:818` | `objnam.c:1194–1215` |
| `is_weptool` | live `wield.js:112` | `obj.h:249–250` |
| `readobjnam_finish` wish block | `readobjnam.js:1928` | `objnam.c:5270–5288` |
| `seffect_enchant_weapon` | `read.js:1122` | `read.c:1640` |
| `ansimpleoname` | live `objnam.js:2878` | `objnam.c:2445–2470` |
| `accessory_or_armor_on` eyewear | `do_wear.js:3260` | `do_wear.c:2324–2327` |
| `has_head` | live `monsters.js:367` | `mondata.h:55` |

## C ↔ JS fidelity

`objnam.c:1197–1214`: switch on `obj->oclass`. `TOOL_CLASS` returns `is_weptool(obj) ? TRUE : FALSE`. `WEAPON_CLASS`, `ARMOR_CLASS`, `BALL_CLASS`, and `CHAIN_CLASS` return true. Default breaks and returns false. JS matches. The poly comment is in C and is not a branch. A null object throws on `obj.oclass`. C would dereference. Named.

`obj.h:249–250`: `oclass == TOOL_CLASS && objects[otyp].oc_skill != P_NONE`. `wield.js:112–118` returns true when `oc_skill` is present and not `P_NONE`. If the skill is missing or `P_NONE`, it still returns true for five type names. Named. Those five are weptools when the table has a skill, so the name list is the missing-skill path. The deleted `mkobj.js` helper used only the names and ignored ball and chain. It is gone.

Callers of the export: `do_wear.c:3299` → `do_wear.js:4072`. `invent.c:4432` merge → `mkobj.js:2848`. `mkobj.c:183` → `mkobj.js:842`. `objnam.c:5271` → `readobjnam.js:1928`. `read.c:1640` → `read.js:1122`. `trap.c:249` → `trap.js:4451`. `zap.c:1789` → `zap.js:5152`. `extern.h:2222` only declares it. `objclass.h:203` is a comment.

`objnam.c:5271–5287`: if erosion matters, clear both erosion fields. `oeroded = d.eroded` when flammable, rustprone, or crackable. `oeroded2 = d.eroded2` when corrodeable or rottable. If `erodeproof` and (`is_damageable` or `CRYSKNIFE`), `oerodeproof = (Luck >= 0 || wizard)`. JS is that order. A type that does not erode keeps what `mksobj` stored. `seffect_enchant_weapon` now uses the export, so an iron ball, an iron chain, and a weptool enter the confused proof arm. The `Yobjnam2` / `hcolor` wording and `costly_alteration` on a proof strip stay deferred. Named.

`objnam.c:2454–2469`: if `otyp` is `FAKE_AMULET_OF_YENDOR`, compare as `AMULET_OF_YENDOR`. If that type is unique and `simpleonames` equals `OBJ_NAME`, return `the`. Else if `quan == 1`, return `an`. Else return the plural bare. JS matches. `the` / `an` return a new string, so there is no `Strcpy` back and no `releaseobuf`. A null object returns `"an object"`. Named. `invent.c:2190` (`safeq_shortxprname`) has no JS symbol. `invent.c:5425` stays the named `safe_qbuf` overflow. Both are named. The other C calls already use this export (`do_wear.c:2325` is the new eyewear line).

`do_wear.c:2324–2327`: if `!has_head(youmonst.data)`, `You("have no head to wear %s on.", ansimpleoname(obj))` and `ECMD_OK`. JS awaits that `You` and returns 0. A missing `youmonst.data` makes `has_head` true (`mflags1` reads 0), so eyewear is not refused. Named.

## Hallucinations / overclaim

The subject says no arm of `erosion_matters` or `ansimpleoname` is omitted. The tool, weapon, armor, ball, chain, and default arms are present. The fake-Amulet remap, `the`, and `an` arms are present. `is_weptool` is the live export, not the deleted name list. The five-name fallback inside that export is named and is not a second `erosion_matters`. The enchant-weapon message polish is outside this function.

## Density

The coverage row asked for `erosion_matters`. The whole switch shipped. The wish block, the enchant-weapon gate, and the same-file `ansimpleoname` fake-Amulet arm shipped with it. The eyewear `has_head` arm is the caller that needed the corrected name. No stub arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify erosion_matters --base 3fc42e995~1 --reach-all` and the same for `ansimpleoname`.

```
verify erosion_matters: baseline 3fc42e995~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify erosion_matters: no corpus session is blocked on it at 3fc42e995~1 — a vacuous verify is NOT a corpus PASS. …
smoke erosion_matters: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
verify ansimpleoname: … 0 session(s) blocked on it …
smoke ansimpleoname: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so both empty verifies are the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line (five `js/` files, full suite skipped).

## Actionable C-wrongs

None. Erosion follows `oclass`, a wish stores rust only on a type that can erode, and the fake Amulet takes `the`.

Verdict: **ACCEPT**
