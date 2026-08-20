# Review 236 — b166de10 — dothrow.c toss_up + throwit u.dz (D-1274)

## Metadata
- Full / short hash: `b166de10d211f934b6abe9b14c5d6d62754198a4` / `b166de10`
- Parent: `2a6bf680` (D-1273). This file audits **this SHA only**. Archive row **Addressed:** D-1274 lacked the short hash; this review commit fills `b166de10`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 12:31:25 +0200
- D-id: **D-1274**
- Stats: 9 files, +480 / −75 — `js/dothrow.js` +398 / −75.
- Claims to close: Open `dothrow.c` `toss_up` (named from D-1263 / review **225**). Not hold_another_object. `reviews/loop-2026-08-15/` has no unpaid toss_up Must-fix.
- JS / map: `dothrow.js` `toss_up` / `throwit` / `dir_from_key` / `dothrow` / `dofire`; live `hitfloor` / `potionhit` / `breaktest`/`breakobj` / `dmgval` / `artifact_hit`; `c-js-map/turns.md`. returning_missile / swallowit / slip / stamina / steed potion named.
- Prior reviews this SHA claims to close: **225** named omit toss_up / throwit `dz`.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c toss_up so an upward throw (t+<) hits the ceiling or the hero's head, instead of ignoring u.dz.”

C `toss_up` (`dothrow.c:1256–1426`) + caller `throwit` `:1579–1599` after swallow (named). `getdir`/`movecmd` `'<'`/`'>'` set `u.dz`. `toss_up(obj, rn2(5)&&!Underwater)`: no ceiling / hitsroof `breaktest` shatter-or-`hitfloor(FALSE)` / “hits” / “almost hits”; then potion `potionhit(&youmonst, …, POTHIT_HERO_THROW)` else `breaktest` splat/`can_blnd`/`make_blinded`/`hitfloor(FALSE)` else `harmless_missile` else `dmgval`/`artifact_hit`/`WT_TO_DMG`/helmet/`Maybe_Half_Phys`/`losehp`; petrify killer `"elementary physics"` + `dropy` + `done(STONING)`. Downward: steed potion named else `hitfloor(TRUE)`.

Old JS: `dothrow`/`dofire` forced `dz=0`; `throwit` had no `u.dz` arm.

