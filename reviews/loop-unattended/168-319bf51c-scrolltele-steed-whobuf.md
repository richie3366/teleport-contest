# Review 168 — 319bf51c — teleport.c `scrolltele` steed `whobuf` (D-1206)

## Metadata
- Full / short hash: `319bf51c2c9251543ab90425616bed7707f1a722` / `319bf51c`
- Parent: `f389c2b4` (D-1205). This file audits **this SHA only**. Archive row **Addressed:** D-1206 `319bf51c` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 06:58:46 +0200
- D-id: **D-1206**
- Stats: 10 files, +111 / −45 — `js/teleport.js` +14 / −3.
- Claims to close: Open queue `teleport.c` `scrolltele` steed whobuf (named from D-1205 / D-1197 / D-0407). Not unconscious. `reviews/loop-2026-08-15/` has no unpaid steed-prompt Must-fix.
- JS / map: `teleport.js` `scrolltele` only. `mon_nam` already imported from `do_name.js`. `c-js-map/turns.md`. `dotele` trap-at-feet still named at this SHA (D-1208 next).
- Prior reviews this SHA claims to close: **167** / D-1205 “Did not pull steed `whobuf`.”

## Intent vs deliverable

Git subject promises: “Match C teleport.c scrolltele so a mounted hero's controlled teleport asks where you and the steed want to go via mon_nam, instead of always ‘you’.”

Old JS (after D-1205) inside the conscious `else`: `pline('Where do you want to be teleported?')`. C `teleport.c:877–882`:

```
            char whobuf[BUFSZ];

            Strcpy(whobuf, "you");
            if (u.usteed)
                Sprintf(eos(whobuf), " and %s", mon_nam(u.usteed));
            pline("Where do %s want to be teleported?", whobuf);
```

The diff **does** that string build and uses `mon_nam`, not `y_monnam`. It does **not** pull `dotele` trap-at-feet. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `whobuf` `"you"` + optional `" and "` | C site, **new** | `:879–882` |
| `mon_nam(u.usteed)` | C callee, **imported** | `do_name.js`; ARTICLE_THE |
| `y_monnam` | C sibling, **correctly unused** | would be `"your pony"` + usteed saddle suppress |
| `unconscious()` fall-through | C, **pre-existing** D-1205 | still skips this pline |
| `getpos` / `teleok` / `teleds` | C, **pre-existing** | unchanged |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.**

Grep of this SHA’s `js/` hunks: no banned gates. Fourteen lines of JS.

## C ↔ JS fidelity

### String vs `teleport.c:877–882`

JS (`teleport.js:1723–1729`): `let whobuf = 'you'; if (u.usteed) whobuf += \` and ${mon_nam(u.usteed)}\`; pline(\`Where do ${whobuf} want to be teleported?\`)`. `eos` append is concatenation. Unmounted: `"Where do you want to be teleported?"` — C same. Mounted: `"Where do you and <mon_nam> want to be teleported?"` — C same. Grammar (`do you and the pony want`) is C’s.

This sits **inside** D-1205’s `else`. Unconscious still does not ask. C same (`:874–876` vs `:877`).

### `mon_nam` vs `do_name.c:1041–1046` — not a stub

C `mon_nam`: `x_monnam(..., ARTICLE_THE, 0, has_mgivenname ? SUPPRESS_SADDLE : 0, FALSE)`. JS `do_name.js:569–577` is that call. **Usteed is not in `mon_nam`’s saddle mask** — that extra `\|\| mtmp == u.usteed` is `y_monnam` (`:1117–1128`, comment “saddled is redundant when mounted”). D-1206’s hunk comment “Not `y_monnam` (`your pony`)” is the C callee. An unnamed saddled steed may still read `"the saddled pony"` in **both** C `mon_nam` and JS. Named steed suppresses saddle in both. `x_monnam` `do_it` skips `mtmp == u.usteed` so a minvis steed is not `"it"` (`do_name.c:863–865` / JS `:481–485`). Live function, not a local stand-in.

Do **not** confuse this with D-1206 inventing a `y_monnam` clone. Import path is `teleport.js:59`.

### Callers

C `scrolltele` is `tele()` with NULL and `seffects` SCR_TELEPORTATION. JS `tele()` → `scrolltele(null)` unchanged. The prompt only fires on the controlled conscious path.

### `x_monnam` bits that actually hit this pline

For `u.usteed` on the control prompt:

- `do_it` is false because `mtmp != u.usteed` is required for `"it"` (`do_name.c:863–865`). A Blind/minvis steed still gets a name. JS `:483` has the same `mtmp !== game.u?.usteed` conjunct. Match.
- Article is THE, not YOUR. Unnamed pony → `"the pony"`, not `"your pony"`. That is why C used `mon_nam` not `y_monnam` even though the steed is tame.
- `SUPPRESS_SADDLE` only if `has_mgivenname`. Unnamed saddled steed may include the saddle adjective in **both**. Named `"Lightning"` suppresses it in both. The D-log canary line “saddled; named SUPPRESS_SADDLE” is that split, not a silent `y_monnam`.
- Hallu `rndmonnam` / priestname / mappear are pre-existing `x_monnam` named omits. A hallu hero’s steed prompt would use whatever `x_monnam` already does. This SHA does not add a second namer.

### What the 14-line hunk does **not** touch

`learnscroll` / `getpos` / `teleok` / `teleds` / travelcc clear / `Sorry…` / trailing `safe_teleds` are byte-identical to D-1205’s `else`. Unconscious still skips `whobuf`. No extra `rn2`. No change to `dotele`.

### Anti-pattern grep (this SHA `js/`)

