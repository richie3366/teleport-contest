# Review 2969 — 435d80512 — apply.js: dorub / catch_lit / whistle read live Blind

- SHA: `435d80512` (near-pass cliff; board owner `trapeffect_fire_trap`
  (same «You smell smoke.» literal), writer = apply.c dorub)
- D-entry: D-4129; Ledger: dorub, catch_lit, doapply ported
- `js/` diff: `js/apply.js` +8/−30

## Intent vs deliverable

Promise: dorub tests the youprop.h `Blind` macro when a rubbed magic lamp
only smokes (:1833). apply.js read the flat `u.Blind` mirror, which was
**false** for a hero who was blind. So C «You smell smoke.» came out as
JS «You see a puff of smoke.». Diff: apply.js's file-local `Blind` (which
already matched the macro) is deleted for the invent.js export. The three
inline Blind expressions are replaced: dorub's `u.Blind`, catch_lit's
`u.HBlind||u.EBlind||u.Blind||HBlinded&TIMEOUT||EBlinded`, and the
blessed magic whistle's `u.Blind||u.ublind||HBlinded&TIMEOUT`. The whistle
arm also gets C's `Yobjnam2(obj,"glow") hcolor("brown")` + `set_bknown`
in place of the `Yobjnam2_apply` clone, which is deleted. Promise = diff.

## Inventory

- `dorub` smoke arm — apply.js:5253; C apply.c:1832–1833.
- `catch_lit` message — apply.js:5827; C :1601–1604.
- `doapply` MAGIC_WHISTLE blessed arm — apply.js:2619–2622; C :4313–4321.
- Deleted: apply.js `Blind` (:1056) and `Yobjnam2_apply` (:1800). The
  live `Yobjnam2` and `set_bknown` are now imported.
- Remaining Blind-ish reads in apply.js: :2065 `!(HBlinded && !BBlinded)`
  (the `Blinded` macro, youprop.h:92, a different macro) and :4600
  `TimedTrouble(u.HBlinded)`. Neither is the `u.Blind` mirror.

## C ↔ JS fidelity

```c
} else if (rn2(2)) {
    You("%s smoke.", !Blind ? "see a puff of" : "smell");          /* :1833 */
...
if (!rn2(49)) {
    if (!Blind) {
        pline("%s %s.", Yobjnam2(obj, "glow"), hcolor("brown"));   /* :4318 */
        set_bknown(obj, 1);
    }
    unbless(obj);
}
```

All three sites now read C's macro. dorub keeps the `rn2(2)` draw ahead
of the test, as in C. The whistle arm's `hcolor("brown")` draws
`rn2_on_display_rng` when hallucinating (do_name.c:1460–1466). The old
literal "brown" skipped that draw, so a hallucinating hero's display RNG
now matches C. `set_bknown` replaces the bare `bknown = 1`, which restores
its update_inventory. catch_lit's otense feel/catch and warm./light!
pairs follow C :1601–1604.

## Hallucinations / overclaim

None. The D-log says why owner ≠ writer: the session had just wielded a
magic lamp through `wield_tool(obj,"rub")` → dorub, and the fire-trap
owner only shares the literal.

## Density

The mirror reads of one C file, cleaned in one commit, as the clone-drift
memory recommends.

## Verification

```text
verify trapeffect_fire_trap (--base 435d80512~1): 1 blocked
  scen-sweep-Monk-50456005: PASS → PROGRESS
verify dorub: 0 blocked (owner was trapeffect_fire_trap)
```

The board owner's row passes on HEAD, which matches the D-log's direct
score (1517/1517).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
