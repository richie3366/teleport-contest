# Review 511 — 27feb511 — mon.c monkilled trap.js clone worm_known (D-1550)

## Metadata
- Full / short hash: `27feb511d056e18ae08f39c4e5a8d3b075a536ea` / `27feb511`
- Parent: `408b613c` (locator scripts; no `js/`). This file audits **this SHA only** (second of nine `js/` commits since review **509**). Archive **Addressed:** D-1550 `27feb511`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 12:27:50 +0200
- D-id: **D-1550**
- Stats: `js/trap.js` +5 / −2. Band 150–350 (js/ insertions **5**).
- Claims to close: Must-fix review **509** item 1 (trap clone still `cansee(head)`). Not `howmonseen`. `reviews/loop-2026-08-15/` has no unpaid monkilled Must-fix.
- JS / map: `js/trap.js` local `monkilled`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **509** QUALITY-RISK. D-1548 (`9b53440e`) already matched the **export**.

## Intent vs deliverable

Git subject promises: trap deaths of a long worm use `worm_known` (any `cansee` segment), not only head `cansee`.

Pinned C `mon.c` `monkilled` `:3376–3418` (`csym` range). Sight `:3384–3385`. Callee `worm.c` `worm_known` `:882–893`. C has **one** `monkilled`. Trap callers `trap.c` rust `:1716` (`fltxt` NULL); fire `:1803` (`""`); anti-magic `:2436` (in_sight string or NULL); pit `thitm` `:6756` (`""`). JS trap clone is used at pit `thitm` `:1203`, rust iron-golem `:3112`, fire `:3757`.

```3382:3403:nethack-c/upstream/src/mon.c
    if (fltxt && (mdef->wormno ? worm_known(mdef)
                               : cansee(mdef->mx, mdef->my)))
        pline_mon(mdef, "%s is %s%s%s!", Monnam(mdef),
              nonliving(mptr) ? "destroyed" : "killed",
              *fltxt ? " by the " : "", fltxt);
    else
        iflags.sad_feeling = mdef->mtame ? TRUE : FALSE;
    gd.disintegested = (how == AD_DGST || how == -AD_RBRE
                       || (how == AD_FIRE && completelyburns(mptr)));
    if (gd.disintegested)
        mondead(mdef);
    else
        mondied(mdef);
```

Old JS trap clone: `if (cansee(mdef.mx, mdef.my))`. Export `mhitm.js` already had the ternary (D-1548). explode/region import the export.

The diff **does** change the trap clone to `mdef.wormno ? worm_known(mdef) : cansee(head)`. `worm_known` was already imported (`trap.js:127`, D-1548 canseemon clone). It **does not** import `mhitm.monkilled`, add `canseemon` clone #6, port `howmonseen` / cutworm / `pline_mon` / nonliving / pet roast / disintegested. Named in D-log + clone comment.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| trap `monkilled` sight | C `:3384–3385`, **CLONE matched this SHA** | was diverged |
| `worm_known` | C `:882`, **LIVE** | imported; not a new clone |
| `cansee` | C vision, **LIVE** | |
| `monkilled` export | C, **LIVE** | `mhitm.js` D-1548; not this SHA |
| trap `canseemon` | C `_canseemon`, **CLONE** | D-1548; untouched |
| trap `mondied`/`mondead` | C, **CLONE** thinner | not this SHA |
| `howmonseen` | C `vision.c:2162`, **OMIT named** | NOT FOUND |
| cutworm / `redraw_worm` | C, **OMIT named** | |
| `pline_mon` / nonliving / pet roast / disintegested | C `:3386–3410`, **OMIT named** | clone stays thin |

`node scripts/csym.mjs monkilled --sig` → `mon.c:3376-3418`. `--callers monkilled`: 31 refs including `trap.c:1716,1803,2436,6756`. `worm_known --sig` → `worm.c:882-893`.

`node scripts/sym.mjs monkilled worm_known cansee mondied mondead pline_mon howmonseen`:

```
monkilled        js/mhitm.js:2023   ASYNC — await required
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/trap.js:1114
worm_known       js/worm.js:268   sync
cansee           js/vision.js:860   sync
mondied          js/mhitm.js:2011   ASYNC — await required
             !! ALSO 1 LOCAL CLONE(S)  js/trap.js:1104
mondead          js/mhitm.js:1992   sync
             !! ALSO 2 LOCAL CLONE(S)  js/trap.js:1082  js/uhitm.js:482
pline_mon        js/display.js:4234   ASYNC — await required
howmonseen       NOT FOUND in js/**
```

