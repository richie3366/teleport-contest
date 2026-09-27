# Review 1873 — e379902e8 — region_dialogue and end_burn (D-2914)

- SHA: `e379902e8` (coverage; `timeout.c` `region_dialogue`, same-file `end_burn`)
- Files: `js/timeout.js` (both bodies, `TIMEOUT_FLAT`, `nh_timeout`), `js/do_wear.js`, `js/end.js`, `js/worn.js` (callers)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck` (this tree): "Rule #2 clean: no bare/node specifiers or fs calls in js/." New calls use imports that were already there (`impossible`, `del_light_source`, `stop_timer`, `update_inventory`, `region_danger`).
- `sym.mjs`:

```
region_dialogue  NOT EXPORTED — 1 local js/timeout.js:812
end_burn         js/timeout.js:1772   sync
stop_timer       js/mkobj.js:1173   sync
del_light_source js/light.js:121   sync
update_inventory js/invent.js:4745   sync
artifact_light   js/timeout.js:1545   sync
region_danger    js/region.js:1203   sync
```

`region_dialogue` is `staticfn`. One local is that function.

## Intent vs deliverable

Subject promises `region_dialogue` in C order, called from `nh_timeout` before the generic decrement, both magical-breathing stores masked around `Breathless` and `region_danger`, `MAGICAL_BREATHING` on `TIMEOUT_FLAT`, and `end_burn` as the C body with fire-and-forget `impossible`. The diff does that and adds the `Armor_off` / `Armor_gone` / `disintegrate_arm` / `drop_upon_death` / `extract_from_minvent` / `m_dowear` calls that were missing.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `region_dialogue` | file-local `timeout.js:812` | `timeout.c:553–569` |
| `REGION_TEXTS` | two strings, index 0 then 1 | `timeout.c:548–551` |
| `hero_magical_breath` | file-local `timeout.js:458` | `Breathless` (`youprop.h:276–277`) |
| `region_danger` | live `region.js:1203` | `region.c:1340–1363` |
| `nh_timeout` call | `timeout.js:1037` | `timeout.c:637–638` |
| `end_burn` | export `timeout.js:1772` | `timeout.c:1803–1822` |
| `artifact_light` | live `timeout.js:1545` | gold DSM/scales worn, else Sunsword |
| `stop_timer` / `del_light_source` / `update_inventory` | live | the cleanup and the not-timed arms |

## C ↔ JS fidelity

`csym` for `region_dialogue` is `timeout.c:553–569`. No RNG. `timeout.c:18` only declares it. The only call is `nh_timeout` when `HMagical_breathing & TIMEOUT`, after `phaze_dialogue` and before `sleep_dialogue`. JS uses the slot's `intrinsic` when the prop object exists, else the flat, and awaits the function there.

`r` is that field masked with `TIMEOUT`. `i` is `r / 2` truncated. Both the flat and the slot have their `TIMEOUT` bits cleared, then `hero_magical_breath()` and `region_danger()` run, then each store gets its own saved `TIMEOUT` bits back. C has one field (`youprop.h:270`, the intrinsic) and does `|= r`. The flat is the mirror the generic `--` writes through `TIMEOUT_FLAT` (`timeout.js:115–119` and `:1186–1188`), so the two countdowns are the same value the macro names. Clearing both is what makes `Breathless` ignore the prayer timer. `hero_magical_breath` is intrinsic or extrinsic or `breathless(form)`, which is the macro. `region_danger` still has its own `Breathless` that reads the flat; the dialogue's own `no_need_to_breathe` reads the slot as well, and the return is the C `||`.

Texts are `"You seem to have some trouble breathing."` then `"The air here seems foul."`. An odd `r`, `i > 0`, and `i <= 2` prints `texts[2 - i]`. `pline("%s", …)` and `pline(text)` are the same line when the string has no percent.

`end_burn`: unlit `impossible("end_burn: obj %s not lit", xname(obj))` and return. `MAGIC_LAMP` or `artifact_light` forces `timer_attached` false. That arm is `del_light_source(LS_OBJECT, obj_to_any(obj))`, `lamplit = 0`, and `update_inventory` when `where == OBJ_INVENT`. Else `stop_timer(BURN_OBJECT, …)` and the not-timed `impossible` when it returns false. `impossible` is not awaited. A null object takes the unlit arm and prints `(null)`. The subject names both.

Callers this diff wires match the C guards: `Armor_off` / `Armor_gone` call with false only when the suit was artifact-lit and no longer is (`do_wear.c:922–923`, `:952–953`). `disintegrate_arm` calls with false only when `lamplit` (`:3224–3225`). `drop_upon_death` calls with true when `(cont || artifact_light) && obj_is_burning` (`bones.c:283–284`), still using `invent.shift` rather than `obj_extract_self`. `extract_from_minvent` calls with false when `W_ARM` and lit and `artifact_light`, before `owornmask` clears (`worn.c:1399–1400`); the where-mismatch `impossible` still returns early. `m_dowear` restores `owornmask`, calls with false, then clears it (`worn.c:966–968`). The other C sites were already on the export (`apply` six times with true, `bones` resetobjs, `dig` / the `create_object` inline, `explode`, `light` with `otyp != MAGIC_LAMP`, `obj_merge_light_sources`, `monstone`, `break_armor`, `recharge`, the four `burn_object` sites with false, `setmnotwielded`, `setuwep`, `uwepgone`). `light.c:769` is a comment. `extern.h:3241` only declares `end_burn`.

## Hallucinations / overclaim

The subject says no arm of either function is omitted. The save/clear/test/restore and the odd-count pline are the whole dialogue. The unlit return, the lamp/artifact force, the explicit cleanup, and the not-timed `impossible` are the whole `end_burn`. The named `extract_from_minvent` and `drop_upon_death` gaps are outside those bodies. The verify line skipped the full suite ("no shared file changed") even though `timeout.js` changed; the smoke spread is what it actually ran.

## Density

Two functions in one C file. `region_dialogue`'s callees are live. `end_burn`'s callees are live. No stub arm. The new caller sites use the same `true`/`false` C passes.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify region_dialogue --base e379902e8~1 --reach-all` and the same for `end_burn`.

```
verify region_dialogue: baseline e379902e8~1 (scoreboard at a5d5677e6, 2026-09-27T00:07:04.094Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify region_dialogue: no corpus session is blocked on it at e379902e8~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke region_dialogue: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
verify end_burn: baseline e379902e8~1 (scoreboard at a5d5677e6, 2026-09-27T00:07:04.094Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify end_burn: no corpus session is blocked on it at e379902e8~1 — a vacuous verify is NOT a corpus PASS. …
smoke end_burn: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so both empty verifies are the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line.

## Actionable C-wrongs

None. The timeout mask, the two gas lines, and `end_burn`'s lit / lamp / cleanup / timer arms match `timeout.c:557–567` and `timeout.c:1806–1821`.

Verdict: **ACCEPT**
