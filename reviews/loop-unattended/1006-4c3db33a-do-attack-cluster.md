# Review 1006 — 4c3db33a — do_attack cluster: ranged dispatch + caitiff + init (D-2036)

Metadata: SHA `4c3db33a`, D-2036, Open-row port (three
screen-first rows under one `uhitm.c:543` literal).
js/ touches 5 files: `uhitm.js` (+60/−17), `wield.js`,
`u_init.js`, `apply.js` (3 awaits), `dokick.js` (1
await). Also rescores `hidden-corpus/scoreboard.json`.
No stamp owed.

## Intent vs deliverable

Subject promises: `hmon_hitmon_weapon` dispatch
verbatim (four ranged arms → `rnd(2)` + silver
`rnd(dmg?20:10)`, skill flags FALSE); caitiff +
find_roll_to_hit async with **all 9 call sites
awaited**; u_init initial wield via set-functions;
wield typo + two setuwep conditions. Diff actually
adds: all of that. But the "verbatim / all"
framing overclaims in three places (see C-wrongs).
Promise ⊃ diff.

## Inventory

- New JS: ranged/melee dispatch inside `hmon`
  (inline, not a separate fn). Changed: caitiff
  async + 9 awaited sites; u_init slot assigns →
  set-calls; wield_tool `game.unweapon`→`game.gu`;
  setuwep Snickersnee/towel conditions.
- `sym.mjs`: `is_pole`/`shade_glare`/
  `ART_SNICKERSNEE` extend pre-existing edges;
  `is_vampshifter js/monsters.js:808 sync` **live but
  unused**; `mon_hates_silver js/monsters.js:833`
  **live, exact C port, unused**; `rnl sync`,
  `uwepgone js/wield.js:317 ASYNC` live. No STUB /
  clone / no-op. No symbols deleted or re-pointed
  (sync→async widens, nothing re-points to an
  import), so the delete/re-point sym rule is
  vacuous.

## C ↔ JS fidelity

Confirmed branch-by-branch:

- Dispatch `uhitm.c:1069–1092` verbatim: launcher /
  missile-or-ammo in hand / short unmounted
  non-Snickersnee pole / ammo-without-launcher —
  all four conditions match, including
  `!is_art(obj, ART_SNICKERSNEE)`. Melee keeps
  dmgval + skill + artifact_hit; ranged correctly
  skips artifact_hit (C ranged has none).
- Shade-zero / `rnd(2)` / `rnd(dmg?20:10)` match
  `:885–900`; `hmd.material` is `oc_material`
  (`:1774`), so the JS `oc_material` read ≡ C.
- setuwep ≡ `wield.c:128–134` (Snickersnee + wet
  towel); wield_tool `gu.unweapon` ≡ `:756`;
  ini_inv_use_obj ≡ `u_init.c:1284–1292`
  (setuqwep/setuwep/setuswapwep cascade).
- Caitiff ordering fix is real (C prints inside
  find_roll_to_hit `:383`, synchronously).

Three gaps, all in the ported envelope:

1. **Boomerang tail dropped.** C
   `hmon_hitmon_weapon_ranged` runs `:884–917`;
   the port stops at `:900`. The `:901–917` arm
   (`!thrown && obj==uwep && BOOMERANG &&
   rnl(4)==3` → splinter pline, uwepgone/useup,
   hittxt, dmg++) has RNG + state surface and is
   named nowhere — not in the commit Named list,
   not in D-2036, not in turns.md (which describes
   ranged as shade/rnd/silver only). Unnamed
   omission of a live arm.
2. **Silver predicate narrowed.** C `:896` tests
   `mon_hates_silver(mon)` = `is_vampshifter(mon)
   || hates_silver(data)` (`mondata.c:516–520`);
   JS tests only `hates_silver(mon.data)`. The
   exact callee `mon_hates_silver` is live in
   monsters.js with its C citation — the port
   reached past it for the narrower predicate.
   Dropped C disjunct (D-1849 class).
3. **Tenth caitiff site floats.** `js/dokick.js:860`
   calls the now-async `check_caitiff` without
   await inside an async fn (same fn awaits at
   :853/:957), so the rebuke floats exactly the
   way this commit fixed at the other nine. C
   `dokick.c:68` calls it synchronously before
   tame-abuse output. "All 9 call sites awaited"
   is false — there are ten.

## Hallucinations / overclaim

"Dispatch verbatim" (ranged callee is `:885–900`
of `:884–917`) and "all 9 call sites awaited"
(ten exist) are both overclaims in the subject
line itself. The D-log's damage arithmetic for the
Monk rat (2 vs 4 HP) is measured and consistent.

## Density

~75 insertions across 5 files and three mechanisms
(ranged dispatch, pline ordering, init-time
unweapon) plus a cross-file u_init change. The
three share one screen literal but are independent
falsifiers; the u_init arm is a different C
function/file (`u_init.c`, not `uhitm.c`). At the
top edge of §2b — shippable as a cluster, but the
bundling is what let gaps 1–3 slip past the
"every callee LIVE/OMIT/CLONE" gate uncounted.

## Verification

- `imports.mjs --rulecheck`: clean. Diff-hunk grep:
  no FORCE/DIAG/getRngLog/fastforward/seed gates.
- Re-measured `hidden-proxy verify do_attack --base
  4c3db33a~1`: `2 PASS, 1 moved past, 0 unchanged,
  0 worse → PROGRESS` — matches the D-log exactly
  (Monk-91115, Samurai-91129 PASS; Tourist-92047
  154 do_attack → 161 arti_light_description).
- Green 2/2 + strict ×2, cohort 7/7, full 44/44
  per D-log (owed for shared uhitm/wield, claimed).

## Actionable C-wrongs (**Addressed:** D-2040 covers item 1, D-2041 covers item 2; item 3 stays queued)

1. Port the boomerang tail (`uhitm.c:901–917`):
   `rnl(4)` splinter arm with uwepgone/useup +
   hittxt + dmg++ (all callees live).
2. Silver test: use live `mon_hates_silver(mon)`
   instead of `hates_silver(mon.data)`
   (restores the `is_vampshifter` disjunct).
3. Await `check_caitiff` at `js/dokick.js:860`
   (C `dokick.c:68`; enclosing fn already async).

Verdict: **QUALITY-RISK**
