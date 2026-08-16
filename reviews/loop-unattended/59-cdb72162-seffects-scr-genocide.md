# Review 59 — cdb72162 — `seffects` SCR_GENOCIDE / `do_class_genocide` (D-1098)

## Metadata
- Full / short hash: `cdb7216204b3325ea39a2f05b29ec368ed828c94` / `cdb72162`
- Parent: `d1e7ae23` (D-1097). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 19:07:39 +0200
- D-id: **D-1098**
- Stats: 13 files, +465 / −64 — `js/read.js` +265 / −12 (`seffect_genocide` + `do_class_genocide` + `doread` allowlist); `js/mondata.js` +122 (`name_to_monclass` + `def_monsyms` tables).
- Claims to close: Open queue `read.c` `seffects` SCR_GENOCIDE (named from sit). Not kill_eggs. Stamped **Addressed:** D-1098 `cdb72162` on the archive row (filled by D-1099). Filled D-1097 hash `d1e7ae23`. `reviews/loop-2026-08-15/` D-1034 still names `name_to_mon` / livelog / Hallu / cham as genocide debt — this SHA wires the scroll, not those.
- JS / map: `read.js` `seffects` / `do_class_genocide`; `mondata.js` `name_to_monclass`. `c-js-map/data.md` mondata + `turns.md` read rows. livelog / Hallu names / vampshifted `POLY_REVERT` / cham `newcham` / `update_inventory` / `create_particular` class-letter still named. `list_genocided` NHW_MENU when `ngone>0` still deferred in `insight.js`.
- Prior reviews this SHA claims to close: D-1034 named `do_class_genocide` / seffects wire (not a Must-fix).

## Intent vs deliverable

Git subject promises: “Match C read.c so seffects SCR_GENOCIDE runs class wipe via name_to_monclass.” Body: blessed → `do_class_genocide`; uncursed/cursed keep `do_genocide` with Confusion ≡ `HConfusion`. kill_eggs stays D-1097.

Old JS `doread` / `seffects` omitted `SCR_GENOCIDE` (`That scroll is not implemented yet.` / no `useup`). Throne case 8 already had `do_genocide(5)`; reading the scroll did not.

The diff **does** the claimed envelope: `seffects` `case SCR_GENOCIDE` → `seffect_genocide`; `doread` allowlist; blessed getlin class wipe via `name_to_monclass` then species fallback `name_to_mon`; `G_GENOD|G_NOCORPSE` + `kill_genocided_monsters`; own role/race `uhp=-1` / Unchanging poly `done(GENOCIDED)`. Uncursed uses existing `do_genocide((!cursed)|(2*!!HConfusion))`.

It does **not** livelog, Hallucinate type names, `polyself(POLY_REVERT)` for vampshift, `update_inventory`, or `create_particular` class letters. Named. `'?'` calls `list_genocided('g', false)` whose **empty** path is real and whose **`ngone>0` menu is a stub**.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `seffect_genocide` | C body, **new** | `read.c:1722–1738` |
| `do_class_genocide` | C body, **new** | `read.c:2638–2820` |
| `name_to_monclass` | C callee, **new port** | `mondata.c:1090–1176`; returns JS mlet name |
| `do_genocide` | C callee, **imported** | existing D-1034 |
| `kill_genocided_monsters` | C callee, **imported** | D-1097 walk |
| `getlin` / `mungspaces` | C callees | real tty getlin; local `mungspaces` clone |
| `list_genocided` | C callee, **stub if ngone>0** | `insight.js:761–778` |
| `rehumanize` / `done` / `mongone` | C callees, **imported** | `polyself.js` / `end.js` / `mon.js` |
| `wizard_mode` / `Unchanging` / `quest_info` / `udeadinside` / `upstart` / `type_is_pname_ptr` / `Role_if` | **clones** | youprop / questpgr / polyself / hacklib |
| livelog / `update_inventory` / `POLY_REVERT` | C after wipe, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Dynamic `import('./insight.js')` / `import('./polyself.js')` are ESM cycle breaks, not Node builtins. **No RNG** in `seffect_genocide` / `do_class_genocide` / `name_to_monclass` (wizard `*` `mongone` has none; cursed spawn RNG stays inside existing `do_genocide`).

## Constitution / playbook

Prompt strings are C’s (`What class of monsters do you want to genocide?`, cmdassist retry suffix, `none` / `'none'` / `nothing` / ESC decline). Not seed-shaped menus. `getlin` is the existing `nhgetch` input chain (one await). `DEF_CHAR_TO_MLET` / `DEF_MONSYM_EXPLAIN` are `defsym.h` `MONSYM` rows 1–60, not a public-trace table.

