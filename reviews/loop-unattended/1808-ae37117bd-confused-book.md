# Review 1808 — ae37117bd — confused_book (D-2849)

- SHA: `ae37117bd` (coverage; `spell.c` `confused_book`)
- Files: `js/spell.js` (+62)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `confused_book`: `rn2(3)` always runs; a zero roll tears the book unless it is the Book of the Dead; any other roll, and that book, says the hero is rereading the next or the first line. `learn` calls it before clearing `spbook`. `study_book` calls it on the confused arm, clears `in_use` only when the book survives, then `nomul` of the delay. The diff is that function and those two call sites. Destruction uses `invent.js` `useup`, not the file-local clone.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `confused_book` | local async `spell.js:878` | `spell.c:189–207` (C `staticfn`) |
| `trycall` | LIVE `do_name.js:1694` | `spell.c:199` |
| `useup` | LIVE import `invent.js:4705` | `invent.c:1320–1333` |
| `flush_topl_more` | LIVE `display.js:7478` | `tty_display_nhwindow` message arm |
| `learn` | caller `spell.js:920` | `spell.c:369` |
| `study_book` | caller `spell.js:1183` | `spell.c:621` |

`sym.mjs` (nothing deleted; the new path imports `useup` rather than the local clone):

```
confused_book    NOT EXPORTED — local js/spell.js:878
trycall          js/do_name.js:1694   ASYNC — await required
useup            js/invent.js:4705   sync
                 (spell.js:630 clone remains; this call imports the export)
flush_topl_more  js/display.js:7478   ASYNC — await required
```

## C ↔ JS fidelity

`csym` body is `spell.c:188–207`. Callers: `:369` and `:621`.

`if (!rn2(3) && otyp != SPE_BOOK_OF_THE_DEAD)` (`:194`). The roll is the left operand, so it runs for the Book of the Dead too. A non-zero roll skips the `otyp` test. JS is the same `&&`. Tear arm: `in_use = TRUE`, the control `pline`, `display_nhwindow(WIN_MESSAGE, FALSE)`, the tear `You`, `trycall`, `useup`, `gone = TRUE`.

`tty_display_nhwindow` on `NHW_MESSAGE` (`wintty.c:1873–1880`) calls `more()` when `toplin == TOPLINE_NEED_MORE`, then clears the window. The `blocking` argument is not read in that case. `flush_topl_more` awaits `more()` on that same state and does not clear. The next `You` replaces the line, so the player still sees the control sentence, `--More--`, then the tear sentence. Named as the stand-in. There is no `display_nhwindow` symbol in `js/`.

`useup` (`invent.js:4705`) decrements `quan` or calls `useupall`. The file-local `useup` at `spell.js:630` stays on the older cursed-book path and still omits `useupall`. Named. This arm does not call it.

Else: `You("... the %s line ...", spellbook == spbook.book ? "next" : "first")` (`:203–204`). JS compares object identity. `learn` calls while `spbook.book` is still that object (`:369`, clear at `:370`), so the word is "next". `study_book` assigns `spbook.book = spellbook` at `:636`, after the confused return at `:628`, so a new study says "first" unless the pointer was already that book. Return value is `gone`.

`learn` (`:368–376`): call, clear book and `o_id`, `nomul(delay)`, `multi_reason = "reading a book"`, `nomovemsg = 0`, `delay = 0`, return 0. JS does that, and skips the call when `book` is null. C would dereference. Named. Lenses `rn2(2)` (`:365–367`) stays above this `if` and is still not in JS. Named.

`study_book` (`:620–628`): `if (!confused_book) in_use = FALSE`, then `nomul`, the reason, `nomovemsg = 0`, `delay = 0`, return 1, whether or not the book was torn. `confused` is `Confusion != 0` (`:471`). JS `study_book` already used `game.u.Confusion` for that local (`spell.js:1027`). No other `rn2` in the new function.

The header comment at `spell.js:112` still says `confused_book` body is a named omission. The function is the body above. The map hunk in this commit is the live note.

## Hallucinations / overclaim

The subject says `rn2(3)` always runs and a zero roll tears unless the book is the Book of the Dead. That is the `&&`. It says `learn` still has the book as "next". The clear is after the call. It says `study_book` clears `in_use` only when the book survives, then `nomul`. Both statements are outside and inside the `if` in that order. It does not claim the lenses roll or the file-local `useup` were finished.

## Density

The whole static function and both C callers. C is 20 lines. The surrounding `nomul` tails are the caller's next statements, shipped with it.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify confused_book --base ae37117bd~1 --reach-all`.

```
verify confused_book: baseline ae37117bd~1 (scoreboard at c9492411c) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke confused_book: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Green and cohort were not re-run in this audit.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
