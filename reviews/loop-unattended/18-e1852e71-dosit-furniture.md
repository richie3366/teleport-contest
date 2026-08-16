# Review 18 — e1852e71 — dosit furniture sit_message (D-1057)

## Metadata
- Full / short hash: `e1852e7107398199ff0ea2cc85e8824618a0feb0` / `e1852e71`
- Parent: `2e79451d` (D-1056 ACCEPT; Must-fix empty; popped Open furniture)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 02:59:50 +0200
- D-id: **D-1057**
- Stats: 10 files, +137 / −42 — `js/sit.js` +88 / −? (five furniture arms + `You_sit_message`)
- Claims to close: Open queue `sit.c` `dosit` sink / altar / grave / stairs / ladder sit messages only. Stamped **Addressed:** D-1057 on the archive row **without** the short hash (chicken-egg). This review commit fills `e1852e71`. Also filled D-1056 hash `2e79451d` on review 16 (already present from the fix SHA).
- JS / map: `sit.js` `dosit` furniture; `pray.js` `altar_wrath` (dynamic import); `c-js-map/data.md`. Cadence still **#1330** **44**/44 (this SHA is not a score refresh).

## Intent vs deliverable

Git subject promises: “Match C dosit furniture sit_message so sink/altar/grave/stairs/ladder sit before throne.”

C `sit.c:526–538` is five `else if` arms after water / before `is_lava` / `is_ice` / `DRAWBRIDGE_DOWN` / `IS_THRONE`. The queue line listed exactly those five. The diff ships **those five**, including sink rump/underside and altar `altar_wrath`. It does **not** port lava HP, ice Cold_resistance, or drawbridge sit_message. D-log and the live Open line name those. The subject does not claim them.

It does **not** port `lay_an_egg`, steed `mon_nam`, `can_reach_floor` / ustuck / hider, or rewrite the pre-existing throne pline.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `You_sit_message` | **clone** of `You(sit_message, …)` | `sit.c:402` `"sit on the %s."` → `"You sit on the %s."` |
| `dosit` `IS_SINK` | C function, new arm | `sit.c:526–529`; `humanoid` rump vs underside |
| `dosit` `IS_ALTAR` | C function, new arm | `sit.c:530–532`; then `altar_wrath` |
| `dosit` `IS_GRAVE` | C function, new arm | `sit.c:533–534` |
| `dosit` `typ == STAIRS` | C function, new arm | `sit.c:535–536` literal `"stairs"` |
| `dosit` `typ == LADDER` | C function, new arm | `sit.c:537–538` literal `"ladder"` |
| `humanoid` | imported C callee | `mondata.h:65` `M1_HUMANOID`; `monsters.js:323–325` |
| `IS_SINK` / `IS_ALTAR` / `IS_GRAVE` | imported C macros | `rm.h:133–135`; `const.js:2490–2492` |
| `STAIRS` / `LADDER` | imported C enum | `rm.h:82–83` = 26/27; `const.js:72–73` |
| `altar_wrath` | imported C callee (dynamic) | `pray.c:2652–2672`; cycle: `pray.js` already imports `sit.js` |
| `godvoice` | C callee inside pray, not this SHA | `pray.c:1415–1426` `ROLL_FROM(godvoices)` = `rn2(4)` |
| `adjattrib` | imported C callee, **subset** | `attrib.c:117–128`; Fixed_abil / Dunce named omit |
| `align_gname` | imported C callee, **subset** | `pray.c:2530–2554`; `A_NONE` → Moloch named omit |
| `verbalize` / `change_luck` | imported C callees | `pline.c` quotes; `attrib.c:411–418` clamp ±10 |
| `a_align` | C macro as function in pray | `pray.c:107` `Amask2align(altarmask & AM_MASK)` |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Dynamic `import('./pray.js')` is an ESM cycle break, not filesystem. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/sit.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Hardcoded `"sink"` / `"altar"` / `"grave"` are `defsyms[].explanation` strings, not seed furniture. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Order: after water, before lava, before throne

