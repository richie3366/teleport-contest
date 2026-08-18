# Review 187 — 89588300 — teleport.c `dotele` energy/`spelleffects` SPE_TELEPORT_AWAY (D-1225)

## Metadata
- Full / short hash: `89588300b8dec70182dc1230883d4025e1284f93` / `89588300`
- Parent: `790ca8b7` (D-1224). This file audits **this SHA only**. Archive row **Addressed:** D-1225 lacked the short hash; this review commit fills `89588300`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 19:34:17 +0200
- D-id: **D-1225**
- Stats: 11 files, +240 / −77 — `js/teleport.js` +89 / −12; `js/spell.js` +64 / −14.
- Claims to close: Open `spell.c` energy/`spelleffects` teleport (named from D-1208 / D-1209 / review **170** / **171**). Not `#teleport` doextcmd. `reviews/loop-2026-08-15/` has no unpaid energy-spellcast Must-fix.
- JS / map: `teleport.js` `dotele` `:1070–1142`; `spell.js` `known_spell` + `spelleffects` SPE_TELEPORT_AWAY atme + `spelleffects_check` capacity. `c-js-map/turns.md`. `#teleport` / directional `weffects` / amulet drain still named.
- Prior reviews this SHA claims to close: **170** item 2; **171** item 1; **186** named energy as next Open.

## Intent vs deliverable

Git subject promises: “Match C teleport.c dotele energy/spellcast so ^T without a trap uses hunger/STR/uen/capacity then spelleffects(SPE_TELEPORT_AWAY) or a direct Pw debit, instead of Teleportation-only fail-closed.”

Old JS (`!trap && !break_the_rules`): if `!Teleportation` pline “not able to teleport at will” return. C (`teleport.c:1070–1142`): maybe `known_spell` → `castit`; hunger/STR/uen fail return 0; `check_capacity` return 1; `castit` → `exercise` + `spelleffects(SPE_TELEPORT_AWAY, TRUE, FALSE)` and return if TIME; else debit `5 * oc_level` and fall through to `tele()` / `morehungry(100)`.

The diff **does** that envelope, ports `known_spell`, puts SPE_TELEPORT_AWAY on the existing healing self-zap arm (atme → `zapyourself` → live `tele()`), adds C’s capacity TIME abort to `spelleffects_check`, and `losehp` when `zapyourself` returns damage (C `:1500–1508`). It does **not** pull `#teleport`, directional `weffects`, or Amulet drain. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `known_spell` | C callee `:2363–2375`, **new** | enum `spe_*` matches `spell.h:21–24` |
| `dotele` energy block | C `:1070–1142`, **wired** | hunger/STR/uen/capacity then cast or debit |
| `spelleffects` | C callee, **now exported** | atme SPE_TELEPORT_AWAY live; other otyps still “Nothing happens” |
| `zapyourself` SPE_TELEPORT_AWAY | C callee, **already live** | `zap.js:3151–3167` `tele()` |
| `spelleffects_check` `check_capacity` | C `:1279–1283`, **new** | TIME; message “while carrying so much stuff” |
| `can_teleport` | C `mondata.h` M1_TPORT, **imported** | |
| `Role_if(PM_WIZARD)` | `urole.mnum === PM_WIZARD` | XL 8 vs 12 |
| `near_capacity` | already imported in `teleport.js` | `check_capacity` clone `>= EXT_ENCUMBER` |
| `#teleport` `doextcmd` | **named omit** | |
| `weffects` directional | C `:1509–1510`, **named omit** | atme zeros dir so unused |
| Amulet drain in check | C `:1290–1303`, **named omit** | pre-existing deferral |
| `spell_backfire` | C `:1180–1216`, **named omit** | Fresh path never `spellknow<=0` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

## C ↔ JS fidelity

Pinned C gate (`teleport.c:1070–1142`), shortened:

```
    if (!trap && !break_the_rules) {
        if (!Teleportation || (u.ulevel < (Role_if(PM_WIZARD) ? 8 : 12)
                               && !can_teleport(gy.youmonst.data))) {
            knownsp = known_spell(SPE_TELEPORT_AWAY);
            castit = (knownsp >= spe_Fresh && !Confusion);
            if (!castit && !break_the_rules) { You("%s.", …); return 0; }
        }
        energy = 5 * objects[SPE_TELEPORT_AWAY].oc_level;
        if (uhunger<=10) … else if (ACURR(A_STR)<4) … else if (energy>u.uen) …;
        if (cantdoit) { You("%s %s.", cantdoit, castit?"for a teleport spell":"to teleport"); return 0; }
        else if (check_capacity("Your concentration falters from carrying so much.")) return 1;
        if (castit) {
            exercise(A_WIS, TRUE);
            if (spelleffects(SPE_TELEPORT_AWAY, TRUE, FALSE) & ECMD_TIME) return 1;
            else if (!break_the_rules) return 0;
        } else { u.uen -= energy; disp.botl = TRUE; }
    }
```

