# Review 2104 — dbe017e06 — cmd.c there-menu trio (next2u + far + whole restart)

- SHA: `dbe017e06e7e7831f6e7f0c4` (D-3144)
- Parent: `990da2b8d`
- Files: `js/cmd.js` (+159/−106 incl. shim deletion); docs + ledger otherwise
- Cluster: 2 new builders + 1 whole-menu restart + 1 macro local + 1 shim deletion, one C file

## Intent vs deliverable

Subject promises: "next2u + far builders, whole-menu restart".
Diff actually adds: local `next2u`, `there_cmd_menu_next2u`, `there_cmd_menu_far`, the restarted
`there_cmd_menu` (K==0 fallback, K==1 fast path, PICK_ONE), import-name additions, and the
`act_on_act_here` deletion with both pick sites rewired to live `act_on_act`. Promise matches.

## Inventory

| JS function | kind | C locus (csym) |
|---|---|---|
| `next2u` (macro local) | new | you.h:558 (`distu <= 2`), distu = dist2 (hack.h:1531) |
| `there_cmd_menu_next2u` | new local (C staticfn) | `cmd.c:4523–4621` |
| `there_cmd_menu_far` | new local (C staticfn) | `cmd.c:4623–4636` |
| `there_cmd_menu` (restart) | C staticfn | `cmd.c:4841–4896` |
| `act_on_act_here` | interim shim DELETED | superseded by live `act_on_act` (D-2620, cmd.js:2786) |

Required `sym.mjs`: `act_on_act_here NOT FOUND in js/**` — clean deletion, sole caller was the
menu. All builder callees are live exports, awaited where async (`test_move` ASYNC ✓);
`u_at`/`has_mgivenname`/`W_SADDLE`/`D_ISOPEN`/`NO_GLYPH`/`objnum_to_glyph` on existing edges.

## C ↔ JS fidelity

**next2u** — confirm: `dist2(x, y, u.ux, u.uy) <= 2`, squared (hacklib.js:23–24), no isok guard —
exactly the macro.

**there_cmd_menu_next2u** — confirm arm-by-arm in C order: early `!next2u → K` (`:4536–4537`);
door arm with `D_CLOSED|D_LOCKED` → OPEN + lock/unlock (`upstart("lock or unlock…")` ≡
Sprintf+upstart `:4550–4552`) + UNTRAP_DOOR + KICK_DOOR, `D_ISOPEN && CLICK_2` → CLOSE (`:4539–4561`);
`typ <= SCORR` → SEARCH (`:4565–4566`); trap arm with tseen + VIBRATING_SQUARE gate + MOVE_DIR
(`:4568–4573`); boulder via `remembered_glyph.glyph` (detect.js:356 documents "JS levl glyph is
loc.remembered_glyph", NO_GLYPH fallback mirrors :362–363) vs `objnum_to_glyph(BOULDER)` (`:4576`);
m_at + canspotmon-null (`:4579–4581`); saddle arm with `x_monnam(…, ARTICLE_THE, null,
SUPPRESS_SADDLE, false)` + usteed-gated RIDE + REMOVE_SADDLE (`:4582–4591`); can_saddle arm
(`:4593–4596`); peaceful/tame TALK + swap + NAME/Rename (`:4598–4608`); attack arm with
`glyph_is_invisible_id(glyph_at())` ≡ C `glyph_is_invisible` (both `== GLYPH_INVISIBLE`,
display.h:773) and the sole `actOut.act` write (`:4611–4616`); else-comment + `return K`. No RNG.

**there_cmd_menu_far** — confirm: CLICK_1 gate, `linedup(ux, uy, x, y, 1)` (5th param ≡ C
boulderhandling, mthrowu.js:303) + `dist2 < 18*18` → THROW_OBJ, then TRAVEL (`:4628–4633`).

**there_cmd_menu** — confirm: raw (non-sgn) dx/dy (`:4850`, the sgn line is commented out in C);
self/next2u/far dispatch + common (`:4856–4862`); K==0 fallback with awaited `test_move` →
`move_funcs_walk[dir]` (pre-existing xytodir-order array, cmd.js:2768, same rows as
`move_funcs[dir][MV_WALK]`) else `(flags.travel ?? true)` (in-file travelcmd mapping with optlist
default On, cmd.js:2663 precedent) → travelcc/tx/ty + dotravel_target (`:4864–4876`); K==1 with
`act !== NOTHING && act !== TRAVEL` → `act_on_act` + early `'\0'` (`:4877–4881`); PICK_ONE with
`ch = '\x1b'` and pick→pickAct (`:4882–4889`); `pickAct → act_on_act → '\0'`, else `ch` (`:4888–4895`).
C passes `&act` to self/next2u/common, JS passes actBox only to next2u — faithful: self and common
declare `int *act UNUSED` (verified in both csym bodies); only next2u `:4616` writes it.

**Callers:** next2u ← `:4859`, far ← `:4861` (sole callers verified via `--callers`); menu ←
`:4901` here_cmd_menu (JS cmd.js:3297, pre-existing wiring, unchanged) + `:4356`/`:4370`
dotherecmdmenu (NOT FOUND in JS — named omission, correct: caller fn unported).
Edge note: the message calls worn/mthrowu "new SAFE" edges; `--can` reports ALREADY (names on
pre-existing edges) — the safety conclusion holds more strongly than claimed.

Grep: no FORCE/DIAG/getRngLog/seed-gates/fastforward/coords. Rule #2: clean (see 2096).

## Hallucinations / overclaim

None. The "no wired caller" statement about `act_on_act` (D-2620 doc) is resolved by this SHA —
both C call sites (`:4880`, `:4892`) are now wired, and the doc line was updated.

## Density

Breadth-phase cluster: 3 whole C functions + 1 macro + 1 deletion, one C file, 265 js changed
lines. Within §2b. Each function has its Ledger entry and Verify line. Per-function verdicts: all
ACCEPT.

## Verification

Re-measured: `hidden-proxy.mjs verify there_cmd_menu_far,there_cmd_menu_next2u,there_cmd_menu
--base dbe017e06~1 --reach-all` → all three `0 blocked` + `smoke 24 PASS, 0 regressed → REACH-OK`.
No REGRESSED. Matches D-3144.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
