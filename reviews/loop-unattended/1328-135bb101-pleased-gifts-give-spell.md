# Review 1328 — 135bb101 — pleased gift arms + give_spell/force_learn_spell (D-2362)

Metadata: SHA `135bb101`, 4 js files (+243/−34): `js/pray.js` (give_spell
+ cases 1/3/2/4/7-8/6), `js/spell.js` (+28 `force_learn_spell`),
`js/weapon.js` + `js/zap.js` (one-word export-only touches:
`P_RESTRICTED`, `You`). No new modules. D-log: D-2362, map-named row, 0
blocked on all three names.

## Intent vs deliverable

Subject promises six latent C-wrongs in otherwise-live `pleased` (gift
switch `rn2((Luck+6)>>1)` cases 1–4/7-8/6 as deferred breaks) plus two
new C-home functions. Diff adds exactly: case 1 weapon repair, case 3
tune hints with FALLTHROUGH, case 2 golden heal, case 4 invent uncurse,
cases 7/8 `gcrownu` + fallthrough, case 6 `give_spell`, and exported
`force_learn_spell`. Matches the promise; case 5 untouched (D-2219).

## Inventory

- `give_spell()` — new file-local async in pray.js (C `staticfn`,
  correct locality). C callee-by-construction, ported from
  `pray.c:998–1068`.
- `force_learn_spell(otyp)` — new exported async `js/spell.js:371` (C
  home `spell.c:2391–2413`).
- `pleased` gift arms 1/3/2/4/7-8/6 (rework of deferred breaks).
- Helpers: all imports join pre-existing edges; `You` import reuses the
  newly-exported `zap.js` function; no new clones (`Your` reused from
  the pre-existing file-local `:1433`, see below).

## C ↔ JS fidelity

`force_learn_spell` vs C `spell.c:2391–2413`: blank/BotD/Fresh → `'\0'`;
first NO_SPELL/same-otyp slot; `impossible('Too many spells
memorized')`; sp_id/sp_lev assign; `incrnknow(i, 0)`; `spellet(i)`.
Exact. Confirm.

`give_spell` vs C `:998–1068` (body re-read): `trycnt = ulevel+1` loop
with unknown/forgotten-unrestricted break and blank-paper
(undiscovered-or-marker) break; `rnd_class(bases[SPBOOK_CLASS],
SPE_BLANK_PAPER)` re-roll; 25% direct-learn unless Fresh with the
`spe_Unknown → pline("Divine knowledge...")` vs
`Your("knowledge...restored/refreshed")` split; `obfree` discard; else
observe + (blank || `!rn2(100)`) makeknown + bless + at_your_feet +
place + newsym. Order/conjuncts exact. Confirm.

Gift switch vs C `:1167–1354` (body re-read): JS keeps C source order
(1, 3, 2, 4, 5, 7/8, 6). Case 1: `welded||WEAPON_CLASS||is_weptool`
gate, repair_buf with `otense 'are'`, cursed-uncurse vs
unblessed-bless glow (`amber`/`light blue`, `last_msg` set, `bknown =
1`, buf cleared), erosion clear gated on surviving buf with Blind
feel/look variant, `update_inventory` ✓. Case 3: Valley/dbridge skip,
tune<1 godvoice + mortal/creature + double verbalize, tune<2
Soundeffect + You_hear + tune pline + ACH_TUNE, FALLTHROUGH ✓ (SetVoice
pitch stays named-deferred per file convention). Case 2: Blind-gated
golden glow, `ulevelmax-1` + `pluslvl(false)` vs `uhpmax+5`/peak/mhmax,
full heal, STR restore + botl + encumber_msg, hunger<900, luck<0,
ucreamed=0, `make_blinded(0,true)`, botl ✓. Case 4: Blind You_feel vs
You aura, snapshot invent loop with HOA exception, `++any` inside the
!Blind block (matches C), uncurse outside, any-gated update ✓. Cases
7/8: `record >= PIOUS(20)` + uncrowned → `gcrownu` + break else
FALLTHROUGH ✓ (review-1185 nit honored). Case 6 → `give_spell` ✓;
default `impossible` ✓. Branch-by-branch confirm.

Helper classification: `Your` (`pray.js:1615`) is a pre-existing local
clone (present at parent `:1433`), reused not added — `sym.mjs Your`
shows 4 file-local clones and NO export anywhere, so no import was
available; the drift is pre-existing map debt, not this SHA's. `You`
imported (newly-exported `zap.js`), `P_RESTRICTED` imported
(`weapon.js:1104` sync) — both LIVE. **Required sym outputs pasted:**
`force_learn_spell js/spell.js:371 ASYNC`, `P_RESTRICTED
js/weapon.js:1104 sync`, `Your NOT EXPORTED — 4 LOCAL CLONES`. No stub
in any live arm.

## Hallucinations / overclaim

None. SetVoice pitch + ublesscnt tail + wrong-god polish stay named.

## Density

~243 insertions across 4 files but one C locus family (pleased switch +
its two callees); the two one-word exports are the minimal vehicle.
Acceptable per §2b (combined-arm closure holds).

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify pleased --base 135bb101~1` → `0 blocked (0 at
  baseline, 0 working)` — vacuous as disclosed; row cited 0 blocks.
  Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn pleased` → VERIFY:
  PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
