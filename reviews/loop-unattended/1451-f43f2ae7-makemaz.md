# Review 1451 — f43f2ae7 — makemaz whole-body restart + hell gate (D-2492)

Metadata: SHA `f43f2ae7`, `js/mklev.js` +75/−58 only. C `mkmaze.c:1126–1223` + `mkmaze.c:707–711` (ransacked) + `mklev.c:1286–1289` (hell/medusa gate in `makelevel`, verified `:1251`) + trivial `dungeon.c:1325/1332`. D-log: D-2492.

## Intent vs deliverable

Promise: C-order restart fixing four brief-surfaced C-wrongs (ransacked-assign, extension-less impossible, missing `dmonsfree`, unwired hell/medusa 5th caller). Diff delivers all four: ASSIGN ransacked, `.lua` message, live `dmonsfree()` on success, `In_hell || (rn2(5) && medusa…)` gate in `makelevel`. Promise = deliverable.

## Inventory

- Restarted: `makemaz` (same signature); refreshed `makemaz_maze_fallback` (comments + `Invocation_lev` import); gate added in `makelevel`, dead deferred block removed from `makelevel_ordinary`.
- `sym.mjs` (required): no deleted symbols. Four import words all LIVE on pre-existing edges (`--can`: dungeon.js, mon.js both ALREADY): `Is_special` (dungeon.js:2127 sync), `Invocation_lev` (dungeon.js:1731 sync), `dmonsfree` (mon.js:3202 sync). Live-export direction correct despite local clones elsewhere (`Is_special` ×2, `Invocation_lev` in hack.js).

## C ↔ JS fidelity

Walked C `:1126–1223` — exact. Load-bearing pins (re-read, not trusted):

```c
s_level *sp = Is_special(&u.uz);
...
if (*s) {
    if (sp && sp->rndlevs)
        Snprintf(protofile, sizeof protofile,
                 "%s-%d", s, rnd((int) sp->rndlevs));
```

(`rnd`, not `rn2` — JS matches.) `dunlev`/`dunlevs_in_dungeon` verified trivial at `dungeon.c:1325/1332` (`return lev->dlevel`, `return num_dunlevs`), so the direct field reads are justified. `check_ransacked` ASSIGN verified at `mkmaze.c:707–711` (`gr.ransacked = (u.uz.dnum == mines_dnum && !strcmp(s, "minetn-1"))` — orctown kludge); `LEV_EXT` verified `".lua"` (`global.h:34`).

```c
if (*protofile) {
    check_ransacked(protofile);
    Strcat(protofile, LEV_EXT);
    gi.in_mk_themerooms = FALSE;
    if (load_special(protofile)) {
        dmonsfree();
        return; /* no mazification right now */
    }
    impossible("Couldn't load \"%s\" - making a maze.", protofile);
}
```

JS: same shape — ASSIGN ransacked, `.lua` message (C passes the *extended* name to `impossible`), bare-stem `load_special_proto` dispatch (named — the JS loader keys on stems), live `dmonsfree()` on success, fall-through to mazify. Fallback ≡ C `:1197–1222` (`!rn2(3)` ≡ `=== 0`; short-circuit `!Invocation && rn2(2)` so no burn on Invocation; `!rn2(5)` ≡ `=== 0`). Predicate equivalence verified body-to-body:

```js
// dungeon.js:1731 (live import) vs mklev.js:18086 (retained local)
export function Invocation_lev(lev) { ... hellish ... dlevel === num_dunlevs - 1 }
function Invocation_lev_mk(lev) { ... identical ... }
```

`Is_special` (dungeon.js:2127) walks `sp_levchn` with `on_level` — same match as the replaced inline walk. Hell gate ≡ C `mklev.c:1286–1289` (owning function verified as `makelevel :1251`, matching the JS placement):

```c
} else if (In_hell(&u.uz)
            || (rn2(5) && u.uz.dnum == medusa_level.dnum
                && depth(&u.uz) > depth(&medusa_level))) {
    makemaz("");
```

JS `||`/`&&` shape burns `rn2(5)` exactly when `!hellish`; `In_hell` ≡ hellish-flag read matching do.js:1255/trap.js:634 character-for-character. Bonus fix: `impossible` now awaited (old code floated the promise). Callee closure: all LIVE; SPLEVTYPE/`Is_branchlev`/`load_special`-IO/`In_hell`/`Invocation_lev_mk` OMIT with cites. No RNG reorder anywhere.

Required pastes:

```text
Is_special       js/dungeon.js:2127   sync
Invocation_lev   js/dungeon.js:1731   sync
dmonsfree        js/mon.js:3202   sync
ALREADY: mklev.js already statically imports dungeon.js. No new edge needed.
ALREADY: mklev.js already statically imports mon.js. No new edge needed.
```

## Hallucinations / overclaim

None. Every non-obvious claim (`--can`, trivial returns, LEV_EXT, clone matches) re-verified true.

## Density

Right-sized restart + caller gate, one file.

## Verification

`hidden-proxy verify makemaz --base f43f2ae7~1 --reach-all` (re-run here):

```text
verify makemaz: baseline f43f2ae7~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
reach makemaz: 77 baseline-PASS session(s) reach it (77 run): 77 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated); reach 77/77 matches the D-log — the strongest reach signal in this window, and zero regressions across a level-generation change is the operative evidence the restart is faithful. `imports.mjs --rulecheck` (whole scored `js/`): Rule #2 clean. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Pre-commit behavior contrast (the four fixed C-wrongs): ransacked set-only-true, extension-less impossible, missing `dmonsfree`, hell-fell-to-ordinary + stray `rn2(5)` burn in `makelevel_ordinary` — all four now match C, and the stray burn is gone from the ordinary path (the gate owns it).

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
