# Review 2956 — afabc5140 — revive's twitch arm takes corpse_xname(CXN_PFX_THE)

- SHA: `afabc5140` (cliff, live-queue owner `revive`, 1 row)
- D-entry: D-4116; Ledger: revive ported
- `js/` diff: `js/zap.js` +9/−4

## Intent vs deliverable

Promise: revive's norevive / eel-out-of-water arm prints
`upstart(corpse_xname(corpse, NULL, CXN_PFX_THE))`. JS used
`xname(corpse)` plus a hand-made capital, which gave «Corpse twitches
feebly.». The non-CORPSE arm now awaits C's impossible(). The D-log adds:
"I re-read the rest of the body against C `:900–1140` (location,
container rules, **enexto**, …, **the disposal switch**) and found it
matches." Diff: the two arms named, as promised. The re-read claim is
false: see below.

## Inventory

- `revive` — zap.js:3315–3570; C zap.c:883–1140 (non-CORPSE :896–899,
  enexto :957–964, twitch :966–972, disposal :1105–1137).
- `useup_invent` — zap.js:1546, a **local clone** of invent.c useup; its
  callers are revive :3546 and destroy_items :1747.

## C ↔ JS fidelity

The two arms that changed are right: `upstart(corpse_xname(corpse, null,
CXN_PFX_THE))` and `impossible('Attempting to revive %s?', xname)`. The
body around them is not whole.

**(1) enexto runs after the norevive arm in JS. C runs it before.**

```c
mptr = &mons[montype];
if (MON_AT(x, y)) {                         /* :961 */
    if (enexto(&xy, x, y, mptr)) x = xy.x, y = xy.y;
}
if (corpse->norevive
    || (mons[montype].mlet == S_EEL && !IS_POOL(levl[x][y].typ))) {
    if (cansee(x, y)) pline("%s twitches feebly.", ...);   /* :966–972 */
```

JS zap.js:3398–3414 tests `norevive` / `IS_POOL(x,y)` / `cansee(x,y)` on
the corpse's own square and returns. Only after that does it run
`m_at && enexto`. If a monster stands on a norevive corpse, or on an eel
corpse off water, C draws enexto's RNG (teleport.c:371 `rn2`) and tests
pool and sight at the moved square. JS draws nothing and tests the
original square, so the core RNG drifts and the twitch can show or hide
differently.

**(2) The disposal switch's OBJ_INVENT arm calls a clone that diverges.**
C :1108 `useup(corpse)` → invent.c useup → useupall: `setnotworn`,
`freeinv` (relink, OBJ_FREE, freeinv_core, update_inventory), then
`obfree`. zap.js:1546 `useup_invent` only splices `game.invent`. It
skips setnotworn, so a wielded corpse revived by undead turning
(zap.c:1192 via unturn_dead) leaves `uwep` pointing at a freed object. It
also skips freeinv_core and update_inventory. `sym.mjs useup_invent`:

```text
useup_invent  NOT EXPORTED — but 2 LOCAL CLONE(S) in 2 file(s):
              js/lock.js:1818  js/zap.js:1546
useup         js/invent.js:5173   sync
```

The same clone serves destroy_items (zap.js:1747, C :5931 `useup(obj)`).

**(3) The OBJ_BURIED non-zombie and default arms panic in C**
(`panic("revive default case %d")`, :1131–1137). JS `break`s silently.
JS `panic` is sync and throws (end.js:1065), so a port is available.

The arms I confirmed: location and container rules (`rn2(40)` BoH)
:911–953; cgend mmflags :976–980; the cant_revive / montraits / makemon
arms :982–1009 (the zombie `mon_adjust_speed(2)` inline is a verified
clone: NO_MINVENT means no speed boots, so mspeed = permspeed = MFAST);
mundetected/seemimic; splitobj; the shop glow and charge :1022–1060; the
ghost arm :1063–1092; christen/oeaten/mrevived.

## Hallucinations / overclaim

The D-log says "enexto … the disposal switch … matches" for a body where
enexto is in the wrong order and the disposal goes through a divergent
clone. `revive ported` in the ledger is therefore wrong.

## Density

The shipped fix is one arm and is right. The whole-function claim is
where it fails (§10.18: a ported function is whole).

## Verification

```text
verify revive (--base afabc5140~1): 1 blocked
  scen-zapfest-Ranger-51450024: PASS
verify revive: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match with the D-log. The probe's troll corpse had no monster on
its square, so (1) was not exercised.

## Actionable C-wrongs

1. zap.c revive: move `MON_AT → enexto` (:961–964) ahead of the
   norevive / S_EEL twitch arm (:966–972). Replace the zap.js
   `useup_invent` clone with live invent.js `useup` at both C sites
   (revive :1108, destroy_items :5931), and delete the clone. Make the
   OBJ_BURIED non-zombie / default arms `panic("revive default case
   %d", where)` (:1131–1137). One function family in one C file, one port
   iteration.

Verdict: **QUALITY-RISK**

**Addressed:** D-4125
