# Review 987 — e6c464a4 — newmonhp rider + home-elemental arms (D-2017)

Metadata: SHA `e6c464a4`, D-2017, Open-row port (queue row
`makemon.c` newmonhp, 4 sessions). js/ touches 1 file
(`js/makemon.js`, +6/−1: rider arm + elemental boost). No
stamp owed.

## Intent vs deliverable

Subject promises: Riders drew `d(29,8)`, C draws `d(10,8)`,
plus the home-elemental ×3. Diff actually adds: `else if
(is_rider(ptr))` with `basehp = 10; d(basehp, 8)` and `if
(is_home_elemental(ptr)) mon.mhpmax = (mon.mhp *= 3)`.
Promise == diff.

## Inventory

- Changed JS function: `newmonhp` two arms only
  (`js/makemon.js:910`, `:930`).
- New helpers: none. No deleted symbols — no `sym.mjs` delete
  audit required. No STUB/clone/no-op, no new imports
  (`is_rider` already imported from `./monsters.js:904` at
  line 78; `is_home_elemental` same-file at `:500`; `d`
  pre-used — `--can` rightly unneeded). (The `is_rider`
  clone in `mkobj.js:735` and `is_home_elemental` clones in
  `mon.js`/`teleport.js` are pre-existing elsewhere; this
  commit uses the import and the same-file def.)
- Named: none new — `newmonhp` is now complete vs C (all six
  arms + boost); the stale `monhp_per_lvl` doc line is
  pre-existing, untouched.

## C ↔ JS fidelity

C locus: `makemon.c:1010–1054`. Arm-by-arm confirm: rider
branch sits in exact C position (golem → rider → mlevel>49)
✓ with `basehp = 10` feeding both `d(basehp, 8)` and the
trailing `mhpmax == basehp` boost exactly as C ✓;
`is_home_elemental` boost is verbatim `mon->mhpmax =
(mon->mhp *= 3)` including the `leave 'basehp' as-is`
comment ✓. Untouched arms (golem, mlevel>49 incl. `m_lev =
mhp/4`, adult-dragon `In_endgame` two-shape, `!m_lev`
`rnd(4)`, generic `d(m_lev,8)`, boost) already matched.
RNG call-for-call: rider path draws `d(10,8)` where both
sides now enter the same arm (was generic `d(29,8)` from
Rider `adj_lev` m_lev) ✓.

## Hallucinations / overclaim

None. The unchanged session (Caveman-92118, still
newmonhp@97, adult-vs-baby dragon = different *mndx
input*) is disclosed as the `pick_nasty` juvenile-gate
mechanism with C cites (`wizard.c`, `monsters.h`) and its
own Open row — which is live in the queue today. Not swept
under PROGRESS.

## Density

+6/−1 is thin, but it is the documented exception: the
remaining C delta was 6 lines and the commit completes the
function (last named omission removed). No padding added.

## Verification

Re-measured myself: `hidden-proxy verify newmonhp --base
e6c464a4~1` → `0 PASS, 3 moved past, 1 unchanged, 0 worse →
PROGRESS` (91118 → use_pole@87; 92149 → mhitm_ad_were@41;
92067 → exercise@140; 92118 still newmonhp@97 with the
disclosed dragon toplines) — identical to the D-log. Plus
cited green 2/2 + strict ×2, cohort 7/7, full 44/44 (shared
file changed). js/ hunk grep: no `FORCE`/`DIAG`/
`getRngLog`/seed/coordinate/`fastforward` (sole hit is the
message quoting Rule #2). Rule #2 clean.

## Actionable C-wrongs

None in this delta (the pick_nasty residual already has its
own Open row).

Verdict: **ACCEPT**
