# Review 1533 — 8d3ce13a — light.c del_light_source (D-2574)

## Metadata

- SHA: `8d3ce13a`
- D-id: D-2574. Next index: 1533.
- Files:
  - `js/light.js` (+88/−10: restarted `del_light_source`, new file-local
    `delete_ls`, `LSF_NEEDS_FIXUP` const, `LS_NONE`/`fmt_ptr` import joins).
  - `js/const.js` (+4/−3: LS_OBJECT 0→1, LS_MONSTER 1→2 with vision.h cite).
  - `js/mkobj.js` (+3/−1: `fmt_ptr` promoted to export).
- C locus:
  - `nethack-c/upstream/src/light.c:97–138` (`del_light_source`).
  - `nethack-c/upstream/src/light.c:141–165` (`delete_ls`, staticfn).
  - `nethack-c/upstream/include/vision.h:16–18` (LS tag values).
  - Both bodies via `node scripts/csym.mjs` (ranges cited above).

## Intent vs deliverable

Subject promises:

> `light.c` del_light_source whole-body port (type switch, delete_ls,
> C-valued LS tags) (D-2574).

Diff delivers exactly that:

- restarted body with `:line` cites,
- file-local `delete_ls`,
- vision.h-valued constants,
- `fmt_ptr` export.

Promise matches deliverable. No scope creep, no second subsystem.

## Inventory

- New/changed functions:
  - `del_light_source(type, id)` — exported, `js/light.js:114`.
  - `delete_ls(ls)` — file-local, `js/light.js:89`. Correct: C is
    `staticfn`; `sym.mjs` reports a single local, no clone #2.
  - `LSF_NEEDS_FIXUP` — file-local const, `js/light.js:36`.
  - `fmt_ptr` — promoted to export, `js/mkobj.js:1585`. `sym.mjs`
    reports a single export; it was the sole definition, so this is a
    promote-not-clone.
- Required `sym.mjs` output (nothing deleted or re-pointed except the
  export promotion above; pasted here):
  - `fmt_ptr js/mkobj.js:1585 sync`
  - `del_light_source js/light.js:114 sync`
  - `delete_ls NOT EXPORTED — but 1 LOCAL CLONE(S): js/light.js:89`
    (correct single local for a C staticfn).
- Import joins (required `--can` output):
  - `imports.mjs --can light.js mkobj.js fmt_ptr` →
    `ALREADY: light.js already statically imports mkobj.js.`
  - No new module edge.
- Callees: `impossible` (live), `fmt_ptr` (live, same commit).
- No RNG in either C function and none added.
- No deleted symbols.

## C ↔ JS fidelity

C `del_light_source` (`:97–138`), arm by arm:

- `:103` union init — JS comment cites it; `monst_to_any` is identity so
  the raw obj/mtmp arrives; `{ a_obj / a_monst }` handles are unwrapped.
- Switch:
  - LS_NONE (`:109–112`): impossible + key 0. JS matches.
  - LS_OBJECT (`:113–115`): `id->a_obj ? o_id : 0`. JS matches.
  - LS_MONSTER (`:116–118`): `id->a_monst->m_id`. JS uses
    `id_monst?.m_id | 0` — one benign delta: C would fault on null
    (NONNULLARG2) while JS yields 0. Safe direction, unreachable via
    typed callers.
  - default (`:119–122`): key 0. JS matches.
- Scan (`:125–131`): type gate, then identity — or the `o_id` key under
  FIXUP. JS matches. Union-slot subtlety handled right: C always
  compares the `a_obj` slot (raw pointer bits for monsters); JS compares
  `cand.id === want` with `want = id_monst` on the monster arm — same
  identity. Fixup path compares numeric `o_id` both sides.
- Not-found arm (`:135–137`): `impossible` + `fmt_ptr(id_obj)`. JS
  matches.
