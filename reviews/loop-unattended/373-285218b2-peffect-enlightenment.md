# Review 373 — 285218b2 — potion.c peffect_enlightenment (D-1413)

## Metadata
- Full / short hash: `285218b2af5a80ffbd965284d1d6308f7dd4bf32` / `285218b2`
- Parent: `fb872749` (D-1412). This file audits **this SHA only** (ninth of nine `js/` commits since review **364**). Archive **Addressed:** D-1413 lacked the short hash; this review commit fills `285218b2`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 13:49:32 +0200
- D-id: **D-1413**
- Stats: 11 files, +239 / −146 — `js/potion.js` +34 / −4 (`peffect_enlightenment` + `peffects` case); `js/zap.js` +7 / −2 (caller comment). Journal rotate is docs.
- Claims to close: Open `potion.c` `peffect_enlightenment` (named from D-1395 / D-1412 / reviews **355** / **372**). Not full healing. `reviews/loop-2026-08-15/` has no unpaid enlightenment Must-fix.
- JS / map: `potion.js` `peffect_enlightenment` / `peffects`. Callee `zap.js` `do_enlightenment_effect` (D-1395) → `invent.js` `enlightenment` (D-1116). `c-js-map/turns.md`. Artifact invoke / mix / remaining peffects still named.
- Prior reviews this SHA claims to close: **355** named potion peffect after wand enlightenment; **372** queued it.

## Intent vs deliverable

Git subject promises: “Match C potion.c peffect_enlightenment so quaffing a potion of enlightenment shows MAGIC self-knowledge (or a cursed uneasy feeling), instead of printing not implemented.”

C `potion.c` `peffect_enlightenment` `:794–808` via `peffects` `:1349–1350`:

```
    if (otmp->cursed) {
        gp.potion_unkn++;
        You("have an uneasy feeling...");
        exercise(A_WIS, FALSE);
    } else {
        if (otmp->blessed) {
            (void) adjattrib(A_INT, 1, FALSE);
            (void) adjattrib(A_WIS, 1, FALSE);
        }
        do_enlightenment_effect();
    }
```

Callee `zap.c` `do_enlightenment_effect` `:2525–2532` (D-1395): `You_feel` self-knowledgeable; `display_nhwindow(WIN_MESSAGE, FALSE)`; `enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS)`; `pline_The` feeling subsides; `exercise(A_WIS, TRUE)`. `adjattrib` msgflg FALSE is **0** (message, dunce constrict). Cursed `potion_unkn` makes `dopotion` `trycall` instead of `makeknown`. Uncursed has no attr bump.

Old JS: default `"That potion is not implemented yet."` return 0 (no `useup`).

