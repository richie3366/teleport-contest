# Review 357 — f5e00af7 — spell.c SPE_JUMPING jump(max skill) (D-1397)

## Metadata
- Full / short hash: `f5e00af7b66bdb14278f8812d8df15de7423ab30` / `f5e00af7`
- Parent: `66018a5a` (D-1396). This file audits **this SHA only** (second of nine `js/` commits since review **355**). Archive **Addressed:** D-1397 `f5e00af7` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 22:37:46 +0200
- D-id: **D-1397**
- Stats: 10 files, +161 / −119 — `js/spell.js` +25 / −8 (SPE_JUMPING arm); `js/apply.js` +31 / −10 (magic ustuck + air/waterlevel).
- Claims to close: Open `spell.c` `spelleffects` SPE_JUMPING (named from D-1391 / review **351**). Not clairvoyance. `reviews/loop-2026-08-15/` has no unpaid jumping Must-fix.
- JS / map: `spell.js` `spelleffects`; callee `apply.js` `jump` (D-0899 physical). `c-js-map/turns.md`. CURE / CHAIN / seffects / `#jump` known_spell / trap-escape / `hurtle_jump` still named.
- Prior reviews this SHA claims to close: **351** named SPE_JUMPING after clairvoyance.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_JUMPING so the spell actually calls jump(max(role_skill,1)), instead of printing Nothing happens.”

C `spell.c` `spelleffects` `:1584–1587`:

```
    case SPE_JUMPING:
        if (!(jump(max(role_skill, 1)) & ECMD_TIME))
            pline1(nothing_happens);
        break;
```

Then `:1597–1602` `use_skill` + `obfree` + **always** `return ECMD_TIME` (energy already spent). `role_skill` is `P_SKILL` (`skills.h` restricted=0, unskilled=1); `max(...,1)` so a restricted escape skill still jumps at 1.

Callee `apply.c` `jump` `:1988–2163` (`magic==0` physical `#jump`, else spell skill). Magic-relevant early outs this SHA touched: ustuck tame `!Conflict && !mconf` `set_ustuck(0)` pull-free TIME (`:2023–2030`); else magic writhe TIME (`:2031–2033`); else physical cannot-escape OK (`:2035–2036`); `Levitation || Is_airlevel || Is_waterlevel` magic flail TIME (`:2037–2043`). Swallow bounce / water swish already existed in JS (D-0899). Physical-only gates (`known_spell` fallback, nolimbs/slithy, stucksteed, encumbrance, hunger/STR, Wounded_legs) do not run when `magic!=0`.

Old JS: other-otyp `Nothing happens.`; `jump()` already live for `#jump`; **magic ustuck always** `"cannot escape"` **ECMD_OK** (spell would then print Nothing happens). Lev/flail lacked air/waterlevel so a magic jump there fell through to getpos.

The diff **does** dispatch `jump(max(role_skill,1))` via dynamic `import('./apply.js')` and print `nothing_happens` when the return lacks `ECMD_TIME`. It **does** port tame pull-free, magic writhe, and air/waterlevel on the Lev gate. It does **not** port `#jump` `known_spell` fallback, trap-escape, or `hurtle_jump`. Named. Success path still `walk_path(..., () => true)` then `teleds` (D-0899 stub).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_JUMPING arm | C `:1584–1587`, **wired** | max skill then !TIME → nothing_happens |
| `jump` | C `:1988–2163`, **imported live** | apply.js D-0899 + this SHA’s magic arms |
| `set_ustuck` | C `mon.c`, **imported live** | mhitu.js clears swallow on null |
| `hero_conflict` | C `Conflict` (`H\|\|E`), **imported live** | mondata.js (also worn ring) |
| `Is_airlevel` / `Is_waterlevel` | C, **imported live** | const.js |
| `nothing_happens` | C `"Nothing happens."`, **wired** | const.js |
| `ECMD_TIME` | C `0x01`, **wired** | |
| Levitation test | C `youprop.h` `(H\|\|E)&&!B`, **clone** | sticky `u.Levitation\|\|H\|\|E`; **skips `BLevitation`**; same-file `Levitation_apply()` unused |
| `#jump` known_spell | C `:1992–1994`, **named omit** | physical only |
| nolimbs / slithy / stucksteed | C `:1996–2008`, **named omit** | physical only |
| trap-escape / `hurtle_jump` | C `:2076–2152`, **named omit** | D-0899 |
| CURE / CHAIN / seffects | C later cases, **named omit** | this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the new early-outs. Success path still `morehungry(rnd(25))` (D-0899). Trap-escape `rnd`/`rn1` not this SHA.

## C ↔ JS fidelity

Energy / WIS / `mksobj` still run before the otyp switch. `magiclevel = max(role_skill,1)` is at least 1, so `jump` skips `!magic && !Jumping`. Dynamic import is in-process (apply→weapon→spell cycle). Match `:1584–1587`.

`!TIME` (OK / CANCEL / FAIL) prints `Nothing happens.` then spelleffects still `use_skill` + `return ECMD_TIME`. Match `:1585–1586` + `:1597–1602`. `obfree(pseudo)` still omitted (same as sibling spell arms).

Swallow magic: bounce TIME (pre-existing). Water magic: swish TIME (pre-existing). Match `:2009–2022`.

