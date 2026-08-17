# Review 87 — 6497347e — drinkfountain case 24 `update_inventory` (D-1126)

## Metadata
- Full / short hash: `6497347e2054146432464550008954dbc9f9bdfd` / `6497347e`
- Parent: `2fc408c0` (D-1125). This file audits **this SHA only**. Archive row **Addressed:** D-1126 `6497347e` was filled by D-1127.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 02:22:15 +0200
- D-id: **D-1126**
- Stats: 12 files, +171 / −46 — `js/fountain.js` +8 / −4 (the call); `js/invent.js` +44 / −1 (`update_inventory` / `sync_perminvent`); `js/display.js` +16 / −2 (`suppress_map_output`).
- Claims to close: Open queue `fountain.c` `drinkfountain` case 24 `update_inventory` (named). Not enlightenment. Review **85** / D-1125 next-port after snakes. `reviews/loop-2026-08-15/` has no open case-24 Must-fix.
- JS / map: `fountain.js` case 24; `invent.js` `update_inventory`; `display.js` `suppress_map_output`. `c-js-map/data.md` fountain + invent. perm_invent On WIN_INVEN, dipfountain 441/552, `consume_obj_charge` known still named.
- Prior reviews this SHA claims to close: none as Must-fix. Named Open after D-1125.

## Intent vs deliverable

Git subject promises: “Match C fountain.c drinkfountain so fate 24 refreshes invent via update_inventory when BUC actually changed, instead of discarding buc_changed.”

Old JS case 24 cursed non-coin invent via `!rn2(5)` then `void buc_changed`. C `fountain.c:332–333` calls `update_inventory()` when `buc_changed`. Without a JS `update_inventory`, the port had to add the callee cluster: `invent.c:2782–2809` gates + tty `win_update_inventory` → `sync_perminvent` under `TTY_PERM_INVENT`.

The diff **does** `if (buc_changed) update_inventory()` and those gates. Default perm_invent Off: C tty **without** `TTY_PERM_INVENT` is a no-op after the same gates; JS `sync_perminvent` returns before `display_inventory` (no RNG). It does **not** port perm_invent On WIN_INVEN redraw, dipfountain’s two `update_inventory` sites, or `consume_obj_charge` when `known`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| drinkfountain case 24 call | C body, **rewritten** | `fountain.c:317–334`; was `void buc_changed` |
| `update_inventory` | C callee, **new** | `invent.c:2782–2809`; not a comment stub |
| `suppress_map_output` | C callee, **new** | `display.c:714–718`; hangup `done_hup` named |
| `sync_perminvent` | C callee, **clone** | `invent.c:5565–5646` early returns; On WIN_INVEN named |
| `curse` / `!rn2(5)` walk | C body, **untouched** | coins skipped; already-cursed skipped |
| `morehungry(rn1(20,11))` | C RNG, **untouched** | before the walk |
| perm_invent On `display_inventory` | C arm, **named omit** | `sync_perminvent` returns |
| hangup `done_hup` | C predicate, **named omit** | `#ifdef HANGUPHANDLING` |
| dipfountain 441/552 | C callers, **named omit** | not this Open line |
| `consume_obj_charge` known | C caller, **named omit** | still a comment |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in `update_inventory` / `sync_perminvent` on the default Off path. Case 24 still burns `rn1(20,11)` then per-item `!rn2(5)` exactly as before. C `display_inventory` RNG exists only on the named On WIN_INVEN arm.

## Constitution / playbook

Grep of the three JS hunks: no trace-index gates. `WIN_ERR` is `const.js` `(-1)` ≡ C. Contest Rule #2: in-process ESM. Do not invent a perm_invent window to “make the refresh visible.” Do not pull vomit into this SHA.

## C ↔ JS fidelity

### Case 24 caller

C `fountain.c:317–334`:

```
pline("This water's no good!");
morehungry(rn1(20, 11));
exercise(A_CON, FALSE);
for (obj = gi.invent; obj; obj = nextobj) {
    nextobj = obj->nobj;
    if (obj->oclass != COIN_CLASS && !obj->cursed && !rn2(5)) {
        curse(obj);
        ++buc_changed;
    }
}
if (buc_changed)
    update_inventory();
```

JS `873–886`: same pline, `morehungry(rn1(20,11))`, `exercise(A_CON,false)`, spread-copy of `game.invent` (JS array model; `curse` does not unlink), coin/cursed/`!rn2(5)` gate, `if (buc_changed) update_inventory()`. Match on the Open line. Zero cursed items → no call, same as C.

### `update_inventory` gates vs C

C `invent.c:2782–2809`: return if `!program_state.in_moveloop`; return if `suppress_map_output()`; save `iflags.suppress_price`, set 0, `(*win_update_inventory)(0)`, restore.

JS `1258–1267`: `in_moveloop`, `suppress_map_output()`, save/zero/restore `suppress_price` around `sync_perminvent()`. Match. C comment: they do **not** skip when `perm_invent` is False (curses toggle). JS also always reaches `sync_perminvent` after the two early returns.

