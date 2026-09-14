# Review 1264 — dee0904f — pager.c look_traps glyph-first listing (D-2298)

Metadata: SHA `dee0904f`, D-2298, C-wrong omission row (no corpus owner; `verify` 0 blocked). Method: `git show` stat + full `js/pager.js` diff; `csym.mjs look_traps` body; `sym.mjs` on `trap_to_glyph`/`couldsee`/`t_at`; `imports.mjs --can` ×3; `hidden-proxy verify --base` re-run; const-import pre-existence check; diff grep for banned patterns.

## Intent vs deliverable

Subject promises: `/t`//`/T` listing ported to C order over live callees — glyph-first `glyph_to_trap` + `trap_description`, `t_at`-only store, invented `ftrap` double-count loop deleted.
Diff actually adds (`git show dee0904f -- js/pager.js`, single file): `look_traps` rewritten per the C body; three import names added (`trap_to_glyph`, `couldsee`, `t_at`); `trap_description` doc updated. Promise kept, no scope creep.

## Inventory

- `look_traps` (js/pager.js, async — `show_text_pages`/`pline` awaits) — rewritten.
- `trap_description` — comment-only touch (body pre-existing live).

## C ↔ JS fidelity

C locus `pager.c:2077–2139` (`csym.mjs`; JS doc cites `:2077–2141`, two-line tail drift, cosmetic). Arm-by-arm in C order:

| C (`pager.c`) | JS (`look_traps`) | Match |
|---|---|---|
| `glyph = glyph_at(x,y)`; `glyph_is_trap` → `tnum = glyph_to_trap` → `trap_description` → `count++` | identical chain | verbatim |
| else `t = t_at && tseen && ((!water && !air) \|\| couldsee)` | `!onWaterAir \|\| couldsee` | identical (bubble/cloud comment intent preserved) |
| `trapname + ", obscured by encglyph(glyph)"` (original map glyph, pre-repoint) | same string; covering char via named `look_engrs` idiom | verbatim shape, named substitute |
| `glyph = trap_to_glyph(t)` then `count++` | `trap_to_glyph(t).ch` then `count++` | verbatim |
| header on `count==1`: `upstart` + `"    "` separator | same | verbatim |
| prefix `coord_desc` + trap char via `encglyph(glyph)` | `look_coord_prefix` + `trap_to_glyph` | verbatim shape |
| `lookbuf[BUFSZ-1-strlen(outbuf)] = '\0'` | `slice(0, BUFSZ-1-head.length)` | verbatim arithmetic |
| `count ? display(TRUE) : pline("No traps…")` | `show_text_pages(moreAtEnd)` ≡ display-TRUE like `look_all`, else identical pline | verbatim |

Checked, not a gap: in C's glyph arm the prefix char is `encglyph` of the un-repointed map glyph (re-pointing happens only in the else arm); JS uses `trap_to_glyph({ttyp: tnum})` — same visible char through the same defsym table (D-log probed `^`/`"`/`~`), and the partial-object call is covered by the hand probe. In the else arm C renders the covering glyph before re-pointing; JS reads `look_shown_at` before `trap_to_glyph` — same order, pure reads, no RNG.
Deletions verified correct: the second `ftrap` scan loop counted without printing (invented — correctly removed), and the `loc.trap`/`game.ftrap` fallbacks contradict `lev_json.js:29` (live list is `level.traps`, read via `t_at`) — correctly removed. Hallucination `rn2(20)` now burns inside the (pre-existing, live) `trap_description`, chest-before-door order kept per the doc comment.
Callee evidence (`sym.mjs`, all LIVE sync):

```text
trap_to_glyph    js/display.js:1987   sync
couldsee         js/vision.js:1110   sync
t_at             js/trap.js:1032   sync  (+1 local clone in js/steed.js:154, untouched)
```

The port imports the canonical `t_at` export — correct (the steed clone is pre-existing, out of scope). `imports.mjs --can` ×3: all "ALREADY … No new edge needed", call-time use only. `Is_waterlevel`/`Is_airlevel`/`BUFSZ` were already imported (`js/pager.js:73,80` — verified, not assumed), so the "three new import names" claim is exactly the three checked above. No STUB in either arm; `doidtrap`/`encglyph`-table/`trapped_chest` recursion properly named.

## Hallucinations / overclaim

None. "No corpus divergence — C-wrong omission" is accurate; the vacuous note is explicit.

## Density

One C function, one module, ~60 insertions replacing ~30 stub lines. Right-sized.

## Verification

D-log: syntax/rule2/green/strict/cohort PASS, hidden vacuous (honest). Re-measured by this review:

```text
verify look_traps: baseline dee0904f~1 (scoreboard at 614cdcf0) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches "row cited no N blocks". Hand probe covered trap chars per type, `glyph_to_trap(GLYPH_TRAP_OFF)` numbering (ARROW_TRAP=1, matches trap.h), `t_at` null, OOB `couldsee`, BUFSZ arithmetic, and import-load (no TDZ). Diff grep: no FORCE/DIAG/seed/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
