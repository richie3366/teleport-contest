# Review 1405 — 232ff9b1 — insight.c mstatusline whole body (D-2446)

- Commit: `232ff9b1` — "`insight.c` mstatusline whole body in C order (coverage THIN → live) (D-2446)."
- Files: `js/insight.js` (+161/−42 restart), `js/worm.js` (+24:
  `wseg_at`), `js/apply.js` (+6 caller); docs + map + queue pop.
- D-log: D-2446. Queue row popped: mstatusline THIN (C 123 L).

## Intent vs deliverable

Subject promises whole `mstatusline` (`insight.c:3275–3398`) in C
order. Diff delivers the full arm chain plus the `wseg_at` callee
and the apply.js `bhitpos`/`notonhead` caller setup. Promise kept.

## Inventory

New/changed JS: `mstatusline` restart (`js/insight.js:1259–1363`),
fixed locals `size_str`/`mon_aligntyp`, new `wseg_at`
(`js/worm.js:142`), apply.js stethoscope setup. No symbol deleted;
re-pointed `x_monnam_tame` → `x_monnam` in insight.js only (old
helper still live in do_name, used by detect/uhitm — no dangling).
Required `sym.mjs` output (paste): `wseg_at js/worm.js:142 sync`,
`count_wsegs js/worm.js:126 sync`, `ordin js/hacklib.js:294 sync`
(insight imports the export; the flagged clone is pre-existing in
dothrow.js), `EPRI js/const.js:3131 sync`. Every import hunk extends
a pre-existing edge (hacklib/do_name/mhitu/worm/polyself/const).

## C ↔ JS fidelity

C loci via csym: `mstatusline :3274–3398` (125 lines),
`mon_aligntyp priest.c:279–289`, `size_str insight.c:3202–3231`,
`wseg_at worm.c:945–965`. Branch-by-branch confirm:

- `mon_aligntyp` exact (EPRI shralign / EMIN min_align /
  maligntyp, A_NONE passthrough, sign map) — fixes the old
  priest/minion blindness ✓. `size_str` exact incl. `unknown size
  (%d)` default — fixes the old gigantic-collapse ✓
  (`MZ_GIGANTIC=7` per monflag.h:183).
- tame/wizard `(%d; hungry %ld; apport %d)` unless minion ✓;
  worm `++nsegs` head-inclusive + `wseg_at(bhitpos)` + ordin ✓
  (`wseg_at` body exact: m_at≡level_mon_at gate, wtails walk,
  n−i); shapechanger `ismnum(cham)` + mndx compare ✓; meating ✓;
  mhidden with MHID_ALTMON (correctly differing from
  look_at_monster's flags) on bhitpos coords ✓.
- ailments incl. `#else` can't-move arm live ✓ (makemon.js
  defaults mcanmove/mcansee to 1 verified — new arms stay quiet);
  scared/trapped/speed-ternary/invisible ✓; ustuck with the
  mstatusline-specific polarity (digests/is_animal+enfolds,
  sticks(youmonst), no Upolyd gate — correctly different from
  look_at_monster) ✓; usteed `EWounded_legs&BOTH_SIDES` +
  `mbodypart(mtmp, LEG)` + makeplural ✓; `, leashed` (no "to you")
  ✓; `x_monnam(ARTICLE_YOUR, null, SUPPRESS_IT|SUPPRESS_INVISIBLE,
  false)` exact ✓; pline format string exact ✓.
- Caller: apply.js sets `bhitpos`/`notonhead` per `apply.c:395`
  ahead of the call ✓; head-pos fallback only fires where C would
  read a stale-but-set bhitpos (documented, defensive).
- Banned-pattern grep: zero hits. No RNG in C body, none in JS.

Nits (not C-wrongs): `?? MZ_MEDIUM` / `EDOG() || {}` guards fire
only where C would fault — defensive, unreachable in play.

## Hallucinations / overclaim

None. "No TODO in a live arm" verified (no TODO added). The
caller-side deferral (`use_stethoscope` arms) is honestly named
with its turns.md row. No dispatch/callee split: all callees LIVE.

## Density

One C function + one callee + caller wiring, 3 files, +198/−42.
Right-sized.

## Verification

D-log: `verify.mjs --fn mstatusline` → PASS (syntax 3 files ·
rule2 · hidden note · smoke 24/24 · green · strict · cohort). My
re-run on this SHA:

- `hidden-proxy.mjs verify mstatusline --base 232ff9b1~1
  --reach-all` → "0 session(s) blocked on it (0 at baseline, 0 in
  the working scoreboard)" + "smoke mstatusline: no RNG-tagged
  reach; fixed smoke spread (24 run): 24 PASS, 0 regressed →
  REACH-OK". Vacuous but honestly logged; no REGRESSED session.
- Global `imports.mjs --rulecheck`: Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
