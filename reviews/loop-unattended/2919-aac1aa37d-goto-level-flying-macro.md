# Review 2919 — aac1aa37d — goto_level descent reads the Flying macro

- SHA: `aac1aa37d` (cliff, writer behind `down_gate`)
- D-entry: D-4078; Ledger: do.c (`goto_level`, D-4078)
- `js/` diff: `js/do.js` +4 −1

## Intent vs deliverable

Promise: goto_level's descent arm read the phantom `u.Flying` flat, so a
hero flying by worn extrinsic got «You descend the stairs.» instead of
«You fly down the stairs.» (3 sweep sessions). Diff: `else if (Flying())`
with the mhitu.js reader already imported at do.js:168. Promise = diff.

## Inventory

- `goto_level` descent transit arm — do.js:2219–2245; C do.c:1774–1790.

## C ↔ JS fidelity

```c
if (!u.dz) { ; }
else if (Flying) { if (flags.verbose) You("fly down %s.", ga.at_ladder ? "along the ladder" : "the stairs"); }
else if (near_capacity() > UNENCUMBERED || Punished || Fumbling) { You("fall down the %s.", …); … }
```

C youprop.h:253-255: `Flying ((HFlying || EFlying || (u.usteed &&
is_flyer(u.usteed->data))) && !BFlying)`.

```text
Flying  js/mhitu.js:708  sync
  !! 7 local clones: dig.js:1640 eat.js:1162 engrave.js:535 music.js:133 polyself.js:2520 sit.js:547 …
```

mhitu.js `Flying()` ORs the H/E flats with `uprops[FLYING]`
intrinsic/extrinsic and the steed flyer, then gates on BFlying (flat or
`uprops.blocked`). That is the macro. The arm order (dz → Flying →
encumbrance/Punished/Fumbling) and both strings match C, and the
verbose gate is the same. The ladder variant reads `atLadder`, the same
local the ascent arm uses.

Reader caveat (pre-existing, mhitu.js:710): `if (u.Flying) return true;`
runs **before** the BFlying gate. A stale phantom flat with BFlying set
would read true where C reads false. That is debt on the reader, not on
this diff.

## Hallucinations / overclaim

None. The Named line lists the other bare `u.Flying` reads (dig, apply,
do_wear, eat, music, polyself, sit, mon, display) and says most of them
already OR the slot readers.

## Density

One condition in one C function. One Ledger bullet.

## Verification

```text
verify goto_level: 0 blocked (vacuous — rows owned by down_gate)
verify down_gate (--base aac1aa37d~1): 3 PASS, 0 moved past, 0 unchanged, 0 worse
  scen-sweep-Ranger-50255200, scen-sweep-Ranger-610049, scen-sweep-Rogue-50456012: PASS
```

This is an exact match with the D-log's direct `score --ids` claim. No
FORCE/DIAG/seed strings.

## Actionable C-wrongs

None queued. Debt: drop the leading `u.Flying` short-circuit in
mhitu.js `Flying()` once a session shows BFlying while the flat is set.

Verdict: **ACCEPT**
