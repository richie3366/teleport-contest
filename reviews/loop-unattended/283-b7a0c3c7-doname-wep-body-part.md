# Review 283 — b7a0c3c7 — objnam.c doname W_WEP body_part(HAND) (D-1321)

## Metadata
- Full / short hash: `b7a0c3c7246ddb5dba234518d4c80eec668d53cf` / `b7a0c3c7`
- Parent: `cf309315` (D-1320). This file audits **this SHA only**. Archive **Addressed:** D-1321 lacked the short hash; this review commit fills `b7a0c3c7`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 00:18:16 +0200
- D-id: **D-1321**
- Stats: 10 files, +130 / −54 — `js/objnam.js` +48 / −~20; `js/polyself.js` +3 / −1 (late-bind).
- Claims to close: Open `objnam.c` doname W_WEP `body_part(HAND)` poly (named from D-1295). Not MEAT_RING. `reviews/loop-2026-08-15/` has no unpaid W_WEP-hand Must-fix.
- JS / map: `objnam.js` `doname` / `doname_hand`; `polyself.js` `set_body_part`; `c-js-map/turns.md`. `mrg_to_wielded` / AKLYS `"tethered to"` / warn_obj named **and** (below) Keep’d as C-wrongs on the rewritten if.
- Prior reviews this SHA claims to close: **257** named full `mbodypart` / `body_part(HAND)` after MEAT_RING; **282** follow-up.

## Intent vs deliverable

Git subject promises: “Match C objnam.c doname so a polymorphed hero's wielded weapon uses body_part(HAND), instead of a hardcoded hand.”

C `doname_base` after the class switch (`objnam.c:1561–1616`):

```
    if ((obj->owornmask & W_WEP) && !gm.mrg_to_wielded) {
        boolean twoweap_primary = (obj == uwep && u.twoweap),
                tethered = (obj->otyp == AKLYS);
        if ((quan != 1 || (WEAPON ? ammo||missile : !is_weptool)) && !twoweap_primary)
            Concat " (wielded)";
        else {
            hand_s = body_part(HAND);
            if (bimanual) hand_s = makeplural(hand_s);
            else Sprintf("%s %s", URIGHTY ? "right" : "left", hand_s);
            ConcatF2 " (%s %s)",
                tethered ? "tethered to"
                : twoweap_primary ? "wielded in" : "weapon in",
                hand_s;
            /* warn_obj / artifact_light overwrite closing paren */
        }
    }
    if (W_SWAPWEP) twoweap → opposite URIGHTY + body_part(HAND);
    RING (and MEAT_RING goto) ConcatF1 "%s)" body_part(HAND);
```

`body_part` is `mbodypart(&youmonst, HAND)` (`polyself.c:2143–2146`). `HAND==6` (`hack.h:129–136`). `URIGHTY` is `u.uhandedness == RIGHT_HANDED` (`you.h:441,564`; `RIGHT_HANDED==0`). Callers: invent `prinv` / `xprname` → `doname`. `pickup.c:1881–1886` sets `gm.mrg_to_wielded` around `pickup_prinv` when `uwep==obj` after merge.

Old JS: hardcoded `"hand"` / `"hands"`; `uhandedness !== 1` for right/left; no `body_part`. `mbodypart` already live in `polyself.js`. `game.mrg_to_wielded` already set/cleared in `pickup.js:616–618` (review **11**).

The diff **does** late-bind `set_body_part`, `doname_hand()`, bimanual `makeplural`, URIGHTY `=== RIGHT_HANDED`, SWAPWEP opposite, RING/MEAT_RING close. It **rewrites** the W_WEP `if` and the ConcatF2 how-string and **drops** C’s `!gm.mrg_to_wielded` conjunct and the `tethered ? "tethered to"` arm. D-log names those. Naming a miss on the **same if / same ternary this SHA rewrote** does not make a diverging clone a map omit.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `body_part(HAND)` | C `polyself.c:2143`, **imported live** | late-bind; `allmain` → `polyself` at load |
| `mbodypart` HAND tables | C `:1972+`, **pre-existing live** | wolf `paw`, humanoid `hand`, claw specials |
| `doname_hand` | wrapper, not a clone | unset → `"hand"` (humanoid default) |
| `makeplural` | C `objnam.c`, **pre-existing live** | `hand`→`hands`, `paw`→`paws` |
| `URIGHTY` | C `you.h:564`, **wired** | `uhandedness === RIGHT_HANDED` (0) |
| `bimanual` | C `obj.h:257`, **pre-existing local** | WEAPON/TOOL `oc_big` |
| W_WEP `if` guard | C `:1561` `!mrg_to_wielded`, **clone that diverges** | JS `owornmask & W_WEP` only |
| ConcatF2 how | C `:1591–1595` 3-arm, **clone that diverges** | JS drops `"tethered to"` |
| `game.mrg_to_wielded` | C `pickup.c:1881`, **live in JS** | `pickup_prinv` → `xprname` → `doname` |
| warn_obj / `artifact_light` | C `:1599–1609`, **named omit** | sibling after Concat; not rewritten as a fake glow |
| `xname` | C, **unchanged** | still no hand phrasing |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.**

## C ↔ JS fidelity

`body_part` / RING / SWAPWEP nouns **match** C. `HAND==6`. `mbodypart({}, HAND)` without `data` returns HUMANOID `"hand"` (`polyself.js:282`). Wolf `S_DOG` HAND is `"paw"`. Bimanual uses live `makeplural`. URIGHTY matches `you.h` (old `!== 1` was an accident that agreed for 0/1 only; `=== RIGHT_HANDED` is C). SWAPWEP twoweap uses the opposite side + `doname_hand()`. RING `" (on right "` + `hand)` now interpolates `doname_hand()`. **Callee is not a stub.** Hallucination check for “Match C `body_part(HAND)`” on the **noun** is clean.

