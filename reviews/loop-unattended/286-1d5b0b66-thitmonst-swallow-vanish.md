# Review 286 — 1d5b0b66 — dothrow.c thitmonst swallow vanish pline (D-1324)

## Metadata
- Full / short hash: `1d5b0b6630157f73916e66354cf0378368c73584` / `1d5b0b66`
- Parent: `b50daaea` (D-1323). This file audits **this SHA only**. Archive **Addressed:** D-1324 `1d5b0b66` already has the short hash (filled by D-1325).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 01:02:31 +0200
- D-id: **D-1324**
- Stats: 10 files, +223 / −152 — `js/dothrow.js` +31 / −~8; journal rotate.
- Claims to close: Open `dothrow.c` thitmonst vanish pline (named from D-1312 / review **274**). Not leader catch. `reviews/loop-2026-08-15/` has no unpaid vanish Must-fix.
- JS / map: `dothrow.js` `thitmonst`; `c-js-map/turns.md`. potionhit / iron ball / boulder / `gem_accept` / `cutworm` still named.
- Prior reviews this SHA claims to close: **274** named vanish after leader catch; **245** named swallowit vs vanish.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c thitmonst so a swallowed non-weapon vanishes into entrails or currents, instead of only waking the engulfer.”

C `thitmonst` (`dothrow.c:2276–2298`) **after** WEAPON/weptool/GEM `hmon`, HEAVY_IRON_BALL, BOULDER, pie/egg/venom, potionhit, and `tamedog`:

```
    } else if (guaranteed_hit) {
        char trail[BUFSZ];
        char *monname;
        struct permonst *md = u.ustuck->data;
        wakeup(mon, TRUE);
        if (obj->otyp == CORPSE && touch_petrifies(&mons[obj->corpsenm])) {
            if (is_animal(md)) {
                minstapetrify(u.ustuck, TRUE);
                if (!u.uswallow) {
                    delobj(obj);
                    return 1;
                }
            }
        }
        Strcpy(trail,
               digests(md) ? " entrails" : is_whirly(md) ? " currents" : "");
        monname = mon_nam(mon);
        if (*trail)
            monname = s_suffix(monname);
        pline("%s into %s%s.", Tobjnam(obj, "vanish"), monname, trail);
    }
    return 0;
```

`guaranteed_hit` is swallow (`engulfing_u`). `digests` is `dmgtype_fromattack(ptr, AD_DGST, AT_ENGL)` (`mondata.h:71–72`; walks all `mattk[]`, `mondata.c:700–708`). `is_whirly` is vortex letter or air elemental (`mondata.h:57–58`). Callers: `throwit_mon_hit` while swallowed. `swallowit` still ingests when `thitmonst` returns 0 (D-1283). Weapon swallow stays in the first arm (`tmp+=1000` → `hmon`).

Old JS: `if (guaranteed_hit) { wakeup; return false; }` with vanish named.

