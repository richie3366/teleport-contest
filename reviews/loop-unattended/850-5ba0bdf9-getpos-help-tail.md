# Review 850 — 5ba0bdf9 — getpos.c getpos_help whatis multi-pick + valid/hilite tail (D-1880)

## Metadata

- SHA: `5ba0bdf9` ("getpos.c getpos_help whatis multi-pick + valid/hilite tail (getpos_help corpus owner) (D-1880).")
- D-id: D-1880. Queue row: Open (`getpos_help` corpus owner), popped in order.
- Files: `js/getpos.js` (+60/−?), docs + map + scoreboard. No new imports.

## Intent vs deliverable

Subject promises: port the `getpos_help` tail (`:244–299`) in C order —
getvalid/hilite arms, `skip_non_mons` goto semantics, `doing_what_is`
four-pick + detail lines. Diff adds exactly that. Promise kept.

## Inventory

| JS change | Status |
|---|---|
| getvalid/hilite/AUTODESC lines | new port of C `:244–257` |
| `skipNonMons` + tail gate | new port of C `:205` goto + `:267` label |
| `doing_what_is` kbuf + 4 detail lines | new port of C `:268–299` |

No deleted/re-pointed symbols (`sym.mjs` vacuous).

## C ↔ JS fidelity

C locus `getpos_help` (`nethack-c/upstream/src/getpos.c:166–307`, full
tail read). Walked arm-by-arm:

- **Goto-into-block**: C `:205` `goto skip_non_mons` jumps to the `:267`
  label *inside* `if (!iflags.terrainmode)`. JS `if (!terrainmode ||
  skipNonMons)` reproduces exactly the two ways to reach the tail
  (fall-through only when `!terrainmode`, goto always). ✓ This also
  fixes a real sub-bug: the parent skipped the `Type a …` line entirely
  for goal `'a monster'`; C prints it via the goto.
- **getvalid/hilite** (`:244–255`): C tests installed function pointers;
  JS tests same-module `let` state (`getpos.js:68–70`, installed via
  `getpos_sethilite`) — same shape, no imports, strings match
  (`NHKF_GETPOS_VALID_NEXT/PREV`, `NHKF_GETPOS_SHOWVALID`). ✓
- **Dead cmdassist Sprintf** (`:258–266`): C writes `sbuf` with no
  `putstr` (next `Snprintf` overwrites) — provably prints nothing. JS
  emits no line + says so. Correct, not an omit. ✓
- **Pointer-compare claim verified both sides**: C `doing_what_is =
  (goal == what_is_a_location)` with the global defined once
  (`pager.c:1670`) and passed as `goal` only at `pager.c:1910`; every
  other C caller passes a literal. JS: only `pager.js:1690` passes
  `'a monster, object or location'` (neighboring `:1679/1682` strings
  are pline text, not goal). Value compare is exact. ✓ C local
  (`boolean doing_what_is;` `:172`) → JS local `const` is the faithful
  shape. ✓
- **Strings**: four-pick kbuf order PICK/PICK_Q/PICK_O/PICK_V matches;
  all four detail lines match C punctuation exactly, including the
  `,%s move` infix with `flags.help && !force` (JS `game.flags?.help
  !== false && !force`, the repo's default-On idiom). ✓ No RNG on the
  path.

Callee closure: all same-module or pre-imported (`visctrl`,
`getpos_spkey`); no STUB in a live arm. `cmd_from_func` custom binds
stay named (no corpus block).

## Hallucinations / overclaim

None. The subtle claims (dead Sprintf, pointer-compare exactness,
goto semantics) all check out against pinned C. "No new imports" true.

## Density

~60 insertions, one function tail + map + verify. Within band. Fine.

## Verification

- Diff grep: no FORCE/DIAG/seed/coordinate content (help-text lines
  only). Rule #2 untouched.
- Re-measured myself: `node scripts/hidden-proxy.mjs verify getpos_help
  --base 5ba0bdf9~1` → `0 PASS, 1 moved past → PROGRESS`
  (`...01388a3a: moved → readobjnam_postparse1 at step 345 (was 342)`).
  Byte-identical to the D-log bullet — confirmed. (The follow-up owner
  `readobjnam_postparse1` is already the queued Open row; honest
  hand-off, not glued.)

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
