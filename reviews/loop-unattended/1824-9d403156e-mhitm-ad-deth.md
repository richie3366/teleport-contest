# Review 1824 — 9d403156e — mhitm_ad_deth (D-2865)

- SHA: `9d403156e` (coverage; `uhitm.c` `mhitm_ad_deth`, plus `first_weapon_hit` and `hmon_hitmon_msg_lightobj`)
- Files: `js/mhitm.js` (+54/−5), `js/mhitu.js` (+4/−50), `js/uhitm.js` (+76/−13). 134 `js/` insertions.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `mhitm_ad_deth`: hero-as-attacker falls through to the monster arm, hero-as-defender is the reach-out / `rn2(20)` switch, otherwise undead `rnd` then `mhitm_ad_drli`. `mhitm_ad_deth_u` is removed. `first_weapon_hit` builds the C livelog buffer. A lit light-hating artifact sets `lightobj` and `hmon_hitmon_msg_lightobj` prints the three formats. The diff matches that. `sym.mjs` / `imports.mjs --can`:

```
mhitm_ad_deth_u  NOT FOUND in js/**
mhitm_ad_deth    js/mhitm.js:4365   ASYNC
touch_of_death   js/mcastu.js:425   ASYNC
Antimagic        js/mcastu.js:96   sync
                 (8 other local clones remain; this arm imports the export)
imports.mjs --can mhitm.js mcastu.js Antimagic
  ALREADY: mhitm.js already statically imports mcastu.js. No new edge needed.
imports.mjs --can mhitm.js mcastu.js touch_of_death
  ALREADY: mhitm.js already statically imports mcastu.js. No new edge needed.
```

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `mhitm_ad_deth` | async export `mhitm.js:4365` | `uhitm.c:3836–3894` |
| `hero_Antimagic` | import of `mcastu.js` `Antimagic` | `Antimagic` macro, uprops included |
| `touch_of_death` | import `mcastu.js:425` | live callee |
| `mhitm_ad_drli` | existing export, awaited | drain tail |
| `first_weapon_hit` | local `uhitm.js:734` | `uhitm.c:1961–1989` |
| `hmon_hitmon_msg_lightobj` | local `uhitm.js:1712` | `uhitm.c:1701–1730` |

## C ↔ JS fidelity

`csym` body is `uhitm.c:3836–3894`. The only call is `uhitm.c:4824` (`case AD_DETH` in `mhitm_adtyping`). `extern.h:3429` is the declaration. JS reaches that case from `mhitm.js:5268` (two monsters), `mhitu.js:3138` (defender is `youmonst`), and `uhitm.js:2807` (attacker is `youmonst`).

`pd = mdef.data`. `is_youmonst(magr)` skips the hero-defender arm and lands on the monster arm (C `goto mhitm_deth`). Hero-defender: `pline_mon` of `Monnam` + "reaches out with its deadly touch." Undead: `damage = (damage+1)/2` via `Math.trunc`, then "Was that the touch of death?", return. Otherwise one `rn2(20)`:

- 17–19 and `!hero_Antimagic()`: `touch_of_death`, `damage = 0`, return.
- 17–19 and Antimagic: no `break`, so JS falls into `default` the way C `FALLTHROUGH` does. It does not fall into 0–4, because `default` returns.
- `default` (5–16, and the fallthrough): `You_feel("your life force draining away...")`, `permdmg = 1`, return.
- 0–4: `shieldeff(u.ux, u.uy)` only when Antimagic, then "Lucky for you, it didn't work!", `damage = 0`, return.

Monster arm (also the hero-attacker goto): undead and `damage > 1` sets `damage = rnd(damage/2)` (integer division). Then `mhitm_ad_drli`. No other RNG.

`first_weapon_hit` (`uhitm.c:1961–1989`): "cursed " when cursed and `bknown`; `ONAME` when `obj_is_pname`; otherwise `simpleonames`, and ` named ` + `bare_artifactname` when `oartifact && dknown`. Livelog is `LL_CONDUCT` and the C format. Callers `:1551` (`hmon_hitmon_jousting`, `uhitm.js:1659`) and `:1844` (`hmon_hitmon`, `:2007`). `:69` is the static declaration. `you.h:518` is a comment.

`hmon_hitmon_msg_lightobj` (`uhitm.c:1701–1730`): seen + saved name uses `s_suffix(name)` + " radiance penetrates deep into"; seen without a name is "The light sears"; unseen `highc`s the first character and uses "%s is seared!". Then, for a corporeal non-amorphous `mdat`, `s_suffix(whom)` + " flesh" is the `%s` argument. JS applies `highc` and the flesh suffix before choosing the sentence; the finished string is the same because flesh is part of `whom`, not the format. Caller `:1881` is `hmon_hitmon` (`uhitm.js:2097`). The flag is `artifact_light && lamplit && mon_hates_light` (`uhitm.c:1038–1040`, `uhitm.js:1254`).

The lit name passed into that message is `bare_artifactname(obj)` at the call (`:2099`). C copies it into `saved_oname` at `:1412–1413`, before the blow, because the object may be destroyed. The non-lit `cxname` copy at `:1410–1411` is the named omit. While `obj` still carries the artifact, the lit sentence matches.

## Hallucinations / overclaim

The subject does not say `mhitm_ad_dcay` was merged. `mhitm_ad_deth_u` is gone. The `rn2(20)` fallthrough is into the drain arm, not into 0–4. The lit name is read at the message, not stored at `:1412`.

## Density

The 59-line function and its three JS dispatch sites, plus the two message helpers in the same hit path. `mhitm_ad_drli` and `touch_of_death` are live imports. 134 insertions.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify mhitm_ad_deth --base 9d403156e~1 --reach-all`.

```
verify mhitm_ad_deth: baseline 9d403156e~1 (scoreboard at 4913f8580) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke mhitm_ad_deth: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
