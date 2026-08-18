# Review 170 — bd8c2161 — teleport.c `dotele` trap-at-feet teledest (D-1208)

## Metadata
- Full / short hash: `bd8c216189a6b1e0b4bafaa34242a12a9d3093f2` / `bd8c2161`
- Parent: `08d2e6b0` (D-1207). This file audits **this SHA only**. Archive row **Addressed:** D-1208 lacked the short hash; this review commit fills `bd8c2161`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 07:37:42 +0200
- D-id: **D-1208**
- Stats: 11 files, +191 / −67 — `js/teleport.js` +108 / −21; `js/trap.js` comment.
- Claims to close: Open queue `teleport.c` `dotele` trap-at-feet teledest (named from D-1133 / D-1153 / D-1206). Not `vault_tele` body. `reviews/loop-2026-08-15/` has no unpaid `dotele` Must-fix.
- JS / map: `teleport.js` `dotele` + local `u_locomotion`. `trap.js` comment. `c-js-map/turns.md`. LEVEL_TELEP yn / energy/spellcast / `dotelecmd` m-prefix still named. Next Open is m-prefix.
- Prior reviews this SHA claims to close: D-1206 “Did not pull `dotele` trap-at-feet”; D-1133 named dotele teledest as not `tele_trap` displace.

## Intent vs deliverable

Git subject promises: “Match C teleport.c dotele so a seen TELEP_TRAP at the hero's feet with a named teledest calls teleds, instead of always tele() and morehungry.”

Old JS: energy stub, then always `travelcc=0`, `tele()`, `morehungry(100)` with a comment that `if (!trap)` was C. C `teleport.c:1034–1161` reads `t_at`, ignores unseen, TELEP_TRAP jump / once-vault / `teleds(teledest)` **without** `tele_trap`’s `settrack`/displace, else `travelcc=0`+`tele()`, then `(void) next_to_u`, then `if (!trap) morehungry(100)`.

The diff **does** that trap envelope and the `!trap` hunger gate. It does **not** pull LEVEL_TELEP yn + `level_tele_trap(FORCETRAP)` (treats as declined), the hunger/STR/uen/capacity/`spelleffects` gate, or `dotelecmd` m-prefix. Named. Energy stays Teleportation fail-closed when `!trap && !break_the_rules`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `t_at` + `!tseen` → null | C site, **new** | `:1041–1043` |
| TELEP_TRAP jump pline | C site, **new** | `:1065–1066` |
| `u_locomotion` | **clone** of `hack.c:1817–1828` | Lev/Fly; poly `locomotion()` named |
| `trap_once` yn / `deltrap` / `newsym` | C site, **new** | `:1055–1063` |
| `vault_tele` | C callee, **imported** | D-1153 live |
| `teleds(teledest, TELEDS_TELEPORT)` | C callee, **imported** | **no** `tele_trap` displace |
| `tele` / `next_to_u` / `morehungry` | C callees, **imported** | hunger now gated `!trap` |
| LEVEL_TELEP yn | C sibling, **named omit** | fail-closed as `trap=null` |
| energy / `spelleffects` | C sibling, **named omit** | pre-existing fail-closed |
| `dotelecmd` menu | C caller, **named omit** | next Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** on the TELEP_TRAP arms (`y_n` is input). Unseen ignore does not roll.

Grep of this SHA’s `js/` hunks: `FORCETRAP` appears only in a **comment** naming the deferred LEVEL_TELEP call. Not a FORCE gate.

## C ↔ JS fidelity

### Trap classify vs `teleport.c:1041–1068`

C: `trap = t_at(u.ux,u.uy); if (trap && !trap->tseen) trap = 0`. Then LEVEL_TELEP+tseen → yn; `'y'` → `level_tele_trap(FORCETRAP); return 1`; else `trap=0`. Else TELEP_TRAP → save `trap_once = trap->once` **before** possible `deltrap`; once → vault pline + `y_n("Jump in?")=='n'` → `trap=0` else `deltrap`+`newsym` (pointer stays truthy). If `trap` still set, `You("%s onto the teleportation trap.", u_locomotion("jump"))`. Other ttyp → `trap=0`.

JS (`teleport.js:1850–1883`): same `t_at` / unseen. LEVEL_TELEP: **no yn**, `trap=null` (declined). TELEP_TRAP: `trap_once = !!trap.once`; once vault pline; `yn_function('Jump in?','yn','n')==='n'` → null; else `deltrap`+`newsym`. `deltrap` (`trap.js:1102–1107`) splices the list and **leaves the object**. Then if `trap`, pline `You ${u_locomotion('jump')} onto the teleportation trap.` Other ttyp → null. **Branch order matches except the named LEVEL_TELEP skip.**

`y_n` is `yn_function(query, ynchars, 'n', TRUE)` (`hack.h:1329`). JS 3-arg yn matches query/resp/default. Fourth `TRUE` is `addcmdq` (`cmd.c:5475`) — pre-existing every-`y_n` gap (review **159**). Space/ESC-with-`n` → `'n'` → decline. Only non-`'n'` jumps. C `== 'n'` same.

