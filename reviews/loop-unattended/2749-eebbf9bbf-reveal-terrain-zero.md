# Review 2749 — eebbf9bbf — reveal_terrain_getglyph zero exception

Metadata: SHA `eebbf9bbf`, D-3892, `js/display.js` only (+ focused test),
1 function. Cliff-phase writer fix.

Intent vs deliverable: subject promises deleting the house `|| !last`
zero exception so premapped-never-seen cells fake stone per C, moving
Samurai-582701 s1814 to PASS. Diff actually adds: the one-predicate
deletion + a 10-line C-cite comment. Promise = diff.

Inventory: `reveal_terrain_getglyph` (js/display.js:5131 region) —
changed, one predicate.

C ↔ JS fidelity: C `nethack-c/upstream/src/detect.c:2249` (read
directly): `} else if (svl.lastseentyp[x][y] == levl[x][y].typ) { glyph
= back_to_glyph(x, y); } else { …mimic… / fake via temp typ =
lastseentyp… }`. Plain equality — no zero exception anywhere in the
`:2166–2288` body. The deleted `|| !last` was a house invention with no
C source; its removal makes the predicate literally C. The surrounding
JS fake arm (temp typ=last, wall-state recalc only for WALL/SDOOR per
`:2279–2280`, restore) matches C's save/clobber/restore shape and
needed no change. The C decision point plus the fake arm
(detect.c:2249–2284, abridged):

```c
} else if (svl.lastseentyp[x][y] == levl[x][y].typ) {
    glyph = back_to_glyph(x, y);
} else {
    if ((mtmp = m_at(x, y)) != 0
        && M_AP_TYPE(mtmp) == M_AP_FURNITURE) {
        glyph = cmap_to_glyph(mtmp->mappearance);
    } else {
        save_spot = levl[x][y];
        levl[x][y].typ = svl.lastseentyp[x][y];
        if (IS_WALL(levl[x][y].typ) || levl[x][y].typ == SDOOR)
            xy_set_wall_state(x, y);
        glyph = back_to_glyph(x, y);
        levl[x][y] = save_spot;
    }
}
```

The comment's mechanism (premap_detect never writes lastseentyp, so
never-vision-mapped cells keep last=0=STONE and C fakes stone) is
consistent with the observed defect (11 C-blank vs JS-`·` cells, all
under unmoved Sokoban boulders) and with C's unconditional equality:
last=0 + typ=25 (ROOM) takes the else/fake path in C, painting stone
under the stripped boulder — exactly the recorded C row. JS-side
`lastseentyp` writers (`pickup.js:1023` hero spot, `display.js:5956+`
vision macro, `display.js:5620` magic_map_background) corroborate the
no-lastset-in-premap claim; none sits on the premap path. The deletion
changes only last=0 + typ≠0 cells; last=0 + typ=0 (true stone) takes
`back_to_glyph` either way. No RNG in the arm.

Hallucinations / overclaim: none. Whole-function claim (`:2167–2288`,
all strip arms + `:2249` + darkroom FIXME) is plausible and the touched
arm is now textually C. D-log is explicit that corpus verify ran on
`getpos` while `verify reveal_terrain_getglyph` was 0-blocked ("NOT a
corpus PASS").

Density: one cliff writer, one predicate, one probe session, movement
claimed. Ledger touch present. Session-reaching.

Verification: re-measured myself. `verify getpos --base eebbf9bbf~1
--reach-all`: 1 blocked at baseline, `scen-sweep-Samurai-582701: PASS`,
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`, smoke 24/24
REACH-OK. D-3892 movement claim reproduces; no REGRESSED row. No symbol
delete/re-point, no import change — no `sym.mjs` output required. Rule
#2 clean (checked this iteration). No FORCE/DIAG/seed/coordinate reads
in the diff.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