### `suppress_map_output`

C `display.c:703–718`: `gi.in_mklev || program_state.saving || program_state.restoring` (`done_hup` only under `HANGUPHANDLING`). JS `1974–1978`: `game.in_mklev || game.gi?.in_mklev` or `ps.saving || ps.restoring`. Hangup named. Match on the contest tty path.

### `sync_perminvent` / tty no-op — hallucination check

C `wintty.c:3605–3614` `tty_update_inventory`: `#ifdef TTY_PERM_INVENT` → `sync_perminvent()`; **`#else` do nothing**. The scored harness is tty without a live perm_invent window. C therefore calls a no-op after burning no RNG.

JS `sync_perminvent` (`1236–1251`): `WIN_INVEN===WIN_ERR && core_invent_state` return (prohibited/toggling named); `!perm_invent && core_invent_state` return; `if (perm_invent) return` (named: request_settings / `display_inventory`); else fall off (C `!wri || maxslot==0` return). Default Off, `core_invent_state` 0, `WIN_ERR`: no-op, no RNG.

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” The callee implements C’s `in_moveloop` / `suppress_map_output` / suppress_price dance and then no-ops the same way C tty does when perm_invent is Off. The BUC change is in `curse(obj)` **before** the call. “Refreshes invent” on the public suite means “the call runs and would redraw if perm_invent were On,” not “a window appears.” Do not read the subject as a close of On WIN_INVEN `display_inventory`.

`consume_obj_charge` still comments `update_inventory` as deferred (`invent.js:1282`) — this SHA added the function but did not wire that caller. Named.

## Hallucinations / overclaim

D-log / CURRENT / subject say fate 24 calls `update_inventory` when `buc_changed` instead of discarding the flag. That is the hunk. They name On WIN_INVEN, dipfountain 441/552, hangup, vomit. Stamping **Addressed:** D-1126 is fair for the Open **call**. Hash `6497347e` is on the archive row (filled by D-1127). Do **not** stamp it as a close of perm_invent redraw or `consume_obj_charge`.

## Density

The Open line is one `if (buc_changed)` call. Adding `update_inventory` + `suppress_map_output` + thin `sync_perminvent` is the callee cluster C requires — not a second hypothesis and not “finish invent.c.” ~8 fountain + ~44 invent + ~16 display. Related vomit left named. Right size for that queue line.

## Verification

Journal: private canary **31**/31 (C/JS source call; gates; suppress_price restore; perm_invent Off/On no core RNG; coin skip); green+strict seed8000/0900; cohort **22**/22 including 0014 fountain + 0007 snakes + 0002 drinksink + 0006 demon + 0108 + 0360/2200/4500; path **public-unhit** (perm_invent Off). Cadence fortress is not a case-24 proof. This audit’s full `sessions` (cadence **#1435**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression (no extra gameplay RNG on the Off path).

C read of `fountain.c:317–334`, `invent.c:2782–2809` / `:5565–5646`, `display.c:703–718`, `wintty.c:3605–3614`; JS `fountain.js:873–886`, `invent.js:1236–1267`, `display.js:1974–1978`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| `buc_changed==0` | no `update_inventory` | **same** |
| `buc_changed>0`, in_moveloop, !suppress | call; tty no-op if !TTY_PERM_INVENT | **same gates + no-op** |
| `!in_moveloop` | return | **same** |
| mklev/saving/restoring | suppress | **same** |
| perm_invent On WIN_INVEN | `display_inventory` | **named return** |
| coins / already cursed | skip `rn2` | **same** (`!cursed` before `rn2`) |

## Actionable C-wrongs

None that Must-fix this next iter. The Open call matches `fountain.c:332–333`. The callee matches C tty Off.

Named omits / do-nots (map / Open, not Must-fix):

1. perm_invent On `ctrl_nhwindow` / `display_inventory(NULL, FALSE)` (`invent.c:5604–5646`).
2. hangup `program_state.done_hup` in `suppress_map_output`.
3. `dipfountain` `update_inventory` at C `:441` / `:552`.
4. `consume_obj_charge` `if (obj->known) update_inventory()`.
5. `eat.c` `vomit` cantvomit/Sick/acid — **Addressed:** D-1127 `b4954c6f` (next SHA).
6. Do not restore `void buc_changed`. Do not skip the call when perm_invent is Off (C does not). Do not burn `display_inventory` RNG on Off.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: drinkfountain fate 24 now calls `update_inventory()` when any non-coin item was cursed, and that callee matches C’s in_moveloop / suppress_map_output / suppress_price gates then no-ops like tty without `TTY_PERM_INVENT`, while On WIN_INVEN redraw stays named.
- Must-fix stays empty for this SHA; next port popped Open `eat.c` `vomit` cantvomit/Sick/acid. **Addressed:** D-1127 `b4954c6f`. Not dryup.