- `delete_ls` vs `:141–165`:
  - prev/curr unlink walk → `splice`. Match.
  - `vision_full_recalc = 1`. Match.
  - memset + free = GC drop. Match.
  - not-found impossible. Match.
- Both impossibles stay fire-and-forget `void` per the cited mkobj/mon.js
  precedent — consistent with the file's sync light path. No caller
  signature changed.

Const fix verified independently (not trusted from the subject):

- `vision.h:16–18` reads LS_NONE 0, LS_OBJECT 1, LS_MONSTER 2.
- The old JS (0/1) collided OBJECT with NONE. Now C-valued.
- All in-tree uses grepped symbolic (`timeout.js`, `polyself.js`,
  `mkobj.js`, `mhitm.js`, `mklev.js`, `dog.js`, light.js internals) —
  no numeric literals, so the renumber is safe.
- `LS_NONE` was already exported (`const.js:1074`).

Callers (C lists 14 sites; JS coverage checked):

| C site | JS wire |
|--------|---------|
| timeout.c ×3 (489/1816/1837) | timeout.js:819 + :1651 |
| polyself.c ×2 (724/1394) | polyself.js:1049 |
| mkobj.c:2778 | mkobj.js:1152 + :3303 |
| mhitm (mx light) | mhitm.js:3359 |
| mklev (vibrasquare) | mklev.js:19152 |
| dog.c (985) | dog.js (imported) |
| mon.c ×3, sp_lev.c:2104 | ride the unchanged export (signature kept) |

No rewiring was owed: the export name/signature predates this commit.

## Hallucinations / overclaim

None. The D-log names the FIXUP-producer gap and the replmon light-swap
gap as named omits with the map pointer instead of claiming them live.

## Density

~95 `js/` insertions for one C function + its staticfn + a 2-line const
correction — one function family, right size (§2b).

## Verification

- D-log Verify bullet claims `verify.mjs --fn del_light_source` → PASS
  with 24-session smoke REACH as the corpus evidence (0 blocked at
  baseline — honestly stated as a coverage row, not a corpus PASS).
- Re-ran here (required):
  - `hidden-proxy verify del_light_source --base 8d3ce13a~1 --reach-all`
  - → 0 blocked at baseline and working tree (vacuous note, expected)
  - → smoke 24 PASS, 0 regressed → REACH-OK.
- Claim confirmed, not vacuous-by-rewrite.
- `imports.mjs --rulecheck`: clean (run this iteration).
- Grep of the diff: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`
  content.

## Actionable C-wrongs

1. **D-2574 regresses scen-poly-Rogue-92026 (step 164, owner rehumanize polyself.c:1395).** The audit full re-score (`hidden-proxy.mjs score`, 494/540 vs 497/540 at window start) plus worktree bisection (PASS on js@bb229073 with 3094/3094 RNG + 266/266 screens; FAIL on js@8d3ce13a) prove this SHA flipped it. Mechanism: at rehumanize time the youmonst LS_MONSTER entry is absent from JS `light_base`, so the new not-found arm fires `impossible('del_light_source: not found type=2, ...')`, and that pline displaces C's `It hits! You return to human form!...` message line → screen FAIL. Pre-D-2574 the silent identity-only body skipped invisibly (stale PASS). The message itself is correct C behavior (`:135–137`) — the bug is the missing entry: either the polymorph path never attached the youmonst light (`new_light_source` on polyself) or it holds a stale object identity the `===` scan misses. Fix the entry, never silence the arm.

## Audit re-score correction (2026-09-19, post-review)

The per-SHA `verify --reach-all` above was clean only because
`del_light_source` draws no RNG: Rogue-92026 was a baseline-PASS session
the reach set never re-ran (smoke-only), carrying a stale PASS in every
committed scoreboard of the window. The audit's full `score` re-ran it
and exposed the flip. Lesson: non-RNG functions with new plines need a
screen-cohort re-run, not just smoke.

Verdict: **QUALITY-RISK**

**Addressed:** D-2583
