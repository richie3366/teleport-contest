# Review 1827 — 3ff465fee — engulfer_digests_food (D-2868)

- SHA: `3ff465fee` (coverage; `do.c` `engulfer_digests_food`)
- Files: `js/do.js` (+87/−14)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the swallow meal: corpse, glob, or special meat, then one effect and `delobj`. The diff adds the export and calls it from `dropz` before `mpickobj`. `Tobjnam` is the `objnam.js` export (`do.js` is not among the six remaining local clones). `sym.mjs`:

```
engulfer_digests_food  (export; see do.js:2444)
digests          js/mhitu.js:1093   sync
touch_petrifies  js/monsters.js:453   sync
polyfood         js/eat.js:415   sync
Tobjnam          js/objnam.js:1816   sync
newcham          js/makemon.js:1981   sync
minstapetrify    js/trap.js:3566   ASYNC
grow_up          js/mhitm.js:3915   ASYNC
healmon          js/mon.js:2315   sync
mcureblindness   js/muse.js:1800   ASYNC
delobj           js/mkobj.js:3714   sync
```

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `engulfer_digests_food` | export `do.js:2444` | `do.c:846–888` |
| `digests` | import | `mondata.h:71` via `dmgtype_fromattack` (`mondata.c:698–708`) |
| `polyfood` | import | `obj.h:321–324`; `pm_to_cham` is `M2_SHAPESHIFTER` (`mon.c:534–546`) |
| `touch_petrifies` | import | `mondata.h:200–201` by mndx |
| effect callees | imports, awaited when async | `newcham` treats `0` as no `mdat` (`makemon.js:2019`) |

## C ↔ JS fidelity

`csym` body is `do.c:846–888`. Callers: `do.c:823` inside `dropz`. `:14` is the static declaration.

The gate is `digests(ustuck->data)` and corpse, `globby`, meatball, enormous meatball, meat ring, or meat stick. Other food returns false. On a corpse the flags are set in order: `touch_petrifies`, `polyfood`, wraith, nurse. A green-slime glob sets `could_slime` only. Then one `pline` of `Tobjnam(obj, "are")` plus " instantly digested!". The effect is one arm: poly or slime (`newcham` with green slime and `NC_SHOW_MSG`, or a null species and `NO_NC_FLAGS`), else petrify, else `grow_up(ustuck, null)`, else `healmon(ustuck, mhpmax, 0)` and `mcureblindness(ustuck, false)`. `delobj` always runs and the function returns true.

`dropz` (`do.c:816–825`, `do.js:2399–2411`) on swallow skips `uball`, charges unpaid via `stolen_value`, then digest or `mpickobj`, then `encumber_msg`. It does not `newsym`. `Blind && Levitation` `map_object` (`do.c:838–839`) stays a named omission on the floor arm.

## Hallucinations / overclaim

The subject calls the callees live. They are the imports above, not stubs in this arm. `polyfood` matches `pm_to_cham`'s shapeshifter test. No RNG is drawn in this function itself; `newcham` draws only when the species pointer is null, which is the poly arm.

## Density

The whole static function and the one `dropz` call. 87 insertions. The floor-arm `map_object` omission is named, not sold as this function.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify engulfer_digests_food --base 3ff465fee~1 --reach-all`. `do.js` is not edited by a later SHA in this window.

```
verify engulfer_digests_food: baseline 3ff465fee~1 (scoreboard at 8fbf942b1) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke engulfer_digests_food: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
