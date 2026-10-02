# Review 2229 — 6796c72b6 — stethoscope defsym + unleash_all/feel_newsym wiring

Metadata: SHA `6796c72b615018cbe26a4223e1c022bd1f1470f4` (D-3268,
2026-10-02). `js/apply.js`, `js/end.js`, `js/lock.js` (+11/−9).
6-function cluster: use_stethoscope, unleash_all, feel_newsym,
grease_ok, jelly_ok, discard_broken_wand — one Inventory + one
fidelity block per function below.

Intent vs deliverable: subject promises "stethoscope
furniture-mimic naming via live defsym table +
unleash_all/feel_newsym caller wiring (6-fn cluster; retires
D-2594 omit)". The diff delivers exactly that: the
M_AP_FURNITURE arm, the finish_paybill unleash_all() call, the
doclose feel_newsym swap, plus doc-only omit retirements.
Delivers what it promises.

Inventory:

- `use_stethoscope` (`js/apply.js:475`): M_AP_FURNITURE arm
  `what = 'thing'` → `what = defsym_explanation(mtmp.mappearance
  | 0)`; `defsym_explanation` added to the pre-existing uhitm.js
  import edge (call-time use of a hoisted export; no new module
  edge). Doc omit retired.
- `finish_paybill` (`js/end.js:1318`, shk.c caller): `//
  unleash_all deferred` → `unleash_all()` at C shk.c:2745's
  position (import pre-existing :97). Doc omit retired.
- `doclose` (`js/lock.js:1172`, lock.c caller): door-close
  `newsym(x, y)` → `feel_newsym(x, y)` (C lock.c:1042; import
  pre-existing :7).
- `unleash_all`, `feel_newsym`, `grease_ok`, `jelly_ok`,
  `discard_broken_wand` bodies unchanged — declared ported via
  whole-body + caller audit in the D-log (verified below).
- `sym.mjs` (symbols re-pointed/wired; nothing deleted):
  defsym_explanation js/uhitm.js:4510 sync export ✓;
  unleash_all js/apply.js:1557 sync export ✓; feel_newsym
  js/display.js:5205 sync export ✓; feel_location
  js/display.js:5038 sync (named partial-live) ✓; grease_ok /
  jelly_ok / discard_broken_wand file-local in js/apply.js
  (:2293/:3109/:1181) matching C staticfn in apply.c ✓ (C-home
  file, correct shape — not drift).

**C ↔ JS fidelity — `use_stethoscope`** (full re-walk, JS
:475–660 vs C apply.c:314–470): interference entry initializer
with the rn2 burn first ✓; nohands/Deaf/freehand gates ✓;
getdir→ECMD_CANCEL ✓; hero_seq/stethoscope_seq res ✓;
bhitpos+notonhead ✓; usteed-dz / uswallow-dir / uswallow-interf
/ dz arms in C order (Underwater → reach → its_dead →
stronghold → surface) ✓; cursed rn2(2) ✓; confdir + self
ustatusline ✓; isok typing-noise ECMD_OK ✓; m_at arm
mundetected / mappearance (OBJECT slime-mcorpsenm + plural,
MONSTER pmname, FURNITURE defsym) / verbose ✓; seemimic+pline
✓; mstatusline+map_invisible ✓; unmap_invisible ✓;
SDOOR (soundeffect) / SCORR (none — matches C) + feel_newsym
✓; its_dead tail with C `You`, not `You_hear` ✓. RNG order
rn2(10|3) → rn2(2) matches C ✓. The new arm is exactly C
:430–431 `defsyms[mappearance].explanation`.

**C ↔ JS fidelity — `defsym_explanation` table** (the arm's
callee): struct symdef is {sym, explanation, color} (sym.h)
and PCHAR_DRAWING maps PCHAR2→`{ch, desc, clr}` with desc the
*second* string (defsym.h:86–87) — JS uses the second string
('wall', 'doorway', …) with index 0 'stone' ✓. Slots 0–87
match defsym.h; 74–85 '' + 86–87 poison-cloud/valid-position
✓. Furniture-mimic appearances (set_mimic_sym, makemon.c)
are all ≤ 37 with non-empty slots, so the 'furniture'
fallback is unreachable here ✓. The S_TRAPPED_CHEST special
case duplicates table[73] — redundant, harmless.

**C ↔ JS fidelity — `unleash_all`** (JS :1557–1565 vs C
apply.c:745–756): invent LEASH leashmon=0 loop + fmon
mleashed=0 loop ✓ (`if (LEASH >= 0)` guard vacuous — constant
defined). All four C callers wired: bones.c:435→end.js:1700,
mhitu.c:1354→mhitu.js:1859, shk.c:2745→end.js:1329 (new, at
C's position: after the isok fix, before money2mon —
verified against shk.c:2733–2753), trap.c:5103→trap.js:6640
✓. finish_paybill keeps the impossible() arm named ✓.

**C ↔ JS fidelity — `feel_newsym`** (JS :5205 vs C
display.c:725–732): Blind→feel_location else newsym ✓
(hero_Blind ≡ Blind, standard). New lock.c:1042 wiring ✓;
spot-checked lock.c:914→lock.js:996 ✓ and both in-body
apply.c:457,463 SDOOR/SCORR calls ✓; remaining 12 pre-existing
claims unrechecked (noted, not verified).

**C ↔ JS fidelity — `grease_ok`** (JS :2293 vs C
apply.c:2584–2601): null→SUGGEST, COIN_CLASS→EXCLUDE,
inaccessible→EXCLUDE_INACCESS, else SUGGEST ✓.
GETOBJ_EXCLUDE_C is an alias import of GETOBJ_EXCLUDE (−3;
local const shadows the name) ✓, and
equipment_is_inaccessible(obj,false) ≡ C's verb-null
predicate (apply.js:2254–2256 returns verb-free) ✓. Sync ✓.

**C ↔ JS fidelity — `jelly_ok`** (JS :3109 vs C
apply.c:3606–3613): EGG→SUGGEST else EXCLUDE ✓, exact.

**C ↔ JS fidelity — `discard_broken_wand`** (JS :1181 vs C
apply.c:3875–3885): current_wand→null, delobj if set,
nomul(0) ✓; both callees sync (mkobj.js:4059, hack.js:1674)
so the un-awaited calls are correct ✓.

Hallucinations / overclaim: none. "Whole C body live" holds
for all six (re-walked, not trusted). The Mgender 46-caller
audit is honestly deferred (left ledger-unknown, no row
written — acceptable: not claimed ported).

Density: 6 whole functions, one C file (apply.c) + one
callee (feel_newsym) — §10.17 compliant. +11/−9 with the
below-80 exception documented (PARTIAL sweep, closure live).
Per-function Ledger + Verify lines present for all six ✓.

Verification: D-log Verify shows per-function vacuous notes
+ smoke REACH-OK + green/strict/cohort (full skipped —
no shared file). Re-measured (`hidden-proxy.mjs verify
<6 fns> --base 6796c72b6~1 --reach-all`): all six vacuous
(0 blocked — the queue row cited a missing arm, no blocks,
so the note is honest) + smoke 24/24 PASS → REACH-OK each.
Zero regressed. Banned-pattern grep on js/ hunks: clean
(one commit-message self-mention only). Rule #2 clean
(imports.mjs --rulecheck, whole tree).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
