# Review 1227 — 3c20f022 — uhitm SGLD/CURS/DCAY/SLIM hero-poly arms (D-2261)

Metadata: SHA `3c20f022` (D-2261). Pops the next Open row
(`damageum_adtyping` hero-poly, named by D-2260). js/ +117/−4
(`js/uhitm.js`), 1 line each in `js/mhitm.js` / `js/pickup.js`.

## Intent vs deliverable

Subject promises the four uhitm (hero-as-attacker) arms
dispatched from `damageum_adtyping`. Diff actually adds:
file-local `damageum_ad_sgld` / `_curs` / `_dcay` / `_slim`,
four dispatch cases, the `mons[PM_GREEN_SLIME]` →
`mons(PM_GREEN_SLIME)` factory fix in the mhitm SLIM arm, and
the `merge_choice_invent` export. Promise matches diff.

## Inventory

New: the four arms (file-local). Changed: one newcham call
site; one `function` → `export function`. New imports on
**already-existing** edges (`--can` this audit: uhitm already
statically imports pickup, u_init, do, muse — "No new edge
needed"; steal/calendar/invent/mhitm/monsters/const edges
pre-date this commit): `Blind` (invent.js:321), `erode_armor`
(mhitm.js:1791 async — awaited), `slimeproof`
(monsters.js:461 sync), `inv_cnt` (steal.js:79 sync),
`merge_choice_invent` (pickup.js, exported here, not cloned),
`addinv` (u_init.js:983 async — awaited), `dropy` (do.js:2277
async — awaited), `munslime` (muse.js:1551 async — awaited),
`night` (calendar.js:225). No symbol deleted or re-pointed, so
no `sym.mjs` re-point output is owed. Callee closure — all
LIVE, none STUB.

## C ↔ JS fidelity

Walked against pinned C (`csym.mjs` ranges cited):

- SGLD vs `uhitm.c:2797–2811` (fetched: `:2799–2811` uhitm
  branch). `findgold(minvent)` → `obj_extract_self` →
  `merge_choice(gi.invent) || inv_cnt(FALSE) < invlet_basic`
  → `addinv` + `Your("purse feels heavier.")` ≡ «Your purse
  feels heavier.»; else `You("grab %s's gold…")` + `dropy`;
  `exercise(A_DEX, TRUE)` unconditionally; leftover zeroed.
  JS follows line-for-line. `merge_choice_invent` vs
  `invent.c:772–810` (both fetched): empty-invent null,
  SCR_SCARE punt, first-`mergable` slot all match; the only
  C text missing is the `OBJ_FLOOR && shop_keeper` shop arm —
  the gold here was extracted from a monster's invent
  (`obj_extract_self` sets non-floor `where`), so that arm
  cannot fire; correctly a named omit, not a silent drop.
  `inv_cnt(false)` ≡ C `inv_cnt(FALSE)` (COIN_CLASS skip).
  C.
- CURS vs `uhitm.c:3022–3035` (uhitm branch text confirmed via
  the D-2260 body fetch). `night() && !rn2(10) && !mcan`
  short-circuit in C order; clay golem by mndx → `!Blind`
  «writing vanishes» + `xkilled(NOMSG)` with **no return**
  (comment quotes the C rationale — damageum's hp<1 pet tail
  still runs with damage 0); else `mcan = 1` + `You("chuckle.")`
  ≡ «You chuckle.»; leftover zeroed. C, except the `s_suffix`
  vehicle (debt item below).
- DCAY vs `uhitm.c:2369–2377` (uhitm branch text confirmed via
  the D-2260 body fetch). `completelyrots` by mndx →
  «falls/starts to fall» via lifesaver + `xkilled(NOMSG)`;
  `erode_armor(ERODE_ROT)` unconditional, as in C; leftover
  zeroed. `mlifesaver_you` (uhitm.js:2615, pre-existing) is a
  line-for-line `mlifesaver` clone (nonliving gate +
  vampshifter + W_AMUL amulet read). C.
- SLIM vs `uhitm.c:3530–3552` (fetched: `:3535–3552` uhitm
  branch). `mhitm_mgc_atk_negated(you, mdef, FALSE)` first,
  negated → keep physical leftover and return; `!rn2(4) &&
  !slimeproof(pd)` → `munslime(mdef, TRUE)` (async, awaited,
  correct polarity — mhitm arm uses FALSE); survivor → «You
  turn X into slime.» + `newcham(green slime, NO_NC_FLAGS)`
  with no vis gate (C uhitm arm passes bare `NO_NC_FLAGS`,
  unlike the mhitm arm); fatal → DEF_DIED + done, else damage
  zeroed. No WAITFORU clear — C uhitm arm has none either
  (only the mhitm arm does). C.
- Factory fix: `mons()` returns a fresh object carrying
  `mndx` (monsters.js:203–231, read this audit), and
  `newcham(mtmp, mons(…), …)` is the established house pattern
  (mhitm.js:2619/2650/2662/2855). Before, the argument was
  `undefined` (factory indexed access) and `newcham` picked a
  random form; now green slime, per C `&mons[PM_GREEN_SLIME]`.
  Correct direction.
- Dispatch: four `else if` cases on `AD_SGLD = 20` /
  `AD_DCAY = 34` / `AD_SLIM = 40` (monattk.h values;
  `AD_CURS = 253` rides the existing const.js:367 export).
  `invlet_basic = 52` ≡ a-zA-Z.

## Hallucinations / overclaim

None. D-log states no corpus reach and no hand probe, pastes
the vacuous note honestly, and puts the two residuals (`s_suffix`,
`mlifesaver_you`-as-clone, AD_DETH uhitm goto) in Named/Next
rather than claiming completeness.

## Density

+117 for four C arms + dispatch + two one-liners. In-band.

## Verification

Re-measured myself: `hidden-proxy verify damageum_adtyping
--base 3c20f022~1` → 0 blocked at baseline and working
scoreboard (vacuous, as labeled); `verify.mjs --fn
damageum_adtyping` at HEAD → rule2 PASS, green 2/2, strict ×2,
cohort 7/7, VERIFY: PASS. Diff grep: no FORCE/DIAG/seed/
coordinate/`fastforward`. Rule #2 repo-wide clean (review
1225; no new imports from banned modules here).

## Actionable C-wrongs

1. `damageum_ad_curs` formats the golem name through the
   file-local `s_suffix` (uhitm.js:262), which appends `'`
   after z/x/ch/sh where C (`hacklib.c`) does so only after
   `s`. Already queued as the live Open row (`hacklib.c`
   s_suffix — import do_name.js `s_suffix` for the uhitm
   callers) and named in D-2261 Next — so **no new Must-fix
   prepend** (no duplicate queue line). Noted here because
   this commit adds a caller. Practically unreachable from
   this arm (the line fires only for `PM_CLAY_GOLEM`, whose
   `mon_nam` ends in 'm' — both spellings agree there), which
   is why this stays debt rather than risk.

Verdict: **ACCEPT-WITH-DEBT**
