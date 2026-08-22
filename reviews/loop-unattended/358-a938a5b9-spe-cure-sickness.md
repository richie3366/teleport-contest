# Review 358 — a938a5b9 — spell.c SPE_CURE_SICKNESS healup+ill/slime (D-1398)

## Metadata
- Full / short hash: `a938a5b9c3d9fe2c70d0fbe1a064ca82baf8c045` / `a938a5b9`
- Parent: `f5e00af7` (D-1397). This file audits **this SHA only** (third of nine `js/` commits since review **355**). Archive **Addressed:** D-1398 `a938a5b9` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 22:47:03 +0200
- D-id: **D-1398**
- Stats: 10 files, +113 / −35 — `js/spell.js` +25 / −3 (SPE_CURE_SICKNESS arm); `js/potion.js` +11 / −4 (`healup` curesick).
- Claims to close: Open `spell.c` `spelleffects` SPE_CURE_SICKNESS (named from D-1397 / review **357**’s named omit at write time; **351** listed CURE after clairvoyance). Not jumping. `reviews/loop-2026-08-15/` has no unpaid cure-sickness Must-fix.
- JS / map: `spell.js` `spelleffects`; callee `potion.js` `healup` / `make_sick` / `make_vomiting` / `make_slimed`. `c-js-map/turns.md`. CURE_BLINDNESS / CHAIN / seffects / zap.js local `healup` still named.
- Prior reviews this SHA claims to close: **351** named CURE after JUMPING.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_CURE_SICKNESS so the spell actually cures illness/slime via healup, instead of printing Nothing happens.”

C `spell.c` `:1552–1567`:

```
        boolean was_sick = !!Sick, was_slimed = !!Slimed;
        healup(0, 0, TRUE, FALSE);
        if (was_sick || !was_slimed)
            You("are %s ill.", was_sick ? "no longer" : "not");
        if (was_slimed)
            make_slimed(0L, "The slime disappears!");
```

Callee `potion.c` `healup` `:1452–1455`: `make_vomiting(0L, TRUE)` then `make_sick(0L, NULL, TRUE, SICK_ALL)`. `make_sick` cure arm `:163–174`: `type & usick_type`; partial “somewhat better” else talk “cured.  What a relief!” then `Sick=0`. `make_slimed` `:195–218`: timeout 0 XOR-prints msg and `dealloc_killer(SLIMED)`. Spell still `return ECMD_TIME` after energy. `SICK_ALL` is `0x03` (`you.h`).

Comment table: sick+!slime → no longer ill; healthy → not ill; slime-only → skip ill, slime msg; both → no longer ill then slime msg.

Old JS: other-otyp `Nothing happens.`; `healup` curesick **zeroed `u.Sick`** without vomiting/sick helpers.

