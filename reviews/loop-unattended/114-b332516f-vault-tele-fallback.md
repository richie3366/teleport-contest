# Review 114 — b332516f — vault_tele tele() fallback (D-1153)

## Metadata
- Full / short hash: `b332516f58951067ca329388c811275e80dce594` / `b332516f`
- Parent: `883bed4f` (review **110–113** + cadence #1465). This file audits **this SHA only**. Archive row **Addressed:** D-1153 `b332516f` was filled by D-1154.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 12:19:07 +0200
- D-id: **D-1153**
- Stats: 11 files, +111 / −52 — `js/teleport.js` +6 / −6 (`vault_tele` else arm); `js/trap.js` comment only.
- Claims to close: Open queue `teleport.c` `vault_tele` `tele()` fallback (named). Not teleds. Review **113** next-port; **94** named omit after teledest. `reviews/loop-2026-08-15/` has no open vault_tele Must-fix.
- JS / map: `teleport.js` `vault_tele` / `tele` / `scrolltele` / `tele_trap`. `c-js-map/turns.md` teleport. `dotele` trap-at-feet teledest, `scrolltele` `make_blinded` / W-tower Override yn still named.
- Prior reviews this SHA claims to close: **94** named `vault_tele` `return false`; **113** next Open.

## Intent vs deliverable

Git subject promises: “Match C teleport.c vault_tele so a once-TELEP with no vault or free cell calls tele(), instead of returning false.”

Old JS `vault_tele` was an invented boolean: VAULT `somexyspace` + `teleok` → `teleds` / `return true`; else `return false` with a comment that `tele()` was deferred. C `teleport.c:772–783` is `void`. Success `teleds` then `return`. Any failure (no `search_special(VAULT)`, `somexyspace` false, `teleok` false) falls through to `tele()` (`:841–845` `scrolltele(NULL)`).

The diff **does** drop the boolean, keep the success `return` after `teleds`, and `await tele()` on the else. It does **not** port `dotele` trap-at-feet (`teleport.c:1145–1152` still `teleds` without this helper). Named. Trap.js hunk is comment-only.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `vault_tele` else `tele()` | C body, **new call** | `teleport.c:782`; was `return false` |
| `vault_tele` success `teleds` | C body, **untouched** | `teleport.c:778–780`; still `TELEDS_TELEPORT` |
| `tele` | C callee, **imported** | `teleport.c:841–845` → `scrolltele(NULL)` (D-0407) |
| `scrolltele` / `safe_teleds` | C callees, **imported** | real; `make_blinded` / W-tower yn **named** on scrolltele |
| `search_special(VAULT)` | C callee, **local clone** | `mkroom.c:764–779`; rooms then subrooms; `hx<0` terminator |
| `somexyspace` | C callee, **local clone** | `mkroom.c:744–756`; 100 tries; ROOM/CORR/ICE |
| `teleok` | C callee, **imported** | D-1119 jump + `in_out_region`; already awaited |
| `teleds` | C callee, **imported** | D-0373…D-1142 envelope |
| `dotele` trap-at-feet | C caller, **named omit** | `teleport.c:1146–1147` |
| invented `true`/`false` | JS, **deleted** | C is `void`; `tele_trap` already `await vault_tele()` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** `tele()` → `scrolltele` → `safe_teleds` (`rnd(COLNO-1)` / `rn2(ROWNO)` 40× + candy) when the vault arm fails. That is C. Previously JS burned **no** RNG and returned. Path **public-unhit** on no-vault once-TELEP (suite still 44/44).

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Do not restore `return false`. Do not skip `teleok` on the success arm. Do not pull `dotele` teledest into this peel. Do not treat `mvault_tele` as this function.

## C ↔ JS fidelity

### Function shape

C `teleport.c:772–783`:

```
staticfn void
vault_tele(void)
{
    struct mkroom *croom = search_special(VAULT);
    coord c;

    if (croom && somexyspace(croom, &c) && teleok(c.x, c.y, FALSE)) {
        teleds(c.x, c.y, TELEDS_TELEPORT);
        return;
    }
    tele();
}
```

JS `teleport.js:1918–1926`: `search_special(VAULT)`; `c = {x:0,y:0}`; same three-and; `await teleds(..., TELEDS_TELEPORT); return`; else `await tele()`. Short-circuit: no vault → no `somexy` RNG; failed space → no `teleok`; failed `teleok` → no `teleds`. Then `tele()`. Match on the Open **else**.

C is `void`. JS no longer returns a boolean. Only caller in scored `js/` is `tele_trap` once (`:1957` `await vault_tele()`). Match.

### `tele()` is not a stub

C `:841–845` is `scrolltele((struct obj *) 0)`. JS `:1518–1520` `await scrolltele(null)`. `scrolltele` noteleport pline, amulet `!rn2(3)` disorient, control/`getpos`, else `safe_teleds` (D-0407). This is **not** “Match C dispatch, callee is a stub.” Named gaps on `scrolltele` (`make_blinded(0,FALSE)`, W-tower Override `yn`) pre-exist and are not this Open line.

### Success arm unchanged

`somexyspace` 100-try ROOM/CORR/ICE + local `occupied` (trap/furniture/lava/pool; invocation still deferred in **this** file’s clone — vault cells are not the Invocation square). `teleok(..., false)` is D-1119. `teleds(TELEDS_TELEPORT)` is the shared hero-place helper. This SHA does not rewrite those.

### `search_special` / `somexyspace`

C `mkroom.c:764–779`: rooms `[0]` until `hx<0`, then subrooms; `ANY_SHOP` / exact `rtype`. JS `:771–783` walks `game.level.rooms` then `subrooms` with the same `hx<0` break. `VAULT` is a rtype, not ANY_SHOP. Match.

C `somexyspace:749–755`: `somexy && isok && !occupied && (ROOM||CORR||ICE)`, 100 tries. JS `:842–852` same. Local `occupied` still omits `invocation_pos` (vault floor is not the vibrating square). `somexy` irregular/subroom reject is named on that clone (pre-existing). Success-arm RNG is `somex`+`somey` (`rn1` width/height) then `teleok` (no RNG). Failure after 100 tries returns false → `tele()`. Match.

### Callers

C `tele_trap` once `:1508–1511`:

```
deltrap(trap);
newsym(u.ux, u.uy);
vault_tele();
```

JS already that order (D-1120/D-1133). This SHA does not retouch `tele_trap` control flow; trap.js is comment-only. C `dotele` `:1146–1147` still named. `mvault_tele` (`:1937`) is the monster twin; not this function.

### `tele()` RNG vs old `return false`

C `scrolltele(NULL)` may `!rn2(3)` on the Amulet, then `safe_teleds` 40× `rnd(COLNO-1)`/`rn2(ROWNO)`. JS `tele()` same. Old JS skipped all of that. A public once-TELEP with no VAULT would have been a FAIL; cadence #1470 still 44/44, so that path stays unhit. Do not “align” by restoring `return false` if a later canary burns `safe_teleds` RNG.

## Hallucinations / overclaim

D-log / CURRENT / subject say a once-TELEP with no vault or free cell calls `tele()` instead of returning false. **That is the hunk:** delete the invented boolean, `await tele()` after the success return. Stamping **Addressed:** D-1153 is fair for the Open **fallback**. Hash `b332516f` is on the archive row (filled by D-1154). Do **not** stamp it as “Match C `dotele` teledest” or “Match C `scrolltele` `make_blinded`.” This is **not** “Match C dispatch, callee is a stub”: `tele` / `scrolltele` / `safe_teleds` are live.

## Density

One else arm + comment. ~8 JS lines. Thin vs §2b “one deferred `if`,” but the queue item is exactly that arm (not `dotele`, not `scrolltele` polish). Not a second hypothesis. Not QUALITY-RISK for thinness under “do not combine items.”

## Verification

Journal: private canary **33**/33 (src order; no-vault `safe_teleds` RNG; empty/OROOM skip; vault-with-space `teleds` no `rnd`; stone/trap/monster fallback; `hx<0`; subroom VAULT; `tele_trap` once ± vault; noteleport stay); green+strict seed8000/0900; cohort **25**/25 (0012 vault + 0004 pony + 0367 Pri ^T + 0360/4500/0373/2200/0014/0009/1500/1800/0060/0102/0700/0017/0030/0116/0383/0007/0361/0108/0002/5002/2600/0006) + strict 0012/0004/0367/0360/4500/2200/0002/0009/0030/0014. Path **public-unhit** on no-vault once-TELEP. Cadence #1465 **44**/44 does not exercise the else.

C read of `teleport.c:772–783`, `:841–845`, `:1508–1511`, `mkroom.c:744–779`; JS SHA `vault_tele` + `tele`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| VAULT + space + teleok | teleds; return | **same** |
| no VAULT | tele() | **same** |
| VAULT, somexyspace fail | tele() | **same** |
| teleok fail | tele() | **same** |
| `dotele` trap-at-feet | teleds, not this helper | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open else matches `teleport.c:782`.

Named omits / do-nots (map / Open, not Must-fix):

1. `dotele` trap-at-feet teledest (`teleport.c:1145–1152`).
2. `scrolltele` `make_blinded(0,FALSE)` / W-tower Override `yn` / unconscious (pre-existing on `tele()`).
3. `somexy` irregular/subroom reject inside `vault_tele`’s local clone.
4. Do not restore `return false`. Do not skip success `teleok`. Do not pull `mvault_tele`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `vault_tele` is now `void` like C — vault `teleds` still returns, and no-vault / no-space / failed `teleok` awaits the real `tele()`/`scrolltele`/`safe_teleds` instead of inventing `false`.
- Must-fix stays empty for this SHA; next port popped Open `inv_pos` / VIBRATING_SQUARE. **Addressed:** D-1154 `10904562`. Not `dotele`.
