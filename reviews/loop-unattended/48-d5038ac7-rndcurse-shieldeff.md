# Review 48 — d5038ac7 — `rndcurse` Antimagic `shieldeff` (D-1087)

## Metadata
- Full / short hash: `d5038ac76642a21a839e4111b2fa31c835ae5318` / `d5038ac7`
- Parent: `542990d8` (loop-observer; no `js/`). JS-touching since last `reviews/loop-unattended/` file: D-1085, D-1086, **this SHA**, D-1088. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 16:07:51 +0200
- D-id: **D-1087**
- Stats: 11 files, +148 / −44 — `js/display.js` +45 (`shieldeff` + `shield_static`); `js/sit.js` +1 await, −1 comment.
- Claims to close: Open queue `sit.c` `rndcurse` `shieldeff` (named omit). Not `update_inventory` / hcolor. Review **36** / **45** named `shieldeff`. Stamped **Addressed:** D-1087 `d5038ac7` on the archive row (filled by D-1088). `reviews/loop-2026-08-15/` has no open shieldeff Must-fix.
- JS / map: `display.js` `shieldeff`; `sit.js` `rndcurse`. `c-js-map/data.md` names D-1087; other C callers still unwired.
- Prior reviews this SHA claims to close: **45** named omit 2 (`shieldeff`); **36** same. Review **10** did not name display.

## Intent vs deliverable

Git subject promises: “Match C display.c shieldeff so rndcurse Antimagic flashes the shield_static glyphs before the invent curse walk.”

The queue line was that caller plus the missing `display.c` function. Not zap/pray/explode callers. Not `update_inventory`.

The diff **does** add `shieldeff(x,y)`: `flags.sparkle === false` skip (missing ≡ On); `cansee`; 21 `show_glyph_cell` + `flush_screen(1)` + `nh_delay_output`; `newsym` restore. `rndcurse` `await shieldeff(u.ux, u.uy)` when `Antimagic()`, after Magicbane return, before `You_feel` malignant aura.

The **gate** is sit.js `Antimagic()` (`sit.js:165–167`): `u.Antimagic || u.HAntimagic || u.EAntimagic`. That clone does **not** read `uprops[ANTIMAGIC]`. `confer_oc_oprop` writes worn `CLOAK_OF_MAGIC_RESISTANCE` / gray DSM to `uprops[12].extrinsic` and never mirrors `EAntimagic`. Same confer hole review **43** Must-fix’d for Flying (D-1085). This SHA made `shieldeff` live behind that clone.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `shieldeff` | C body, **ported** | `display.c:1110–1124` |
| `shield_static` / `SHIELD_COUNT` | C data, **cloned** | `decl.c:97–100` / `display.h:237`; 21 = 7×3 |
| `SHIELD_SS1..4` | **clone** of `defsym.h` Primary ASCII | `'0' '#' '@' '*'` / `HI_ZAP` |
| `show_glyph_cell` | port analog of `show_glyph`+`cmap_to_glyph` | established display model |
| `flush_screen` / `nh_delay_output` / `newsym` / `cansee` | C callees, **imported/local** | real |
| `rndcurse` Antimagic arm | C caller, **retouched** | `sit.c:581–583` |
| `Antimagic()` | **clone** of `youprop.h:55–57` | **diverges**: no uprops |
| explode.c inline sparkle / `shieldeff_mon` | C other sites, **named omit** | |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. `shieldeff` itself has zero RNG. `rndcurse` still burns `rn2(20)` Magicbane then `rnd(6/(Antimagic+Half+1))` — the count **also** uses the thin `Antimagic()`.

## Constitution / playbook

Grep of the `js/display.js` / `js/sit.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Glyphs are `defsym.h` Primary, not a seed screen dump. Contest Rule #2: no Node builtins. 21 `flush_screen` calls happen before the next `nhgetch`; public sessions capture at `nhgetch` after `newsym` restore — cadence **44**/44 screens unchanged (path unhit).

## C ↔ JS fidelity

### `shieldeff` body — branch order, no RNG

C `display.c:1110–1124`:

```
    if (!flags.sparkle)
        return;
    if (cansee(x, y)) {
        for (i = 0; i < SHIELD_COUNT; i++) {
            show_glyph(x, y, cmap_to_glyph(shield_static[i]));
            flush_screen(1);
            nh_delay_output();
        }
        newsym(x, y);
    }
