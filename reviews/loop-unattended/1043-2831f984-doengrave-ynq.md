# Review 1043 — 2831f984 — doengrave add-to ynq prompt (D-2073)

## Metadata

- SHA: `2831f984` — `engrave.c doengrave add-to ynq prompt never asked: same-type engraving auto-appended where C prompts, so JS skipped the recorded [ynq] screen (queue owner doengrave) (D-2073).`
- JS diff: `js/engrave.js` +27/−7 (HEADSTONE arm, `yn_function` ynq call + `q` arm, BUFSZ-full arm, import + doc touch-ups).
- Docs: D-2073 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1043.

## Intent vs deliverable

Subject promises: same-type engraving now asks the C ynq prompt
(instead of auto-appending), plus the HEADSTONE auto-append and the
BUFSZ-full arms. Diff actually adds all three inside the same `if
(de.oep)` envelope. Promise == diff.

## Inventory

- Changed: `doengrave` add-to block (js/engrave.js:1282–1340).
- Import: `yn_function` joins the existing `./getline.js` import
  (same module as `getlin`, no new edge, no TDZ).
- Callees LIVE: `yn_function` (`js/getline.js:1572` async, awaited),
  `Never_mind` / `BUFSZ` (const.js exports), `newsym` (already
  imported).
- No deleted symbols. Diff grep: no `FORCE`/`DIAG`/seed/step reads, no
  `fastforward`, no coordinates.

## C ↔ JS fidelity

C (`engrave.c:1110–1168`, read directly): `c='n'`; HEADSTONE→`'y'`
(`:1114–1116`); same-type + `!Blind||BURN||ENGRAVE` → `yn_function("Do
you want to add to the current engraving?", ynqchars, 'y', TRUE)`,
`'q'` → `pline1(Never_mind); goto doengr_exit` (`:1117–1126`); then
`if (c=='n'||Blind)` wipe/overwrite arms, `else if (oep &&
Strlen>=BUFSZ-1)` → `There("is no room..."); ret=ECMD_TIME; goto
doengr_exit` (`:1162–1167`).

JS matches branch-for-branch: HEADSTONE `c='y'`; same-type predicate
identical (incl. BURN/ENGRAVE Blind exceptions); `yn_function` with
the verbatim query, `'ynq'`, `'y'` (JS default `addcmdq=true` ==
C TRUE); `q` → `pline(Never_mind)` + disprefresh-gated `newsym` +
`return de.ret`. `doengr_exit` (C `:1259–1263`, read directly) is
exactly `if (disprefresh) newsym; retval = de->ret` — so the JS
`q`-arm and the BUFSZ arm (`pline('There is no room...')` + gated
newsym + `return ECMD_TIME`) are both faithful inlinings of the
goto. `pline` for C `pline1`/`There` is the codebase idiom (no
`pline1` export exists; `pline(Never_mind)` used in 8+ modules).

One latent note (not a C-wrong, no Must-fix): the call passes the
interned literal `'ynq'` rather than the `ynqchars` table
(`Object.freeze(new String('ynq'))`), so the `resp === ynqchars`
identity branches (query_menu menu path, D-1728) skip it. But the
literal is the established codebase idiom (~100 `yn_function`
callers pass `'yn'`/`'ynq'` literals: dokick, eat, spell, music…),
all key-matching/display paths use value-based `.includes`, and no
blocked session enables `query_menu`. Fixing it means fixing the
idiom everywhere, not this arm — correctly not queued here.

Named omits are precise: altar/jello/swallow/lava/pool setup arms,
livelog, Blind-feel, surface/ice, wipeout seeded path, kick-caller
disturb_grave — all pre-existing map notes, none reached.

## Hallucinations / overclaim

None. «Default-true matches C TRUE» verified against the JS
signature; «same module, no new edge» true.

## Density

27 insertions for three arms of one C envelope + import. Right-sized
(one C locus family, one falsifier pair).

## Verification

D-log Verify bullet: `verify --fn doengrave` → `1 PASS, 1 moved past`
(91116 PASS; 92078 44→can_twoweapon@118) + green + strict + cohort
7/7. Re-measured myself on current HEAD code:
`hidden-proxy.mjs verify doengrave --base 2831f984~1` → `2 PASS, 0
moved past, 0 unchanged, 0 worse → PROGRESS`. The delta is explained,
not contradictory: the later owner `can_twoweapon` was itself ported
by 3a388782 (D-2076, next SHA in this batch), so 92078 now clears
doengrave too. Strictly better, zero WORSE — the D-log claim
reproduces at its commit and improves after.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
