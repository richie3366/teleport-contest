# Review 1093 — 86cd47fa — zhitm ZT_LIGHTNING blind arm (D-2127)

Metadata: SHA `86cd47fa`, `js/zap.js` +21/−4, `js/mhitm.js` +1/−1
(export keyword only). Queue row `zap.c` zhitm,
scen-wish-Samurai-92087 step 64/288, RNG-first at `zap.c:4356`:
C `rnd(50)=37 @ zhitm` vs JS `rn2(3)=2 @ zhitm(zap.js:1841)`.
Identical toplines («You kill poor Hachi! You hear the rumble of
distant thunder...--More--»). No prior review claimed closed.

## Intent vs deliverable

Subject promises: `rnd(50)` blind drawn before the `rn2(3)` destroy
gate. Diff actually adds: (1) spellcaster `spell_damage_bonus`; (2)
the blind gate (`rnd(50)` / `mcansee = 0` / 127-clamped `mblinded`);
(3) `resists_blnd_mm` export + import. Promise matches diff. The
D-log's "JS was" analysis nails the mechanism: the destroy gate
consumed the stream slot where C draws `rnd(50)`, shifting every
later draw one slot early.

## Inventory

Changed JS: `zhitm` ZT_LIGHTNING arm (zap.js); `resists_blnd_mm`
(mhitm.js) — export keyword only, body pre-existing. Callee closure:

| Symbol | Status | Evidence |
|---|---|---|
| `spell_damage_bonus` | LIVE, same-module (`zap.js:4196`) | verified RNG-free (0 `rn2`/`rnd` in body) |
| `resists_blnd_mm` | LIVE (`mhitm.js:717` sync) | import-the-export; `zap.js`→`mhitm.js` edge pre-exists, no `--can` needed |
| `engulfing_u` | LIVE (`const.js:3195` sync) | already imported |
| `rnd` / `destroy_items` | LIVE, pre-existing | untouched |

No STUB in the live arm: `defended()` stays commented-out and
`shieldeff` void, but both are named-deferred and draw no RNG, so
they cannot shift the stream.

## C ↔ JS fidelity

C locus `zap.c:4342-4365` (arm text pulled via `csym.mjs zhitm`,
`case ZT_LIGHTNING` — D-log cites `:3479-3502` for the bonus helper
and `:4342-4365` for the arm):

1. `tmp = d(nd,6)` → spellcaster `spell_damage_bonus` — JS matches
   (bonus is Int/level arithmetic, RNG-free, so stream-neutral).
2. `resists_elec || defended` → shield + `tmp = 0` ("can still
   blind") — JS matches, including the fall-through-to-blind.
3. `!resists_blnd && !(type > 0 && engulfing_u) && nd > 2` →
   `rnd(50)`, `mcansee = 0`, `mblinded` 127-clamp — JS gate
   identical (`(type|0) > 0`, `(nd|0) > 2`), clamp identical
   (`> 127 ? 127 : sum` vs C `if/else` form).
4. `!rn2(3)` → `destroy_items` — now draws after `rnd(50)`, which is
   precisely the reported divergence.

`resists_blnd_mm` matches the C monster arm (`mondata.c:247-272`,
read in full): `mblinded || !mcansee || !haseyes || msleeping` +
AD_BLND EXPL/GAZE; youmonst Blind/Unaware arm correctly excluded
(every zhitm caller passes a `monst*`, never `&youmonst` — stated in
the entry); `resists_blnd_by_arti` named-deferred. The `!mon →
true` guard is a safe dead path (callers never pass null; returns
resist = no draw, same observable as no-blind).

## Hallucinations / overclaim

None. "Exact C order" holds per the arm text above; deferred items
(MM/FIRE/COLD-arm bonus, `defended()`, `shieldeff`,
`resists_blnd_by_arti`) are named in header + map.

## Density

22 insertions for a 24-line C arm — the whole envelope. Right-sized.

## Verification

D-log Verify bullet: `verify.mjs --fn zhitm` → PASS syntax + PASS
rule2 + hidden PROGRESS + green 2/2 + strict ×2 + cohort 7/7 (full
skipped, no shared file). Re-measured myself:
`hidden-proxy.mjs verify zhitm --base 86cd47fa~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Samurai-92087 moved 64 → `dobuzz`@65). Grep: no FORCE/DIAG/seed/
fastforward/coords. Queue row archived; map zhitm rows updated.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
