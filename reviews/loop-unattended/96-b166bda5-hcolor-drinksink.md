# Review 96 — b166bda5 — do_name hcolor Hallucination drinksink (D-1135)

## Metadata
- Full / short hash: `b166bda5c091f978a757b48ac3c14f5161e16fc8` / `b166bda5`
- Parent: `5f55ceba` (D-1134). This file audits **this SHA only**. Archive row **Addressed:** D-1135 `b166bda5` was filled by D-1136.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 04:47:58 +0200
- D-id: **D-1135**
- Stats: 12 files, +142 / −50 — `js/do_name.js` +33 (`hcolors[]` + `hcolor`); `js/fountain.js` +14 / −6 (import; delete identity stub).
- Claims to close: Open queue `do_name.c` `hcolor` Hallucination drinksink synonyms (named). Not hliquid. Review **86** named omit 2 / **85** named hcolor; D-1134 next-port. `reviews/loop-2026-08-15/` has no open hcolor Must-fix.
- JS / map: `do_name.js` `hcolor` / `hcolors[]`; `fountain.js` `drinksink` case 4. `c-js-map/data.md` fountain; `turns.md` do_name. sit/apply/pray/detect/do/wield/read identity stubs + `rndcolor` still named.
- Prior reviews this SHA claims to close: **86** named drinksink `hcolor`; **85** named Hallucination synonyms.

## Intent vs deliverable

Git subject promises: “Match C do_name.c hcolor so a hallucinating drinksink faucet uses hcolors[] via display-rng, instead of printing the real potion appearance.”

Old JS `fountain.js` had a local identity stub `hcolor(colorword) { return colorword || 'odd'; }` so Hallu still printed `OBJ_DESCR`. C `do_name.c:1460–1466` when `Hallucination || !colorpref` returns `hcolors[rn2_on_display_rng(SIZE(hcolors))]` (SIZE **74**). Pref is **not** a last choice (unlike `hliquid`). `program_state.gameover` does **not** skip the Hallu arm (unlike `hliquid`). drinksink case 4 (`fountain.c:642–643`) is `Blind ? "odd" : hcolor(OBJ_DESCR(...))` — display-rng only when `!Blind`.

The diff **does** port the table + helper in `do_name.js` and wires drinksink case 4 to it (Blind ternary kept). It does **not** replace sit/apply/pray/detect/do/wield/read local stubs or port `rndcolor`. Named. It does **not** rewrite `hliquid`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hcolors[]` / `HCOLORS` | C data, **new** | `do_name.c:1441–1458`; SIZE 74 = JS `.length` 74 |
| `hcolor` | C callee, **new** | `do_name.c:1460–1466`; exported |
| `rn2_on_display_rng` | C callee, **imported** | `rng.js`; display ISAAC, not core log |
| `Hallucination()` | C macro, **clone** | `do_name.js:169–178`; H && !resist + sticky `u.Hallucination` |
| drinksink case 4 | C caller, **rewired** | `fountain.c:642–643`; Blind short-circuit kept |
| local fountain stub | C-wrong, **deleted** | was identity `colorword \|\| 'odd'` |
| `potion_descr` | C `OBJ_DESCR`, **clone** | pre-existing; `objectDescrs[idx] \|\| 'odd'` |
| `hliquid` | C sibling, **untouched** | still pref-as-last + gameover skip |
| sit/apply/pray/detect/do/wield/read `hcolor` | C callers, **named omit** | still identity stubs |
| `rndcolor` | C callee, **named omit** | `do_name.c:1469–1477` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** `rn2_on_display_rng(74)` **only** when `Hallucination() || colorpref == null`, and drinksink only when `!Blind`. Blind `'odd'` does **not** burn display-rng (C ternary). Core gameplay log unchanged. `hliquid` still has its own display-rng (D-0849).

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Contest Rule #2: in-process ESM. Do not treat pref as a last `hcolors` slot. Do not skip Hallu at `gameover`. Do not pull `rndcolor` or other-module stubs into this SHA. Do not restore the fountain identity stub.

## C ↔ JS fidelity

### `hcolor` body

C `do_name.c:1460–1466`:

```
const char *
hcolor(const char *colorpref)
{
    return (Hallucination || !colorpref)
        ? hcolors[rn2_on_display_rng(SIZE(hcolors))]
        : colorpref;
}
```

JS `244–248`: `if (Hallucination() || colorpref == null) return HCOLORS[rn2_on_display_rng(HCOLORS.length)]; return colorpref;`. Table strings match C `:1441–1458` entry-for-entry (ultraviolet … selective yellow). SIZE 74 confirmed against the C initializer.

`!colorpref` is a NULL-pointer test. Empty string `""` is a live C pointer → return `""` when not Hallu. JS `colorpref == null` leaves `""` as a live pref. Match. `undefined` is `== null` in JS (drinksink always passes a string from `potion_descr`). `hliquid` (`:1496–1509`) **does** include a non-empty pref as last choice (`++count` then `IndexOk`) and **does** skip Hallu at `gameover`. `hcolor` does neither. JS `hcolor` does not copy those `hliquid` rules. Match.

`rn2_on_display_rng` (`rng.js:41–47`) uses `game.dispCtx` ISAAC, not the logged core stream. C `rnd.c` same split. A Hallu faucet therefore cannot desync public positional RNG; it can only change the topline synonym. That is why the path is public-unhit on screens (identity was already “ruby”/“pink”) while still being the C rule.

### `Hallucination()` clone

C `youprop.h:116–120`:

```
#define HHallucination u.uprops[HALLUC].intrinsic
#define Halluc_resistance (HHalluc_resistance || EHalluc_resistance)
#define Hallucination (HHallucination && !Halluc_resistance)
```

Hallucination is **solely a timeout** (`youprop.h:115`) AND-not resistance. JS `do_name.js:169–178`: sticky `if (u.Hallucination) return true` **then** `(HHallucination && !resist)`. The sticky short-circuit is a pre-existing clone (rndmonnam D-1125). If only the sticky bit is set, JS Hallu-fires even with resistance; C would not. Named on the helper, not a miss of the Open `hcolor` **body** (the `\|\|` vs last-choice / gameover tests match). Do not Must-fix it as this peel — same class as review **86** Blind sticky. The canary’s “resist identity” case is H+resist **without** the sticky bit, which does match C.

### drinksink case 4

C `fountain.c:641–645`:

```
pline("Some %s liquid flows from the faucet.",
      Blind ? "odd" : hcolor(OBJ_DESCR(objects[otmp->otyp])));
