# Review 869 — 54ccff4c — muse.c slime/stone cures (D-1899)

Metadata: SHA `54ccff4c`, D-1899. Files: `js/muse.js` (+327/−13:
`cures_stoning/cures_sliming/green_mon/munslime/muse_unslime/
m_sees_sleepy_soldier` + import-name extensions). Next index 869.

Intent vs deliverable: subject promises the six slime/stone-cure
functions in C branch order. The diff delivers all six, nothing
else. Promise ≡ diff.

Inventory: 3 file-local predicates + exported `munslime` + local
`muse_unslime`/`m_sees_sleepy_soldier`. Callee closure: 6
`--can` checks, all ALREADY (weapon, timeout, uhitm, mhitm,
terminal, explode — the "two new edges" join existing static
imports); the rest (`m_useup`, `mreadmsg`, `mplayhorn`,
`mzapwand`, `mon_adjust_speed`, `splitobj`, `zhitm`,
`observe_object`, `bcsign`, `mintrap`) are file-local LIVE or
already imported — confirmed each name resolves. Nothing
deleted or re-pointed, so no re-point `sym` output is owed.

**C ↔ JS fidelity** (each vs its `csym` range, RNG
call-for-call): `cures_stoning` ≡ `muse.c:2984–2998` (POT_ACID /
glob+slimeproof / CORPSE+openable-TIN / NON_PM / LIZARD+acidic,
exact order) ✓; `cures_sliming` ≡ `:3245–3261` (fire eyes+hands,
oil hands, wand/charged-blowable-horn) ✓; `green_mon` ≡ `:3264+`
(Hallu gate, CLR_GREEN/BRIGHT_GREEN, `#if 0` stays out) ✓;
`munslime` ≡ `:3030–3100` (slimeproof/meating gates, `helpless`
macro inlined exactly as `msleeping || !mcanmove` — no clone;
STRAT_WAITFORU clear, breath→`{otyp:STRANGE_OBJECT}` odummy,
minvent scan, fire-trap-here-or-adjacent with mmove/!mtrapped,
3×3 eligibility, partial Fisher-Yates via `rn1(nxy-idx,idx)`,
`hands_obj` for the trap step) ✓; `muse_unslime` ≡ `:3103–3242`
(trap same-cell vs move-onto with remove/place/worm_move,
`mintrap` FORCETRAP; breath `!rn2(3)`→`rn1(10,5)` + `zhitm` ±21;
scroll mconf pretty-fire vs `rn1(3,3)`/`bcsign` damage with
`Math.trunc` on positive values + useup-before-`explode(-11)`;
oil split+`begin_burn`+burning-quaff + `d(3,4)`; wand/horn +
`zhitm` ±1; by_you `xkilled(NOMSG|NOCONDUCT)` vs
`monkilled(fire)`; `exclam` inlined with the `zap.c` citation;
slime-burned-away + `makeknown`; movement/`mlstmv` tax) ✓;
`m_sees_sleepy_soldier` ≡ `:360–381` (7×7, self skip, mercenary,
guard exclusion, helpless inline) ✓. `vtense(null, …)` matches
the file's pre-existing idiom and the C null-subject singular
case. Two notes, neither queueable: `mondead/mondied/killed`
join the imports unused (lint-level); the deleted probe is
gone as claimed.

Hallucinations / overclaim: none. The vacuous-hidden note is
quoted with the zero-block row cited; the named deferrals
(`munstone` envelope, AD_SLIM/AD_STON callers, bugle use) sit in
the map rows that own them.

Density: 327 insertions, one `muse.c` family — coherent.

Verification: D-log gates PASS with full 44/44 forced (FOOD
path). Re-measured myself: `hidden-proxy.mjs verify munslime
--base 54ccff4c~1` → `0 blocked (0 at baseline, 0 working)` —
vacuous as stated; HELDOUT Tier C row cited no blocks, public
gates carry it. Diff grep: no DIAG/seed/RNG-log/fastforward
(`FORCE` hits are the `FORCETRAP` const only).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
