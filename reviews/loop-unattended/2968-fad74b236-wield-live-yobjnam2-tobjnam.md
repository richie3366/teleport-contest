# Review 2968 — fad74b236 — wield.js drops its Yobjnam2 / Tobjnam / Blind clones

- SHA: `fad74b236` (two near-pass cliffs in one C file, wield.c: owners
  `weldmsg`, `can_twoweapon`)
- D-entry: D-4128; Ledger: weldmsg, can_twoweapon, chwepon, uwepgone,
  ready_weapon, setuwep ported
- `js/` diff: `js/wield.js` +14/−44

## Intent vs deliverable

Promise: wield.c names objects through objnam.c `Yobjnam2` / `Tobjnam`,
and `Yobjnam2` → yobjnam → aobjnam prepends the count. wield.js used
local clones (`Your ${xname} ${vtense}`), so a stack lost its count,
«Your 2 daggers are welded…». Diff: the local `Tobjnam`, `Yobjnam2` and
`Blind_w` are deleted. Every site imports the objnam.js / invent.js
exports. can_twoweapon's artifact arm becomes C's `Yobjnam2(uswapwep,
"resist")`. Its empty-hands arm gets `body_part(HAND)` and its Glib arm
gets live `Glib()` + `set_bknown`. Promise = diff.

## Inventory

- Deleted clones: `Tobjnam` (wield.js:~403), `Blind_w` (~415), `Yobjnam2`
  (~1208). `grep -n "function \(Tobjnam\|Yobjnam2\|Blind_w\)" js/wield.js`
  finds none. The `objnam_*` import aliases are renamed to the plain names.
- `can_twoweapon` — wield.js:1126–1170; C wield.c:760–804.
- `weldmsg` — C :1060–1074 (`Yobjnam2(obj, "are")`; now the live export).
- `setuwep` :379, `uwepgone` :418, `ready_weapon` :637 — the shine messages
  via live `Tobjnam` + `Blind`.
- `drop_uswapwep` :1106–1110 — live `Yobjnam2` (C :819–825).

## C ↔ JS fidelity

can_twoweapon, arm by arm against C :766–803: could_twoweap → Upolyd
You_cant / role-plural; `!uwep || !uswapwep` → `body_part(HAND)`,
pluralized when both are missing, «Your [left |right ]%s %s empty.» with
`vtense(hand_s,"are")` (previously the literal 'hand', so a poly'd
Barbarian «right foreclaw» was wrong); TWOWEAPOK → Yname2 + is_plural +
primary/secondary + plur; bimanual → Yname2; uarms; `oartifact` →
`Yobjnam2(uswapwep,"resist")` (was `xname … resists`, no "Your" and no
count); CORPSE `cant_wield_corpse`; `Glib || cursed` → `if (!Glib)
set_bknown(uswapwep, 1)` (was a direct `bknown = 1` write that skipped
set_bknown's update_inventory) → drop_uswapwep; else TRUE. The order and
predicates are C's.

The deleted `Blind_w` read `u.Blind || u.ublind` before the macro, which
is the stale-mirror family (D-4119). Its three shine sites now use the
live `Blind()`. No RNG on these paths.

## Hallucinations / overclaim

None. The old header's named omissions (xname artifact arm, 'hand'
literal, Glib) are all removed because they are all fixed.

## Density

One C file, three clones replaced with live callees, two rows healed. Net −30 lines.

## Verification

```text
verify weldmsg (--base fad74b236~1): 1 blocked
  scen-sweep-Ranger-51450091: PASS → PROGRESS
verify can_twoweapon: 1 blocked
  scen-sweep-Barbarian-50362004: PASS → PROGRESS
```

Exact match with the D-log. D-4129's log credits this commit's
`body_part(HAND)` fix for a third session (scen-sweep-Barbarian-49956047).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
