# Review 543 — 6c996e15 — cmd.c PREFIXCMD / cmdq_shift (D-1582)

## Metadata
- Full / short hash: `6c996e15c21e53198edbbd97cb7c0e701d8df609` / `6c996e15`
- Parent: `fd458754` (D-1581). This file audits **this SHA only** (seventh of nine `js/` commits since review **536**). Archive **Addressed:** D-1582 `6c996e15`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 17:15:27 +0200
- D-id: **D-1582**
- Stats: `js/cmd.js` +421/−net, `js/getline.js` +8, `js/const.js` +2. Band **200–450** (js/ insertions **349**).
- Claims to close: Open PREFIXCMD `got_prefix_input` / `cmdq_shift` after D-1563. Not nested F+g/G full `CMD_gGF` table. Not keyboard hjkl `DIR_DX`. `reviews/loop-2026-08-15/` has no unpaid PREFIXCMD Must-fix.
- JS / map: `cmd.js` PREFIXCMD loop + `cmdq_shift`; `getline.js` `ext_tlist`; `const.js` `CMD_gGF_PREFIX`; `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **524** named PREFIXCMD `prefix_seen` / `cmdq_shift`.

## Intent vs deliverable

Git subject promises: g/G/F/m stay in `rhack` (`got_prefix_input`) and doextcmd `cmdq_shift` puts the resolved command first on CQ_REPEAT.

Pinned C `cmd.c` `rhack` PREFIXCMD `:3762–3774` (`goto got_prefix_input`; CANCEL → `reset_cmd_vars(TRUE)`). REPEAT `:3732–3740` (`cmdq_clear` unless `prefix_seen`, then `cmdq_add_ec`). doextcmd `ext_tlist` add+shift `:3753–3760`. `cmdq_shift` `:354–370` (sole `--callers` hit `:3759`). Callees `do_rush` `:1589–1602`, `do_run` `:1605–1618`, `do_fight` `:1621–1634`, `do_reqmenu` `:1574–1586`, `set_move_cmd` `:1386–1400`, `do_move_*` `:1403–1464`, `reset_cmd_vars` `:3606–3624`, `cmdq_add_ec` `:253–270`. `doextcmd` itself `:492–520` sets `ge.ext_tlist` at `:513` before `(*func)()`. Flag check `:3693–3695` (`PREFIXCMD` or `CMD_M_PREFIX` / `CMD_gGF_PREFIX`).

```3762:3774:nethack-c/upstream/src/cmd.c
                if ((tlist->flags & PREFIXCMD) != 0) {
                    if ((res & ECMD_CANCEL) != 0) {
                        reset_cmd_vars(TRUE);
                        return;
                    }
                    prefix_seen = tlist;
                    cmdq_ec = NULL;
                    if (func == do_reqmenu)
                        was_m_prefix = TRUE;
                    goto got_prefix_input;
                }
```

```354:370:nethack-c/upstream/src/cmd.c
void
cmdq_shift(int q)
{
    ...
    if (tmp) {
        tmp->next = gc.command_queue[q];
        gc.command_queue[q] = tmp;
        cq->next = NULL;
    }
}
```

Old JS: D-1563 `do_repeat` live; g/G set run and **returned**; REPEAT replace `[fn]`; no `cmdq_shift`. **524** named that miss.

The diff **does** add `for(;;)` `got_prefix_input`, PREFIXCMD continue, REPEAT append when `prefix_seen`, `cmdq_shift` after `ext_tlist`, live `do_rush`/`do_run`/`do_fight`/`do_reqmenu`, `set_move_cmd` + `do_move_*` for REPEAT, `CMD_gGF_PREFIX` bits. It **does not** route live hjkl through `do_move_*` (`DIR_DX` still), nested F+g/G via the full `CMD_gGF` table, `dxdy_moveok`, `cmd_from_func`, capital `do_run_*` REPEAT, travelmap `selection_free`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `cmdq_shift` | C `:354–370`, **LIVE this SHA** | array `unshift(pop())` ≡ last→head |
| `do_rush` / `do_run` | C `:1589–1618`, **LIVE this SHA** | double RUSH → CANCEL |
| `do_fight` | C `:1621–1634`, **LIVE this SHA** | forcefight + DOMOVE_WALK |
| `do_reqmenu` | C `:1574–1586`, **LIVE this SHA** | visctrl `'m'` stand-in |
| `set_move_cmd` | C `:1386–1400`, **CLONE** (cmd.js only) | REPEAT / canned MOVEMENTCMD |
| `do_move_*` | C `:1403–1464`, **LIVE this SHA** | REPEAT records these |
| `reset_cmd_vars` | C `:3606–3624`, **CLONE** | travelmap `selection_free` named |
| `cmdq_add_ec` | C `:253–270`, **CLONE** (cmd.js) | do **not** add #6 (apply/dig/dothrow/iactions) |
| `doextcmd` `ext_tlist` | C `:513–517` + rhack `:3753–3760`, **LIVE this SHA** | getline + rhack shift |
| PREFIXCMD continue | C `:3762–3774`, **LIVE this SHA** | g/G/F/m + `#rush` etc. |
| keyboard hjkl / capital run | C `do_move_*` / `do_run_*`, **OMIT named** | live `DIR_DX` |
| `dxdy_moveok` / `cmd_from_func` / nested F+g | **OMIT named** | |
| `CMD_gGF_PREFIX` table | C `:3693–3695`, **OMIT named** | bits in const; rhack still char lists |