C `sit.c:526–557` (after `in_water`, before `lay_an_egg`):

```
} else if (IS_SINK(typ)) {
    You(sit_message, defsyms[S_sink].explanation);
    Your("%s gets wet.",
         humanoid(gy.youmonst.data) ? "rump" : "underside");
} else if (IS_ALTAR(typ)) {
    You(sit_message, defsyms[S_altar].explanation);
    altar_wrath(u.ux, u.uy);
} else if (IS_GRAVE(typ)) {
    You(sit_message, defsyms[S_grave].explanation);
} else if (typ == STAIRS) {
    You(sit_message, "stairs");
} else if (typ == LADDER) {
    You(sit_message, "ladder");
} else if (is_lava(u.ux, u.uy)) {
    …
} else if (is_ice(u.ux, u.uy)) {
    …
} else if (typ == DRAWBRIDGE_DOWN) {
    You(sit_message, "drawbridge");
} else if (IS_THRONE(typ)) {
    You(sit_message, defsyms[S_throne].explanation);
    throne_sit_effect();
```

JS `sit.js:1061–1096`: five `if` + `return ECMD_TIME` in that order, then a comment that lava/ice/`DRAWBRIDGE_DOWN` are deferred, then the pre-existing throne arm. C `else if` vs JS `if`+return is the same skip. Trap / OBJ_AT / water still sit **before** these arms (D-1039 / D-1055). A sink with a trap still takes the trap arm first. Match.

`typ` is `game.level.at(u.ux,u.uy).typ`, C `levl[u.ux][u.uy].typ`. `IS_SINK(typ)` is `typ === SINK` (30). `STAIRS=26`, `LADDER=27`, `SINK=30`, `GRAVE=31`, `ALTAR=32` match `rm.h`.

### `sit_message` clone vs defsyms

C `sit.c:402`: `static const char sit_message[] = "sit on the %s.";` `You()` prefixes `"You "`. JS `You_sit_message(what)` emits `You sit on the ${what}.` Same string for these arms.

C `defsym.h` `PCHAR_DRAWING` `{ ch, desc, clr }` so `.explanation` is the desc column:

| Symbol | desc | JS literal |
|--------|------|------------|
| `S_sink` | `"sink"` | `'sink'` |
| `S_altar` | `"altar"` | `'altar'` |
| `S_grave` | `"grave"` | `'grave'` |

Not a diverging clone. Stairs/ladder **must not** use `S_upstair`/`S_dnstair`/`S_upladder`/`S_dnladder` (`"staircase up"` / `"ladder down"`). C passes the literals `"stairs"` / `"ladder"`. JS does. Match.

Pre-existing throne `You sit on the opulent throne.` is C `defsyms[S_throne].explanation`: `PCHAR2` drawing maps the **desc** arg `"opulent throne"` into `.explanation` (`defsym.h:86–87` + `132`). This SHA does not touch throne. Do not “fix” it to `"throne"`.

### Sink rump / underside — `humanoid` is the C macro

C `sit.c:528–529` `Your("%s gets wet.", humanoid(gy.youmonst.data) ? "rump" : "underside")`.

C `mondata.h:65`: `#define humanoid(ptr) (((ptr)->mflags1 & M1_HUMANOID) != 0L)`. `M1_HUMANOID` is `0x00020000` (`monflag.h:102`). JS import is that bit test. Hero default form is humanoid → `"Your rump gets wet."` Non-humanoid poly → underside. JS `pline(\`Your ${…} gets wet.\`)` matches `Your()`. No RNG on this arm. Match.

Null `youmonst.data` would take underside (JS `?.`). C always has `youmonst.data` after init. Not a production sit bug.

### Altar — dispatch is real `altar_wrath`, not a stub

This is the hallucination check. The subject says Match C furniture sit, including altar. The callee is `pray.js` `altar_wrath`, already used by dig/engrave desecration. It is **not** a no-op.

