# Review 347 — c3d768d1 — cmd.c getdir cancel leftover dirs (D-1387)

## Metadata
- Full / short hash: `c3d768d11edb0846ff03147c8f30091e7af11cc2` / `c3d768d1`
- Parent: `046481ce` (docs-only review D-1379–D-1386). This file audits **this SHA only** (first of nine `js/` commits since review **346**). Archive **Addressed:** D-1387 `c3d768d1` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 19:25:06 +0200
- D-id: **D-1387**
- Stats: 10 files, +97 / −71 — `js/spell.js` +11 / −36 (delete `getdir_spell`; import live `getdir`).
- Claims to close: Must-fix from review **346** — unskilled SPE_FIREBALL/CONE `getdir` cancel must leave previous `u.dx/u.dy/u.dz` like C `getdir((char*)0)` (`cmd.c` `:4095–4111`). Not Open FORCE_BOLT. `reviews/loop-2026-08-15/` has no unpaid getdir-cancel Must-fix.
- JS / map: `spell.js` `spelleffects`; callee `lock.js` `getdir` / `apply_dirsym`. `c-js-map/turns.md`. FORCE_BOLT IMMEDIATE / heal-tele `weffects` / trailing `confdir` still named.
- Prior reviews this SHA claims to close: **346** QUALITY-RISK actionable #1 (`getdir_spell` zeros then always self-zaps).

## Intent vs deliverable

Git subject promises: “Match C cmd.c getdir cancel so an unskilled fireball ESC reuses leftover u.dx/u.dy and weffects, instead of zeroing dirs and always self-zapping.”

C `cmd.c` `getdir` `:3958–4118`. After `got_dirsym`: GETDIR_SELF/SELF2 zeros dirs (then falls through to trailing `confdir` + `return 1`). Mouse `_` is a named omit. Else `!(is_mov = movecmd(dirsym, MV_ANY)) && !u.dz`: if `dirsym` is in `quitchars[]` (`decl.c:96` `" \r\n\033"`) skip help and **`return 0` without assigning `u.dx`**. Invalid non-quitchar may `help_dir` / `"What a strange direction!"` then also `return 0` without assigning dirs. Grid-bug `dxdy_moveok` fail returns 0. Success: `if (!u.dz) confdir(FALSE); return 1`.

C caller `spell.c` `:1486–1510`: `atme` zeros; else `!getdir((char *) 0)` prints `The magical energy is released!` (C comment: reuse previous direction); then `(0,0,0)` → `zapyourself` else `weffects`. `.` is success-with-zeros, so no energy-released line.

Old JS: local `getdir_spell` zeroed on ESC/space/return and on unknown keys; the D-1386 comment claimed “C then releases energy at self.” Review **346** proved that citation false.

The diff **does** delete the clone, import `getdir` from `lock.js`, and switch both the unskilled FIREBALL FALLTHROUGH arm and the HEALING/TELEPORT arm to `await getdir(null)`. It does **not** add trailing `confdir` to shared `getdir` (CURRENT / playbook ban). It does **not** port FORCE_BOLT IMMEDIATE `bhit`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `getdir(null)` | C `getdir((char*)0)`, **imported live** | `lock.js`; cancel leaves dirs |
| `apply_dirsym` | C `movecmd` + SELF/`<>`, **live helper** | `.`/`s` zero + return true |
| `getdir_spell` | clone, **deleted** | was the C-wrong |
| unskilled FALLTHROUGH weffects | C `:1454–1514`, **already wired** | D-1386; this SHA only changes getdir |
| `weffects` SPE RAY | C `:3461–3462`, **already live** | leftover ESC now reaches it |
| `zapyourself` FIREBALL | C, **already live** | D-1365; zero leftover / `.` |
| trailing `confdir(FALSE)` | C `:4116–4117`, **named omit** | lock.js comment; do not add |
| help_dir / cmdassist | C `:4098–4109`, **named omit** | throw keeps `getdir_cmdassist` |
| mouse `_` getpos | C `:4024–4094`, **named omit** | |
| FORCE_BOLT IMMEDIATE | C `:1458–1459`, **named omit** | next Open (later D-1388) |
| heal/tele directional weffects | C `:1509–1510`, **named omit** | healing still skips `weffects` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** getdir itself none (fuzzer `rn2` is C-only). Leftover-dir ESC now burns directional `ubuzz`/`dobuzz` (fireball type 11 explode `d(nd,6)` olet 0) instead of self `d(6,6)`. That is the C keep-path, not a new die invented here.