`node scripts/csym.mjs cmdq_shift` → `:354-370`. `--callers`: **1** (`cmd.c:3759`). `do_rush`/`do_reqmenu`/`do_fight` `--callers`: **0** (extcmdlist / `move_funcs` pointers, not direct calls). `reset_cmd_vars` callers include PREFIXCMD CANCEL `:3766` and grid-bug `:3783`. `cmdq_add_ec` rhack REPEAT `:3735` / `:3756`.

RNG: **none** in PREFIXCMD / `cmdq_shift`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
cmdq_shift       js/cmd.js:130   sync
do_rush          js/cmd.js:213   ASYNC — await required
do_run           js/cmd.js:230   ASYNC — await required
do_fight         js/cmd.js:247   ASYNC — await required
do_reqmenu       js/cmd.js:265   ASYNC — await required
set_move_cmd     NOT EXPORTED — 1 LOCAL js/cmd.js:183
             => Do NOT write clone #2.
reset_cmd_vars   NOT EXPORTED — 1 LOCAL js/cmd.js:159
             => Do NOT write clone #2.
cmdq_add_ec      NOT EXPORTED — 5 LOCAL (apply/cmd/dig/dothrow/iactions)
             => Do NOT write clone #6.
doextcmd         js/getline.js:754   ASYNC — await required
```

`--can cmd.js getline.js doextcmd`: ALREADY. `--can getline.js cmd.js cmdq_shift`: **SAFE** (hoisted; IN-SCC 83-module). Do **not** clone `cmdq_shift` into getline — rhack owns the shift after `ext_tlist`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`got_prefix_input`. C `menu_requested=FALSE` / `nopick=0` **before** the label so `do_reqmenu` survives. JS same. PREFIXCMD OK → `prefix_seen`, `was_m_prefix` if reqmenu, `key=0`, `continue`. CANCEL → `reset_cmd_vars(true)` return. **Match `:3635–3636` / `:3762–3773`.**

`do_rush`/`do_run`/`do_fight`/`do_reqmenu`. Double prefix Norep + CANCEL + clear attempting (fight/rush) or `menu_requested` (m). Else set run=2/3, forcefight+WALK, or `menu_requested`. **Match `:1574–1634`.** JS `do_reqmenu` uses `visctrl('m')` not `cmd_from_func`. **Named.**

REPEAT. `!in_doagain && func != do_repeat && != doextcmd`: clear unless `prefix_seen`, then `cmdq_add_ec`. doextcmd only clears. JS: skip Ctrl-A / `#`; `#` clears; else clear unless `prefix_seen` then `rhack_repeat_command` (g→`do_rush`, h→`do_move_west`). Record happens **before** PREFIXCMD continue, so first `g` still sees `prefix_seen==null`. **Match `:3732–3740`.**

`cmdq_shift`. C last node becomes head; 0–1 nodes no-op. JS `length<2` return; `unshift(pop())`. **Match `:354–370`.** doextcmd sets `ext_tlist` then runs; rhack add+shift. **Match `:513–517` / `:3753–3760`.** `#rush` with PREFIXCMD flags 512 continues. **Match.**

