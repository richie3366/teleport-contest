# Review 211 — 7f54b762 — dokick.c `container_impact_dmg` dropz/throwit (D-1249)

## Metadata
- Full / short hash: `7f54b76293ae9c643c8f30d6f967e88a58e1d1cb` / `7f54b762`
- Parent: `6e18c402` (D-1248). This file audits **this SHA only**. Archive row **Addressed:** D-1249 lacked the short hash; this review commit fills `7f54b762`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 02:47:24 +0200
- D-id: **D-1249**
- Stats: 13 files, +111 / −46 — `js/do.js` +10 / −4; `js/dothrow.js` +13 / −6; `js/dokick.js` +6 / −2; comments `js/hack.js`.
- Claims to close: Open `hack.c` `container_impact_dmg` (queue wording; C is `dokick.c`, named from D-1229 / review **191** / **207**). Not hideunder. `reviews/loop-2026-08-15/` has no unpaid impact Must-fix.
- JS / map: export `dokick.js` helper (D-0989 kick Is_box); `do.js` `dropz`; `dothrow.js` throwit land; `c-js-map/debt.md` / `turns.md`. hitfloor `dropz(TRUE)` still named.
- Prior reviews this SHA claims to close: **191** named omit `container_impact_dmg` at the impact_disturbs sites.

## Intent vs deliverable

Git subject promises: “Match C dokick.c container_impact_dmg so an impact-dropped or thrown container can shatter glass and crack eggs inside, instead of leaving contents untouched after place.”

C `container_impact_dmg` (`dokick.c:412–485`): skip if `!Is_container || !Has_contents || Is_mbag`; shop `costly`/`insider`/`frominv=(obj!=kickedobj)`; walk `cobj`/`nobj`; glass (not GEM) `!obj_resists(33,100)` shatter, or EGG `!rn2(3)` cracking; luck on mirror/yours-egg; `You_hear` muffled; shop `stolen_value`; `quan>1` `useup` else extract+`obfree`; `cknown=0`; reweight; angry shk / owe. Callers: `do.c:831` `if (with_impact)` after `place_object` before `impact_disturbs_zombies`; `dothrow.c:1828–1831` `!IS_SOFT(levl[bhitpos])` then `container_impact_dmg(obj, u.ux, u.uy)` — **throw origin, not `gb.bhitpos`** — then impact TRUE. Kick Is_box `:655` already live (D-0989). Kick land / obstructed-loose have **no** C call (only impact_disturbs).

Old JS: helper local to `dokick.js`; `dropz`/`throwit` named skip after D-1229.

The diff **does** export + those two callers with C coordinates. It does **not** change the helper body (except comments), pull hitfloor `dropz(TRUE)` (JS `mkobj.js` still `dropy`), or add a kick-land call C lacks. Named: `useup` vs `quan--`, `inside_shop`, Soundeffect.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `container_impact_dmg` export | C `:412–485`, **already live** (D-0989) | body unchanged this SHA |
| `dropz` `with_impact` | C `do.c:831`, **wired** | after `place_object`, before impact_disturbs |
| throwit `!IS_SOFT` | C `dothrow.c:1828–1831`, **wired** | coords `u.ux,u.uy` not land cell |
| kick Is_box | C `:655`, **already wired** | not this SHA |
| kick land / obstructed-loose | C no call, **correct skip** | impact_disturbs only |
| `IS_SOFT` | C `rm.h`, **imported live** | AIR/CLOUD/pool |
| `impact_disturbs_zombies` | C `hack.c`, **already live** | D-1229 |
| `useup` / `obfree` / `inside_shop` / Soundeffect | C body polish, **named omit** | pre-existing helper |
| hitfloor `dropz(TRUE)` | C other caller, **named omit** | JS still `dropy` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG this SHA** (glass `obj_resists(33,100)` / egg `!rn2(3)` already in the helper). Nesting `place_object` inside the `ship_object` block is the same control flow as C (`ship_object` success returns before place).

## C ↔ JS fidelity

Pinned C throwit (`dothrow.c:1828–1831`):

```
        if (!IS_SOFT(levl[gb.bhitpos.x][gb.bhitpos.y].typ)) {
            /* <x,y> is spot where you initiated throw, not gb.bhitpos */
            container_impact_dmg(obj, u.ux, u.uy);
            impact_disturbs_zombies(obj, TRUE);
        }
```

