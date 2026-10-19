# Review 2904 — 503041958 — sanctum named demons via create_monster

- SHA: `503041958` (cliff, writer port: inline clone → faithful callee)
- D-entry: D-4063; Ledger: sp_lev.c (`create_monster`, D-4063)
- `js/` diff: `js/mklev.js` +7/−18 (`load_sanctum` `placeNamed`);
  new `scripts/sanctum-extinct-erinys-random.test.mjs`

## Intent vs deliverable

Promise: `load_sanctum`'s `placeNamed` was an inline create_monster
clone without the `:1949–1953` G_GONE/extinct arm. An extinct erinys
was made where C makes a random monster (worldtour-Wizard-49950016 s289
→ FULL PASS). The diff replaces the clone body with
`splev_create_monster(id, peaceful, { rx, ry })`. Promise = diff.

## Inventory

- `placeNamed` — mklev.js:28073 (one-line delegate).
  C: dat/sanctum.lua:109–113 (`des.monster({id, x, y, peaceful=0})`)
  → create_monster sp_lev.c:1925–2050.
- `splev_create_monster` — mklev.js:22256, sync (sym.mjs).

The diff deletes a local clone (find_montype_gender, induced_align,
`mx+rx` placement, enexto, makemon, female, mpeaceful, set_malign).
After the change, `placeNamed` is used only in load_sanctum.

## C ↔ JS fidelity

C create_monster, the arm the clone lacked (`:1943–1953`, as ported
in splev_create_monster at mklev.js:22283–22296):

```c
    amask = (m->align == AM_SPLEV_CO) ? ... : sp_amask_to_amask(m->align);
    if (m->id != NON_PM) {
        pm = &mons[m->id];
        g_mvflags = (unsigned) svm.mvitals[monsndx(pm)].mvflags;
        if ((pm->geno & G_UNIQ) && (g_mvflags & G_EXTINCT))
            return;
        else if (g_mvflags & G_GONE)    /* genocided or extinct */
            pm = (struct permonst *) 0; /* make random monster */
    }
```

The JS port keeps the order: find_montype gender (Lua binding) → amask
(induced_align draw) → extinct-unique return / G_GONE → `pm = null` →
random. That gives the C sequence `rn2(3) induced_align → rn2(5)
rndmonst_adj` quoted at the fork. Other arms the clone also skipped,
now live: `pm_to_humidity` location choice, `peaceful=0` via the
`peaceful` parameter (C `m->peaceful` → `mtmp->mpeaceful` + set_malign),
and `rx/ry` relative to `splev_xstart/ystart`. The commit states that
`splev_apply_centered_map` sets these for load_sanctum, and the old
`mx + rx` used the same origin. The clerics loop (`placeNoalignCleric`)
already used the faithful path and is unchanged.

## Hallucinations / overclaim

None. The named sibling (`load_wiz_strt` `placeNamedAt` /
`placeClassAt`, mklev.js:6880/6894, dat/Wiz-strt.lua) has the same
inline-clone shape. It is a C-wrong in another level file with no
blocked session cited, so it is correctly named, not shipped (§10.19).

## Density

Clone deletion at the cliff owner's level loader. One `Ledger:` entry.
No unreached work.

## Verification

Re-measure (`--base 503041958~1 --no-reach`):

```text
verify rndmonst_adj: scen-worldtour-Wizard-49950016: PASS → 1 PASS → PROGRESS
verify create_monster: no corpus session blocked (vacuous)
```

This is an exact match with the D-log. There were no FORCE/DIAG/seed
strings, and the rulecheck is clean.

## Actionable C-wrongs

None in this diff.

Verdict: **ACCEPT**