C `pray.c:2652–2672`:

```
aligntyp altaralign = a_align(x, y);
if (u.ualign.type == altaralign && u.ualign.record > -rn2(4)) {
    godvoice(altaralign, "How darest thou desecrate my altar!");
    (void) adjattrib(A_WIS, -1, FALSE);
    u.ualign.record--;
} else {
    pline("%s %s%s:", !Deaf ? "A voice (could it be" : "Despite your deafness…",
          align_gname(altaralign), !Deaf ? "?) whispers" : " say");
    SetVoice(…); /* named omit */
    verbalize("Thou shalt pay, infidel!");
    if (Luck > -5 && rn2(Luck + 6))
        change_luck(rn2(20) ? -1 : -2);
}
```

JS `pray.js:891–913`: same short-circuit (`type === altaralign` then `record > -rn2(4)` — if types differ, **no** `rn2(4)`). Own-altar: `godvoice` then `adjattrib(A_WIS, -1, false)` then `record--`. Else: Deaf-aware pline, skip `SetVoice`, `verbalize`, `Luck() > -5 && rn2(Luck()+6)` then `change_luck(rn2(20) ? -1 : -2)`.

RNG call-for-call on the arms this SHA newly reaches from sit:

1. Own-align: `rn2(4)` then `godvoice` → `ROLL_FROM(godvoices)` = `rn2(4)` (`godvoices[]` is four strings: `"booms out"`, `"thunders"`, `"rings out"`, `"booms"` — JS `GODVOICES` is that table). `adjattrib` WIS−1: C `Fixed_abil` / Dunce-cap return FALSE with **no** further RNG; JS `adjattrib` still applies the −1 (named omit on `attrib.js`, pre-existing). Typical hero WIS does not hit the below-min `rn2` path.
2. Else: no `rn2(4)`; `Luck` is C `you.h:464` `u.uluck + u.moreluck` (pray’s local `Luck()` is that sum); `rn2(Luck+6)` then `rn2(20)` inside `change_luck`’s argument. C always evaluates `rn2(20)` when the `if` body runs. JS same.

`a_align`: C `Amask2align(levl[x][y].altarmask & AM_MASK)`. JS reads `loc.altarmask` (mkaltar writes that field) else `flags`. `Amask2align` in `const.js` matches `align.h:46–49` (`0 → A_NONE`, `AM_LAWFUL → A_LAWFUL`, else `masked-2`). Not a sit clone.

`godvoice` C `pline_The("voice of %s %s: %s%s%s", align_gname(g_align), ROLL_FROM(godvoices), quot, words, quot)` → `"The voice of Foo booms out: \"How darest thou desecrate my altar!\""`. JS that format. `align_gname` C takes one `aligntyp`; JS passes `game.urole` because there is no `gu.urole` global. Lawful/neutral/chaotic pantheon + strip leading `_` match. **`A_NONE` is Moloch in C** (`pray.c:2535–2536`); JS falls through to `ngod` / `'The Lady'`. That is a **pre-existing** `roles.js` gap, not a sit stub. Gehennom unaligned altar sit would name the wrong god. Map, not Must-fix for this furniture SHA (different C locus; not introduced here).

`change_luck`: C clamp `LUCKMIN`/`LUCKMAX` ±10 (`you.h:467–468`). JS the same. No RNG in the helper.

`verbalize`: C quotes the speech. JS `display.js` wraps `"…"`. Match for the infidel line.

Deaf: C `youprop.h:125` `HDeaf || EDeaf || u.uroleplay.deaf`. JS `u.Deaf || u.HDeaf || u.EDeaf || u.uroleplay?.deaf` — extra flat `u.Deaf` alias, pre-existing in pray. Not this SHA.

Dynamic import is required: `pray.js:50` `import { attrcurse, rndcurse } from './sit.js'`. A static sit→pray import would cycle. The function retrieved is the exported C callee, not a sit-local clone.

### What falling through lava/ice/drawbridge does

