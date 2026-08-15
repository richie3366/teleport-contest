# Review 06 — e8884a53 — whip yname / Amonnam / mbodypart (D-1045)

## Metadata
- Full / short hash: `e8884a532839002f998f3b54f1cf2acaa11bbac1` / `e8884a53`
- Parent: `d9febc3c` (D-1044)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 22:19:38 +0200
- D-id: **D-1045**
- Stats: 16 files, +388 / −112 — `js/objnam.js` +82, `js/polyself.js` +173, `js/do_name.js` +24, `js/apply.js` −77 net (clones deleted)
- Claims to close: D-1022 **risk 5** (`yname` / `Amonnam` / `mbodypart` apply clones). Stamped **Addressed:** D-1045 on that review (hash filled in this review commit).
- JS / map: `objnam.js` `yname`/`shk_your`; `do_name.js` `a_monnam`/`Amonnam`; `polyself.js` `mbodypart`/`body_part`; apply whip/steth/bell/fig call sites; debt/absent/turns; cadence still **#1310**

## Intent vs deliverable

Git subject promises: “Match C yname/Amonnam/mbodypart so whip wrap/snatch/reveal names are not apply clones.” Body: D-1022 used `the(xname)`, `highc(mon_nam)`, and hero `body_part`.

C `apply.c` whipattack (`:3139–3209`):

- reveal: `Amonnam(mtmp)` = `highc(a_monnam)` (indefinite)
- wrap / yank-to-floor / snatch: `yname(otmp)` (minvent possessive via `shk_your`/`mon_owns`)
- welded HAND: `mbodypart(mtmp, HAND)` (paw / tentacle / …)

The diff **does** add those three C functions (plus `shk_your` / `s_suffix` / `body_part`) and delete `yname` / `Amonnam_apply` / `mbodypart_apply` / `a_monnam_steth` / `a_monnam_bell` / `a_monnam_fig` / the FACE-only `body_part` from `apply.js`. Whip wrap/yank/snatch/reveal/HAND now call the real helpers.

It does **not** port `shk_owns` (unpaid shop prefix), `dungeon.c` `surface`/`ceiling`, or `steed.c` `kick_steed` `mhe`/`monverbself`. D-log lists those. The subject does not claim them.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `yname` | C function, new in `objnam.js` | `objnam.c:2358–2374` |
| `shk_your` | C function, new in `objnam.js` | `shk.c:5862–5874`; **`shk_owns` named omit** |
| `s_suffix_objnam` | clone of `hacklib.c:345–358` | local; `it`/`you`/`*s` |
| `carried_objnam` | clone of `obj.h` `carried` | `where === OBJ_INVENT` |
| `obj_is_pname` | C function, pre-existing retouch | `not_fully_identified` still a subset |
| `type_is_pname_objnam` / `the_unique_pm` | clones | corpse article gates in `shk_your` |
| `_y_monnam` / `set_y_monnam` | late-bind | C `mon_owns` → `y_monnam`; avoids objnam↔do_name cycle |
| `a_monnam` / `Amonnam` | C functions, new exports | `do_name.c:1152–1164` via existing `x_monnam` |
| `highc_name` | clone of first-char `highc` | pre-existing; `Monnam` already used it |
| `mbodypart` / `body_part` | C functions, new in `polyself.js` | `polyself.c:1972–2146`; tables + specials |
| `humanoid` | imported C callee | `monsters.js` `M1_HUMANOID` |
| `attacktype` | clone of `mondata.c` | local in `polyself.js` (mattk `aatyp`) |
| `slithy` | clone of `mondata.h` | pre-existing `M1_SLITHY` |
| apply clones deleted | gone | `Amonnam_apply`, `mbodypart_apply`, local `yname` |
| `surface_apply` / `ceiling_apply` / `kick_steed_apply` | **still clones** | not this Must-fix |
| `shk_your_apply` | leftover oil clone | apply still has a 2-way your/the |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `FORCEBUNGLE` / `J_DIAG` in apply are pre-existing trap/trajectory flags, not this hunk. Rule #2 clean.

## C ↔ JS fidelity

### `Amonnam` / `a_monnam` — C callees, not highc(mon_nam)

C `do_name.c:1152–1164`: `a_monnam` = `x_monnam(..., ARTICLE_A, ..., SUPPRESS_SADDLE if named)`; `Amonnam` capitalizes **first** character of that buffer.

JS `do_name.js:528–543`: same `x_monnam` arguments; `Amonnam` = `highc_name(a_monnam(mtmp))` (`charAt(0).toUpperCase()`). That is C `*bp = highc(*bp)`, not `highc(mon_nam)` (ARTICLE_THE).

C `x_monnam` promotes `G_UNIQ` + `ARTICLE_A` to `ARTICLE_THE` (`do_name.c` unique gate). JS `do_name.js:493–494` does the same. Ordinary orc: `"an orc"` → `"An orc"`. Old `Amonnam_apply` was `"The orc"`. Private tests named that split.

