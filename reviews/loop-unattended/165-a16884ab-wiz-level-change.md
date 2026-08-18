# Review 165 — a16884ab — wizcmds.c `wiz_level_change` `losexp("#levelchange")` (D-1203)

## Metadata
- Full / short hash: `a16884abdb0174b02092f7da6e0dbd141643eb27` / `a16884ab`
- Parent: `dfed1743` (D-1202). This file audits **this SHA only**. Archive row **Addressed:** D-1203 `a16884ab` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 06:04:32 +0200
- D-id: **D-1203**
- Stats: 11 files, +136 / −68 — `js/wizcmds.js` +42/−19; `js/exper.js` +17/−8.
- Claims to close: Open queue `cmd.c` `wiz_level_change` (named from D-0061 raise-only / D-1190 map crumb). Not `notice_mon_off`. `reviews/loop-2026-08-15/` has no unpaid `#levelchange` Must-fix.
- JS / map: `wizcmds.js` `wiz_level_change`; `exper.js` `losexp`. `c-js-map/turns.md` extcmd row. `makemap_prepost` / Upolyd mh / level-1 `done(DIED)` still named.
- Prior reviews this SHA claims to close: Open after D-1202; map “wiz-level-change still named” beside `kill_eggs`.

## Intent vs deliverable

Git subject promises: “Match C wizcmds.c wiz_level_change so #levelchange drains via losexp("#levelchange") and caps ulevelmax, instead of returning without drain.”

Old JS parsed a whole-string int, raised with `pluslvl(false)` (D-0061), and on `newlevel < ulevel` either printed the L1 line or **returned** without `losexp` and without `u.ulevelmax = u.ulevel`. ESC/empty was a silent return. C `wizcmds.c:446–487` `getlin` → `mungspaces` → `sscanf("%d%c")` must return 1 else `Never_mind`; drain loop `losexp("#levelchange")`; then **always** `u.ulevelmax = u.ulevel` except the two early `return ECMD_OK` (already L1 / already MAXULEV).

