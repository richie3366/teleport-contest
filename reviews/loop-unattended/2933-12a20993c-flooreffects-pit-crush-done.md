# Review 2933 — 12a20993c — flooreffects boulder pit-crush runs done() inline

- SHA: `12a20993c` (cliff, writer behind `one_characteristic`)
- D-entry: D-4092; Ledger: do.c (`flooreffects`, D-4092)
- `js/` diff: `js/do.js` +10

## Intent vs deliverable

Promise: when a boulder falls into the pit the hero is trapped in, C's
fatal `losehp` runs `done()` inline, before `deletedwithboulder`'s
`reset_utrap`. JS deferred `done` to `drop_boulder_on_player`'s later
drain, so the attribute list had already lost «You were trapped in a
pit {6}.» (2 sokoban sessions). Diff: right after the squish `losehp`,
it drains `finish_maybe_wail` + `finish_losehp_done` and returns on
gameover. A lifesave falls through to `deletedwithboulder`. Promise =
diff.

## Inventory

- `flooreffects` boulder → pit, hero-squish arm — do.js:838–857; C
  do.c:228–236, then `deletedwithboulder` :258–269.
- Callees `finish_maybe_wail` (hack.js:2007, async) and
  `finish_losehp_done` (end.js:2021, async, sym.mjs "await required").

## C ↔ JS fidelity

```c
} else {
    if (!Passes_walls && !throws_rocks(gy.youmonst.data)) {
        losehp(Maybe_Half_Phys(rnd(15)), "squished under a boulder", NO_KILLER_PREFIX);
        goto deletedwithboulder; /* player not around to see it */
    }
    …
deletedwithboulder:
    if ((t = t_at(x, y)) != 0) { (void) delfloortrap(t); if (u.utrap && u_at(x, y)) reset_utrap(FALSE); }
```

In C, `losehp` → `done(DIED)` runs disclosure inside the call, so
`u.utrap` is still 6 when the attributes are listed. JS `losehp` only
sets `_needs_maybe_wail` / `_losehp_needs_done`. Draining them at the C
call point moves `done` to the same place in C's order.
`finish_losehp_done` clears the JS-only gameover marker before `done()`,
so savelife sees C's state. On a real death `done` does not return
(`gameover` → `return true`, nothing after it runs, as in C). On a
lifesave it returns, and JS sets `squished` and falls into
`deletedwithboulder` (delfloortrap, reset_utrap, useupf, bury_objs,
newsym), as C's goto does. The rnd(15) draw is unchanged, and it now
comes before the drain, as in C. The commit says read.js's later drain
becomes a no-op: both helpers return early once their flags are clear.

## Hallucinations / overclaim

None. The Named line ("last attribute-screen leftover:
worldtour-Wizard-610136, blind timeout 103 vs 106") matches the
re-measure.

## Density

One drain at one C call site. One Ledger bullet. This uses the same
idiom read.js/do.js already use at other fatal losehp sites.

## Verification

```text
verify one_characteristic (--base 12a20993c~1): 3 blocked
  scen-sokoban-Ranger-50351023, scen-sokoban-Samurai-50356023: PASS
  scen-worldtour-Wizard-610136 s503: still one_characteristic (named)
verify one_characteristic: 2 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
```

This is an exact match with the D-log. Full public 44/44 at HEAD. No
FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