JS throwit land: `ship_object` then `place_object` then `!IS_SOFT(land.typ)` → `container_impact_dmg(obj, u.ux, u.uy)` then `impact_disturbs_zombies(obj, true)`. Shop `costly`/`stolen_value` therefore use the throw origin, not the landing cell. Match the C comment, not a “use bhitpos because that’s where it broke” rewrite.

Pinned C `dropz` (`do.c:829–832`):

```
        place_object(obj, u.ux, u.uy);
        if (with_impact)
            container_impact_dmg(obj, u.ux, u.uy);
        impact_disturbs_zombies(obj, with_impact);
```

JS: same order. Swallow `dropz` still returns before place (C swallow arm has no impact call). `dropz(FALSE)` / `dropy` still skip the helper. Match.

Kick land in `dokick.js` (~1239–1244) still only `impact_disturbs_zombies(..., true)` after place — **no** new `container_impact_dmg`. C kick land `:785–786` is the same. Is_box `:1254` still calls the helper at kick dest `(x,y)`. Match D-0989.

Callee body (unchanged): `frominv = obj !== game.kickedobj` matches C `obj != gk.kickedobj`. Glass/egg RNG order matches. `You_hear` muffled is the local dokick clone (Deaf; Unaware/Underwater named). `quan>1` decrements instead of `useup`; extract does not `obfree`. D-log names that polish. `insider` compares `ushops[0]` to `in_rooms` without live `inside_shop(u.ux,u.uy)` — also named this iter, not a new silent skip. Helper is **not** a no-op: kick already shattered; this SHA makes drop/throw reach it.

`IS_SOFT` is `const.js` AIR/CLOUD/pool, matching C. Soft land: no container call, no impact_disturbs. Match.

## Hallucinations / overclaim

Subject + D-1249 say impact-drop and hard-terrain throw can shatter contents. **Export + two C callers with origin coords are the hunk.** Stamping **Addressed:** D-1249 is fair. This is **not** “Match C dispatch, callee is a stub”: the callee is the D-0989 function, not `return`. Do **not** stamp “Match C hitfloor `dropz(TRUE)`” or “Match C `useup` on contained quan>1” or “Match C `inside_shop`.” Queue said `hack.c` because D-1229 named the sibling; C lives in `dokick.c` and the callers are `do.c` / `dothrow.c`.

## Density

Two C call sites of an already-ported helper. ~20 JS lines. Small but the right cluster (not a third unrelated subsystem). Did not glue AT_HUGS or mimic unhide.

## Branch-by-branch confirm

1. `dropz(obj, true)` chest with glass: place, helper, then impact_disturbs. Match.
2. `dropz(obj, false)` / `dropy`: no helper. Match.
3. Throw onto ROOM/CORR: helper at `u.ux,u.uy`, impact TRUE. Match.
4. Throw onto pool (`IS_SOFT`): neither helper nor impact. Match.
5. `ship_object` eats the missile: return before place/helper. Match.
6. Kick flying land: impact_disturbs only. Match C (no container call).
7. Kick Is_box in place: helper at dest (pre-existing). Match.
8. `Is_mbag` / empty: helper returns. Match (unchanged body).
9. Swallow drop: no helper. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `u.ux,u.uy` is C’s throw-origin argument, not a recorded session coordinate. Plain ESM.

## Verification

Journal: private canary **19**/19 (C 3 callers; throw origin coords; kick land skip; dropz true shatter; dropy keep; mbag skip; empty skip; egg crack; GEM skip; swallow skip); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a glass/egg container is impact-dropped or thrown onto hard terrain. Cadence this audit: full `sessions` at HEAD `7f54b762`.

## Actionable C-wrongs

None for Must-fix. Dispatch through the live helper. `quan--` / `inside_shop` / Soundeffect are named helper debt (D-0989), not a wrapper that skips shatter.

Named omits (map, not Must-fix):

1. hitfloor `dropz(TRUE)` (JS `mkobj.js` still `dropy`)
2. `useup` vs `quan--`; `obfree`; `inside_shop(u.ux,u.uy)`
3. Soundeffect se_egg_cracking / se_glass_shattering (contest empty)

Do not Must-fix “kick land skipped container_impact.” Do not pull AT_HUGS.

## Callers / RNG ledger

C: dropz `with_impact`; throwit `!IS_SOFT` at origin; kick Is_box. JS those three; kick land correctly omitted. RNG stays inside the helper (pre-existing). Public fortress is not evidence a thrown chest shattered.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `dropz(TRUE)` and hard-terrain throwit now call live `container_impact_dmg` at C’s coordinates; hitfloor `dropz(TRUE)` stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1249 `7f54b762`.
