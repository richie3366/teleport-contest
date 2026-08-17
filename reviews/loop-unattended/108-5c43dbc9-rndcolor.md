# Review 108 — 5c43dbc9 — do_name rndcolor chest_trap gas (D-1147)

## Metadata
- Full / short hash: `5c43dbc9585a9324ac279d93ae3f2d60b524ba80` / `5c43dbc9`
- Parent: `fe5cefad` (D-1146). This file audits **this SHA only**. Archive row **Addressed:** D-1147 `5c43dbc9` was filled by D-1148.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 08:15:42 +0200
- D-id: **D-1147**
- Stats: 12 files, +139 / −44 — `js/do_name.js` +24 / −2 (`rndcolor` + `c_obj_colors`); `js/trap.js` +17 / −4 (`blindgas` + chest gas ternary); `js/fountain.js` comment.
- Claims to close: Open queue `do_name.c` `rndcolor` (named from hcolor). Not sit/apply identity stubs. Review **96** named `rndcolor`; C’s only live caller is chest_trap. `reviews/loop-2026-08-15/` has no open rndcolor Must-fix.
- JS / map: `do_name.js` `rndcolor`; `trap.js` `chest_trap` cases 0–2. `c-js-map/turns.md` do_name + trap. Sit/apply/pray/detect/do/wield/read `hcolor` identity stubs still named.
- Prior reviews this SHA claims to close: **96** named omit `rndcolor`; D-1146 next-port.

## Intent vs deliverable

Git subject promises: “Match C do_name.c rndcolor so a chest-trap gas cloud uses c_obj_colors / hcolor / blindgas, instead of printing colorful or strange with no RNG.”

Old JS `chest_trap` cases 0–2 used `Blind() ? 'strange' : 'colorful'` with **zero** rolls. C `trap.c:6474–6476` is `Blind ? ROLL_FROM(blindgas) : rndcolor()`. C `do_name.c:1470–1477` always `rn2(CLR_MAX)` on the **core** stream; if Hallucination then `hcolor(NULL)` (display-rng over `hcolors[]`); else `k==NO_COLOR` → `"colorless"` else `c_obj_colors[k]`. Blind never calls `rndcolor` (only `rn2(6)` on `blindgas[6]`).

The diff **does** port `rndcolor` + a `c_obj_colors[]` clone and wire the Blind ternary. It does **not** replace other-module `hcolor` identity stubs. Named. C grep of `rndcolor(` is **only** `trap.c:6475` plus the definition — no missed caller.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rndcolor` | C callee, **new** | `do_name.c:1468–1477` |
| `C_OBJ_COLORS` | C table, **clone** | `decl.c:20–37` `c_obj_colors[]` |
| `hcolor` | C callee, **imported** | D-1135; display-rng when Hallu or NULL pref |
| `Hallucination` | C youprop, **clone** | existing `do_name.js` H && !resist |
| `BLINDGAS` | C table, **clone** | `trap.c:81–83` six adjectives |
| `ROLL_FROM` | C macro, **inlined** | `hack.h:1493` `array[rn2(SIZE)]` |
| `CLR_MAX` / `NO_COLOR` | C macros, **imported** | 16 / 8 (`color.h`) |
| other `hcolor` stubs | C callers, **named omit** | sit/apply/pray/detect/do/wield/read |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** non-Blind always `rn2(16)` core; Hallu then `rn2_on_display_rng(hcolors.length)` (74, D-1135). Blind `rn2(6)` only. Path **public-unhit** on chest gas (was identity strings).

## Constitution / playbook

Grep of the three JS hunks: no trace-index gates. Do not skip the core `rn2(CLR_MAX)` when Hallu (C burns it even though `k` is unused). Do not map `NO_COLOR` to table `"transparent"`. Do not call `rndcolor` when Blind. Do not pull sit `hcolor` stubs into a chest peel (would consume display-rng on public sit paths).

## C ↔ JS fidelity

### `rndcolor`

C `do_name.c:1470–1477`:

```
int k = rn2(CLR_MAX);
return Hallucination ? hcolor((char *) 0)
                     : (k == NO_COLOR) ? "colorless"
                                       : c_obj_colors[k];
