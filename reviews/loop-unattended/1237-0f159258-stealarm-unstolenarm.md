# Review 1237 — 0f159258 — thiefdead swap + stealarm/unstolenarm

- SHA: `0f159258` — "`steal.c` `thiefdead` stealarm→unstolenarm swap + `stealarm`/`unstolenarm` completion (D-2271)"
- D-log: D-2271. Queue row: `steal.c` thiefdead stealarm arm (mondead-tail
  D-2231 named omit). No corpus session reaches a multi-turn armor steal.

## Intent vs deliverable

Subject promises: the `thiefdead` swap plus completed `stealarm`/`unstolenarm`
and the missing `afternmv = stealarm` in `steal()`. Diff actually adds: both
exports in `js/steal.js`, the `steal()` one-liner, the `thiefdead` swap in
`js/mhitm.js`, four names on existing import edges, and comment updates.
Promise matches diff exactly.

## Inventory

- New JS: `stealarm`, `unstolenarm` (`js/steal.js:493-556`); changed:
  `steal` (one line), `thiefdead` (`js/mhitm.js:2983-2991`).
- Callees: `dmgtype` (`monsters.js:528` sync, LIVE — steal.js extends the
  existing edge), `dist2` (`mon.js:857`, LIVE), `armor_simple_name`
  (`do_wear.js:1235` sync, LIVE), `impossible`/`pline`/`Monnam`/`doname`/
  `subfrombill`/`shop_keeper`/`freeinv`/`mpickobj`/`monflee`/`tele_restrict`/
  `rloc` (all pre-existing imports), `nemesis_stinks`-style async convention
  (`unmul` awaits `afternmv`; `Armor_off`-family precedent for function-ref
  assignment). No symbol deleted or re-pointed, so no `sym.mjs` deletion
  output is owed; all four added names ride visibly pre-existing edges
  (`monnear`, `is_animal…`, `setworn…`, `canspotmon…`), so no new module edge
  and no TDZ risk beyond call-time use.

## C ↔ JS fidelity

C loci (via `csym.mjs`): `thiefdead` `steal.c:119-128`; `unstolenarm`
`:145-161`; `stealarm` `:164-208`; `steal` afternmv site `:554-559`.

- `thiefdead`: `stealmid = 0`, then pointer-compare swap + `nomovemsg = 0`.
  JS exact, including the C comment; `null` ≡ `(char *)0` per the `cancel_don`
  idiom. ESM single-instance import means `=== stealarm` is a true pointer
  compare. ✓
- `unstolenarm`: invent scan by `o_id` before clearing `stealoid`, `You finish
  taking off…` only if found, return 0, `stealmid` untouched (thiefdead owns
  it). JS exact (`You(` ≡ `pline("You …")`). ✓
- `stealarm`: gate→botm, invent scan, fmon scan, DEADMONSTER-impossible,
  `!dmgtype(AD_SITM) || distu > 2`→botm, unpaid-subfrombill, freeinv,
  doname-captured-before-pline, `Monnam steals buf!`, mpickobj, monflee(0,F,F),
  tele_restrict→rloc, no mavenge, botm clears both. JS reproduces every step
  including the nested-`break` structure (inner match-break then outer break;
  miss paths fall to the tail clear). Verified point by point:
  `AD_SITM = 21` (`monattk.h:63`) ✓; `DEADMONSTER` (`mhp < 1`, monst.h:214)
  ≡ `(mhp|0) <= 0` ✓; C `dist2` is squared (`hacklib.c:672-678`) ≡ JS
  `mon.js:857` squared, so `> 2` matches exactly ✓ (`distu` ≡ that call,
  hack.h:1531); `shop_keeper((u.ushops||'')[0])` is the file's own stealamulet
  idiom (`:661`) for `*u.ushops` ✓.
- `steal()`: C `:554-559` sets `stealoid/stealmid/afternmv = stealarm` under
  `multi < 0`; JS had the ids but a "deferred" comment — now exact. This was
  a real C-wrong (null occupation, leaked `stealoid`), fixed here. ✓

No C-wrong. Remaining `steal.js` omits (monkey_business, Punished/uchain,
Adornment, leash, petrify, stop_donning) correctly stay named and separate.

## Hallucinations / overclaim

None. The D-log does not claim corpus movement; the throwaway probe's three
swap-arm assertions are consistent with the C arms I read.

## Density

~90 insertions for a 72-line C family plus its one-line caller — one
falsifier, two already-coupled modules. Right-sized.

## Verification

- Re-measured: `node scripts/hidden-proxy.mjs verify thiefdead` → "0
  session(s) blocked on it (0 at baseline, 0 in the working scoreboard)".
  Matches the D-log's vacuous note; row cited 0 blocks so no `--base` owed.
- `imports.mjs --rulecheck` clean (re-run this review, review 1232). D-log
  cites green 2/2 + strict ×2 + cohort 7/7; the new arms run only on
  multi-turn armor-steal / dead-thief paths no fortress session takes, and the
  end-of-iteration cadence run re-covers the fortress.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
