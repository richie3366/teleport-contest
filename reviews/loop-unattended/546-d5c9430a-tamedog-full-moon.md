# Review 546 — d5c9430a — dog.c tamedog FULL_MOON S_DOG rn2(6) (D-1585)

## Metadata
- Full / short hash: `d5c9430acd00dba9639063a4a4bcb11b3640f11f` / `d5c9430a`
- Parent: `e3f4a4b5` (reviews 537–545). This file audits **this SHA only** (first of nine `js/` commits since review **545**). Archive **Addressed:** D-1585 `d5c9430a`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 18:23:58 +0200
- D-id: **D-1585**
- Stats: `js/dog.js` +25/−13, `js/objnam.js` +9. Band **150–350** (js/ insertions **34**).
- Claims to close: Open FULL_MOON night S_DOG `rn2(6)` after D-1546/D-1577. Not ustuck. Not `has_edog`. `reviews/loop-2026-08-15/` has no unpaid tamedog-moon Must-fix.
- JS / map: `dog.js` `tamedog`; new export `objnam.js` `Tobjnam`. `c-js-map/data.md` `src/dog.c`. `turns.md` still lists “Tobjnam stop / big_corpse catch named” (stale sibling row; not a JS C-wrong).
- Prior reviews this SHA claims to close: **507** / **538** named FULL_MOON / Tobjnam catch.

## Intent vs deliverable

Git subject promises: thrown food cannot tame a canine on a full-moon night (5/6), and already-tame catch uses `pline_mon` / `big_corpse` / `Tobjnam`.

Pinned C `dog.c` `tamedog` `:1142–1282`. Moon gate `:1176–1178`. Catch `:1199–1209`. Callee `objnam.c` `Tobjnam` `:2289–2299` (`The(xname)` then `otense`). `calendar.c` `night` `:214–220`. Setter `allmain.c` `:57` `flags.moonphase = phase_of_the_moon()`. Macro `FULL_MOON` 4 (`flag.h:81`). `S_DOG` `defsym.h:298` MONSYM idx 4. Callers `--callers tamedog`: `dothrow.c:2269` (food), plus scroll/spell/music/trap/zap sites with `obj` null after `:1150–1154`.

```1174:1178:nethack-c/upstream/src/dog.c
    mtmp->mpeaceful = 1;
    set_malign(mtmp);
    if (flags.moonphase == FULL_MOON && night() && rn2(6) && obj
        && mtmp->data->mlet == S_DOG)
        return FALSE;
```

Old JS: moon check commented; catch used `pline` + lowercase `the(xname)` + literal `stops`. No `Tobjnam` export in `objnam.js`.

The diff **does** live the short-circuit, catch `pline_mon` + `big_corpse`, and export `Tobjnam` at C home. It **does not** port ustuck `expels`/`unstuck` (`:1184–1190`) or `initedog` `has_edog` vs `!mtame`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `tamedog` FULL_MOON arm | C `:1176–1178`, **LIVE this SHA** | left-to-right `rn2(6)` |
| `tamedog` catch pline | C `:1199–1209`, **LIVE this SHA** | `pline_mon` + `big_corpse` |
| `Tobjnam` | C `:2289–2299`, **LIVE this SHA** | new export; dog imports |
| `night` | C `:214–220`, **LIVE** | import `calendar.js` |
| `FULL_MOON` | C `flag.h:81`, **LIVE** | `const.js` 4 |
| `pline_mon` / `canseemon` / `cansee` | **LIVE** | top-level; catch no longer `pline` |
| `The` / `otense` / `vtense` / `xname` / `the` | **LIVE** | `Tobjnam` body |
| `dogfood` / `dog_eat` / `place_object` | **LIVE** | pre-existing catch eat |
| `ismnum` | C `monst.h:285`, **LIVE** | |
| ustuck `expels`/`unstuck` | C `:1184–1190`, **OMIT named** | later D-1593 |
| `initedog` `has_edog` | C `:1254–1259`, **OMIT named** | |
| 7 local `Tobjnam` clones | **CLONE elsewhere** | not added here |

`node scripts/csym.mjs tamedog` → `:1142-1282`. `--callers`: dothrow `:2269`; makemon `:933`; music `:214`; potion `:2849`; read `:1057`/`:3325`; spell `:222`; timeout `:1056`; trap `:4429`; uhitm `:2143`; were `:186`; zap `:1083`. `Tobjnam` → `:2289-2299`; dog site `:1209`. `night` → `:214-220`; dog site `:1176`.

RNG: one `rn2(6)` after `FULL_MOON && night()`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
Tobjnam          js/objnam.js:1351   sync
             !! ALSO 7 LOCAL CLONE(S) in 7 files — IMPORT the export; do NOT add another
               js/detect.js:220  js/do.js:385  js/dothrow.js:1646  js/mthrowu.js:147
               js/music.js:278  js/sit.js:239  …and 1 more (js/wield.js:345)