## C ↔ JS fidelity

### `seffect_genocide` — blessed vs `how` bits

C `read.c:1722–1738`: `already_known` = spellbook class **or** `oc_name_known`; unknown → `You("have found a scroll of genocide!")`; `gk.known = TRUE`; blessed → `do_class_genocide()`; else `do_genocide((!scursed) | (2 * !!Confusion))`.

JS: `pline('You have found a scroll of genocide!')` is the `You()` expansion, not a doubled prefix. Module `known` ≡ `gk.known`. Confusion: `#define Confusion HConfusion` (`youprop.h:84`). JS uses `HConfusion` only (D-1048). Sticky `u.Confusion` must **not** set PLAYER — D-log canary said so. Bits: uncursed 1; uncursed+conf 3 (`REALLY|PLAYER`); cursed 0; cursed+conf 2 (`PLAYER`). Match.

`doread` allowlist adds `SCR_GENOCIDE` so the early “not implemented” return cannot fire before `seffects`. Match for dispatch.

### `name_to_monclass` — letter / explain / truematch / species

C `mondata.c:1090–1176` returns a **class index** (`S_ANT`…), 0 if none (not `MAXMCLASSES`). Single char → `def_char_to_monclass`; `]` → `S_MIMIC`; `~` → `S_WORM` + `mndx=PM_LONG_WORM`; unknown → `I` ? `S_invisible` : 0. Multi: reject `"long"`; `makesingular`; reject `an/the/or/other/or other`; truematch `long worm` / `demon` / `devil` / `bug` / `fish`; then word-boundary `strstri` on `def_monsyms[i].explain`; then `name_to_mon`.

JS returns mlet **names** (`'S_ANT'`). `mons[i].mlet` in this port is that same string, so `mons(i).mlet === monclass` is the C `mons[i].mlet == class` comparison under JS’s representation. Not a silent class/index mix.

`DEF_MONSYM_EXPLAIN` matches `defsym.h` `MONSYM` desc strings 1–60 (`"ant or other insect"` … `"mimic"`). Word-boundary: `p===0 || prev===' '`, suffix length, next is end or space. `"insect"` hits S_ANT; `"or"` is falsematch 0. `'a'` → `S_ANT` (bees share mlet). `'I'` is in the char map **and** the fallback — same result as C (`def_char_to_monclass('I')` finds `S_invisible` first). `'?'` is not a class letter; `do_class_genocide` handles `?` **before** `name_to_monclass`. Match.

`create_particular` still `name_to_mon` only (named on the parse). This SHA does not claim that wire.

### `do_class_genocide` — tries, decline, counts, wipe, death

C `read.c:2646–2818`: `j>=5` → `thats_enough_tries` return; getlin + `mungspaces`; empty → type-letter / “No class…”; ESC/`none`/`'none'`/`nothing` → livelog decline return; `?`/`'?'` → `list_genocided('g', FALSE)`, `--j`; class via `name_to_monclass` then `name_to_mon`; count immune / gone / good; if `!goodcnt` and class is not role/race mlet: gone-pline / immune-or-invisible / wizard `*` `mongone` all `fmon` / “does not represent”; else per-species: own role/race **or** (`G_GENO` and not yet `G_GENOD`) → set flags, `kill_genocided_monsters`, `update_inventory`, wipe pline, vampshift `POLY_REVERT`, Upolyd current form `mh=-1` Unchanging die / else `rehumanize`, role/race `uhp=-1`; already genocided / unique refuse (quest msound suppress, ninja unless Samurai, high priest `uniq=false`); then `gameover||uhp==-1` killer `scroll of genocide` `done(GENOCIDED)`.

JS follows that order. livelog on decline and first wipe is named omit (conduct log only). `update_inventory` named (eggs already `kill_egg`’d; display of identified eggs may stale). `POLY_REVERT` named (vampire shifted to wolf who genocides **vampire** class does not revert first). `list_genocided`: `ngone===0` prints C’s “No creatures have been genocided yet.”; `ngone>0` **returns without a menu**. That is a stub callee on `'?'` after the first successful wipe, not on the wipe itself.

`Unchanging` clone: C `HUnchanging || EUnchanging`. JS ORs flats, sticky `u.Unchanging`, and `uprops[UNCHANGING]` (confer does not always mirror `E*`). Extra sticky is sit-shaped confer debt, not a genocide-only invention. `quest_info` clone matches `questpgr.c:31–45` (`ldrnum` / `neminum` / `guardnum`). `udeadinside` clone matches `polyself.c:2273–2283` (`nonliving` → dead / `weirdnonliving` → condemned / else empty). `type_is_pname` is `M2_PNAME`. `PM_HIGH_CLERIC` `uniq=false`. `wizard_mode` is the D-0576 `flags.debug || flags.wizard` alias. `rehumanize` is the real `polyself.js` export (Unchanging+`mh<1` `done(DIED)` is **not** reached from this caller: Unchanging takes `gameover` instead). `done(GENOCIDED)` is real `end.js`.

