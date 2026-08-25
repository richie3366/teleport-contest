# Review 434 — e6a44782 — zap.c zap_steed WAN_MAKE_INVISIBLE via bhitm (D-1473)

## Metadata
- Full / short hash: `e6a44782a347673920b5f7a46e7ee36f63a3daaa` / `e6a44782`
- Parent: `71a0a3d5` (D-1472). This file audits **this SHA only** (seventh of nine `js/` commits since review **427**). Archive **Addressed:** D-1473 `e6a44782` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 13:19:26 +0200
- D-id: **D-1473**
- Stats: 10 files, +117 / −33 — `js/zap.js` +34 / −11.
- Claims to close: Open `zap.c` `zap_steed` WAN_MAKE_INVISIBLE via bhitm (named from D-1472 / review **433**). Not STRIKING. `reviews/loop-2026-08-15/` has no unpaid steed-invis Must-fix.
- JS / map: `zap.js` `zap_steed` / existing `bhitm` WAN_MAKE_INVISIBLE (D-1414 / D-1423) / `mon_set_minvis` / `knowninvisible`. Caller `weffects` `:3437–3439`. `c-js-map/turns.md` + `debt.md`. Remaining bhitm-routed steed otyps named.
- Prior reviews this SHA claims to close: **432** named remaining after POLY (INVIS next after potionhit); **374** QUALITY-RISK was bhitm conferral SI, not this route.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed WAN_MAKE_INVISIBLE via bhitm so a downward make-invisible wand while riding hits the steed instead of skipping zap_steed.”

C `zap_steed` `:3117` in the `:3115–3134` bhitm group. Caller `weffects` `:3437–3439` disclose + skip `zap_updown`. Callee `bhitm` `:348–368`: snapshot `Monnam`; `seemimic`; `mon_set_minvis(FALSE)`; `!oldinvis && knowninvisible` → “turns transparent!” + `reveal_invis`/`learn_it`; else `couldsee && !canseemon` → “vanishes!”. `knowninvisible` See_invisible is H\|\|E ≡ uprops (D-1423).

Old JS: INVIS defaulted `zap_steed` false → `zap_updown`. `bhitm` INVIS already live.

The diff **does** add `case WAN_MAKE_INVISIBLE:` to the existing `bhitm(steed)` group. It **does not** change `bhitm` invis bodies (comment only). It **does not** add striking/slow/speed/CURE_SICKNESS. Named. It **does not** port `zap_map` engraving WAN_MAKE_INVISIBLE. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_steed` WAN_MAKE_INVISIBLE arm | C `:3117–3133`, **wired this SHA** | |
| `weffects` steed-down gate | C `:3437–3439`, **pre-existing** | |
| `bhitm` WAN_MAKE_INVISIBLE | C `:348–368`, **imported live** (D-1414) | |
| `mon_set_minvis` | C `worn.c`, **imported live** | |
| `knowninvisible` | C `youprop.h` See_invisible, **imported live** (D-1423) | |
| `zap_map` WAN_MAKE_INVISIBLE engraving | C, **named omit** | |
| remaining `zap_steed` bhitm otyps | C `:3122–3129`, **named omit** | STRIKING next at this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the invis arm (`mon_set_minvis` has no dice). Public fortress does not zap make-invisible while mounted.

## C ↔ JS fidelity

`zap_steed` INVIS now `bhitm` then `steedhit=true`. Match `:3117–3134`. **Callee is not a stub.** Hallucination check: “Match C via bhitm” while **`mon_set_minvis` + `knowninvisible` (uprops SI) are live** is **not** a dispatch-stub lie.

`weffects` disclose still learns when the steed was already minvis (no transparent/vanish). Match D-log. There is no SPE_MAKE_INVISIBLE (wand-only).

`bhitm` `:348–368` unchanged: name snapshot before minvis; `mon_set_minvis(false)` (not cursed-potion invert); transparent iff `!oldinvis && knowninvisible`; else vanish iff `couldsee && !canseemon`. `knowninvisible` conferral ring-of-SI still learns (D-1423). Match.

Pinned C (INVIS is `:3117` in the bhitm list; there is no SPE_MAKE_INVISIBLE):

```3115:3134:nethack-c/upstream/src/zap.c
    case WAN_MAKE_INVISIBLE:
    case WAN_CANCELLATION:
    // ... POLY / STRIKING / SLOW / SPEED / HEALING / DRAIN / OPENING ...
        (void) bhitm(u.usteed, obj);
        steedhit = TRUE;
