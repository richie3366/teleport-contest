# Review 383 — 1200fdb0 — youprop.h See_invisible in knowninvisible (D-1423)

## Metadata
- Full / short hash: `1200fdb0643917956a2fc39c172afc116bc80934` / `1200fdb0`
- Parent: `f4d8c87e` (docs-only review D-1414–D-1422 queued this Must-fix). This file audits **this SHA only** (first of nine `js/` commits since review **382**). Archive **Addressed:** D-1423 `1200fdb0` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 00:15:05 +0200
- D-id: **D-1423**
- Stats: 12 files, +248 / −224 — `js/zap.js` +26 / −4 (`knowninvisible` only).
- Claims to close: Must-fix from review **374** on D-1414 (`knowninvisible` conferral `See_invisible`). Not WAN_SLOW. `reviews/loop-2026-08-15/` has no unpaid See_invisible Must-fix.
- JS / map: `zap.js` `knowninvisible`. `c-js-map/turns.md` + `debt.md`. `canseemon` sticky `u.See_invisible`; worm `see_wsegs`; `map_invisible` epilogue; zap_updown / zap_steed wrappers; WAN_SLOW still named at this SHA.
- Prior reviews this SHA claims to close: **374** QUALITY-RISK Must-fix (conferral ring-of-SI took vanish, no `learnwand`).

## Intent vs deliverable

Git subject promises: “Match C youprop.h See_invisible in knowninvisible so a conferral ring of see invisible takes the transparent+learnwand arm, not vanish.”

C `youprop.h` `:150–152` / `:188–190`:

```
#define HSee_invisible u.uprops[SEE_INVIS].intrinsic
#define ESee_invisible u.uprops[SEE_INVIS].extrinsic
#define See_invisible (HSee_invisible || ESee_invisible)
#define Detect_monsters (HDetect_monsters || EDetect_monsters)
```

Caller is still `display.h` `_knowninvisible` `:146–151`, used only from `zap.c` `bhitm` WAN_MAKE_INVISIBLE `:358` (`!oldinvis && knowninvisible(mtmp)` → transparent + `learn_it`). `confer_oc_oprop` (`do_wear.js:262–290`) writes ring-of-see-invisible **only** to `uprops[SEE_INVIS].extrinsic` (no `ESee_invisible` mirror). `timeout.js` `See_invisible()` `:602–608` already ORs those uprops. Review **374** required this helper to do the same and **not** rewrite `canseemon` unless vanish honesty demanded it.

Old JS (D-1414): sticky/`H`/`E` only. Conferral-only SI failed `knowninvisible`, took vanish, skipped `learnwand`.

The diff **does** OR `uprops[SEE_INVIS]` / `DETECT_MONSTERS` intrinsic+extrinsic. It **does not** rewrite `canseemon` / `confer_oc_oprop` / WAN_SLOW. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `knowninvisible` | C `_knowninvisible`, **clone now matching youprop storage** | was D-1414 C-wrong |
| `See_invisible` | C `youprop.h:152`, **wired via uprops** | H\|\|E ≡ `uprops[SEE_INVIS]` |
| `Detect_monsters` | C `youprop.h:190`, **wired via uprops** | same shape |
| `timeout.js` `See_invisible()` | C, **imported pattern, not a stub** | this SHA copies that OR |
| `canseemon` / `mon_visible` | C `display.h`, **named omit** | still sticky `u.See_invisible` |
| `confer_oc_oprop` | C `worn.c` setworn, **not rewritten** | still no ESee_invisible mirror |
| WAN_MAKE_INVISIBLE case | C `:348–368`, **unchanged body** | still live `mon_set_minvis` |
| WAN_SLOW / locking / probing | C siblings, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none. `learnwand` on the conferral-SI transparent arm may `exercise(A_WIS)` — that is C, not extra dice.

## C ↔ JS fidelity

D-1414 branch order is unchanged: `oldinvis` / `couldsee` before `seemimic` / `Monnam` / `mon_set_minvis(FALSE)`; transparent iff `!oldinvis && knowninvisible`; else vanish iff `couldsee && !canseemon`. This SHA only changes the predicate inside the clone.

`See_invisible` now: `(u.HSee_invisible \| ESee_invisible \| sticky u.See_invisible \| uprops[SEE_INVIS].intrinsic \| .extrinsic)`. C is exactly `uprops[SEE_INVIS].intrinsic \|\| .extrinsic`. Dual-storage flats/sticky are extra-true, not extra-false. Conferral-only ring now matches C: `knowninvisible` true → `" turns transparent!"` + `learnwand`. Vanish is not taken. Match `:358–362`. Same for conferral `DETECT_MONSTERS` (`youprop.h:190`).