The **rewritten W_WEP envelope** does not match C `:1561–1595`.

C guard is `(owornmask & W_WEP) && !gm.mrg_to_wielded`. JS is `owornmask & W_WEP`. `pickup.js` still does:

```
    if (game.u?.uwep && game.u.uwep === obj) game.mrg_to_wielded = true;
    await pickup_prinv(obj, count, 'lifting');
    game.mrg_to_wielded = false;
```

`pickup_prinv` → `prinv` → `xprname` → `doname` **while the flag is true**. C then omits `(wielded)` / `(weapon in …)`. JS still appends it (ammo stack → `(wielded)`; non-ammo → `(weapon in right hand)`). That is JS contradicting C on a **live** flag this SHA’s `if` should have kept. Not an unimplemented sibling function.

C how-string is a 3-arm ternary. JS:

```
            const how = twoweap_primary ? 'wielded in' : 'weapon in';
            bp += ` (${how} ${hand_s})`;
```

A wielded aklys (`otyp==AKLYS`, quan 1, not ammo) takes the else arm. C: `(tethered to right hand)` (or `paws` if polyd). JS: `(weapon in right hand)`. Same ConcatF2 they rewrote. Named omit of warn_obj **after** that Concat is a real sibling; dropping the first arm of the ternary they shipped is a clone that diverges.

## Hallucinations / overclaim

Subject + D-1321 say a polymorphed hero’s wielded weapon uses `body_part(HAND)` instead of hardcoded `hand`. **The noun swap on W_WEP / SWAPWEP / RING is the hunk and is live.** Stamping **Addressed:** D-1321 is fair for that noun. Do **not** stamp “Match C W_WEP `doname`.” Do **not** stamp “Match C `!mrg_to_wielded`.” Do **not** stamp “Match C AKLYS `tethered to`.” Do **not** stamp “Match C warn_obj glow.” Do **not** treat fortress PASS as a poly `weapon in right paw` line. Do **not** treat “named in the D-log” as a substitute for keeping the conjunct on the if you rewrote.

## Density

One C W_WEP / SWAPWEP / RING envelope sharing `body_part(HAND)`. ~45 executable JS lines. Did not glue warn_obj. Right size (§2b). The miss is fidelity of the rewritten `if`, not an oversized batch.

## Branch-by-branch confirm

1. Humanoid uwep, not twoweap, not bimanual: `(weapon in right|left <hand>)`. Noun match `:1578–1595`. Guard miss on merge-to-uwep.
2. Bimanual: `makeplural(body_part(HAND))` → `hands` / `paws`. Match `:1581–1583`.
3. Twoweap primary: `wielded in` + URIGHTY side. Match how-arm 2 of 3.
4. Wielded AKLYS: C `tethered to`; JS `weapon in`. **C-wrong** `:1563` + `:1592`.
5. Pickup merge into uwep (`mrg_to_wielded`): C no W_WEP suffix; JS still suffixes. **C-wrong** `:1561` + `pickup.c:1881–1883`.
6. SWAPWEP twoweap: opposite URIGHTY + `body_part`. Match `:1613–1616`.
7. RING / MEAT_RING worn: `on right|left` + `body_part` + `)`. Match `:1492–1499`.
8. Stack/ammo/missile ` (wielded)` unchanged when not twoweap. Match `:1571–1576`.
9. Wolf poly HAND `paw` / `paws` via live `mbodypart`. Match `polyself.c` S_DOG.
10. **Public-unhit** unless a session `doname`s a wielded weapon while Upolyd, merges into uwep, or wields an aklys.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not special-case a recorded `paw` for one seed. Plain ESM. Late-bind, not a Node builtin.

## Verification

Journal: private canary **28**/28; green+strict seed8000/0900; cohort **8**/8 + strict 1500/1800/0012/0004/0007/2200/0383/0361. **Public-unhit** on poly hands / merge-prinv / aklys phrasing. Cadence this audit: full `sessions` at HEAD `b7a0c3c7` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS does not exercise the dropped guard.

## Actionable C-wrongs

1. Restore C `objnam.c:1561` `!gm.mrg_to_wielded` on the W_WEP `if` (JS `game.mrg_to_wielded`, already set in `pickup.js` around `pickup_prinv`). Restore C `:1591–1595` `tethered ? "tethered to"` (`otyp==AKLYS`) in the ConcatF2 how-string this SHA rewrote. One port iter; same envelope. Not warn_obj. Not zap `bhit` tether.

Named omits (map, not Must-fix):

1. warn_obj / `artifact_light` closing-paren rewrite (`:1599–1609`)
2. `zap.c` bhit `THROWN_TETHERED_WEAPON` / `isqrt` (fly still stands in)
3. wet-towel xname / full `mbodypart` debt beyond HAND

Do not Must-fix “export `doname_hand`.” Do not Must-fix the `'hand'` unset fallback (`polyself` loads via `allmain`). Do not Must-fix RING using the same helper (that part matches).

## Callers / RNG ledger

C: every `doname` of a wielded / swap / ring object; pickup merge `prinv`. JS: same. No RNG. Public fortress is not evidence `paw` or a merge without `(wielded)`.

## Verdict

- Verdict: **QUALITY-RISK**
- One sentence: `body_part(HAND)` is live, but the rewritten W_WEP `if` dropped a live `!mrg_to_wielded` guard and the AKLYS `"tethered to"` how-arm.
- Must-fix prepended this review commit; archive **Addressed:** D-1321 filled `b7a0c3c7`.