`set_move_cmd`. dz/dx/dy from dirs; nopick if m-prefix; clear travel; skip run/WALK\|RUSH assign when `domove_attempting` already set. **Match `:1386–1400`.** Used on canned MOVEMENTCMD and REPEAT `do_move_*`. Live keyboard still `DIR_DX`. **Named.**

Canned PREFIXCMD/MOVEMENTCMD after `cmdq_pop`: continue / `domove` WALK or RUSH with firsttime multi. **Match rhack after `func()`.** `dxdy_moveok` grid-bug You_cant named.

Callee closure (g then h; `#` + extcmd; double `g` CANCEL). LIVE: `do_rush`/`do_run`/`do_fight`/`do_reqmenu`, `cmdq_shift`, `doextcmd` `ext_tlist`, `Norep`, `cmdq_clear`/`cmdq_add_ec`, `rhack` loop. CLONE verified: `set_move_cmd`, `reset_cmd_vars` (minus travelmap), `cmdq_add_ec` cmd.js. OMIT named: live `DIR_DX` vs `do_move_*`, nested F+g, `dxdy_moveok`, `cmd_from_func`, capital `do_run_*` REPEAT, travelmap, full `CMD_gGF` table (`const.js` bits unused in the flag check — char lists). STUB: **none** in the g/G/F/m continue arm or `#` shift arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject PREFIXCMD stay in rhack + doextcmd `cmdq_shift`: **true.** Do **not** stamp “Match C live hjkl `do_move_*` / `set_move_cmd`.” Do **not** stamp “Match C nested F then g/G via `CMD_gGF_PREFIX` flags.” Do **not** stamp “Match C `cmd_from_func` / `dxdy_moveok`.” Do **not** stamp “Match C capital `do_run_*` REPEAT.” `CMD_gGF_PREFIX` in `const.js` matching `func_tab.h:18–20` is bits only — rhack still uses movement-key lists. This is **not** a dispatch-with-stub PREFIXCMD arm: the four prefix callees are live.

## Density

One `cmd.c` PREFIXCMD / REPEAT-shift family. +349 JS. Large band, not “finish potions.” Did not glue `mk_mplayer`. §2b OK.

## Branch-by-branch confirm

1. `g` then `h`: `do_rush` OK, continue, REPEAT `[do_rush, do_move_west]`, live `DIR_DX` move with RUSH multi. **Prefix+REPEAT match; live dx named.**
2. Double `g`: CANCEL, `reset_cmd_vars`. **Match.**
3. `F` then non-move (not g/G/m/F): pline, reset, no command. **Match spirit of `:3693`; table named.**
4. `#` then `pray`: REPEAT cleared, getobj keys, add pray, shift pray first. **Match `:3753–3760`.**
5. `#rush` PREFIXCMD: continue `got_prefix_input`. **Match.**
6. ESC with `prefix_seen`: `reset_cmd_vars`. **Match `:3660–3670`.**
7. Ctrl-A after apply: still D-1563; prefix REPEAT append is extra. **Not a miss of 1563.**
8. Grid-bug diagonal: `dxdy_moveok` unnamed in JS. **Named.**

## Callers / RNG ledger

C `cmdq_shift`: only rhack doextcmd. JS same. Prefix callees are extcmdlist pointers (`--callers` 0). **No RNG.** No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `cmdq_add_ec` #6. Do not add `set_move_cmd` / `reset_cmd_vars` #2. Do not clone `cmdq_shift` into getline (`--can` SAFE).

## Verification

D-log private canary **11**/11 (shift + prefix OK/CANCEL); green+strict seed8000/0900; cohort **7**/7 + strict (1500/1800/0012/0004/0007/2200/0383). **Public-unhit** for `#` extcmd shift and nested PREFIXCMD; tourist g/G may hit the continue loop.

## Actionable C-wrongs

None for Must-fix. Named: live hjkl `DIR_DX` vs `do_move_*`; nested F+g/G full `CMD_gGF` table; `dxdy_moveok`; `cmd_from_func`; capital `do_run_*` REPEAT; travelmap `selection_free`; `doextcmd` `while (func == doextlist)` (pre-existing). Do not add `cmdq_add_ec` #6. Do not treat REPEAT `do_move_*` vs live `DIR_DX` as this SHA inventing a stub arm — it is the named keyboard omit.

Verdict: **ACCEPT-WITH-DEBT**
