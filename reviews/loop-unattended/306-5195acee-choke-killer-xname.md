# Review 306 — 5195acee — eat.c choke killer_xname (D-1344)

## Metadata
- Full / short hash: `5195acee159cf9b015f40a9617ff4964b3041d98` / `5195acee`
- Parent: `946d719d` (D-1343). This file audits **this SHA only**. Archive **Addressed:** D-1344 `5195acee` already has the short hash (filled by D-1345).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 06:56:42 +0200
- D-id: **D-1344**
- Stats: 12 files, +115 / −108 — `js/eat.js` +13 / −4; `js/objnam.js` comment; `js/dokick.js` comment.
- Claims to close: Open `eat.c` choke `killer_xname` (remaining caller; named from D-1343). Not zap. `reviews/loop-2026-08-15/` has no unpaid choke Must-fix.
- JS / map: `eat.js` `choke`; live `killer_xname` from D-1335; `c-js-map/turns.md` + `debt.md`. lesshungry/bite callers; dothrow/pickup remaining `killer_xname` still named. zap self-zap still named **at this SHA** (D-1345 next).
- Prior reviews this SHA claims to close: **297** named eat choke after dokick `killer_xname`; D-1343 follow-up queued this Open row.

## Intent vs deliverable

Git subject promises: “Match C eat.c choke so a choking death is named with killer_xname (article, corpse species, deadly slime mold) on the tombstone, instead of storing a bare xname.”

C `choke` (`eat.c:245–288`); killer arms `:268–284`:

```
        svk.killer.format = KILLED_BY_AN;
        if (food) {
            You("choke over your %s.", foodword(food));
            if (food->oclass == COIN_CLASS) {
                Strcpy(svk.killer.name, "very rich meal");
            } else {
                svk.killer.format = KILLED_BY;
                Strcpy(svk.killer.name, killer_xname(food));
            }
        } else {
            You("choke over it.");
            Strcpy(svk.killer.name, "quick snack");
        }
```

C callers: `eataccessory` AMULET_OF_STRANGULATION `:2387`; `bite` `:3139` when `canchoke && uhunger >= 2000`; `lesshungry` `:3296–3302` (eating piece vs tin/`NULL`). `killer_xname` already applies `an`/`the` (`objnam.c:1942–2005`), so the non-coin arm uses `KILLED_BY` not `KILLED_BY_AN`.

Old JS: `game.killer.name = xname(food)` with `KILLED_BY`. Coins `"very rich meal"` and null `"quick snack"` already matched.

The diff **does** import `killer_xname` and use it on the non-coin arm, keeping `KILLED_BY_AN` default then overlay `KILLED_BY`. It does **not** wire `bite` / `lesshungry`. JS `lesshungry` (`eat.js:642–646`) still only `uhunger +=` + `newuhs`. JS `bite` (`:1197–1214`) still has no `canchoke` / `choke(...)` arm. Named. Comment-only dokick/objnam.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `choke` non-coin arm | C `:278–279`, **wired** | |
| `killer_xname` | C `objnam.c:1942–2005`, **imported live** | D-1335; not a local clone |
| coins / null arms | C `:275–276`/`:282–283`, **pre-existing live** | `"very rich meal"` / `"quick snack"` |
| `foodword` pline | C `:274`, **pre-existing live** | material word, not tombstone |
| `eataccessory` AoS | C `:2387`, **imported live** | `case AMULET_OF_STRANGULATION: choke(otmp)` |
| `bite` / `lesshungry` | C `:3139`/`:3299`, **named omit** | JS helpers do not call `choke` |
| `the()` CapitalMon | C `objnam.c`, **named omit** | inside `killer_xname` article gate |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG inside `choke`:** none. Existing `!Strangled && !rn2(20)` vomit path unchanged.

## C ↔ JS fidelity

Early gates match `:248–266`: non-satiated returns unless AoS; lawful Knight `adjalign(-1)` + glutton pline; `exercise(A_CON, false)`; Breathless/Hunger/`!Strangled&&!rn2(20)` → AoS composure or vomit/`morehungry`. Else killer block.

Format: `KILLED_BY_AN` first, then non-coin overlay `KILLED_BY`. Match `:268`/`:278`. Coins keep `KILLED_BY_AN` + `"very rich meal"`. Null food keeps `KILLED_BY_AN` + `"quick snack"`. Match. Non-coin: `killer_xname(food)` — live callee (known/dknown, strip BUC/uname/oname, corpse species, `"deadly slime mold"`, `an`/`the`, restore). Not a stub. `xname` would have been `"food ration"` without article; C is `"a food ration"` under `KILLED_BY`.

`eataccessory` already calls `choke(otmp)` for AoS. That path now stores `killer_xname`. Food-ration choke via `bite`/`lesshungry` still never reaches `choke`. Named, not a lie about the function body.

Hallucination check: “Match C `choke`” while **bite/lesshungry omit the call** is an overclaim on ordinary stuffing deaths. The **function** matches `:268–284`. Dispatch from AoS is live. Callee `killer_xname` is live (review **297**). Do **not** stamp “Match C `lesshungry` choke.” Do **not** stamp “Match C `dozap`.”

## Hallucinations / overclaim

Subject says a choking death is named with `killer_xname` instead of bare `xname`. **True when `choke` runs** (AoS; any future caller). **False today for occupation eating** until bite/lesshungry call it. D-1344 **Not this iter** names those callers. Stamping **Addressed:** D-1344 for the `choke` body is fair. Do **not** treat fortress PASS as a ration tombstone.

## Density

One C function’s killer arm. ~10 lines of JS plus comments. Playbook §2b on the thin side, but it is the queued Open row (one remaining `killer_xname` caller), not an invented one-`if` peel. Did not glue zap/dothrow. Acceptable.

## Branch-by-branch confirm

1. Non-satiated, not AoS: return. Match `:248–250`.
2. Satiated lawful Knight: `adjalign` + glutton. Match `:251–253`.
3. Breathless/Hunger/`!rn2(20)` + AoS: composure, no `done`. Match `:260–262`.
4. Same + food: vomit path, no killer. Match `:264–266`.
5. Coins: `"very rich meal"`, `KILLED_BY_AN`. Match `:275–276`.
6. Ration/corpse/slime mold: `killer_xname` + `KILLED_BY`. Match `:278–279`.
7. `food==null`: `"quick snack"`. Match `:282–283`.
8. `bite`/`lesshungry`: still no call. Named.
9. **Public-unhit** unless a session dies of choking.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No new `fastforward`. Plain ESM.

## Verification

Journal: private canary **45**/45; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on choke death. Cadence on review **307**. I did not re-run the private canary. Fortress PASS is not a slime-mold tombstone.

## Actionable C-wrongs

None for Must-fix. The `choke` killer arms match C `:268–284` call-for-call. Unwired `bite`/`lesshungry` are named omit callers of a live function, not a clone that diverges.

Named omits (map, not Must-fix):

1. `eat.c` `lesshungry` / `bite` `choke` callers (`:3139`/`:3299`)
2. dothrow `throwit` `:1747` `killer_xname` (Open after D-1345)
3. pickup / wield remaining `killer_xname`

Do not Must-fix “coins should use `killer_xname`” (C does not). Do not Must-fix “non-coin should stay `KILLED_BY_AN`” (double article; C switches to `KILLED_BY`).

## Callers / RNG ledger

C: `choke` → `killer_xname` (no RNG; may `xname` internally). JS: same when `choke` runs. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `choke` now stores `killer_xname` + `KILLED_BY` for non-coin food; bite/lesshungry still never call it.
- Must-fix stays empty for this SHA.