No `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names, or recorded coordinates. The format string is C’s `"Where do %s want to be teleported?"` with a JS template.

## Hallucinations / overclaim

Subject + D-1206 say mounted controlled teleport uses `mon_nam` in `whobuf`. **Those five JS lines are the hunk.** Stamping **Addressed:** D-1206 is fair. This is **not** “Match C `y_monnam`” and **not** “Match C `dotele`.” Do **not** stamp “Match C every `mon_nam` saddle site” — `mon_nam` vs `y_monnam` saddle masks already differed in C.

## Density

§2b **too small**: one deferred `if (u.usteed)` that was the next three C lines after D-1205’s `unconscious` split. Same `else`, same module, same falsifier family (`scrolltele` control prompt). Splitting it burns a full agent tax for 14 lines. That is process waste, **not** a C-wrong family. Must-fix is for JS that contradicts C. Do not enqueue “glue D-1205+D-1206.”

Right-size would have been D-1205’s `if (unconscious)` **plus** this `whobuf` in one commit (one `scrolltele` control-arm cluster). The C is still exact.

The hunk is `js/teleport.js` only. Docs (CURRENT / NOTES / D-log / map / journal / queue archive) are the usual loop tax, not extra JS. That does not make the JS cluster denser.

## Branch-by-branch confirm (required: not “seems fine”)

C `:877–882` is only reached when the control `if` is true **and** `unconscious()` is false. JS same (inside D-1205’s `else`).

| `u.usteed` | C `whobuf` | JS after |
|------------|------------|----------|
| null | `"you"` | **same** |
| unnamed pony | `"you and the pony"` (`mon_nam` THE) | **same** if `mon_nam` matches |
| named Lightning | `"you and Lightning"` (saddle suppressed) | **same** |
| would-be `y_monnam` | `"you and your pony"` | **not used** |

Then C `:883–903`: `learnscroll` if scroll; `cc = u.ux/uy`; if `isok(travelcc)` copy; `getpos`; abort `return`; `teleok` → `teleds` + maybe clear travelcc + `return`; else `Sorry…`. JS `else` after the new `whobuf` is that block unchanged.

No `rn2`/`rnd`/`rn1`/`d` in the hunk. `mon_nam` may hallu-roll inside `x_monnam` when Hallu (D-0838) — pre-existing callee, not a new die this SHA added to `scrolltele`.

Public tourist sessions do not ride during a controlled teleport on the scored traces. Cohort seed0103/0104 are ride sessions but not this prompt. **Public-unhit** is honest.

Review **167** said this SHA’s named omit was steed `whobuf`. This commit is exactly that omit. It does not reopen unconscious (the `if`/`else` is untouched except the pline inside `else`).

`eos(whobuf)` in C writes after the terminating NUL of `"you"`. JS `+= ' and '` is the same bytes. No extra space, no missing space. `mon_nam` return is already a string; C `Sprintf(eos, " and %s", …)` does not add a comma.

C `do_name.c:1041–1046` vs JS `mon_nam` again, because this SHA’s honesty depends on it:

```
char *
mon_nam(struct monst *mtmp)
{
    return x_monnam(mtmp, ARTICLE_THE, (char *) 0,
                    (has_mgivenname(mtmp)) ? SUPPRESS_SADDLE : 0, FALSE);
}
```

JS passes `ARTICLE_THE`, `null` adjective, `has_mgivenname(mtmp) ? SUPPRESS_SADDLE : 0`, `called=false`. Match. `y_monnam` (`:1117–1128`) ORs `mtmp == u.usteed` into the saddle mask and uses ARTICLE_YOUR when tame. Using that here would have been a C-wrong (`your` + no `"saddled"`). They did not.

`has_mgivenname` is the live helper (not a string-length stand-in). `x_monnam` `called` flag is FALSE here like C `mon_nam` (TRUE is `l_monnam` only).

The subject’s “instead of always you” is the pre-D-1206 string. Unmounted JS is still `"you"` — that is C, not a leftover deferral.

Focused verify on this SHA cannot be a public FAIL peel: the suite is a fortress. Private canary + green + ride-adjacent cohort is the §5 matrix for a public-unhit prompt.

`teleport.js` already imported `mon_nam` at line 59 (ustuck-together D-1183). This SHA does not add a local `Amonnam_apply`-style stand-in.

If `u.usteed` is set but `mon_nam` received a null data pointer, both C and JS `x_monnam` already return `"it"` / similar on `!mtmp`. The `if (u.usteed)` gate skips the call when null.

No `fastforward.js` edits (delete-only ban).

## Verification

Private canary **33**/33 (no-steed `you`; unnamed `the-pony` not `your-pony`; named Lightning; saddled via `mon_nam`; named `SUPPRESS_SADDLE`; minvis usteed not `it`; unconscious skip; wake prefixes; paralysis still asks; Stunned skip; wizard bypass; `flags.debug`; blessed; no-control skip; noteleport before; `tele()`; ESC no Sorry; `ETeleport_control`). Green+strict seed8000/0900. Cohort **7**/7 + strict 1500/0012/0360/4500/2200/0014/0004. **Public-unhit** unless a controlled teleport fires while riding. Admit that.

## Actionable C-wrongs

None in this envelope. `mon_nam` priest/mappear/AUGMENT_IT omissions are pre-existing `x_monnam` map debt, not this prompt’s article/saddle mask.

1. *(none to enqueue)*

## Verdict

- Verdict: **ACCEPT**
- One sentence: the conscious control prompt now builds C’s `whobuf` with imported `mon_nam(usteed)`; the peel is thinner than §2b wants and does not contradict C.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1206 `319bf51c`. Next port in this window popped Open `dotele` trap-at-feet. Not unconscious, not energy gate.
