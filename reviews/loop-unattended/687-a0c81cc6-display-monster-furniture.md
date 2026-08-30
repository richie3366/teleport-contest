# Review 687 — a0c81cc6 — display.c display_monster M_AP_FURNITURE lastseentyp (D-1726)

## Metadata
- Full / short hash: `a0c81cc695592b198f444158833cdc30865a6c2e` / `a0c81cc6`
- Parent: `ac125e25` (audit #2130 / reviews **678–686**). This file audits **this SHA only** (first of nine `js/` commits since review **686**). Archive **Addressed:** D-1726 `a0c81cc6`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 09:46:45 +0200
- D-id: **D-1726**
- Stats: `js/display.js` +92/−29; `js/dungeon.js` +1/−1. Total `js/` insertions **93** <250. Band **150–350**.
- Claims to close: Open `display_monster` M_AP_FURNITURE `cmap_to_glyph` + lastseentyp after D-1711 / review **672** (that SHA named this writer). Not DRAWBRIDGE_UP `update_lastseentyp`. Not M_AP_MONSTER `what_mon` (later **D-1734** / this audit **695**). `reviews/loop-2026-08-15/` has no unpaid furniture lastseentyp Must-fix.
- JS / map: `display.js` `display_monster`; `dungeon.js` `ensure_lastseentyp` export. `c-js-map/turns.md` display row.
- Prior: **672** named `display.c:559` lastseentyp override as omit.

## Intent vs deliverable

Git subject promises: PHYSICALLY_SEEN furniture mimics use `cmap_to_glyph` and `lastseentyp=cmap_to_type`, instead of showing the mlet after D-0297 object-only.

`node scripts/csym.mjs display_monster` → `display.c:513–622`. `--callers display_monster`: `display.c:904` `feel_location`; `:1027` `newsym` cansee; `:1053` `newsym` !cansee (`see_it ? 0 : DETECTED`). `cmap_to_type` `mkroom.c:910–1030`. `cmap_to_glyph` `display.h:621–628`. `map_object` `:332–366`. `what_mon` `display.h:197`. `show_mon_or_warn` `:481–496`. `PHYSICALLY_SEEN`/`DETECTED` `:498–499`.

```543:561:nethack-c/upstream/src/display.c
        case M_AP_FURNITURE: {
            int sym = mon->mappearance, glyph = cmap_to_glyph(sym);

            levl[x][y].glyph = glyph;
            if (!sensed) {
                show_glyph(x, y, glyph);
                /* override real topology with mimic's fake one */
                svl.lastseentyp[x][y] = cmap_to_type(sym);
            }
            break;
        }
```

```904:908:nethack-c/upstream/src/display.c
        display_monster(x, y, mon,
                        (tp_sensemon(mon) || MATCH_WARN_OF_MON(mon))
                            ? PHYSICALLY_SEEN
                            : DETECTED,
                        is_worm_tail(mon));
```

```1027:1029:nethack-c/upstream/src/display.c
                display_monster(x, y, mon,
                                see_it ? PHYSICALLY_SEEN : DETECTED,
                                worm_tail);
```

Parent: furniture was mlet via `newsym`; only M_AP_OBJECT was special-cased (D-0297). The diff **does** add local `display_monster` with C mimic-first order, furniture `cmap_idx_to_glyph` + `cmap_to_type` lastseentyp, `gbuf_show_kind` unsensed furniture as cmap, and `feel_location` calling the helper. It **does not** port `what_mon` / `monnum_to_glyph` (case paints live `mon_glyph`). Named. It **does not** OR `Protection_from_shape_changers` into `sensed`. Named. It **does not** pass `see_it ? PHYSICALLY_SEEN : DETECTED` from `newsym` (always `PHYSICALLY_SEEN` on the `see_it` arm). Named Detect_monsters cansee. It **does not** call `map_object` for M_AP_OBJECT. Named. It **does not** port pet/detected/`show_mon_or_warn`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `display_monster` | LIVE new (C `staticfn`; JS local) | mimic-first; furniture arm LIVE |
| `PHYSICALLY_SEEN` / `DETECTED` | LIVE | `:498–499` 1 / 2 |
| `cmap_idx_to_glyph` | CLONE (pre-existing tty of `cmap_to_glyph`) | `S_FOUNTAIN_CMAP===37===S_fountain`. Do **not** add #2 |
| `cmap_to_type` | LIVE import | D-1711 `dungeon.js`. Do **not** add #2 |
| `ensure_lastseentyp` | LIVE re-point local→export | JS `svl.lastseentyp` holder; not a C function |
| `mimic_object_appearance_glyph` | CLONE of M_AP_OBJECT / `obj_glyph` | D-0297; not `map_object` |
| `map_object` | LIVE elsewhere; unused here | observe/`!sensed` show still named |
| `what_mon` / `monnum_to_glyph` | OMIT named at this SHA | stub used `mon_glyph`; **D-1734** later LIVE |
| `sensemon` | LIVE | `display.js` |
| `Protection_from_shape_changers` | OMIT named | clones in `monmove.js`/`were.js` — do **not** add #3 in display |
| `show_mon_or_warn` | OMIT named | `sym` NOT FOUND |
| `update_lastseentyp` | LIVE other writer | D-1711 `canseemon`; not this peel |
| `gbuf_show_kind` furniture→cmap | JS serialize | so scored cells use `{` not mlet |
| `newsym` !cansee `:1053` | OMIT named | still inlines `mon_glyph` |

`node scripts/sym.mjs` (run on current tree; `what_mon` is **D-1734**, not this SHA):

```
display_monster  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:957
             => Do NOT write clone #2.
ensure_lastseentyp js/dungeon.js:1015   sync
cmap_to_type     js/dungeon.js:1029   sync
cmap_to_glyph    NOT FOUND in js/** (no export, no local function/const).
cmap_idx_to_glyph NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:848
             => Do NOT write clone #2.
mimic_object_appearance_glyph NOT EXPORTED — 1 LOCAL in js/display.js:830
             => Do NOT write clone #2.
update_lastseentyp js/dungeon.js:1152   sync
what_mon         js/display.js:805   sync   (D-1734; absent at a0c81cc6)
map_object       js/display.js:1261   sync
show_mon_or_warn NOT FOUND in js/**
sensemon         js/display.js:447   sync
Protection_from_shape_changers NOT EXPORTED — 2 LOCAL CLONE(S):
               js/monmove.js:663  js/were.js:46
             => Do NOT write clone #3.
mon_glyph        js/display.js:811   sync
```

Re-point: `ensure_lastseentyp` local → export (`dungeon.js`). Do **not** add a second lastseentyp array helper. No new `--can` edge (`display.js` already imported `update_lastseentyp` from `dungeon.js`). FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Mimic-first (`:532`).** C `mon_mimic && sightflags == PHYSICALLY_SEEN` then `switch (M_AP_TYPE)`. JS `ap = m_ap_type & M_AP_TYPMASK`; `mon_mimic = ap !== M_AP_NOTHING`; same `if`. **Match the guard.** `M_AP_TYPE` mask matches C.

**`sensed` (`:522–523`).** C `mon_mimic && (Protection_from_shape_changers || sensemon(mon))`. JS `mon_mimic && sensemon(mon)` only. With Protection on, C treats the mimic as sensed: furniture does **not** `show_glyph` / lastseentyp, then the second `if` paints the real monster. JS would still paint furniture and write lastseentyp. **Named omit** — not a silent C-wrong. Do **not** stamp “Match C Protection sensed.”

**Furniture (`:545–561`).** C `sym = mappearance`; `glyph = cmap_to_glyph(sym)`; always `levl[x][y].glyph = glyph`; if `!sensed`: `show_glyph` + `lastseentyp = cmap_to_type(sym)`. JS `cmap_idx_to_glyph(sym)` (tty clone; `S_fountain` 37); `remembered_glyph` iff `hero_memory` (JS analogue of `levl.glyph`); `!sensed` → `show_glyph_cell` + `lst[x][y] = cmap_to_type(sym)`. **Does not** call `update_lastseentyp` (that writer is `canseemon` + DRAWBRIDGE_UP — D-1711). **Match the furniture arm** (memory + show + lastseentyp, `!sensed` only on the last two). No `rn2` in this arm. C `cmap_to_glyph(S_altar)` uses `altar_to_glyph(AM_NEUTRAL)`; JS `S_ALTAR_CMAP` already documents that gray `_`/`{`. Fountain canary `{` + `FOUNTAIN` lastseentyp matches `S_fountain` / `cmap_to_type` `:79–80` of that switch.

**Object (`:564–575`).** C fake `obj` + `map_object(&obj, !sensed)` (`:332–366` may `observe_object` then memory/`show`). JS still `mimic_object_appearance_glyph` (D-0297 `obj_glyph`). **Named** map_object observe. When `sensed`, C `show=FALSE` still writes memory; JS `show_glyph_cell` then the second `if` overwrites with the monster — screen ends as C; observe path still omitted.

**Monster appearance (`:578–583`) at this SHA.** C `what_mon(mappearance, rn2_on_display_rng)` then `monnum_to_glyph`. This SHA’s case painted `worm_tail ? worm_tail_glyph() : mon_glyph(mon)` with a “Named omit” comment. **Dispatch ported, callee stubbed** for that one case — **named in the map in this commit**, so the arm is OMIT not an unnamed STUB. Later **D-1734** (this audit **695**) makes it LIVE. Do **not** stamp “Match C `what_mon`” on D-1726. Do **not** Must-fix a peel HEAD already shipped.

**Second `if` (`:588–620`).** C `!mon_mimic || sensed` then pet / DETECTED / else glyphs + `show_mon_or_warn` + `meverseen=1`. JS same predicate; then `worm_tail ? worm_tail_glyph() : mon_glyph` + `show_glyph_cell` + `meverseen=1`. **No** `mtame && !Hallucination` pet glyphs; **no** `sightflags == DETECTED` detected glyphs; **no** `show_mon_or_warn` I-glyph `unmap_object`. Named. Furniture `!sensed` correctly **skips** this block (mimic stays furniture). **Match `meverseen` timing.**

**Callers.** C `feel_location` `:903–908`: `!u_at && sensemon` then PHYSICALLY_SEEN iff `tp_sensemon || MATCH_WARN` else DETECTED. JS matches that ternary + `is_worm_tail`. **Match feel_location.** C `newsym` cansee `:1016–1029`: `see_it || (!worm_tail && Detect_monsters)` then `see_it ? PHYSICALLY_SEEN : DETECTED`. JS only the `see_it` arm, always `PHYSICALLY_SEEN`. Detect_monsters without `see_it` is **named**. C `newsym` !cansee `:1053` `see_it ? 0 : DETECTED` — JS still inlines `mon_glyph` (Detect_monsters) / tp path. Named. Unsensed furniture + DETECTED would no-op in C (`sightflags != PHYSICALLY_SEEN` and `!sensed`); JS Detect_monsters !cansee painting live mlet is the named omit, not the furniture writer.

**Callee closure (furniture arm).** LIVE: `cmap_idx_to_glyph` (verified tty clone of `cmap_to_glyph`), `cmap_to_type`, `ensure_lastseentyp`, `show_glyph_cell`, `sensemon`. OMIT named: Protection in `sensed`; `what_mon`; `map_object`; `show_mon_or_warn`; Detect_monsters cansee; pet/detected. STUB in the **furniture** arm: **none**. Combined-arm: M_AP_MONSTER was OMIT-named here (LIVE in **D-1734**). Not “Match C whole `display_monster`.”

## Hallucinations / overclaim

Subject “furniture mimics use cmap_to_glyph and lastseentyp=cmap_to_type”: **true** for PHYSICALLY_SEEN `!sensed`. D-log “matching C order”: **true** for mimic-first + furniture. Do **not** stamp “Match C `what_mon`.” Do **not** stamp “Match C `Protection_from_shape_changers` sensed.” Do **not** stamp “Match C `newsym` `see_it ? PHYSICALLY_SEEN : DETECTED`.” Do **not** stamp “Match C `map_object` observe.” Do **not** stamp “Match C `show_mon_or_warn`.” Do **not** stamp “Match C pet/detected glyphs.” Journal “fortress held” is not a furniture-mimic screen proof. Public sessions **do not** hit giant-mimic-as-fountain; helper **public-unhit**; canary is the node S_fountain check. Admit that.

## Density

§2b: one C `display_monster` furniture arm after **672** named `:559`. Same `:545–562`. +93. Did not glue `what_mon`, Protection, Detect_monsters cansee, or `map_object`. Did **not** reopen D-1711 DRAWBRIDGE_UP. One function + the two callers C actually uses for this writer. Not a one-bullet `if`.

## Verification

D-log: save-oracle skip (untagged `display.c:display_monster`); node S_fountain → lastseentyp FOUNTAIN + `{`; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Public furniture-mimic **unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (furniture arm matches C; remaining cases were named omits; `what_mon` is **D-1734**). Named: Protection_from_shape_changers sensed (`:522–523`); Detect_monsters cansee (`:1016–1029` / `:1053`); mimic `map_object` observe (`:564–575`); pet/detected/`show_mon_or_warn` (`:588–619`). Do **not** add `display_monster` #2. Do **not** add `cmap_idx_to_glyph` #2. Do **not** add `cmap_to_type` #2. Do **not** add `Protection_from_shape_changers` #3 in display.js. Do **not** write lastseentyp from `update_lastseentyp` for this PHYSICALLY_SEEN `!sensed` path. Do **not** re-port D-0297 object-only. Do **not** re-port D-1711 DRAWBRIDGE_UP.

Verdict: **ACCEPT-WITH-DEBT**
