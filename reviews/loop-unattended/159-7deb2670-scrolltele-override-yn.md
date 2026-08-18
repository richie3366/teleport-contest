# Review 159 — 7deb2670 — teleport.c `scrolltele` W-tower/amulet `y_n("Override?")` (D-1197)

## Metadata
- Full / short hash: `7deb267067130429740419aa6b0947bd12934fd4` / `7deb2670`
- Parent: `3652f42e` (review **155–158** + cadence #1520). This file audits **this SHA only**. Archive row **Addressed:** D-1197 `7deb2670` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 04:35:51 +0200
- D-id: **D-1197**
- Stats: 10 files, +122 / −46 — `js/teleport.js` +21 / −10.
- Claims to close: Open queue `teleport.c` `scrolltele` W-tower Override yn (named from D-1184 / D-0407 / review **158**). Not `make_blinded`. `reviews/loop-2026-08-15/` has no unpaid Override Must-fix.
- JS / map: `teleport.js` `scrolltele`. Callees `On_W_tower_level`, `You_feel`, `yn_function`. `c-js-map/turns.md`. unconscious / steed whobuf still named.
- Prior reviews this SHA claims to close: **158** “next Open `scrolltele` W-tower Override yn”; **145** named the W-tower half after `make_blinded`.

## Intent vs deliverable

Git subject promises: “Match C teleport.c scrolltele so a Wizard-tower or amulet teleport asks y_n("Override?") instead of treating wizard as always-yes.”

Old JS after `make_blinded`: `(u.uhave?.amulet || u.uhave_amulet) && !rn2(3)` then `pline('You feel disoriented for a moment.')` then `if (!wizard) return` with a comment that Override yn is deferred and wizard is treated as accept. C `teleport.c:865–870` ORs `On_W_tower_level(&u.uz)` into the gate, uses `You_feel`, and aborts unless wizard answers `y_n("Override?") == 'y'`.

The diff **does** add the W-tower OR, switch the pline to `You_feel`, and replace always-yes with `!wizard || yn_function('Override?','yn','n') !== 'y'`. It does **not** pull `unconscious()` or steed `whobuf`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| amulet \|\| W-tower `!rn2(3)` gate | C site, **rewritten** | `teleport.c:865` |
| `You_feel("disoriented for a moment.")` | C callee, **imported** | `pline.c:388–400`; `display.js` |
| `y_n("Override?")` | C macro → `yn_function` | `hack.h:1329`; JS 3-arg `getline.js` |
| `On_W_tower_level` | C callee, **imported** | `dungeon.js`; wiz1/2/3 specials |
| `wizard` | C global ≡ `flags.debug \|\| flags.wizard` | pre-existing |
| `unconscious()` / steed `whobuf` | C siblings, **named omit** | `:874–882` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

**RNG:** one `rn2(3)` only when the amulet/W-tower OR is true. Same short-circuit as C. Abort path does not `learnscroll`. Wizard `'y'` continues into the existing Teleport_control/`getpos` arm (pre-existing). No extra die on the yn itself.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Gate vs `teleport.c:865–870`

C:

```
    if ((u.uhave.amulet || On_W_tower_level(&u.uz)) && !rn2(3)) {
        You_feel("disoriented for a moment.");
        /* don't discover the scroll [at least not yet for wizard override];
           disorientation doesn't reveal that this is a teleport attempt */
        if (!wizard || y_n("Override?") != 'y')
            return;
    }
```

JS after this SHA (`teleport.js:1688–1695`): `(u.uhave?.amulet || u.uhave_amulet || On_W_tower_level(u.uz)) && !rn2(3)` then `You_feel('disoriented for a moment.')` then `if (!wizard || (await yn_function('Override?', 'yn', 'n')) !== 'y') return`.

`!rn2(3)` is 1/3 (`rn2` returns 0,1,2). Match. The OR is evaluated before the roll, so a hero with neither amulet nor W-tower does **not** burn `rn2(3)`. Match.

`u.uhave.amulet` in C is the Amulet-of-Yendor carrying bit. JS keeps the pre-existing `uhave?.amulet || uhave_amulet` pair used at other teleport sites; this SHA does not invent a third amulet test. `On_W_tower_level(u.uz)` is the missing half: wiz1/2/3 specials, **not** `In_W_tower` (rectangle). A non-amulet hero on wizard1 now rolls like C.

### `You_feel` vs `pline.c:388–400`

C prefixes `"You feel "` unless `Unaware` (`"You dream that you feel "`). JS `display.js:3457–3460` is `pline(\`You feel ${msg}\`)` with Unaware named on the callee. Default Unaware off so the public string is the C awake string. **Not a stub.** Old JS `pline('You feel disoriented…')` already emitted that awake string; switching to the callee is the C site, not a second clone.

### `y_n` vs `hack.h:1329` / `cmd.c:5471`

`#define y_n(query) yn_function(query, ynchars, 'n', TRUE)` with `ynchars[] = "yn"` (`decl.c:113`). JS `yn_function('Override?', 'yn', 'n')` matches query, resp, default. Space/return/ESC-with-`n` in resp return `'n'` (abort). Only `'y'` continues.

C’s fourth argument `TRUE` is `addcmdq`: a successful answer is pushed to `CQ_REPEAT`. JS `yn_function` is 3-arg and does not `cmdq_add_key`. That is the **pre-existing** yn clone gap (every `y_n` in JS), named in the hunk comment as “JS 3-arg yn”. Not a lie about Override existing. Do not Must-fix Repeat-buffer here (would steal `init_artifacts`).

`!wizard` short-circuits so a non-wizard **never** paints Override. Wizard **always** paints after the 1/3 You_feel. Old JS skipped the prompt and fell through — that was the C-wrong this SHA removes.

Abort returns before the Teleport_control/`learnscroll`/`getpos` arm **and** before the unconditional trailing `learnscroll` + `safe_teleds`. C same (`return` at `:870`). Wizard `'y'` does not learn the scroll from disorientation; discovery waits for the later `if (scroll) learnscroll` at `:883–884` or `:911–912`. JS same.

| Case | C | JS after |
|------|---|---------|
| neither amulet nor W-tower | no `rn2(3)` | **same** |
| amulet or wiz1/2/3, `rn2(3)!=0` | fall through | **same** |
| 1/3, non-wizard | You_feel + return | **same** |
| 1/3, wizard `'n'` / default / ESC | return, no learnscroll | **same** |
| 1/3, wizard `'y'` | continue to control/`getpos` | **same** |
| `unconscious()` / steed `whobuf` | C `:874–882` | **named omit** |

## Constitution / playbook

No FORCE / getRngLog / seed-shaped “if wizard skip yn”. The prompt is C’s `y_n` string. Rule #2: `yn_function` from `./getline.js`, `You_feel` from `./display.js`. Frozen contracts untouched. Do not invent a second Override prompt in `tele()`. `tele()` is `scrolltele(null)` — this gate is shared. Do not `learnscroll` on the abort return.

## Hallucinations / overclaim

D-log / CURRENT / subject say a Wizard-tower or amulet teleport asks `y_n("Override?")` instead of treating wizard as always-yes. **That `if` is the hunk.** Stamping **Addressed:** D-1197 is fair. This is **not** “Match C dispatch, callee is a stub”: `yn_function` is the live tty-shaped prompt; `You_feel` writes the C awake string; `On_W_tower_level` is the wiz1/2/3 predicate. Do **not** stamp “Match C `unconscious()`” or “Match C steed `Where do you and %s`” or “Match C `addcmdq` Repeat.” Say so: wizard Override is C; Repeat-queue of the answer is still the 3-arg yn omit.

### Clone classification (this SHA)

- `:865–870` gate — C site, rewritten in place.
- `On_W_tower_level` — C callee, imported.
- `You_feel` — C callee, imported (Unaware named on that function).
- `yn_function` — C callee, imported; 4th `addcmdq` arg absent (pre-existing).
- No no-op helper. No local `y_n` wrapper.

## Density

One `if` plus callee swap (~15 lines of real JS). Thin versus §2b’s 50–300 heuristic, but it is the whole queued Open row review **158** named as next. Did not glue unconscious/steed. Queue forbids combining Open items. Acceptable one-row peel after fortress PASS; waste would have been splitting W-tower OR and the yn across two iters.

## Verification

Journal: private canary **44**/44 (wiz1/2/3; neither skips `rn2(3)`; amulet skip-roll; non-wizard abort no yn; wizard n / default / ESC abort; wizard y continues to Where; `flags.debug`; no learnscroll on abort; no fs/FORCE); green+strict seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/2200/0014/0004. Path public-unhit unless a public hero has the Amulet or is on W-tower **and** rolls `!rn2(3)`. Cadence **#1525** **44**/44 does not prove Override.

Grep of `git show 7deb2670 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `teleport.c:849–915`, `hack.h:1329`, `decl.c:113`, `pline.c:388–400`, `dungeon.c` `On_W_tower_level`. JS SHA `scrolltele`; existing `getline.js` / `display.js` / `dungeon.js` callees.

`make_blinded` stays **above** this gate (D-1184). Do not hoist Override above Eyes clear. `safe_teleds` stays the uncontrolled fallback after Sorry… — C `:914`.

Callers: `tele()` is `scrolltele(NULL)` (`teleport.c:1733–1735` / JS `:1733–1735`) so a wizard `#teleport` / trap `tele()` hits the same Override. `seffects` SCR_TELEPORTATION passes the scroll object (D-0407) so abort still must not `learnscroll`. C `YN()` (`hack.h:1336`, `addcmdq` FALSE) is **not** this site; the site is `y_n` (`TRUE`). Do not swap in `YN` to skip Repeat — JS already skips Repeat by having no fourth arg.

`flags.debug || flags.wizard` is how this port spells C `wizard` (D-0576). Canary used `flags.debug`. A `flags.wizard`-only build would still prompt. Non-debug public Tourists never paint Override unless they carry the Amulet and roll 1/3 — then they abort without yn (`!wizard` short-circuit). That is C.

Do not discover the scroll from You_feel: C comment at `:867–868` is explicit. JS comment copies it. Wizard `'y'` then `learnscroll` only inside the control arm or the trailing uncontrolled `learnscroll` — C `:883–884` / `:911–912`. Match.

`nhgetch` for Override is the same input boundary as every other `yn_function` (one await). C `y_n` blocks in the window port. Screens captured in `_preNhgetchHook` will show `Override? [yn] (n) ` for wizard-only 1/3. Non-wizard abort has no extra key. Do not paint Override when `!wizard`. `rn2(3)` is the only new die vs old JS on the W-tower-only path (old JS skipped that roll without amulet). That extra roll is C, not a fortress alignment.

`On_W_tower_level` is **not** `In_W_tower`. A hero on wiz1 standing in the ordinary Gehennom ring around the tower still hits this gate (level special). A hero in the tower rectangle on a non-wiz special does not (there is no such special). JS uses the imported specials predicate. Match.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `init_artifacts`). Claimed Override matches `:865–870`.

C-wrong / debt remaining (map / later peel, not new Must-fix prepends):

1. `yn_function` should honor `addcmdq` (`cmd.c:5542–5543`) so Repeat replays Override like C `y_n`. Until then wizard Cmd-A after Override does not re-answer `'y'`/`'n'` from the queue.
2. `You_feel` Unaware dream prefix (`pline.c:394–395`).

Named omits / do-nots:

3. `unconscious()` controlled fail; steed `whobuf` “you and %s”. `dotele` trap-at-feet. `dotelecmd` m-prefix.
4. Do not revert D-1197. Do not treat wizard as always-yes. Do not `learnscroll` on Override abort. Do not use `In_W_tower` for this gate (C is **level** specials). Do not skip `rn2(3)` when only W-tower is set.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `scrolltele` now ORs `On_W_tower_level` into the 1/3 disorient gate and asks live `yn_function("Override?")` with default `'n'`, matching `teleport.c:865–870`; wizard always-yes is gone, and unconscious/steed stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1197 `7deb2670`. Next port in this window popped Open migrate bit 2. Not make_blinded, not unconscious.