C `is_lava` (`dbridge.c:62–73`): `LAVAPOOL` / `LAVAWALL` / `DRAWBRIDGE_UP` with `DB_LAVA`. C `is_ice`: `ICE` or drawbridge-under ice. `DRAWBRIDGE_DOWN` is typ 34. JS skips those three and hits throne (false) then having-fun / deferred egg. That is the **named** next Open cluster, not a silent C-wrong in the five arms this SHA claimed. Sitting on lava currently having-fun instead of `hliquid("lava")` + `losehp`. Do not treat that as a furniture miss; do not pull ice/drawbridge into the lava HP peel (NOTES).

Fountain (`typ==28`) is **not** in this C chain (gremlin fountain already went to `in_water`). Non-gremlin fountain still having-fun / `surface()`. Pre-existing. Match.

## Hallucinations / overclaim

“Match C dosit furniture sit_message so sink/altar/grave/stairs/ladder sit before throne” is **true for the five arms, the defsyms/literal strings, sink `humanoid`, and the `altar_wrath` call.** It is **not** true that `align_gname(A_NONE)` is Moloch, that `adjattrib` honors Fixed_abil/Dunce, or that `SetVoice` runs. Those are named callees / pre-existing, not “Match C dispatch, callee is a stub.” `altar_wrath` has both C branches and the C RNG order.

Cadence still **#1330** 44/44 does not prove furniture sit. Journal admits public **unhit**. Private sink rump/underside, grave/stairs/ladder not having-fun, altar `rn2(4)` no throne `rnd(6)`, ROOM having-fun, throne still `rnd(6)` are the right checks for **these** arms. They do not falsify Moloch naming or lava HP.

Stamping the Open item **Addressed:** D-1057 is fair for the queue line. Fill hash `e1852e71` in this commit.

## Density (§2b)

One Open cluster: C’s furniture `sit_message` envelope through ladder. Sibling `switch` arms shipped together (not one-tile peels). Lava/ice/drawbridge left named because lava is HP/`likes_lava`, not another string. ~70 lines `sit.js` plus a four-line helper. Right size. Not “finish sit.c.” `altar_wrath` is a callee already in `pray.js`, not a second subsystem rewrite.

## Verification

Journal: private node sink rump/underside no throne `rnd(6)`; grave/stairs/ladder sit_message not having-fun; altar `rn2(4)` wrath no throne; ROOM having-fun; throne still `rnd(6)`. green+strict PASS; cohort **6**/6 (seed1500/1800/0060/0102/0360/2200). Path **public-unhit**. Green+cohort is regression cover, not proof of altar luck `rn2(20)`.

This review iter did not re-run sessions. C read of `sit.c:402` / `526–557`, `defsym.h:129–133`, `rm.h:82–88` / `133–135`, `mondata.h:65`, `pray.c:107` / `1415–1426` / `2530–2554` / `2652–2672`, `attrib.c:117–128` / `411–418`, `dbridge.c:62–96` is the audit.

## Actionable C-wrongs

None in the five furniture arms this SHA shipped.

Named omits (map, not queue): lava / ice / `DRAWBRIDGE_DOWN` sit (live Open line); `lay_an_egg`; steed `mon_nam`; `can_reach_floor` / ustuck / hider; `SetVoice`; `align_gname(A_NONE)` Moloch; `adjattrib` Fixed_abil / Dunce; `altar_wrath` Deaf extra `u.Deaf` alias; drown wade; other files’ `u.Underwater`.

Do not skip furniture sit_message / `altar_wrath` on `IS_ALTAR`. Do not use defsyms staircase/ladder up/down. Do not “fix” throne to `"throne"`. Do not pull lava HP into an ice/drawbridge peel. Do not rewrite the second `in_water` `water_damage` to `uarmf`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: sink/altar/grave/stairs/ladder sit_message and altar `altar_wrath` match C branch order and RNG, with lava/ice/drawbridge still the named next Open cluster.