Whip reveal `apply.c:3139–3140` / JS `apply.js:3759–3762`: `!spotitnow ? "A monster" : Amonnam(mtmp)` plus couldn’t-see / hadn’t-noticed. Same ternary. `a_monnam` hallu/`isshk`/named go through `x_monnam` (C). Stethoscope / bell / figurine now share that callee instead of per-site clones. Related envelope, not a second subsystem.

### `yname` / `shk_your` — C function + named `shk_owns` hole

C `objnam.c:2358–2374`: `s = cxname(obj)`; if `!carried || !obj_is_pname || oartifact >= ART_ORB_OF_DETECTION`, prepend `shk_your`. Else return bare `cxname` (carried named artifact before the first quest artifact).

JS `objnam.js:1262–1268`: same three-part `if`, then `` `${shk_your(obj)}${s}` ``. `ART_ORB_OF_DETECTION` is the generated enum (21). `cxname` is the existing C callee.

C `shk.c:5862–5874`:

```
chk_pm = otyp==CORPSE && ismnum(corpsenm)
pname corpse → return buf  // empty, no trailing space
unique pm   → "the" then strcat " "
else if !shk_owns && !mon_owns → the_your[carried ? 1 : 0]
strcat " "
```

JS: pname corpse `''`; unique `'the '`; `where===OBJ_MINVENT && ocarry` → `s_suffix(y_monnam(ocarry)) + ' '`; else carried `'your '` else `'the '`. **`shk_owns` (unpaid / floor costly shopkeeper) is omitted** — named in the function comment and D-log. Whip wrap is minvent weapon, so `mon_owns` is the C path that matters.

C `mon_owns`: `where==OBJ_MINVENT` → `s_suffix(y_monnam(ocarry))`. JS requires `ocarry` too (avoids calling `y_monnam(null)`). `makemon.js:1037–1038` sets `OBJ_MINVENT` + `ocarry` on `add_to_minv`. `obj_extract_self` clears `ocarry` and sets `OBJ_FREE` **before** yank/snatch `yname`. C wrap uses yname while still minvent (`"the orc's scimitar"`); after extract, yname is `"the scimitar"`. JS order matches (`apply.js:3779` wrap, then `3790` extract, then `3796`/`3802` yank/snatch).

C default yank (`apply.c` default `rn2` arm) uses `the(onambuf)` with `onambuf=cxname`, **not** yname. JS `3822` still `the(onambuf)`. Not a miss.

`s_suffix`: C `strcmpi` it→its, you→your, last char `'s'` → `'`, else `'s`. JS `toLowerCase` + `endsWith('s'|'S')`. `y_monnam` yields lowercase `"the orc"` / `"your little dog"`. Possessive `"the orc's "` / `"your little dog's "` — private tests named both.

`obj_is_pname`: C `oartifact && has_oname && (gameover||override_ID || !not_fully_identified)`. JS `oextra.oname` + known/dknown/bknown subset. Named. Ordinary whip weapons have `oartifact==0` → always prefix `shk_your`.

Late-bind: `do_name.js` imports `set_y_monnam` and calls it at load. `objnam.js` does not import `do_name`. Cycle is real C (`shk.c` → `y_monnam`); the setter is wiring, not a fake callee. Fallback `'it'` only if someone called `yname` before `do_name` evaluated — production `doapply` is after module init.

Apply `inaccessible_equipment` now uses this `yname`/`shk_your` (C `do_wear.c` does). Same `shk_owns` omit. Oil still uses local `shk_your_apply` (your/the only) — leftover clone in the oil envelope, not whip.

### `mbodypart` — tables and specials, call-for-call

C `hack.h:129–149` `NO_PART=-1` … `STOMACH=18`. JS `const.js:393–411` same integers. Tables in JS match C `humanoid_parts` … `fish_parts` strings and order (spot-checked jelly “pseudopod extremity” twice, horse “backbone”, fish “premaxillary”, worm “prostomium”).

C compares `mptr == &mons[PM_*]`. JS `mons()` allocates, so this SHA uses `mptr.mndx` — the correct JS equivalent, not a pointer hallucination.

Specials in C order (`polyself.c:2063–2139`) vs JS `278–348`:

| Gate | C | JS | Match |
|------|---|----|-------|
| dog/feline/rodent/owlbear | HAND paw, HANDED pawed, FOOT rear paw, ARM/LEG horse_parts, else fall through | same | yes |
| S_YETI else | return humanoid_parts (owlbear already taken) | same | yes |
| HAND/HANDED + humanoid + AT_CLAW + !not_claws + not stone golem/amorous | claw/clawed | `NOT_CLAWS` Set of `'S_HUMAN'`…`'S_GIANT'` (JS mlet strings, same convention as the rest of `js/`) | yes |
| mumak/mastodon NOSE | trunk | mndx | yes |
| shark HAIR | skin | mndx | yes |
| jellyfish/kraken ARM/FINGER/HAND/FOOT/TOE | tentacle | mndx | yes |
| floating eye EYE | cornea | mndx | yes |
| humanoid ARM/FINGER/FINGERTIP/HAND/HANDED | humanoid_parts | imported `humanoid()` | yes |
| S_COCKATRICE | HAIR snake else bird | mlet `'S_COCKATRICE'` | yes |
| raven | bird | mndx | yes |
| centaur/unicorn/ki-rin/rothe(!HAIR) | horse | mlet/mndx | yes |
| S_LIGHT | HANDED rayed; ARM/FINGER/FINGERTIP/HAND ray; else beam | same | yes |
| stalker HEAD | head | mndx | yes |
| S_EEL && !jellyfish | fish | same | yes |
| S_WORM / S_SPIDER | worm / spider | mlet | yes |
| slithy \|\| (dragon && HAIR) | snake | `slithy` + mlet | yes |
| S_EYE | sphere | mlet | yes |
| jelly/pudding/blob/jellyfish | jelly | mlet/mndx | yes |
| vortex/elemental | vortex | mlet | yes |
| S_FUNGUS | fungus | mlet | yes |
| humanoid | humanoid_parts | `humanoid()` | yes |
| else | animal_parts | same (+ `'body part'` if index hole) | yes |

