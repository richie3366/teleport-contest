# Review 142 — 0b488053 — teleport.c `rloc` `RLOC_ERR` `impossible()` (D-1181)

## Metadata
- Full / short hash: `0b488053437b84acdd0e4b7bce5570fe208f7f16` / `0b488053`
- Parent: `b945f346` (review **138–141** + cadence #1500). This file audits **this SHA only**. Archive row **Addressed:** D-1181 `0b488053` was filled by D-1182.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 21:55:48 +0200
- D-id: **D-1181**
- Stats: 11 files, +147 / −45 — `js/display.js` +33 (`impossible`); `js/teleport.js` +18 / −7 (`RLOC_ERR` fail arm).
- Claims to close: Open queue `teleport.c` `rloc` `RLOC_ERR` `impossible()` (named). Not vanish-msg. Review **141** named `:1884–1888` as next after telemsg. `reviews/loop-2026-08-15/` has no open RLOC_ERR Must-fix.
- JS / map: `teleport.js` `rloc`; callee `display.js` `impossible`. `c-js-map/turns.md` `teleport.c`. ustuck-together; wand `makeknown`; `set_msg_xy`; `rloc_pos_ok` mx==0 still named (later SHAs in this window).
- Prior reviews this SHA claims to close: **141** next-port `RLOC_ERR`.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc RLOC_ERR so a failed relocation with the error flag reports the C impossible() disorder plines, instead of returning false silently.”

Old JS after 50 `rnd`/`rn2` tries and unshuffled candy did `if (!backupx) return false`. C `:1884–1888` is: if no `rloc_pos_ok` cell and no `goodpos` backup, then if `(rlocflags & RLOC_ERR)` `impossible("rloc(): couldn't relocate monster")`, then `return FALSE`. Without the bit both stay silent FALSE.

The diff **does** add that flag test and a `display.js` `impossible` envelope (urgent first line, disorder, DEVTEAM_EMAIL report; `in_sanity_check` skips extra; `something_worth_saving` save-hint). It does **not** port paniclog file, recursive `panic()`, debug_fuzzer panic, `sysopt.support`, or CRASHREPORT yn. Named. Did not pull ustuck-together or mx==0.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc` no-backup fail | C branch, **rewritten** | `teleport.c:1884–1888`; was silent `return false` |
| `RLOC_ERR` | C flag, **imported** | `hack.h:1392` / `const.js` `0x01` |
| `impossible` | C callee, **new clone** | `pline.c:584–634`; not a no-op |
| `urgent_pline` | C `URGENT_MESSAGE` first line | C `impossible` sets `pline_flags` then `pline`; JS `urgent_pline` ≡ `custompline(URGENT_MESSAGE)` (`pline.c:310–323`) |
| `DEVTEAM_EMAIL` | C macro, **imported** | `const.js` `"devteam@nethack.org"` |
| recursive `panic` | C, **named omit** | C panics; JS returns |
| `paniclog` | C, **named omit** | Rule #2 filesystem |
| debug_fuzzer / `sysopt.support` / CRASHREPORT | C, **named omit** | network / fuzzer |
| mkmaze baalz callers | C `mkmaze.c:547,556` | JS `mklev.js:632,646` already pass `RLOC_ERR\|RLOC_NOMSG` |
| vault / steed bones / mplayer | C callers, **named omit** | `vault.c:743`; `steed.c:713`; `mplayer.c:127` — JS does not pass the bit |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

**New RNG on this path:** none. Candy `rn2` already ran. `impossible` is pline only. Path **public-unhit** unless a `RLOC_ERR` caller cannot place (D-log: baalz wallification still finds a cell).

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not silent-return on `RLOC_ERR`. Do not `impossible` when the bit is clear. Do not pull mx==0 into a line that said “Not vanish-msg.” Do not import `fs` for paniclog.

## C ↔ JS fidelity

### Fail arm vs `teleport.c:1880–1888`

C after the candy shuffle:

```
if (!backupcc.x) {
    if ((rlocflags & RLOC_ERR) != 0)
        impossible("rloc(): couldn't relocate monster");
    return FALSE;
}
x = backupcc.x, y = backupcc.y;
```

`backupcc.x == 0` is the unused column (map x starts at 1). JS `if (!backupx)` then the same flag test, `await impossible(...)`, `return false`; else `x = backupx`. Steed `tele()` / Wizard stair / `mon_telecontrol` / 50× random / candy `rn2` swap are **untouched** this SHA and already matched D-1122 / D-1172. Match the Open `RLOC_ERR` line.

`backupcc.y` is unused as a failure sentinel; C tests **x** only (column 0 is never a legal dest). JS `backupx` is the same. A `goodpos` backup at x≥1 skips `impossible` even when every `rloc_pos_ok` failed — C comment `:1880–1883` (onscary / teleport-region ignored). Match.

Wizard stair / `control_mon_tele` success `goto found_xy` never reach this arm. Steed returns TRUE before the loop (D-1172). This SHA does not change those.

### `impossible` vs `pline.c:584–634`

C order: `in_impossible` → `panic("impossible called impossible")`; set guard; `vsnprintf`; `paniclog`; debug_fuzzer maybe panic; `URGENT_MESSAGE` + `pline("%s", pbuf)`; if `in_sanity_check` clear guard and return; else `"Program in disorder!"` + optional save-hint; `"Please report these messages to %s."` `DEVTEAM_EMAIL`; optional support / CRASHREPORT; clear guard.

JS: recursive → **return** (named); no paniclog / fuzzer / support / CRASHREPORT (named); `urgent_pline(pbuf)`; sanity skip extra; disorder + hint; report line; clear guard. First-line-then-sanity order **matches**. `urgent_pline` is the C helper that is equivalent to `pline` with `URGENT_MESSAGE`, not a stub.

Format clone is `%[%sd]` only. This caller is a literal with **zero** args — C `vsnprintf` of that string is identity. Do not Must-fix a general vsprintf onto this peel.

C first line uses `pline` with `gp.pline_flags = URGENT_MESSAGE` then clears the flag (`:602–604`). `urgent_pline` (`:315–323`) is documented as equivalent to `custompline(URGENT_MESSAGE, …)`. JS `urgent_pline` also clears WIN_STOP so an ESC’d `--More--` cannot swallow the bug line — that is the C URGENT contract, not extra DIAG.

Disorder string: C `Strcpy(pbuf2, "Program in disorder!")` then optional `Strcat` save-hint (`:612–614`). JS concatenates the same two English sentences. Report line interpolates `DEVTEAM_EMAIL` (C `%s`). Match the three player-visible lines.

### Callers

C `RLOC_ERR` sites: `mkmaze.c` baalz (two), `steed.c` `DISMOUNT_BONES`, `mplayer.c` insurance, `vault.c:743` `RLOC_ERR|RLOC_MSG`. JS mklev already passed the flag (unawaited Promise — candy RNG is sync before `await impossible`; named async translation, same as other mklev `rloc` sites). vault / steed / mplayer still omit the bit. **Named callers**, not a clone that contradicts `:1886–1887`.

`mklev.js` baalz wallification (`TLWALL`/`TRWALL` over `TUWALL`, then the `x2,y2` pair) is the JS of `mkmaze.c` around 547/556. Those sites already imported `RLOC_ERR` before this SHA; this SHA makes the flag **do** C’s `impossible` instead of a silent false. Unawaited: `rloc` is `async`; mklev does not `await`. The 50× `rnd`/`rn2` and candy `rn2` run **synchronously** until `await impossible`. If failure ever fires during mklev, the plines are a floating Promise — named async translation, same class as other mklev `rloc` calls, not a Must-fix that should jump the seed8243 canary.

`const.js` `RLOC_ERR = 0x01`, `RLOC_MSG = 0x02`, `RLOC_NOMSG = 0x04` match `hack.h:1390–1394`. Combining `RLOC_ERR | RLOC_NOMSG` still hits `impossible` because the test is the ERR bit, not MSG. C baalz uses that combination. Match.

| Case | C | JS after |
|------|---|---------|
| no backup, bit clear | silent FALSE | **same** |
| no backup, `RLOC_ERR` | urgent + disorder + report, FALSE | **same** envelope |
| `RLOC_NOMSG` with bit | still `impossible` (flag independent of MSG) | **same** |
| `in_sanity_check` | first line only | **same** |
| `something_worth_saving` | save-hint suffix | **same** |
| recursive `impossible` | `panic` | **named return** |
| backup `goodpos` exists | use backup, no `impossible` | **same** (`!backupx`) |

### JS as shipped (`teleport.js:1283–1288`, `display.js:3587–3608`)

`rloc` imports `impossible` from `display.js` — C callee, not a teleport-local stub. Fail arm:

```
if (!backupx) {
    if ((rlocflags & RLOC_ERR) !== 0) {
        await impossible("rloc(): couldn't relocate monster");
    }
    return false;
}
```

`impossible` sets `program_state.in_impossible`, formats `%[%sd]` only, `urgent_pline(pbuf)`, sanity early-out, then disorder ± save-hint, then `Please report these messages to ${DEVTEAM_EMAIL}.`, then clears the guard. Recursive call returns. No `paniclog`. That is the named envelope, not a no-op.

C `mkmaze.c:547,556` baalz: `(void) rloc(mtmp, RLOC_ERR|RLOC_NOMSG)` after rewriting temporary TLWALL/TRWALL over TUWALL / TDWALL. JS `mklev.js:632,646` already pass the same bits. C `vault.c:743` `rloc(mtmp, RLOC_ERR | RLOC_MSG)` then `m_into_limbo` if still `MON_AT`; JS vault does not pass ERR (named). C `steed.c:713` DISMOUNT_BONES else `rloc(mtmp, RLOC_ERR | RLOC_NOMSG)` after `enexto` fail; JS steed omits the bit (named). C `mplayer.c:127` insurance before `makemon`; JS mkp_player omits (named).

RNG on the fail arm: candy shuffle already consumed `rn2(candycount-i)` per slot (`teleport.c:1864–1878`). This SHA adds **zero** dice. `impossible` is pline only.

RNG call-for-call **before** this arm (untouched this SHA, required so the fail arm is reachable only after C’s dice): steed `tele()` (D-1172, may consume hero-teleport dice then return TRUE — never this arm); Wizard `goodpos` stair (no die); `control_mon_tele` (player getpos, not `rn2`); 50× `rnd(COLNO-1)` + `rn2(ROWNO)` (`:1849–1854`); `collect_coords` unshuffled; then per candy `rn2(candycount-i)` swap if `j>0`. Fail arm runs only when that loop found neither `rloc_pos_ok` nor `goodpos` backup. Match.

Prior reviews **138–141** named `:1884–1888` as the next Open after telemsg. This SHA is that row. `reviews/loop-2026-08-15/` has no unpaid RLOC_ERR Must-fix. Journal “fortress held” on D-1181 does not skip this audit.

## Hallucinations / overclaim

D-log / CURRENT / subject say a failed `RLOC_ERR` relocation reports C’s `impossible()` disorder plines instead of silent FALSE. **That is the hunk:** C `:1884–1888` plus the pline envelope. Stamping **Addressed:** D-1181 is fair for the Open **RLOC_ERR** line. Hash `0b488053` is on the archive row (filled by D-1182). Do **not** stamp it as “Match C vault `RLOC_ERR`” or “Match C paniclog” or “Match C ustuck-together.” This is **not** “Match C dispatch, callee is a stub”: `impossible` prints the three C strings; `urgent_pline` / `pline` are live.

## Density

One C fail arm plus the callee that arm requires. ~50 JS lines. Right-size §2b. Did not pull mx==0 or ustuck. Not QUALITY-RISK.

## Verification

Journal: private canary **25**/25 (no-flag silent; `RLOC_MSG`-only silent; `RLOC_ERR` bug+disorder+report; NOMSG still impossible; worth_saving; sanity skip; recursive no-op; exact C string); green+strict seed8000/0900; cohort **12**/12 (green + 1500/1800/0015/0002/0014/2200/4500/0367/0360/0012). Path **public-unhit** unless a `RLOC_ERR` caller cannot place. Cadence **#1505** **44**/44 is the fortress check, not a baalz-full canary.

C read of `teleport.c:1798–1894`, `pline.c:584–634` / `urgent_pline` `:315–323`, `hack.h` `RLOC_*`, callers `mkmaze.c:547,556` / `steed.c:709–713` / `mplayer.c:126–127` / `vault.c:743`. JS SHA `rloc` fail arm / `display.js` `impossible`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` Scr **11405**/11405 RNG **792838**/792838 (100%).

## Actionable C-wrongs

None that Must-fix this next iter. The Open `RLOC_ERR` arm matches `:1884–1888`. The clone is the C envelope with named omits. Not a stub.

Named omits / do-nots (map / Open, not Must-fix):

1. vault `rloc(..., RLOC_ERR\|RLOC_MSG)`; steed `DISMOUNT_BONES`; mplayer insurance.
2. paniclog / recursive `panic` / debug_fuzzer / `sysopt.support` / CRASHREPORT.
3. mklev baalz `rloc` is unawaited (pre-existing mklev `rloc` Promise).
4. Do not `impossible` when the bit is clear. Do not silent-return on `RLOC_ERR`. Do not pull mx==0 / ustuck into this SHA — **Addressed:** D-1182 `01c8c41f` / D-1183 `d2512b22`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: a no-backup `rloc` with `RLOC_ERR` now prints C’s urgent `"rloc(): couldn't relocate monster"` plus disorder/report and returns false, while paniclog and the vault/steed/mplayer flag bits stay named.
- Must-fix stays empty for this SHA; next port in this window popped Open mx==0. **Addressed:** D-1181 `0b488053`. Not vanish-msg, not vault.
