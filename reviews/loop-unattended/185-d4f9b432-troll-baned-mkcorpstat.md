# Review 185 — d4f9b432 — mhitm.c `mdamagem` `troll_baned` `mkcorpstat_norevive` (D-1223)

## Metadata
- Full / short hash: `d4f9b432cdcb5350c250c019d479e8bdc586ca0f` / `d4f9b432`
- Parent: `7b0f9da7` (D-1222). This file audits **this SHA only**. Archive row **Addressed:** D-1223 `d4f9b432` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 18:57:06 +0200
- D-id: **D-1223**
- Stats: 10 files, +137 / −52 — `js/mhitm.js` +28 / −6.
- Claims to close: Open `mhitm.c` `troll_baned` `mkcorpstat_norevive` (named from D-1211 / review **173**). Not gulpmm. `reviews/loop-2026-08-15/` has no unpaid troll-bane Must-fix.
- JS / map: `mhitm.js` `troll_baned` + `mdamagem_monkilled`. `c-js-map/data.md`. gulpmm `m_at` swap / uhitm `hmon_hitmon` + `hmonas` still named.
- Prior reviews this SHA claims to close: **173** actionable item 1 (`troll_baned` around the same `monkilled`).

## Intent vs deliverable

Git subject promises: “Match C mhitm.c mdamagem troll_baned so a Trollsbane AT_WEAP/AT_CLAW kill copies mkcorpstat_norevive onto the troll corpse, instead of leaving the revive-ban unset.”

C after `mdef->mhp < 1` (`mhitm.c:1081–1090`): if `AT_WEAP || AT_CLAW`, `gm.mkcorpstat_norevive = troll_baned(mdef, mwep) ? TRUE : FALSE`; then `gz.zombify = …`; `monkilled`; reset **both** flags. Macro (`monst.h:247–248`): victim `S_TROLL` and `o && o->oartifact == ART_TROLLSBANE`. `mkcorpstat` (`mkobj.c:2087`) copies `otmp->norevive = gm.mkcorpstat_norevive`. `revive()` (`zap.c:967–972`) fails (twitch) when `corpse->norevive`.

Old JS `mdamagem_monkilled` set only `game.zombify`. The diff **does** add `troll_baned`, set the env flag on WEAP/CLAW, reset after `monkilled`. It does **not** pull gulpmm swap or uhitm. Named.

The diff does **not**: change `mkcorpstat` itself; skip troll `rn2` revive timers when `norevive`; set the flag on AT_BITE/AT_TUCH; import `troll_baned` into `uhitm.js`. `revive()` twitch at `zap.js:2368` is pre-existing, which is why the env flag is not a stub.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `troll_baned` | C macro → JS function, **new** | `mlet === 'S_TROLL'` + `oartifact === ART_TROLLSBANE` |
| `ART_TROLLSBANE` | generated `artilist.h` | 17; Trollsbane is the 17th artifact |
| `mdamagem_monkilled` | C site `:1081–1090`, **extended** | both JS death sites already used this helper (D-1211) |
| `game.mkcorpstat_norevive` | C `gm.mkcorpstat_norevive` | `mkcorpstat` already copies (pre-existing) |
| `revive()` `corpse.norevive` | C callee, **already live** | `zap.js:2368` twitch + return null |
| gulpmm `m_at` swap | C sibling `:1075–1080`, **named omit** | before the wrap |
| uhitm `hmon_hitmon` / `hmonas` | C other functions, **named omit** | `:1906–1909` / `:4866–4880` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** in this hunk. Troll `start_corpse_timeout` still `rn2(TROLL_REVIVE_CHANCE)` per C even when `norevive` (ban is at `revive()`, not at timer start).

## C ↔ JS fidelity

Pinned C (`monst.h:247–248` + `mhitm.c:1081–1090`):

```
#define troll_baned(m,o) \
    ((m)->data->mlet == S_TROLL && (o) && (o)->oartifact == ART_TROLLSBANE)

        if (mattk->aatyp == AT_WEAP || mattk->aatyp == AT_CLAW)
            gm.mkcorpstat_norevive = troll_baned(mdef, mwep) ? TRUE : FALSE;
        gz.zombify = (!mwep && zombie_maker(magr) && …);
        monkilled(mdef, "", (int) mattk->adtyp);
        gz.zombify = FALSE;
        gm.mkcorpstat_norevive = FALSE;
```

