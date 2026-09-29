# Review 2034 — 80c81d0a0 — zap.c breadth sextet (D-3074)

Metadata: SHA `80c81d0a0`, D-3074, js/lock.js + js/invent.js +
js/do_wear.js + js/zap.js (~290 ins). 6 zap.c functions: 3
changed (boxlock_invent, item_what, zhitu), 3 verified
no-change (obj_shudders, adtyp_to_prop, zombie_can_dig).

## Intent vs deliverable

Promise: head boxlock_invent + 5 same-file rows; fix the
boxing flag, item_what slot nouns, zhitu deferred arms.
Diff delivers exactly that: lock.js flag+refresh, invent.js
item_what rewrite + enl_suit clone deletion, do_wear.js
boots export, zap.js zhitu arms + Disint_resistance local.
Kept.

## Inventory (per function)

- `boxlock_invent` (CHANGED lock.js): boxing flag +
  update_inventory. Callee boxlock/update_inventory LIVE.
- `obj_shudders` (no change, zap.js:4974 local): bypass
  gate, odds ladder, halve, !rn2 — all present.
- `adtyp_to_prop` (no change, invent.js:5549 local): 5
  AD→prop arms + 0 default — present (arm order differs,
  disjoint if-returns, no side effects).
- `item_what` (REWRITTEN invent.js): full C-order ladder
  over live exports; DELETED local clone
  `enl_suit_simple_name` → live `suit_simple_name`;
  `boots_simple_name` newly exported from do_wear.js.
- `zombie_can_dig` (no change, zap.js:3129): isok/t_at/
  ROOM/CORR/GRAVE — present.
- `zhitu` (CHANGED zap.js:2052): shieldeff/monstseen on
  FIRE/COLD/SLEEP/LIGHTNING/ACID/DEATH, breath strip,
  POISON_GAS, killer verb. New: AD_DISN const, local
  `Disint_resistance` (youprop sibling pattern); imports
  inventory_resistance_check, poisoned, disintegrate_arm.

## C ↔ JS fidelity (per function)

boxlock_invent (C :2686–2702): flag, nextobj-prefetch ≡
snapshot, boxlock call, update_inventory iff hit ✓. `!obj`
defensive vs NONNULLARG1 (:35–37) ✓. Callers zap.c:2943/
:2952 → js/zap.js zapyourself ×3 live sites ✓. Confirm.

obj_shudders (C :1475–1497): bypass→FALSE, 3/3/12/8
ladder, quan>4 trunc-halve (3/2=1 ✓), !rn2 ✓. Caller
bhito ✓ (js:5575 in bhito). Confirm.

adtyp_to_prop (C :5653–5671): all 5 arms + 0 ✓
(AD_DISN=5 pre-existing invent.js:5543; monattk.h:47 ✓).
Callers u_adtyp_resistance_obj + item_what wired ✓. Confirm.

item_what (C :5721–5763): prop/xtrinsic read, wizard
gate (reordered before reads — pure, equivalent), full
11-arm ladder in C order over live exports ✓, ring
both/one (:5750–5753, W_RINGL ✓), W_WEP ✓, " by your %s"
format (C %.40s truncation dropped — names <30 per C
comment, immaterial). suit_simple_name covers dragon
mail/scales + null→'suit' ≡ deleted clone ✓. Caller
item_resistance_message_lines ✓. Confirm.

zombie_can_dig (C :862–875): isok/t_at/ROOM/CORR/GRAVE
✓ (pure reordering). Caller revive ✓ (js:3215). Confirm.

zhitu (C :4400–4591): FIRE/COLD/LIGHTNING resist arms
(shieldeff→pline→monstseesu→ugolemeffects; else
dam+monstunseesu) ✓; burn/destroy/ignite rn2 gates in
order ✓; SLEEP hero-spot shieldeff ✓, monstunseesu
before fall_asleep ✓; DEATH breath (disn_prot drawn
first ✓, resist/disn_prot breaks, shield→suit→death
strip with cloak/shirt wipe ✓, fall-through to
:4503 tail ✓); nonliving/demon + Antimagic arms with
shieldeff in C order ✓; ugrave_arise
type==-(20+4)?-3:NON_PM ≡ :4507 (ZT_BREATH_0=20,
ZT_DEATH=4, macro (20+(x)) ✓); POISON_GAS exact args
✓; ACID monstseen both arms ✓; killer verb ladder
(wand/TOOL_CLASS "played") ✓; :4572 buzzer gate ✓;
:4579–4582 FIXME kept ✓; halve (dam+1)/2 ✓;
losehp(dam,kbuf,KILLED_BY_AN) with kept `if (dam)`
gate (named, D-0737) ✓. Callees: all LIVE except
death_inflicted_by+strsubst (named omit, partial ✓ —
imports.mjs --can zap→mcastu returns CHECK/lazy-only,
so the cycle note is honest) and Disint_resistance
(verified CLONE: sibling-identical youprop local; C is
a macro H||E, youprop.h:38–40 — per-file locals are
the repo convention, not drift). Callers ubreatheu
(:2266) + dobuzz (:2485) ✓. Confirm.

sym.mjs (required): `enl_suit_simple_name` NOT FOUND
(clean delete) ✓; `Disint_resistance` 3 locals incl.
new zap.js:613 (sibling pattern, see above);
`suit_simple_name` single export ✓.

## Hallucinations / overclaim

None. "Every new arm is session-reached" — zhitu has
17 RNG-tagged reachers; the other five honestly report
smoke (no RNG-tagged reach), not session reach. The
D-log Verify bullet states this plainly. Confirm.

## Density

6 whole functions, one C file, ~290 ins — §2b-shaped
✓. `Ledger:` 5 ported + zhitu partial ✓. Per-function
verdicts: boxlock ACCEPT / obj_shudders ACCEPT /
adtyp_to_prop ACCEPT / item_what ACCEPT /
zombie_can_dig ACCEPT / zhitu ACCEPT.

## Verification

Re-measured `hidden-proxy verify <all six> --base
80c81d0a0~1 --reach-all`: 0 blocked each (honestly
vacuous — coverage rows) + zhitu reach 17/17 PASS →
REACH-OK (exactly the claimed 17) + five smokes
24/24 → REACH-OK, 0 regressed ✓. Ban-grep clean (0
hits). Rulecheck clean (see 2033).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
