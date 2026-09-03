# Review 715 — 7d76ad12 — end.c really_done keepdogs(TRUE) / mydogs HP (D-1754)

## Metadata
- Full / short hash: `7d76ad12fea143d4bbe53d01b69b3145ef167285` / `7d76ad12`
- Parent: `088de957` (D-1753). This file audits **this SHA only** (sixth of nine `js/` commits since review **709**). Archive **Addressed:** D-1754 `7d76ad12`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 02:43:51 +0200
- D-id: **D-1754**
- Stats: `js/end.js` +66/−19; `js/dog.js` +15/−4; `js/makemon.js` +1/−1; `js/pickup.js` +2/−2. Total `js/` insertions **84** <250. Band **150–350** (id >454 ⇒ 200-floor only if ins>250).
- Claims to close: Open companion pet HP after D-1741 `get_valuables`. Not DUMPLOG. Not keepdogs `migrate_to_level` / leash / `mon_has_amulet`. `reviews/loop-2026-08-15/` has no unpaid keepdogs Must-fix.
- JS / map: `end.js` `really_done` / `score_escape_companions`; `dog.js` `keepdogs`; `makemon.js` `adj_lev`. `c-js-map/turns.md`.
- Prior: **702** named pet-HP / Schroedinger after valuables.

## Intent vs deliverable

Git subject promises: escaped/ascended companion pets add `mtame` `mhp` (and live Schroedinger `d(adj_lev,8)`) instead of omitting `keepdogs(TRUE)` and the mydogs score walk after D-1741.

`node scripts/csym.mjs really_done` → `end.c:1129–1590`. `--callers really_done`: `:470` panic; `:1124` from `done`. `keepdogs` `dog.c:788–884` (callers `do.c:1624` FALSE; `end.c:1298` TRUE; wizcmds). `adj_lev` `makemon.c:2015–2046` (callers include `end.c:1464`). `observe_quantum_cat` via disclose invent walk `:1263–1276`.

```1293:1295:nethack-c/upstream/src/end.c
    if (how == ESCAPED || how == ASCENDED)
        keepdogs(TRUE);
```

```1453:1476:nethack-c/upstream/src/end.c
        mtmp = gm.mydogs;
        Strcpy(pbuf, "You");
        if (mtmp || Schroedingers_cat) {
            while (mtmp) {
                Sprintf(eos(pbuf), " and %s", mon_nam(mtmp));
                if (mtmp->mtame)
                    u.urexp = nowrap_add(u.urexp, mtmp->mhp);
                mtmp = mtmp->nmon;
            }
            if (Schroedingers_cat) {
                int mhp, m_lev = adj_lev(&mons[PM_HOUSECAT]);
                mhp = d(m_lev, 8);
                u.urexp = nowrap_add(u.urexp, mhp);
                Strcat(eos(pbuf), " and Schroedinger's cat");
            }
            dump_forward_putstr(endwin, 0, pbuf, done_stopprint);
            pbuf[0] = '\0';
        } else {
            Strcat(pbuf, " ");
        }
```

```799:809:nethack-c/upstream/src/dog.c
        if (pets_only) {
            if (!mtmp->mtame)
                continue;
            mtmp->mtrapped = 0;
            finish_meating(mtmp);
            mtmp->msleeping = 0;
            mtmp->mfrozen = 0;
            mtmp->mcanmove = 1;
        }
```

