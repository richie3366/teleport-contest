# Review 291 — a7a5a835 — uhitm.c mhitm_ad_drin mhitu (monster→you) (D-1329)

## Metadata
- Full / short hash: `a7a5a8356330f2818285d9172ca15197b528140a` / `a7a5a835`
- Parent: `b21765a2` (D-1328). This file audits **this SHA only**. Archive **Addressed:** D-1329 lacked the short hash; this review commit fills `a7a5a835`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 02:29:55 +0200
- D-id: **D-1329**
- Stats: 16 files, +386 / −138 — `js/mhitu.js` +105; `js/spell.js` +33; `js/weapon.js` +40; `js/attrib.js` +21; `js/eat.js` / `js/uhitm.js` comments; journal rotate.
- Claims to close: Open `mhitu.c` AD_DRIN (named from D-1309 / reviews **269** / **271** / **276**). Not mhitm AD_DRIN. Not `u_slip_free` AD_WRAP. `reviews/loop-2026-08-15/` has no unpaid mhitu-AD_DRIN Must-fix.
- JS / map: `mhitu.js` `mhitm_ad_drin_u`; `spell.js` `losespells`; `weapon.js` `drain_weapon_skill`; `attrib.js` dunce/`Fixed_abil`; `c-js-map/turns.md` + `debt.md`. mhitm AD_DRIN / full `defends()` still named.
- Prior reviews this SHA claims to close: **269** named mhitu `u_slip_free`/`uarmh` after uhitm helmet; **271** named the mhitu callee after AT_TENT melee (dispatch hit `hitmu`, AD_DRIN still zeroed).

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_drin so a mind-flayer tentacle actually eats the hero's brain (helm/slip/INT/spells), instead of zeroing AD_DRIN in mhitm_adtyping_u.”

C `mhitm_ad_drin` mhitu (`uhitm.c:3222–3271`) after the uhitm (hero→mon) arm:

```
    } else if (mdef == &gy.youmonst) {
        hitmsg(magr, mattk);
        if (defends(AD_DRIN, uwep) || !has_head(pd)) {
            You("don't seem harmed.");
            gs.skipdrin = TRUE;
            return;
        }
        if (u_slip_free(magr, mattk))
            return;
        if (uarmh && rn2(8)) {
            Your("%s blocks the attack to your head.", helm_simple_name(uarmh));
            return;
        }
        if (Half_physical_damage)
            mhm->damage = (mhm->damage + 1) / 2;
        mdamageu(magr, mhm->damage);
        mhm->damage = 0;
        if (!uarmh || uarmh->otyp != DUNCE_CAP) {
            ... eat_brains(magr, mdef, TRUE, (int *) 0);
            if (u.umortality > oldmort) gs.skipdrin = TRUE;
            if (mhitu == M_ATTK_MISS) return;
        }
        (void) adjattrib(A_INT, -rnd(2), FALSE);
        if (!rn2(5)) { losespells(); gs.skipdrin = TRUE; }
        if (!rn2(5)) { drain_weapon_skill(rnd(2)); gs.skipdrin = TRUE; }
    }
```

Caller `hitmu` already `d(damn,damd)` then `mhitm_adtyping`. `mattacku` skipdrin continue is D-1298. `eat_brains` mhitu branch is D-1306. `u_slip_free` is D-1327.

Old JS: `mhitm_adtyping_u` `default: mhm.damage = 0` for AD_DRIN.

