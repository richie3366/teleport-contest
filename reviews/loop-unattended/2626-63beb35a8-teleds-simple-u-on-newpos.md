# Review 2626 — 63beb35a8 — teleds_simple via live u_on_newpos (D-3760)

Metadata. SHA `63beb35a8` (2026-10-10), D-3760, parent
`5fa95f0c5`. js diff: `js/steed.js` +13/−8 (helper →
async + `await u_on_newpos`; caller awaits; 1 import) +
`scripts/dismount-steed-observe-nearby.test.mjs` (new,
1 it). Ledger: steed.c + teleport.c jsonl (D-3760
appended). Works its HEAD's cliffs head (`steed.c`
dismount_steed, 1 blocked: 95323 — verified head of
the parent queue @8901dc583).

## Intent vs deliverable

Promise (subject + D-log): 95323@482 kind=screen,
toplines identical; first differing cell r14c68 = map
(69,13): C `!` color 13 (specific potion) vs JS `!`
color 8 (NO_COLOR generic). Cell generic both sides
since step 335; C flips specific exactly at the
dismount turn. JS pile is the right object
(oc_color 13) with dknown=0 — never observed. Root
cause: teleds_simple open-coded ux/uy (+usteed mx/my),
skipping C teleds `:525` u_on_newpos's same-level
see_nearby_objects. Route placement through the live
export.

Diff actually adds exactly that, keeping the ux0/uy0
snap, newsym pair, vision_recalc, botl. Promise and
diff match.

## Inventory

Changed JS (1 helper + 1 caller + 1 import):

- teleds_simple — `js/steed.js:470–485` (now async;
  `await u_on_newpos(nux, nuy)`).
  C: `teleport.c` teleds `:490–491` (ux0/uy0 snap) +
  `:525` (`u_on_newpos(nux, nuy)` — "set u.\<x,y\>,
  usteed->\<mx,my\>; cliparound()").
- dismount_steed call site — `:1030` (now awaited).
- Import `u_on_newpos` from `./mklev.js`.

## C ↔ JS fidelity

**Placement exact.** C `:525` is the whole placement
step; JS now calls the LIVE `u_on_newpos`
(`js/mklev.js:552`, ASYNC, single export, zero clones —
sym.mjs below). Its body (read) matches C
`dungeon.c:1568–1601` (read) arm-for-arm: isok gate,
ux/uy set, cliparound (CLIPPING defined), uundetected=0,
usteed share, new-level branch (ux0 snap +
map_location + terrain_typ) vs same-level
`!Blind && !Hallucination && !uswallow →
see_nearby_objects`, earth_sense last. C's own comment
at the same-level arm — "generic object(s) to
redisplay them as specific objects" — is precisely the
divergence mechanism. The deleted open code (ux/uy +
usteed share, no observe/cliparound/uundetected/
earth_sense) was a diverging CLONE, now a LIVE import.

**Kept lines C-true.** ux0/uy0 snap before placement ≡
C `:490–491`; newsym pair + vision_recalc + botl
unchanged (pre-existing subset shape).

**Callee closure.** u_on_newpos's callees (cliparound,
see_nearby_objects, earth_sense, map_location) are
pre-existing LIVE users of the same export — 134+
call sites already await it; no stub introduced. The
deferred teleds arms (ball/chain, reset_utrap,
set_ustuck, mimic, swallowed docrt, fill_pit,
update_player_regions, see_monsters, nomul,
notice_mon/off/all, switch_terrain, vault,
spoteffects, invocation) are every one named in the
D-log — a complete OMIT list, none of them on this
divergence path (screen-first dknown observe).

**Single-caller async is safe.** teleds_simple has
exactly one caller (dismount_steed `:1030`, awaited —
grep-verified); no sync caller breaks. u_on_newpos
runs no pickup/spoteffects, so the
`in_steed_dismounting` guard shape is undisturbed.
Import check (this audit):

```text
ALREADY: steed.js already statically imports mklev.js. No new edge needed.
```

Stronger than the commit's "SAFE" claim — no new edge
at all. sym.mjs on the wired callee (required paste):

```text
u_on_newpos      js/mklev.js:552   ASYNC — await required
```

**Test.** Mounted hero, all-ROOM, dknown=0 water
potion orthogonally adjacent (within neardist of any
landing square); asserts the observe. Re-ran: 1/1
(this audit); D-log's pre-fix `0 !== 1` failure is the
authentic shape.

## Hallucinations / overclaim

None. Diff grep (FORCE / DIAG / getRngLog / fastforward
/ seed / coords): zero hits. No "Match C" overclaim —
the subset-vs-teleds delta is enumerated, not hidden.

## Density

Cliff-phase §2b: parent head dismount_steed (1
blocked, RNG lost 37669); this commit ships the writer
(u_on_newpos's observe — owner symptom-class, region
heuristic) with 1 moved (+290 at ship). One cliff, one
C locus (`teleport.c:525` + `dungeon.c:1568–1601`), no
bundling. Correct gates incl. explicit full 44/44 for
the dismount blast radius (claimed in D-log).

## Verification

D-log Verify (`verify.mjs --fn
dismount_steed,teleds`): 95323 482→rob_shop@772; reach
1/1 + teleds 24-smoke → REACH-OK; gates + full PASS.

Re-measured by this audit (`verify
dismount_steed,teleds --base 63beb35a8~1 --reach-all`;
HEAD code includes 4 later SHAs):

```text
verify dismount_steed: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Valkyrie-95323: moved → wiz_intrinsic at step 1082 (was 482)
reach dismount_steed: 1 baseline-PASS session(s) reach it (1 run, 1.8s): 1 PASS, 0 regressed → REACH-OK
verify teleds: no corpus session is blocked on it at 63beb35a8~1 — a vacuous verify is NOT a corpus PASS. […]
smoke teleds: no RNG-tagged reach; fixed smoke spread (24 run, 12.8s): 24 PASS, 0 regressed → REACH-OK
```

95323 now sits at wiz_intrinsic@1082 — strictly past
the ship-time rob_shop@772 (later SHAs, incl. D-3761
rob_shop, moved it further). Forward progress, not a
contradiction; 0 worse. No vacuous check (row cited 1;
that session itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
