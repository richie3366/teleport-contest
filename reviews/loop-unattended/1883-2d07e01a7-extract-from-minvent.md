# Review 1883 — 2d07e01a7 — extract_from_minvent (D-2924)

- SHA: `2d07e01a7` (coverage; `worn.c` `extract_from_minvent`)
- Files: `js/worn.js` (`extract_from_minvent`), `js/mkobj.js` (export `place_object_no_longer_held`, body unchanged). Callers re-await the returned thenable in `js/dogmove.js`, `js/mhitm.js`, `js/mon.js`, `js/monmove.js`, `js/muse.js`, `js/pickup.js`, `js/trap.js`, `js/uhitm.js`, `js/zap.js`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (re-point: `W_WEP` no longer assigns `mw` / `NEED_WEAPON` inline; it returns `mwepgone`. Held-core is the existing sync clone, not a second `obj_no_longer_held`):

```
extract_from_minvent js/worn.js:669   sync
mwepgone         js/weapon.js:124   sync
place_object_no_longer_held js/mkobj.js:2644   sync
obj_no_longer_held js/do.js:709   ASYNC — await required
setmnotwielded   js/weapon.js:105   sync
update_mon_extrinsics js/worn.js:739   sync
check_gear_next_turn js/worn.js:635   sync
end_burn         js/timeout.js:1773   sync
artifact_light   js/timeout.js:1546   sync
impossible       js/display.js:8117   ASYNC — await required
```

`imports.mjs --can js/worn.js js/mkobj.js place_object_no_longer_held` → `ALREADY`. `--can js/worn.js js/weapon.js mwepgone` → `ALREADY`. `--can js/dogmove.js js/worn.js extract_from_minvent` → `ALREADY`. The async `do.js` `obj_no_longer_held` is not imported.

## Intent vs deliverable

Subject promises one exported `extract_from_minvent` in C order: mismatch `impossible`, gold-DSM `end_burn` while `W_ARM` is still set, extract, extrinsics, `obj_no_longer_held`, then `mwepgone`. The diff does that. It also awaits the returned thenable at the async call sites that already called the export. No RNG in this function; the crysknife `rn2(10)` lives in the held-core clone.

## Inventory

| JS | Class | C |
|----|-------|---|
| `extract_from_minvent` | live sync `worn.js:669` | `worn.c:1376–1417` |
| `place_object_no_longer_held` | verified clone `mkobj.js:2644` | `do.c:891–920` `obj_no_longer_held` |
| `obj_no_longer_held` | live async `do.js:709`, not called here | same function |
| `mwepgone` | live `weapon.js:124` | `weapon.c:937–946` |
| `setmnotwielded` | live `weapon.js:105` | `weapon.c:1813–1828` |
| `update_mon_extrinsics` | live sync | `worn.c` callee |
| `check_gear_next_turn` | live sync | `worn.c:1411` |
| `end_burn` / `artifact_light` | live sync | gold-DSM gate |
| `impossible` | live async | mismatch arm |

## C ↔ JS fidelity

`worn.c:1391–1394`: `where != OBJ_MINVENT` → `impossible` and return. JS does that, and also accepts the port string `'MINVENT'` that `obj_extract_self` already treats as minvent (`mkobj.js:3617`). A null `mon` or `obj` returns first. C would not. Named.

`worn.c:1397–1403`: if `W_ARM` and `lamplit` and `artifact_light`, `end_burn(obj, FALSE)` before `owornmask = 0`. Then `obj_extract_self`. JS matches. `artifact_light` (`artifact.c:2263–2275`) needs `W_ARM` for gold DSM and does not for Sunsword, so the suit snuff must run before the clear. It does.

`worn.c:1404–1411`: if the saved mask is nonzero, `!DEADMONSTER` (`monst.h:214`, `mhp < 1`) and `do_extrinsics` call `update_mon_extrinsics(mon, obj, FALSE, silently)`, then `misc_worn_check &= ~unwornmask`, then `check_gear_next_turn`. JS matches. Both callees are sync.

`worn.c:1413`: `obj_no_longer_held`. JS calls the D-2734 clone. `do.c:895–919`: null return; `Has_contents` walks `cobj`; `CRYSKNIFE` reverts when `!oerodeproof || !rn2(10)`; `!mon_moving && !gameover` calls `costly_alteration(COST_DEGRD)` before `otyp = WORM_TOOTH`. The clone (`mkobj.js:2644–2661`) is that order. `costly_alteration` is `void`ed, not awaited. Named. A normal crysknife draws no `rn2`. A fixed one draws one.

`worn.c:1414–1416`: if `W_WEP`, `mwepgone`. `weapon.c:937–946` reads `MON_WEP`, then `setmnotwielded` and `NEED_WEAPON`. JS returns that call. `setmnotwielded` still sees Sunsword light after the mask clear (`artifact_light` does not require `W_WEP`). The stop-shining `pline` is the thenable. Async callers in this diff await it. `m_lose_armor` (`worn.js:439`), `m_useup` (`mthrowu.js:183`), and `discard_minvent` (`mon.js:3628`) do not. Named. `end_burn` inside `setmnotwielded` runs before that `pline`.

C callers are wired: `mkobj.c:2531`, `mon.c:3316`, `monmove.c:442`, `mthrowu.c:1156`, `muse.c:884`, `pickup.c:2460`, `steal.c:825` (both `mon.js` and the pet clone), `steal.c:866`, `trap.c:330`, `trap.c:2503`, `uhitm.c:2239`, `uhitm.c:4717`, `worn.c:1045`, `zap.c:4745`. `steal.c:843` is a comment. `leppie_stash` still inlines the extract that C reaches through `mdrop_obj`; this SHA only awaits the thenable there.

## Hallucinations / overclaim

The subject says no arm of `extract_from_minvent` is omitted. The mismatch, gold-DSM, extrinsics, held, and `W_WEP` arms are present. `mwepgone` is the live export, not an inlined `mw = null`. The held path is a clone of `obj_no_longer_held`, not a stub, and the async export is deliberately not called. Local `m_useup` clones that still unlink are named and are not this function's body.

## Density

The coverage row asked for the whole function. Every arm shipped. Callers that already invoked the export now await a light or `impossible` thenable. No stub arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify extract_from_minvent --base 2d07e01a7~1 --reach-all`.

```
verify extract_from_minvent: baseline 2d07e01a7~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify extract_from_minvent: no corpus session is blocked on it at 2d07e01a7~1 — a vacuous verify is NOT a corpus PASS. …
smoke extract_from_minvent: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (eleven `js/` files).

## Actionable C-wrongs

None. A minvent extract snuffs lit gold DSM, reverts a crysknife through the sync held-core, and unwields through `mwepgone`.

Verdict: **ACCEPT**
