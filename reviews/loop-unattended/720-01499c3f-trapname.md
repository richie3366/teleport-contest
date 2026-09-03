# Review 720 — 01499c3f — trap.c trapname Hallu / trap_to_glyph no Hallu (D-1759)

## Metadata
- Full / short hash: `01499c3fdfb89ad9ec2c38059fc7c7163e8a330a` / `01499c3f`
- Parent: `0b5f451a` (D-1758). This file audits **this SHA only** (second of nine `js/` commits since review **718**). Archive **Addressed:** D-1759 `01499c3f`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 04:36:05 +0200
- D-id: **D-1759**
- Stats: `js/trap.js` +88/−11; `js/display.js` +33/−; `js/detect.js` +1/−36. Total `js/` insertions **97** <250. Band **150–350**.
- Claims to close: Open `display.h` `random_trap_to_glyph` after D-1758 / review **699** (named hallu `random_trap_to_glyph`; trap/zap cmap LIVE). That macro is **not** in this C (`csym` NOT FOUND). Hallu trap *names* are `trapname`. `reviews/loop-2026-08-15/` has no unpaid trapname Must-fix.
- JS / map: `trap.js` `trapname`; `display.js` `trap_to_glyph`/`see_traps`; `detect.js` import. `c-js-map/data.md` + `turns.md`.
- Prior: **699** named 3.6 `random_trap_to_glyph` as omit; this SHA must not invent it.

## Intent vs deliverable

Git subject promises: `trap.c` `trapname` Hallu so display rng + 62 `halu_trapnames` + role/rank `" trap"` instead of inventing `random_trap_to_glyph` after D-1758.

`node scripts/csym.mjs trapname` → `trap.c:7098–7155`. `--callers trapname`: 46 refs including `detect.c:1956` FALSE; `pager.c:179` `trap_description`; `hack.c:2144`. `trap_to_glyph` `display.h:630–631`. `glyph_is_trap` `:972–974`. `see_traps` `display.c:1610–1621` (callers `potion.c:426` `make_hallucinated`; `allmain.c:459`). `rn2_on_display_rng` `rnd.c:67–73`. `Hallucination` `youprop.h:120`. `lcase` `hacklib.c:89–98`. `copynchars` `:286–297`. `rank_of` `botl.c:331–358`. `Role_switch` `you.h:248`. `TRAPNUM` `trap.h:93` = 26. `random_trap_to_glyph`: **NOT FOUND**.

```7133:7154:nethack-c/upstream/src/trap.c
    if (Hallucination && !override) {
        int total_names = TRAPNUM + SIZE(halu_trapnames),
            nameidx = rn2_on_display_rng(total_names + 1);
        if (nameidx == total_names) {
            boolean fem = Upolyd ? u.mfemale : flags.female;
            copynchars(roletrap,
                       rn2(3) ? ((fem && gu.urole.name.f) ? gu.urole.name.f
                                                          : gu.urole.name.m)
                              : rank_of(u.ulevel, Role_switch, fem),
                       (int) (sizeof roletrap - sizeof " trap"));
            Strcat(roletrap, " trap");
            return lcase(roletrap);
        } else if (nameidx >= TRAPNUM) {
            return halu_trapnames[nameidx - TRAPNUM];
        }
        if (nameidx != NO_TRAP)
            ttyp = nameidx;
    }
    return defsyms[trap_to_defsym(ttyp)].explanation;
```

