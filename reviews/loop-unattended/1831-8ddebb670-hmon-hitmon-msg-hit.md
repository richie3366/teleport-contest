# Review 1831 — 8ddebb670 — hmon_hitmon_msg_hit (D-2872)

- SHA: `8ddebb670` (coverage; `uhitm.c` `hmon_hitmon_msg_hit`, `hmon_hitmon_splitmon`, `mhitm_ad_pest`, `mhitm_ad_dise`)
- Files: `js/uhitm.js` (+176/−), `js/mhitm.js` (+81), `js/mhitu.js` (−40), `js/mthrowu.js` (+10). 198 `js/` insertions.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `hmon_hitmon_msg_hit`, one `hmon_hitmon_splitmon`, one `mhitm_ad_pest`, and one `mhitm_ad_dise`, with the `_u` clones deleted and the three dispatchers calling the exports. The diff does that. `hmon_hit_verb` is gone; the verb ternary is inside `hmon_hitmon_msg_hit`. `hit` was a same-file local in `mthrowu.js` and is now the import. `sym.mjs`:

```
hmon_hit_verb        NOT FOUND
mhitm_ad_dise_u      NOT FOUND
mhitm_ad_pest_u      NOT FOUND
hit                  js/mthrowu.js:862   ASYNC — await required
diseasemu            js/mhitu.js:2675   ASYNC — await required
hmon_hitmon_msg_hit  NOT EXPORTED — 1 local js/uhitm.js:1775
hmon_hitmon_splitmon NOT EXPORTED — 1 local js/uhitm.js:1740
mhitm_ad_dise        js/mhitm.js:4397   ASYNC
mhitm_ad_pest        js/mhitm.js:4419   ASYNC
is_shield            js/worn.js:136   sync  (clones remain in do_wear.js, u_init.js)
is_wet_towel         js/weapon.js:1716   sync
yname                js/objnam.js:2770   sync  (clone remains js/uhitm.js:4736)
```

`imports.mjs --can uhitm.js mthrowu.js hit` → `ALREADY: uhitm.js already statically imports mthrowu.js`. `hit` is a function declaration, called only from `hmon_hitmon_msg_hit`. No top-level read.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `hmon_hitmon_msg_hit` | local `uhitm.js:1775` | `uhitm.c:1636–1660` |
| `hmon_hitmon_splitmon` | local `uhitm.js:1740` | `uhitm.c:1603–1634` |
| `mhitm_ad_pest` | export `mhitm.js:4419` | `uhitm.c:3807–3834` |
| `mhitm_ad_dise` | export `mhitm.js:4397` | `uhitm.c:4592–4619` |
| `hit` | import, awaited | `zap.c:3555–3568` |
| `diseasemu` | export, awaited | `mhitu.c:1032–1043` |
| `yname` | local clone `uhitm.js:4736` | `objnam.c` `yname` |
| `is_shield` / `is_wet_towel` / `Role_if` | import / existing local | shield, wet towel, barbarian |

## C ↔ JS fidelity

`csym` `hmon_hitmon_msg_hit` is `uhitm.c:1636–1660`. Callers: the static declaration at `:51` and `hmon_hitmon` at `:1870`. JS calls it after split (`uhitm.js:2099–2101`), matching `:1868` then `:1870`.

The guard is `!hittxt && (!destroyed || (thrown && m_shot.n > 1 && m_shot.o == otyp))`. Any non-zero `thrown` (thrown, kicked, applied) calls `hit(mshot_xname(obj), mon, exclam(dmg))`. Melee with `flags.verbose` false is `You("hit it.")`. The other melee arm is the C ternary: shield or `HEAVY_IRON_BALL` → bash, else whip skill or `is_wet_towel` → lash, else `Role_if(PM_BARBARIAN)` → smite, else hit; then `mon_nam` and `canseemon ? exclam(dmg) : "."`. `You` expands `%s` (`display.js:7671`). `exclam` is `?` / `.` / `!` for `<0` / `<=4` / else (`zap.c:3546–3553`). No RNG in this function.