if(!(Blind || Hallucination))
    observe_object(otmp);
```

JS `411–414`: `const Blind = !!(u.Blind || u.ublind); const liquid = Blind ? 'odd' : hcolor(potion_descr(otmp.otyp));` then `if (!(Blind || u.Hallucination)) observe_object(otmp);`. Blind ternary matches: no `hcolor` when Blind, so no display-rng. `potion_descr` is the pre-existing `OBJ_DESCR` stand-in (`objectDescrs[idx] || 'odd'`). When not Hallu, `hcolor` returns that string unchanged — same screen as the old stub. When Hallu and `!Blind`, `hcolors[rn2_on_display_rng(74)]`. Match on the Open line.

Blind local and `observe_object` sticky `u.Hallucination` vs youprop are pre-existing drinksink clones (D-log “Not this iter”). Named.

### Other-module stubs

`sit.js:233–235`, `apply.js` `hcolor_apply`, `pray.js`, `detect.js` (`hcolor(null)` still `'odd'`), `do.js`, `wield.js`, `read.js` still identity. Those callers still contradict C when Hallu. Named omit of this SHA; map, not Must-fix. `rndcolor` (`Hallucination ? hcolor(NULL) : c_obj_colors`) not ported.

## Hallucinations / overclaim

D-log / CURRENT / subject say a hallucinating drinksink faucet uses `hcolors[]` via display-rng instead of the real potion appearance, SIZE 74, pref not last choice, no gameover skip, Blind ternary. That is the hunk: table, helper, fountain import, stub deleted. They name other-module stubs, `rndcolor`, `hliquid`, Blind/`observe_object` stickies. Stamping **Addressed:** D-1135 is fair for the Open **helper + drinksink case 4**. Hash `b166bda5` is on the archive row (filled by D-1136). Do **not** stamp it as a close of sit/apply `hcolor` or `rndcolor`. Do not read “Match C hcolor” as “Match C `hliquid` last-choice.” This is **not** “Match C dispatch, callee is a stub”: `hcolor` is the real table+display-rng function; drinksink calls it.

## Density

One C function plus the drinksink caller C uses. Sibling `hliquid` left alone. Other-module stubs left named (one cluster, not “finish every hcolor”). ~33+8 JS. Right size (§2b).

## Verification

Journal: private canary **110**/110 (C/JS SIZE 74; identity vs Hallu; null burns / pref does not; empty string live pref; gameover still Hallu; resist identity; Blind ternary; fountain import; sit stub remains); green+strict seed8000/0900; cohort **21**/21 including 0002 drinksink + 0014 fountain + 0383/0399 Hallu + 0006/0007/0106/0108/0360/2200/4500 + strict 0002/0014/0383/0399/0006/0106/0108/0360/2200/4500/0030. Path **public-unhit** on Hallu faucet (identity was screen-safe). This audit’s full `sessions` (cadence **#1445**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `do_name.c:1441–1477`, `fountain.c:641–645`, `youprop.h:116–120`; JS `do_name.js:169–178`, `:218–248`, `fountain.js:286–292`, `:398–414`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| !Hallu, non-null pref | return pref | **same** |
| Hallu | `hcolors[rn2_on_display_rng(74)]` | **same** |
| `hcolor(NULL)` | table, even !Hallu | **same** (`== null`) |
| `hcolor("")` !Hallu | `""` | **same** |
| gameover + Hallu | still table | **same** |
| drinksink Blind | `"odd"`, no rng | **same** |
| drinksink !Blind Hallu | table | **same** |
| sit/apply/… | `hcolor("amber")` etc. | **named identity** |
| `rndcolor` | Hallu → `hcolor(NULL)` | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open helper matches `do_name.c:1460–1466`. drinksink case 4 matches `fountain.c:642–643`.

Named omits / do-nots (map / Open, not Must-fix):

1. sit/apply/pray/detect/do/wield/read identity `hcolor` stubs (detect `hcolor(null)` still `'odd'`).
2. `rndcolor` (`do_name.c:1469–1477`).
3. drinksink Blind youprop / `observe_object` sticky `u.Hallucination`.
4. `Hallucination()` sticky `u.Hallucination` short-circuit before resist (`youprop.h:120` has none).
5. Next Open after this SHA: `mongrantswish` `tmp_at` — **Addressed:** D-1136 `52aea3d1`.
6. Do not restore fountain identity `hcolor`. Do not add pref as last `hcolors` slot. Do not skip Hallu at `gameover`. Do not rewrite `hliquid` in an hcolor peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: drinksink case 4 now calls real `do_name.js` `hcolor` (`hcolors[rn2_on_display_rng(74)]` when Hallu or NULL pref; Blind still `"odd"` with no display-rng), while other-module identity stubs and `rndcolor` stay named.
- Must-fix stays empty for this SHA; next port popped Open `mongrantswish` `tmp_at` glyph hide. **Addressed:** D-1136 `52aea3d1`. Not dowaterdemon makemon.
