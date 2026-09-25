# Review 1764 — 7215d8d6a — arti_invoke unknown power (D-2805)

- SHA: `7215d8d6a` (coverage; invoke switch plus the touch walker)
- Files: `js/artifact.js` (`arti_invoke`, new `untouchable`, new `retouch_equipment`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can artifact.js worn.js clear_bypasses` → `ALREADY`. Same for `steed.js dismount_steed`, `trap.js selftouch`, `mkobj.js uncurse`.

## Intent vs deliverable

Subject promises one `arti_invoke`: null `impossible` + `ECMD_OK`, specials assign `res`, unknown power calls `impossible` and leaves `res` at `ECMD_OK`, property toggle inlined, and `untouchable` / `retouch_equipment` in C order. The diff deletes `arti_invoke_property` and does that. Six external `retouch_equipment` callers stay comments, and the commit names them.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `arti_invoke` | C body, async export | `artifact.c:2130–2232` |
| `arti_invoke_property` | deleted | was the `:2178` arm |
| `untouchable` | C body, local (C `staticfn`) | `artifact.c:2597–2636` |
| `retouch_equipment` | C body, async export | `artifact.c:2639–2705` |
| `xor_w_arti` / `prop_intrinsic` | pre-existing locals | extrinsic `^= W_ARTI`; flats mirrored |
| `float_up` / `float_down` / `selftouch` | imported | `trap.js` |
| `uncurse` | imported | `mkobj.js:663` |
| `dismount_steed` | imported | `steed.js:808` |
| `clear_bypasses` / `bypass_obj` / `nxt_unbypassed_obj` / `which_armor` | imported | `worn.js` |

`csym --callers arti_invoke`: `artifact.c:884` inside `set_artifact_intrinsic` → `revoke_invoked_property` (`artifact.js:1059`) which awaits `arti_invoke`; `:1758` `doinvoke` → `:2326`; `:2631` `untouchable` → `:1605`. `:45` is the prototype. `:2249` is a comment.

`csym --callers retouch_equipment`: `attrib.c:1360`, `eat.c:1325`, `polyself.c:463` / `:1021` / `:1415`, `uhitm.c:4285`. `apply.c:4115` and `zap.c:2149` are comments. Those six calls are the named unwired sites.

`sym.mjs`:

```
arti_invoke      js/artifact.js:2213   ASYNC — await required
arti_invoke_property NOT FOUND
untouchable      NOT EXPORTED — 1 local at js/artifact.js:1579
retouch_equipment js/artifact.js:1619   ASYNC — await required
float_up         js/trap.js:3000   ASYNC
float_down       js/trap.js:3105   ASYNC
selftouch        js/trap.js:3458   ASYNC
uncurse          js/mkobj.js:663   ASYNC
dismount_steed   js/steed.js:808   ASYNC
clear_bypasses   js/worn.js:1136   sync
bypass_obj       js/worn.js:642   sync
nxt_unbypassed_obj js/worn.js:1085   sync
which_armor      js/worn.js:406   sync
```

## C ↔ JS fidelity

Null (`artifact.c:2136–2138`): `impossible("arti_invoke without obj")` and `ECMD_OK`. JS `:2214–2216` matches.

No power (`:2141–2147`): crystal ball or `pline1(nothing_happens)`, then `ECMD_TIME`. JS uses `pline(nothing_happens)` as the previous body did. `use_crystal_ball(&obj)` can null the pointer; this function returns without reading `obj` again. Named, and true of both sides.

Specials (`:2150–2177`): cost failure returns `ECMD_TIME` before the switch. `res` starts `ECMD_OK`. Each case assigns `res`. `SNOWSTORM` falls through to `FIRESTORM`. Default `impossible("Unknown invoke power %d.", …)` does not assign `res`, so the return is `ECMD_OK`. JS `:2231–2264` matches, including the previous bug (pline + `ECMD_TIME`) being gone.

Property (`:2178–2229`): `extrinsic ^= W_ARTI`, `on` is the bit just set. Tired (`on && age > moves`) xors the bit back, `You_feel` ignoring, `age += d(3, 10)`, return `ECMD_TIME` — `rnz` is not called. Turning off sets `age = moves + rnz(100)` before the other-source test. `(eprop & ~W_ARTI) || iprop` is `nothing_special` and `ECMD_TIME`. Then CONFLICT / LEVITATION (`float_up` + `spoteffects(FALSE)`, or `float_down(I_SPECIAL|TIMEOUT, W_ARTI)`) / INVIS (`BInvis || Blind` → `nothing_special`; else `newsym` and the Hallucination transparency line). Final return `ECMD_TIME`. JS `:2267–2314` matches that order. `xor_w_arti` also flips `EInvis` / `ELevitation` / `EConflict`; that helper predates this SHA and the tired undo calls it a second time, so the flat moves with the bit.

`untouchable` (`:2597–2636`): wearmask `~(W_QUIVER | (twoweap ? 0 : W_SWAPWEP) | W_BALL)`, tool lamp / leash / container, carry `cary.adtyp || cspfx`, invoked `inv_prop` in `1..LAST_PROP` with `W_ARTI`. Failed `retouch_object` returns true. C calls `arti_invoke` only when `invoked && obj` after `retouch_object` may have stored `*objp = 0` (`:2572` not in invent, `:2588` after drop). JS tests `invent.includes(obj)`. `retouch_object` (`:1545–1561`) drops with `freeinv`/`dropx` or clears the local when the worn scan misses, which is the same "no longer in invent" test. A kept worn item stays in invent and is reversed. A saddle is not in invent, so both sides skip the reverse.

`retouch_equipment` (`:2639–2705`): nesting `clear_bypasses` on the outer enter and exit. `dropit = dropflag > 0` for the two weapons, then `dropflag == 1` for the invent walk. Secondary weapon before primary. Saddle with `untouchable(..., FALSE)` then `dismount_steed(DISMOUNT_THROWN)`. `nxt_unbypassed_obj(invent)`. Ring-count change uncurses cursed gloves. Lost gloves call `selftouch("After losing your gloves, you")`. JS `:1619–1656` matches. When `twoweap` is set and `uswapwep` is null, JS skips `bypass_obj` (that export writes `obj.bypass` with no null check). C would pass the null. Named in D-2805.

## Hallucinations / overclaim

The subject says unknown power keeps `ECMD_OK`. The default arm breaks without writing `res`, and `res` was set to `ECMD_OK` at `:2233`. That matches `:2173–2177`.

D-2805's caller line for `:884` points at `revoke_invoked_property`, not an inline call inside `set_artifact_intrinsic`. The helper's guard is `inv_prop` set, `<= LAST_PROP`, and `W_ARTI`, and `do.js:2422` / `zap.js:5219` await it on the artifact-off path. The C `wp_mask == W_ART && !on` test lives at those envelopes. The sentence is the split, not a second `arti_invoke`.

## Density

`arti_invoke` is the whole C function, not one case. `untouchable` and `retouch_equipment` are the callees the touch path needs, and both bodies are live. The six external callers are named in `docs/c-js-map/data.md` with the C lines. They are not a silent stub inside `arti_invoke`.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify arti_invoke --base 7215d8d6a~1 --reach-all`.

```
verify arti_invoke: baseline 7215d8d6a~1 (scoreboard at 8af23c12b) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke arti_invoke: no RNG-tagged reach; fixed smoke spread (12 run, 3.1s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2805's green 2/2, strict ×2, and cohort 7/7 were not re-run here.

## Actionable C-wrongs

None. The unwired `retouch_equipment` calls stay the named map rows.

Verdict: **ACCEPT**
