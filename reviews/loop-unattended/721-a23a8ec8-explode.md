# Review 721 — a23a8ec8 — explode.c map_invisible / You_hear vs Boom! / engulfer (D-1760)

## Metadata
- Full / short hash: `a23a8ec85910c51b7d69f56529516afa44565802` / `a23a8ec8`
- Parent: `01499c3f` (D-1759). This file audits **this SHA only** (third of nine `js/` commits since review **718**). Archive **Addressed:** D-1760 `a23a8ec8`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 04:49:52 +0200
- D-id: **D-1760**
- Stats: `js/explode.js` +115/−; `js/sndprocs.js` +1. Total `js/` insertions **116** <250. Band **150–350**.
- Claims to close: Open explode `map_invisible` `!canspotmon` / You_hear vs Boom! after D-1759 / review **699** (named You_hear vs Boom! and `map_invisible` when `mtmp && !canspotmon`). Not `explosion_to_glyph` (D-1738). `reviews/loop-2026-08-15/` has no unpaid explode Must-fix.
- JS / map: `explode.js` `explode` / `engulfer_explosion_msg`; `sndprocs.js` `se_blast`. `c-js-map/turns.md`.
- Prior: **699** named those two arms; **720** did not glue explode.

## Intent vs deliverable

Git subject promises: `explode.c` `explode` so 3x3 `map_invisible` when `cansee && !canspotmon`, You_hear vs Boom!, and `engulfer_explosion_msg` instead of unmap-only plus always Boom! after D-1759.

`node scripts/csym.mjs explode` → **NOT FOUND** (definition is `void` then newline then `explode(` at `explode.c:198–206`; parser misses it). `--callers explode`: 29 refs (`zap.c:2750`, `muse.c:3164` SCROLL, `dig.c:919` TRAP_EXPLODE, …). Envelope read: 3x3 I-glyph + visible/`You_hear`/`Boom!` `:354–452`; caught-in `:503–509`; generic killer `:645–650`. `engulfer_explosion_msg` `:117–179` (callers `:8`, `:504`). `map_invisible` `display.c:377–385` (explode `:379`). `unmap_invisible` `:387–396`. `You_hear` `pline.c:435–452`. `Deaf` `youprop.h:125`. `digests` `mondata.h:71–72`. `engulfing_u` `monst.h:250`. `seemimic` `mon.c:4408–4427`. `canspotmon` `display.h:129`. `explosionmask` `explode.c:25–115`. `Soundeffect` contest empty.

```378:452:nethack-c/upstream/src/explode.c
            if (mtmp && cansee(xx, yy) && !canspotmon(mtmp))
                map_invisible(xx, yy);
            else if (!mtmp)
                (void) unmap_invisible(xx, yy);
            if (cansee(xx, yy))
                visible = TRUE;
            ...
    if (visible) {
        /* Start the explosion */
        ...
    } else {
        if (olet == MON_EXPLODE || olet == TRAP_EXPLODE) {
            str = "explosion";
            generic = TRUE;
        }
        if (!Deaf && olet != SCROLL_CLASS) {
            Soundeffect(se_blast, 75);
            You_hear("a blast.");
            didmsg = TRUE;
        }
    }
    if (!Deaf && !didmsg)
        pline("Boom!");
```

Parent: 3x3 `unmap_invisible` only in the `!mtmp` else (never `map_invisible`); always `explode_show_visible`; always `Boom!` when `!u.Deaf`; caught-in pline for engulfer; killer.name always overwritten. The diff **does** the C 3x3 I-glyph, `visible` gate, unseen generic + You_hear/`didmsg`, Boom! only when `!didmsg`, `engulfer_explosion_msg` + `seemimic`, generic killer skip, inline youprop Deaf. It **does not** port hallu `rndmonnam`, You_hear Underwater/Unaware prefixes, TRAP_EXPLODE `uhim`/`uhis`. Named. It **does not** touch `explosion_to_glyph`. D-1738.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `explode` `:198–652` 3x3+msg envelope | LIVE repaired | I-glyph, You_hear vs Boom!, generic |
| `engulfer_explosion_msg` `:117–179` | LIVE new (local) | digest vs enfold adjectives |
| `map_invisible` / `unmap_invisible` | LIVE import | display.js |
| `canspotmon` | LIVE import | display.js |
| `seemimic` | LIVE import | mon.js |
| `digests` | LIVE import | mhitu.js export of `mondata.h` |
| `engulfing_u` | LIVE import | const.js |
| `Soundeffect` / `se_blast` | LIVE no-op + re-export | contest empty; sndprocs re-exports se_blast |
| `You_hear` | CLONE inlined | acoustics; Underwater/Unaware named |
| `Deaf` | CLONE inline | youprop; not `hero_Deaf` #4 |
| `rndmonnam` hallu | OMIT named | |
| TRAP_EXPLODE `uhim` | OMIT named | |

`node scripts/sym.mjs`:

```
explode          js/explode.js:354   ASYNC
engulfer_explosion_msg NOT EXPORTED — 1 LOCAL  explode.js:311  => Do NOT write #2
map_invisible    js/display.js:1004   sync
unmap_invisible  js/display.js:1085   sync
canspotmon       js/display.js:996   sync
seemimic         js/mon.js:877   sync
digests          js/mhitu.js:813   sync  (mhitm.js still clones — do not write #3)
Soundeffect      js/sndprocs.js:36   sync
se_blast         js/generated/seffects_data.js:19   sync
engulfing_u      js/const.js:3158   sync
You_hear         NOT EXPORTED — 14 LOCAL  => Do NOT write #15 (this SHA inlined)
rndmonnam        js/do_name.js:267   sync
```

