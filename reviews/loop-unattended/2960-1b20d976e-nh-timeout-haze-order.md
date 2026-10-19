# Review 2960 — 1b20d976e — nh_timeout spell-protection haze back at C's position

- SHA: `1b20d976e` (cliff, live-queue owner `hitmsg`, 1 row; writer = timeout.c nh_timeout)
- D-entry: D-4120; Ledger: nh_timeout ported
- `js/` diff: `js/timeout.js` +21/−22 (block moved)

## Intent vs deliverable

Promise: nh_timeout dissipates spell protection (:652–661) **before**
the uprops `--` loop that expires BLINDED. So on the turn blindness runs
out, `!Blind` still sees a blind hero and nothing prints. JS ran the
block after the loop and printed «The golden haze around you becomes
less dense.». Diff: the block moves, unchanged, to between the ucreamed
and ugallop ticks. Promise = diff. The D-log names that the haze test
"still uses timeout.js's file-local Blind() … a clone … that also reads
the stale `u.Blind` mirror (D-4119 class)" and leaves it in place.

## Inventory

- `nh_timeout` haze block — timeout.js:1061–1080; C timeout.c:652–661.
- File-local `Blind` — timeout.js:1728–1732, a **clone** of youprop.h:103.
  Its callers in timeout.js are :737 (slime green), :1071 (haze), :1347
  (INVIS expiry), :2100 (burn_object_light canseeit), :2309 (candle
  flames). Each one is a C `Blind` macro site.

## C ↔ JS fidelity

```c
if (u.ucreamed) u.ucreamed--;                       /* :649–650 */
if (u.usptime) {                                    /* :653 */
    if (--u.usptime == 0 && u.uspellprot) {
        u.usptime = u.uspmtime; u.uspellprot--; find_ac();
        if (!Blind)
            Norep("The %s haze around you %s.", hcolor(NH_GOLDEN), ...);
    }
}
if (u.ugallop) { ... }                              /* :662–665 */
```

The position is now C's. The body is the same: the pre-decrement test,
the reload from uspmtime, find_ac, the `!Blind` gate, `hcolor(NH_GOLDEN)`
inside the gate (its hallucination RNG draw happens only when C draws
it), and Norep. The 8-bit masks model C's `uchar` fields.

The gate's predicate is not C's:

```js
function Blind() {                       // timeout.js:1728
    return !!((u.HBlind | 0) || (u.EBlind | 0) || u.Blind
        || ((u.HBlinded | 0) & TIMEOUT) || (u.EBlinded | 0));
}
```

C is `(HBlinded || EBlinded) && !BBlinded`. The clone differs in four
ways. (a) It reads the `u.Blind` mirror, which D-4119, one commit
earlier, measured true for a seeing hero (do.js:3814 / do_wear.js:2184
write it and nothing clears it when blindness ends). (b) It reads
`u.HBlind` / `u.EBlind`, phantom fields (the clone-drift family). (c) It
masks HBlinded to TIMEOUT, so FROMOUTSIDE/intrinsic blindness counts only
through the stale mirror. (d) It has no `!BBlinded`, so a blindfolded
hero wearing the Eyes of the Overworld is "blind" in JS and sighted in
C. In every one of these states the haze message, the INVIS-expiry
message (:1347, C :759–767), the slime colour line, and the light-source
burn-out messages (:2100, :2309) are silenced or printed against C. The
live `Blind` export (invent.js:372) is C's macro and is already used
elsewhere for this exact fix (D-4119).

## Hallucinations / overclaim

The D-log says the clone "agrees with C here". That is true for the
probe session, but it is a named, known-divergent clone in the arm being
moved. The method treats a divergent clone as a C-wrong, not a named omit.

## Density

The move is right and exact. The clone is the one piece left that is not C.

## Verification

```text
verify hitmsg (--base 1b20d976e~1): 1 blocked
  scen-sweep-Monk-587105: PASS
verify hitmsg: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify nh_timeout: 2 blocked → 2 PASS (worldtour-Wizard-49955039,
  zapfest-Priest-50950004) → PROGRESS
```

The hitmsg row matches the D-log. The two nh_timeout rows were blocked
at the parent's board and pass on HEAD (later window SHAs included).

## Actionable C-wrongs

1. timeout.js:1728 file-local `Blind()` → import invent.js `Blind`
   (youprop.h:103 `(HBlinded || EBlinded) && !BBlinded`) and delete the
   clone. Its 5 callers (:737, :1071, :1347, :2100, :2309) are all C
   `Blind` macro sites (timeout.c slime, haze :658, INVIS :761, burn_object
   canseeit, candle flames). One file, one port iteration.
   `sweep nh_timeout` is the reach check.

Verdict: **QUALITY-RISK**
