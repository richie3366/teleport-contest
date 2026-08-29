# Review 644 — d2bcd227 — sit.c special_throne_effect grease spray (D-1683)

## Metadata
- Full / short hash: `d2bcd227397f3e66212a641d0a78af0e5ef571de` / `d2bcd227`
- Parent: `3a2c9f83` (D-1682). This file audits **this SHA only** (ninth of nine `js/` commits since review **635**). Archive **Addressed:** D-1683 was missing `%h` — this review commit fills `d2bcd227`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 21:02:54 +0200
- D-id: **D-1683**
- Stats: `js/sit.js` +12/−7; `js/potion.js` +5/−2; `js/apply.js` +3/−3 comments. Total `js/` insertions **20** <250. Band **150–350**.
- Claims to close: Open `special_throne_effect` grease spray after D-1656 `use_grease` trailing `update_inventory`. Not `use_grease` body. Not rndcurse redraw. `reviews/loop-2026-08-15/` has no unpaid throne-grease Must-fix.
- JS / map: `sit.js` case 6; `potion.js` `make_glib` `uarmg`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **617** named sit spray (D-1656 closed apply trailing invent).

## Intent vs deliverable

Git subject promises: a Vlad throne grease spray greases non-coin inventory, makes hands glib, and refreshes perm_invent including worn gloves, instead of deferring `update_inventory` after D-1656.

`node scripts/csym.mjs special_throne_effect` prints **no definition** (`staticfn` + name on the next line). `--callers special_throne_effect`: prototype `sit.c:35`; call `:64`. `--callers make_glib` includes `sit.c:277`. Opening that locus (`sit.c:237–279`):

```266:279:nethack-c/upstream/src/sit.c
    case 6:
    {
        /* grease hands and inventory
           Same rules for which items can be affected as grease_ok in apply.c */
        struct obj *otmp;
        pline("A greasy liquid sprays all over you!");
        for (otmp = gi.invent; otmp; otmp = otmp->nobj)
            if (otmp->oclass != COIN_CLASS)
                otmp->greased = 1;
        make_glib(rn1(101, 100));
        update_inventory();
        break;
    }
```

`make_glib` `:460–468`. `grease_ok` `:2584–2601` (COIN_CLASS EXCLUDE; `inaccessible_equipment` is getobj-only — C comment tells sit.c to keep the same ungreasable **list**, which is coins).

```460:468:nethack-c/upstream/src/potion.c
void
make_glib(int xtime)
{
    disp.botl |= (!Glib ^ !!xtime);
    set_itimeout(&Glib, xtime);
    if (uarmg)
        update_inventory();
}
```

Old JS: case 6 already greased non-coins and `make_glib(rn1(101,100))` but commented `update_inventory deferred`; `make_glib` commented `if (uarmg) update_inventory() — deferred`. The diff **does** both C invent refreshes. Apply.js comments only. It **does not** port rndcurse `update_inventory` or `use_grease` again. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `special_throne_effect` case 6 | C `sit.c:266–279`, **LIVE this SHA** | invent walk already; invent refresh new |
| `make_glib` `uarmg` | C `:466–467`, **LIVE this SHA** | all callers, not only sit |
| `update_inventory` (sit `:278`) | **LIVE this SHA** | after `make_glib` |
| `rn1(101,100)` | C `:277`, **LIVE** (pre-existing) | not added this SHA |
| `grease_ok` COIN skip | C `:2592–2593`, **LIVE** (not rewritten) | same skip in the loop |
| `inaccessible_equipment` | C getobj only | throne loop does **not** skip worn-inaccessible |
| `use_grease` trailing invent | C `:2652`, **LIVE** D-1656 | comments only this SHA |
| rndcurse redraw | **OMIT named** | sit.js header |

RNG: `rn1(101, 100)` once, same as C, **before** both invent updates. No extra `rn2`. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
make_glib        js/potion.js:854   sync
update_inventory js/invent.js:3528   sync
special_throne_effect js/sit.js:635   ASYNC — await required
use_grease       js/apply.js:2262   ASYNC — await required
rn1              js/rng.js:100   sync
```

`--can sit.js invent.js update_inventory`: **ALREADY** (`observe_object` already imported invent.js). `make_glib` already imported `update_inventory` (potion.js line 113). Dynamic `import('./potion.js')` for `make_glib` is pre-existing (no new static sit→potion edge). Do **not** add `make_glib` clone. Do **not** static-import potion.js from sit.js.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**Spray loop.** C `gi.invent` nobj walk; skip `COIN_CLASS`; `greased = 1`. JS `for (const otmp of game.invent || [])` — Array ≡ nobj (D-1017). **Match `:273–276`.** C `grease_ok` also returns EXCLUDE_INACCESS for `inaccessible_equipment`; the throne comment says “same rules … as grease_ok” but the **loop** only tests coins (C `:274–276`). JS the same. Do **not** stamp “Match C inaccessible skip on the spray.”

**Order.** C pline, loop, `make_glib(rn1(101,100))`, `update_inventory`. JS the same. **Match `:273–278`.** If `uarmg`, C `make_glib` already refreshed invent, then sit refreshes again. JS the same double call. Not a C-wrong.

**`make_glib`.** C botl xor, `set_itimeout(&Glib, xtime)`, then `if (uarmg) update_inventory()`. JS already had botl/`itimeout`/`HGlib`/`Glib`; this SHA adds the `uarmg` line. **Match `:460–468`.** Every JS `make_glib` caller (apply cursed grease, eat, fountain, timeout, wizcmds, …) now matches C’s glove suffix. That is the C function, not sit-only glue.

**`use_grease`.** Diff is comments (`D-1683` instead of named omit). Body still D-1656 trailing invent. **Not rewritten.**

Callee closure (case 6). LIVE: `pline`, invent walk, `make_glib`, `rn1`, `update_inventory`. CLONE: none. OMIT named: rndcurse invent; inaccessible on the spray (C loop doesn’t either). STUB: **none** — the deferred invent comments are gone. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject “greases non-coin inventory, makes hands glib, refreshes perm_invent including worn gloves”: **true** (loop was already there; both invent calls are new). Do **not** stamp “Match C `inaccessible_equipment` on the spray.” Do **not** stamp “ported `use_grease` again.” Do **not** stamp “rndcurse `update_inventory`.” Do **not** make `make_glib` async. Private canary (coin skip, glib timeout, glove suffix, second invent) is the right split. Public-unhit for Vlad throne sit.

## Density

+20: one case-6 aftermath + the C `make_glib` glove line every caller needs. §2b. Did not glue rndcurse or cemetery JSON.

## Verification

Wired: coin skip; `rn1(101,100)`; sit `:278` invent; `uarmg` invent. Unwired C: rndcurse redraw. Conf: one `rn1`, same arguments. No seed gate.

Journal: private canary **5**/5; green+strict seed8000/0900; cohort **9**/9 + strict. Cadence **#2090** at HEAD `d2bcd227`: **44**/44.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): rndcurse `update_inventory`. Do **not** skip coins. Do **not** drop the sit `:278` invent because `make_glib` already ran. Do **not** re-port `use_grease` (D-1656). Do **not** add `inaccessible_equipment` to the spray loop. Do **not** re-port `silly_thing` (D-1682).

Verdict: **ACCEPT-WITH-DEBT**