JS (`teleport.js:1901–1966`): outer `!trap && !break_the_rules`. Teleportation is H\|\|E\|\|sticky (C is H\|\|E; sticky clone as elsewhere). XL 8 Wizard / 12 else. `can_teleport(youmonst.data)` is `mflags1 & M1_TPORT`. `known_spell` loop + `k > KEEN/10` Fresh / `k>0` GoingStale / else Forgotten / miss Unknown — Match C `:2363–2375` (`Math.trunc(KEEN/10)` ≡ C `KEEN/10` with KEEN=20000).

`Confusion` for `castit`: C `#define Confusion HConfusion`. JS `HConfusion \|\| u.Confusion`. Extra sticky can only **block** castit more often. Not a stub.

Messages: `You ${why}.` with why `can't cast that spell` / `don't know that spell` / `are not able to teleport at will` ≡ C `You("%s.", …)`. Hunger/STR/uen strings + `for a teleport spell` vs `to teleport`. Capacity in `dotele`: “from carrying so much.” (C `check_capacity` that string) return **true** (time). `hack.c:4399–4408` is `near_capacity() >= EXT_ENCUMBER`. Match.

`castit`: `exercise(A_WIS)` then `spelleffects(otyp, true, false)`. C `force=FALSE` so `spell_idx` + **`spelleffects_check`**. JS same (`if (!force) chk`). C **also** `exercise`s inside `spelleffects` after the check — JS too. Double WIS is C.

If check/spell returns `ECMD_TIME` (`0x01`), `dotele` returns true **before** the later `tele()` / `morehungry(100)`. C same. The actual teleport is `zapyourself` → `tele()` inside `spelleffects`. **Callee is live.** Not a stub dispatch.

Non-castit: debit `5 * oc_level` via `game.objects[SPE_TELEPORT_AWAY]` (same table `tport_spell` already uses), `botl`, fall through to `next_to_u` / `tele` / `morehungry(100)`. Match.

`spelleffects` SPE_TELEPORT_AWAY joins the healing `if`, **not** the whole C wand-effect `switch` (`spell.c:1457–1514`). Bless is gated to healing + P_SKILLED only (C `:1480–1484`). `atme` zeros dx/dy/dz. `zapyourself(pseudo, true)`: SPE_TELEPORT_AWAY does not set `damage` (stays 0) so `losehp` skipped. Healing `healup` also returns 0. Adding `losehp` matches C for damaging self-zaps in that arm; it does not double-heal. Directional `weffects` still named; atme never takes that branch.

`spelleffects_check` hunger/STR became `else if` (C already) and gained capacity TIME with C’s **spell.c** string (“while carrying so much stuff”), distinct from `dotele`’s string. Match the two C sites. Amulet `rnd(2*energy)` still deferred — named RNG omit if ^T-cast while carrying the Amulet.

`uhim()` is `genders[female].him` (`roles.js:636–637`); C `zapped %sself` → `himself`. JS `` zapped ${uhim()}self ``. Match when damage ≠ 0.

Wizard `break_the_rules` skips the whole `!trap && !break` block. Match. Inner `else if (!break_the_rules) return 0` is dead inside that block (C `#if 0` comment); JS copies it.

C `spelleffects` (`spell.c:1470`) lists `SPE_TELEPORT_AWAY` with knock/lock/healing/… behind `objects[otyp].oc_dir != NODIR`. Teleport-away is directional. `atme` forces self. JS skipped the `oc_dir` test because this otyp is DIR; a later NODIR otyp must not be stuffed into this `if`. Named: the rest of that `switch` (fireball, seffects scrolls, haste, …).

`SPELL_LEV_PW` is `lvl * 5`. C dotele uses a local `#define spellev(spell_otyp) ((int) objects[spell_otyp].oc_level)` then `energy = 5 * spellev(SPE_TELEPORT_AWAY)` — same number as `spell.c` `spellev(book_index)` once the book’s `sp_lev` was copied from `oc_level` at learn. JS debit path uses `game.objects[SPE_TELEPORT_AWAY].oc_level`; the check path uses `SPELL_LEV_PW(spellev(spell))` from the book. If a wizard `tport_spell` ADD_SPELL copied `oc_level` into `sp_lev` (D-1209), they match.

`rejectcasting` on the `spelleffects_check` path prints **nothing** (C same: messages live in `getspell`; the duplicate check only returns `ECMD_OK`). Stunned ^T with a known spell and no Teleportation: `castit` true if Fresh && !Confusion; then check `rejectcasting` → abort OK → `dotele` `!(TIME) && !break` → return false, no tele. Match C.

`percent_success` / `rnd(100)` fail-to-cast still runs on the `castit` path (C). That is extra positional RNG vs the old fail-closed stub. Public suite does not `^T` this way; private canary claimed 61/61. Cadence still 44/44.

## Hallucinations / overclaim