The diff **does** drain, cap `ulevelmax`, treat ESC/empty/non-int as `Never mind.` + `ECMD_OK`, and teach `losexp` the `#levelchange` override. It does **not** pull `makemap_prepost` / `wiz_makemap`, Upolyd `mh` strip, livelog/SoundAchievement, or level-1 `done(DIED)` (caller never calls `losexp` at `ulevel==1`; override also nulls `drainer`). Named `+N sscanf` (leading `+` is `%d` in C, rejected by JS `/^-?\d+$/`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `wiz_level_change` drain loop | C site, **rewritten** | `wizcmds.c:466–474` |
| `u.ulevelmax = u.ulevel` | C site, **new** | `:486` after drain **or** raise **or** already-that-level |
| `losexp("#levelchange")` override | C site, **new** | `exper.c:214–217` |
| `pluslvl(FALSE)` raise | C callee, **imported** | D-0061 |
| `getlin` | C callee, **imported** | `getline.js` |
| `resists_drli_you` | **clone** of `resists_drli(&youmonst)` | skipped on the override path |
| `sscanf("%d%c")` leading `+` | C, **named omit** | JS integer regex |
| `done(DIED)` at L1 | C, **named omit** | unreachable from this caller after clamp |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

**RNG:** drain path has no new die in `wiz_level_change`. `losexp` HP/EN strip uses stored `uhpinc`/`ueninc` (no `rn2`). Raise still `pluslvl(false)` (pre-existing). Override skips `resists_drli` so a Drain-resistant wizard still drains — C same, not a skipped resist roll (resist is a predicate, not a die).

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Prompt / parse vs `wizcmds.c:448–463`

C: `getlin`, `mungspaces`, ESC or empty → `ret=0`, else `sscanf(buf, "%d%c", &newlevel, &dummy)`; `ret != 1` → `pline1(Never_mind)` `return ECMD_OK`.

JS: `getlin`, `trim` (end spaces only), require `buf` not ESC, non-empty, `/^-?\d+$/`, finite `parseInt(..., 10)` else `Never mind.` + `ECMD_OK`. `Never_mind` in `const.js` is `"Never mind."` — string matches even though they inlined it.

`sscanf("%d%c")` returns 1 only when the whole string is one integer (extra char → 2). JS regex is the same for `"12x"` / `"1 2"`. **Diverge:** C `%d` accepts `+5`; JS rejects `+5`. Named `+N sscanf`. `"08"` is decimal 8 in both (`%d` / `parseInt` radix 10). Empty after trim ≡ C empty after `mungspaces`.

### Drain / raise / cap vs `wizcmds.c:464–487`

C:

```
    if (newlevel == u.ulevel) {
        You("are already that experienced.");
    } else if (newlevel < u.ulevel) {
        if (u.ulevel == 1) { You("are already as inexperienced..."); return ECMD_OK; }
        if (newlevel < 1) newlevel = 1;
        while (u.ulevel > newlevel)
            losexp("#levelchange");
    } else {
        if (u.ulevel >= MAXULEV) { You("are already as experienced..."); return ECMD_OK; }
        if (newlevel > MAXULEV) newlevel = MAXULEV;
        while (u.ulevel < newlevel)
            pluslvl(FALSE);
    }
    u.ulevelmax = u.ulevel;
    return ECMD_OK;
```

JS copies that tree, including `ulevelmax` assignment on the **equal-level** path (C does too — blessed full healing must not un-drain even if the wizard asked for the current level). Early returns on L1 / MAXULEV skip the assignment like C. `You("are already that experienced.")` → `"You are already that experienced."` via JS `pline` with the `You` included. Match.

`pluslvl(false)` is the existing raise (D-0061). This SHA does not re-audit `pluslvl`.

### `losexp` override vs `exper.c:214–217`

C:

```
    if (drainer && !strcmp(drainer, "#levelchange"))
        drainer = 0;
    else if (resists_drli(&gy.youmonst))
        return;
```

JS (`exper.js:302–306`): `if (drainer && drainer === '#levelchange') drainer = null; else if (resists_drli_you()) return`. **Match.** After the override, `drainer` is null so the later `if (u.ulevel > 1 || drainer)` goodbye still prints for `ulevel > 1`, and the L1 `done(DIED)` arm is skipped (`drainer` null → `uexp = 0` only). The wizard caller clamps `newlevel` to ≥1 and returns before the loop when already L1, so `losexp` is never entered at L1 for this command. Named `done(DIED)` is the **other** `losexp` callers.

`resists_drli_you` still omits `defended(AD_DRLI)` worn walk (pre-existing D-1033). Irrelevant on the `#levelchange` path because resist is not consulted.

Remaining `losexp` body (HP/EN/`uexp`, `adjabil`, `minuhpmax` clone, no `setuhpmax` up-clamp helper) is pre-existing partial. The override is a two-line insert at the C locus. Upolyd `mh` named.

| Case | C | JS after |
|------|---|---------|
| ESC / empty / junk | `Never_mind` ECMD_OK | **same** |
| leading `+N` | `%d` accepts | **named reject** |
| already that level | You + still cap max | **same** |
| drain | `losexp("#levelchange")` loop | **same** |
| Drain_resistance | override skips | **same** |
| raise | `pluslvl(FALSE)` | **same** |
| `ulevelmax` | after success paths | **same** |

## Constitution / playbook

No FORCE / getRngLog / seed-shaped “Tourist never drains.” Rule #2: `exper.js` / `wizcmds.js` only. Frozen untouched. Do not pull `wiz_makemap`. Public raise tours (wizard extcmd sessions) do not prove the drain arm.

## Hallucinations / overclaim

D-log / CURRENT / subject say drain via `losexp("#levelchange")` and cap `ulevelmax`. **That loop plus the override plus the cap are the hunk.** Stamping **Addressed:** D-1203 is fair. This is **not** “Match C dispatch, callee is a stub”: `losexp` is the `exper.c` body (partial on DIED/Upolyd, live on the wizard drain strip). Do **not** stamp “Match C `sscanf` `+N`” or “Match C `done(DIED)`” or “Match C `makemap_prepost`.”

Journal admitted public raise tours unhit on the drain arm. Honest.

### Clone classification (this SHA)

- Drain loop / `ulevelmax` / override — C sites, new.
- `losexp` / `pluslvl` / `getlin` — C callees, imported.
- `resists_drli_you` — pre-existing clone; **not consulted** on this path.
- Parse regex — clone of `sscanf("%d%c")` minus leading `+` (named).

## Density

One C function plus the two-line `losexp` gate it requires. ~42 + 17 lines. Right-size §2b. Did not glue `eatspecial` or `restore_artifacts`.

## Verification

Journal: `losexp` canary **9**/9 (resist bypass vs ordinary drain; loop caps `ulevelmax`); green+strict seed8000/0900; cohort **16**/16 + strict lengths (0360/0361/0373/0108/0116/0006/2200/4500/1500/1800/0004/0012/0367/0398). Public raise tours unhit on the drain arm. This audit’s full `sessions` `__RESULTS_JSON__` at `dbd3a08b`: **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `32+0.27/turn` (R² 0.868) does not type a lower `#levelchange` target.

Grep of `git show a16884ab -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/seed names/hardcoded coordinates.

C read of `wizcmds.c:444–487`, `exper.c:207–280`. JS SHA `wizcmds.js:233–273`, `exper.js:298–306`.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `scrolltele` unconscious).

C-wrong family remaining (map / later peel, not new Must-fix prepends):

1. Accept leading `+` like `sscanf("%d")` (`wizcmds.c:458`) — named `+N sscanf`.
2. `losexp` L1 `done(DIED)` when `drainer` is a real killer; `setuhpmax` up-clamp; Upolyd `mh` / `rehumanize`; livelog / SoundAchievement (`exper.c:232–261`).

Named omits / do-nots:

3. `makemap_prepost` / `wiz_makemap`. `kill_eggs` map crumb about wiz-level-change is stale vs D-1190 — do not re-port `kill_genocided` here.
4. Do not skip D-1203. Do not FORCE `ulevelmax` from a recorded drain. Do not make `#levelchange` fatal at L1 (C override + caller clamp).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `#levelchange` now drains with C’s `#levelchange` `losexp` override and caps `ulevelmax`; leading `+` parse and the rest of `losexp` stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1203 `a16884ab`. Next port in this window popped Open `eatspecial`. Not `notice_mon_off`, not `makemap`.
