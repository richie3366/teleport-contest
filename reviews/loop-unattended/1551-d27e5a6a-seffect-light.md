# Review 1551 — d27e5a6a — `read.c` seffect_light whole-body port (D-2592)

- Commit: `d27e5a6a` (2026-09-20) — "`read.c` seffect_light whole-body port (confused light-pets arm) (D-2592)."
- Queue row: coverage gap (map-omission: confused yellow/black-light pets deferred).
- JS touched: `js/read.js` only (48 insertions, 10 deletions).

## Intent vs deliverable

Subject promises the whole `seffect_light` body including the confused light-pets arm. Diff actually delivers: restarted `seffect_light` with `sblessed` snapshot, `HConfusion || Confusion` gate, `PM_YELLOW/BLACK_LIGHT` consts, `MM_EDOG`/`G_GONE` const import join, `initedog` import from `dog.js`, full confused arm (G_GONE sparkle gate, `rn1(2,3)+blessed*2` makemon loop, `initedog`/`msleeping=0`/`mcan`/`canspotmon`/`newsym`, sawlights pline + known). Header omit lines retired in both envelope copies. Promise matches diff.

## Inventory

New/changed JS: `seffect_light` (restart); new module consts `PM_YELLOW_LIGHT`, `PM_BLACK_LIGHT`; extended const.js import (`MM_EDOG`, `G_GONE`); new `initedog` import. No other functions touched.

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/read.c:1740–1785` (csym range; body `:1743–1784`), sole caller `read.c:2244` (SCR_LIGHT in seffects).

Branch-by-branch confirm:

- Unconfused (`:1748–1754`): `if (!Blind) gk.known` → `if (!Blind) known = true` (pre-existing `known` ≡ gk.known convention, unchanged); `litroom(!scursed, sobj)` verbatim; `if (!scursed) lightdamage(sobj, TRUE, 5)` → `await lightdamage(sobj, true, 5)` via pre-existing dynamic import. Order exact.
- Confused pm select (`:1755`): `scursed ? PM_BLACK_LIGHT : PM_YELLOW_LIGHT` verbatim.
- G_GONE gate (`:1757–1758`): `(svm.mvitals[pm].mvflags & G_GONE)` → `((game.mvitals?.[pm]?.mvflags ?? 0) & G_GONE) !== 0`, sparkle pline verbatim. Exact.
- Spawn loop (`:1759–1779`): `rn1(2,3) + (sblessed*2)` → `rn1(2,3) + (sblessed ? 2 : 0)` — identical, and `rn1` is `rn2(x)+y` (`js/rng.js:123`), one RNG call in the same position. `makemon(mons(pm), u.ux, u.uy, MM_EDOG|NO_MINVENT|MM_NOMSG)` — `mons` imported (`js/read.js:154`), `makemon` imported (`:160`). `initedog(mon, TRUE)` → `initedog(mon, true)` — `initedog` is a live sync export (`node scripts/sym.mjs initedog` → `js/dog.js:124 sync`); signature `(mtmp, everything)` matches. `msleeping=0`, `mcan=1` (C TRUE), `canspotmon` (imported `:96`), `newsym` (imported `:96`). Exact.
- sawlights tail (`:1780–1784`): pline + known verbatim.
- Confusion gate: C `(Confusion != 0)`; `Confusion ≡ HConfusion` confirmed (`youprop.h:84`). JS uses `u.HConfusion || u.Confusion` (cited seffect_teleportation sibling convention). `u.Confusion` is a real JS-side mirror field (writers: `potion.js:836` `u.Confusion = u.HConfusion`, `timeout.js:965/970`, `read.js:343/349`) — the OR is marginally broader than C, but the old code checked only `u.Confusion`, so this change is strictly closer to C. Not a C-wrong from this SHA; at most a file-convention note.
- Caller wiring: C `:2244` → JS `js/read.js:2024` (`await seffect_light(sobj)` inside seffects) — pre-existing, intact.

Callee closure: litroom (LIVE, same file), lightdamage (LIVE dynamic), makemon/mons (LIVE imports), initedog (LIVE import, no new edge beyond ALREADY/SAFE class), canspotmon/newsym/pline (LIVE). No clones, no stubs, no new omits ("none new" claim holds — the only `Named` line is the absence statement, accurate).

## Hallucinations / overclaim

None. D-log says "coverage gap, not a corpus divergence" with the baseline 0-blocked fact — honest. No "Match C" dispatch-over-stub pattern.

## Density

Breadth-phase whole-function port, one JS module, 48 insertions — right-sized. Header omit retirement in both envelope copies done.

## Verification

- `node scripts/imports.mjs --rulecheck` (this review): Rule #2 clean.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed refs.
- Re-ran here: `node scripts/hidden-proxy.mjs verify seffect_light --base d27e5a6a~1 --reach-all` → baseline 0 blocked at parent (vacuous note shown, honestly pre-stated in D-log as a coverage row) + `smoke 24/24 PASS, 0 regressed → REACH-OK`. Matches the D-log Verify claim. No REGRESSED sessions.

## Cited evidence

C confused arm (`read.c:1755–1784`, the new behavior — verified line-for-line above):

```c
int pm = scursed ? PM_BLACK_LIGHT : PM_YELLOW_LIGHT;

if ((svm.mvitals[pm].mvflags & G_GONE)) {
    pline("Tiny lights sparkle in the air momentarily.");
} else {
    /* surround with cancelled tame lights which won't explode */
    struct monst *mon;
    boolean sawlights = FALSE;
    int i, numlights = rn1(2, 3) + (sblessed * 2);

    for (i = 0; i < numlights; ++i) {
        mon = makemon(&mons[pm], u.ux, u.uy,
                      MM_EDOG | NO_MINVENT | MM_NOMSG);
        if (mon) {
            initedog(mon, TRUE);
            mon->msleeping = 0;
            mon->mcan = TRUE;
            if (canspotmon(mon))
                sawlights = TRUE;
            newsym(mon->mx, mon->my);
        }
    }
    if (sawlights) {
        pline("Lights appear all around you!");
        gk.known = TRUE;
    }
}
```

Callee closure for this SHA:

| Callee | Status | Evidence |
|--------|--------|----------|
| litroom | LIVE | same-file, pre-existing |
| lightdamage | LIVE | pre-existing dynamic import, awaited |
| makemon / mons | LIVE | `js/read.js:154/:160` imports |
| initedog | LIVE | `sym.mjs` → `js/dog.js:124 sync`; signature `(mtmp, everything)` |
| canspotmon / newsym / pline | LIVE | `js/read.js:96` import |
| rn1 | LIVE | `js/rng.js:123` (`rn2(x)+y`), one call, C position |

Tool outputs pasted (required):

```
$ node scripts/sym.mjs initedog
initedog         js/dog.js:124   sync
$ node scripts/imports.mjs --rulecheck
Rule #2 clean: no bare/node specifiers or fs calls in js/.
$ node scripts/hidden-proxy.mjs verify seffect_light --base d27e5a6a~1 --reach-all
verify seffect_light: baseline d27e5a6a~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke seffect_light: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

Caller: C `read.c:2244` (SCR_LIGHT) → JS `js/read.js:2024`, intact. `Confusion ≡ HConfusion` at `youprop.h:84` (both grep hits agree).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
