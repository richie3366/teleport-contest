# Review 964 — c36a197c — attrib.c exercise residual: exerper + makeknown-credit callers (D-1994)

- SHA: `c36a197c` — "attrib.c exercise residual: exerper Clairvoyant/Regen/Monk arms + makeknown-credit caller arms (Gloves/Amulet/addinv/spell) (D-1994)."
- D-id: D-1994. JS: `js/allmain.js`, `js/do_wear.js`, `js/polyself.js`, `js/spell.js`, `js/u_init.js` (+127/−27). C loci: `attrib.c` `exerper` `:520–584`, `exercise` `:488–518`; `do_wear.c` `Gloves_on` `:575–603`, `adj_abon` `:3318–3336`, `Amulet_on` CHANGE `:1000–1035`; `invent.c` `addinv_core2` `:1024–1049`; `spell.c` `spelleffects` `:1517–1531` — all fetched this review.
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the exerper Monk/Clairvoyant/Regen arms plus the four makeknown→`exercise(A_WIS)` credit call sites. Diff actually adds: Monk WIS arms + H-only Clairvoyant/Regen arms in `exerper`; DEXTERITY `makeknown`+`ABON` in `Gloves_on`; full CHANGE arm in `Amulet_on`; new `addinv_core2` at both `added:` exits; five otyps routed into the `:1517–1531` bless/seffects arm. Promise matches deliverable.

## Inventory

- Changed: `exerper` hunger/status ticks; `Gloves_on` DEX branch; `Amulet_on` CHANGE branch; `spelleffects` otyp list + bless gate; `addinv` two call sites.
- `js/allmain.js` +24/−5: two Monk hunger arms, two every-5 status arms, `PM_MONK` + `CLAIRVOYANT` import names.
- `js/do_wear.js` +57/−9: DEXTERITY branch, full CHANGE arm, `A_DEX` + `useup` + `trycall` + polyself import names.
- `js/polyself.js` +9/−4: two `export` keywords only.
- `js/spell.js` +24/−5: five otyp constants, widened `||` list, narrowed bless gate.
- `js/u_init.js` +40/−4: `addinv_core2` + two `added:` call sites + four import names.
- New: `addinv_core2` (async, local); two `export` keywords (`poly_gender`, `Unchanging` — additive, no body change).
- No deletions/re-points of a local clone to an import, so no `sym.mjs` delete audit owed. `sym.mjs` confirms both exports resolve to single definitions with pre-existing clones elsewhere left untouched (correct — this commit imports nothing new there).

## C ↔ JS fidelity

`exerper` hunger arms ✓ branch-by-branch: C `SATIATED: DEX FALSE + Monk WIS FALSE` ≡ JS `hunger>1000` pair; `WEAK: STR FALSE + Monk WIS TRUE` ≡ JS `hunger>0` pair; HUNGRY gap preserved; FAINTING/FAINTED `CON FALSE` ≡ else. Status arms: C `(HClairvoyant & (INTRINSIC|TIMEOUT)) && !BClairvoyant` ≡ JS flat+intrinsic vs blocked veto — the codebase's standing H-field idiom, same shape as the adjacent Confusion/Hallucination lines; `HRegeneration` → STR TRUE with intrinsic read ✓. RNG call-for-call: every new arm reaches `exercise :509` (`rn2(19)` INC / `rn2(2)` dec), which is exactly the four missing-draw shapes in the message.
`Gloves_on` DEX ≡ `adj_abon :3322–3331` in this call context: `uarmg==otmp` holds (`o` is `u.uarmg`), `spe|0` nonzero → `makeknown` + `ABON(A_DEX)+=spe`, botl unconditional ✓.
`Amulet_on` CHANGE `:1000–1035` ✓ in order: `poly_gender` → `Unchanging` gate → `change_sex` → `makeknown`-if-changed → in-arm `on_msg`+done → newsym/botl/gender pline vs `don't feel like yourself` + `dknown` `call_it` → named `livelog_newform` skip → `The amulet disintegrates!` → `trycall` → `useup` → trailing `on_msg` guard ✓.
`addinv_core2` ✓ all five gates (Archeologist, SCROLL_CLASS, non-blank, `!Blind`, `!oc_name_known`) then observe/decipher/`makeknown`/literate+livelog, wired at both `added:` exits before `carry_obj_effects` ✓; luck arm stays named.
`spelleffects` ✓: all five missing otyps join the bless group; `MAPPING`/`CREATE` skip the bless exactly as C falls through to bare `seffects` ✓.

Arm-by-arm notes (all C ranges fetched this review):