Parent: no `keepdogs(true)` in `really_done`; `Schroedingers_cat` function-local so the score arm never saw it; pets_only only skipped `!mtame` (sleeping/trapped pets stayed). The diff **does** dynamic-import `keepdogs(true)` after disclose, persist `game.Schroedingers_cat`, pets_only untrap/`finish_meating`/wake, `score_escape_companions` (`nowrap_add` mhp / `d()`), two-line putstr when names exist, export `adj_lev`. It **does not** add DUMPLOG second `artifact_score`. Named. It **does not** port `migrate_to_level` / leash / `mon_has_amulet` stay_behind. Named. It **does not** set `viz_array[0][0] |= IN_SIGHT` (JS `x_monnam` skips `do_it` when `gameover`). Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `keepdogs(TRUE)` `:1298` | LIVE call | dynamic `import('./dog.js')` (static would be SAFE hoisted; TDZ dodge for `_body_part`) |
| `keepdogs` pets_only `:799–809` | LIVE repaired | untrap / `finish_meating` / wake |
| `keepdogs` stay_behind amulet/leash/migrate | OMIT named | still `stay.push` on meating/trapped only |
| `score_escape_companions` `:1453–1476` | LIVE | JS name for the mydogs + cat score walk |
| `adj_lev` `:2015–2046` | LIVE export | no clone; housecat uses difficulty path (not Wizard) |
| `d(n,8)` | LIVE import | rng.js; `n` times `1+RND(8)` |
| `mon_nam` | LIVE import | do_name.js; gameover skips `do_it` |
| `nowrap_add` | LIVE local | end.js:82; C integer.h |
| `finish_meating` | LIVE import | dogmove.js |
| `observe_quantum_cat` | LIVE | pickup.js; FALSE,FALSE on disclose |
| `Schroedingers_cat` | LIVE state | `game.` not function-local |
| DUMPLOG `artifact_score` | OMIT named | |
| `viz_array IN_SIGHT` | OMIT named | gameover `do_it` skip is the JS analogue |

`node scripts/sym.mjs`:

```
keepdogs         js/dog.js:360   sync
score_escape_companions js/end.js:245   sync
adj_lev          js/makemon.js:822   sync
finish_meating   js/dogmove.js:1039   sync
mon_nam          js/do_name.js:823   sync
nowrap_add       LOCAL js/end.js:82
observe_quantum_cat js/pickup.js:2602   ASYNC
mon_has_amulet   js/apply.js:1368   sync  (not wired in keepdogs)
migrate_to_level js/teleport.js:2634   sync  (not wired)
```

Re-point: `adj_lev` local → export (end.js import). `node scripts/imports.mjs --can end.js dog.js keepdogs`: **SAFE** (hoisted; this SHA used dynamic `import()` anyway). `--can end.js makemon.js adj_lev`: **ALREADY**. `--can dog.js dogmove.js finish_meating`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`keepdogs(TRUE)` call site.** C after `dump_everything`, before `finish_paybill` / gold score, so pets remain on-map during dump. JS has no DUMPLOG; call is after `disclose`, before gold `hidden_gold(TRUE)`. Pets remain on-map during disclose. **Match the live order.** `how === ESCAPED \|\| ASCENDED` only. **Match.** Panic/death do **not** keepdogs. **Match.**

**pets_only wakeup (`:799–809`).** C clears trap, `finish_meating`, sleep, frozen, `mcanmove=1` so later `meating \|\| mtrapped` stay_behind does **not** fire for escape pets. JS the same five assignments. Parent left sleepers behind. **Match the Open.** `finish_meating` LIVE (not a clone).

**pets_only `!mtame`.** C `continue` (leave on `fmon`). JS `stay.push`. Same “remain on this level.” **Match.**

**Follow test after wakeup.** C `(monnear && levl_follower) \|\| (uhave.amulet && iswiz)` && (!helpless \|\| steed) && !STRAT_WAITFORU. JS `chase` / `helpless` / `waiting`. **Match those gates.** Then C may `mintrap`, steed `mdrop_special_objs`, `meating\|\|mtrapped` pline+stay, **`mon_has_amulet` stay**, leash. JS only `meating \|\| mtrapped` → stay (after wakeup both are 0). Amulet/leash/migrate named. A pet carrying the Amulet **accompanies in JS** and **stays in C**. Named omit, not a silent stub inside `score_escape_companions`.

**`relmon` prepend.** C prepends mydogs (LIFO). JS `unshift`. mx=my=0; `mlstmv = moves`. JS skips `mon_leave`/`wormno`. Named-adjacent for worm pets. Ordinary pets **Match**.

**`score_escape_companions` vs C while.** Every mydogs: `mon_nam` then if `mtame` `nowrap_add(urexp, mhp)`. Untame on mydogs (wizard chase) named in the sentence, **no** HP. **Match C `if (mtmp->mtame)`.** Array vs `nmon`: keepdogs already unshifts into `game.mydogs`.

