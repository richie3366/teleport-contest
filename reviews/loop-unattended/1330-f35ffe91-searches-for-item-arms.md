# Review 1330 — f35ffe91 — searches_for_item onscary/horn/unicorn arms (D-2364)

Metadata: SHA `f35ffe91`, `js/muse.js` only (+23/−~10). No new modules
or edges (all three names ride pre-existing imports, runtime-only reads
in the function body). D-log: D-2364, map-named row, 0 blocked.

## Intent vs deliverable

Subject promises three latent C-wrongs in otherwise-live
`searches_for_item`: missing floor-`onscary` protect gate, horn
`can_blow` mouth check, unicorn `likes_gems` conjunct; FOOD
corpse/tin/egg arms verified unchanged. Diff changes exactly those
three predicates and retires the three deferral notes. Matches.

## Inventory

- `searches_for_item` — three predicate fixes (one function). No new
  helpers, no clones, no stubs.

## C ↔ JS fidelity

Vs C `muse.c:2705–2792` (body re-read above): floor gate
`where==FLOOR && ox==mx && oy==my && onscary(...) → FALSE` now exact
(the old code evaluated the position without `onscary` and fell
through — a genuine C-wrong, fixed in C conjunct order) ✓; horns
`spe > 0 && can_blow(mon)` ✓; unicorn `!cursed &&
!is_unicorn(mon->data) && data != &mons[PM_KI_RIN]` ✓ with `mndx !==
PM_KI_RIN` as the pointer comparison. `is_unicorn` (`monsters.js:466`)
re-verified ≡ C `mondata.h:149` (`mlet == S_UNICORN &&
likes_gems(ptr)`). Branch-by-branch confirm on the changed arms; the
untouched WAND/POTION/SCROLL/AMULET/container/camera/FOOD arms were
already live per the retired docstring and are byte-untouched by this
diff.

Helper classification: `onscary` (`mon.js:331` sync), `can_blow`
(`mondata.js:734` sync), `is_unicorn` (`monsters.js:466` sync) — all
LIVE pre-existing imports (lines 26/34/52); this SHA adds zero clones
(the `sym.mjs` "2 LOCAL CLONES" notes for `is_unicorn`/`onscary` are
pre-existing drift in apply/trap/music/teleport, untouched here). No
stub in a live arm; docstring now claims "No named omissions in this
body" for the ported envelope. Confirm.

## Hallucinations / overclaim

None. "Named: none new" is accurate — the container/polymorph idioms
cited as standing were verified untouched by the diff.

## Density

~23 lines, one function — minimal and exactly the C locus. Acceptable.

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify searches_for_item --base f35ffe91~1` → `0
  blocked (0 at baseline, 0 working)` — vacuous as disclosed; row cited
  0 blocks. Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn searches_for_item` →
  VERIFY: PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