JS (`mhitm.js:1111–1135`): same WEAP/CLAW gate; `troll_baned(mdef, mwep)`; zombify formula unchanged; `await monkilled`; reset **both**. `aatyp === AT_BITE` does not set the env flag (C leaves it as leftover, then always clears after). JS same. AT_CLAW with `mwep == null`: `(o) &&` is false → flag false. Match (bare claw is not Trollsbane).

`ART_TROLLSBANE = 17` from `artilist.h` order (Excalibur=1 … Trollsbane). Match generated table.

`artilist.h:182` `A("Trollsbane", MORNING_STAR, (SPFX_RESTR | SPFX_DCLAS | SPFX_REGEN), …)`. Artifact index is 1-based after `ART_NONARTIFACT=0`. JS `artifacts_data.js` `ART_TROLLSBANE = 17` sits after Giantsbane/Ogresmasher. Match. `o.oartifact` is that index, not a name string.

`hitmm` passes `MON_WEP(magr)` into `mdamagem` only for `AT_WEAP` in C. JS `hitmm` → `mdamagem(magr, mdef, mattk, mwep, dieroll)` with the same `mwep` the attack loop already had. Claw attacks typically have `mwep` null unless a future peel passes the wielded weapon on AT_CLAW (C mhitm does not). Match C monster-vs-monster.

`mkcorpstat` (`mkobj.js:2337–2338`): `if (game.mkcorpstat_norevive) otmp.norevive = 1`. C assigns the boolean every time. New `mksobj` corpse starts `norevive` 0/undefined, so “set only if true” ≡ assign. Cancelled non-rider still forces `norevive = 1` after. Match.

Timer: C `start_corpse_timeout` troll arm does **not** test `norevive` (`mkobj.c:1418–1424`); zombify arm does (`:1425–1426`). Comment `:1398–1400`: when REVIVE_MON **fires**, a `norevive` corpse rots instead of reviving. That is `revive()` (`zap.c:967`) failing, then `revive_mon` starting `ROT_CORPSE` (`do.c:2277–2290`). JS `revive()` and `revive_mon` already do that. **The callee is live.** This is not “Match C dispatch, `norevive` is a stub.”

Both JS `mdamagem` death sites (AD_POLY leftover HP + ordinary HP) go through `mdamagem_monkilled`. C is one site in unified `mdamagem`. Same sandwich. Match D-1211 shape.

`grow_up` after death is still a JS `mdamagem` partial (C tests `DEADMONSTER` / AD_DGST). Pre-existing, not this flag.

C `uhitm.c:1906–1909` (`hmon_hitmon`): `if (troll_baned(mon, obj)) gm.mkcorpstat_norevive = TRUE;` then `killed(mon);` then FALSE. That sets TRUE only (does not force FALSE when the weapon is not Trollsbane). C `hmonas` (`:4866–4880`) matches mhitm’s WEAP/CLAW ternary with `uwep`. JS `troll_baned` is **exported** but uhitm does not import it this SHA. Hero Trollsbane still named.

`norevive` is `oeroded2` in `obj.h` (frozen-corpse overlay). JS is a boolean/1 field. `zap.c:1188` comment: norevive applies to the **revive timer**, not `unturn_dead()`. JS `zap.js` already save/restore `norevive` around unturn. This SHA does not touch that.

`make_corpse` → `mkcorpstat` is the path `monkilled`/`mondied` already use. Flag must be true **during** `mkcorpstat`, then cleared so a later pudding glob does not inherit it. JS reset is immediately after `await monkilled`, still inside the helper, before `grow_up`. C resets before the lifesave/`AD_DGST` checks. If JS `monkilled` awaited a `--More--` and another corpse was created, the flag would still be true — same as C during the call. After return, false. Match.

## Hallucinations / overclaim

Subject + D-1223 say a Trollsbane AT_WEAP/AT_CLAW **mon-vs-mon** kill copies `mkcorpstat_norevive` onto the troll corpse. **The wrap is the hunk.** `mkcorpstat` / `revive()` already honor the field. Stamping **Addressed:** D-1223 is fair. Do **not** stamp “Match C uhitm `killed(mon)` Trollsbane” or “Match C gulpmm `m_at` swap” or “Match C `hmonas` two-weapon FIXME.”

