# Review 95 — 5f55ceba — dipfountain after-switch update_inventory (D-1134)

## Metadata
- Full / short hash: `5f55cebaddce6dd5c36a75255b5d405424fd7f53` / `5f55ceba`
- Parent: `a956e990` (D-1133). This file audits **this SHA only**. Archive row **Addressed:** D-1134 `5f55ceba` was filled by D-1135.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 04:37:27 +0200
- D-id: **D-1134**
- Stats: 10 files, +110 / −40 — `js/fountain.js` +10 / −1 (one call after the `rnd(30)` switch).
- Claims to close: Open queue `fountain.c` `dipfountain` `update_inventory` after switch (named). Not Excalibur gift. Review **87** named omit `:441`/`:552`; D-1133 next-port. `reviews/loop-2026-08-15/` has no open dipfountain-invent Must-fix.
- JS / map: `fountain.js` `dipfountain`; `invent.js` `update_inventory` (untouched). `c-js-map/data.md` fountain + invent. Excalibur `:441`, perm_invent On WIN_INVEN, `consume_obj_charge` known still named.
- Prior reviews this SHA claims to close: **87** named omit dipfountain `:441`/`:552`.

## Intent vs deliverable

Git subject promises: “Match C fountain.c dipfountain so after the rnd(30) switch invent refreshes via update_inventory before dryup, instead of skipping the call.”

Old JS fell out of the `rnd(30)` switch into `dryup` with no invent refresh. C `fountain.c:552–553` is unconditional `update_inventory(); dryup(..., TRUE);` after the switch — unlike drinkfountain case 24 which gates on `buc_changed` (D-1126). Early returns still skip this site: Levitation, Excalibur LONG_SWORD body (which has its **own** `:441` call), rust-gate `ER_DESTROYED || (er!=ER_NOTHING && !rn2(2))`.

The diff **does** insert `update_inventory()` after the switch, before `dryup`. It does **not** add the Excalibur `:441` call (still a comment). Named. Default perm_invent Off: the existing D-1126 callee no-ops like tty without `TTY_PERM_INVENT`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dipfountain` post-switch call | C body, **new** | `fountain.c:552`; unconditional |
| `update_inventory` | C callee, **imported** | `invent.js:1258–1267`; D-1126 |
| `sync_perminvent` | C callee, **imported** | tty Off returns before `display_inventory` |
| Excalibur `:441` | C caller, **named omit** | early `return` still skips `:552` **and** `:441` |
| rust-gate / Levitation | C early returns, **untouched** | still skip `:552` (C) |
| drinkfountain case 24 | C other site, **untouched** | still `buc_changed` gated |
| perm_invent On WIN_INVEN | C tty arm, **named omit** | callee returns |
| `consume_obj_charge` known | C caller, **named omit** | not this site |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none. `update_inventory` has no `rn2`. Default perm_invent Off never reaches `display_inventory`. The rust-gate `rn2(2)` is **before** the switch (already D-0683), not added here.

## Constitution / playbook

Grep of the fountain hunk: no trace-index gates. Contest Rule #2: in-process ESM. Do not skip the call when perm_invent is Off (C still calls; tty no-ops). Do not treat Excalibur `:441` as this Open line. Do not gate `:552` on `buc_changed`.

## C ↔ JS fidelity

### Call site

C `fountain.c:547–553`:

```
    default:
        if (er == ER_NOTHING)
            pline1(nothing_seems_to_happen);
        break;
    }
    update_inventory();
    dryup(u.ux, u.uy, TRUE);
}
```

JS `1430–1441`: same default, then `update_inventory(); await dryup(u.ux, u.uy, true);`. Switch cases 16–29 `break` (case 24 `dofindgem` breaks; looted falls through to 25). No case `return`s after the switch starts, so every lottery arm that did not already return at the rust-gate hits `:552`. Match.

### Early returns still skip (C)

C `:399–402` Levitation `floating_above` return; `:404–447` Excalibur body then `:441` `update_inventory` + ROOM + `return`; `:454–456` rust-gate return. JS `:1240–1243` sticky `u.Levitation` (pre-existing; not this SHA — C is the youprop macro); `:1252–1312` Excalibur then return **without** `:441`; `:1322–1324` rust-gate. Those three still skip the new call, matching C’s skip of `:552`. The missing Excalibur `:441` is the named omit, not a miss of `:552`.

Sticky `u.Levitation` vs `Levitation()` youprop is pre-existing dipfountain debt (dodip D-1128 already uses the macro). Not introduced here. Do not Must-fix it as this peel.

### Callee is not a stub

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `update_inventory` (`invent.js:1258–1267`) matches `invent.c:2781–2809`:

```
if (!program_state.in_moveloop)
    return;
if (suppress_map_output())
    return;