The diff **does** `case AD_DRIN` → `mhitm_ad_drin_u` with that order, plus live `losespells` / `drain_weapon_skill` / dunce `adjattrib`. It does **not** port the mhitm (mon→mon) arm `:3272–3301`. Named. `defends_ad_drin` is a local always-`false` — C `artifact.c:636–683` has no `DFNS(AD_DRIN)` and the dragon-armor `switch (adtyp)` has no AD_DRIN case (falls `default` FALSE). That is C-equivalent for this adtyp, not a stub that drops a real artifact.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_drin_u` | C `:3222–3271`, **new** | mhitu only |
| `mhitm_adtyping_u` `AD_DRIN` | C, **wired** | was default-zero |
| `hitmsg` | C `:3224`, **imported live** | AT_TENT “tentacles suck your brain” |
| `defends_ad_drin` | C `defends(AD_DRIN,uwep)`, **clone always-false** | no DFNS(AD_DRIN); full `defends()` named |
| `has_head` | C `mondata`, **imported live** | |
| `u_slip_free` | C `:1045–1085`, **imported live** | D-1327; AD_DRIN uses `uarmh` |
| `helm_simple_name` / `hard_helmet` | C `objnam.c:5513` / `do_wear.c:567`, **clone** | `oc_skill` stand-in for `oc_armcat` ARM_HELM=2 (same as uhitm D-1307) |
| `maybe_half_phys` | C `Half_physical_damage` `:3242–3243`, **imported live** | H\|\|E `(dmg+1)/2`; Mitre not in this helper — matches C (not Mitre) |
| `mdamageu` then `damage=0` | C `:3244–3245`, **wired** | AC in later `hitmu` skipped |
| `eat_brains(..., null)` | C `:3249` `(int*)0`, **imported live** | D-1306 mhitu branch |
| `adjattrib(A_INT,-rnd(2),false)` | C `:3263`, **imported live** | this SHA adds dunce abort + `Fixed_abil` |
| `losespells` | C `spell.c:1763–1827`, **new** | `rn2(n+1)`; Confusion worse-of-two; Luck `!rnl(7)` then `rnd(nzap)` |
| `drain_weapon_skill` | C `weapon.c:1476–1514`, **new** | `rn2(skills_advanced)` pick; Unskilled `continue` vs C `panic` |
| mhitm AD_DRIN | C `:3272–3301`, **named omit** | |
| AD_WRAP caller | C, **named omit** | helper already live |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG on mhitu AD_DRIN:** `uarmh && rn2(8)` when a helm is worn; `rnd(2)` INT; independent `!rn2(5)` twice; `losespells` `rn2(n+1)` (+ maybe second + `rnl(7)`/`rnd`); `drain_weapon_skill(rnd(2))` then per-skill `rn2`. Headless / slip return **before** helm `rn2(8)`. No helm: skip `rn2(8)` (C `uarmh &&`). `eat_brains` still `rnd(10)` xtra decl (pre-existing). `defends_ad_drin` burns **no** RNG.

## C ↔ JS fidelity

Order is hitmsg → defends/headless skipdrin → `u_slip_free` return (dice kept, no skipdrin) → helm `rn2(8)` return (no skipdrin) → Half then `mdamageu` + zero leftover → dunce skip `eat_brains` else brains + mortality skipdrin + MISS return → `adjattrib` → 1/5 spells → 1/5 skill. That is C `:3224–3271` call-for-call. Helmet/slip do **not** set `skipdrin`, so leftover AT_TENT+AD_DRIN still try — C comment at `:3177–3182`; D-1298 continue only after headless or used-up life.

`maybe_half_phys` is `(HHalf \|\| EHalf) ? trunc((d+1)/2) : d` — C `Half_physical_damage` macro, **not** Mitre. C comment “negative armor class doesn't reduce this damage”: JS zeros `mhm.damage` so `hitmu`’s later `uac<0` `rnd` does not run. Match.

Dunce: skip `eat_brains`, then `adjattrib(..., FALSE)` hits C `:129–133` constricts pline when `msgflg==0`. JS `false|0===0`. `Fixed_abil` abort before ABASE is C `:126–127` (this SHA also fixes other `adjattrib` callers — C always had it).

`losespells`: count to `NO_SPELL`; `nzap = rn2(n+1)`; `HConfusion` worse-of-two (C `Confusion` ≡ `HConfusion`); `nzap>1 && !rnl(7)` then `rnd(nzap)`; `rn2(n-i) < nzap` zeros `sp_know` + `exercise(A_WIS,false)`. `#if 0` forget-book named. `exercise` is sync.

`drain_weapon_skill`: `while (--n >= 0)` pick `rn2(skills_advanced)`, shift `skill_record`, refund `slots_required` at the **new** rank, maybe `rn2` clip `P_ADVANCE`. C panics if already Unskilled; JS `continue`s the decrement — defensive, not a public-path C-wrong. Forget-training pline matches `:1509–1513`.