The diff **does** live `toss_up`, `dir_from_key` `<>`, throwit `dz<0` → `toss_up` else `hitfloor(TRUE)`, and stops forcing `dz=0` on throw. It does **not** port swallow-before-dz, returning_missile ceiling-return, slip, stamina, or steed `rn2(6)`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `toss_up` | C `:1256–1426`, **new** | |
| throwit `u.dz` | C `:1579–1599`, **wired** | swallow / returning / steed named |
| `dir_from_key` `<>` | C `cmd.c` `movecmd`, **wired** | |
| `has_ceiling` | C `dungeon.c:1690`, **clone** | endgame non-earth |
| `ceiling_at` | C `ceiling()`, **truncated clone** | vault/temple/shop/water/fire/quest named |
| `harmless_missile` | C `:1220–1248`, **clone** | matches C otyp list; mthrowu keeps a copy |
| `hard_helmet` | C `do_wear.c:568`, **clone** | local `MITHRIL=15` is C GOLD; mkobj live is 17 |
| `helm_simple_name` | C `objnam.c`, **clone** | always `"helmet"`; hat named |
| `can_blnd_toss_self` | C `can_blnd` AT_WEAP self, **subset clone** | Blindfolded/ublindf/visor named |
| `Hate_silver` / `BlindedTimeout` / `passes_rocks` / `stone_missile` | C macros, **clones** | Hate_silver matches `youprop.h:401` |
| `potionhit(null, …)` | C `&youmonst`, **imported live partial** | JS `mon==null` means you |
| `breaktest` / `breakobj` / `hitfloor` / `dmgval` / `artifact_hit` / `body_part` / `polymon` | C, **imported live** | |
| `toss_up_petrify` | C `goto petrify`, **new** | |
| returning_missile / swallowit / slip / stamina / steed | C throwit before/inside dz, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCEBUNGLE` is a C const, not ALIGN. Rule #2 clean. **New RNG:** `rn2(5)` hitsroof; cream/venom `rnd(25)`; `artifact_hit` `rn1(18,2)`; weight `rnd(dmg)`; blessed `rnd(4)`; silver `rnd(20)`. Underwater is `u.uinwater` (`youprop.h:279`).

## C ↔ JS fidelity

Pinned C throwit dz (`dothrow.c:1579–1599`) and ceiling shatter (`:1265–1278`):

```
    } else if (u.dz) {
        if (u.dz < 0 && iflags.returning_missile && !impaired) { ... return to hand ... }
        else if (u.dz < 0)
            (void) toss_up(obj, rn2(5) && !Underwater);
        else if (u.dz > 0 && u.usteed && obj->oclass == POTION_CLASS && rn2(6))
            potionhit(u.usteed, ...);
        else
            hitfloor(obj, TRUE);
```

JS `if (u.dz)` is **not** behind C’s preceding `if (u.uswallow)`. Named swallowit: an upward throw while engulfed tosses at the ceiling instead of hitting the engulfer. returning_missile would skip `rn2(5)` in C; JS always rolls it. Named. Downward potion-on-steed skips `rn2(6)`. Named. `hitfloor(TRUE)` on other downward throws matches the else.

`toss_up` branch order matches C: `has_ceiling` → hitsroof `breaktest` (shatter `breakobj` or `hitfloor(FALSE)` return) → action hits/almost → HEAD pline → potion / breaktest splat / harmless / damage. Petrify `goto` is `toss_up_petrify` (killer `elementary physics`, `dropy`, `done(STONING)`). Helmet `less_damage` clamps dmg to 1; worn helm clears `harmless` (xorn+stone). `Maybe_Half_Phys` is live `maybe_half_phys`. `losehp` + `finish_losehp_done` is the JS death-screen await C does inside `losehp` (D-0323), not an extra killer.

`potionhit(null, …)`: JS `isyou = mon == null`. Callee is **partial** (head-shatter, `rnd(2)`, evaporate, acid, `potionbreathe`; oil/poly and most otyp effects deferred). Not a no-op `return`. Same class as review **225** `ship_object`. Say so: this is **not** “Match C full `potionhit`”; it **is** “Match C toss_up dispatch into the live partial.”

`hard_helmet`: C `is_helmet && (is_metallic || is_crackable)` with `is_metallic` IRON(11)…MITHRIL(**17**). JS `mat>=IRON && mat<=MITHRIL` but **local `MITHRIL=15`** (C GOLD). Platinum(16)/mithril(17) would not count. Vanilla helms in `objects_data` are leather/cloth/iron/glass only — iron 11 and glass 19 still match C on every helm that exists. Idle on the claimed path. `is_crackable` is already imported; they did not use it. Do **not** Must-fix an idle range; do not stamp the clone as C `is_metallic`.

`can_blnd_toss_self`: haseyes + cream/venom + !uswallow. C also Blindfolded (pie), `ublindf`/`ucreamed` (venom), visor. Named extra-true. `harmless_missile` otyp/spe/contents/scroll/cloth matches C `:1220–1248` call-for-call.

`getdir_cmdassist` `'<'`/`'>'` now succeed (C `movecmd`). `lock.js` still zeros `dz` after (pre-existing; `'<'` there now behaves like `.`). Throw keeps `getdir_cmdassist`. No confdir inside shared `getdir`.

## Hallucinations / overclaim

Subject + D-1274 say `t`+`<` hits the ceiling or the hero's head instead of ignoring `u.dz`. **`toss_up` + getdir `dz` + throwit `u.dz` are the hunk.** Stamping **Addressed:** D-1274 is fair for that. Do **not** stamp “Match C swallowit / returning_missile / steed potionhit `rn2(6)` / slip / stamina.” Do **not** stamp “Match C `potionhit` every otyp” or “Match C `ceiling()` vault/temple.” Do not stamp “Match C `hard_helmet` via `is_metallic` MITHRIL=17.” `AD`/`MITHRIL=15` is a local enum miss, not a trace index.

## Density

One C function plus the throwit `dz` arm and the `movecmd` `<>` that feed it. ~170 lines of C; 398 JS with helper clones C uses inside `toss_up`. Upper edge of §2b (helpers, not a second subsystem). Did not glue swallowit or `display_self`.

## Branch-by-branch confirm

1. `t`+`<`, `rn2(5)` hit, non-break: “hits the ceiling, then falls… HEAD”. Match.
2. Same, `!rn2(5)`: “almost hits”. Match.
3. Underwater: `hitsroof` false (`!u.uinwater`). Match.
4. Potion: dispatch `potionhit` (partial body). Match dispatch.
5. Cream pie / venom: `rnd(25)` if `can_blnd` subset, face pline, `make_blinded`. Visor named skip.
6. Harmless (scroll/cloth/empty sack): “doesn't hurt”, `hitfloor(FALSE)`. Match.
7. Iron helm, weapon dmg>1: clamp 1, “Fortunately… hard helmet.” Match iron.
8. Petrify egg, no helm, no stone-res: killer, stone, `dropy`, `done`. Match.
9. `>`: `hitfloor(TRUE)` (steed potion named). Match the else.
10. Swallow / returning missile / slip / stamina: still named. Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Killer string `"elementary physics"` is C `svk.killer.name`, not a session quote used as a branch. Plain ESM.

## Verification

Journal: private canary **11**/11; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session throws `t`+`<`/`>`. Cadence this audit: full `sessions` at HEAD `b166de10` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. `toss_up` is the C body; `hitfloor` is live; `potionhit` is a pre-existing partial, not a new no-op. Idle `MITHRIL=15` does not change any vanilla helm. Swallow-before-dz is a named omit of an earlier `throwit` arm, not a false `toss_up`.

Named omits (map, not Must-fix):

1. throwit `u.uswallow` before `u.dz`; returning_missile ceiling-return; slip; stamina `dz=1`; steed potion `rn2(6)`
2. `can_blnd` Blindfolded / ublindf / visor; `ceiling()` vault/temple/shop/water/fire/quest; helm `"hat"`
3. `potionhit` remaining otyp; crackable `erode_obj`; `hard_helmet` should use mkobj `is_metallic` (MITHRIL=17) if a mithril/platinum helm ever exists

Do not Must-fix local `MITHRIL=15` on this SHA (no vanilla helm is 16/17). Do not Must-fix lock.js `dz=0` after getdir. Do not pull `display_self` this SHA.

## Callers / RNG ledger

C: `throwit` only. JS `throwit` from `dothrow`/`dofire`. First new roll is `rn2(5)` on `dz<0`. Public fortress is not evidence a Tourist threw `<`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `t`+`<` now runs live `toss_up` (`rn2(5)&&!Underwater`) and `>` uses `hitfloor(TRUE)`; swallow/returning/steed stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1274 `b166de10`.
