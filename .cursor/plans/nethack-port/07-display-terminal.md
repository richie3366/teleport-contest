# Satellite plan: Display, terminal, SGR, `botl`, messages

Parent: global plan **NetHack JS port roadmap** (Workstream I + J overlap for map).

## Status (as of 2026-05-23)

- **Partial:** [`js/display.js`](../../js/display.js), [`js/game_display.js`](../../js/game_display.js), [`js/vision.js`](../../js/vision.js); [`js/terminal.js`](../../js/terminal.js) frozen — drive via APIs only.
- **Not done:** Full `botl`, SGR/cursor parity, menu redraws vs C.

---

## Goals

- **S channel:** Serialized 24×80 frames at each `nhgetch` boundary match C after contest canonicalization ([docs/API.md](../../docs/API.md) *Screen comparator*).
- Cursor position and visibility flag match when scored as tiebreaker.

## Current repo anchors

- [js/display.js](../../js/display.js), [js/game_display.js](../../js/game_display.js), [js/terminal.js](../../js/terminal.js) (**frozen** — do not edit; drive via APIs)
- [js/vision.js](../../js/vision.js) — field of view / lit tiles

## Checklist

### Map

- [ ] `newsym`, `mapglyph`: glyphs for monsters, objects, traps, memory
- [ ] Dark / lit / remembered vs `cansee`, `viz_array` parity with `vision.c`

### Status (`botl`)

- [ ] Bottom line fields: HP, Pw, AC, Au, exp, stats, dungeon name, turn — **order and spacing** vs C
- [ ] Hunger states, encumbrance, conditions when sessions show them

### Messages

- [ ] `pline`, `Norep`, `You`, `The` templates; multi-line wraps
- [ ] `--More--` and `repeat` message clearing vs [js/allmain.js](../../js/allmain.js) `_pending_message`

### Menus

- [ ] Text windows (`text_menu`), inventory columns, accelerators
- [ ] Cursor placement inside menus; redraw after selection

### SGR / color

- [ ] Emit sequences compatible with harness canonicalization (spaces forgiving)
- [ ] Symset / hilite from [js/options.js](../../js/options.js) → glyph/color mapping

### Animation (supplemental)

- [ ] Match [01-harness-rng-time.md](./01-harness-rng-time.md) `animationFrame` strategy

## Exit criteria

- First diverging screen index moves rightward on focused fixes; charset/SGR mismatches eliminated vs golden frame dumps.
