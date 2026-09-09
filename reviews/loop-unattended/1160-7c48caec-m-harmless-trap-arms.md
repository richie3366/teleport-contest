# Review 1160 — 7c48caec — m_harmless_trap residual arms

Subject promises: `trap.c` m_harmless_trap residuals — ANTI_MAGIC + `defended`, sqky cringe gate, rocktrap empty-door pline (D-2194, map-driven, vacuous corpus verify).
Diff actually adds: canonical `defended` + `resists_magm` (+ file-local `monsndx`) in `js/mondata.js` (+85); `Is_dragon_armor` export widening in `js/artifact.js` (+1/−1); three `m_harmless_trap` arms + sqky `mindless` gate + rocktrap `pline_mon` arm in `js/trap.js` (+~20). Import widenings only.

## Intent vs deliverable

Promise matches diff. Map-driven row (data.md:1038–1040), not corpus-recorded — the D-log says so explicitly, and the named
residuals list (anti-magic/webmaker/`defended` resists, Deaf+mindless silent, empty-door `pline_mon`, drawbridge-under pool/lava)
is worked except the items it names as still deferred.

## Inventory

- `defended`, `resists_magm`, `monsndx` (`js/mondata.js`): new canonicals in their C home.
- `Is_dragon_armor` (`js/artifact.js`): local → exported (its `defends` caller was already live; no re-point).
- `m_harmless_trap` SLP_GAS/FIRE/ANTI_MAGIC, `trapeffect_sqky_board`, `trapeffect_rocktrap` (`js/trap.js`): arm wiring.

## C ↔ JS fidelity

C `trap.c:1105–1187` (`node scripts/csym.mjs m_harmless_trap`): `resists_sleep||defended(AD_SLEE)` (`:1133–1136`),
`resists_fire||defended(AD_FIRE)` (`:1141–1144`), `resists_magm||defended(AD_MAGM)` (`:1173–1176`) — JS wires exactly these
three, with `AD_MAGM=1`/`AD_SLEE=4` confirmed against `monattk.h:43/46` ✓.

`defended` ports C `mondata.c:89–124` arm-for-arm:

```c
    o = is_you ? uwep : MON_WEP(mon);
    if (o && o->oartifact && defends(adtyp, o)) return TRUE;
    mndx = monsndx(mon->data);
    if (mndx >= PM_GRAY_DRAGON && mndx <= PM_YELLOW_DRAGON) { /* own scales */
        otemp.oclass = ARMOR_CLASS;
        otyp = GRAY_DRAGON_SCALES + (mndx - PM_GRAY_DRAGON); o = &otemp;
    } else o = is_you ? uarm : which_armor(mon, W_ARM);
    if (o && Is_dragon_armor(o) && defends(adtyp, o)) return TRUE;
```

JS mirrors it including the otyp-synth comment C itself carries ("defends() and Is_dragon_armor() only care about otyp") ✓.
`resists_magm` ports C `mondata.c:214–244` in order: species `AD_MAGM`/baby-gray-index/`AD_RBRE` → wielded-weapon artifact →
`W_ARMOR|W_ACCESSORY[|W_WEP|W_SWAPWEP]` invent/minvent scan with the `!isYou || weapon/weptool` gate ✓.
`monsndx` (`mndx ?? mnum ?? NON_PM`) matches the D-1933 idiom; `mondata.js` imports canonical `dmgtype` (`js/monsters.js:527`)
rather than adding a seventh clone ✓.

Sqky: `else if (!mindless(mtmp.data))` matches C `:1453` inside the `in_sight → !Deaf` structure ✓ (`mindless` live,
`js/monsters.js:639`, pre-imported in trap.js). Rocktrap: `in_sight && cansee` → `pline_mon(mtmp, "A trap door above %s …",
mon_nam)` matches C verbatim incl. arg ✓ (deltrap/newsym/return pre-existing).

Callee closure (`node scripts/sym.mjs` each): `defends`/`defends_when_carried` LIVE (`artifact.js:2152/2200`); `MON_WEP`
(`weapon.js:84`), `which_armor` (`worn.js:398`), `is_weptool` (`wield.js:111`) LIVE canonicals; `pline_mon` async-awaited,
pre-imported. Cycle note: the message calls the mondata imports "new edges", but `--can mondata.js <artifact|weapon|wield|worn>.js`
reports ALREADY on all four — widenings of existing static imports, no new edge; substance safe either way.
Omitted arms (`sleep_monst defended` wiring, zap/explode/mhitm resists clones, remaining `defended` call sites,
impossible-on-unknown-ttyp default) are all named in-commit — legitimate OMITs.

Two pre-existing observations, not this SHA's (both lines untouched by the diff, house no-movement class): sqky squeak/cringe
use plain `pline` where C uses `pline_mon` (set_msg_xy only), and the squeak arm uses `x_monnam_tame` where C prints `mon_nam`.

## Hallucinations / overclaim

None. "Dispatch ported, callee live" holds on every arm; the throwaway /tmp probe claim is scratch, not shipped.

## Density

~105 JS lines across two canonical ports + three arm wirings, one C family (`mondata.c` + its `trap.c` caller) — dense but
single-cluster, legitimate §2b.

## Verification

D-log states the corpus check is vacuous (map-driven row, 0 blocked) and ships on public gates incl. forced full 44/44 for the
3 shared modules. Re-measured:

```text
verify m_harmless_trap: baseline 7c48caec~1 (scoreboard at 3fbdad72) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify m_harmless_trap: no corpus session is blocked on it at 7c48caec~1 — a vacuous verify is NOT a corpus PASS.
```

The vacuous claim is true and explicitly labeled, not presented as PASS. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate gates.
Rule #2 clean (re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
