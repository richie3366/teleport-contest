# Review 167 — f389c2b4 — teleport.c `scrolltele` `unconscious()` fail (D-1205)

## Metadata
- Full / short hash: `f389c2b4c8cfb3640b690b0c5a848b6a1c5cf0b1` / `f389c2b4`
- Parent: `16e17ade` (review **163–166** + cadence #1530). This file audits **this SHA only**. Archive row **Addressed:** D-1205 `f389c2b4` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 06:47:14 +0200
- D-id: **D-1205**
- Stats: 10 files, +147 / −61 — `js/teleport.js` +66 / −22.
- Claims to close: Open queue `teleport.c` `scrolltele` unconscious (named from D-1197 / D-1184 / D-0407 / review **166**). Not Override yn. `reviews/loop-2026-08-15/` has no unpaid unconscious Must-fix.
- JS / map: `teleport.js` `scrolltele` + local `unconscious()`. `c-js-map/turns.md`. Steed `whobuf` still named at this SHA (D-1206 next).
- Prior reviews this SHA claims to close: **166** “next port is already Open `scrolltele` unconscious”; **159** named the fail pline after Override.

## Intent vs deliverable

Git subject promises: “Match C teleport.c scrolltele so an unconscious hero with teleport control falls through to safe_teleds, instead of asking getpos.”

Old JS entered the Teleport_control / blessed / wizard arm and always painted `"Where do you want to be teleported?"` then `getpos`. C `teleport.c:872–905`: that arm is

```
        if (unconscious()) {
            pline("Being unconscious, you cannot control your teleport.");
        } else {
            … whobuf / getpos / teleok / teleds return / Sorry… …
        }
    }
    if (scroll) learnscroll(scroll);
    (void) safe_teleds(TELEDS_TELEPORT);
```

No early return on the fail pline. The diff **does** wrap the getpos block in `if (unconscious()) { fail pline } else { … }` and leaves the trailing `learnscroll` + `safe_teleds` in place. It does **not** pull steed `whobuf`. Named at this SHA.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `unconscious()` | **clone** of `trap.c:6776–6786` | local: `trap.js` imports this file |
| fail pline | C site, **new** | `teleport.c:874–875` |
| getpos / `teleok` / `teleds` / Sorry | C, **pre-existing** | now inside `else` |
| trailing `learnscroll` + `safe_teleds` | C site, **pre-existing** | fall-through after the control `if` |
| eat.js `unconscious` | **same clone** | body identical; not this SHA |
| steed `whobuf` | C sibling, **named omit** | `:877–882`; D-1206 |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** on this path (`unconscious` is a predicate).

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Predicate vs `trap.c:6776–6786`

C:

```
boolean
unconscious(void)
{
    if (gm.multi >= 0)
        return FALSE;

    return (u.usleep
            || (gn.nomovemsg
                && (!strncmp(gn.nomovemsg, "You awake", 9)
                    || !strncmp(gn.nomovemsg, "You regain con", 14)
                    || !strncmp(gn.nomovemsg, "You are consci", 14))));
}
```

JS (`teleport.js:1663–1671`): `multi >= 0` → false; `u.usleep` → true; else `nomovemsg.startsWith` the three prefixes. `startsWith('You awake')` is `strncmp(..., 9)==0` for any longer wake string. NULL `nomovemsg`: C short-circuits the `&&`; JS `|| ''` then all `startsWith` false. Paralysis with a non-matching `nomovemsg` is **not** unconscious in either. Match.

Callers of C `unconscious` besides `scrolltele`: `trap.c:2649` (not this SHA). The local clone exists because `trap.js` already imports `teleport.js`. eat.js already had the same body for `Unaware`. Duplicate clones that match C are not C-wrongs.

### Control arm vs `teleport.c:872–915`

Outer gate is pre-existing: `((Teleport_control || (scroll && scroll.blessed)) && !Stunned) || wizard`. C `Stunned` is the youprop macro; JS still `u.Stunned \|\| u.HStun \|\| u.EStun` (sticky extra, **pre-existing**, not this hunk). Stunned non-wizard never enters, so no fail pline — C same.

| Case | C | JS after |
|------|---|---------|
| `multi >= 0` | getpos | **same** |
| `usleep` / matching wake prefix | fail pline, **no** getpos, then `learnscroll`+`safe_teleds` | **same** |
| getpos ESC | `return` inside else | **same** |
| `teleok` | `teleds` + maybe clear travelcc + **return** | **same** |
| `!teleok` | `Sorry…` then fall through to `safe_teleds` | **same** |
| no control / not wizard | silent `safe_teleds` | **same** (outer if false) |
| wizard + unconscious | fail pline + `safe_teleds` (still no getpos) | **same** |

D-log “Wizard still fails (Override is the earlier amulet/W-tower yn)” is slightly muddled: Override is a **different** earlier `return`. Wizard unconscious still prints the fail line and falls through; it does not skip the fail pline because of Override. The **code** is the C fall-through. Not a stub callee.

`learnscroll` on the unconscious path: C does **not** learn inside the `if (unconscious)` arm; the trailing `:911–912` does. JS same. Conscious successful `teleok` learns inside else (`:883–884`) and returns, so the trailing learn is skipped — C same. Conscious `Sorry` learns twice (else + trailing); C same, typically idempotent.

### `safe_teleds` is live

Fall-through calls existing `safe_teleds(TELEDS_TELEPORT)` (D-0407). **Not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C steed `whobuf`” on this SHA.

### Prefixes vs C `strncmp` lengths (call-for-call)

C lengths are literal: `"You awake"` is 9, `"You regain con"` is 14, `"You are consci"` is 14. Those are the `nomovemsg` strings C sets for sleep / faint-recover / unconscious-recover (`unmul` / `fall_asleep` paths). JS `startsWith` of the same literals is the same test: a longer `"You awake from your nap."` still matches; `"You awaken"` would also match C `strncmp(..., 9)` because `"You awake"` is a prefix of `"You awaken"` — both implementations share that quirk. `"You are conscious"` matches `"You are consci"`. A paralysis `nomovemsg` such as `"You can move again."` matches none of the three.

`u.usleep` in C is the remaining sleep timeout (nonzero). JS `if (u.usleep) return true` treats any truthy the same. `multi >= 0` is the first gate: occupation or a positive count is not unconscious even if `nomovemsg` is stale. Match.

eat.js `:385–393` is byte-for-byte the same clone (used for `Unaware`, fainted still named-false). Two matching clones are not a divergence from C; they are a cycle workaround. Do not enqueue “dedupe unconscious” as Must-fix.

### Callers of `scrolltele` (not this SHA’s body)

C `tele()` is `scrolltele(NULL)` (`:840–845`). JS `tele()` → `scrolltele(null)` (`:1760–1762`). `seffects` SCR_TELEPORTATION still awaits `scrolltele(scroll)`. The new `if (unconscious)` runs for both. `dotele` at this parent did **not** yet read `t_at`; it called `tele()` after the energy stub, so an unconscious `^T` would also hit this arm once Teleportation passed. That is C (`dotele` → `tele` → `scrolltele`) and not a second port.

### Outer gate (pre-existing, still the envelope)

```
    if (((Teleport_control || (scroll && scroll.blessed)) && !Stunned)
        || wizard) {
```

JS Teleport_control is `H \|\| E \|\| u.Teleport_control` (sticky extra, pre-existing). Blessed scroll ORs in. Wizard bypasses Stunned. This SHA does not change that predicate; it only inserts the C `unconscious` test inside. Override (`:865–870`, D-1197) is **before** this `if` and can `return` without ever testing unconscious. Correct.

### Anti-pattern grep (this SHA `js/`)

No `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, public seed names, or hardcoded coordinates in control flow. The fail string is C’s literal, not a recorded screen.

## Hallucinations / overclaim

Subject + D-1205 say fail then `safe_teleds` instead of getpos. **That `if`/`else` plus the existing trailer are the hunk.** Stamping **Addressed:** D-1205 is fair. This is **not** “Match C `unconscious` in `trap.c` itself” (still a local clone). Do **not** stamp “Match C `dotele` trap-at-feet” or “Match C `dotelecmd` m-prefix.”

## Density

One C `if` inside an already-ported `scrolltele` control arm, plus a 9-line clone that eat.js already had. §2b “one deferred `if` alone” is the low end. Steed `whobuf` is the next three lines of the same `else` and shipped as D-1206. Wasteful split, not a C-wrong. Do not Must-fix “merge peels.”

## Branch-by-branch confirm (required: not “seems fine”)

Walk of `scrolltele` at `teleport.c:849–915` vs JS after this SHA:

1. `noteleport_level && !wizard` → mysterious force, optional `learnscroll`, return. **Unchanged.** Unconscious never reached.
2. `!Blinded` → `make_blinded(0, FALSE)`. **Unchanged** (D-1184). Dynamic import `do.js`.
3. `(amulet \|\| On_W_tower_level) && !rn2(3)` → `You_feel` disoriented; `!wizard \|\| y_n Override != 'y'` return. **Unchanged** (D-1197). One `rn2(3)` only when the OR is true. Unconscious not tested here.
4. Control `if` (`Teleport_control \|\| blessed && !Stunned` or wizard):
   - **NEW:** `unconscious()` true → fail pline, **do not** `return`, exit the inner if, skip `else`.
   - false → `else` getpos path (whobuf still named: always `"you"` at this SHA).
5. After the control `if`: `if (scroll) learnscroll`; `safe_teleds`. Reached after (4) fail, after (4) `Sorry`, and when (4) is false. **Not** reached after (4) successful `teleds` (`return` inside else) or getpos abort (`return` inside else).

RNG on this SHA: none added. `rn2(3)` in step 3 is pre-existing. `safe_teleds` / `teleok` keep their existing dice. The fail path must not call `getpos` (would steal keys) and must not skip `safe_teleds` (would skip the materialize RNG). JS fall-through preserves that.

`trap.c:2649` other `unconscious()` caller is not this file. Porting the real `trap.js` function would cycle (`trap.js` already imports `teleport.js`). Local clone matching eat.js is the C body, not a no-op.

## Verification

Private canary **37**/37 (order, `usleep`, three prefixes, paralysis not unconscious, `multi>=0`, Stunned skip, wizard/`flags.debug` still no getpos, no-control silent, blessed, learnscroll fall-through, noteleport before, no getpos). Green+strict seed8000/0900. Cohort **7**/7 + strict 1500/0012/0360/4500/2200/0014/0004. **Public-unhit** unless a controlled teleport fires while `multi<0` sleep or a matching wake `nomovemsg`. Admit that.

## Actionable C-wrongs

None in this envelope. Sticky `Stunned` on the outer gate is pre-existing and not this SHA. Steed `whobuf` was named omit here and is D-1206, not Must-fix on this file.

1. *(none to enqueue)*

## Verdict

- Verdict: **ACCEPT**
- One sentence: an unconscious controlled teleport now prints C’s fail line and falls through to `learnscroll`+`safe_teleds` instead of `getpos`; the predicate matches `trap.c` prefix-for-prefix.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1205 `f389c2b4`. Next port in this window popped Open steed `whobuf`. Not Override, not `dotele`.