Parent: `trapname` always defsym list (Hallu ignored); sticky `Hallucination` clone in trap.js; detect.js local clone; `trap_glyph` comment deferred hallu glyphs; `see_traps` required `tseen` + `disp_ch === trap_glyph.ch`. The diff **does** port the Hallu arm (display rng, 62 names, role/rank `copynchars` 27 + `lcase`), import `Hallucination()` youprop, export `trap_to_glyph` with **no** Hallu, drop detect clone, `see_traps` `disp_kind==='trap'` without `tseen`. It **does not** invent `random_trap_to_glyph` on the map glyph. It **does not** port pager `trap_description`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `trapname` `:7098–7155` | LIVE repaired | Hallu arm + defsym explanations |
| `halu_trapnames[]` | LIVE table | 62 strings, order matches C |
| `TRAP_EXPLANATIONS` | CLONE verified | defsym desc; anti-magic PCHAR2 `"anti-magic field"` |
| `trap_to_glyph` `:630–631` | LIVE export | alias of `trap_glyph`; no Hallu |
| `trap_glyph` | LIVE kept | tty cmap; invalid ttyp `'^'` |
| `see_traps` `:1610–1621` | LIVE repaired | `disp_kind==='trap'` analogue of `glyph_is_trap` |
| `Hallucination` | LIVE import | display.js youprop; sticky clone deleted |
| `rn2_on_display_rng` | LIVE import | rng.js |
| `rank_of` | LIVE import | roles.js |
| `lcase` / `copynchars` | CLONE verified | ASCII `\|32` / 27-char + newline stop |
| detect `trapname` | deleted clone | import trap.js |
| `random_trap_to_glyph` | not in C | correctly not invented |
| `trap_description` `:166–181` | OMIT named | NOT FOUND |

`node scripts/sym.mjs`:

```
trapname         js/trap.js:1472   sync
trap_to_glyph    js/display.js:1698   sync
trap_glyph       NOT EXPORTED — 1 LOCAL  display.js:1689  => Do NOT write #2
see_traps        js/display.js:4370   sync
Hallucination    js/display.js:736   sync  (also do_name.js export — import C-locus)
rn2_on_display_rng js/rng.js:41   sync
rank_of          js/roles.js:715   sync
glyph_is_trap    js/display.js:650   sync  (integer; this SHA used disp_kind)
trap_description NOT FOUND
```

Re-points: detect `trapname` local → import; trap.js `Hallucination` clone → `display.js`. `node scripts/imports.mjs --can trap.js display.js Hallucination` / `detect.js trap.js trapname` / `trap.js roles.js rank_of` / `trap.js rng.js rn2_on_display_rng`: **ALREADY**. `--can display.js trap.js trap_to_glyph`: name lives in display, not trap. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Hallu gate.** C `Hallucination && !override`. JS `Hallucination() && !override`. Imported youprop `HHallucination && !Halluc_resistance` (`youprop.h:120`). Parent sticky `u.Hallucination` could stay true after timeout. **Match C after this SHA.**

**Display rng (`:7134–7136`).** `total_names = TRAPNUM + SIZE(halu)` = 26+62 = 88; `nameidx = rn2_on_display_rng(89)`. JS `TRAPNUM + HALU_TRAPNAMES.length` then `+1`. **Match.** Core `rn2` is **not** used for the index. Canary seed-1 peek 52 `"booby trap"` is test-only, not production control flow.

**Role/rank slot (`nameidx == total_names`).** `fem = Upolyd ? u.mfemale : flags.female`. JS `Upolyd(u) ? !!u.mfemale : !!game.flags?.female`. LIVE `Upolyd` (`you.h:554`). Then clang `rn2(3) ? (fem && name.f ? name.f : name.m) : rank_of(u.ulevel, Role_switch, fem)`. `Role_switch` ≡ `urole.mnum`. LIVE `rank_of`. **Match call-for-call** (display rng then **core** `rn2(3)`).

**`copynchars` / `lcase`.** `sizeof roletrap` 33 − `sizeof " trap"` 6 (includes NUL) = 27. Stops on `\0`/`\n`. Then `Strcat " trap"` then `lcase` (`'A'..'Z'` `|= 040`). JS copies ≤27, appends `" trap"`, then `| 32` on A–Z. **Match.**

**Halu table (`:7104–7130`).** 62 strings, same order including `"roach motel (tm)"` / `"vacillating triangle"` / `"suntrap"`. JS `nameidx - TRAPNUM`. **Match.**

**Real ttyp rewrite.** `nameidx != NO_TRAP` then `ttyp = nameidx`; `nameidx==0` keeps the argument. Then defsym explanation. JS the same. **Match.**

**Non-Hallu / override (`:7155`).** C `defsyms[trap_to_defsym(ttyp)].explanation`. PCHAR desc strings; anti-magic is PCHAR2 desc `"anti-magic field"` not tilenm `"anti magic trap"` (`defsym.h:177–178`). JS `TRAP_EXPLANATIONS[1..25]` matches those descs including `'anti-magic field'`. `ttyp==NO_TRAP` C indexes `defsyms[S_arrow_trap-1]`; JS returns `'trap'`. Callers pass real ttyp or Hallu-rewritten 1..25. Not a live C-wrong. **Match the live range.**