The diff **does** petrify/delobj, the trail ternary, `s_suffix` when trail nonempty, and the vanish `pline`. It does **not** port potionhit / ball / boulder (those C arms sit **above** vanish; JS still falls through to this `if`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| vanish arm | C `:2276–2298`, **wired** | after tamedog; `return 0` ≡ JS `return false` |
| `wakeup(mon, true)` | C `:2282`, **imported live** | already the stub body |
| `touch_petrifies` | C `mondata.h`, **imported live** | cockatrice / chickatrice `mndx` |
| `mons(corpsenm)` | C `&mons[obj->corpsenm]`, **imported live** | |
| `is_animal` | C `M1_ANIMAL`, **imported live** | |
| `minstapetrify` | C `trap.c`, **imported live** | not a stub |
| `delobj` | C, **imported live** | only if expelled |
| `digests` | C `mondata.h:71`, **imported live** | `mhitu.js` walks `mattk[]` like `dmgtype_fromattack` |
| `is_whirly` | C `mondata.h:57`, **imported live** | this SHA’s import |
| `s_suffix_throw_gold` | C `hacklib.c` `s_suffix`, **pre-existing clone** | it→its, you→your, *s→*', else *'s |
| `Tobjnam` / `mon_nam` / `pline` | C, **pre-existing live** | |
| WEAPON swallow `hmon` | C first arm, **unchanged** | `tmp+=1000`; vanish not reached |
| potionhit / ball / boulder | C `:2233–2265`, **named omit** | JS can reach vanish; C cannot |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new positional RNG** in this arm (`minstapetrify` may RNG on life-save; that callee was already live).

## C ↔ JS fidelity

JS placed the body on the existing `if (guaranteed_hit)` **after** tamedog, matching C’s `else if` order among the arms that exist. Weapon/weptool/GEM still return from the first arm — a swallowed dart does **not** vanish. `md = game.u?.ustuck?.data` is C `u.ustuck->data` (swallow implies ustuck). `digests(undefined)` is false (`mattk` missing). Trail strings include the leading space (`" entrails"` / `" currents"`). `s_suffix` only when trail nonempty — gel cube (engulf is not AD_DGST) stays `"the gelatinous cube"`; purple worm gets `"the purple worm's entrails"`; air elemental `"the air elemental's currents"`.

Petrify: `otyp===CORPSE && touch_petrifies(mons(corpsenm))` then `is_animal(md)` then `minstapetrify(ustuck, true)` then `delobj`+`return true` only if `!uswallow`. Whirly engulfer skips petrify (not `M1_ANIMAL`). `minstapetrify` is the real `trap.js` function (resists_ston / poly golem / vamp_stone / xkilled), not a glyph stand-in.

C does not `return 1` after a successful vanish pline; JS `return false` matches the fallthrough `return 0`. `throwit` then `swallowit` (D-1283).

Potion/ball/boulder still deferred **above** this if. Before this SHA those objects already skipped their C arms and woke. This SHA prints vanish for them — C would `potionhit` / `hmon`. That is the named preceding-arm omit, not a drop on the vanish ternary. Do not treat it as “Match C swallowed potion.”

## Hallucinations / overclaim

Subject + D-1324 say a swallowed non-weapon vanishes into entrails or currents instead of only waking. **Wakeup + petrify + trail + pline are the hunk.** Stamping **Addressed:** D-1324 is fair. Do **not** stamp “Match C potionhit while swallowed.” Do **not** stamp “Match C iron ball / boulder `hmon`.” Do **not** stamp “Match C `gem_accept`.” Do **not** treat fortress PASS as `The dart vanishes into the purple worm's entrails.`

## Density

One `thitmonst` arm plus live callees already in-tree. ~25 executable JS lines. Leader catch / bhit tether correctly not glued. Right size (§2b).

## Branch-by-branch confirm

1. Swallowed dart / weapon: first arm `hmon`, vanish not reached. Match `:2193–2231`.
2. Swallowed non-weapon, `digests(md)`: `" entrails"` + `s_suffix(mon_nam)`. Match `:2293–2298`.
3. Swallowed non-weapon, `is_whirly(md)`: `" currents"`. Match.
4. Gel cube / other: empty trail, bare `mon_nam`. Match.
5. Cockatrice corpse vs animal: `minstapetrify`; `delobj` if expelled. Match `:2283–2291`.
6. Cockatrice vs whirly: skip petrify, vanish into currents. Match `is_animal`.
7. Vanish returns false → `swallowit`. Match `return 0` + D-1283.
8. potionhit / ball / boulder: JS vanish. Named omit of `:2233–2265`.
9. Not swallowed: `tmiss`. Unchanged.
10. **Public-unhit** unless a session throws a non-weapon while swallowed.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not hardcode `"purple worm's entrails"`. Plain ESM.

## Verification

Journal: private canary **11**/11; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on swallow vanish. Cadence this audit: full `sessions` at HEAD `2cdf2b1f` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not evidence the trail pline fired.

## Actionable C-wrongs

None for Must-fix. Wakeup, petrify/delobj, trail ternary, `s_suffix`, and `Tobjnam` vanish match C `:2276–2298`. Callees are not stubs.

Named omits (map, not Must-fix):

1. potionhit DEX / swallow (`:2262–2265`) — JS can reach vanish
2. HEAVY_IRON_BALL / BOULDER hit-vs-miss (`:2233–2254`)
3. `gem_accept`; `cutworm`; mulch `check_shop_obj`

Do not Must-fix “rename `s_suffix_throw_gold`.” Do not Must-fix `You()` vs `pline`. Do not Must-fix dokick snuff (next SHA).

## Callers / RNG ledger

C: throw / kick → `thitmonst` while `u.uswallow`. JS: `throwit_mon_hit` → `thitmonst`. Public fortress is not evidence entrails / currents / cockatrice statue.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a swallowed non-weapon now vanishes into entrails or currents (and a cockatrice corpse can stone an animal engulfer); potion/ball/boulder still fall through.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1324 `1d5b0b66` already filled by the next port commit.