The diff **does** add the function, wire `POT_ENLIGHTENMENT` return -1, and dynamic-import the live helper (zap.js already imports potion.js). It does **not** port artifact invoke / mix. Named. It does **not** port levitation peffects. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peffect_enlightenment` | C `:794–808`, **wired** | |
| `peffects` POT_ENLIGHTENMENT | C `:1349–1350`, **wired** | return -1 |
| `potion_unkn` | C `gp.potion_unkn`, **same-file live** | cursed trycall |
| `exercise(A_WIS)` | C, **imported live** | FALSE cursed; TRUE inside helper |
| `adjattrib` | C `attrib.c:117–121`, **imported live** | msgflg 0; dunce INT/WIS abort |
| `do_enlightenment_effect` | C `:2525–2532`, **imported live** | D-1395 |
| `enlightenment` | C `invent.c` / insight, **already live** | D-1116 MAGIC overlay |
| artifact invoke | C `artifact.c`, **named omit** | |
| mix / remaining peffects | C, **named omit** | levitation / restore / invis |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** cursed `exercise(A_WIS, FALSE)` may `rn2`; uncursed helper `exercise(A_WIS, TRUE)` `rn2(19)`; blessed two `adjattrib` (dunce no die; below-min decrease uses `rn2` not this +1). Public fortress never quaffs this potion.

## C ↔ JS fidelity

Cursed: `potion_unkn++`; `pline('You have an uneasy feeling...')` matches C `You("have an uneasy feeling...")`; `exercise(A_WIS, false)`; **no** helper. Match `:797–800`. `dopotion` then trycall if dknown. Match.

Uncursed: skip adjattrib; `do_enlightenment_effect`. Match. Blessed: `adjattrib(A_INT,1,false)` then `adjattrib(A_WIS,1,false)` then helper. JS `false|0===0` is C msgflg 0 (You_feel smart/wise when ACURR actually moves). Dunce cap: live `adjattrib` constrict pline when msgflg==0 and returns false without ABASE change; helper still runs. Match `:129–132` + `:806`.

Helper is the D-1395 function already audited: MAGIC overlay, WIN_MESSAGE flush via `flush_topl_more`, “The feeling subsides.”, WIS exercise **after** (fountain case 19 exercises before — different caller, do not merge). Dynamic `import('./zap.js')` is cycle avoidance, not a stub.

`peffects` returns -1 → useup. Match `:1424`. Uncursed dknown: `!potion_unkn` → makeknown+XP. Cursed: potion_unkn → trycall, still useup. Match `dopotion`.

Hallucination check: “Match C `peffect_enlightenment`” while **`do_enlightenment_effect` is the live D-1395 export** is not a dispatch-stub lie. Do **not** stamp “Match C artifact invoke enlightenment.” Do **not** stamp “Match C mix alchemy.” Do **not** stamp “Match C `peffect_levitation`.” Do **not** stamp “cursed still shows MAGIC overlay” (C skips the helper).

## Hallucinations / overclaim

Subject says quaffing enlightenment shows MAGIC self-knowledge or a cursed uneasy feeling instead of “not implemented.” **True on the keep-path** (uncursed helper, blessed INT then WIS then helper, cursed uneasy+unkn). **False until named for artifact invoke / mix / other peffects.** D-log “uncursed MAGIC overlay + no attr bump + exercise `rn2(19)`; cursed uneasy + `rn2(2)` no helper; blessed INT then WIS +1 then helper; dunce ACURR 6 ABASE unchanged + helper; dopotion uncursed dknown makeknown+XP; cursed !dknown useup no makeknown; full healing sibling; levitation omit” are the right falsifiers. Stamping **Addressed:** D-1413 for `:794–808` is fair. This review fills archive hash `285218b2`. Do **not** treat fortress PASS as an enlightenment quaff.

## Density

One C function plus the `peffects` case and the already-ported helper. ~30 lines of JS. Playbook §2b right size (sibling of D-1395 wand, not glued into levitation). Did not rewrite `enlightenment()`. Did not glue `bhitm` WAN_MAKE_INVISIBLE (next Open).

## Branch-by-branch confirm

1. Cursed: uneasy; `potion_unkn`; WIS exercise FALSE; no helper; useup. Match.
2. Uncursed: no adjattrib; MAGIC helper; WIS exercise TRUE inside helper. Match.
3. Blessed: INT then WIS +1 (You_feel if ACURR moves) then helper. Match.
4. Dunce: constrict; ABASE unchanged; helper still. Match.
5. Uncursed dknown: makeknown+XP. Match dopotion.
6. Full-healing case unchanged. Match D-1411.
7. Levitation still unimplemented. Named.
8. Wand zapnodir enlightenment unchanged. Match D-1395.
9. **Public-unhit** unless a session quaffs enlightenment.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded overlay text. Plain ESM. Dynamic zap import is the existing cycle split.

## Verification

Journal: private canary **12**/12 (C/JS grep; uncursed MAGIC overlay + no attr bump + exercise `rn2(19)`; cursed uneasy + `rn2(2)` no helper; blessed INT then WIS +1 then helper; dunce ACURR 6 ABASE unchanged + helper; dopotion uncursed dknown makeknown+XP; cursed !dknown useup no makeknown; full healing sibling; levitation omit; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `285218b2` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.85). Fortress PASS is not a potion of enlightenment.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The function matches `:794–808` branch-for-branch; the helper is live D-1395, not a stub.

Named omits (map / Open, not Must-fix):

1. `artifact.c` invoke enlightenment
2. mix alchemy / potionhit / potionbreathe enlightenment
3. remaining peffects (DETECT_TREASURE / DETECT_MONSTERS / LEVITATION / RESTORE_ABILITY / INVISIBILITY — already Open)
4. `zap.c` `bhitm` WAN_MAKE_INVISIBLE (already next Open after this SHA)

Do not Must-fix “cursed should still run MAGIC overlay” (C skips). Do not Must-fix “adjattrib silent” (C msgflg 0 is verbose). Do not Must-fix “return 0 so the potion stays” (C `:1424` is -1). Do not Must-fix “exercise WIS before overlay” (that is fountain case 19, not this helper).

## Callers / RNG ledger

C cursed: `exercise` may `rn2(2)` (typical). Uncursed: helper `exercise(A_WIS, TRUE)` `rn2(19)`. Blessed: two adjattrib (no die on +1 unless below-min path). JS same. Public fortress never needs these dice. `dopotion` makeknown has no extra die.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: quaff enlightenment now cursed-uneasy or blessed INT/WIS then live MAGIC `do_enlightenment_effect`; artifact invoke and remaining peffects stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1413 `285218b2`.