save_suppress_price = iflags.suppress_price;
iflags.suppress_price = 0;
(*windowprocs.win_update_inventory)(0);
iflags.suppress_price = save_suppress_price;
```

JS: `!in_moveloop` return; `suppress_map_output()` return; `suppress_price=0` around `sync_perminvent()`. Review **87** already walked those gates for drinkfountain case 24. Default Off: tty without `TTY_PERM_INVENT` no-ops after the same gates (no RNG). On WIN_INVEN `display_inventory` stays named.

C tty `tty_update_inventory` is a no-op unless compiled with `TTY_PERM_INVENT`. The contest overlay is that tty. JS `sync_perminvent` returns before `display_inventory` when perm_invent is Off — same observable (no menu RNG, no extra screens).

C does **not** skip the call when perm_invent is Off (`invent.c:2794–2796` comment: curses uses the call to disable a previous window). JS same: it still enters `update_inventory` then `sync_perminvent` returns.

`suppress_map_output` also covers mklev / saving / restoring / hangup. JS callee already has those gates (review **87**). This SHA does not reimplement them. `suppress_price` save/restore around the winproc matches C `:2806–2809`. No core `rn2` in that envelope.

Unconditional vs D-1126: drinkfountain case 24 is `if (buc_changed) update_inventory()`. This site has no flag. JS does not invent a `buc_changed` gate. Match.

Switch arms that change BUC (case 16 curse, 17–20 uncurse) therefore refresh invent before `dryup`’s possible fountain-delete — C order. Case 29 `mkgold` / case 28 gold loss also hit `:552` even when no BUC bit flipped. That is why C is unconditional here.

## Hallucinations / overclaim

D-log / CURRENT / subject say after the `rnd(30)` switch invent refreshes via `update_inventory` before `dryup`, instead of skipping the call, and that the call is unconditional unlike drink case 24. That is the hunk. They name Excalibur `:441`, On WIN_INVEN, `consume_obj_charge`. Stamping **Addressed:** D-1134 is fair for the Open **`:552` call**. Hash `5f55ceba` is on the archive row (filled by D-1135). Do **not** stamp it as a close of Excalibur `:441` or perm_invent redraw. Do not read “Match C update_inventory” as “Match C WIN_INVEN `display_inventory`.”

## Density

One C statement at the documented locus, same shape as D-1126. Thin vs §2b “one C function,” but it is the whole practical call (not a one-`if` FAIL peel, not half of `fountain.c`). Excalibur `:441` correctly left named. ~10 JS. Acceptable once the suite is green; do not split `:552` from a callee rewrite that already exists.

## Verification

Journal: private canary **28**/28 (C/JS source order; unconditional vs `buc_changed`; rust-gate/Levitation/Excalibur skip; drinkfountain case 24 still gated; in_moveloop/suppress gates; suppress_price restore; perm_invent Off/On no core RNG); green+strict seed8000/0900; fountain cohort **21**/21 including 0014 fountain + 0106 dip + 0007 snakes + 0002 drinksink + 0006 demon + 0108/0360/2200/4500 + strict 0014/0007/0002/0006/0106/0108/0360/2200/4500/0030/0004/0009. Path **public-unhit** (perm_invent Off). This audit’s full `sessions` (cadence **#1445**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `fountain.c:399–447`, `:454–456`, `:547–553`, `invent.c:2781–2809`; JS `fountain.js:1238–1324`, `:1430–1441`, `invent.js:1258–1267`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| switch then dryup | `update_inventory` first | **same** |
| `buc_changed` gate | none at `:552` | **same** |
| rust-gate return | skip `:552` | **same** |
| Levitation return | skip `:552` | **same** (sticky pre-existing) |
| Excalibur return | `:441` then skip `:552` | **`:441` named skip**; `:552` skipped |
| perm_invent Off | call; tty no-op | **same** |
| perm_invent On WIN_INVEN | `display_inventory` | **named return** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open call matches `fountain.c:552`. The callee matches C tty Off.

Named omits / do-nots (map / Open, not Must-fix):

1. Excalibur `:441` `update_inventory` (`fountain.c:441`). Live Open after this SHA’s next-port chain.
2. perm_invent On `display_inventory(NULL, FALSE)` / WIN_INVEN (`invent.c:5604–5646`).
3. `consume_obj_charge` `if (obj->known) update_inventory()`.
4. hangup `program_state.done_hup` in `suppress_map_output`.
5. Next Open after this SHA: `do_name.c` `hcolor` — **Addressed:** D-1135 `b166bda5`.
6. Do not skip `:552` when perm_invent is Off. Do not gate it on `buc_changed`. Do not treat Excalibur `:441` as this peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `dipfountain` now calls real `update_inventory()` after the `rnd(30)` switch and before `dryup`, matching C’s unconditional `:552` site, while Excalibur `:441` and perm_invent On redraw stay named.
- Must-fix stays empty for this SHA; next port popped Open `do_name.c` `hcolor` Hallucination drinksink. **Addressed:** D-1135 `b166bda5`. Not hliquid.