Subject + D-1225 say ^T without a trap uses hunger/STR/uen/capacity then `spelleffects(SPE_TELEPORT_AWAY)` or a Pw debit. **That envelope plus live `zapyourself`/`tele` is the hunk.** Stamping **Addressed:** D-1225 is fair. This is **not** “Match C full `spelleffects` switch” and **not** “Match C `#teleport`.” s-mode `dotelecmd` now actually casts (D-1209 add-spell then this gate) — fair side effect of the same C function, not a second cluster.

Do **not** stamp “Match C `spell_backfire`” (still deferred; Fresh `castit` never hits `spellknow<=0`) or “Match C Amulet drain.”

## Density

`dotele` energy + `known_spell` + the atme arm `spelleffects` already needs + capacity in the check C duplicates. Two modules that already import each other. ~150 lines. Right size. Did not glue `#teleport`.

## Branch-by-branch confirm

1. Trap still set (TELEP/LEVEL `'y'` returned earlier): skip energy. Match.
2. Wizard `break_the_rules`, no trap: skip energy; `tele`; no hunger-from-this-block. Match.
3. Intrinsic Teleportation, XL ok: not `castit`; debit 5×level; `tele`; `morehungry(100)`. Match.
4. No Teleportation, unknown spell: “don't know that spell”; return false; no tele. Match.
5. No Teleportation, Forgotten (`k==0`): “can't cast”; return false. Match (`spe_Forgotten < spe_Fresh`).
6. No Teleportation, Fresh, !Confusion: `castit`; check; `spelleffects` atme `tele()`; return TIME; **no** second `tele` / **no** `morehungry(100)`. Match.
7. GoingStale (`k>0`, `<= KEEN/10`): `>= spe_Fresh` so `castit` (C enum 2≥1). Match.
8. Hunger≤10 / STR<4 / uen<energy: return false, no time. Match (not TIME).
9. Capacity ≥ EXT_ENCUMBER: TIME, no tele. Match.
10. Poly `can_teleport` at low XL: skip known_spell (C). Match.
11. Confused + known spell + no Teleportation: `castit` false; fail pline. Match HConfusion.
12. Z-cast while encumbered: check now TIME (C `:1279–1283`). Related envelope. Public sessions still PASS this audit.
13. s-mode `dotelecmd`: adds SPE_TELEPORT_AWAY at KEEN then `dotele(false)`. After this SHA, Fresh + !Confusion casts instead of “not able to teleport at will.” That is C after D-1209’s hideaway, not a new cmd.
14. `next_to_u` shudder after a **non-castit** debit still happens (C `:1145–1157`). `castit` success never reaches it. Match.
15. `morehungry(100)` only `if (!trap)` after the tele block; `castit` returned already. Spell hunger is `spelleffects_check` `energy*2` INT scale. Match two C hunger sites.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./spell.js')` is ESM, not filesystem.

## Verification

Journal: private canary **61**/61 (unknown/Forgotten/Fresh atme; debit path; hunger/STR/uen; two capacity strings; skip on trap; wizard break; no double tele/hunger on castit; GoingStale; XL wizard 8); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `^T` without a trap (or Z-cast while EXT_ENCUMBER). Cadence this audit: **44**/44 including seed0383.

## Actionable C-wrongs

None for Must-fix. atme `spelleffects` is a real `zapyourself`/`tele`.

Named omits (map, not Must-fix):

1. `#teleport` `doextcmd`
2. Directional `weffects(pseudo)` when dx/dy/dz set
3. Amulet drain `rnd(2*energy)` in `spelleffects_check`
4. `spell_backfire` `rn2(10)` on `spellknow<=0`
5. `update_inventory()` after the wand-like arm
6. Teleportation/Confusion sticky vs C H\|\|E / H-only

Do not Must-fix “finish all `spelleffects` otyps.” Do not restore Teleportation-only fail-closed.

## Callers / RNG ledger

C callers of this energy block: `dotele` from `dotelecmd` / `#teleport` / `^T`. JS `dotelecmd` and rhack `C('t')` already call `dotele` (D-1209). `#teleport` extcmd still named. `spelleffects(SPE_TELEPORT_AWAY, TRUE, FALSE)` also exists for Z-cast; atme is the `^T` path, Z-cast uses `atme=FALSE` + `getdir`. Directional still named.

New RNG on `castit`: `spelleffects_check` `percent_success`/`rnd(100)`, hunger INT scale (no `rn2`), `mksobj` for pseudo (C same). Non-castit debit: no extra RNG before `tele()`. Capacity: no RNG. Amulet `rnd(2*energy)` still skipped — named, would desync if a public path ever ^T-cast with the Amulet.

`known_spell` has no RNG (book scan). `can_teleport` is a flag test.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: ^T without a trap now follows C’s hunger/STR/uen/capacity split into `spelleffects(SPE_TELEPORT_AWAY, TRUE)` (live self-`tele`) or a Pw debit; `#teleport`, directional `weffects`, and Amulet drain stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1225 `89588300`.
