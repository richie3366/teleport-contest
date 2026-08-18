# Review 171 — b3c0d228 — teleport.c `dotelecmd` m-prefix mode menu (D-1209)

## Metadata
- Full / short hash: `b3c0d228468cae0c2f0d5c5ebb353af9f42527bb` / `b3c0d228`
- Parent: `d2aa2db8` (review **167–170** + cadence #1535). This file audits **this SHA only**. Archive row **Addressed:** D-1209 `b3c0d228` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 08:37:26 +0200
- D-id: **D-1209**
- Stats: 12 files, +290 / −69 — `js/teleport.js` +120 / −12; `js/spell.js` +76 / −1; `js/cmd.js` +10 / −2.
- Claims to close: Open queue `teleport.c` `dotelecmd` m-prefix mode menu (named). Not energy gate. `reviews/loop-2026-08-15/` has no unpaid `dotelecmd` Must-fix.
- JS / map: `teleport.js` `dotelecmd` + local `dotelecmd_mode_menu`; `spell.js` `tport_spell`; `cmd.js` rhack `key===20`. `c-js-map/turns.md`. LEVEL_TELEP yn / energy/`spelleffects` / `#teleport` `doextcmd` still named.
- Prior reviews this SHA claims to close: **170** ACCEPT-WITH-DEBT “`dotelecmd` m-prefix mode menu — **next Open**.”

## Intent vs deliverable

Git subject promises: “Match C teleport.c dotelecmd so wizard m-prefix ^T offers the n/s/t/w mode menu and tport_spell hide/add, instead of always ignoring restrictions.”

Old JS: non-wizard `dotele(false)`; wizard always `dotele(true)` even when `menu_requested` (comment: menu deferred). rhack dropped `menu_requested` before `C('t')` because `accepts_m_prefix` lacked key 20. `tport_spell` absent.

C `teleport.c:917–1031`: non-wizard ignores `m`; wizard `!menu_requested` → ignore; else PICK_ONE n/s/t/w (`w` preselected); n `HTeleportation |= I_SPECIAL` + hide spell; s zeros H/E + add spell; t zeros H/E + hide spell; w ignore; ESC `ECMD_OK`; after `dotele`, restore H/E and reverse `tport_spell`. `spell.c:1707–1757` is the hideaway. `cmd.c:1890–1891` `C('t')` has `CMD_M_PREFIX`.

The diff **does** that envelope, ports `tport_spell`, and keeps `m ^T` in rhack. It does **not** pull energy/`spelleffects` (`'s'` still fail-closed inside `dotele`) or `#teleport` `doextcmd`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dotelecmd` wizard save H/E + n/s/t/w | C site, **new** | `:935–1025` |
| `dotelecmd_mode_menu` | **clone** of `select_menu(PICK_ONE)` | letters + space/return→`'w'` + ESC; not full tty pick list |
| `tport_spell` | C callee, **new** in `spell.js` | `:1707–1757`; hide/add/unhide/remove |
| `copy_spell_slot` / `save_tport` | C static hideaway | `sp_id`/`sp_lev`/`sp_know`; `tport_indx=MAXSPELL` burned |
| rhack `key===20` in `accepts_m_prefix` | C `CMD_M_PREFIX` on `C('t')` | partial table clone; named remainder |
| `dotele` | C callee, **imported** | live; s-mode still fail-closed |
| `I_SPECIAL` | C `prop.h` | JS `0x20000000` matches `0x20000000L` |
| `paint_corner_nhw_menu` / `nhgetch` | pre-existing menu clone | same corner used by `dospellmenu` |
| energy / `spelleffects` | C sibling, **named omit** | `'s'` adds the spell then `dotele` fail-closes |
| `#teleport` `doextcmd` | C alias, **named omit** | `^T` is wired; extcmd name is not |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** (`y_n` not used; menu is `nhgetch`). `FORCETRAP` in nearby `dotele` comments is the C flag name, not this hunk.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

Pinned C envelope (`teleport.c:931–1023`):

```
    if (!wizard)
        return dotele(FALSE) ? ECMD_TIME : ECMD_OK;
    ...
    if (!iflags.menu_requested) {
        ignore_restrictions = TRUE;
    } else {
        ... select_menu(PICK_ONE) ...
        switch (tmode) { n I_SPECIAL+HIDE; s H=E=0+ADD; t H=E=0+HIDE; w ignore; }
    }
    res = dotele(ignore_restrictions);
    HTeleportation = save_HTele;
    ETeleportation = save_ETele;
    if (added != NOOP_SPELL || hidden != NOOP_SPELL)
        (void) tport_spell(added + hidden - NOOP_SPELL);
```

Callers: `cmd.c:1890–1891` `{ C('t'), ..., dotelecmd, IFBURIED | CMD_M_PREFIX }`. JS `cmd.js:1546` already dispatched `key === 20`; this SHA adds `key === 20` to `accepts_m_prefix` (`cmd.js:1214–1217`) so rhack does not drop `m` before `dotelecmd`. `#teleport` extcmd string is not in `doextcmd` — named.

`dotele` itself does **not** read `menu_requested` (`teleport.c:1034–1161`). The other teleport.c hit (`:1196`) is `level_tele` (`m ^V`), not this command. Snapshot-then-clear at `dotelecmd` start is therefore equivalent for this callee. C keeps the flag until the next rhack; JS split rhack has no next-entry reset, so clearing here is the honest JS analogue, not a seed gate.

JS restore order (`teleport.js:2025–2031`) matches C: `dotele`, then write back H/E, then reverse `tport_spell`. ESC returns `0` **before** the n/s/t/w switch (C `:992–993`); H/E were saved but not mutated, so no restore is required. Match.

### Non-wizard / wizard `!m` vs `teleport.c:931–938`

C: `if (!wizard) return dotele(FALSE) ? ECMD_TIME : ECMD_OK`; then `if (!iflags.menu_requested) ignore_restrictions = TRUE`. JS snapshots `menu_requested` then clears (split rhack has no next-entry reset — honest vs C’s keep-until-next-rhack). Non-wizard still `dotele(false)` and **ignores** the snapshot. Wizard `!m` → `ignore_restrictions=true`, no hideaway. Match.

### Menu vs `:940–994`

C `add_menu` accelerators n/s/t/w, `w` `MENU_ITEMFLAGS_SELECTED`, prompt `"Which way do you want to teleport?"`, `select_menu(PICK_ONE)`:

- `i > 0`: first pick; if `i > 1 && tmode == 'w'` use `picks[1]` (the non-preselected).
- `i == 0`: preselected toggled off → still `'w'`.
- `i < 0`: ESC → `ECMD_OK`.

JS clone: ESC → `null` → return 0. Space/return → `'w'` (covers confirm-selected **and** C’s `i==0`). Letter n/s/t/w → that mode (covers `i>1` by typing the non-w accelerator). Invalid re-prompt. Prompt string matches. `*` only on `w` (tty selected glyph).

The clone does **not** model arrow-key pick lists or `i>1` with `picks[0] != 'w'` except via the letter. For the four accelerators + ESC + space that C documents, outcomes match. Not a silent fake of `select_menu` that always returns `'w'`.

### n/s/t/w vs `:995–1011` then restore `:1017–1023`

| Mode | C | JS |
|------|---|-----|
| `n` | `HTeleportation \|= I_SPECIAL`; `hidden = tport_spell(HIDE_SPELL)` | **same** (`u.HTeleportation \| I_SPECIAL`) |
| `s` | `H=E=0`; `added = tport_spell(ADD_SPELL)` | **same** |
| `t` | `H=E=0`; `hidden = tport_spell(HIDE_SPELL)` | **same** |
| `w` | `ignore_restrictions = TRUE` | **same** |
| after | `res = dotele(ignore)`; restore H/E; if added\|\|hidden `tport_spell(added+hidden-NOOP)` | **same** (`added + hidden - 0`) |

`I_SPECIAL` is `0x20000000`. n-mode makes JS `dotele`’s `u.HTeleportation \|\| u.ETeleportation \|\| u.Teleportation` truthy. Sticky `u.Teleportation` is never assigned in `js/` (grep empty) so s/t zeroing H/E is enough for that gate. `dotele` still does **not** read `uprops[TELEPORT]` or `!BTeleportation` (pre-existing youprop clone; not this SHA inventing a third Teleportation).

s-mode **does** add `SPE_TELEPORT_AWAY` at KEEN. Then `dotele(false)` hits the named energy stub (`teleport.js:1888–1895`): `"You are not able to teleport at will."` C `teleport.c:1070–1087` would set `castit` from `known_spell(SPE_TELEPORT_AWAY) >= spe_Fresh && !Confusion` and continue into hunger/STR/`uen`/`spelleffects`. After ADD_SPELL the book **has** the spell, so C `'s'` would cast. JS still fail-closes on sticky/`H`/`E` Teleportation (all zero in s-mode). **Named.** Do not call that “Match C spellcast.” `tport_spell` itself is not a stub.

`dotelecmd_mode_menu` (`teleport.js:1937–1963`) paints the four C `tports[]` strings (`:960–963`) with `*` only on `w`, prompt `"Which way do you want to teleport?"`. Loop: ESC `27` → `null`; space/CR/LF → `'w'`; n/s/t/w → that letter; else re-prompt. No `rn2`. Not a no-op that always returns `'w'`.

### `tport_spell` vs `spell.c:1721–1756`

Walk is call-for-call:

1. Scan `i` until `SPE_TELEPORT_AWAY` or `NO_SPELL` or `MAXSPELL`.
2. Full book → `impossible` then fall through to `NOOP` (C comment: wizard ^T cannot honor the choice). JS `await impossible` then `NOOP`. Match.
3. Empty slot (`NO_SPELL`): HIDE/REMOVE burn `tport_indx=MAXSPELL`; UNHIDE restore `book[saved]`; ADD copy slot, write SPE/level/KEEN, return `REMOVESPELL`.
4. Found SPE: ADD/UNHIDE burn index; REMOVE restore; HIDE copy, write `NO_SPELL`, return `UNHIDESPELL`.

`spellid` is the live `spl_book[i].sp_id` helper. `SPE_TELEPORT_AWAY = objectNames.indexOf(...)` is the same otyp `zap.js` already uses. `KEEN = 20000`. `NO_SPELL = 0`. `MAXSPELL = LAST_SPELL - FIRST_SPELL + 1` (`SPE_DIG`…`SPE_BLANK_PAPER`). `oc_level` from `game.objects`. Struct assign is three fields; JS spell slots are those three. Static hideaway zero-init matches BSS C (`tport_indx` starts 0 until first hide/add).

Dynamic `import('./spell.js')` is cycle avoidance, not a missing callee.

### rhack `CMD_M_PREFIX`

C `cmd.c:1890–1891`: `{ C('t'), "teleport", … dotelecmd, IFBURIED | CMD_M_PREFIX }`. `C('t')` is 20. JS already dispatched `key === 20` to `dotelecmd`. This SHA adds `key === 20` to the **partial** `accepts_m_prefix` so `m` is not dropped before the command. Without it, wizard `m^T` would still always ignore. That is the C flag, not a seed gate.

Full `accept_menu_prefix` table still named (`O/,/e/q/a/s/p/>/<` plus `^T`). `#teleport` extcmd string is not in `doextcmd`’s list — named.

## Hallucinations / overclaim

Subject + D-1209 say m-prefix offers n/s/t/w and `tport_spell` hide/add instead of always ignore. **That envelope plus the real hideaway are the hunk.** Stamping **Addressed:** D-1209 is fair. This is **not** “Match C dispatch, callee is a stub”: `tport_spell` and `dotele` are live. Do **not** stamp “Match C `'s'` `spelleffects`” or “Match C `#teleport` `doextcmd`” or “Match C `select_menu` every tty key.” Say so: n/t/w + hide/add/restore are C; s-mode **adds** the spell then fail-closes in `dotele`; the PICK_ONE UI is a letter/space/ESC clone.

## Density

One C function family: `dotelecmd` + the `tport_spell` it already `#define`s alongside + the one-line `CMD_M_PREFIX` keep. ~196 lines of JS in two modules that already import each other via dynamic spell. Right size. Did not glue LEVEL_TELEP yn or energy.

## Branch-by-branch confirm

1. Non-wizard ± `m` → `dotele(false)`. Match.
2. Wizard no `m` → ignore, no book mutate, restore H/E (no-op). Match.
3. Wizard `m`, ESC → 0, H/E untouched, no `dotele`. Match.
4. Wizard `m` + `w` or space → ignore `dotele(true)`. Match.
5. Wizard `m` + `n` → `I_SPECIAL` + hide if known; `dotele(false)`; unhide; restore H. Match.
6. Wizard `m` + `t` → H/E 0 + hide; fail-closed `dotele`; restore. C would also fail without intrinsic/spell. Match for the fail.
7. Wizard `m` + `s` → H/E 0 + add KEEN teleport-away; JS fail-closed `dotele`; remove; restore. **Spellcast named omit.** Hideaway reverse still runs.
8. Full spellbook ADD/HIDE → `impossible` + `NOOP`. Match.

No `rn2` on these arms.

## Verification

Journal: private canary **28**/28 (`tport_spell` 14 + menu envelope); green+strict seed8000/0900; cohort **8**/8 + strict 1500/0012/0360/0361/4500/2200/0014/0004. **Public-unhit** (`m^T` absent; plain `^T` is still wizard ignore). Admit that. This audit’s full `sessions` `__RESULTS_JSON__` at `fc314871`: **44**/44 does not type `m^T`.

## Actionable C-wrongs

Named omits (map / Open), not Must-fix:

1. `dotele` energy/spellcast (hunger/STR/`uen`/capacity/`spelleffects`) so `'s'` actually casts.
2. `dotele` LEVEL_TELEP yn + `level_tele_trap(FORCETRAP)` — still declined inside `dotele`.
3. `#teleport` `doextcmd` wire to `dotelecmd`.
4. Full `accept_menu_prefix` table (not only `^T`).

`dotelecmd_mode_menu` letter/space/ESC matches the documented PICK_ONE outcomes; do not Must-fix a tty pick-list rewrite (would steal `rot_corpse`).

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: wizard `m^T` now runs C’s n/s/t/w hideaway and restore instead of always `dotele(true)`; `'s'` still fail-closes inside `dotele`, named not Must-fix.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1209 `b3c0d228`. Next port in this window popped Open `zombie_maker`. Not energy gate, not `#teleport`.
