# Review 1204 — fc302b4f — prayer_done −2/−1 arms + pray_revive

Metadata: SHA `fc302b4f` (D-2238). Queue row `pray.c` pray_revive, no
corpus block. js/ pray.js +83/−? (one local function, two arms, coaligned
wiring, import names).

## Intent vs deliverable

Subject promises the two negative p_type arms plus `pray_revive()` in
the coaligned arm; p_type 1/2 water_prayer/angrygods/pleased arms were
already live and verified C-order, so no code change there. The old stub
(`p_type === -2 || p_type === -1 → return 1`, no revive call) is fully
described. Diff delivers exactly the three changes. Promise kept.

## Inventory

New: module-local `pray_revive()` — correct, C `pray.c:2177` is staticfn
with one caller. Changed: `prayer_done` −2/−1/coaligned arms. `sym.mjs`
confirms await-correctness on every touched callee:

```text
revive           js/zap.js:2925    ASYNC — await required
rehumanize       js/polyself.js:819 ASYNC — await required
```

`godvoice` is module-local async (pray.js:953), awaited. Sync-called:
`water_prayer` (module-local sync fn, :849 — no missing await),
`losehp` (sync export, hack.js:1188) followed by awaited
`finish_maybe_wail()` per the house losehp contract. `wake_nearby`
(mon.js async) awaited. pray→zap edge already existed (ALREADY — the
D-log's "new static edge" framing is conservative; zero new cycle risk
either way, `--can` IN-SCC, runtime-only use, no top-level reads).

## C ↔ JS fidelity

pray_revive vs `pray.c:2177–2195`: `objects_at(u.ux,u.uy)` nexthere walk
(same idiom as the live `water_prayer`), CORPSE/STATUE + has_omonst +
`mtame` + `!isminion` first-match break, `revive(otmp,TRUE) != NULL` /
`animate_statue(otmp,u.ux,u.uy,ANIMATE_SPELL,NULL) != NULL` → `!== null`.
Exact (`isminion` is a struct field — property read is right;
`animate_statue` JS signature `(statue,x,y,cause,fail_reason=null)`
matches the call).

−2 arm vs `:2283–2295`: `You hear/intuit diabolical laughter all around
you...` (Deaf disjunct exact), `wake_nearby(FALSE)` — C param is
`petcall` (mon.c:4367), JS `wake_nearby(petcall=false)` — meaning
matches. `adjalign(-2)`, `exercise(A_WIS,FALSE)`, `!Inhell` → `Nothing
else happens.` + return 1, else fall-through to the live Gehennom gate
(JS flows into `if (Inhell())` — the C fall-through, exact).

−1 arm vs `:2296–2305`: godvoice lawful/neutral strings verbatim,
`You_feel('like you are falling apart.')`, `rehumanize()`,
`losehp(rnd(20), 'residual undead turning effect', KILLED_BY_AN)`
(killer + type exact), `exercise(A_CON,FALSE)`, return 1. Exact.

Coaligned vs `:2336–2340`: `(void) pray_revive(); (void) water_prayer(TRUE);`
→ `await pray_revive(); water_prayer(true);` in C order. The `Deaf`
house `u.Deaf ||` disjunct is named with the `altar_wrath` precedent.

## Hallucinations / overclaim

None. Unprobed arms disclosed with reason (−1 needs full polyman hero
state; pray_revive needs altar + tame-corpse state no session stages);
the one /tmp probe (seeded −2 non-Inhell → return 1, no throw) is
reported as such, none committed.

## Density

One function family + two arms, one module. Right-sized.

## Verification

Audit re-ran the corpus claim itself:

```text
verify pray_revive: baseline fc302b4f~1 — 0 session(s) blocked on it
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict ×2 + cohort
7/7 pasted. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/
coordinates. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
