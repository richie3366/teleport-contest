# Review 1810 — cc7992cc4 — rnd_otyp_by_wpnskill (D-2851)

- SHA: `cc7992cc4` (coverage; `objnam.c` `rnd_otyp_by_wpnskill`)
- Files: `js/readobjnam.js`, `js/objnam.js`, `js/invent.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `rnd_otyp_by_wpnskill`: walk `bases[WEAPON_CLASS]` while `oc_class` stays `WEAPON_CLASS`, count `oc_skill`, then `rn2(n)` and `--n < 0`. No match returns `STRANGE_OBJECT`. `strncmpi` of 7 and 6 characters picks polearm or hammer. Direct `readobjnam` runs that before the null return. `readobjnam_wish` waits until `wizterrainwish` returns 0. `maybereleaseobuf` calls `releaseobuf`, and the range test is false because there is no obuf pool. The diff adds those functions and the four release call sites.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `rnd_otyp_by_wpnskill` | local `readobjnam.js:1277` | `objnam.c:3432–3452` (`staticfn`) |
| `wish_otyp_by_wpnskill_prefix` | local `readobjnam.js:1311` | the two `strncmpi` tests at `:4983` and `:4986` |
| `readobjnam_finish` | local `readobjnam.js:1619` | the create-object tail from `:5037` |
| `maybereleaseobuf` | sync export `objnam.js:3941` | `objnam.c:167–169` |
| `releaseobuf` | local `objnam.js:3931` | `objnam.c:150–160` (`staticfn`) |
| `deferSkillPrefixForWiztrap` | module flag | the `wiztrap:` label before the prefix (`:4975–4989`) |

`sym.mjs`:

```
rnd_otyp_by_wpnskill NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/readobjnam.js:1277
wish_otyp_by_wpnskill_prefix NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/readobjnam.js:1311
readobjnam_finish NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/readobjnam.js:1619
maybereleaseobuf js/objnam.js:3941   sync
releaseobuf      NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/objnam.js:3931
```

Each "clone" is the single local definition. C `rnd_otyp_by_wpnskill` and `releaseobuf` are `staticfn`. Nothing was deleted or re-pointed from a second copy. `wish_otyp_by_wpnskill_prefix` and `readobjnam_finish` are not C functions.

## C ↔ JS fidelity

`csym` body is `objnam.c:3431–3452`. Callers the tool prints: the declaration `:49`, then `:4984` (`P_POLEARMS`) and `:4987` (`P_HAMMER`). Both are inside `readobjnam`. `P_POLEARMS` is 16 and `P_HAMMER` is 14 (`skills.h:37–39`, `js/const.js:2935–2937`).

The walk matches. `n` starts at 0 and `otyp` at `STRANGE_OBJECT` (0). Each skill hit increments `n` and stores that index. If `n > 0`, one `rn2(n)`, then the same walk returns the first hit where `--n < 0`. If the second walk does not return, both return the last hit from the first walk. If `n` is 0, neither calls `rn2`. `RANDOM_CLASS` is 0 (`objclass.h:137`). `mkobj(0, false)` is `mkobj(RANDOM_CLASS, FALSE)` (`mkobj.c:270`, `mkobj.js:2549`).

`strncmpi_start` compares `slice(0, pref.length)` (`readobjnam.js:149–152`). `"polearm"` is 7 characters and `"hammer"` is 6, so the test is `strncmpi(bp, "polearm", 7)` and `strncmpi(bp, "hammer", 6)`. Polearm is tried first.

C order at `wiztrap:` (`:4975–4992`): if wizard and not wizkit and `!d.oclass`, `wizterrainwish` may return. Then if `!oclass && !typ`, the prefix sets `typ` and `goto typfnd`, which skips the null return and the `any:` `wrpsym` roll. JS sets `deferSkillPrefixForWiztrap` only around `readobjnam` from `readobjnam_wish`. A wizard miss returns null, terrain runs, and a prefix hit then calls `readobjnam_finish`. A direct `readobjnam` (defer false) runs the prefix before the null return. A hit does not roll `wrpsym`. `STRANGE_OBJECT` is a hit (`picked !== null`), so both sides still create an object.

`readobjnam_finish` does not include `typfnd` lines `:4998–5033` (the `!wizard` substitutions and the pudding-corpse glob rewrite). Those tests need a set `typ`. A skill result is either 0, and both tests fail in C, or a weapon index, which is not those otyps. `objects_data.js` has no `oc_nowish` field; that check is already absent for every wish, not a stub added on this arm.

`releaseobuf` (`:150–160`) rewinds `obufidx` only when `bufp` lies in `obufs[obufidx]`. JS has no pool, so the body is empty. `maybereleaseobuf` (`:167–169`) is that call; the rest of the C function is commentary. Call sites the C tree has: `invent.c:492`, `:498`, `:2765`, and `:3330`. JS calls it from `sortloot_cmp` (both loot names), `learn_unseen_invent`, and the `display_pickinv` splits (`pickinv_build_inuse`, including the bare-hands `makeplural` buffer, `pickinv_build_perm`, `display_pickinv_reply`, `build_wizid_pickinv_items`). The calls do not change the strings.

## Hallucinations / overclaim

The subject says the empty skill class `mkobj`s `RANDOM_CLASS` and that, with bases filled, `P_POLEARMS` has weapons and `P_HAMMER` is `WAR_HAMMER` only, so that arm does not run. The `n == 0` return is in the function. The subject says the obuf range test is false. `releaseobuf` is empty for that reason. The `readobjnam_finish` comment says it is `typfnd` from `:4997`. The body starts at the create line `:5037`. The skipped tests do not change a polearm, a hammer, or `STRANGE_OBJECT`.

## Density

The whole static function and both call sites. The wish defer is the pre-existing split of `wiztrap` out of `readobjnam`, kept in C order for the wish entry. Release sites are the four C calls, spread across the JS inventory splits.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify rnd_otyp_by_wpnskill --base cc7992cc4~1 --reach-all`.

```
verify rnd_otyp_by_wpnskill: baseline cc7992cc4~1 (scoreboard at ae37117bd, 2026-09-26T07:50:53.232Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke rnd_otyp_by_wpnskill: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
