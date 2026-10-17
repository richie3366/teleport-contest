# Review 2908 — 662fc386f — confuse-monster altfeedback via canonical Invis

- SHA: `662fc386f` (cliff writer: dead-flat Invisible read,
  2 of 6 sessions)
- D-entry: D-4069; Ledger: read.c
  (`seffect_confuse_monster ported`, +D-4069 tag)
- `js/` diff: `js/read.js` +6/−3 (hoisted altfeedback +
  import extension), `js/timeout.js` +3/−1 (one `export`
  keyword + comment); new
  `scripts/seffect-confuse-monster-invisible.test.mjs`

## Intent vs deliverable

Promise: replace the three `Blind || !!u.Invisible`
reads (dead flat, no writer) with one hoisted
`Blind || (Invis() && !See_invisible())` per C :1404;
Caveman FULL PASS, Rogue 1060→nohandglow@1115. The diff
is exactly that hoist plus the import extension and the
`See_invisible` export. Promise = diff.

## Inventory

- `seffect_confuse_monster` (read.js:1475–1478): hoisted
  `const altfeedback`; three inline sites (:1490/:1497/
  :1506) now read it. C: read.c :1399–1451, :1404.
- Import: `Invis` + `See_invisible` appended to the
  existing `./timeout.js` line (read.js:184) — names
  only, zero new module edge.
- `See_invisible` (timeout.js:1767): `function` →
  `export function` + 2 comment lines. Zero behavior
  change by construction.

No deleted symbols, no re-pointed clones — step-3 paste
not triggered. Both callees LIVE exports, sync,
draw-free (pure flat/uprops reads — hoist-safe).

## C ↔ JS fidelity

Confirmed against pinned C:

- C :1404 `altfeedback = (Blind || Invisible)`,
  computed once at declaration before all uses; C
  `Invisible (Invis && !See_invisible)` (youprop.h:199)
  over `Invis ((HInvis‖EInvis) && !BInvis)` (:198) and
  `See_invisible (H‖E)` (:150–152). JS
  `Blind || (Invis() && !See_invisible())` is the
  macro expansion in C order. `Invis()` (:1758–1764)
  matches :198 exactly incl. the `!BInvis()` conjunct;
  `See_invisible()` adds the `u.See_invisible` flat to
  H/E/uprops — the codebase-wide house idiom (same
  disjunct in apply/display/eat/makemon/mcastu/mhitm/
  muse/polyself; written by potion.js:487/492) and
  pre-existing here — only the `export` is new.
- Dead-flat claim verified: `grep u.Invisible` over
  `js/` finds only the new comment; `\.Invisible\s*=`
  finds zero writes. Both probes quaffed invisibility
  (s1191/s622, no wear-off), so C-Invisible TRUE →
  tingle, JS-flat FALSE → glow — the mechanism is
  complete and the direction matches.
- "Otherwise whole" re-verified arm-by-arm: mlet/cursed
  :1407 (:1485–1488), confused tingle/glow-purple
  :1412–1417 (:1489–1495), blessed buzz/glow-red
  :1418–1425 (:1496–1503), unconfused tingle/glow/
  intensifies :1432–1439 (:1505–1513), blessed
  sharply/brilliant :1440–1446 (:1514–1519), umconf cap
  :1448–1450 (:1520–1521) — messages, branch order,
  and rnd(100)/rnd(2)/rn1(8,2) placement all exact.
- The kept `Blind` hand-roll is pre-existing,
  untouched, and explicitly disclosed (FALSE both
  sides here — the divergence itself proves JS-Blind
  FALSE; C-Blind FALSE per the non-:599 doread path).
  Canonical-switch unproven; D-4012 precedent cited.
  Not a C-wrong.

## Hallucinations / overclaim

None. The 4 no-movement sessions are not NO-MOVEMENT-
as-omission: my re-run shows all four with
byte-identical C/J toplines (light/mapping seffects —
different C functions the shipped arm cannot execute),
while the shipped pair diverged on the confuse-monster
topline. Different symptom channel + different writer
+ geom-probed 5-cell content diff = a genuine second
row, correctly split with its own future deliverable.
The seffect_confuse_monster vacuity (0 blocked) is
stated as a writer-note, not a PASS.

## Density

Cliff writer, rank 26, first actionable in committed
order (ranks 1–21 re-verified live: 18 recipes ×2
msg_window + 95340 marker + fresh D-4064/D-4065 parks;
ranks 22–25 re-measured stale with exact totals, not
assumed). Owner doread → writer seffect_confuse_monster
via stepFns RNG evidence. One `Ledger:` entry, verified.
Omissions (1)–(3) named in-commit; (2) even pre-names
the next suspect class (flats-only Invisible_you at the
new owner). No unreached work.

## Verification

Re-measure (`--base 662fc386f~1 --no-reach`):

```text
verify doread: 1 PASS, 1 moved past, 4 unchanged, 0 worse → PROGRESS
  scen-sweep-Caveman-50055067: PASS
  scen-sweep-Rogue-620093: moved → nohandglow at step 1115 (was 1060)
  4× still doread at 565/614/363/203 (identical toplines both sides)
verify seffect_confuse_monster: no corpus session is blocked (vacuous, disclosed)
```

Exact match. Focused test 2/2 green on HEAD. No
FORCE/DIAG/seed/coords in the `js/` hunks. Rule #2 clean
(window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