Telepathy arm unchanged: `!Blinded_for_invis()` then `HTelepat & ~INTRINSIC` and `dx²+dy² <= BOLT_LIM²`. C uses `!Blind` and `mdistu`. Still the D-1414 geometry. No new miss.

`canseemon` / `display.js` `mon_visible` still tests sticky `u.See_invisible` only (`display.js:249`). After conferral SI, post-minvis `canseemon` stays false. Review **374** allowed skipping that rewrite because transparent **short-circuits** vanish. Already-minvis + conferral SI: C `couldsee` true then `!canseemon` false → silent; JS `couldsee` false → silent. Same outcome. Vanish-with-learn is still C-false (C learns only on transparent). Named omit, not a leftover Must-fix on **this** SHA’s keep-path.

Hallucination check: “Match C `youprop.h` See_invisible in `knowninvisible`” while the helper now ORs the same uprops `timeout.js` already used is **not** a dispatch-stub lie. The WAN_MAKE_INVISIBLE **callee** `mon_set_minvis` was already live in D-1414. “Match C `canseemon` / `confer_oc_oprop` ESee_invisible mirror” **would** be an overclaim. Do **not** stamp “Match C `see_wsegs`.” Do **not** stamp “Match C WAN_SLOW.”

## Hallucinations / overclaim

Subject says a conferral ring of see invisible takes the transparent+`learnwand` arm, not vanish. **True** for conferral-only `uprops[SEE_INVIS].extrinsic` (Wizard-kit ring) and for conferral `DETECT_MONSTERS`. **True** that timeout/`H`/`E`/sticky SI still learns (pre-existing). **False until named for `canseemon` sticky bits** (other callers). Stamping **Addressed:** D-1423 for review **374**’s Must-fix is fair. Do **not** treat fortress PASS as a conferral-SI make-invisible zap.

## Density

One helper predicate, ~10 lines of JS, one C-wrong family. Playbook §2b Must-fix peel. Did not glue WAN_SLOW. Right size.

## Branch-by-branch confirm

1. Conferral ring-of-SI only, was visible: C and JS `" turns transparent!"` + `learnwand`. **Match (the D-1414 miss).**
2. Conferral `DETECT_MONSTERS` only, was visible: same transparent+learn. Match.
3. Sticky/`H`/`E` SI: still transparent+learn. Match.
4. No SI / no detect: vanish, no learn. Match.
5. Already `minvis`: skip transparent; both silent on conferral SI (see fidelity). Match outcome.
6. `invis_blkd`: `!minvis` → `knowninvisible` false; vanish needs `couldsee && !canseemon`. Unchanged callee. Match D-1414.
7. `canseemon` sticky still wrong for display. Named; not this keep-path.
8. WAN_SLOW still default at this SHA. Named.
9. **Public-unhit** unless a session zaps make-invisible at a monster while wearing conferral SI.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded overlay. Plain ESM. The fix is C `youprop.h` storage, not a trace index.

## Verification

Journal: private canary **13**/13 (C macros; JS uprops OR; conferral SI transparent+learn; conferral detect transparent+learn; vanish still no learn; sticky SI still learns; already minvis silent; invis_blkd; WAN_SPEED still a case; WAN_SLOW still default; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not a conferral-SI make-invisible zap.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The review **374** conferral-SI transparent+learn gap is closed. `knowninvisible` is still a clone, but it no longer contradicts C `See_invisible` / `Detect_monsters` storage.

Named omits (map / Open, not Must-fix):

1. `display.js` `canseemon` / `mon_visible` sticky `u.See_invisible` (no uprops OR)
2. `worn.c` `see_wsegs` after `mon_set_minvis`
3. `bhitm` `map_invisible` epilogue (`reveal_invis`)
4. `zap_updown` / `zap_steed` WAN_MAKE_INVISIBLE wrappers
5. `bhitm` WAN_SLOW / WAN_LOCKING / WAN_PROBING (already Open after this SHA)

Do not Must-fix “vanish should learnwand” (C learns only on transparent). Do not Must-fix “`confer_oc_oprop` must mirror `ESee_invisible`” (C has no second store; uprops **are** E). Do not Must-fix “dispatch is a stub” (`mon_set_minvis` is live).

## Callers / RNG ledger

Sole caller: `bhitm` WAN_MAKE_INVISIBLE. No new `rn2`/`d`. Conferral SI now takes the C `learnwand` → possible `exercise(A_WIS)` `rn2(19)` that D-1414 skipped. Public fortress never needs these.

Verdict: **ACCEPT-WITH-DEBT**