Empty-input period: C `pline("%s.", msg)` → JS strings already include the period. Cmdassist retry suffix matches C `Snprintf` ` [enter …]`. ESC: JS `getlin` returns `'\x1b'` on empty ESC; `mungspaces` keeps it; decline arm matches C `*buf=='\033'`.

Wizard `*`: only when `!goodcnt` and class is not role/race mlet and not gone/immune. `name_to_monclass('*')` is 0. Wipes live `fmon` via `mongone`, not `mondead`. Match.

Per-species refuse: C suppresses plines for other-roles’ `MS_LEADER` / `MS_NEMESIS` / `MS_GUARDIAN` unless `quest_info` says that mndx is **ours**; ninja unless Samurai; then `You aren't permitted to genocide` with `the ` for unnamed uniques, `pmnames[NEUTRAL]` for unique-or-pname else the plural `nam`. JS copies the msound numeric tests (36/37/38 — D-1093 values) and `PM_HIGH_CLERIC` `uniq=false`. `makeplural(pmnames[i][NEUTRAL])` for wipe/already-gone lines. Match for the refuse envelope. `gameover` suppresses later plines so a dying hero does not get a unique-refuse after `You die.` Match.

Self-geno of **race** while Upolyd: C sets `uhp=-1` and `You_feel("%s inside.", udeadinside())` without `gameover` if still poly’d — death waits until rehumanize/HP. Unchanging current-form sets `gameover` from `mh=-1` **before** the role/race `uhp` arm. JS same `feel_dead` increment so the second “You die.” does not double. Killer name `scroll of genocide` / `KILLED_BY_AN` only if `gameover || uhp==-1`; `done` only if `gameover`. A poly’d hero who genocides their **race** (not current form) feels dead inside and keeps playing in monster form with `uhp=-1` until something else kills them — C same. Match.

`seffects` still `exercise(A_WIS)` for `oc_magic` before the switch. Genocide scroll is magic. Match. Spellbook-as-sobj (`already_known` via `SPBOOK_CLASS`) is C’s spell path; JS has no SPE_GENOCIDE, but the predicate is copied. Harmless.

`do_class_genocide` is `async function` not exported — only `seffect_genocide` calls it, like C `staticfn`. `name_to_monclass` **is** exported (create_particular later). Match for visibility.

## Hallucinations / overclaim

“Match C so seffects SCR_GENOCIDE runs class wipe via name_to_monclass” is **true for blessed class getlin, the mlet walk, `G_GENOD|G_NOCORPSE`, `kill_genocided_monsters`, self-geno death, and uncursed `do_genocide` bits.** It is **not** true that `'?'` shows the genocided menu when `ngone>0` (`list_genocided` is a stub there), that livelog/conduct fired, that `update_inventory` ran, or that vampshift `POLY_REVERT` ran.

Say it explicitly: the **wipe dispatch is not a stub**. `do_class_genocide` / `name_to_monclass` / `do_genocide` / `kill_genocided_monsters` / `rehumanize` / `done` are real. The **`?` list** is “Match C dispatch, callee is a stub” when anything has already been genocided. Named insight debt, not a Must-fix of this subject.

Stamping **Addressed:** D-1098 is fair for the Open line. Hash `cdb72162` is on the archive row (filled by D-1099).

## Density (§2b)

One family: scroll dispatch + blessed class wipe + `name_to_monclass` (caller/callee). ~387 lines of JS (`read.js` + `mondata.js` tables). Playbook target 50–300; this sits **over** the band because the explain/char tables rode along. Not “finish potions” / two unrelated subsystems. Sibling kill_eggs correctly stayed D-1097. Density smell, not a shipped C-wrong of the wipe. Do not Must-fix the tables apart from the function.

## Verification

Journal: private canary 21/21 `name_to_monclass` + 8/8 seffects (blessed `a` wipes S_ANT including bees; uncursed sticky `u.Confusion` still type-getlin not PLAYER; blessed `none` declines); green+strict PASS; cohort **10**/10 (5006/0002/0106/0105/1500/1800/0009/0361/0107/2200). Public traces **unhit** (no public `r` of genocide). Cadence **#1400** **44**/44 does not exercise this path.

