# Review 854 — 3dadc461 — iactions.c itemactions W already-wearing row (D-1884)

Metadata: SHA `3dadc461`, D-1884. Files: `js/worn.js` (+32/−0),
`js/do_wear.js` (+86/−2), `js/iactions.js` (+20/−9). Next index 854.

Intent vs deliverable (promise vs diff): the subject promises the
`itemactions` W arm's already-wearing row via `armor_simple_name` +
`armcat_to_wornmask`, for corpus session explore-seed0360 step 853
(`W - [already wearing a cloak]` vs `W - Wear this armor`). The diff
delivers exactly that and nothing else:

- `js/worn.js`: new exported `armcat_to_wornmask` (7-arm switch).
- `js/do_wear.js`: new file-local `cloak_simple_name`,
  `boots_simple_name`, `shield_simple_name` + exported
  `armor_simple_name`; two import-name additions (`simpleonames`,
  `objectDescrs`) on existing edges.
- `js/iactions.js`: W arm rewritten in C order; `an` added to the
  existing `objnam.js` import; header named-omission cleanup.

No scope creep, no new module edges (dynamic `await import` of
`worn.js`/`do_wear.js` on edges that already exist).

Inventory: LIVE callees — `wearmask_to_obj` (worn.js:256, D-1510),
`an` (objnam.js:1870), `gloves_simple_name` (objnam.js:1198, canonical
reuse — correctly no second clone), `hard_helmet` (do_wear.js:190),
`suit_simple_name` (do_wear.js:959). New file-local clones, all matched
to C below: `cloak_simple_name`, `boots_simple_name`,
`shield_simple_name`. `sym.mjs` output on the touched symbols:

- `armcat_to_wornmask` js/worn.js:286 sync (fresh export).
- `armor_simple_name` js/do_wear.js:1023 sync (fresh export).
- `wearmask_to_obj` js/worn.js:256 sync; `suit_simple_name`
  js/do_wear.js:959 sync; `gloves_simple_name` js/objnam.js:1198 sync.
  (Pre-existing unrelated clones in trap.js/fountain.js/lock.js
  untouched.) Nothing deleted or re-pointed, so no clone→import
  migration to paste.

**C ↔ JS fidelity** (branch-by-branch confirm — checked each body):

- `armcat_to_wornmask` ≡ C `worn.c:249–278` (same 7-arm switch over
  ARM_SUIT/CLOAK/HELM/SHIELD/GLOVES/BOOTS/SHIRT, no default arm;
  `| 0` long-vs-int noise only).
- `armor_simple_name` ≡ C `objnam.c:5434–5468` (same 7-way `oc_armcat`
  dispatch; default `simpleonames` + `impossible`, same order).
- Cloak ≡ C `:5491–5509` (ROBE→robe, MUMMY_WRAPPING→wrapping,
  ALCHEMY_SMOCK smock-vs-apron on `oc_name_known && dknown`, else
  cloak; if-chain ≡ C switch).
- Boots ≡ C `:5550–5566` (`dknown` gate; descr-then-actual "shoes"
  substring; `toLowerCase().includes` ≡ `strstri`;
  `objectDescrs[oc_descr_idx]` ≡ `OBJ_DESCR`, the objnam.js:712 idiom).
- Shield ≡ C `:5569–5596` (reflection silver-if-known else smooth;
  the `#if 0` heavy/light split stays cut, as in C).
- Helm: `hard_helmet ? 'helm' : 'hat'` ≡ C `:5512–5528`
  (`!hard_helmet ? "hat" : "helm"`); JS `hard_helmet` itself ≡ C
  `do_wear.c:567–573` (is_helmet gate first, metallic||crackable —
  read both bodies, identical).
- Shirt ≡ C `:5599–5603` (constant "shirt").
- W arm ≡ C `iactions.c:631–650` (`!already_worn` + ARMOR_CLASS gate,
  `armcat_to_wornmask(objects[otyp].oc_armcat)` → `wearmask_to_obj`,
  empty slot → "Wear this armor", else `[already wearing %s]` over
  `an(armor_simple_name(o))`).

Two data-model notes, both benign: JS reads the armor category via
`oc_skill` (objects.js:180 documents `oc_armcat` stored in `oc_skill`;
`armcat()` returns −1 off-table → default arm, same destination as C's
`impossible` path); `wearmask_to_obj(0)` returns null (no bit set —
read the slot loop) → "Wear this armor". No RNG anywhere in this arm,
so no call-for-call RNG walk is owed.

Hallucinations / overclaim: none. The D-log names the suit
dragon-mail/scales deferral and the surface/cantwield carries; all
verified as pre-existing map rows, and the map section
(`turns.md`) was updated in-commit.

Density: one C locus family (W arm + its 7 callees), ~140 JS
insertions — right-sized per §2b.

Verification: D-log Verify shows the full post-edit
`verify.mjs --fn itemactions` → PASS (hidden 1 PASS PROGRESS on
explore-seed0360 step 853; green 2/2; strict both gates; cohort 7/7).
Re-measured myself:
`hidden-proxy.mjs verify itemactions --base 3dadc461~1` →
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(explore-seed0360-wizard-world-tour-5dfef5c4: PASS). Rule2 clean per
the verify line; grepped the diff — no FORCE/DIAG/`getRngLog`/seed
names in control flow, no coordinates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
