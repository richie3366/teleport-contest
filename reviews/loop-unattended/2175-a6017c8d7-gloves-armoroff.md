# Review 2175 — a6017c8d7 — Gloves_off + armoroff restarts

SHA `a6017c8d7`, D-3215; 2026-10-01; `js/do_wear.js` only (+206/−57).
Two-function same-C-file cluster (do_wear.c). Closes no prior review.

## Metadata

- Subject: "`do_wear.c` ×2: Gloves_off + armoroff whole-body restarts
  (D-3215)".
- Promises: restart both in C order (Gloves_off switch/encumber/Glib/
  bareh; armoroff cursed/delay/no-delay + tail); names on existing
  edges; condtests "new botl edge" cycle-checked.

## Intent vs deliverable

Kept. Diff restarts both bodies in C order with all named arms, all
imports on pre-existing edges (and the botl edge is not even new —
`--can` reports ALREADY; the "new edge" wording is wrong in the
safe direction, noted below). No other JS.

## Inventory — Gloves_off

Restarted in place (`js/do_wear.js:1024`, same export/signature).
New imports: `encumber_msg` (invent), `make_glib` (potion),
`condtests` (botl) — all existing edges; new const LEATHER_GLOVES.

```text
encumber_msg  js/invent.js:1174  ASYNC — await required (awaited ✓)
make_glib     js/potion.js:825   sync (un-awaited ✓)
condtests     js/botl.js:1234    sync export const (lazy body read ✓)
adj_abon      js/do_wear.js:1278 sync same-module (un-awaited ✓)
makeknown     js/invent.js:4700  sync (un-awaited ✓)
Glib          js/potion.js:796   sync
```

All LIVE, no clones, no STUBs. Deleted/re-pointed: none (same-name
restart; clear_worn kept).

## C ↔ JS fidelity — Gloves_off

C `do_wear.c:645–702` (csym range), walked in order: gloves capture
✓ (null-gloves graceful clear pre-existing, kept, disclosed —
C dereferences uarmg); oldprop `extrinsic & ~WORN_GLOVES` ✓;
on_purpose `!mon_moving && !in_use` ✓; takeoff.mask clear ✓;
switch before setworn ✓ — LEATHER break ✓; FUMBLING
`!oldprop && !(HFumbling & ~TIMEOUT)` → zero both halves ✓ with
HFumbling≡intrinsic / EFumbling≡extrinsic (youprop.h:127–128) and
TIMEOUT 0x00FFFFFF ≡ C prop.h:135; the flat-mirror OR matches the
file's Gloves_on convention (:1594) ✓; POWER makeknown + botl ✓;
DEXTERITY `!cancelled_don → adj_abon(gloves, -spe)` with uarmg
still worn (adj_abon reads uarmg identity — ordering required and
kept) ✓; default `impossible("Unknown type of %s (%d)", "gloves",
otyp)` ≡ C unknown_type/c_gloves (do_wear.c:9/12) ✓; setworn(NULL)
via clear_worn≡setworn(null,·) (:715) ✓; cancelled_don=FALSE ✓;
encumber_msg ✓; `if (Glib) make_glib(0)` ✓; wielding_corpse pair
with captured gloves ✓ (async, awaited); `condtests[bl_bareh].
enabled → botl` with bl_bareh = enum 0 (botl.h:70, first entry;
JS bl_bareh=0 with parallel-indices comment) ✓; return 0 ✓. No RNG
added on any arm. Callers (all 5 + comment) match the D-log
(do_wear :2018/:2517/:4236, polyself :1456, steal :320/:881).
Verdict: ACCEPT.

## Inventory + fidelity — armoroff

Restarted in place (`js/do_wear.js:1941`, same local/signature).
No new imports. Callees: cursed (do_wear.js:330 async, awaited ✓),
nomul (hack.js:1654 sync ✓), 7 armcat names (6 same-module
exports + canonical objnam gloves_simple_name, all pre-existing
with C cites — suit spot-checked exact vs objnam.c:5470–5489
incl. the "suit is lame" comment), 7 *_off (async, awaited ✓),
impossible (async, awaited ✓), off_msg (do_wear.js:266 async,
awaited ✓), armcat (oc_skill ≡ oc_armcat per the table convention
✓), takeoff_info (same-module live ref ✓). All LIVE, no clones
(the fountain gloves-name clone is untouched, elsewhere), no
STUBs. Deleted: the slot-identity if-chain and the invented
owornmask-clear else (no symbol output — inline logic, not
symbols); armor_doff_simple_name orphaned from this path.

C `:1919–2008` walked in order: delay=-oc_delay ✓; cursed→0 ✓;
delay arm nomul + "disrobing" + per-armcat what+afternmv (all 7
✓) + default impossible with the exact
'Taking off unknown armor (%d: %d), delay %d' ✓ + `if (what)`
nomovemsg (the old unconditional set fixed) ✓; no-delay armcat
switch (the old worn-slot dispatch fixed — fedora/leather jacket
now route by category as C does) + default '…no delay' ✓ +
off_msg after removal ✓; mask=what=0 tail on both arms ✓;
return 1 ✓. Sole caller C :1808 → JS :2161 ✓. The old invented
else (owornmask clear) is correctly gone — C's default only
impossibles. No RNG in the delta. Verdict: ACCEPT.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
gates. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

One safe-direction wording nit (not a C-wrong): "condtests is a
new botl edge" — `imports.mjs --can do_wear botl` reports ALREADY
(do_wear already imports botl.js), so no edge was added and the
SCC reasoning, while correct about lazy-read safety, was
unneeded. Everything else verified ("existing edges", callee
claims, caller maps).

## Density

Two whole C functions of one C file (do_wear.c), +206 js
insertions, no Must-fix bundled. Per-function Ledger and Verify
lines present. The D-log's file-sweep note (2 ported + 3 stale)
matches the ledger diff.

- Ledger: Gloves_off ported — ACCEPT.
- Ledger: armoroff ported — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
smoke Gloves_off: no RNG-tagged reach; fixed smoke spread (24 run, 13.1s): 24 PASS, 0 regressed → REACH-OK
smoke armoroff: no RNG-tagged reach; fixed smoke spread (24 run, 13.3s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous notes + REACH-OK ×2, green/strict/
cohort, full 44/44). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