Re-points: `unmap_invisible`-only else → `map_invisible` import; `se_blast` re-export. New: `engulfer_explosion_msg`, `seemimic`, `digests`, `canspotmon`. `node scripts/imports.mjs --can explode.js display.js map_invisible` / `canspotmon` / `mon.js seemimic` / `mhitu.js digests`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**3x3 I-glyph (`:378–383`).** `mtmp && cansee && !canspotmon` → `map_invisible`; `else if (!mtmp)` → `unmap_invisible`; spotted mtmp does **neither**. Then `cansee` → `visible`. JS the same (DEADMONSTER ≡ `mhp<1`; steed if you-cell). Parent unmapped only when `!mtmp`, so a cansee-but-unspottable monster never got `I`. **Match C.** `map_invisible` skips hero cell (`:380`). LIVE.

**Visible blast (`:388–438`).** C `if (visible)` tmp_at/`explosion_to_glyph`/shield sparkle. JS `explode_show_visible` only when `visible` (parent always painted). Glyph path is D-1738. **Match the gate.**

**Unseen (`:439–448`).** MON/TRAP → `str="explosion"`, `generic=TRUE`. `!Deaf && olet!=SCROLL_CLASS` → `Soundeffect(se_blast,75)` then `You_hear("a blast.")` then **`didmsg=TRUE` even if You_hear no-ops**. JS the same (`acoustics !== false` around the pline; `didmsg=true` outside that if). SCROLL unseen still falls through to Boom!. **Match.**

**Boom! (`:451–452`).** `!Deaf && !didmsg`. Visible: didmsg stays false → Boom! as well as the blast paint. Unseen with You_hear: no Boom!. Parent always Boom!. **Match C after this SHA.**

**Deaf (`youprop.h:125`).** Inline `HDeaf\|\|EDeaf\|\|uroleplay.deaf\|\|u.Deaf`. Canary H/E/roleplay. **Match.** Did **not** add `hero_Deaf` #4.

**You_hear (`pline.c:435–452`).** C `(Deaf && !Unaware) \|\| !acoustics` then Underwater “barely” / Unaware “dream” / “You hear”. This site already gated `!Deaf`, so Unaware+Deaf dream does not run here. Remaining: Underwater/Unaware prefixes when **not** Deaf. Named. JS `You hear a blast.` Inlined — **not** You_hear clone #15.

**`engulfer_explosion_msg` (`:117–179`).** `digests(ustuck)` FIRE heartburn / COLD chilly / DISN wand irradiated else perforated / ELEC shocked / DRST poisoned / ACID upset stomach / default fried → `"%s gets %s!"`. Else toasted / chilly / overwhelmed|perforated / shocked / intoxicated / burned / fried → slightly. JS the same switches. LIVE `digests` (`mondata.h` AT_ENGL+AD_DGST). Caller `:503–509`: `engulfing_u(mtmp)` then else `cansee` → `seemimic` if `m_ap_type` then caught-in. LIVE `engulfing_u` / `seemimic`. Parent used caught-in for the engulfer. **Match.**

**Generic killer (`:645–650`).** Unseen MON_EXPLODE keeps `killer.name` (gas spore) when `generic`. JS `if (!generic && str && str !== killer.name)`. **Match.**

**SCROLL You_hear skip.** `olet != SCROLL_CLASS`. Tower-of-flame unseen still Boom! if !Deaf. **Match.**

**RNG.** This envelope burns none (`map_invisible`/`You_hear`/`Boom!`/`engulfer` have no `rn2`). Hallu `rndmonnam` in C `:490–501` is named omit (JS has no `do_hallu`). **Match the shipped arms.**

**Callee closure (3x3 + unseen msg + engulfer).** LIVE: `map_invisible`, `unmap_invisible`, `canspotmon`, `cansee`, `explode_show_visible`, `Soundeffect`, `seemimic`, `digests`, `engulfing_u`, `Monnam`, `explosionmask`. CLONE verified: Deaf predicate; You_hear acoustics subset. OMIT named: Underwater/Unaware prefixes; `rndmonnam`; TRAP_EXPLODE `uhim`. STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “3x3 `map_invisible`, You_hear vs Boom!, `engulfer_explosion_msg`”: **true**. D-log “did not touch `explosion_to_glyph`”: **true**. Do **not** stamp “Match C `You_hear` Underwater/Unaware prefixes.” Do **not** stamp “Match C hallu `rndmonnam` per target.” Do **not** stamp “Match C TRAP_EXPLODE `uhim`/`uhis` killer.” Do **not** stamp “Match C grabbing double-damage.” Journal “fortress held” is not a public unseen-blast screen. **Public-unhit** for I-glyph / You_hear / engulfer. Admit that.

## Density

§2b: one C function envelope (`explode` 3x3 + msg) + its static `engulfer_explosion_msg`. +116. Related `seemimic` before caught-in. Did **not** glue `rndmonnam` or `explosion_to_glyph`. Did **not** reopen D-1759 `trapname`.

## Verification

D-log: save-oracle skip (untagged `explode.c:explode`); node 14/14 (I-glyph / See_invisible / You_hear / Boom / HDeaf / EDeaf / roleplay / SCROLL unseen / unmap empty / !acoustics); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Unseen blast and swallow **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (3x3 I-glyph, unseen You_hear/`didmsg`/Boom!, engulfer msg match C; remaining named). Named: hallu `rndmonnam`; You_hear Underwater/Unaware; TRAP_EXPLODE `uhim`/`uhis`; grabbing double-damage; golemeffects/Invulnerable. Do **not** add `You_hear` #15. Do **not** add `hero_Deaf` #4. Do **not** add `engulfer_explosion_msg` #2. Do **not** unmap when `canspotmon`. Do **not** Boom! after a successful You_hear `didmsg`. Do **not** re-port D-1738.

Verdict: **ACCEPT-WITH-DEBT**
