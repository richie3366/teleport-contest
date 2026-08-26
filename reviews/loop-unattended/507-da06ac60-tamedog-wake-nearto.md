# Review 507 — da06ac60 — dog.c tamedog wake_nearto(mx,my,1) (D-1546)

## Metadata
- Full / short hash: `da06ac60a35c6a2f3f6a956caa33ef872d84f3df` / `da06ac60`
- Parent: `adfba7fc` (D-1545). This file audits **this SHA only** (seventh of nine `js/` commits since review **500**). Archive **Addressed:** D-1546 `da06ac60`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 10:04:58 +0200
- D-id: **D-1546**
- Stats: 1 JS file, `js/dog.js` +5 / −4. Band 150–350 (js/ insertions 5).
- Claims to close: Open `dog.c` `tamedog` `wake_nearto` (named from D-1545 / review **493**). Not is_covetous. `reviews/loop-2026-08-15/` has no unpaid wake_nearto Must-fix.
- JS / map: `dog.js` `tamedog`; live `mon.js` `wake_nearto`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **493** named `wake_nearto` omit while the export already existed.

## Intent vs deliverable

Git subject promises: taming a sleeper calls `wake_nearto(mx,my,1)` (wake_msg, STRAT_WAITMASK, disturb on the tamed cell), not a local `msleeping=0`.

Pinned C `dog.c` `tamedog` `:1159–1161`. Callee `mon.c` `wake_nearto` `:4401–4405` → `wake_nearto_core` `:4374–4398`. `distance==1` → `dist2 < 1` so **only the exact cell**. Not `wakeup()` (anger). `mfrozen` halved first `:1157–1158`.

```1157:1161:nethack-c/upstream/src/dog.c
    if (mtmp->mfrozen)
        mtmp->mfrozen = (mtmp->mfrozen + 1) / 2;
    /* end indefinite sleep; using distance==1 limits the waking to mtmp */
    if (mtmp->msleeping)
        wake_nearto(mtmp->mx, mtmp->my, 1); /* [different from wakeup()] */
```

Old JS: `if (msleeping) mtmp.msleeping = 0`. `wake_nearto` already exported (`mon.js:1091`). dog.js already imported `mon.js`.

The diff **does** await `wake_nearto(mtmp.mx, mtmp.my, 1)` when sleeping. It **does not** port FULL_MOON S_DOG `rn2(6)`, ustuck expels, `redraw_worm`, Tobjnam/big_corpse, `has_edog` vs `!mtame`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `tamedog` sleep arm | C `:1159–1161`, **LIVE this SHA** | |
| `wake_nearto` | C `:4401`, **LIVE** | import; not a 5th clone |
| `wake_nearto_core` | C `:4374`, **LIVE** | |
| `wake_msg` | C, **LIVE** | inside core |
| `disturb_buried_zombies` | C, **LIVE** | `hack.js:589` |
| `wakeup` | C `mon.c`, **not used** | correct |
| FULL_MOON / ustuck / `redraw_worm` | C, **OMIT named** | |

`node scripts/sym.mjs wake_nearto tamedog disturb_buried_zombies wake_msg`:

```
wake_nearto      js/mon.js:1091   ASYNC — await required
             !! ALSO 4 LOCAL CLONE(S) — dbridge/explode/sounds/trap
tamedog          js/dog.js:353   ASYNC — await required
disturb_buried_zombies js/hack.js:589   sync
wake_msg         js/mon.js:1110   ASYNC — await required
```

**Re-point:** local `msleeping=0` → imported `wake_nearto`. Do **not** add clone #5 in dog.js.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new core RNG** (wake path has none; FULL_MOON `rn2(6)` still omitted).

## C ↔ JS fidelity

Pinned callee (`mon.c` `:4374–4398`): walk `fmon`; `dist2(mtmp->mx,mtmp->my,x,y) < distance`; `wake_msg` then `msleeping=0`; unless `G_UNIQ`, `STRAT_WAITMASK` clear; `petcall` false skips whistletime; always `disturb_buried_zombies` after the walk. Distance argument `1` means only `dist2==0` (the tamed cell). Neighbors at `dist2==1` stay asleep. C comment: not `wakeup()` (that path angers).

Order. `mfrozen = (mfrozen+1)>>1` then sleep → wake. **Match `:1157–1161`.** Wiz/Medusa/covetous reject still **after** the wake (C `:1163`). JS the same (canary: iswiz returns after wake). **Match.**

Callee. `wake_nearto(x,y,1)` → core `petcall=FALSE`. For each live fmon: `dist2 < 1` (same cell only). `wake_msg` then `msleeping=0`; `!(geno&G_UNIQ)` clears `STRAT_WAITMASK`; skip whistletime (`!petcall`); then `disturb_buried_zombies(x,y)` (ZOMBIFY `t*2/3`). Neighbor `dist2==1` stays asleep. **Match `:4378–4398`.** Not `wakeup()` `setmangry`. **Match the comment.** The four local `wake_nearto` clones (dbridge/explode/sounds/trap) are **not** this SHA; dog.js imports the export. `tamedog` already imported `mon.js` for other symbols; this SHA only adds `wake_nearto` to that import (await required — `sym.mjs` ASYNC).

Callee closure. LIVE: wake_nearto, wake_msg, disturb_buried_zombies. OMIT named: FULL_MOON, ustuck, redraw_worm. STUB: none. **The arm may ship.** Do **not** skip `wake_nearto` or glue FULL_MOON / ustuck.

## Hallucinations / overclaim

Subject `wake_nearto(mx,my,1)` not local sleep clear: **true.** Stamping **Addressed:** D-1546 is fair for **493’s named omit**. Do **not** stamp “Match C FULL_MOON S_DOG.” Do **not** stamp “Match C `wakeup`.” This is **not** “dispatch ported, callee stubbed.”

## Density

+5 JS: C is two statements; the callee was already live. §2b “unless C is that small.” Did not glue getpos fakeobj.

Review **493** named this omit; the export was already LIVE. This SHA is the import, not a new body.

## Branch-by-branch confirm

1. Awake: no call. **Match.**
2. Sleeper: wake_msg + clear sleep + waitmask unless G_UNIQ. **Match.**
3. Neighbor dist2=1: stays asleep. **Match.**
4. Buried zombies at that cell: disturb. **Match.**
5. FULL_MOON dog: still omitted. **Named.**

## Callers / RNG ledger

C/JS: throw food, scroll/zap taming, potion, trap, music, demonpet. Public-unhit until a public session tames a sleeper. No seed gate. `wakeup()` is a different C function (angers); this SHA must not call it.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. No seed names in control flow.

## Verification

D-log canary **14**/14 (grep; iswiz after wake; neighbor asleep; same-cell wakes; G_UNIQ keeps waitmask; wake_msg; skip awake; buried ZOMBIFY; kitten success; no core RNG; Rule #2); green+strict; cohort **7**/7. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: FULL_MOON S_DOG `rn2(6)`; ustuck expels/unstuck; `redraw_worm`; Tobjnam/big_corpse; `has_edog` vs `!mtame`.

Verdict: **ACCEPT-WITH-DEBT**
