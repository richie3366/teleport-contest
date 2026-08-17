# Rotated from AGENT-LOOP-JOURNAL.md after #1481 D-1165 hurtle_step in_out_region

## 2026-08-17 12:20 — #1466 D-1153 vault_tele tele() fallback

**Objective:** Open — `teleport.c` `vault_tele` `tele()` fallback
(named). Not teleds.
**C locus:** `teleport.c` `vault_tele` 772–783; callee `tele` /
`scrolltele` 840–912.
**Change:** no vault / `somexyspace` fail / `teleok` fail →
`await tele()` (`scrolltele(NULL)` → `safe_teleds`). Success still
`teleds(TELEDS_TELEPORT)` then return. Drop invented boolean.
Did not pull `dotele` trap-at-feet teledest. Filled no prior hash
gap. Rotated #1451. Open 11 after archive (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1465** **44**/44; next
@**#1470**).
**Verified:** private canary **33**/33 (src order; no-vault
`safe_teleds` RNG; empty/OROOM skip; vault-with-space `teleds` no
`rnd`; stone/trap/monster fallback; `hx<0` terminator; subroom
VAULT; `tele_trap` once ± vault; noteleport stay); green+strict
seed8000/0900; cohort **25**/25 (0012 vault + 0004 pony + 0367
Pri ^T + 0360/4500/0373/2200/0014/0009/1500/1800/0060/0102/0700/
0017/0030/0116/0383/0007/0361/0108/0002/5002/2600/0006) + strict
0012/0004/0367/0360/4500/2200/0002/0009/0030/0014. Path
public-unhit on no-vault once-TELEP.
**Next:** Open `mkmaze.c` `inv_pos` / VIBRATING_SQUARE (named from
invocation_pos). Not teleds.
**Blocked:** none.