- `Gloves_on` DEX (`do_wear.c:575–603` case + `adj_abon :3318–3336`): C's case body is a single `adj_abon(uarmg, spe)` call, and `adj_abon` in turn checks `uarmg==otmp && otyp==DEX`, then `if (delta)` → `makeknown` + `ABON(A_DEX)+=delta`, with `botl=TRUE` unconditional. JS inlines exactly that shape since `o` IS `u.uarmg` here — the `uarmg==otmp` guard holds by construction. `o.spe|0` ≡ C `schar delta` truthiness. Shared tail (`known=1`, `find_ac`) unchanged; `update_inventory` stays named-omitted as before.
- `Amulet_on` CHANGE (`do_wear.c:1000–1035`): `orig=poly_gender()` → `if (!Unchanging) change_sex()` → `new=poly_gender()` → `makeknown`-if-changed → in-arm `on_msg`+done → changed? newsym/botl/`You are suddenly very %s!` (flags.female picks the adjective) : `You don't feel like yourself.` + `call_it=(dknown!=0)` → named `livelog_newform` skip → `The amulet disintegrates!` (capital-T `pline_The` ✓) → `trycall` → `useup` → trailing `on_msg` guard. Order-exact; no RNG on this path.
- `addinv_core2` (`invent.c:1024–1049`): `confers_luck→set_moreluck` named-omit comment first (matches C order — luck before decipher), then the five-gate Archeologist arm. `observe_object` before the pline, `makeknown` after, `if (!uconduct.literate++)` + `LL_CONDUCT` livelog — all four effects in C order ✓.
- `spelleffects` (`spell.c:1517–1531`): C's bless group is REMOVE_CURSE/CONFUSE/DETECT_FOOD/CAUSE_FEAR/IDENTIFY/CHARM_MONSTER with `role_skill>=P_SKILLED → blessed`, falling through to MAPPING/CREATE bare `seffects`. JS condition `otyp!==MAPPING && otyp!==CREATE && skilled` reproduces the fallthrough split exactly; DETECT_FOOD was already in the group and stays blessed-eligible ✓. `seffects` stays a same-edge dynamic import (read.js→spell.js cycle unchanged).

H-field idiom note: `hasClair = HClairvoyant|0 || intrinsic` vs C `(HClairvoyant & (INTRINSIC|TIMEOUT))` — the flat field carries the timeout value in JS, so nonzero-flat ≡ the C mask in practice; same idiom as the pre-existing Confusion/Hallucination lines directly below. `HRegeneration|0 || intrinsic` likewise harmless (flat reads 0 where C has no flat).

Callee closure: `exercise`, `makeknown`, `observe_object`, `Blind`, `trycall`, `useup`, `change_sex`, `seffects` (dynamic), `yname` all LIVE on existing edges; `PM_MONK`/`CLAIRVOYANT`/`A_DEX` extend existing same-edge lists. No STUBs, no clones, no new module edges.

## Hallucinations / overclaim

None. "Match C" is per-arm and verified above; named omits (`encumber_msg` tail, `set_moreluck`, `livelog_newform`, Sick/Vomiting bodies) are stated in message, map, and code comments — not dispatched-as-live.

## Density

+127/−27 over five files, one falsifier family (missing `exercise :509` draws in four shapes). Right-size per §2b. Per-file: allmain +24/−5 (two hunger arms + two status arms + two import names), do_wear +57/−9 (DEX branch + CHANGE arm + three import names), polyself +9/−4 (two `export` keywords + comment), spell +24/−5 (five otyps + bless gate), u_init +40/−4 (`addinv_core2` + two call sites). No file exceeds a single cluster; the two re-exports are additive (bodies untouched, read lazily in-body per their CHECK) so the 82-module SCC is undisturbed.

## Verification

D-log cites `verify exercise` PROGRESS with per-session first divergences. Re-measured this review: `hidden-proxy.mjs verify exercise --base c36a197c~1` → "0 PASS, 11 moved past (4 still exercise at a later step), 0 unchanged, 0 worse → PROGRESS" — same direction, larger movement (parent baseline had 11 blocked: 7 at baseline + 4 in the working scoreboard). Every moved session names a later owner (`regen_hp`, `were_change`, `lesshungry`, `mcalcmove`, `mhitm_knockback`, `name_to_monclass`; 92158's unattributed map/menu screen matches all 3170 RNG). No regression. `imports.mjs --rulecheck` clean (re-run). `sym.mjs` on both re-exported symbols: single live definitions, pre-existing clones elsewhere untouched (no new clone). Added-line grep: no FORCE/DIAG/RNG-log/seed/coordinate tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