The diff **does** capture `!!Sick`/`!!Slimed`, call live `healup(0,0,true,false)`, the ill pline, and `make_slimed(0, ...)`. It **does** rewire potion.js `healup` curesick to live `make_vomiting` + `make_sick`. It does **not** port CURE_BLINDNESS, potion `peffects`, or zap.js’s local `healup` (`curesick → u.Sick=0`). Named. zap.c `zapyourself` SPE_HEALING passes **curesick FALSE** anyway (`:2911`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_CURE_SICKNESS arm | C `:1552–1567`, **wired** | capture then healup then plines |
| `healup` curesick | C `:1452–1455`, **wired** | potion.js |
| `make_vomiting` | C `:243–255`, **imported live** | nauseated talk |
| `make_sick` | C `:137–192`, **imported live** | not a `u.Sick=0` stub |
| `make_slimed` | C `:195–218`, **imported live** | U_AP green-slime named |
| `SICK_ALL` | C `0x03`, **wired** | const.js |
| `You("are %s ill.")` | C, **wired as pline** | same text |
| zap.js `healup` | C same function, **clone** | cycle; curesick still sticky-zero |
| CURE_BLINDNESS | C `:1549–1551`, **named omit** | this SHA |
| potion peffects / seffects | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none. `make_sick`/`make_vomiting`/`make_slimed` have no `rn2` on the cure-to-zero path.

## C ↔ JS fidelity

Capture **before** healup. `healup(0,0,true,false)` skips the HP block (`nhp==0`), skips cureblind, runs vomiting then sick. Match `:1553–1556` + `:1452–1455`.

Ill pline iff `was_sick || !was_slimed`. Strings “no longer” / “not”. Match `:1563–1564`. Slimed: `make_slimed(0, "The slime disappears!")` — JS prints only when timeout XOR-changes, same as C `:204–207`. Healthy: “You are not ill.” and no slime line. Match.

`make_sick(0, null, true, SICK_ALL)`: live function. Full cure (`usick_type` cleared) talks “cured.  What a relief!” **before** the spell’s ill pline. Partial mask talks “somewhat better.” Killer `dealloc` when `!Sick`. Match `:163–191`. Pre-existing JS cure guard is `(type & (usick_type || SICK_ALL))` vs C `(type & usick_type)`. When `usick_type` is already set (normal onset), both take the cure arm. When `Sick` is set with `usick_type==0`, JS still cures; C would skip. Named polish, not this SHA’s new helper.

`make_vomiting(0,true)`: Unaware silences talk (C `:247–248` live, not `#if 0`). “much less nauseated now.” if old timeout. Match.

`healup` sets botl. Spell returns TIME. `obfree` still omitted.

Hallucination check: “Match C `healup` / `make_sick`” while **those potion.js functions are live** is not a dispatch-stub lie. Do **not** stamp “Match C zap.js local healup.” Do **not** stamp “Match C SPE_CURE_BLINDNESS.” Do **not** stamp “Match C potion peffect_full_healing.”

## Hallucinations / overclaim

Subject says the spell cures illness/slime via healup instead of `Nothing happens.` **True on the keep-path** after energy (`was_sick`/`was_slimed` captured, helpers run, TIME). **True that healthy still says “not ill.”** **False until named for CURE_BLINDNESS / peffects / zap clone.** D-log “healthy not ill; sick cured+no longer ill+killer clear; slimed-only skip ill; sick+slimed both timeouts; vomiting nauseated+not ill” are the right falsifiers. Stamping **Addressed:** D-1398 for `:1552–1567` + `:1452–1455` is fair. Do **not** treat fortress PASS as a cure-sickness cast.

## Density

One `spelleffects` case plus the two-line `healup` curesick body it requires. ~36 lines of JS. Playbook §2b right size (callee already existed). Did not glue CURE_BLINDNESS. Did not rewrite zap.js’s copy.

## Branch-by-branch confirm

1. Healthy: vomiting/sick no-ops; “You are not ill.”; TIME. Match.
2. Sick, not slime: nauseated if Vomiting; “cured…” then “no longer ill.”; Sick 0; killer clear. Match.
3. Slime only: skip ill; “The slime disappears!”; Slimed 0. Match.
4. Both: ill line then slime line. Match.
5. JUMPING / CLAIRVOYANCE / FORCE_BOLT / HEALING / PROTECTION unchanged at this SHA. Match.
6. CURE_BLINDNESS still other-otyp at this SHA. Named.
7. zap.js SPE_HEALING still `curesick=false` so the sticky-zero arm is unused there. Named clone.
8. **Public-unhit** until a session casts cure sickness.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `SICK_ALL=0x03` is C. Plain ESM.

## Verification

Journal: private canary **18**/18 (C/JS grep; healthy not ill; sick cured+no longer ill+killer clear; slimed-only skip ill; sick+slimed both timeouts; vomiting nauseated+not ill; CURE_BLINDNESS / CHAIN still omit; JUMPING / CLAIRVOYANCE / FORCE_BOLT / HEALING / PROTECTION regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Fortress PASS is not cure sickness.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch calls live `healup`/`make_sick`/`make_slimed`; ill/slime branching matches `:1552–1567`.

Named omits (map / already-Open, not Must-fix):

1. SPE_CURE_BLINDNESS `healup(0,0,FALSE,TRUE)` (next SHA)
2. CHAIN / seffects / potion peffects
3. zap.js local `healup` curesick still `u.Sick=0` (cycle; SPE_HEALING passes FALSE)
4. `make_sick` cure guard `usick_type||SICK_ALL` vs C `type & usick_type` (pre-existing)
5. `make_slimed` U_AP green-slime appearance
6. `obfree(pseudo)`

Do not Must-fix “skip ‘not ill’ when healthy” (C prints it). Do not Must-fix “skip ‘cured’ talk” (C `talk=TRUE` inside healup **before** the ill pline). Do not Must-fix “cure blindness in this arm” (`cureblind` is FALSE). Do not Must-fix “zap SPE_HEALING should curesick” (C passes FALSE).

## Callers / RNG ledger

C this arm: no die. JS same. Public fortress never casts this envelope. Other `healup(..., true, ...)` callers now get vomiting+sick too (C same function).

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: SPE_CURE_SICKNESS now runs live `healup`/`make_sick`/`make_slimed` with C’s ill/slime lines; CURE_BLINDNESS and the zap.js copy stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1398 `a938a5b9` already stamped.