`AT_CLAW` is 1 (`monattk.h:13`). `attacktype` walks `mattk[].aatyp`. **No RNG** in `mbodypart` / `body_part`.

C `body_part(part)` = `mbodypart(&gy.youmonst, part)`. JS `mbodypart(game.youmonst || {}, part)`. Missing `data` falls back to humanoid table (cream-pie FACE still `"face"`). Poly’d hero now follows C form, unlike the old apply clone that always returned `"face"`/`"hand"`.

Whip `apply.c:3160` / JS `3776`: `mbodypart(mtmp, HAND)` then `makeplural` if bimanual. A dog is `"paw"` / `"paws"`, not hero `"hand"`. That is the D-1022 C-wrong.

C `part <= NO_PART` → `impossible` then `"mystery part"`. JS silent `"mystery part"`. No RNG. Not a production peel.

### Call sites — clones gone where claimed

`whip_attack`: `Amonnam(mtmp)`, `mbodypart(mtmp, HAND)`, `yname(otmp)` on wrap/yank/snatch. Grep finds no `Amonnam_apply` / `mbodypart_apply`. Self-hit foot / slip still `body_part(FOOT|HAND)` of the **hero** — C `use_whip` uses `body_part` there, not `mbodypart(mtmp)`.

## Hallucinations / overclaim

“Match C yname/Amonnam/mbodypart so whip wrap/snatch/reveal names are not apply clones” is **true for those three callees and the whipattack strings.** This is **not** “Match C dispatch, callee is a stub.” `Amonnam` is `highc(a_monnam)`, not a rename of `mon_nam`. `yname` is `cxname`+`shk_your`, not `the(xname)` and not the old `"your "+xname`. `mbodypart` is the C table walk.

It is **not** a claim that `surface`/`ceiling`/`kick_steed`/`shk_owns`/`u_wipe_engr` are C. D-log deferred them. Stamping D-1022 risk 5 **Addressed** is fair for the three named helpers; risks 6–7 stay Must-fix.

Cadence **#1310** 44/44 does not prove a whip disarm. Journal admits public **unhit**. Private 21/21 (`An orc` ≠ `The orc`; dog HAND `paw`; minvent / pet possessives) is the right falsifier.

## Density (§2b)

One naming family: `yname`+`shk_your`, `Amonnam`, `mbodypart`, and delete the apply clones that were lying about those names. ~250 lines of C-faithful JS (tables are the C arrays). Wiring steth/bell/fig `a_monnam` and cream-pie `body_part` is the same helper, not a second hypothesis. Not “finish apply.” Right size for the Must-fix. Oil `shk_your_apply` left behind on purpose (other envelope).

## Verification

Journal: green+strict PASS; apply/combat cohort **9**/9 (seed0361 Scr 366/366; seed0105/0009/0012/0060/0102/1500/1800/2200). Private node **21**/21. Path **unhit**. Shared `yname` now also formats break-wand / inaccessible-equipment / towel messages — green+cohort covers those public paths; whip itself remains unhit. Adequate: fortress plus private anatomy/possessive checks.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. D-1022 risk 5 (the three names) is actually closed.

Named omits (map, not queue): `shk_owns` shop prefix; `obj_is_pname` full `not_fully_identified`; `dungeon.c` `surface`/`ceiling` (`surface_apply` still maps air **or** pool → `"water"`, furniture lump, no ice/altar/stairs/swallow maw); `kick_steed` `He=mhe` / `monverbself` (`He = 'It'` always); apply oil `shk_your_apply`; `uhitm.js` cream-pie FACE still hardcoded (turns.md). Remaining Must-fix is still D-1023 `light_cocktail` `struct obj **`, then consume_obj_charge / Vlad HConfusion / `take_gold` / telekinesis / wipe_engr.

Do not restore apply `yname`/`Amonnam_apply`/`mbodypart_apply`. Do not pop tut-1 as a substitute while Must-fix is open.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: whip wrap/snatch/reveal/HAND now call real `yname` (minvent `shk_your`/`y_monnam`), `Amonnam` (`highc(a_monnam)`), and `mbodypart(mtmp)` tables; shop `shk_owns` and `surface`/`kick_steed` stay named omits.