Ustuck tame `!hero_conflict && !mconf`: `set_ustuck(null)`, pull-free, TIME — **physical and magic**. Hostile/confused magic: writhe TIME. Physical hostile: cannot-escape OK. Match `:2023–2036`. This is the keep-path that old JS got wrong (always OK).

Lev / air / water: magic flail TIME; physical traction OK. `Is_airlevel(u.uz)` / `Is_waterlevel(u.uz)` match C’s `&u.uz`. **Gap:** C `Levitation` is `(HLevitation \|\| ELevitation) && !BLevitation`. JS uses `u.Levitation \|\| H \|\| E` **without** `B`. Same-file `Levitation_apply()` already has `!B`. Blocked levitation (boots on, `BLevitation` set) C continues to getpos; JS still flails. Worn ELevitation still flails (C same). Named clone, not a dispatch stub.

getpos ESC → CANCEL → nothing_happens + spell TIME. Invalid dest FAIL same. Success: range chebyshev, `teleds`, `nomul(-1)`, `rnd(25)` hunger, TIME. `hurtle_jump` still always-true stub. Match the D-0899 success envelope, not `:2136–2152`.

Hallucination check: “Match C `jump(max(role_skill,1))`” while **`jump` is the live apply.js function** is not a dispatch-stub lie. Magic swallow/water/ustuck/air/waterlevel returns are real TIME plines. Do **not** stamp “Match C `hurtle_jump`.” Do **not** stamp “Match C `#jump` known_spell fallback.” Do **not** stamp “Match C SPE_CURE_SICKNESS.” Do **not** stamp “Match C `Levitation` including `!BLevitation`.”

## Hallucinations / overclaim

Subject says the spell calls `jump(max(role_skill,1))` instead of `Nothing happens.` **True on the keep-path** after energy. **True that !TIME still prints nothing_happens while the spell turn is spent.** **False until named for trap-escape / hurtle / known_spell #jump.** D-log “swallow bounce; water swish; Lev/air flail; hostile writhe; tame pull-free; getpos ESC Nothing happens + TIME; physical jump(0) still can’t” are the right falsifiers. Stamping **Addressed:** D-1397 for `:1584–1587` + `:2023–2043` is fair. Do **not** treat fortress PASS as a jumping cast.

## Density

One `spelleffects` case plus the magic ustuck / air-waterlevel arms of the callee it now reaches. ~56 lines of JS. Playbook §2b right size. Did not glue CURE. Did not rewrite `confer_oc_oprop`. Did not add trailing `confdir` to `getdir`.

## Branch-by-branch confirm

1. Cast, not swallowed/water/stuck/Lev: getpos. ESC → nothing_happens + TIME. Match.
2. Swallowed magic: bounce TIME; no nothing_happens. Match.
3. `uinwater` magic: swish TIME. Match.
4. Hostile ustuck magic: writhe TIME (old JS cannot-escape OK). Match.
5. Tame `!Conflict !mconf`: pull-free TIME. Match.
6. Lev or air/waterlevel magic: flail TIME. Match C macro **except** `BLevitation`.
7. `jump(0)` still “can’t jump very far” without Jumping. Match physical.
8. CLAIRVOYANCE / FORCE_BOLT / HEALING / PROTECTION unchanged at this SHA. Match.
9. CURE / CHAIN still other-otyp at this SHA. Named.
10. **Public-unhit** until a session casts jumping.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./apply.js')` is in-process ESM. Plain ESM.

## Verification

Journal: private canary **18**/18 (C/JS grep; IMMEDIATE escape; swallow bounce; water swish; Lev/air flail; hostile writhe; tame pull-free; getpos ESC Nothing happens + TIME; physical jump(0) still can’t; CURE still omit; CLAIRVOYANCE / FORCE_BOLT / HEALING / PROTECTION regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Fortress PASS is not a jumping spell.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch calls live `jump`; magic ustuck/air/waterlevel match `:2023–2043` except the inherited Levitation `B` gap.

Named omits (map / already-Open, not Must-fix):

1. `#jump` `known_spell(SPE_JUMPING)` fallback (`:1992–1994`)
2. nolimbs / slithy / stucksteed / encumbrance / hunger / Wounded_legs (physical)
3. trap-escape (`:2076–2112`) / same-spot Hallu hop / steed `YMonnam`
4. `hurtle_jump` (always-true `walk_path` stub)
5. `jump` Levitation should use `Levitation_apply()` / `!BLevitation` (youprop.h `:240`; same-file helper unused)
6. CURE_SICKNESS / CURE_BLINDNESS / CHAIN / seffects (later SHAs)
7. `obfree(pseudo)`

Do not Must-fix “print nothing_happens on writhe” (C writhe is TIME). Do not Must-fix “physical cannot-escape on magic ustuck” (C writhes). Do not Must-fix “recurse known_spell from the spell” (C fallback is `!magic` only). Do not Must-fix “skip flail on airlevel” (C flails).

## Callers / RNG ledger

C these new arms: no die. JS same. Success `rnd(25)` is D-0899. Public fortress never casts this envelope. `#jump` sessions still use `jump(0)`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: SPE_JUMPING now calls live `jump(max(skill,1))` with C’s magic ustuck/air flail TIME; hurtle/trap-escape and `!BLevitation` stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1397 `f5e00af7` already stamped.
