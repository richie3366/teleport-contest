# Review 1632 — 231e4785 — uhitm.c find_roll_to_hit role/race arms (D-2673)

**Metadata:** SHA `231e4785`, `uhitm.c`
`find_roll_to_hit` `:396–406`, D-2673 (+
mtele_trap STALE park same iteration). JS:
`js/uhitm.js` only (+30/−4 incl. doc).
No Must-fix.

## Intent vs deliverable

Subject promises: the two deferred
`:396–406` role/race arms live. Diff inserts
exactly those two arms in C order plus 3
import names and one file-local `Race_if`.
The doc-comment deferral is retired in the
same diff. Promise matches deliverable.

## Inventory

- `find_roll_to_hit` (uhitm.js:585, async)
  — two arms inserted, rest untouched.
- New file-local `Race_if` (uhitm.js:4262)
  beside `Role_if`. Required `sym.mjs`:

```text
is_orc           js/monsters.js:585   sync
is_elf           js/monsters.js:595   sync
Race_if          NOT EXPORTED — but 6 LOCAL CLONE(S) in 6 file(s):
               js/artifact.js:372  js/dig.js:1525  js/dothrow.js:785  js/eat.js:306  js/makemon.js:684  js/uhitm.js:4262
```

`is_orc`/`is_elf`/`PM_ELF` join existing
import edges (no new module edge). `Race_if`
is the 6th same-named local, but `sym.mjs`
confirms no live export exists to import —
it mirrors the file's own `Role_if`
precedent, so this is not a clone-of-export
violation (repo-scale consolidation, if
ever, is map debt, not this SHA's C-wrong).
No deleted or re-pointed symbols.

## C ↔ JS fidelity

C locus read directly: `uhitm.c:396–406`.
No RNG. Exact:

- Monk arm — `Role_if(PM_MONK) && !Upolyd`,
  `uarm → tmp -= (penalty = spelarmr)`,
  `else if (!uwep && !uarms) → tmp +=
  (ulevel/3)+2` — all replicated; `tmp -=
  (*p = v)` ≡ assign-then-subtract; C
  positive int division ≡ `Math.trunc`.
- Orc arm — `maybe_polyd(is_elf(data),
  Race_if(PM_ELF))` ≡ the `Upolyd(u) ? form
  : Race_if` ternary spelling.
- Insertion point (between `!mcanmove` and
  encumbrance) is C order.
- Callers: all 7 C sites already pass `{ v:
  0 }` penalty objects into live
  `known_hitum`/`missum` tails —
  spot-checked uhitm.js:3024/:3039/:3046
  and the `:3611+` sites; default
  `role_roll_penalty.v = 0` at :586 matches
  C's `*role_roll_penalty = 0`. None
  unwired, none invented.
- Same-iteration mtele_trap STALE park
  carries a body-split proof pointer.

## Hallucinations / overclaim

None.

## Density

Two missing arms of one live function, one
module. Narrow but completes the function —
the legitimate small end of §2b.

## Verification

D-log Verify PASS with honest 0-blocked
note. Re-ran `hidden-proxy.mjs verify
find_roll_to_hit --base 231e4785~1
--reach-all`:

```text
verify find_roll_to_hit: baseline 231e4785~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke find_roll_to_hit: no RNG-tagged reach; fixed smoke spread (24 run, 6.3s): 24 PASS, 0 regressed → REACH-OK
```

No REGRESSED. Diff grep: no FORCE / DIAG /
RNG-log / seed / coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
