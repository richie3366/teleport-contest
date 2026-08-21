# Review 346 — 1f94d5e3 — spell.c unskilled FIREBALL FALLTHROUGH weffects (D-1386)

## Metadata
- Full / short hash: `1f94d5e39483377ae50217e50a4421f9d68d76cc` / `1f94d5e3`
- Parent: `5be02746` (D-1385). This file audits **this SHA only** (last of eight `js/` commits since review **338**). Archive **Addressed:** D-1386 lacked the short hash; this review commit fills `1f94d5e3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 18:59:24 +0200
- D-id: **D-1386**
- Stats: 10 files, +140 / −44 — `js/spell.js` +48 / −11 (unskilled FALLTHROUGH); `js/zap.js` +29 / −7 (`BZ_U_SPELL` + RAY SPE `ubuzz`).
- Claims to close: Open `spell.c` unskilled SPE_FIREBALL/CONE FALLTHROUGH weffects (named from D-1378 / review **338**). Not skilled scatter. `reviews/loop-2026-08-15/` has no unpaid fireball Must-fix.
- JS / map: `spell.js` `spelleffects`; `zap.js` `weffects` / `ubuzz`. `c-js-map/turns.md`. FORCE_BOLT IMMEDIATE / other otyps / zhitm bonus still named.
- Prior reviews this SHA claims to close: **338** named unskilled FALLTHROUGH after skilled scatter.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects unskilled FIREBALL/CONE FALLTHROUGH so a basic fireball actually getdir-zaps via weffects ubuzz, instead of printing Nothing happens.”

C `spell.c` `spelleffects` `:1454–1514`: unskilled FIREBALL/CONE FALLTHROUGH `SPE_FORCE_BOLT` (`physical_damage = TRUE`) into the wand-duplicate envelope: `getdir((char *) 0)`; cancel prints `The magical energy is released!` and **reuses previous** `u.dx/u.dy/u.dz`; then `zapyourself` if all zero else `weffects(pseudo)`. Callee `zap.c` `weffects` `:3461–3462`: `otyp >= SPE_MAGIC_MISSILE && otyp <= SPE_FINGER_OF_DEATH` → `ubuzz(BZ_U_SPELL(BZ_OFS_SPE(otyp)), u.ulevel/2+1)`. Objects.h says those five SPELL() rows must stay contiguous for `buzz()`.

C `getdir` (`cmd.c:4095–4111`): quitchars (ESC/space/return) `return 0` **without** zeroing dirs. `.` is GETDIR_SELF: zeros dirs and **returns 1** (no “energy released”).

Old JS: unskilled arm printed `Nothing happens.`; `weffects` SPE ubuzz deferred.

The diff **does** FALLTHROUGH `physical_damage` + getdir + self/`weffects`, export `weffects`, and the SPE RAY `ubuzz` range. It does **not** port FORCE_BOLT IMMEDIATE `bhit`. Named. It **does** call local `getdir_spell()`, which **zeros** dx/dy/dz on cancel. That is not C `getdir`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| unskilled FALLTHROUGH | C `:1454–1514`, **wired** | physical_damage then weffects |
| `weffects` SPE RAY | C `:3461–3462`, **wired export** | MAGIC_MISSILE..FINGER_OF_DEATH |
| `BZ_OFS_SPE` / `BZ_U_SPELL` | C `hack.h:1478–1482`, **wired** | 10+(otyp-SPE_MM)%10 |
| `ubuzz` | C `zap.c`, **imported live** | D-0974 |
| `zapyourself` FIREBALL | C, **imported live** | D-1365 returns 0 |
| `maybe_half_phys` | C `Maybe_Half_Phys`, **imported live** | unused: fireball self returns 0 |
| `getdir_spell` | C `getdir((char*)0)`, **clone that diverges** | cancel zeros dirs |
| `lock.js` `getdir` | C `cmd.c`, **live unused** | cancel already leaves dirs |
| FORCE_BOLT IMMEDIATE | C `:1458–1459` then `bhit`, **named omit** | otyp 376 not in RAY range |
| `update_inventory` | C `:1513`, **named omit** | |
| zap_steed / zap_updown | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** getdir itself none; directional `ubuzz`/`dobuzz` (fireball type 11 explode `d(nd,6)` olet 0); self `zapyourself` `d(6,6)` explode. Unskilled does **not** burn skilled `rnd(8)+1`. `getdir_spell` cancel currently **forces** the self explode.

## C ↔ JS fidelity

Energy/WIS/`mksobj` still run before the otyp switch (JS `:1344+`). Skilled scatter (D-1378) unchanged. Unskilled sets `physical_damage=true` then NODIR vs directional. FIREBALL/CONE are RAY (`objects.h:1300–1303`), so `weffects` hits `:3461–3462`. `BZ_OFS_SPE(SPE_FIREBALL)=1` → type 11; CONE → 12. `nd = trunc(ulevel/2)+1`. Match the RAY callee.

`.` self: `getdir_spell` returns true with zeros → `zapyourself` without “energy released.” C `.` returns 1 after zeroing. Match that key.

ESC/space/return: C `getdir` returns 0, **leaves leftover dirs**, prints `The magical energy is released!`, then `weffects` if the previous command left a dir. JS `getdir_spell` **zeros** then returns false, prints the line, then **always** `zapyourself`. The helper comment claims “C then releases energy at self.” That citation is **false** (`cmd.c:4111` `return 0` does not assign `u.dx`). `lock.js` `getdir` already returns false on those keys **without** zeroing (`:367–368`) and `apply_dirsym` already handles `.` / `s` / `<>` / numpad. This SHA wired the new FALLTHROUGH through the clone anyway.

Canary “ESC self” verified the clone, not C.

Hallucination check: “Match C getdir-zaps via `weffects` `ubuzz`” while **`ubuzz`/`weffects` are live** is not a dispatch-stub lie on the **hjkl** arm. “Match C getdir” while **`getdir_spell` zeros on cancel** **is** an overclaim on the cancel arm this SHA newly copied from `:1488–1510`. Do **not** stamp “Match C `getdir((char*)0)`.” Do **not** stamp “Match C SPE_FORCE_BOLT IMMEDIATE `bhit`.”

## Hallucinations / overclaim

Subject says a basic fireball actually getdir-zaps via weffects ubuzz instead of `Nothing happens.` **True for hjkl / `.` when `P_SKILL < P_SKILLED`.** **False for ESC/space/return when leftover dirs are nonzero** (C weffects in that dir; JS self-explodes). D-log “ESC self” repeats the clone. Stamping **Addressed:** D-1386 for FALLTHROUGH + SPE `ubuzz` is fair for deleting `Nothing happens.` It is **not** fair for “Match C getdir cancel.” Do **not** treat fortress PASS — including seed0501 priest-cast — as unskilled fireball (that session is not this envelope unless it zaps).

## Density

One C FALLTHROUGH plus the `weffects` SPE arm the explode line needs. ~70 lines of JS. Playbook §2b caller/callee cluster. Did not glue FORCE_BOLT IMMEDIATE (next Open). Right size. The healing path already used `getdir_spell`; that does not excuse shipping the same cancel-zero on a **new** RAY keep-path whose C comment is specifically “re-use previous direction.”

## Branch-by-branch confirm

1. Skilled FIREBALL: still scatter; no FALLTHROUGH. Match D-1378.
2. Unskilled hjkl: `weffects` → ubuzz type 11, `nd=ulevel/2+1`. Match.
3. Unskilled CONE: type 12 cold ray. Match.
4. `.` self: `zapyourself` SPE_FIREBALL explode `d(6,6)` WAND_CLASS; return 0 so no `losehp`/`Maybe_Half_Phys`. Match D-1365 + FALLTHROUGH no-op on 0.
5. ESC with leftover dx: C weffects; **JS self-zap. C-wrong.**
6. FORCE_BOLT: still other-otyp `Nothing happens.` Named (IMMEDIATE, otyp 376, not in 367..371).
7. HEALING arm unchanged. Match.
8. **Public-unhit** until a session casts unskilled fireball/cone.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Type 11/12 and `ulevel/2+1` are C buzz arithmetic. Plain ESM. The getdir miss is a **clone**, not a trace index. CURRENT still bans trailing `confdir` inside shared `getdir` — do not “fix” that here.

## Verification

Journal: private canary **17**/17 (C/JS grep; BZ arithmetic; unskilled dir `rn2(7)`+`d(12,6)` not `rnd(8)`; self `d(6,6)`; **ESC self**; CONE ray; FORCE_BOLT still omit; skilled scatter regression; HEALING; Rule #2). The ESC case would **not** have caught leftover-dir weffects. green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD `1f94d5e3` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not an unskilled fireball.

## Actionable C-wrongs

1. `spell.js` unskilled SPE_FIREBALL/CONE FALLTHROUGH must use C `getdir((char*)0)` cancel semantics: ESC/space/return return false **without** zeroing `u.dx/u.dy/u.dz`, then `weffects` if leftover dirs are nonzero (`cmd.c:4095–4111` + `spell.c:1488–1510`). `getdir_spell` currently zeros and always self-zaps. Call live `lock.js` `getdir` (already cancel-without-zero; `apply_dirsym` already has `.`/`<>`) or stop zeroing in the clone. Do **not** add trailing `confdir` to shared `getdir`. Source: this review.

Named omits (map / already-Open, not Must-fix):

1. SPE_FORCE_BOLT IMMEDIATE `bhit` (already Open)
2. other `spelleffects` otyps (CREATE_FAMILIAR / PROTECTION / CLAIRVOYANCE — later Open)
3. zhitm `spell_damage_bonus`
4. `update_inventory`; zap_steed / zap_updown

Do not Must-fix “skip `physical_damage` on fireball self” (C FALLTHROUGH sets it; `zapyourself` returns 0). Do not Must-fix “`rnd(8)+1` on unskilled” (C does not). Do not Must-fix “ubuzz FORCE_BOLT” (C IMMEDIATE, not in MAGIC_MISSILE..FINGER_OF_DEATH).

## Callers / RNG ledger

C unskilled dir: buzz dice, not `rnd(8)`. JS hjkl same. JS ESC currently takes self-explode dice instead of leftover-dir buzz. Public fortress never casts this envelope.

## Verdict

- Verdict: **QUALITY-RISK**
- One sentence: unskilled fireball/cone now ubuzz via live `weffects`, but cancel uses a `getdir_spell` clone that zeros dirs so leftover-dir weffects never run.
- Must-fix prepends that getdir cancel; next port ships it before Open FORCE_BOLT.