**Re-point:** none. The trap clone **body** now matches C’s sight test; it is still the one local clone (`sym` already counted it). Do **not** add clone #2 or import `mhitm.monkilled` from trap (cycle / review **509** Keep: keep the clone, fix the ternary). `worm_known` import pre-existed; this SHA is the first trap-`monkilled` user of it.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. `FORCETRAP` in trap.js is the C trap flag, not a contest FORCE. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **No core RNG** in the sight test (C none).

## C ↔ JS fidelity

Sight. `wormno ? worm_known(mdef) : cansee(mx,my)`. Infrared is **not** in this arm (unlike `_canseemon`). Dummy head `wseg` is co-located with the head, so a lit head still counts. Tail-only `cansee` is now true. Empty `wtails` → false. **Match `:3384–3385`.** Same ternary as `mhitm.js:2025`.

`fltxt` gate. C: `if (fltxt && (sight))` — NULL `fltxt` **suppresses** the killed line (rust `:1716` already printed “falls to pieces”; anti-magic `:2437–2439` passes NULL when `!in_sight`). JS clone: `const txt = fltxt || ''` then sight **alone**. Rust `monkilled(mtmp, null, AD_RUST)` therefore still emits “is killed” when visible. **Pre-existing clone thinness; named as always-killed.** Pit/fire pass `''`, which is a non-NULL pointer in C, so those arms **do** print — **Match those callers.** Anti-magic `monkilled` is **not** in JS trap (named by absence).

Death. Clone always `mondied` (local). C `disintegested` → `mondead` for AD_DGST / `-AD_RBRE` / burning golem. JS pit nocorpse uses `-AD_PHYS` with a comment, not `-AD_RBRE`. **Named.** Verb always `"killed"` (not `nonliving` → destroyed). **Named.** `pline` not `pline_mon`. **Named.** Pet roast after lifesave. **Named.** Sad-feeling `else if (mtame)` **Match the else.**

Callee closure (sight arm this SHA). LIVE: `worm_known`, `cansee`. CLONE: trap `monkilled` sight **verified**. OMIT named: `pline_mon`, nonliving, pet roast, disintegested, `howmonseen`. STUB: none in the **sight** arm. Combined-arm: the Must-fix arm may ship. Remaining clone body is **named omit**, not an unmentioned stub inside the shipped ternary.

## Hallucinations / overclaim

Subject trap deaths use `worm_known`: **true** of the three JS trap call sites. Stamping **Addressed:** D-1550 on **509** is fair for the **sight** Must-fix only. Do **not** stamp “Match C `pline_mon`.” Do **not** stamp “Match C disintegested.” Do **not** stamp “Match C `howmonseen`.” Do **not** stamp “Match C rust NULL `fltxt` skip.” This is **not** “dispatch ported, callee stubbed” — `worm_known` is LIVE. Canary “mintrap PIT kill pline” with a constructed worm **can** see this clone (unlike D-1548’s mhitm-only canary).

## Density

+5 JS: Must-fix one ternary. Did not glue `howmonseen` / cutworm / getobj CMDQ_INT. §2b OK for Must-fix.

## Branch-by-branch confirm

1. Long worm, tail `cansee`, head dark, pit `thitm` `''`: pline. **Match C pit.**
2. Same, no segment `cansee`: silent (tame → sad_feeling). **Match.**
3. Non-worm, head `cansee`: pline. **Match.**
4. Infrared-only, `wormno` set: still false (`worm_known` is `cansee` only). **Match monkilled, not `_canseemon`.**
5. Rust iron golem, visible: C no killed line (`fltxt` NULL); JS still “is killed”. **Named thinness, not this Must-fix.**
6. Fire `''` + tail visible: pline. **Match.**

## Callers / RNG ledger

C: one function; trap plus mhitm/explode/region/zap/…. JS: export for non-trap; this clone for pit/rust/fire. Public-unhit until a session trap-kills a live long worm via a tail cell. No seed gate. No new `rn2`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `worm.js` already imported; no new cycle. Do not import `mhitm.js` from `trap.js` for this clone (trap→mhitm already for `make_corpse`; still keep one clone as **509** ordered).

## Verification

D-log canary **16**/16 (C/JS grep; trap clone ternary; tail-visible/head-dark `mintrap` PIT kill pline; non-worm dark silent / seen kill; no core RNG; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: `howmonseen`; cutworm / `redraw_worm`; trap clone `pline_mon` / nonliving verb / pet roast / disintegested `mondead`; rust/anti-magic NULL `fltxt` skip; pit nocorpse `-AD_RBRE`; anti-magic trap `monkilled` caller. Do **not** add `canseemon` clone #6.

Verdict: **ACCEPT-WITH-DEBT**