Hero killing a troll with Trollsbane still uses uhitm (named). That corpse can still get a REVIVE_MON timer and succeed `revive()` if `norevive` stays 0. Named omit, not a fake mhitm flag.

## Density

One C site family (the `troll_baned` sandwich on the same `monkilled` D-1211 already wrapped). ~28 lines. Right size. Did not glue gulpmm or uhitm.

## Branch-by-branch confirm

1. AT_WEAP, Trollsbane, S_TROLL, `mwep` set: flag true across `monkilled` → corpse `norevive=1` → later `revive()` twitch. Match.
2. AT_CLAW, Trollsbane wielded as `mwep`: C `hitmm` passes `MON_WEP` only on AT_WEAP; claw starts `mwep` null → `troll_baned` false. JS same if callers pass null on claw. Match monster-vs-monster (uhitm `hmonas` uses `uwep` on claw — **named** C difference).
3. AT_BITE: flag not set this call; always cleared after. Match.
4. Non-troll + Trollsbane: `mlet` not S_TROLL → false. Match.
5. Troll + ordinary weapon: `oartifact` not Trollsbane → false. Match.
6. Barehand zombie_maker TUCH on troll: zombify may set; troll_baned false (no `o`). `norevive` 0 unless cancelled. Match.
7. Flag reset even if `monkilled` lifesaves (C still resets). JS resets after await. Match.
8. gulpmm occupancy still wrong if magr occupies mdef cell. **Named.**
9. Troll + Trollsbane AT_WEAP: `start_corpse_timeout` still rolls `rn2(TROLL_REVIVE_CHANCE)` (C `:1418–1424`). Ban is at `revive()`, not by skipping the timer. Match extra RNG.
10. Zombie_maker bite on human: zombify arm tests `!body.norevive` (`mkobj.c:1425–1426`). Troll_baned false on bite → zombify can still queue. Match.
11. `ART_TROLLSBANE` vs `o.oartifact | 0`: C `== ART_TROLLSBANE`. Non-artifact 0 ≠ 17. Match.
12. Null `m`/`m.data`: JS returns false. C macro would crash. JS-safe, not a gameplay C-wrong (callers pass a live `mdef`).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `ART_TROLLSBANE` is extracted, not a seed-shaped artifact id.

## Verification

Journal: private canary **18**/18 (WEAP Trollsbane troll `norevive` + twitch; claw null mwep; bite unset; non-troll; reset after; zombify still sets on barehand; cancelled troll still `norevive`); green+strict seed8000/0900; cohort **5**/5 + strict 1500/1800/0012/0004/0007. **Public-unhit** unless a monster kills a troll with Trollsbane. Admit that. Cadence this audit: fortress **44**/44.

## Actionable C-wrongs

None for Must-fix. The mhitm sandwich matches C; uhitm is a different function.

Named omits (map, not Must-fix):

1. gulpmm `m_at` swap before this wrap (`mhitm.c:1075–1080`)
2. `uhitm.c` `hmon_hitmon` `troll_baned` around `killed` (`:1906–1909`)
3. `uhitm.c` `hmonas` `troll_baned` `AT_WEAP\|\|AT_CLAW` around `killed` (`:4866–4880`; C FIXME vs two-weapon)

Do not Must-fix “finish `mdamagem` AD_DGST.” Do not skip the always-reset.

## Callers / RNG ledger

C callers of `troll_baned`: `mhitm.c mdamagem`, `uhitm.c hmon_hitmon`, `uhitm.c hmonas`. This SHA wires the first. `mkcorpstat` is reached via `monkilled` → `mondied` → `make_corpse` (already D-0167/D-1211). No new `rn2` in the helper. Troll revive-timer `rn2(TROLL_REVIVE_CHANCE)` still runs (C). `revive()` twitch has no RNG. Public sessions do not wield Trollsbane against a troll; fortress is not evidence the flag is live — the C walk + `zap.js:2368` is.

`game.mkcorpstat_norevive` vs C `gm.` — JS `gstate` bag, same env-flag pattern as `game.zombify` (D-1211). Do not invent a second global.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `mdamagem` now sets and clears `mkcorpstat_norevive` from `troll_baned` around `monkilled` like C, and `revive()` already honors `norevive`; hero Trollsbane and gulpmm swap stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1223 `d4f9b432`.