```

C `decl.c:97–100`: `S_ss1, S_ss2, S_ss3, S_ss2, S_ss1, S_ss2, S_ss4` × 3. C `defsym.h:200–203`: Primary `'0' '#' '@' '*'` / `HI_ZAP`. C `optlist.h:705–706`: `sparkle` opt_out default **On**. C `color.h:55`: `HI_ZAP CLR_BRIGHT_BLUE` — JS `const.js:2455` same.

JS `display.js:1819–1830`: `game.flags?.sparkle === false` so `undefined` ≡ On (C default). `0 === false` is false, so a numeric 0 would still sparkle vs C `!0` skip — no JS writer uses 0 here. `cansee` imported from `vision.js`. Loop 21, `show_glyph_cell` + await `flush_screen(1)` + await `nh_delay_output`, then `newsym`. `flush_screen` ignores `cursor_on_u==1` except mode `-1` (pre-existing analog). `show_glyph_cell` writes `loc.disp_*` (not hero memory); `newsym` restores. Match for the **function body** and ASCII `shield_static`.

DEC/showsyms remap named. `PCHAR2` empty DEC string means Primary even under DEC unless `dat/symbols` remaps — named.

### `rndcurse` call site — Magicbane, then Antimagic, then You, then invent

C `sit.c:576–585`: Magicbane `rn2(20)` return; `if (Antimagic) shieldeff(u.ux, u.uy)`; `You(mal_aura, "you")`; then invent walk. `cnt = rnd(6 / ((!!Antimagic) + (!!Half_spell_damage) + 1))`.

JS `sit.js:278–296`: same Magicbane; `await shieldeff`; `You_feel` surround you; same `rnd` divisor using `Antimagic()` / `Half_spell_damage()`. Call order matches **if** `Antimagic()` is C `Antimagic`.

Magicbane `rn2(20)` success **returns before** `shieldeff` in both. A worn cloak of MR plus Magicbane may still skip the flash on that roll — C same. The C-wrong is the cloak **without** Magicbane absorb, or Magicbane `rn2` fail: C flashes, JS does not.

`You_feel` vs C `You(mal_aura, "you")` is pre-existing wording (`feel a malignant aura surround you` vs `feel a malignant aura surround you.`). Not this SHA. `update_inventory` after the walk still named.

### `Antimagic` — claimed C predicate, clone misses confer

C `youprop.h:55–57`:

```
#define HAntimagic u.uprops[ANTIMAGIC].intrinsic
#define EAntimagic u.uprops[ANTIMAGIC].extrinsic
#define Antimagic (HAntimagic || EAntimagic)
```

`ANTIMAGIC = 12` (`prop.h`; JS `const.js:2345`). Worn `CLOAK_OF_MAGIC_RESISTANCE` and gray dragon scales/mail have `oc_oprop ANTIMAGIC` (`objects.h:502`/`530`/`645–646`). `setworn` → `confer_oc_oprop` writes `uprops[12].extrinsic`. **No** `EAntimagic` mirror (`do_wear.js:272–288` list).

JS `sit.js:165–167`: `return !!(u.Antimagic || u.HAntimagic || u.EAntimagic);`

`invent.js:1734–1738` `hero_Antimagic` already ORs the uprops pair (D-1060 shape). `muse.js:305–312` same. This SHA cloned the **wrong** helper in the file that owns `rndcurse`, then wired `shieldeff` to it.

| Source | C Antimagic | JS sit `Antimagic()` | sit `shieldeff` |
|--------|-------------|---------------------|-----------------|
| Intrinsic `HAntimagic` | true | **true** | **21 frames** |
| Sticky `u.Antimagic` | n/a (not C) | true | 21 (JS extra) |
| **Cloak of MR / gray DSM** (`uprops[ANTIMAGIC].extrinsic`) | true | **false** | **0 vs C 21** |
| Same cloak, `cnt` divisor | `6/2` or `6/3` | **`6/1`** (more curses) | — |

Private canary (journal) **8**/8: default On 21-frame sequence; `!sparkle` / `!cansee` skip; `rndcurse` Antimagic 21 vs !Antimagic 0. That is H/E/sticky or a forced flag, **not** `setworn` cloak of MR. Same overclaim as D-1082’s H/E Flying canary without the amulet.

## Hallucinations / overclaim

“Match C display.c shieldeff so rndcurse Antimagic flashes …” is **true for the `shieldeff` body and for H/E Antimagic.** It is **not** true that `if (Antimagic)` is C `youprop.h` Antimagic for worn magic-resistance gear. This is **not** “Match C dispatch, callee is a stub” — `show_glyph_cell` / `flush_screen` / `newsym` are real. It **is** “Match C youprop gate, clone reads unwritten flats,” the same family as review **43** / D-1085.

Stamping **Addressed:** D-1087 is fair for “`shieldeff` exists and rndcurse calls it.” It is **not** fair for worn-cloak Antimagic. Hash `d5038ac7` is on the archive row.

## Density (§2b)

One Open cluster: C `shieldeff` + the one `rndcurse` caller. ~45 lines in display + one await. Right size for the queue line. The miss is the **pre-existing** sit `Antimagic()` clone this SHA chose as the C `if`. Not “finish explode.c sparkle.” Not `is_pool`.

## Verification

Journal: private canary 8/8 (21-frame `shield_static`; sparkle/cansee skip; rndcurse Antimagic 21 vs 0); green+strict seed8000/0900; cohort **9**/9 (0106/0107/0108/4500/1500/1800/0017/0360/2200) + sit strict. Path **public-unhit** for Antimagic `rndcurse`. Cadence **#1385** **44**/44 — fortress, not cloak-of-MR proof. Canary **did not** `setworn` `CLOAK_OF_MAGIC_RESISTANCE`.

C read of `display.c:1110–1124`/`2208+`, `decl.c:97–100`, `display.h:237`, `defsym.h:200–203`, `optlist.h:705–706`, `sit.c:576–593`, `youprop.h:55–57`, `objects.h` ANTIMAGIC items; JS `display.js:1791–1830`, `sit.js:165–167`/`278–296`, `invent.js:1734–1738`, `do_wear.js:261–288`. Hunk grepped FORCE/fs/seed.

Private canary vs C (journal) **did** cover sparkle/cansee/H-or-E Antimagic. It **did not** `setworn` cloak of MR:

| Path | C `shieldeff` | JS after D-1087 |
|------|---------------|-----------------|
| `HAntimagic`, cansee, sparkle On | 21 frames | **21** |
| `flags.sparkle` false | 0 | **0** |
| `!cansee` | 0 | **0** |
| confer cloak, `EAntimagic` unset | **21** | **0** (C-wrong) |
| Magicbane `rn2(20)` hit | return; 0 | **0** |

## Actionable C-wrongs

1. **`sit.js` `rndcurse` `Antimagic()` must be C `youprop.h` Antimagic ≡ `uprops[ANTIMAGIC].intrinsic \|\| uprops[ANTIMAGIC].extrinsic` (plus existing H/E flats).** Copy `invent.js:1734–1738` `hero_Antimagic` (OR flats **and** the uprops pair). Worn `CLOAK_OF_MAGIC_RESISTANCE` / gray DSM must `shieldeff` (21 frames) **and** use the reduced `rnd(6 / ((!!Antimagic)+…))` count. Do **not** rewrite `confer_oc_oprop`. Do **not** pull `update_inventory` / hcolor / explode inline sparkle / other `shieldeff` callers. Do **not** rewrite every other `Antimagic()` clone (`zap.js` / `pray.js` / …). Do **not** pop `is_pool`. Falsifier: `setworn` cloak of MR (`uprops[ANTIMAGIC].extrinsic` set, `EAntimagic` unset), not Magicbane, `cansee` hero cell, sparkle not false → `rndcurse` runs `shieldeff` 21 frames then You_feel; `cnt` divisor is 2 (or 3 with Half); no-cloak still 0 frames and divisor 1. **Addressed:** D-1089 `f91650c0`

Named omits / do-nots (map / Open, not Must-fix):

2. `update_inventory` after the invent walk; Hallucination `hcolor`.
3. DEC/showsyms `S_ss*` remap; explode.c inline sparkle; `shieldeff_mon`; zap/pray/spell/trap/mhitm callers still unwired.
4. `Half_spell_damage()` sit clone vs uprops — do not pull into item 1.

Do not restore the `// shieldeff deferred` comment. Do not skip Magicbane before `shieldeff`. Do not treat `sparkle === false` missing-field On as a seed gate.

## Verdict

- Verdict: **QUALITY-RISK**
- Score: **6 / 10**
- One sentence: `display.js` `shieldeff` matches `display.c` / `decl.c` ASCII `shield_static`, but `rndcurse` gates it on sit `Antimagic()` that ignores `uprops[ANTIMAGIC]` confer writes for a cloak of magic resistance.
- Must-fix prepends item 1; next port ships that, not `dbridge.c` `is_pool`.