**Two putstr (`:1473–1482`).** C with companions: first line `"You" + " and %s"*`; second `"went to your reward|escaped… with N points,"`. Without: `"You "` concatenated onto the verb line. JS `names.length` two lines vs one `You ${verb}`. **Match the split.** `names.join(' and ')` ≡ repeated `" and %s"`.

**Live cat (`:1463–1471`).** `adj_lev(&mons[PM_HOUSECAT])` then `d(m_lev, 8)` then `nowrap_add` then `" and Schroedinger's cat"`. Housecat is not the Wizard, so `adj_lev` uses mlevel + `level_difficulty`/5 + ulevel/4, cap `3*mlevel/2` ≤49, floor 0. **No rng in `adj_lev`.** Then `d` is `m_lev` gameplay `rnd(8)`-class burns (`1+RND(8)` each). JS `d(m_lev, 8)` LIVE. **Match call-for-call.** Only if `game.Schroedingers_cat` (disclose first live box). Second box `spe=0`, no second `d()`. **Match C `:1266–1275`.**

**`game.Schroedingers_cat` vs BSS.** C file-scope zeros once. JS resets each `really_done` (module reused across games). **Match per-game.** Parent’s function-local flag died before the score arm.

**`viz_array[0][0] \|= IN_SIGHT`.** C so `mon_nam` can “see” mx=0 mydogs. JS `x_monnam` `do_it = !canspotmon && !gameover` (`do_name.js:727–728`). `really_done` already set `gameover`. Named pets print Fido, not “it”. Canary named pet Fido. **Match the names; omit the bit.**

**`adj_lev` export.** Body already matched C `:2015–2046` (Wizard cap 49; else difficulty). This SHA only exports. Do **not** add clone #2. **Match.**

**Callee closure (ESCAPED text arm + keepdogs TRUE).** LIVE: `keepdogs` (pets_only wakeup LIVE; stay_behind amulet OMIT named), `finish_meating`, `mon_nam`, `nowrap_add`, `adj_lev`, `d`, `observe_quantum_cat`, `get_valuables` (D-1741). OMIT named: DUMPLOG, `migrate_to_level`, leash, `mon_has_amulet`, `viz_array`. STUB in the HP-add arm: **none**. Not “dispatch ported, callee stubbed.” `keepdogs(true)` is a real call, not a comment.

**RNG.** Escape with live cat: `d(m_lev,8)` only extra burns vs parent. Pets_only wakeup: **no** rng. `adj_lev`: **no** rng. Ordinary pet HP: **no** rng (uses current `mhp`). **Match.**

## Hallucinations / overclaim

Subject “companion pets add mtame mhp and live-cat `d(adj_lev,8)`”: **true**. D-log “pets_only left sleepers”: **true**. Do **not** stamp “Match C `mon_has_amulet` stay_behind.” Do **not** stamp “Match C DUMPLOG `artifact_score`.” Do **not** stamp “Match C `viz_array[0][0]`.” Do **not** stamp “Match C `migrate_to_level`.” Journal “fortress held” is not an ascend-with-pet screen. Cohort **7**/7. Companion HP **public-unhit**. Admit that.

## Density

§2b: `keepdogs(TRUE)` + the mydogs/`Schroedingers_cat` score walk that consumes it. +84. Related pets_only wakeup so the walk is not empty. Did **not** glue DUMPLOG / `gold_detect`. Did **not** reopen D-1753. Did **not** static-import `dog.js` (NOTES).

## Verification

D-log: save-oracle skip (untagged `end.c:really_done`); node 15/15 (pets_only wakeup; tame mhp; non-tame named-only; Schroedinger `d(m_lev,8)`; named pet Fido); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Escape/ascend with pets **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (keepdogs TRUE + mhp/`d()` match C; stay_behind/DUMPLOG are named). Named: DUMPLOG listing; `viz_array` bit; keepdogs `migrate_to_level` / leash / `mon_has_amulet`. Do **not** add `adj_lev` clone. Do **not** static `end.js`←`dog.js` if a top-level TDZ read appears (dynamic is extra-safe). Do **not** `d()` a dead cat (`spe=0`). Do **not** add HP for `!mtame` mydogs. Do **not** re-port D-1741 `get_valuables`. Do **not** call keepdogs on DIED.

Verdict: **ACCEPT-WITH-DEBT**