### `u_locomotion` vs `hack.c:1817–1828`

C: Levitation → `"float"`/`"Float"` from `*def==highc(*def)`; else Flying → fly; else `locomotion(youmonst.data, def)`. JS: Levitation / Flying clones already in this file (D-1070/D-1085 uprops H\|\|E, B blocks, steed flyer), then `defWord`. Call is `u_locomotion('jump')` lowercase, so C would not capitalize. Unpoly human `locomotion(..., "jump")` returns `"jump"` (`mondata.c:1380–1391` none of floater/flyer/slithy/amorphous/immobile/nolimbs). Poly small flyer without Flying youprop: C `"fly"`, JS `"jump"`. **Named omit**, not a silent fake of `locomotion()`. Do not Must-fix poly verbs (would steal m-prefix).

`You("%s onto…")` vs JS `pline(\`You ${verb} onto…\`)`: same awake string. After D-1207 both consume `msg_loc`.

### Dispatch vs `:1070–1161`

C after classify: `if (!trap && !break_the_rules)` energy/spellcast (JS: Teleportation fail-closed only — **named**, pre-existing). Then `if (next_to_u()) { if (trap && trap_once) vault_tele(); else if (trap && isok(teledest)) teleds(..., TELEDS_TELEPORT); else { travelcc=0; tele(); } (void) next_to_u(); } else { You(shudder); return 0; } if (!trap) morehungry(100); return 1`.

JS inverts the leash fail, then the same three arms, then `next_to_u`, then `if (!trap) morehungry(100)`. `isok(trap.teledest)` uses the live field (themerms / `mktrap` set `teledest: {x:-1,y:-1}` default; `isok` rejects x<1 so unnamed dest is `tele()` **with trap still truthy** → **no** hunger). C same (`isok` of unset dest).

**Not `tele_trap`.** D-1133 `tele_trap` does `settrack` + `enexto`/`rloc_to` displace then `teleds`. C `dotele` `:1147–1149` is `teleds` only. JS comment and code match. `vault_tele` is the D-1153 function (somexyspace VAULT else `tele()`). Live.

| Case | C | JS after |
|------|---|---------|
| unseen TELEP | treat as no trap; energy; `tele`; hunger | **same** |
| seen TELEP named dest | jump pline; `teleds`; no hunger; travelcc **kept** | **same** |
| seen TELEP unnamed | jump; `tele`; no hunger | **same** |
| once, Jump `n` | trap=0; energy; `tele`; hunger | **same** |
| once, Jump `y` | `deltrap`; jump; `vault_tele`; no hunger | **same** |
| PIT / other | trap=0 | **same** |
| LEVEL_TELEP `'y'` | `level_tele_trap`; return | **named omit** (declined) |
| LEVEL_TELEP `'n'` | trap=0; continue | JS always this |
| wizard `break_the_rules`, no trap | skip energy | **same** (`!trap && !break`) |
| no Teleportation, no trap | fail (JS) / spellcast (C) | **named** fail-closed |

Old JS billed hunger even on trap. That was the C-wrong this SHA removes.

`dotelecmd` (`:1933–1946`) is unchanged: non-wizard `dotele(false)`; wizard `ignore=true` even when `menu_requested` (m-prefix named). This SHA does not claim that menu.

### `next_to_u` / travelcc / hunger (order)

C `:1145–1160`: leash **success** wraps the three teleport arms, then `(void) next_to_u()`, then hunger. Leash **fail** shudders and returns 0 **before** hunger. JS: leash fail shudders and returns false first (same); success then arms then `next_to_u` then hunger. Match.

Travelcc zero only on the `else` arm (`tele()`), **not** on `vault_tele` / `teleds`. D-0789’s “always clear before `tele`” was correct for the old no-trap `dotele` and is now scoped like C. A named-dest trap no longer wipes `_` travel. That is the C rule, not a seed-shaped keep.

`morehungry(100)` only when `!trap`. After `deltrap` of a once-trap the **pointer** is still set, so C does not bill. JS splice-without-nulling matches. After Jump `n`, `trap` is 0/null so hunger **does** bill if the later `tele()` runs. Match.

### `u_locomotion` Lev/Fly clones in this file

`Levitation()` (`:208–213`): `(HLevitation\|\|ELevitation\|\|uprops[LEVITATION]) && !B`. Sticky `u.Levitation` is not a C field (D-1070). `Flying()` (`:220–227`): H\|\|E\|\|uprops[FLYING]\|\|steed `is_flyer`, `!B` (D-1085). C `u_locomotion` uses the same youprop macros then `locomotion(data, def)`. For a grounded tourist the clone returns `"jump"`. For lev/fly boots it returns `"float"`/`"fly"` like C. Poly form verbs are the named hole.

### What `tele_trap` would have done (must not)

D-1133 `tele_trap` (`teleport.js` ~2320): wrenching / once `vault_tele` **after** `next_to_u` sibling / named dest `settrack` + `enexto`/`rloc_to` displace **then** `teleds` / else `tele()`. C `dotele` does **not** call `tele_trap`. Using it would have been a C-wrong (monster on dest yanked). This SHA calls `teleds` directly. Correct.

