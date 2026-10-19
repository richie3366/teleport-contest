# Review 2899 — 0bb91ae52 — losehp async, maybe_wail + showdamage inline

- SHA: `0bb91ae52` (cliff, writer port: losehp tail order)
- D-entry: D-4058; Ledger: hack.c (`losehp split`, `maybe_wail`,
  `showdamage`, D-4058 appended)
- `js/` diff: 29 files. `js/hack.js` holds the body change (+19/−19).
  The other 28 files only add `await` to `losehp(...)` call sites
  (89 added, 9 already awaited).

## Intent vs deliverable

Promise: `losehp` becomes `async`, and C `:4269`/`:4280` showdamage and
`:4277`/`:4290` maybe_wail print inline in C order. That ends the
"caller never drained `_needs_maybe_wail`" class (7 sessions → FULL
PASS). `done(DIED)` and `rehumanize()` stay deferred (named, `split`).
The diff delivers that. The `_losehp_showdamage` / `_needs_maybe_wail`
plumbing and the ~180 `finish_maybe_wail` drains stay in place, inert
for the wail. They are named as cleanup.

## Inventory

- `losehp` — hack.js:1912 (now `export async`). C: hack.c:4255–4292.
- `maybe_wail` — hack.js:1842 (file-local, unchanged body).
  C: hack.c:4210–4243.
- `showdamage` — hack.js:1900 (unchanged). C: hack.c:4247–4253.
- `finish_maybe_wail` — doc only; body unchanged.
- sym.mjs:

```text
losehp           js/hack.js:1912   ASYNC — await required
maybe_wail       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s): js/hack.js:1842
```

  (`maybe_wail` is `staticfn` in C as well. The one local definition is
  the port, not a clone.)

## C ↔ JS fidelity

C (csym hack.c:4255–4292):

```c
    disp.botl = TRUE;
    end_running(TRUE);
    if (Upolyd) {
        u.mh -= n;
        showdamage(n);
        if (u.mhmax < u.mh) u.mhmax = u.mh;
        if (u.mh < 1) rehumanize();
        else if (n > 0 && u.mh * 10 < u.mhmax && Unchanging) maybe_wail();
        return;
    }
    u.uhp -= n;
    showdamage(n);
    if (u.uhp > u.uhpmax) u.uhpmax = u.uhp;
    if (u.uhp < 1) { ...killer...; urgent_pline("You die..."); done(DIED); }
    else if (n > 0 && u.uhp * 10 < u.uhpmax) maybe_wail();
```

JS hack.js:1912–1966 follows this order: botl, end_running (run/mv/
travel cleared, `multi>0 → 0`), the Upolyd decrement → `await
showdamage(n, mh)` → mhmax clamp → rehumanize flag / `await
maybe_wail()` with the canonical `Unchanging(u)`, the uhp decrement →
`await showdamage` → uhpmax clamp → fatal bail marker / `await
maybe_wail()`. The showdamage gate is `iflags.showdamage && n`, which
matches C showdamage's own early-out. Every state change before the
first await is synchronous, as the D-log says.

maybe_wail body vs C: the `moves <= wailmsg + 50` gate, Wizard/Elf/
Valkyrie `who`, `uhp == 1` "about to die", 12-power `intrinsic &
INTRINSIC` count, `>= 4` text, and banshee/CwnAnnwn You_hear all match.
Soundeffect is a no-RNG omission (named in the doc).

Call-site completeness, which is the real risk of a sync→async flip: a
grep for `losehp(` without `await`, excluding comments and the
`explode_losehp` / `sit_losehp` / `finish_hero_losehp` wrappers, returns
**zero** hits. Indirect references (`.losehp(`, `losehp)` as a value)
are import lists only. `node --check` is clean per the D-log.

## Hallucinations / overclaim

None. The D-log keeps `losehp` `split` because done/rehumanize stay
deferred, which is accurate. "Inert drains" is true: no writer sets
`_needs_maybe_wail` or pushes `_losehp_showdamage` anymore. The stale
per-site comments (muse.js:811, zap.js:2314) are named.

## Density

A writer port that ends a whole class at its single source instead of
patching N callers. The dead plumbing (≈180 `finish_maybe_wail` calls
now running only the rehumanize drain) is debt with no behavior.

## Verification

Re-measure (`--base 0bb91ae52~1 --no-reach`):

```text
verify losehp: scen-worldtour-Priest-49955035: PASS → 1 PASS → PROGRESS
verify maybe_wail: Rogue-50250081, Valkyrie-50550049, Wizard-49955052,
  Barbarian-50255242, Knight-49956002: PASS
  → 5 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

This is an exact match with the D-log. The commit's `sweep losehp,
maybe_wail` (608 baseline-PASS sessions, 0 regressed) and this audit's
full rescore cover the broad reach. There were no FORCE/DIAG/seed
strings, and the rulecheck is clean.

## Actionable C-wrongs

None. Debt (no queue row, no behavior): remove the inert
`_losehp_showdamage` / `_needs_maybe_wail` plumbing and stale
"JS defers via _needs_maybe_wail" comments.

Verdict: **ACCEPT-WITH-DEBT**
