# Review 983 — 488f18ab — pager '@'-as-you 'or you' arm (D-2013)

Metadata: SHA `488f18ab`, D-2013, Open-row port (queue row
`objnam.c` wishymatch, 5 sessions — owner was the literal
matcher hitting `"dwarven "` at `:3280`, fix lands in
`describe_looked`). js/ touches 1 file (`js/pager.js`, +8/−3:
`orYou` gate + two const imports). No stamp owed.

## Intent vs deliverable

Subject promises: farlook at own square missed `"or you"` for
non-human/elf heroes. Diff actually adds: `raceMnum !==
PM_HUMAN && !== PM_ELF && !Upolyd(u)` → append `' or you'`.
Promise == diff for the string. The count half of the same C
statement is not ported (see C-wrong 1).

## Inventory

- Changed JS function: `describe_looked` self branch only
  (`js/pager.js:1468`); `wishymatch` untouched.
- New helpers: none. No deleted symbols — no `sym.mjs` delete
  audit required. No STUB/clone/no-op. Imports only extend the
  existing `./generated/monsters_data.js` edge (`PM_HUMAN=260`,
  `PM_ELF=264`); no new module, consts read at call time.
- Named omits kept: wishymatch special-case arms (pre-existing
  map wish-subset row); rest of self branch (sym=='@'/
  invisible/swallowed re-modeling — different owners).

## C ↔ JS fidelity

C locus: `pager.c:1346–1355` (`(looked ? sym==showsyms &&
u_at : …) && !(Race_if(HUMAN)||Race_if(ELF)) && !Upolyd` →
`found += append_str(out_str, "you")`), with `Race_if(X) ≡
urace.mnum==X` (`you.h:297`) and `Upolyd ≡
u.umonnum!=u.umonster` (`you.h:554`). String half confirmed:
`u.ux===x && u.uy===y` is `u_at` ✓; `'@'` prefix pre-existing
✓; race gate verbatim ✓ (`game.urace?.mnum|0`; PM consts from
generated C extract). `Upolyd(u)` resolves to the shared
`const.js:3160` macro (`mtimedone>0` — practically equivalent
here since poly is always timed and only `rehumanize` resets
it; pre-existing shared debt either way, not charged to this
SHA). **Gap — count half dropped:** C `found +=
append_str(...)` returns 1, so C `found` goes 1→2 (the commit's
own comment quotes "append_str 1→2"); JS keeps `found: 1`.
Live consumer in the same function: caller gates
`checkfile(first, 0)` on `found === 1` (`pager.js:1986`),
mirroring C `:1941` (`found == 1`), which C now fails (found
2) and skips. So on the verbose-look-at-self path JS calls
`checkfile(self_lookat-string, 0)` where C calls nothing.

## Hallucinations / overclaim

The D-log's `verify`-prints-`js-throw` disclaimer for 92162 is
honest and re-confirmed (null-owner fallback; direct replay
`error:null`). No "Match C" claim is made for the callee side.
But the review-audit finds the D-log's "append_str 1→2" comment
describes C text it only half-ports — the count is never
mentioned as deferred anywhere (not in Named, not in the map).

## Density

11 lines for a one-gate C arm. Right-sized — the miss is
correctness, not size.

## Verification

Re-measured myself: `hidden-proxy verify wishymatch --base
488f18ab~1` → `1 PASS, 4 moved past, 0 unchanged, 0 worse →
PROGRESS` (92205 now full PASS; 92175 → name_to_monplus@81;
92023 → dosearch@65; 92040 → show_conduct@71; 92162 →
step-70 null-owner screen move). Strictly better than the
D-log's 0-PASS/5-moved (later D-2015/D-2019 commits advanced
disclose/prevmsg downstream) — claim CONFIRMED, 0 worse. Why
the corpus can't see the count gap: all five sessions farlook
with `;` (never reaching `checkfile`), and `simplify_for_db`
matches are silent without the prompt path. js/ hunk grep: no
`FORCE`/`DIAG`/`getRngLog`/seed/coordinate/`fastforward`
(the one hit is the message quoting its Rule #2 line). Cited
green 2/2 + strict ×2, cohort 7/7. Rule #2 clean (re-ran).

## Actionable C-wrongs

1. `describe_looked` self branch returns `found: 1` after the
   `' or you'` append; C `found` is 2, skipping `checkfile`.
   Constructible divergence: verbose (`:`) look at own square
   as dwarf/gnome/orc with help on — JS emits `More info
   about "dwarven archeologist"?` (yn, flags=0) because data
   keys (`archeolog*`, `* archeologist`, `* valkyrie`, `*
   ranger`, `* wizard`, …) pmatch the simplified self-lookat
   string (measured against embedded `dat_text.js` with C
   pmatch semantics); C prints nothing further. One-line fix
   in this arm (`found: orYou ? 2 : 1`); `first` needs no
   change (C's firstmatch is equally unused once skipped).

Verdict: **QUALITY-RISK**
