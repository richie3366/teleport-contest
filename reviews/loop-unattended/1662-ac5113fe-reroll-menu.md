# Review 1662 — ac5113fe — `invent.c` reroll_menu whole body + allmain loop (D-2703)

Metadata: commit `ac5113fe`, D-2703, `js/invent.js` (~75 L new export) + `js/allmain.js` (5-line loop + import). Pops 4 rows as Stale (symbols spot-confirmed: `count_feat_lastseentyp` at `js/dungeon.js:1467`, `spellretention` at `js/spell.js:1276`, `more_than_one` at `js/mklev.js:30459`) and ships the refilled head row. No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole C body of `reroll_menu` + the allmain reroll loop. Diff actually adds both. Promise matches deliverable.

## Inventory

New JS: `reroll_menu` (async export, `js/invent.js`), caller loop in newgame. No deleted/re-pointed symbols. Imports on already-live edges (`y_n`, `select_menu_pick_one`, all already imported in their files per the diff context).

## Callee closure

Required `sym.mjs` outputs pasted verbatim (no symbol deleted or
re-pointed — `reroll_menu` is an addition):

```text
select_menu_pick_one js/options.js:2310   ASYNC — await required
y_n              js/getline.js:1561   sync
obj_glyph        js/display.js:2275   sync
```

| JS callee | Class |
|---|---|
| `select_menu_pick_one` | LIVE (awaited; `picked.kind==='pick'` vs cancel dispatch ≡ C `>0` vs fallback) |
| `y_n` | LIVE (sync, returns char; `await` on a non-promise is a no-op) |
| `obj_glyph` | LIVE — display-RNG burn verified parity: draws `rn2_on_display_rng` only on the random/Hallu path, exactly like C's `obj_to_glyph` |
| `doname`, `get_strength_str`, `acurr` | LIVE (pre-existing) |
| `u_init_inventory_attrs`, `bot` (caller loop) | LIVE (pre-existing; loop body order matches C `:820–823`) |

No STUB in any live arm. Window lifecycle inside the menu helper
(doextlist precedent) and the `map_glyphinfo` tile slot (dospellmenu
precedent) are named, not silent.

## C ↔ JS fidelity

C locus: `reroll_menu` `invent.c:2550–2616` (csym, 67 L, whole body read). Sole C caller `allmain.c:820` (csym `--callers`: exactly 1 reference). Order walked:

- start/reroll rows with `lootabc ? 0 : 'p'/'r'` selectors, `a_char` n/y, blank separator ✓.
- `++distantname` / `++override_ID` guards with symmetric restore (JS `try/finally` — strictly safer, same observable order) ✓; tree convention `game.distantname` matches readers (`js/objnam.js:1012`) ✓.
- invent walk: `obj_to_glyph(otmp, rn2_on_display_rng)` → `obj_glyph(otmp)` — verified the burn parity: `obj_glyph` draws `rn2_on_display_rng` only on the random/Hallu path (`js/display.js:2275+`), exactly like C's `obj_to_glyph`; ordinary starting inventory burns nothing either side ✓. `doname` lines ✓. `map_glyphinfo` tile slot named as no-tty-consumer (dospellmenu precedent) ✓.
- stat line: `St:%s Dx:%-1d…` with `%-1d` ≡ bare number ✓; `ACURR` → live `acurr`, strength string → live getter ✓.
- PICK_ONE → `pick_list[0].item.a_char`; close-without-pick → `y_n` fallback (JS `picked.kind==='pick'` vs cancel — equivalent dispatch) ✓; filler `a_char` 0 → FALSE either side (tty auto-lettering analyzed in-comment) ✓.
- `'y'` → `++numrerolls`, TRUE ✓.

Caller: C loop `while (u.uroleplay.reroll && reroll_menu()) { u_init_inventory_attrs(); bot(); }` sits between `bot()` and `u_init_skills_discoveries()` (`allmain.c:805–830` read) — JS loop placed exactly there, same body order ✓.

Callee closure: all LIVE (`select_menu_pick_one` async-awaited, `y_n`, `doname`, `obj_glyph`, glyph/strength readers). Window lifecycle inside the menu helper (doextlist precedent) — named, not a stub in a live arm.

## Hallucinations / overclaim

None. The refill line (`--rows 600`, 6 fresh rows) is process detail, verifiable in the queue file.

## Density

Breadth phase: one whole C function + its sole caller loop, ~80 lines over two coupled modules. Right-sized.

## Verification

Full verify transcript (both summary lines cited):

```text
verify reroll_menu: baseline ac5113fe~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify reroll_menu: no corpus session is blocked on it at ac5113fe~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke reroll_menu: no RNG-tagged reach; fixed smoke spread (24 run, 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, as disclosed. No REGRESSED. RNG 0 draws
both sides (menu-only path). Placement proof: C's loop sits between
`bot()` and `u_init_skills_discoveries()` (`allmain.c:805–830` read) and
the JS loop sits exactly there. The four Stale parks carry symbols
spot-confirmed in-tree (`dungeon.js:1467`, `spell.js:1276`,
`mklev.js:30459`). Diff grep: no FORCE/DIAG/seed/fastforward/coords.
Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
