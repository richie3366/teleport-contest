# Review 106 — 623bc861 — dipfountain Excalibur :441 update_inventory (D-1145)

## Metadata
- Full / short hash: `623bc86165f1ac1ca2a207b39b3eacbfc1c948da` / `623bc861`
- Parent: `4d92b2cc` (review **102–105** + cadence #1455). This file audits **this SHA only**. Archive row **Addressed:** D-1145 `623bc861` was filled by D-1146.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 07:44:00 +0200
- D-id: **D-1145**
- Stats: 10 files, +113 / −44 — `js/fountain.js` +13 / −6 (one call + comments).
- Claims to close: Open queue `fountain.c` Excalibur `:441` `update_inventory` (named). Not artidisco save. Review **95** named omit of this site; review **105** next-port. `reviews/loop-2026-08-15/` has no open Excalibur Must-fix.
- JS / map: `fountain.js` `dipfountain`; existing `invent.js` `update_inventory` (D-1126). `c-js-map/data.md` fountain. On WIN_INVEN `display_inventory`, artidisco save/rest, `consume_obj_charge` known still named.
- Prior reviews this SHA claims to close: **95** named `:441`; **68** Excalibur body without invent refresh; D-1144 next-port.

## Intent vs deliverable

Git subject promises: “Match C fountain.c dipfountain so the Lady of the Lake gift or deny refreshes invent via update_inventory before the fountain becomes ROOM, instead of skipping the call.”

Old JS ran curse/`oname`/`bless` then `set_levltyp` ROOM analog + `newsym` + town `angry_guards` and **returned**, so the post-switch `:552` site (D-1134) never ran either. C `fountain.c:411–447` shares one `update_inventory()` after both arms, then `set_levltyp(u.ux,u.uy,ROOM)`, `levl[].flags=0`, `newsym`, optional `angry_guards`, `return`.

The diff **does** insert that shared call before the ROOM analog. It does **not** pull artidisco save/rest, perm_invent On WIN_INVEN redraw, or `consume_obj_charge` known. Named. The callee is still the D-1126 tty path: default perm_invent Off no-ops after `in_moveloop` / `suppress_map_output` / `suppress_price=0`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dipfountain` Excalibur `:441` | C body, **one call added** | `fountain.c:441`; both gift and deny |
| `update_inventory` | C callee, **imported** | `invent.js:1258–1267`; real, not a new stub |
| `sync_perminvent` | C callee behind tty | no-op unless perm_invent On (D-1126) |
| `:552` after switch | C sibling, **unchanged** | Excalibur `return` still skips it (C) |
| `set_levltyp` | C callee, **named analog** | typ/flags/nfountains; ice/lava/count named |
| artidisco save/rest | C callee, **named omit** | not this site |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none. `update_inventory` does not roll. Gift/deny still consume `rn2(Role_if(PM_KNIGHT)?6:30)` and unaligned `rn2(3)` spe-- from D-1107. Path **public-unhit** (perm_invent Off; Excalibur dip unhit).

## Constitution / playbook

Grep of the `js/fountain.js` hunk: no trace-index gates. Contest Rule #2: in-process ESM. Do not restore the silent Excalibur return. Do not call `:552` on this path (C returns). Do not invent a perm_invent On redraw to “see” the call. Do not pull `consume_obj_charge` into a fountain peel.

## C ↔ JS fidelity

### Shared call after both arms

C `fountain.c:411–447`:

```
if (u.ualign.type != A_LAWFUL) {
    /* freeze mist, curse, maybe spe--, oerodeproof=0 */
} else {
    /* oname Excalibur, discover, bless, clear erode */
}
update_inventory();
set_levltyp(u.ux, u.uy, ROOM);
levl[u.ux][u.uy].flags = 0;
newsym(u.ux, u.uy);
if (in_town(u.ux, u.uy))
    (void) angry_guards(FALSE);
return;
```

JS `fountain.js:1260–1317`: same if/else, then `update_inventory()`, then loc.typ=ROOM / flags=0 / looted=0 / nfountains--, `newsym`, town `angry_guards`, `return`. Branch order matches. `looted=0` is a pre-existing analog of `flags=0`, not this hunk.

### Callee

C `invent.c:2781–2809`: skip if `!program_state.in_moveloop` or `suppress_map_output()`; else save `iflags.suppress_price`, zero it, `(*windowprocs.win_update_inventory)(0)`, restore. TTY `wintty.c:3606–3614` `tty_update_inventory`: without `TTY_PERM_INVENT` the function is empty. With it, `sync_perminvent` (`invent.c` ~1236+): `WIN_INVEN==WIN_ERR && core_invent_state` return; `!perm_invent && core_invent_state` return; `perm_invent` then `display_inventory(NULL, FALSE)` (named). JS `invent.js:1258–1267` is that envelope; `sync_perminvent` returns before `display_inventory` when Off. Default public `perm_invent` Off: **no screen, no RNG**. Stamping “Match C update_inventory” is the **call site**, not “WIN_INVEN now redraws the blessed sword.”

Call is unconditional on both arms (unlike drinkfountain case 24 `if (buc_changed)` D-1126). Unaligned deny that cursed the sword and maybe `spe--` still refreshes. Lawful gift after `oname`/`bless` still refreshes. C livelog_printf on both arms is pre-existing JS `livelog_printf` — not this hunk.

Hangup `done_hup` / `restoring` gates inside C `update_inventory` are still named on the callee (D-1126), not a miss of `:441`.

### Excalibur return vs `:552`

C `:552` is after the `rnd(30)` switch, before `dryup`. The LONG_SWORD gift/deny path `return`s at `:447` and never reaches it. JS comment at `:1445` now says so. D-1134 remains correct for the lottery path. This SHA does not double-call invent on Excalibur.

### Gate (unchanged, still C)

C `:404–408`: `otyp==LONG_SWORD && u.ulevel>=5 && !rn2(Knight?6:30) && quan==1 && !oartifact && !exist_artifact(LONG_SWORD, artiname(ART_EXCALIBUR))`. JS D-1107 still has that gate. This peel does not widen it. Levitation still `floating_above` returns before the LONG_SWORD test — neither `:441` nor `:552`. `ulevel<5` / already-artifact / `exist_artifact` fall through to `water_damage` + lottery + `:552`. Match.

Town `angry_guards(FALSE)` after `newsym` is pre-existing D-1104-era wire, not this hunk. C `set_levltyp` updates `level.flags.nfountains`; JS decrements `nfountains` when >0. Full `set_levltyp` (ice/lava/`count_level_features`) still named — same analog as D-1107.

Import: `update_inventory` already imported from `invent.js` for D-1134/D-1126. No new helper. No clone of `tty_update_inventory`.

## Hallucinations / overclaim

D-log / CURRENT / subject say the Lady of the Lake gift or deny refreshes invent via `update_inventory` before ROOM, instead of skipping the call. That is the hunk: one imported callee on both arms. They **name** artidisco save/rest and On WIN_INVEN. Stamping **Addressed:** D-1145 is fair for the Open **`:441` site**. Hash `623bc861` is on the archive row (filled by D-1146). Do **not** stamp it as “Match C perm_invent redraw” or a close of `:552`. This is **not** “Match C dispatch, callee is a stub”: `update_inventory` is the real D-1126 function; C’s default tty is also a no-op.

## Density

Playbook §2b “too small”: one deferred `if` / one call. This is that pattern (sibling of D-1134 / D-1126). Right-size would have been `:441` in the same iter as `:552`. Too late to merge. Not a C-wrong. Do not pad the next port with another one-call invent peel (`consume_obj_charge` known is a different family).

## Verification

Private canary **38**/38 (C/JS source order; shared call after both arms; Excalibur return skips `:552`; drink case 24 still `buc_changed`; `consume_obj_charge` known still omit; artidisco save still named; callee gates; lawful gift + unaligned deny call before ROOM; Levitation skips both sites; `ulevel<5` no gift). Green+strict seed8000/0900. Cohort **20**/20 (0014 fountain + 0106 dip + 0007 snakes + 0002 drinksink + 0006 demon + knight 0103/0104/4500 + 0108/0360/2200/0004/0009/0030/0012/0116/0367/1500/1800/0060) + strict 8000/0900/0014/0106/0006/0007/0002/0103/0104/4500. Path **public-unhit** (perm_invent Off; Excalibur dip unhit). Cadence #1460 full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 does not exercise this site. Fortress held; that is not proof the call is C-faithful — the C read is.

C `exist_artifact` / `artiname` / `oname(..., ONAME_VIA_DIP|ONAME_KNOW_ARTI)` / `discover_artifact` / `bless` / `curse` are D-1107, not this SHA. This peel must not be read as a re-port of the Lady of the Lake body. Only `:441` moved.

## Actionable C-wrongs

None that Must-fix this next iter. The Open `:441` call matches `fountain.c:441`. Default no-op is C.

Named omits / do-nots (map / Open, not Must-fix):

1. artidisco save/rest (`save.c` / `restore.c`).
2. perm_invent On WIN_INVEN `display_inventory` (`invent.c` `sync_perminvent`).
3. `consume_obj_charge` known → `update_inventory` (`invent.c`).
4. Full `set_levltyp` ice/lava/`count_level_features`.
5. Do not restore the missing `:441` call. Do not invoke `:552` after Excalibur `return`. Do not invent a visible invent window for public seeds.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: after gift or deny, JS now calls the real `update_inventory` before the ROOM analog, matching C `:441`, while the callee still no-ops under default perm_invent Off.
- Must-fix stays empty for this SHA; next port popped Open `inside_gas_cloud` damage. **Addressed:** D-1146 `fe5cefad`. Not artidisco.