`hmon_hitmon_splitmon` (`uhitm.c:1603–1634`) uses the caller's `mdat` (set from `mon.data` at `hmon_hitmon` start, `:1767`; joust's `mhurtle_to_doom` writes it back, C `:1953`). Black or brown pudding, `mhp > 1`, `!mcan`, `!offmap` (`mx == 0` after the hit, `:1851–1862`), `uwep` or the twoweapon swap, iron or metal, not ammo or missile, `hand_to_hand`. `clone_mon(mon, 0, 0)`, then `twoweap && verbose` appends ` with ` + `yname`, then `mintrap(NO_TRAP_FLAGS)`, then `hittxt`. The `yname` it calls is the pre-existing local at `uhitm.js:4736` (carried → "your ", else "the " + `cxname`), not `objnam.js:2770`.

`mhitm_ad_pest` (`uhitm.c:3807–3834`). Callers: `mhitm_adtyping` `:4825` only (`:3427` is the extern). Hero-as-attacker (`magr == &youmonst`) takes the monster-vs-monster arm. Hero-as-defender is `pline_mon` of the fever line, then `diseasemu`, and `mhm.damage` stays. Otherwise the attack is copied, `adtyp` becomes `AD_DISE`, and `mhitm_ad_dise` runs. `damageum_adtyping`, `mhitm_adtyping_u`, and `mdamagem` each call it.

`mhitm_ad_dise` (`uhitm.c:4592–4619`). Callers: pest `:3832` and `mhitm_adtyping` `:4822`. Hero-as-defender is `hitmsg` then `diseasemu`; a false return (sick resistance, `mhitu.js:2681`) zeroes leftover. Monster-vs-monster zeroes leftover when `mlet` is fungus, the index is `PM_GHOUL`, or `defended(mdef, AD_DISE)` (`mondata.js:163`). No RNG in either function. `diseasemu` still draws `rn1` only on the sickness arm.

`hit` (`zap.c:3555–3568`) is the live function. It still omits `mtmp == &youmonst` (always verbose) and `engulfing_u` (counts as seen). `bhitpos` falls back to the monster's coordinates when unset. Those two predicates are named in `docs/c-js-map/turns.md` in this commit. `verbose === false` (not `!verbose`) is the same test the deleted inline used; `jsmain` sets the flag true.

`mdamagem`'s new disease block is the same knockback / HP / `monkilled` / `grow_up` tail the acid block already uses (`mhitm.c:1061–1072` and `:1115–1118`). The gulp re-place, troll-bane, and zombify lines at `:1074–1090` are absent from that tail for every adtyp, not only disease.

## Hallucinations / overclaim

The subject says the functions match C and names the `hit` gaps, the `=== false` verbose test, the local `yname`, and the shade `get_dmg_bonus` bump. `gulpmu`'s `AD_DISE` arm still calls `diseasemu` itself (`mhitu.js:2084`), which is `mhitu.c:1533–1536`, not `mhitm_ad_dise`. The map line that mentions both is that pairing, not a claim that gulpmu calls the new export. No stub sits in these arms.

## Density

Four functions, one C file, plus the `zap.c` `hit` callee they call. 198 insertions. Callers that exist in JS are wired.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify <fn> --base 8ddebb670~1 --reach-all` for each function the D-log names.

```
verify hmon_hitmon_msg_hit: baseline 8ddebb670~1 (scoreboard at 3ea194814) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke hmon_hitmon_msg_hit: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

`hmon_hitmon_splitmon`, `mhitm_ad_pest`, and `mhitm_ad_dise` each report the same: 0 blocked, smoke 12 PASS, 0 regressed, REACH-OK. The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None. The `hit` predicates and the local `yname` are named in the map.

Verdict: **ACCEPT**