C read of `read.c:1722–1738` / `2638–2820`, `mondata.c:1090–1176`, `defsym.h` MONSYM 1–60, `youprop.h:84`, `questpgr.c:31–45`, `insight.c` `list_genocided` empty vs menu; JS `read.js:842–1242`, `mondata.js:377–487`, `insight.js:761–778`; hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| blessed `a` | wipe S_ANT | **same** |
| uncursed | `do_genocide(1)` | **same** |
| uncursed + `HConfusion` | `how=3` PLAYER | **same** |
| sticky `u.Confusion` only | still `how=1` | **same** |
| `none` / ESC | decline | **same** (no livelog) |
| `'?'` first time | empty genocided pline | **same** |
| `'?'` after a wipe | NHW_MENU | **no-op stub** (named) |
| own role class | `uhp=-1` `done(GENOCIDED)` | **same** |
| Unchanging poly form | `mh=-1` die, no rehumanize | **same** |

`doread` after `seffects` still `useup`/`learnscroll` when the return is 0. `seffect_genocide` does not consume `sobj` (C same — caller useup). `seffects` returns `sobj ? 0 : 1`. Genocide leaves the pointer. Match. The early doread allowlist must include `SCR_GENOCIDE` **or** a blessed scroll never reaches `seffects`. This SHA adds it next to `SCR_PUNISHMENT`. Other unimplemented scrolls still hit the pre-`seffects` “not implemented” return (no `useup`). Match.

`name_to_monclass` `mndx_p` out-param is implemented (`{ mndx }`) but `do_class_genocide` calls it without one, like C `(int *) 0`. `long worm` sets mndx only when the caller asks. `create_particular` still does not pass it. Named.

`makesingular` is imported from `objnam.js` (real C callee, partial). `"ants"` → `"ant"` hits explain `"ant or other insect"` at p=0. If `makesingular` failed, the letter `'a'` path would still wipe; the word path is extra. Canary 21/21 included letter and explain. Not a C-wrong of the tables: `DEF_MONSYM_EXPLAIN` is a 1:1 copy of `defsym.h` desc strings.

Single-character `'['` / `'1'` / `','`: C `def_char_to_monclass` → `MAXMCLASSES` → 0. JS missing map key → 0. Then `name_to_mon` of that one char is `NON_PM`. “does not represent any monster.” Match. `']'` remaps to `S_MIMIC` so it **does** wipe mimics, not fail. C same.

## Actionable C-wrongs

None that Must-fix this next iter. The blessed wipe and uncursed `how` bits sit where `read.c` puts them.

Named omits / do-nots (map / Open, not Must-fix):

1. `insight.c` `list_genocided` NHW_MENU when `ngone>0` (`insight.js:777–778`). C `read.c:2679–2682` always shows the menu then `--j`. Empty-genocide `'?'` already matches. Do not treat `'?'` as done.
2. livelog first-genocide / decline (`read.c:2673–2675`, `2738–2746`); `update_inventory` after wipe (`read.c:2750`); vampshifted `POLY_REVERT` (`read.c:2752–2755`); Hallucination type names in `do_genocide`; cham `newcham`.
3. `create_particular` still does not call `name_to_monclass` (class-letter / `*`). `read.c` `create_particular_parse` uses it; JS parse is `name_to_mon` only (header named omit).

Do not restore sticky `u.Confusion` into the `how` bits. Do not skip `kill_genocided_monsters` inside the species loop. Do not use youprop `Confusion` that ORs `EConfusion` here (C is `HConfusion` only). Do not pull `is_exclusion_zone` into this SHA. Do not count this SHA as a `list_genocided` port.

### Clones vs C (not Must-fix)

`wizard_mode` extra `flags.wizard` is D-0576, not a genocide invention. `mungspaces` is trim + collapse spaces vs C `hacklib.c` (also strips leading). `upstart` capitalizes byte 0. `strcmpi_eq` is case-fold equality, not a full `strcmpi` locale table — ASCII class names are enough. `ensure_mvitals` allocates a `{mvflags:0}` slot C would have zero-init at birth; first genocide of a never-born species still sets `G_GENOD|G_NOCORPSE`. None of these invert a C `if`. The `'?'` stub is the only “dispatch vs callee” miss, and it is named insight debt.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: blessed genocide now class-wipes through a real `name_to_monclass` and `kill_genocided_monsters`, while `'?'` after a wipe still hits a stub menu and livelog / `POLY_REVERT` / `update_inventory` stay named.
- Must-fix stays empty for this SHA; density is fat but the callees of the wipe are real, not a dispatch-only stub.
