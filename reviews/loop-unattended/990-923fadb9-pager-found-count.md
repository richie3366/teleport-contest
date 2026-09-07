# Review 990 — 923fadb9 — pager describe_looked self '@' found-count (D-2020)

Metadata: SHA `923fadb9`, D-2020, closes review 983's
C-wrong 1 (the dropped count half). js/ touches 1 file
(`js/pager.js`, +5/−4: `found: orYou ? 2 : 1` + comment).
Stamps `**Addressed:** D-2020` on review 983 in-SHA
(`983-…md` +2) with archive row — stamp owed and paid.

## Intent vs deliverable

Subject promises: C `found += append_str("you")` moves
found 1→2, skipping checkfile; JS kept 1 and prompted for
more info on verbose self-look. Diff actually adds: exactly
that ternary plus a comment citing the `append_str` return-1
and `:1941`. Promise == diff. One JS function, one C
statement.

## Inventory

- Changed JS function: `describe_looked` self branch only
  (`js/pager.js:1469`); `wishymatch` untouched.
- New helpers: none. No deleted symbols — no `sym.mjs`
  delete audit required. No STUB/clone/no-op.
- Callee closure: no new imports (PM consts / `Upolyd`
  already module-local); the race gate is D-2013's verbatim
  arm, this SHA only finishes its count half.
- Named omits kept: checkfile LOOK_VERBOSE
  `chkfilDontAsk` vs `chkfilNone` flags, LOOK_QUICK /
  LOOK_ONCE, `clicklook`, supplemental-info (pre-existing
  caller simplifications at `pager.js:1985–1991`,
  untouched — Must-fix stays one item, alone); rest of the
  self branch (invisible / swallowed re-modeling) stays as
  D-2013 left it.

## C ↔ JS fidelity

C loci, read directly: `pager.c:1346–1353`

```
if ((looked ? (sym == gs.showsyms[S_HUMAN + SYM_OFF_M]
               && u_at(cc.x, cc.y))
            : (sym == def_monsyms[S_HUMAN].sym && !flags.showrace))
    && !(Race_if(PM_HUMAN) || Race_if(PM_ELF)) && !Upolyd)
    found += append_str(out_str, "you"); /* tack on "or you" */
```

`append_str` at `pager.c:82–104` returns 1 on append (0
only when `strstri` already finds the string or the buffer
is full), so C `found` goes 1→2. Consumer at `pager.c:1941`:

```
if (found == 1 && ans != LOOK_QUICK && ans != LOOK_ONCE ...
```

which C now fails (found 2) and skips checkfile. JS after
this SHA:

```
return { out, first, found: orYou ? 2 : 1 };
```

with `orYou` the D-2013 race gate. Branch-by-branch
confirm: gate verbatim ✓; count 1→2 exactly when `orYou`
is set ✓; caller `found === 1` gate present at
`pager.js:1986` ✓. Mechanism (D-log measured): verbose
(`:`) self-look as dwarf/gnome/orc with help on — JS called
`checkfile(self_lookat-string, 0)` where C calls nothing,
producing the `More info about "dwarven archeologist"?` yn
prompt. One theoretical edge, not charged: C `append_str`
returns 0 when "you" already occurs in the buffer — JS
assumes 1. The buffer at that point holds the `@ …
(first)` self string, which cannot contain "you" on any
hero path; unreachable in practice.

## Hallucinations / overclaim

None. D-log explicitly calls the hidden verify vacuous
(0-blocked row, no `--base` owed) and proves the one
scoreboard working-tree delta pre-existing via stashed
replay (scen-normal-Caveman-92006 scrM 82→83 reproduces
with the fix stashed; human hero → `orYou` is `''`,
no-op). No "Match C" claim beyond the one line.

## Density

One C statement, one JS line. Right-sized — this is the
second half of review 983's arm, split only because 983
shipped the string without the count.

## Verification

Re-measured myself:

```
node scripts/hidden-proxy.mjs verify describe_looked --base 923fadb9~1
→ 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
→ "a vacuous verify is NOT a corpus PASS"
```

Vacuous-confirm, matching the D-log word for word. js/
hunk grep: no `FORCE` / `DIAG` / `getRngLog` / seed /
coordinate / `fastforward` (the only digit-hits are the
commit message quoting its own Rule #2 line). Rule #2
clean (re-ran `imports.mjs --rulecheck`). Cited green 2/2
+ strict ×2, cohort 7/7 — the inline dwarf/human/elf
probe covers both ternary arms.

## Actionable C-wrongs

None. Review 983's C-wrong 1 is closed by this SHA.

Verdict: **ACCEPT**