```

Callee this SHA does **not** rewrite:

```348:367:nethack-c/upstream/src/zap.c
    case WAN_MAKE_INVISIBLE: {
        int oldinvis = mtmp->minvis;
        boolean couldsee = canseemon(mtmp);
        // ... seemimic; Strcpy(nambuf, Monnam(mtmp));
        mon_set_minvis(mtmp, FALSE);
        if (!oldinvis && knowninvisible(mtmp)) {
            pline("%s turns transparent!", nambuf);
        } else if (couldsee && !canseemon(mtmp)) {
            pline("%s vanishes!", nambuf);
```

JS after this SHA: `case WAN_MAKE_INVISIBLE:` shares `await bhitm(steed, obj); steedhit = true;` (`js/zap.js` `:5900–5928`). `bhitm` still snapshots `Monnam` then `mon_set_minvis(mtmp, false)` (`:3853–3866`). STRIKING still `default` at this SHA (later D-1474). `zap_map` engraving WAN_MAKE_INVISIBLE is not this caller.

## Hallucinations / overclaim

Subject says downward make-invisible while riding hits the steed instead of skipping `zap_steed`. **True:** `steedhit=true` → no `zap_updown`; minvis + vanish or transparent; disclose still learns if already minvis. **False until named** for remaining steed otyps, `zap_map` engraving. Stamping **Addressed:** D-1473 for the **steed switch arm** is fair. Do **not** stamp “Match C zap_steed STRIKING.” Do **not** treat fortress PASS as a riding-down invis wand.

## Density

One `zap_steed` otyp through existing `bhitm`. ~4 lines of real JS plus comments. Playbook §2b. Did not glue STRIKING. Acceptable.

## Branch-by-branch confirm

1. Riding, `dz>0`, WAN_MAKE_INVISIBLE: `bhitm(steed)` then disclose. Match `:3117–3133` / `:3437–3439`.
2. Visible steed, no SI: vanish. Match `:362–366`.
3. See_invisible: transparent + learn_it. Match `:358–361`.
4. Already minvis: no extra pline; still disclose from `weffects`. Match.
5. STRIKING still default `zap_steed` false at this SHA. Named (later D-1474).
6. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. No hardcoded steed coordinates.

## Verification

Journal: private canary **22**/22 (C/JS grep; Rule #2; riding-down WAN_MAKE_INVISIBLE minvis+vanish disclose; See_invisible transparent; already-minvis still disclose; poly/cancel/opening/teleport/probing/drain siblings; striking/locking still default; no-steed / dx / dz<0 skip); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The switch arm matches `:3117–3133`. `mon_set_minvis` / `knowninvisible` are C callees.

Named omits (map / Open, not Must-fix):

1. `zap_steed` WAN_STRIKING/SPE_FORCE_BOLT via bhitm — later D-1474
2. remaining slow / speed / SPE_CURE_SICKNESS
3. `zap_map` engraving WAN_MAKE_INVISIBLE

Do not Must-fix “dispatch is a stub.” Do not Must-fix “already-minvis should skip disclose.”

## Callers / RNG ledger

C callers: `weffects` steed-down. No dice in the invis arm. Public fortress does not hit the new arm.

Verdict: **ACCEPT-WITH-DEBT**
