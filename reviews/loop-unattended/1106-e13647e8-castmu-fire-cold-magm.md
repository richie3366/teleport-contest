# Review 1106 — e13647e8 — castmu AD_FIRE/COLD/MAGM switch + mdamageu tail (D-2140)

Metadata: SHA `e13647e8`, `js/mcastu.js` only (63 insertions in
`js/`). Queue row fired: Open `mcastu.c castmu` (1 session,
scen-wish-Monk-92063 step 124). No prior review claimed closed.

## Intent vs deliverable

Subject promises the full C switch (`:247–304`) in C order plus
the `if (dmg) mdamageu` tail. Diff delivers: `ret` variable,
three new case arms (FIRE/COLD/MAGM), SPEL/CLRC preserved through
the live `mcast_spell`, tail call, plus supporting imports/consts
(`M_SEEN_COLD`, `mon_spell_hits_spot`, `mdamageu`, `AD_MAGM`/
`AD_COLD` consts, local `Cold_resistance`). Promise matches diff.

## Inventory

Three new switch arms, one changed tail (`return M_ATTK_HIT` →
`if (dmg) await mdamageu` + `return ret`), one new local helper
(`Cold_resistance`), two extended import edges (`const.js`,
`zap.js`), one new import (`mhitu.js`), one extended const block.
Combined-arm callee closure, checked per arm: FIRE —
`pline`/`Fire_resistance`/`shieldeff`/`monstseesu`/`monstunseesu`/
`burn_away_slime`/`mon_spell_hits_spot`; COLD — same with
`Cold_resistance` + `M_SEEN_COLD`; MAGM — `Antimagic`/`shieldeff`/
`d()`/`mdamageu`; SPEL/CLRC — in-module `mcast_spell`. Liveness:
`mon_spell_hits_spot` LIVE (`zap.js:6581`, awaited),
`mdamageu` LIVE (`mhitu.js:592`, awaited),
`monstseesu`/`monstunseesu` LIVE, the rest pre-existing imports.
No STUB in any live arm, so all four arms may ship together.
`Cold_resistance()` is a new local clone but mirrors the
module's existing `Fire_resistance` convention line-for-line —
verified CLONE, not drift. `imports.mjs --can` confirms neither
the `zap.js` extension nor the `mhitu.js` import is a new edge
(both already imported) — no TDZ risk.

## C ↔ JS fidelity

Audited arm-by-arm against `mcastu.c:230–304` (body via `csym`,
range cited). FIRE: pline text → resist gate → `shieldeff(ux,uy)`
→ resist pline → `monstseesu(M_SEEN_FIRE)` + `dmg = 0`, else
`monstunseesu` → `burn_away_slime()` → `mon_spell_hits_spot` —
exact order, exact short-circuit. COLD identical with
`M_SEEN_COLD`. MAGM: C `You("are hit by a shower of missiles!")`
rendered as full-text `pline` (no `You` clone — correct per sym
guidance, cf. `zap.js:1927`); `Antimagic()` → shieldeff →
full-text bounce pline for C `pline_The("missiles bounce off!")`
→ `monstseesu(M_SEEN_MAGR)` + `dmg = 0`, else re-roll. Re-roll
verified: JS `ml = mtmp.m_lev | 0` (`mcastu.js:815`), so
`d(trunc(ml/2)+1, 6)` ≡ C `d(mtmp->m_lev/2+1, 6)` — same variable
C itself uses two lines earlier for the foundyou dice. AD consts
verified against `monattk.h:42–44` (MAGM 1, FIRE 2, COLD 3).
SPEL/CLRC unchanged (`mcast_spell`, `dmg = 0`); tail `if (dmg)
await mdamageu(mtmp, dmg)` + `return ret` matches C exactly.
Remaining names (`mcast_spell` sub-arms, `buzzmu`, fumble and
mis-aim wording) are map-named and outside this switch.

## Hallucinations / overclaim

None. "Full C switch in C order" is accurate for the claimed
envelope (`:247–304`); the entry does not claim the deferred
`mcast_spell` sub-arms or the `buzzmu` path.

## Density

One C switch family, one module, 63 insertions. Right-sized per
§2b (one falsifier, one C locus family).

## Verification

D-log bullet shows `verify.mjs --fn castmu` → PROGRESS + green
2/2 + strict ×2 + cohort 7/7. Re-measured myself:
`hidden-proxy verify castmu --base e13647e8~1` → `0 PASS, 1 moved
past, 0 unchanged, 0 worse → PROGRESS` (Monk-92063 castmu@124 →
ready_weapon@145, later step and later owner). Claim true; no
vacuous check. Added-line grep: 0 banned-pattern hits (FORCE /
DIAG / RNG-log / fastforward / seed gates).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