## C ↔ JS fidelity

`lock.js` `getdir` `:325–372`: cmdq DIR/KEY first; else prompt `prompt || 'In what direction?'`; `^R` retries; ESC/space/`\n`/`\r` **`return false` without writing `u.dx/dy/dz`**. That is `cmd.c:4095–4111` quitchars. `apply_dirsym` then handles `.`/`s` (SELF zero, return true), `<>` (dz ±1), hjkl/yubn, optional numpad `5`/digits. Invalid key: `apply_dirsym` returns false **without** assigning dirs — same leftover reuse as C’s non-quitchar fail, minus the help pline.

Unskilled FIREBALL/CONE at this SHA still inlined the wand-duplicate envelope (later D-1388 extracts `wand_duplicate_weffects`). After `!getdir(null)` it prints the energy line then branches on leftover zeros vs `weffects`. Call-for-call with `:1488–1510` on the promised cancel arm.

`.` : JS returns true after zeroing → `zapyourself`, no energy line. C GETDIR_SELF zeros, **returns 1**, same branch. Match that key.

ESC with leftover `dx=1`: JS returns false, dirs stay, energy line, `weffects` → SPE RAY `ubuzz`. C same. This is the review **346** C-wrong, gone.

ESC with leftover already `(0,0,0)`: energy line then `zapyourself`. C same (FIXME comment in spell.c admits accidental self). Match.

Healing/TELEPORT also switched to live `getdir`. Cancel-without-zero is C. That arm still **does not** call `weffects` when leftover dirs are nonzero (`// else weffects deferred`). C would. Named omit, not a silent stub on the **fireball** envelope this SHA promised. Old `getdir_spell` made heal-ESC always self-zap; new JS makes leftover-dir heal-ESC a no-op after the energy pline. Closer to C on getdir, still missing the callee.

Trailing `confdir`: C runs it on every successful getdir with `!u.dz`, including `.` (confused `.` is **not** self). JS `lock.js` omits it so `use_whip` does not double-confdir. CURRENT: do not add trailing `confdir` inside shared `getdir`. Named, not a Must-fix.

Hallucination check: “Match C getdir cancel leftover dirs” while **`lock.js` `getdir` is the real function and does not zero on quitchars** is not a dispatch-stub lie. `weffects` / `ubuzz` were already live from D-1386. Do **not** stamp “Match C trailing `confdir`.” Do **not** stamp “Match C SPE_FORCE_BOLT IMMEDIATE `bhit`.” Do **not** stamp “Match C heal/tele `weffects`.”

## Hallucinations / overclaim

Subject says unskilled fireball ESC reuses leftover `u.dx/u.dy` and `weffects` instead of always self-zapping. **True on the keep-path** when leftover dirs are nonzero (RAY `ubuzz`) and when leftover is already self (energy line + `zapyourself`). **True for `.`** (SELF-zero, no energy line). **False until named for confused success** (C `confdir`; JS uses the typed dir). D-log “leftover-dir ESC/space weffects `rn2(7)`+`d(12,6)` not `d(6,6)`” is the right falsifier for this SHA; D-1386’s “ESC self” canary was the clone. Stamping **Addressed:** D-1387 for `:4095–4111` + `:1488–1510` cancel is fair. Do **not** treat fortress PASS as leftover-dir fireball (public-unhit).