`eat_brains` mhitu (`eat.c:693–723`): no mindless-player test; INT≤amin death/scarecrow; `give_nutrit`; `exercise(A_WIS,FALSE)`; caller handles Int/memory. JS already had that branch (D-1306). Passing `null` for `dmg_p` matches `(int*)0`.

Hallucination check: “Match C dispatch, callee is a stub” is **false** for `eat_brains` / `losespells` / `drain_weapon_skill` / `u_slip_free`. `defends_ad_drin` is a documented always-false that matches C’s AD_DRIN result, not a silent drop of Stormbringer-class DFNS (none exist).

## Hallucinations / overclaim

Subject + D-1329 say a mind-flayer tentacle actually eats the hero's brain (helm/slip/INT/spells) instead of zeroing AD_DRIN. **The case plus that arm plus the three callees are the hunk.** Stamping **Addressed:** D-1329 is fair. Do **not** stamp “Match C mhitm AD_DRIN.” Do **not** stamp “Match C full `defends()` dragon-armor.” Do **not** stamp “Match C `mhitm_ad_wrap`.” Do **not** treat fortress PASS as `"Your brain is eaten!"`.

## Density

One C arm plus the callees that arm actually calls (`losespells`, `drain_weapon_skill`, dunce `adjattrib`, `helm_simple_name`). Three JS modules that already sit on this envelope. ~140 executable JS lines. mhitm AD_DRIN / AD_WRAP correctly not glued. Right size (§2b). Slightly denser than a one-line `case` peel — that is the point of fortress map-driven mode.

## Branch-by-branch confirm

1. Headless / (C-equivalent) `defends`: “don’t seem harmed,” `skipdrin`, no `rn2(8)`. Match `:3225–3230`.
2. Greased helm: `u_slip_free` true, return, leftover tentacles still try. Match `:3232–3233`.
3. Oilskin **cloak** on AD_DRIN: ignored (`uarmh` only). Match `:1060–1061`.
4. Helm `rn2(8)` hit: hat vs helm block, no skipdrin. Match `:3235–3239`.
5. Half_physical: `(d+1)/2` then `mdamageu`, leftover 0. Match `:3242–3245`.
6. Dunce: skip brains, constrict `adjattrib`. Match `:3247` + `:129–133`.
7. Brains: `eat_brains` then INT `-rnd(2)`. Match `:3248–3263`.
8. `!rn2(5)` spells then independent `!rn2(5)` skill; both set skipdrin. Match `:3264–3270`.
9. `mattacku` later AT_TENT+AD_DRIN `continue` when skipdrin. Pre-existing D-1298.
10. mhitm arm. Still omitted. Named.
11. **Public-unhit** unless a session faces a mind flayer.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./eat.js')` / `spell.js` are ESM cycles. Plain ESM. `ARM_HELM=2` via `oc_skill` is the objects-table stand-in already used by D-1307, not a recorded helm otyp.

## Verification

Journal: private canary **19**/19; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on mind flayers. Cadence this audit: full `sessions` at HEAD `a7a5a835` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not evidence `rn2(8)` or `losespells` fired.

## Actionable C-wrongs

None for Must-fix. hitmsg → slip → helm `rn2(8)` → Half/`mdamageu`/zero → brains → `adjattrib` → 1/5+1/5 matches C `:3222–3271`. Callees are live.

Named omits (map, not Must-fix):

1. mhitm AD_DRIN (`uhitm.c:3272–3301`) — next Open
2. AD_WRAP `mhitm_ad_wrap` caller of `u_slip_free`
3. full `defends()` dragon-armor switch (other adtyps)
4. `losespells` `#if 0` forget-book

Do not Must-fix “export `losespells`” (this SHA). Do not Must-fix always-false `defends_ad_drin` (no DFNS(AD_DRIN)). Do not Must-fix Unskilled `continue` vs C panic.

## Callers / RNG ledger

C: `mattacku` AT_TENT+AD_DRIN → `hitmu` → `mhitm_ad_drin` youmonst. JS: `mhitm_adtyping_u` now takes that case. Public fortress is not evidence helm `rn2(8)` or INT `rnd(2)`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a mind-flayer tentacle now drains the hero (helm/slip/INT/`losespells`/`drain_weapon_skill`); mhitm AD_DRIN stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1329 `a7a5a835`.
