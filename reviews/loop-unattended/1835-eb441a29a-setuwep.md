# Review 1835 — eb441a29a — setuwep (D-2876)

- SHA: `eb441a29a` (coverage; `wield.c` `setuwep`)
- Files: `js/wield.js` (+138/−), plus await wrappers in `ball.js`, `do.js`, `do_wear.js`, `dothrow.js`, `hack.js`, `lock.js`, `pickup.js`, `zap.js`. 181 `js/` insertions.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `setuwep`: same object returns before `unweapon` changes; `setworn(W_WEP)`; Ogresmasher sets `disp.botl` before any message; a still-lit light-artifact `end_burn`s and, unless blind, prints the stop-shining line; Ogresmasher is marked again; then `unweapon`. The shine line is the only await. The diff does that and updates the callers in those eight other files. `sym.mjs`:

```
setuwep      js/wield.js:346   sync
artifact_light js/timeout.js:1482   sync
end_burn     js/timeout.js:1704   sync
Tobjnam      js/objnam.js:1811   sync
             ALSO local js/wield.js:394 (and five other files)
u_wield_art  js/artifact.js:820   sync
is_art       js/artifact.js:2444   sync
```

`imports.mjs --can wield.js timeout.js artifact_light` → `IN-SCC`, `artifact_light` is a hoisted function, `VERDICT: SAFE` for a static import. The dynamic `import('./timeout.js')` is not required to avoid a TDZ. It is how the non-shine path stays synchronous.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `setuwep` | export `wield.js:346` | `wield.c:99–135` |
| `setuwep_after_shine` | local tail | `:120–134` |
| `olduwep_still_shining` | local gate | `artifact_light && lamplit` |
| `artifact_light` / `end_burn` | dynamic import, real functions | `artifact.c:2263–2275`; `end_burn` |
| shine `Tobjnam` | import `objnam.js:1811` | `objnam.c` `Tobjnam` |
| `u_wield_art` / `is_art` | imports | second Ogresmasher test |

## C ↔ JS fidelity

`csym` body is `wield.c:99–135`. `obj == uwep` returns immediately. `setworn(obj, W_WEP)` is next. The first botl test is `uwep == obj` and either object's `oartifact == ART_OGRESMASHER`. JS uses that raw compare and sets both `flags.botl` and `disp.botl` (`mark_disp_botl`).

The shine test is `uwep == obj && artifact_light(olduwep) && olduwep->lamplit`, then `end_burn(olduwep, FALSE)`, then `if (!Blind) pline("%s shining.", Tobjnam(olduwep, "stop"))`. `artifact_light` (`artifact.c:2263–2275`) is worn gold dragon scale mail or scales, or Sunsword. `timeout.js:1482` is that predicate; `is_art` is `oartifact === art`, so the C `get_artifact != NONARTIFACT` conjunct is already implied. The pre-check `olduwep_still_shining` adds `lamplit`, which is the caller's second conjunct, so a dark weapon stays on the synchronous path. The promise re-checks `artifact_light` and `lamplit`, calls `end_burn`, and uses the imported `Tobjnam`. `Blind_w` is `(HBlinded || EBlinded) && !BBlinded`, plus `u.Blind` / `u.ublind`. `finally` then runs the second botl (`u_wield_art(ART_OGRESMASHER) || is_art(olduwep, ART_OGRESMASHER)`) and `unweapon` (launcher, ammo, missile, pole except Snickersnee while not mounted, weptool, wet towel; null object forces true). No RNG.

Callers that can pass a previous `uwep` use `if (p) await p` (`ball`, `do`, `do_wear`, `dothrow`, `hack`, `lock` `useup_invent`, `pickup`, `zap` `poly_obj`, and the `wield.js` sites). `save.js` `restWornFromInvent` and `u_init.js` call `setuwep` without awaiting. Both run it with the old slot already null (`u.uwep = null` before the restore call; birth wield requires `!uwep`), so `olduwep_still_shining` is false and `unweapon` is set before return. `uhitm.c:1103` (`hmon_hitmon_potion`) is the named caller that still does not call this function.

## Hallucinations / overclaim

The subject says a static cycle forces the dynamic import. `--can` says a static import of `artifact_light` is hoisted and safe. The shine line does use the imported `Tobjnam`, not the local clone at `wield.js:394`. That clone is still what `uwepgone` prints before it clears `lamplit` and calls `setuwep`. `begin_burn` is not in this function in C either.

## Density

One 37-line function and the callers that had to await the new return. 181 insertions. The potion caller is named, not a stub inside `setuwep`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify setuwep --base eb441a29a~1 --reach-all`.

```
verify setuwep: baseline eb441a29a~1 (scoreboard at 048c1316e) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke setuwep: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's full 44/44 is the shared-file gate, not this smoke.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