## Density

Delete one diverging clone and point two existing call sites at the live C callee. ~36 lines removed, 11 added. Playbook §2b: the Must-fix was one `if` family; shipping the live `getdir` instead of a one-line “stop zeroing” patch is the right size (the clone also lacked `<>` / numpad / `^R`). Did not glue FORCE_BOLT IMMEDIATE (next Open). Did not add `confdir` to shared `getdir`.

## Branch-by-branch confirm

1. Unskilled hjkl: unchanged from D-1386; `weffects` → ubuzz type 11. Match.
2. Unskilled `.`: live SELF-zero, `zapyourself` `d(6,6)`, no energy line. Match C return 1.
3. Unskilled ESC + leftover east: energy line + RAY weffects, **not** self explode. Match `:1488–1510` + `:4111`.
4. Unskilled space/`\n`/`\r`: same as ESC (`quitchars[]`). Match.
5. Unskilled ESC + leftover already (0,0,0): energy line + self. Match C FIXME self.
6. Leftover `.` after a prior dir: SELF zeros then self-zap, **not** leftover weffects. Match GETDIR_SELF.
7. Unskilled CONE leftover ESC: type 12 ray. Match D-1386 callee.
8. Skilled scatter: unchanged D-1378. Match.
9. HEALING ESC leftover nonzero: energy line, **no** `weffects`. Named omit.
10. FORCE_BOLT: still other-otyp `Nothing happens.` Named (later D-1388).
11. Confused hjkl: C `confdir`; JS typed dir. Named omit. Do not Must-fix.
12. **Public-unhit** until a session casts unskilled fireball/cone with leftover dirs.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No hardcoded coordinates. The fix is “call the live `getdir`,” not a leftover-dir index. Plain ESM. `getdir(null)` is C `(char *) 0`, not a prompt hack.

## Verification

Journal: private canary **14**/14 (C/JS grep; leftover-dir ESC/space weffects `rn2(7)`+`d(12,6)` not `d(6,6)`; zero-leftover ESC still self; leftover `.` SELF-zero self; hjkl; CONE leftover ESC ray; FORCE_BOLT still omit; skilled scatter; HEALING; Rule #2). That ESC case **does** exercise leftover-dir weffects (unlike D-1386’s ESC-self canary). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence full `sessions` is at HEAD after later SHAs; fortress PASS is not leftover-dir fireball.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Review **346** item 1 is the live `lock.js` `getdir`: quitchars return false without zeroing; unskilled FIREBALL then `weffects` leftover dirs. Remaining gaps are named omits already in lock.js / turns.md / later Open.

Named omits (map / already-Open, not Must-fix):

1. trailing `confdir(FALSE)` on shared `getdir` — do **not** add (whip would double)
2. help_dir / cmdassist / `"strange direction!"` / mouse `_`
3. SPE_FORCE_BOLT IMMEDIATE `bhit` (already Open at this SHA; later D-1388)
4. heal/tele directional `weffects` after leftover-dir cancel
5. `zhitm` `spell_damage_bonus`; zap_steed / zap_updown

Do not Must-fix “zero dirs on ESC so self-zap matches the old canary” (that was the C-wrong). Do not Must-fix “add `confdir` inside `lock.js` `getdir`.” Do not Must-fix “ubuzz FORCE_BOLT” (C IMMEDIATE, not in MAGIC_MISSILE..FINGER_OF_DEATH).

## Callers / RNG ledger

C unskilled leftover-dir cancel: buzz dice, not self `d(6,6)`. JS now the same. C `.` : self explode, no buzz. JS same. Public fortress never casts this envelope.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: unskilled fireball ESC now reuses leftover dirs through live `lock.js` `getdir` into already-wired `weffects`; trailing `confdir` and heal `weffects` stay named.
- Must-fix stays empty for this SHA; review **346** QUALITY-RISK is closed as D-1387 `c3d768d1`.