**`trap_to_glyph` (`:630–631`).** `cmap_to_glyph(trap_to_defsym(ttyp))` — **no** Hallu. JS export = `trap_glyph` (tty cmap). Invalid ttyp still `'^'`/HI_METAL (review **699**). **Did not invent `random_trap_to_glyph`.** Subject “instead of inventing” is **true**.

**`see_traps` (`:1610–1621`).** Walk `ftrap`; `glyph = _glyph_at`; `if (glyph_is_trap(glyph)) newsym`. **No `tseen`.** Parent required `tseen` + matching `disp_ch` (could skip a shown trap whose ch drifted; extra-gated covering cells). This SHA: `disp_kind==='trap'` then `newsym`. Covering mon/obj → not `'trap'` → skip ≡ `glyph_is_trap` false. Integer `glyph_is_trap` (`:972–974`) is named (D-1765 later). Extra `level.traps[]` walk is the JS ftrap stand-in; `seen` Set prevents double `newsym` of the same object. **Match C’s tseen-free covering test.** `newsym` still burns covering `what_mon`/`obj_to_glyph` display rng — C does that too.

**detect.c `:1956`.** `an(trapname(trap->ttyp, FALSE))`. JS import LIVE. Clone **gone**. **Match.**

**`trap_description` (`pager.c:166–181`).** trapped chest/door strings then `trapname(tnum, FALSE)`. NOT FOUND. Named.

**RNG inventory.** Hallu `trapname`: one `rn2_on_display_rng(89)`; role slot adds core `rn2(3)`. Override/non-Hallu: zero. `see_traps` itself burns none; `newsym` may. **Match C.**

**Callee closure.** LIVE: `Hallucination`, `rn2_on_display_rng`, `rn2`, `rank_of`, `Upolyd`, `trap_to_defsym`/`cmap_idx_to_glyph`, `newsym`, detect import. CLONE verified: 62-name table, explanations, `copynchars`/`lcase`. OMIT named: `trap_description`; integer `GLYPH_*_OFF`. STUB: **none**. Not “dispatch ported, callee stubbed.” Not “Match C `random_trap_to_glyph`” — that symbol is absent.

## Hallucinations / overclaim

Subject “display rng + 62 names + role/rank; do not invent `random_trap_to_glyph`”: **true**. D-log “C `trap_to_glyph` has no Hallu”: **true**. Do **not** stamp “Match C `trap_description`.” Do **not** stamp “Match C integer `glyph_is_trap`/`GLYPH_TRAP_OFF`” (this SHA’s analogue is `disp_kind`). Do **not** stamp “Match C 3.6 `what_trap` glyphs.” Journal “fortress held” is not a hallu-trapname screen; cohort included seed0383 hallu. Admit public trapname Hallu is lightly hit.

## Density

§2b: one C function (`trapname`) + the map-glyph claim it replaces (`trap_to_glyph` no Hallu) + `see_traps` caller of `glyph_is_trap`. +97. Related detect clone retirement. Did **not** glue pager `trap_description` or explode `map_invisible`. Did **not** invent 3.6 `random_trap_to_glyph`.

## Verification

D-log: save-oracle skip (untagged `display.h:random_trap_to_glyph`); node canary (plain pit/web; override; TRAPNUM 26; nameidx keep/halu/real/role; seed1 peek 52 `"booby trap"`); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict (incl. seed0383 hallu). Rule #2 clean. Role/rank `" trap"` **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (`trapname` Hallu arm and `trap_to_glyph` without Hallu match C; remaining named). Named: pager `trap_description`; integer `GLYPH_*_OFF` / `glyph_is_trap` on gbuf (D-1765); explode `map_invisible`. Do **not** invent `random_trap_to_glyph`. Do **not** restore `see_traps` `tseen`. Do **not** restore detect `trapname` clone. Do **not** restore sticky `u.Hallucination` in trap.js. Do **not** write `trapname` #2. Do **not** re-port D-1738 cmap.

Verdict: **ACCEPT-WITH-DEBT**
