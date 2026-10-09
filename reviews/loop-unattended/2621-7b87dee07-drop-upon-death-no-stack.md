# Review 2621 — 7b87dee07 — drop_upon_death no-stack death-drop (D-3754)

Metadata. SHA `7b87dee07` (2026-10-09, HEAD~1), D-3754,
parent `5de410d26`. js diff: `js/end.js` +5/−8 (two
stackobj deletions + C-cited comments + `export`) +
`scripts/drop-upon-death-no-stack.test.mjs` (new, 2 its).
Ledger: `drop_upon_death` + `give_to_nearby_mon` ported
(D-3754 appended). Works its
HEAD's cliffs head (`mkobj.c` next_ident, 1 blocked:
95420 — verified in the parent queue; owner symptom,
writer = the bones-content drop).

## Intent vs deliverable

Promise (subject + D-log): 95420@864 C `rnd(2) @
next_ident` (42nd ghostly remap) vs JS `rn2(8) @
collect_coords` (stream shifted by exactly one draw).
Measured: C draws exactly 42 remap idents; temp JS dumps
(reverted md5-verified) show save/load/remap conserving
at n=41 with RNG matched through 31024 — so the gap is
pre-save and draw-free. Root cause: JS appended
`stackobj` after `place_object` on both death-drop arms
(the old comment admitted "C is place_object only");
the ghost-arm drop merged the hero's invent into a floor
pile where C keeps it separate → 41 bones objects vs
42. Delete both merges; export drop_upon_death (extern);
verify the body whole arm-by-arm.

Diff actually adds exactly that. Promise and diff match.
No new imports (stackobj import retained for the
throw/kick sites), no signature change.

## Inventory

Changed JS (2 arms + 1 export):

- drop_upon_death — `js/end.js:1550–1591` (floor arm
  `:1585`; export added).
  C: `bones.c` `:258–303` (printed range) — floor arm
  `else place_object(otmp, x, y)` `:298–299`, verified
  with no merge call.
- give_to_nearby_mon else arm — `js/end.js:1523`.
  C: `:226–255` (staticfn, verified) — reservoir
  `!rn2(nmon)` + can_carry gate, else `place_object`
  `:253–254`, verified with no merge call.
- place_object purity: no stackobj/merge in C
  `mkobj.c:2305–2366` (verified by grep) — pure pile
  threading, so deletion is exactly C.

## C ↔ JS fidelity

**Both deletions exact.** C places and never merges on
either arm; JS now does the same. The old code's own
comment confessed the deviation, so this is a revert to
C, not a judgment call.

**drop_upon_death whole, C-ordered** (body read fully):
twoweap ✓, extract loop (shift + OBJ_FREE + nobj null ⇔
obj_extract_self) ✓, unheld gate (`!mtmp ||
is_undead`) ✓, burn/smother before owornmask clears ✓,
owornmask ✓, goodfruit ✓, `rn2(5)` curse ✓, 3-way
placement (mtmp → minv / cont → container, no nearby
gate / `!rn2(8)` → nearby / else place-only) ✓, cont
owt reweigh ✓. RNG call-for-call (rn2(5), rn2(8)).

**give_to_nearby_mon whole:** 3×3 scan with isok /
u_at / m_at / likes_* gates ✓, reservoir `!rn2(nmon)`
✓, can_carry → minv else place ✓.

**Callers all wired** (all 5 verified by grep): C
bones.c :463/:473/:486/:492 → JS end.js
:1723/:1730/:1744/:1750; C shk.c :2754 → JS :1329.
(D-log cites 1727/1734/1748/1754 — pre-edit numbers,
off by 4; cite note only.) Export matches C extern
linkage (`extern.h:253`, verified) and is consumed by
the new test. `give_to_nearby_mon` correctly stays
local — C is staticfn (the sym.mjs "LOCAL CLONE" label
is its generic unexported-function wording, not drift:
one C static function, one JS local).

**Test.** Gold-onto-gold on both arms (place arm +
nearby-fallback with no mons): 2 unmerged piles, quans
intact. 0/2 pre-fix with stackobj restored (authentic),
2/2 post-fix. Pins the exact mechanism.

## Hallucinations / overclaim

None. The 42-vs-41 attribution is measured at three
levels (C draw count, JS save/load dumps, RNG-matched
prefix), and the "screens matched until load via
same-glyph piles" explains the late divergence. Diff
grep (FORCE / DIAG / getRngLog / fastforward / seed /
coords): zero hits. Local → export re-point: `sym.mjs`
paste required and below — single async export.

```text
drop_upon_death  js/end.js:1550   ASYNC — await required
```

Rule #2: global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is next_ident (1 blocked,
RNG lost 53068); this commit ships the predicted writer
(D-3751 named it) whole and FULL PASSes the probe. One
cliff, one C locus, no bundling. Correct gates
(green/strict/cohort; full skipped per gate — end.js
not shared — honestly stated).

## Verification

D-log Verify (`verify.mjs --fn
next_ident,drop_upon_death --base 9d1f099fd`): next_ident
1 PASS + 0 + 0 + 0 → PROGRESS (95420 FULL PASS);
reach 80-spread + 175/175 → REACH-OK; green/strict/
cohort PASS.

Re-measured by this audit (`verify
next_ident,drop_upon_death --base 7b87dee07~1
--reach-all`; HEAD code includes 1 later no-js SHA):

```text
verify next_ident: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
reach next_ident: 1014 baseline-PASS session(s) reach it (1014 run, 451.8s): 1014 PASS, 0 regressed → REACH-OK
reach drop_upon_death: 175 baseline-PASS session(s) reach it (175 run, 92.0s): 175 PASS, 0 regressed → REACH-OK
```

Exact confirm: FULL PASS stands, full reach 1189
sessions, 0 regressed. No vacuous check (row cited 1;
itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