```

JS `do_name.js:264–269`: `const k = rn2(CLR_MAX); return Hallucination() ? hcolor(null) : (k === NO_COLOR) ? 'colorless' : C_OBJ_COLORS[k];`

`CLR_MAX` is 16 (`const.js:2446`). `NO_COLOR` is 8 (`terminal.js:15`). `hcolor(null)` is C `!colorpref` → always display-rng (`do_name.c:1463–1465`); `rndcolor` only calls it when already Hallu, so the extra `Hallucination \|\|` in `hcolor` does not change the roll. `Hallucination()` is the existing D-1135 clone (`HHallucination && !resist`, plus sticky `u.Hallucination`). Same helper `hcolor` already uses. Match call-for-call.

### `c_obj_colors[]`

C `decl.c:20–37` in order: black, red, green, brown, blue, magenta, cyan, gray, **transparent** (no_color), orange, bright green, yellow, bright blue, bright magenta, bright cyan, white. JS `C_OBJ_COLORS` is that list. Index 8 is `"transparent"` in the table and `"colorless"` in `rndcolor` — C’s special case, not a table edit. Match.

### Chest gas ternary

C `trap.c:6474–6476` / `blindgas[6]`: humid, odorless, pungent, chilling, acrid, biting. `ROLL_FROM` = `blindgas[rn2(6)]`. JS `BLINDGAS[rn2(BLINDGAS.length)]` with those six strings. Blind() is trap.js’s pre-existing youprop clone. Non-Blind calls exported `rndcolor`. Match. Stagger suffix / `Halluc_resistance` / Soundeffect / `bot()` / `shieldeff` stay named (not this adjective).

### Hallu still burns core `rn2(16)`

If JS had `return Hallucination() ? hcolor(null) : ...` **without** the leading `rn2`, Hallu chest gas would desync the core stream. The port keeps `k = rn2(CLR_MAX)` first. Private canary claimed this. C unused-`k` is intentional.

`hcolor` (`do_name.c:1461–1466`): `(Hallucination || !colorpref) ? hcolors[rn2_on_display_rng(SIZE(hcolors))] : colorpref`. Pref is not a last choice (unlike `hliquid`). `program_state.gameover` does **not** skip Hallu (unlike `hliquid`). D-1135 already matched that; `rndcolor` reuses the same export. `HCOLORS.length` is 74 = C `SIZE(hcolors)`. `rn2_on_display_rng` is the display stream, not core — so Hallu chest gas is core `rn2(16)` then display `rn2(74)`. Non-Hallu is core `rn2(16)` only.

`Hallucination()` in `do_name.js`: sticky `u.Hallucination` OR `(HHallucination && !Halluc_resistance)`. C `youprop.h` Hallucination is intrinsic timeout with resistance. Same clone `hcolor` already used for drinksink (D-1135). Chest gas Hallu vs not is therefore consistent with faucet strings.

### No other C callers

`nethack-c` grep of `rndcolor(`: `do_name.c:1470` definition, `trap.c:6475` chest gas, `extern.h` prototype. Outdated MSDOS schema noise. Wiring only `chest_trap` is complete C coverage, not a truncated caller list. Sit/apply `hcolor(OBJ_DESCR)` stubs are **`hcolor`**, not `rndcolor` — different Open family.

`trap.js` `Blind()` clone is pre-existing (H||E)&&!B plus roleplay. C `Blind` is `(HBlinded||EBlinded)&&!BBlinded`. Same clone the old `'strange'` arm used. Not a new youprop drift.

## Hallucinations / overclaim

D-log / CURRENT / subject say a chest-trap gas cloud uses `c_obj_colors` / `hcolor` / `blindgas` instead of colorful/strange with no RNG. That is the hunk: helper + only C caller. They **name** other-module `hcolor` stubs. Stamping **Addressed:** D-1147 is fair for the Open **function + chest_trap wire**. Hash `5c43dbc9` is on the archive row (filled by D-1148). Do **not** stamp it as “Match C sit/apply `hcolor`.” This is **not** “Match C dispatch, callee is a stub”: `rndcolor` is new C; `hcolor` is the real D-1135 table+display-rng function.

## Density

`rndcolor` + its one C caller is the right envelope (§2b). Tables are data for that function, not a second cluster. Sit `hcolor` stubs remain a different family (would touch public sit RNG).

## Verification

Private canary **215**/215 (C/JS tables; always `rn2(16)`; `k==8` colorless not transparent; Hallu still core `rn2` then hcolors; resist identity; gameover still Hallu; Blind `rn2(6)` never `rndcolor`). Green+strict seed8000/0900. Cohort **19**/19 (0002 drinksink + 0014 fountain + 0383/0399 Hallu + 0006/0007/0106/0108/0360/2200/4500 + 0004/0009/0012/0030/0116/0060/1500/1800) + strict 8000/0900/0002/0014/0383/0399/0006/0106/0108/0360/2200/4500/0030/0060. seed0009 runner PASS (strict length pre-existing D-0989). Path **public-unhit** on chest gas (was `"colorful"`/`"strange"`). Cadence #1460 **44**/44 still 100% — public set never opens a trapped box. Do not read fortress as “rndcolor is exercised.”

`chest_trap` stagger / `Halluc_resistance` suffix / `bot()` / `shieldeff` after the gas pline are unchanged. This SHA only replaced the adjective expression. Do not treat a later stagger peel as part of D-1147.

## Actionable C-wrongs

None that Must-fix this next iter. `rndcolor` matches `do_name.c:1470–1477`; the Blind ternary matches `trap.c:6474–6476`.

Named omits / do-nots (map / Open, not Must-fix):

1. sit/apply/pray/detect/do/wield/read identity `hcolor` stubs.
2. `Halluc_resistance` stagger suffix / Soundeffect / `bot()` / `shieldeff` on chest_trap.
3. Do not skip core `rn2(CLR_MAX)` when Hallu. Do not print `"transparent"` for `NO_COLOR`. Do not call `rndcolor` when Blind. Do not restore colorful/strange.

## Verdict

- Verdict: **ACCEPT**
- Score: **9 / 10**
- One sentence: chest gas now rolls C’s Blind `blindgas[rn2(6)]` or `rndcolor` (always `rn2(16)`, Hallu then display-rng `hcolor`, else colorless at `NO_COLOR`), replacing the no-RNG colorful/strange strings.
- Must-fix stays empty for this SHA; next port popped Open `deal_with_overcrowding`. **Addressed:** D-1148 (hash filled in this review commit). Not sit `hcolor`.
