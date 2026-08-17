# Review 147 — 4750946a — do_wear.c `doddoremarm` empty-worn `A` (D-1185)

## Metadata
- Full / short hash: `4750946a8f7a3e62a27819ca4eb461a782a201e7` / `4750946a`
- Parent: `217e8e16` (review **142–146** + cadence #1505). This file audits **this SHA only**. Archive row **Addressed:** D-1185 `4750946a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 23:32:07 +0200
- D-id: **D-1185**
- Stats: 14 files, +155 / −61 — `js/do_wear.js` +39 / −1 (`doddoremarm` + `wearing_armor`); `js/cmd.js` +7 / −1 (`'A'` rhack). Also replaced the truncated private seed8243 capture.
- Claims to close: Must-fix human canary seed8243 chargen NHW_MENU `offx` (`\e[72C` vs JS `\e[40C`) queued by review **146** / `8c51cfe8`. This SHA **retargets** that row: local C re-record of the same recipe paints confirm at H2344 `\e[40C` — JS already matched (D-0078). First real miss is `'A'` → C `You are not wearing anything.` vs JS `Unknown command 'A'.`. `reviews/loop-2026-08-15/` has no unpaid `doddoremarm` / offx Must-fix.
- JS / map: `do_wear.js` `doddoremarm`; `cmd.js` rhack `'A'`. `c-js-map/startup.md` / `turns.md` `do_wear.c`. Worn-path `ggetobj` / `menu_remarm` / `take_off` still named. Next canary miss after this SHA was `g` (D-1186).
- Prior reviews this SHA claims to close: **146** Must-fix offx (evidence said no — truncated capture, not a production `offx` C-wrong).

## Intent vs deliverable

Git subject promises: “Match C do_wear.c doddoremarm so empty-worn A prints You are not wearing anything, instead of Unknown command; seed8243 `\e[72C` was a truncated capture, not H2344 offx.”

Old JS: `'A'` fell through rhack unknown-command. `T` / `dotakeoff` already existed (D-0063). Review **146** had queued chargen `offx` and forbade hardcoding column 72 / reverting D-0078.

The diff **does** bind `'A'` to `doddoremarm` and implement C’s empty-worn `You("are not wearing anything.")` `ECMD_OK` plus the `wearing_armor` predicate. It **does** replace the truncated private session with a local C re-record. It does **not** revert D-0078 H2344. It does **not** port `ggetobj("take off", select_off)` / `menu_remarm` / `take_off()` when something is worn (named). The in-progress `takeoff.what||mask` arm prints “You continue …” without `set_occupation(take_off)` (named; live `what`/`mask` writers only *clear* bits, so the arm is dead today).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `doddoremarm` | C callee, **new** | `do_wear.c:3022–3056`; empty-worn arm live; worn/occupation named |
| `wearing_armor` | C callee, **local clone** | `invent.c:2149–2152` — seven armor slots |
| rhack `'A'` | C dispatch, **new** | `cmd.c:1888–1889` `takeoffall` → `doddoremarm` |
| `You("are not wearing anything.")` | C via `pline` | JS full string; `You()` prefixes `"You "` |
| `ECMD_OK` | C return | `const.js` `0x00`; rhack `res & ECMD_TIME` → `move=0` |
| `set_occupation(take_off)` | C `:3028`, **named omit** | continue arm prints only |
| `ggetobj` / `menu_remarm` / `take_off` | C `:3036–3051`, **named omit** | worn path returns `ECMD_OK` silently |
| `reset_remarm` | C `:3014–3018`, **not this SHA** | |
| NHW_MENU `offx` | **untouched** | D-0078 H2344 kept |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names in JS control flow / recorded coordinates. `seed8243` appears only in the git subject and private-session docs. Rule #2 clean.

**New RNG on this path:** none. Empty-worn is a pline + `ECMD_OK`. Path **public-unhit** unless a session types `A` with nothing worn.

Grep of this SHA’s `js/` hunks: no banned gates. The subject’s `seed8243` is not a production `if`.

## C ↔ JS fidelity

### Dispatch vs `cmd.c:1888–1889`

C extcmdlist: `{ 'A', "takeoffall", "remove all armor", doddoremarm, 0, NULL }`. Not `PREFIXCMD`. `T` is `dotakeoff` (`:1886–1887`) — already bound; this SHA does not steal `T`.

JS rhack:

```
} else if (ch === 'A') {
    const res = await doddoremarm();
    game.context.move = (res & ECMD_TIME) ? 1 : 0;
    if (res & ECMD_TIME) game.kickedloc = { x: 0, y: 0 };
}
```

C empty-worn returns `ECMD_OK` (`:3033`). After a non-prefix `ECMD_OK`, rhack `reset_cmd_vars(multi < 0)` (`:3814–3815`) and does **not** set `ECMD_TIME`, so `context.move` stays false (`:3817–3819` only flips it back on `ECMD_TIME`). JS `ECMD_OK=0` → `move=0`. Match. C `:3052–3056` comment: even the worn path returns `ECMD_OK` because `take_off()` already accounted for time — JS worn stub also returns `ECMD_OK` (silent no-op, named).

`kickedloc` clear on `ECMD_TIME` is the same rhack convention as `'T'` / `'w'` in this file (C `kickedloc` is dokick-only; extra clear on a no-time `A` does not fire). Not a C-wrong on the empty-worn path.

### Empty-worn vs `do_wear.c:3030–3033`

C:

```
} else if (!uwep && !uswapwep && !uquiver && !uamul && !ublindf
           && !uleft && !uright && !wearing_armor()) {
    You("are not wearing anything.");
    return ECMD_OK;
}
```

JS (`do_wear.js:1207–1210`): same seven weapon/accessory pointers plus `wearing_armor()`, then `pline('You are not wearing anything.')`, `return ECMD_OK`. `You("are not wearing anything.")` expands to that exact string. Match.

### `wearing_armor` vs `invent.c:2149–2152`

C: `return (boolean) (uarm || uarmc || uarmf || uarmg || uarmh || uarms || uarmu);`

JS: `!!(u.uarm || u.uarmc || u.uarmf || u.uarmg || u.uarmh || u.uarms || u.uarmu)`. No `uwep` here — weapons are in the caller’s conjunct. Match. Not a glyph stand-in.

| Case | C | JS after |
|------|---|---------|
| nothing worn, `'A'` | You are not wearing anything. `ECMD_OK` | **same** |
| only `uwep` | not empty; `ggetobj` / menu | **named skip** (silent `ECMD_OK`) |
| armor slot occupied | not empty | **named skip** |
| `takeoff.what` or `mask` set | continue + `set_occupation` | print continue, **no occupation** (dead today) |
| `'T'` | `dotakeoff` (untouched) | **same** |
| chargen `\e[72C` | truncated capture; live C H2344 is 40 | **untouched** D-0078 |

### Continue arm vs `:3026–3029`

C: `if (takeoff.what || takeoff.mask) { You("continue %s.", takeoff.disrobing); set_occupation(take_off, …); return ECMD_OK; }`

JS prints `You continue ${verb}.` with `verb = to.disrobing || 'disrobing'` and returns. **No** `set_occupation`. That would be a live C-wrong if `what`/`mask` were ever set. Grep of `js/`: `takeoff.what = 0` (clear); `takeoff.mask = (mask\|0) & ~bit` (clear only). The arm cannot fire until the worn `A` path writes a mask. Named omit of the occupation, not a silent Match-C for a stub that sessions hit.

### Worn path vs `:3036–3056`

C resets menu class, then traditional `ggetobj` or `menu_remarm`, then if `takeoff.mask` sets `disrobing` to `"disrobing"` vs `"disarming"` and calls `take_off()`. JS returns `ECMD_OK` with a comment. **Named omit.** Subject did not claim the menu. This is **not** “Match C dispatch, callee is a stub” for the **empty-worn** promise: that callee arm is the real C `if`. The worn arm is an honest no-op.

Private session: this SHA replaces `private-sessions/seed8243-samurai-tutorial.session.json` (not `sessions/manifest.json`). README notes the truncated `\e[72C` capture. Constitution §1.2 / D-0933 still forbid treating judge-elided RC as a reason to change `offx`. The re-record is evidence for the retarget, not a public FAIL peel.

Hallucination check: D-log / CURRENT / subject say empty-worn `A` prints the C You-string, and that `\e[72C` was a truncated capture. **That is the hunk.** Do **not** stamp this as “Match C takeoffall menu” or “Match C `offx=72`” or “reverted H2344.”

`reset_remarm` (`do_wear.c:3014–3018`) clears `what`/`mask`/`disrobing[0]`. JS never writes a positive mask, so it does not need `reset_remarm` for this peel. Do not invent a `reset_remarm` call on empty-worn `A` — C does not call it there.

## Hallucinations / overclaim

Review **146** told the next port to dump C `offx`/`maxcol` and not hardcode 72. This SHA **did** re-record and **did not** hardcode 72 or disable D-0078. Retargeting Must-fix from offx to `doddoremarm` is evidence, not a FAIL peel. Overclaim to watch: treating the worn silent `ECMD_OK` as a complete `doddoremarm`.

### Clone classification (this SHA)

- `doddoremarm` empty-worn — C function, new, live.
- `wearing_armor` — C callee clone, matches `:2149–2152`.
- rhack `'A'` — C dispatch.
- continue / `ggetobj` / `take_off` — named no-ops, not claimed Match-C.
- No `FORCE` helper. No `getdir_whip`-style stand-in.

## Density

One C function’s first two arms (continue dead + empty-worn live) plus the one-line rhack bind. ~40 JS lines. Thin vs §2b “one deferred `if`,” but it is the canary’s first real miss after a false offx lead, not an unrelated peel. Did not pull `g` PREFIXCMD. Not QUALITY-RISK.

Callers of C `doddoremarm`: only the `'A'` / `#takeoffall` extcmd (`cmd.c:1888`). JS has that one site. `#altunwield` / `remarm_swapwep` (`:3059–3086`) is a different function and was not claimed. `dotakeoff` (`'T'`) stays the single-item path (D-0063).

Empty-worn conjuncts are weapons (`uwep`/`uswapwep`/`uquiver`) and accessories (`uamul`/`ublindf`/`uleft`/`uright`) **plus** armor. A wielded-only hero is **not** empty in C and must not print “not wearing anything.” JS keeps those pointers in the same `&&` chain. A quiver-only or blindfold-only hero likewise takes the named worn skip, not the empty pline. Ball/chain (`uball`/`uchain`) are not in C’s empty test — punished-but-naked still prints the You-string. JS does not add them. Match.

## Verification

Journal: private canary Scr **102→106**/129 (four `A` steps); leftover first miss @22 `g`; green+strict seed8000/0900; cohort **8**/8 (1500/1800/0700/0361/0014/2200/0009/0012) + strict 1500/0700/0009/0361. Path **public-unhit** unless `A` on empty worn. Cadence **#1510** full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `33+0.28/turn` (R² 0.87) on `c58efd08` — fortress check, not an `A` canary.

Grep of `git show 4750946a -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/hardcoded coordinates. Subject mentions seed8243; JS hunks do not.

C read of `do_wear.c:3012–3056`, `invent.c:2149–2152`, `cmd.c:1886–1889`. JS SHA `doddoremarm` / `wearing_armor` / rhack `'A'`. `ECMD_OK` is `0x00` in both trees (`include/hack.h` / `js/const.js:1727`). Journal “fortress held” does not skip this audit — `'A'` is public-unhit. Review **146**’s offx Must-fix is closed by evidence, not by leaving `'A'` unbound.

## Actionable C-wrongs

None that Must-fix this next iter. Empty-worn matches `:3030–3033`. Callee is not a stub on that arm.

Named omits / do-nots (map / Open, not Must-fix):

1. Worn `ggetobj` / `menu_remarm` / `take_off` (`:3036–3051`).
2. Continue `set_occupation(take_off)` (`:3028`) — do not implement until `mask` is written by a real select.
3. Do not revert D-0078 H2344. Do not put `\e[72C` / col 72 into `js/`. Next port after this window is already `cmd.c` rhack `visctrl` (`^C`), not another wear peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: empty-worn `'A'` now prints C’s `You are not wearing anything.` via a real `wearing_armor` predicate, and the seed8243 `\e[72C` lead was a truncated capture rather than an `offx` C-wrong.
- Must-fix stays the later canary peels in this window (then `visctrl`); this SHA’s archive hash is already `4750946a`. Not offx, not `kill_genocided`.
