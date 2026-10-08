# Review 2549 — f5c52c304 — reset_glyphmap engrcorr inverse (D-3674)

- SHA: `f5c52c30460b5d404779ada78123111d189b304c`
- Subject: display.c reset_glyphmap `:2941–2946` S_engrcorr MG_BW_ENGR arm: corridor engravings paint inverse when symbols collide (engrave-94198 + descend-94367 → PASS) (D-3674)
- D-entry: D-3674. Type: cliff (writer port, 1 new helper + 1 call site).
- Diff size: `js/display.js` +28; + test `scripts/engrcorr-bw-inverse.test.mjs`; ledger `display.c` D-tag.

## Intent vs deliverable

Promise: derive ATR_INVERSE for the S_engrcorr banked id when its
showsyms char collides with S_corr/S_litcorr and use_inverse is on
(C `:2941–2946` + `tty_print_glyph`); OR it in `show_glyph_cell`
so live/memory/detection/wizard paints inherit; 2 sessions → PASS.

Diff actually adds: `engrcorr_map_attr(gid)` beside the attr
family + one `attr |= …` line in `show_glyph_cell`. Nothing else
in `js/`.

## Inventory

| JS function | Change | C locus |
|---|---|---|
| `engrcorr_map_attr` (`js/display.js:495`) | new, local | `display.c:2941–2946`, `wintty.c:3930–3936` |
| `show_glyph_cell` (`js/display.js:4647`) | +1 OR line | `display.c:1886–2006` paint path |

No symbols deleted or re-pointed. Helper class: C-machinery
stand-in (static per-glyph `glyphflags` derived on the fly) —
same pattern as the neighboring `*_map_attr` family.

## C ↔ JS fidelity

C `reset_glyphmap` (`display.c:2738–3086`, via `csym.mjs`) —
CMAP_A chain:

```c
} else if (cmap == S_engrcorr            // :2942
           && (sym == gs.showsyms[S_corr + SYM_OFF_P]
               || sym == gs.showsyms[S_litcorr + SYM_OFF_P])) {
    gmap->glyphflags |= MG_BW_ENGR;       // :2946
}
```

Cite `:2941–2946` confirmed. Paint side confirmed at
`wintty.c:3930–3936`: `MG_BW_ENGR` ∈ the
`(MG_DETECT|MG_BW_LAVA|MG_BW_ICE|MG_BW_SINK|MG_BW_ENGR)` mask gated
on `iflags.use_inverse` → `ATR_INVERSE`.

Branch-by-branch confirm:

- **Id gate:** `(gid|0) !== cmap_to_glyph(S_ENGRCORR)` — C sets
  the flag per glyph-bank id at reset; JS derives it per paint
  from the same banked id (`gid` is the integer glyph,
  `show_glyph_cell :4569`). Equivalent.
- **Collision:** `sym === showsyms[S_CORR+SYM_OFF_P] ||
  showsyms[S_LITCORR+SYM_OFF_P]` — verbatim C. Indices verified:
  C `defsym.h:116–118` S_corr=22, S_litcorr=23, S_engrcorr=24 =
  JS `:3291–3293`. `game.gs.showsyms` is the live merged
  ov-?:-default table (`assign_graphics`/`switch_symbols`,
  `js/display.js:3441/3473`) — the same values C reads.
- **use_inverse gate:** `use_inverse_opt()` (`wc_inverse ??
  use_inverse`, default true) mirrors the C paint gate. No
  `use_color` gate on either side — correct: unlike the
  `:2897–2912` LAVA/ICE/SINK chain (inside `if (!iflags.use_color)`,
  named omission (2) with an accurate falsifier), the CMAP_A arm
  fires with color on, as the session proves (bright-blue `#` +
  inverse).
- **Placement:** after `map_glyphinfo` resolution, before
  announce/store/dirty — every engrcorr paint inherits, matching
  "derived at every tty paint from the static glyphflag".
- **Named (1)** (`:2934` `has_rogue_color` first-arm):
  characterization verified (`:2747–2748`,
  `HAS_ROGUE_IBM_GRAPHICS && nocolor==0`; JS ROGUESET always
  `nocolor=1`, so never active). True blocker-free omit.

## Hallucinations / overclaim

None. No dispatch-vs-callee gap. No FORCE/DIAG/seed reads. Rule
#2 clean (this iteration's `--rulecheck`).

## Density

Cliff phase: owner-null paint cliff, one C arm + paint gate,
whole, code + ledger + verify in one handoff. Right-sized.
Sampled verdicts: `engrcorr_map_attr` — faithful;
`show_glyph_cell` call site — faithful.

## Verification

D-log claim: 2/2 focused; `score --ids` on the 22 null-owner
sessions: engrave-94198 + descend-94367 FULL PASS, board 917→919,
0 regressed; vacuous `--fn` ×2 (D-3673/D-3672 precedent);
REACH-OK; full 44/44.

Audit re-measure
(`verify map_engraving,show_glyph --base f5c52c304~1 --reach-all`):
0 blocked on both (vacuous, as D-logged) + smoke 24/24 → REACH-OK
both. Committed board diff at this SHA independently confirms
movement: exactly 2 `false→true` flips
(`scen-engrave-Archeologist-94198`,
`scen-descend-Valkyrie-94367`), 0 `true→false`. No REGRESSED
session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
