# Review 988 — 1453da16 — tipcontainer_gettarget menu-first port (D-2018)

Metadata: SHA `1453da16`, D-2018, Open-row port (queue row
`pickup.c` tipcontainer_gettarget, 4 sessions). js/ touches 1
file (`js/pickup.js`, +~120/−20: new `tipcontainer_gettarget`
+ `tipcontainer` reorder/targetbox arm). No stamp owed.

## Intent vs deliverable

Subject promises: target menu before the empty check, horn
gets `targetbox`, new container-target spill arm. Diff
actually adds: same-file `async tipcontainer_gettarget(box)`
in C order; `tipcontainer()` calls it first with cancelled
early-return; `hornoplenty(box, true, targetbox)`; `tumble
into <the(xname)>` header + per-item `add_to_container`
arm. Promise == diff.

## Inventory

- New JS function: `tipcontainer_gettarget` (same-file,
  correct — C is `staticfn`); changed: `tipcontainer`.
- New helpers: none. No deleted symbols — no `sym.mjs`
  delete audit required. No STUB/no-op, no new imports, no
  new module edge.
- Callee closure (all LIVE or verified CLONE):
  `Is_container`/`doname`/`add_to_container`/
  `obj_extract_self`/`paint_corner_nhw_menu`/
  `dismiss_nhw_menu`/`nhgetch`/`flush_screen`/`hornoplenty`
  all LIVE (async ones awaited); `u_handsy` is the
  pre-existing same-file clone, re-verified here against C
  `pickup.c:2942–2953` (nohands → "no hands!";
  !freehand → "no free %s." via latebound body_part; else
  TRUE) ✓. (`theArt` is `the` imported under alias at
  `:36` — `sym.mjs` misses aliases, so its "NOT FOUND" is a
  tooling artifact, verified by read.)
- Named omits kept and extended honestly: BoH explode,
  ice-box thaw, shop billing (floor + per-item targetbox),
  altarizing, cursed-mbag, otrapped, dropy comma-list,
  toss_up, BoT-target apply, MENU_SEARCH/multi-page.

## C ↔ JS fidelity

C loci: `pickup.c:3868–3948` (gettarget) and `:3687–3841`
(tipcontainer). Gettarget confirm: `#if 0` early-return
correctly unported (compiled out) ✓; dummy '-' preselected
+ blank ✓; invent scan skipping box/non-containers/
known-BoT (`dknown && oc_name_known`) ✓; `if (!n_conts++)`
single `u_handsy()` ✓; locked-known/no-hands exclusion
with null a_obj, zero selector, 4-space indent ✓;
`doname(box)` title ✓; PICK_ONE letter-toggle-finish,
Space/Return accept, ESC→cancelled ✓; n>1
dummy-first quirk ✓; `cancelled = (n==-1)` ✓.
Tipcontainer confirm: menu-before-checks per the C TODO
✓; horn `targetbox` arg matches C `:4015–4016`
(`hornoplenty(box, TRUE, targetbox)`) ✓; `tumble into
<the(xname)>` ≡ C `"… into %s.", the(xname(targetbox))`
✓; per-item extract/recoord/`add_to_container` ✓; weights
+ newsym ✓. Pre-existing whole-function shape kept
(srcheld/dstheld `encumber_msg`/`update_inventory` tail
absent on both floor and targetbox paths — equally old,
fortress-held, not charged here).

## Hallucinations / overclaim

None. "Exact C order" holds against both loci; the Named
list names the deferred billing/explode arms the new code
touches.

## Density

~140 js/ lines for an 81-line C function plus its call-site
reorder and transfer arm. At parity.

## Verification

Re-measured myself: `hidden-proxy verify
tipcontainer_gettarget --base 1453da16~1` → `1 PASS, 3
moved past, 0 unchanged, 0 worse → PROGRESS` (92211 PASS;
92228 → lesshungry@54; 92236 → lesshungry@109; 92060 →
formatkiller@69) — identical to the D-log. Plus cited green
2/2 + strict ×2, cohort 7/7. js/ hunk grep: no
`FORCE`/`DIAG`/`getRngLog`/seed/coordinate/`fastforward`
(sole hit is the message quoting Rule #2). Rule #2 clean.

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