tamedog          js/dog.js:364   ASYNC — await required
night            js/calendar.js:106   sync
FULL_MOON        js/const.js:986   sync   export const
pline_mon        js/display.js:4404   ASYNC — await required
canseemon        js/display.js:313   sync
cansee           js/vision.js:1059   sync
The              js/objnam.js:1343   sync
otense           js/objnam.js:1676   sync
xname            js/objnam.js:739   sync
the              js/objnam.js:1294   sync
dogfood          js/dogmove.js:118   sync
dog_eat          js/dogmove.js:361   ASYNC — await required
ismnum           js/const.js:2989   sync
```

`--can dog.js objnam.js Tobjnam`: ALREADY. `--can dog.js calendar.js night`: ALREADY. `--can dog.js display.js canseemon`: ALREADY. `--can dog.js display.js pline_mon`: ALREADY. Parent `objnam.js` had **no** `Tobjnam`; this is the canonical export, not clone #8. Do **not** add another.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Moon gate. `game.flags?.moonphase === FULL_MOON && night() && rn2(6) && obj && mtmp.data?.mlet === 'S_DOG'` then `return false`. **Match `:1176–1178` including left-to-right `rn2(6)` after `night()` even when `obj` is null / not a dog.** `FULL_MOON` 4. **Match `flag.h:81`.** `night()` `hour < 6 || hour > 21`. **Match `:214–220`.** Generated `mlet === 'S_DOG'` ≡ C `mlet == S_DOG` (`defsym.h:298`). Scroll/spell still nulls `obj` at `:1150–1154` **before** this gate, so magic taming never refuses here. **Match.** `rn2(6)==0` continues taming (1/6). **Match the 5/6 refuse.**

Catch. `canseemon` → `pline_mon` with `big_corpse = (otyp==CORPSE && ismnum(corpsenm) && mons[corpsenm].msize > mtmp.data.msize)` then `", or vice versa!"` else `"."`. **Match `:1201–1208`.** Else `cansee(mx,my)` → `pline("%s.", Tobjnam(obj,"stop"))`. **Match `:1208–1209`.** `Tobjnam` = `The(xname)` + space + `otense`. **Match `:2289–2299`.** `otense` → `vtense(null,"stop")` → `"stops"` for a singular thrown food. **Match.** Old `"the foo stops."` is gone.

Callee closure (FULL_MOON refuse + already-tame catch). LIVE: `night`, `rn2`, `FULL_MOON`, `canseemon`, `pline_mon`, `the`, `xname`, `Tobjnam`, `otense`, `cansee`, `ismnum`, `mons`, `place_object`, `dogfood`, `dog_eat`. OMIT named: ustuck, `has_edog` (not on these two arms). STUB: **none** on the moon/catch arms. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject 5/6 full-moon night canine refuse + catch `pline_mon`/`Tobjnam`: **true.** D-log “export `Tobjnam` from `objnam.js` (C home; 7 local clones remain)”: **true** (`sym` 7 clones). Do **not** stamp “Match C ustuck `expels`.” Do **not** stamp “Match C `has_edog`/`newedog`.” Do **not** stamp “retired the 7 `Tobjnam` clones.” Do **not** stamp “Match C `sounds.c` FULL_MOON howl.” `turns.md` still naming the catch is a **map stale**, not a live JS miss of this SHA.

## Density

One `tamedog` envelope (moon gate + the catch plines it sits next to) plus the one C callee those plines reach (`Tobjnam` at `objnam.c` home). +34 JS. C moon is three lines; catch+`Tobjnam` make the cluster. Did not glue ustuck. §2b OK (C that small + related callee).

## Branch-by-branch confirm

1. Not FULL_MOON: no `night()`, no `rn2(6)`. **Match.**
2. FULL_MOON day: `night()` false, no `rn2(6)`. **Match.**
3. FULL_MOON night: always `rn2(6)`; refuse iff nonzero and `obj` and S_DOG. **Match.**
4. Kitten / non-dog: still consumes `rn2(6)`, does not refuse. **Match.**
5. Scroll/spell: `obj` already null; never refuse. **Match.**
6. Catch `canseemon` + corpse bigger than pet: vice versa. **Match.**
7. Catch seen-tile not `canseemon`: `Tobjnam` “The … stops.” **Match.**
8. ustuck / `has_edog`. **Named.**

## Callers / RNG ledger

C `tamedog` food caller is `dothrow.c:2269`. Magic callers pass null/`sobj` (scroll class → obj null). Extra `rn2(6)` vs parent **only** on full-moon night — **intended C consume**, not a seed gate. Catch path adds no RNG.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. One `Tobjnam` at C home; dog imports it. Do not add `Tobjnam` #8. Do not import `monmove.js` `sticks` for later ustuck. Do not treat `game.flags?.` optional chaining as a missing `flags` struct (setter is `allmain.c:57`; `allmain.js` writes `game.flags.moonphase`).

## Verification

D-log private canary (day/new-moon skip `rn2(6)`; full-moon night consumes it; S_DOG refuse iff `rn2!=0`; kitten still rolls); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless a public session throws food at a canine on a recorded full-moon night. Tourist green does not prove the 5/6 refuse.

## Actionable C-wrongs

None for Must-fix. Named: ustuck `expels`/`unstuck` (`:1184–1190`, later D-1593); `initedog` `has_edog` vs `!mtame`; remaining 7 `Tobjnam` clones (detect/do/dothrow/mthrowu/music/sit/wield) plus named `Tobjnam_*` variants. Do not add `Tobjnam` in `dog.js`. Do not treat scroll-tame succeeding on a full-moon night as a miss.

Verdict: **ACCEPT-WITH-DEBT**