### Anti-pattern grep (this SHA `js/`)

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCETRAP` in the hunk is the C flag name in a **comment** on the deferred LEVEL_TELEP arm, not a trace gate. `teledest.x/y` are trap fields, not hardcoded cells.

## Hallucinations / overclaim

Subject + D-1208 say seen TELEP_TRAP named dest → `teleds` not always `tele`+hunger. **Classify + dispatch + `!trap` hunger are the hunk.** Callees `teleds` / `vault_tele` / `tele` / `morehungry` / `next_to_u` / `deltrap` are live. This is **not** “Match C `dotele` energy/spellcast” and **not** “Match C `tele_trap` displace” and **not** “Match C LEVEL_TELEP yn.” `u_locomotion` is a Lev/Fly clone with poly named, not a no-op.

## Density

One C function family (`dotele` trap-at-feet + the `u_locomotion` helper it needs). Related LEVEL_TELEP yn stayed out. Right size. Not half of `teleport.c`.

## Branch-by-branch confirm (required: not “seems fine”)

C `dotele` after `t_at`:

1. Unseen → `trap=0`. JS `null`. No jump pline. Energy applies. `tele` + hunger. Match.
2. Seen LEVEL_TELEP → C yn. JS skip to declined (`trap=null`). Then same as (1) for the rest of `dotele`. **Named.** Must not `teleds` the level porter (would be a C-wrong). They did not.
3. Seen TELEP_TRAP, `once==0`, `isok(teledest)` → jump pline; skip energy; leash; `teleds`; leash; no hunger. Match.
4. Seen TELEP_TRAP, `once==0`, dest not isok → jump; skip energy; leash; travelcc=0; `tele`; leash; no hunger. Match.
5. Seen TELEP_TRAP, `once`, Jump `n` → `trap=0`; energy; leash; travelcc=0; `tele`; hunger. Match.
6. Seen TELEP_TRAP, `once`, Jump `y` → `deltrap`+`newsym`; jump; skip energy; leash; `vault_tele`; no hunger. Pointer still truthy so the `else if (teledest)` arm is **not** taken (`trap_once` first). Match.
7. Seen PIT/MAGIC_PORTAL/other → `trap=0`. Match.
8. `!next_to_u` → shudder, return 0, **no** hunger. Match.
9. `!trap && !break_the_rules && !Teleportation` → JS fail closed. C may `spelleffects`. **Named.**

No `rn2` on these new arms. `vault_tele` / `tele` / `teleds` keep their existing dice. `y_n` is input, not RNG.

`t_at` is the live trap-list lookup (not a glyph stand-in). `newsym` after `deltrap` is C `:1062`. JS calls imported `newsym`.

Review **168** named trap-at-feet as the next omit. This SHA is that omit. `tele_trap` / `vault_tele` comments in `teleport.js` / `trap.js` now point at D-1208 instead of “named omit dotele.” Comment-only in `trap.js` (no trapeffect change). Hero step-on still uses `tele_trap` displace. `^T` does not. That split is C.

Wizard `dotele(true)` with a seen TELEP_TRAP still takes the trap arms **before** the `!trap && !break_the_rules` energy skip. C same (`:1045` before `:1070`). Debug `^T` on a trap is not a free `tele()` that ignores the trap. Match.

## Verification

Private canary **20**/20 (named dest land+no hunger+travelcc kept; no Teleportation still lands on trap; unseen ignore; unnamed/`0,0` not isok; energy fail; no-trap hunger; PIT; LEVEL_TELEP declined; wizard `break_the_rules`; `next_to_u` shudder; Lev float / Fly fly / jump; once Jump n/y; H/E Teleportation; off-map trap). Green+strict seed8000/0900. Cohort **8**/8 + strict 1500/0012/0360/0361/4500/2200/0014/0004. **Public-unhit** unless `^T` on a seen TELEP_TRAP. Admit that.

## Actionable C-wrongs

Named omits (map / next Open), not Must-fix:

1. `dotele` LEVEL_TELEP yn + `level_tele_trap(FORCETRAP)` — fail-closed as declined; do not silently `teleds` a level porter.
2. Non-wizard energy/spellcast (hunger/STR/`uen`/capacity/`spelleffects`) — keep Teleportation fail-closed when `!trap`.
3. `u_locomotion` poly `locomotion(youmonst.data, def)` — Lev/Fly youprop match the unpoly public path.
4. `dotelecmd` m-prefix mode menu — **next Open**, not this SHA.

`addcmdq` on `y_n` is pre-existing yn clone debt (review **159**).

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a seen TELEP_TRAP at the hero’s feet now follows C’s `teleds`/vault/`!trap` hunger split instead of always `tele()`+`morehungry`; LEVEL_TELEP yn and energy/spellcast stay named, not Must-fix.
- Must-fix stays empty for this SHA; fill **Addressed:** D-1208 `bd8c2161`. Next port is already Open `dotelecmd` m-prefix. Not energy gate, not `tele_trap` displace.
