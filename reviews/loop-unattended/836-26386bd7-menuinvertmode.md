# Review 836 — 26386bd7 — options.c menuinvertmode default 1 (D-1866)

Metadata: SHA `26386bd7`, D-1866, `js/jsmain.js` (+6/−1, iflags default),
`js/options.js` (+9, rc arm), map + queue/archive stamps. Also rewrites
`hidden-corpus/scoreboard.json` (sanctioned verify-baseline flow).

## Intent vs deliverable

Subject promises the `menuinvertmode` default-1 fix for the `menu_remarm`
corpus owner. Diff delivers exactly the two halves: default in `g.iflags`
init (rc spread still overrides) and `OPTIONS=menuinvertmode:N` parsing.
Matches.

## Inventory

Changed: iflags literal in `NethackGame` init; one new `else if` arm in
`parseNethackrc` colon-compound chain. No new functions, no deleted symbols,
no new imports. No `sym.mjs` deletion check needed.

## C ↔ JS fidelity

C locus 1 — `options.c` `initoptions_init` (~`:7279`):
`iflags.menuinvertmode = 1;` with the comment block stating mode 1 is the
default (0 = ignore skip-invert "used to be the default"). Confirmed by
reading the source. JS sets `menuinvertmode: 1` before `...opts.iflags`,
so rc overrides — correct precedence.

C locus 2 — `optfn_menuinvertmode` (`options.c:2289–2317`, via csym):
do_set does `atoi(op)`, range-errors (prior kept) unless 0–2. JS does
`parseInt(val, 10)`, sets only on 0/1/2, otherwise keeps prior — same
outcome including the empty/garbage-op case (NaN → keep). C marks `negated`
UNUSED (negation has no effect on the stored value); JS `if (negated)
continue` also keeps prior — same observable outcome. The arm sits in the
colon-compound chain with the same shape as the neighboring `msg_window`
arm — convention-consistent; the `=`-form gap is named, not hidden.

Why the default matters: `menuitem_invert_test` (`js/options.js:1809`,
body already C-matched to `windows.c:1561–1589` — verified the C:
mode 1 + SKIPINVERT + unselected → FALSE) reads
`game.iflags?.menuinvertmode | 0`. With the key absent that was mode 0
("ignore skip-invert"), so MENU_SELECT_PAGE wrongly selected the
SKIPINVERT `a` row (`do_wear.c:3098–3112` adds it with
`MENU_ITEMFLAGS_SKIPINVERT`). Mode 1 now skips it — cause chain
C-cited end to end. No RNG involved; branch order N/A (declarative default).

## Hallucinations / overclaim

None. "1 PASS + 1 moved past to a later owner" names the new owner
(`process_menu_window` step 838) with a Next row — a real later-owner move,
not a disguised stall.

## Density

~17 JS lines for a one-default + one-optfn-arm locus. Below the usual
~40-line floor, but C is genuinely that small — the playbook's explicit
exception. Paired with full-suite 44/44 (shared-file change forced it).

## Verification

Re-ran `hidden-proxy.mjs verify menu_remarm --base 26386bd7~1` myself:
`2 blocked at baseline → 1 PASS (288b93d0), 1 moved past
(process_menu_window step 838, was 828) → PROGRESS`. D-log claim true.
Green 2/2 + strict ×2 + cohort 7/7 + full 44/44 per D-log (shared file
changed, so full ran — correct). `imports.mjs --rulecheck` clean (re-ran
in this iteration). No FORCE/DIAG/seed/coordinate hits in the diff.

## Actionable C-wrongs

None. Named omits live in the commit message + map (`doset` Comp row,
`=`-form, count-prefix/MENU_SEARCH under D-0928) — correct placement,
not Must-fix.

Verdict: **ACCEPT**
