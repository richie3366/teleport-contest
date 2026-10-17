# Review 2918 — 72455a58c — breamm joins the live gb.buzzer channel

- SHA: `72455a58c` (bg_enlightenment S3/S4 +
  2 zhitu tombstone kin: dead buzzer field)
- D-entry: D-4080; Ledger: mthrowu.c
  (`breamm ported`)
- `js/` diff: `js/mthrowu.js` +4/−2 (two
  writes renamed `game.buzzer` →
  `game._buzzer` + C cite); new
  `scripts/breamm-breath-buzzer.test.mjs`

## Intent vs deliverable

Promise: breamm's breath wrote the field
nothing reads while zhitu renders "exhaled
by \<mon\>" from `game._buzzer`; one rename
heals 4 sessions (2 enlightenment + 2
zhitu). The diff is exactly the two renamed
writes. Promise = diff.

## Inventory

- `breamm` (mthrowu.js:504–520): set/clear
  around dobuzz renamed to `game._buzzer`;
  try/finally kept. C: mthrowu.c :1115–1135.
- No import changes, no new helpers. No
  deleted symbols — step-3 paste not
  triggered.

## C ↔ JS fidelity

Confirmed against pinned C:

- mthrowu.c:1122 `gb.buzzer = mtmp;` →
  dobuzz → :1126 `gb.buzzer = 0;` ✓ —
  set/clear shape matches, including the
  breathwep pline above.
- zap.c:4572 `type == 0 && gb.buzzer` →
  death_inflicted_by + "inflicted"→verb
  subst ✓; JS zhitu (zap.js:2293–2297)
  reads `game._buzzer` in the same guard.
- Channel audit (whole-file grep): writers
  mcastu.js:1107/1111, muse.js:1037–1073,
  now mthrowu.js; readers muse.js:789,
  zap.js:2293–2297 — all `game._buzzer`.
  Nothing reads the no-underscore field
  after this commit: priest.js:403–409 is
  a self-contained save/clear/restore,
  timeout.js:1630 a lone clear.
- Named (3) cites verified: priest.c:868–871
  oldbuzzer save/restore around buzz ✓;
  timeout.c:1871 `gb.buzzer = 0` before buzz
  ✓. Both target the same C field zhitu
  reads but the dead JS field — pre-existing
  (zhitu already read `_buzzer` before this
  commit), explicitly named with cites and
  one-cause scope. Not this commit's wrong;
  no session evidence either way.
- No RNG in the changed lines (field
  assignment only); the 4 heals are
  value-only (killer-line text → disclosure
  centering).

## Hallucinations / overclaim

None. Both no-movement residuals (S1 map-E,
Valkyrie disintegration arm) are named as
own-future-row with stepFns/C-vs-JS quotes,
not waved away.

## Density

One cause, two owner rows, 4/6 → PASS with
the 2 residuals named. One `Ledger:` entry.
Full gates in-commit (cohort 7/7; mthrowu.js
not shared-flagged but green+strict+reach
all present). No unreached work.

## Verification

Re-measure (`--base 72455a58c~1 --no-reach`):

```text
verify background_enlightenment: 3 PASS, 0 moved past, 0 unchanged, 0 worse
verify zhitu: 2 PASS, 0 moved past, 1 unchanged (Valkyrie-587104 s634), 0 worse
verify breamm: no corpus session is blocked (vacuous, disclosed)
```

bg_enlightenment reads 3 PASS vs the D-log's
in-commit 2+1: the third (questtour-Monk-
50557003) healed under a later window SHA —
scoreboard-proven (`ac8e66b73` flips it
false→true; D-4083 "S1 FULL PASS"). This
SHA's 2 + zhitu's exact 2+1 both reproduce.
No FORCE/DIAG/seed/coords in the `js/`
hunk. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
