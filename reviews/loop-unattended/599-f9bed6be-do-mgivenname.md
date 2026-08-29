# Review 599 — f9bed6be — do_name.c do_mgivenname / alreadynamed (D-1638)

## Metadata
- Full / short hash: `f9bed6be33e188d497ddbe887cb7d79a472a1ed9` / `f9bed6be`
- Parent: `f4cae40b` (D-1637). This file audits **this SHA only** (ninth of nine `js/` commits since review **590**). Archive **Addressed:** D-1638 (this review commit fills `f9bed6be` if the DONE row still lacks the short hash).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 08:44:42 +0200
- D-id: **D-1638**
- Stats: `js/do_name.js` +182/−8, `js/hacklib.js` +47, `js/display.js` +17, `js/apply.js` +5, `js/fountain.js` +3, `js/monsters.js` +3. Band **150–350** (js/ insertions **249** <250; id >454 → **200-floor**).
- Claims to close: Open `do_mgivenname` after D-1637. Not `'o'`/`rename_disco`. Not `lookup_novel`. `reviews/loop-2026-08-15/` has no unpaid do_mgivenname Must-fix.
- JS / map: `do_name.js` `do_mgivenname` / `alreadynamed`; `hacklib.js` `fuzzymatch`; `display.js` `glyph_is_swallow_at`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named `do_mgivenname` after D-0069/D-1555/D-1624 (`name_from_player` already live).

## Intent vs deliverable

Git subject promises: `docallcmd` `'m'` names a visible monster (`alreadynamed` / `christen_monst`) instead of returning after D-1637.

Pinned C `do_name.c` `do_mgivenname` `:198–282` (`node scripts/csym.mjs do_mgivenname`). `--callers do_mgivenname`: `do_name.c:564` (`docallcmd` `case 'm'`). Callee `alreadynamed` `:155–195` (`--callers alreadynamed`: `:266`, `:271`, `:277` — the three reject arms). `hacklib.c` `fuzzymatch` `:783–808` (`--callers fuzzymatch` includes `do_name.c:170–179`). `distant_monnam` `:1168–1186`. `name_from_player` `:103–128` (already D-1624). `christen_monst` `:131–152`. `apply.c` `beautiful` `:995–1013`. `display.h` `glyph_is_swallow`. `docallcmd` `:498–601`.

```198:217:nethack-c/upstream/src/do_name.c
    if (Hallucination) {
        You("would never recognize it anyway.");
        return;
    }
    cc.x = u.ux;
    cc.y = u.uy;
    if (getpos(&cc, FALSE, "the monster you want to name") < 0
        || !isok(cc.x, cc.y))
        return;
    ...
    if (u_at(cx, cy)) {
        if (u.usteed && canspotmon(u.usteed)) {
            mtmp = u.usteed;
        } else {
            pline("This %s creature is called %s and cannot be renamed.",
                  beautiful(), svp.plname);
```

Old JS: `'m'`/`'C'` returned; `name_from_player`/`christen_monst` already live. The diff **does** wire `'m'`/`'C'` to `do_mgivenname`, port `alreadynamed`, export C-home `fuzzymatch`, swallow `disp_kind` analogue, export `beautiful`/`mhe`. It **does not** port astral high-cleric `distant_monnam`, `cmdq_pop`, lootabc letters, `'o'`/`rename_disco`, `lookup_novel`, or christen leash `update_inventory`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `do_mgivenname` | C `:198–282`, **CLONE** (C `staticfn`) | `do_name.js:470`; one clone; body matches |
| `alreadynamed` | C `:155–195`, **CLONE** | `do_name.js:419`; callers the three reject arms |
| `fuzzymatch` | C hacklib.c `:783–808`, **LIVE this SHA** | C-home `hacklib.js:161`; artifact.js/readobjnam.js still clones #2/#3 — **do not add #4** |
| `strstri` | C hacklib.c, **LIVE** | used by alreadynamed |
| `glyph_is_swallow_at` | C `glyph_is_swallow(glyph_at)`, **CLONE** | `disp_kind==='swallow'`; no integer glyph ids |
| `distant_monnam` | C `:1168–1186`, **LIVE** (astral **OMIT named**) | JS `x_monnam` only |
| `name_from_player` | C `:103–128`, **LIVE** | D-1624; EDIT_GETLIN off |
| `christen_monst` | C `:131–152`, **LIVE** | leash `update_inventory` **OMIT named** |
| `beautiful` | C apply.c `:995–1013`, **LIVE this SHA** | export apply.js |
| `mhe` / `mhis` | C you.h, **LIVE this SHA** | export fountain.js (`mhe` still cloned in steed/vault) |
| `has_ebones` / `type_is_pname` | C, **LIVE** | type_is_pname also cloned in insight.js |
| `docallcmd` `'m'`/`'C'` | C `:563–565`, **LIVE this SHA** | `'C'` is C group accelerator for `a_char='m'` |
| `cmdq_pop` / lootabc | **OMIT named** | |
| `'o'` / `rename_disco` | **OMIT named** | JS still returns |
| astral `distant_monnam` | **OMIT named** | |

`node scripts/csym.mjs do_mgivenname` → `do_name.c:198-282`. `alreadynamed` → `do_name.c:155-195`. `fuzzymatch` → `hacklib.c:783-808`. `name_from_player` → `do_name.c:103-128`. `christen_monst` → `do_name.c:131-152`. `beautiful` → `apply.c:995-1013`. `distant_monnam` → `do_name.c:1168-1186`. `docallcmd` → `do_name.c:498-601`. `--callers do_mgivenname`: `:564`. `--callers alreadynamed`: `:266/:271/:277`.

RNG: `do_mgivenname` / `alreadynamed` / `fuzzymatch` have none. `beautiful` uses CHA, not `rn2`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
do_mgivenname    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_name.js:470
alreadynamed     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_name.js:419
fuzzymatch       js/hacklib.js:161   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/artifact.js:721  js/readobjnam.js:177
strstri          js/hacklib.js:205   sync
glyph_is_swallow_at js/display.js:764   sync
distant_monnam   js/do_name.js:682   sync
name_from_player NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_name.js:211
christen_monst   js/do_name.js:402   sync
beautiful        js/apply.js:596   sync
mhe              js/fountain.js:529   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/steed.js:807  js/vault.js:112
has_ebones       js/const.js:2963   sync
type_is_pname    js/do_name.js:574   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/insight.js:579
has_mgivenname   js/const.js:2981   sync
MGIVENNAME       js/const.js:2980   sync
sensemon         js/display.js:422   sync
see_with_infrared js/display.js:657   sync
canspotmon       js/display.js:551   sync
```

This SHA **imports** `fuzzymatch` (does not add clone #4). `--can do_name.js hacklib.js fuzzymatch` → ALREADY. `--can do_name.js display.js glyph_is_swallow_at` → ALREADY. `--can do_name.js apply.js beautiful` → ALREADY. `--can do_name.js fountain.js mhe` → ALREADY. Static, not TDZ. Do not write `fuzzymatch` #4.

## C ↔ JS fidelity

`do_mgivenname` branch order matches C `:207–281`: Hallu refuse (`You would never recognize it anyway.` ≡ `You(...)`); `getpos` FALSE + `isok`; `u_at` → steed if `canspotmon` else `beautiful()` + `plname` cannot-rename; else `m_at`; swallow if `!mtmp && u.uswallow` and swallow glyph; visibility unless `do_swallow`; `distant_monnam` ARTICLE_THE prompt; `name_from_player`; then G_UNIQ&&!priest / talking shk / priest|minion|shk|ghost|ebones `alreadynamed` else `christen_monst`. JS `helpless` is `msleeping || !mcanmove` ≡ C `monst.h:251` macro. `msound <= MS_ANIMAL` imported. See_invisible H||E flats analogue. `M_AP_*` via `m_ap_type & M_AP_TYPMASK`. **Match.**

Swallow. C `glyph_at` then `glyph_is_swallow` (integer glyph range). JS has no glyph ids; `swallowed()` stores `disp_kind==='swallow'` on the 3×3 stomach cells. `glyph_is_swallow_at` is the verified analogue, not a no-op: a true swallow cell names `u.ustuck`. **CLONE matched here.**

`alreadynamed`. Empty usrbuf: keep name vs title (`has_mgivenname || type_is_pname || isshk`); rider `"its"` else `mhis`. Fuzzy: `fuzzymatch(usrbuf, monnambuf, " -_", TRUE)` or `"the "`+4 or `strstri("invisible ")+10` or `strstri(" of ")+4`. Rider already-called-that vs `upstart(mhe)` + monnambuf. Juiblex: C `data == &mons[PM_JUIBLEX]` pointer; JS `mndx === PM_JUIBLEX` because `mons()` is a fresh object (named workaround, same test). `strcmpi(..., "Jubilex")` ≡ `toLowerCase()==='jubilex'`. **Match.**

`fuzzymatch` C `:783–808`: skip `ignore_chars`, optional `lowc`, match iff both exhausted. JS index walk + ASCII `lowc` (A–Z only, as C `lowc`). **Match call-for-call** with alreadynamed’s `" -_"` + caseblind.

`beautiful` CHA ladder 25/19/16/14/11/9/6/4 + `poly_gender()==1` beautiful/winsome vs handsome/amiable. JS `acurr(A_CHA)` ≡ `ACURR`. **Match.**

`docallcmd` C `select_menu` returns `a_char='m'` even when the player hits group accel `'C'`. JS key-loop (pre-existing) therefore accepts both `'m'` and `'C'`. That is windowport analogue, not a second C function. `'o'`/`'n'`/`'d'`/`'\\'` still return — **named**, not a stub inside the `'m'` arm.

Callee closure (`'m'` arm). LIVE: `getpos`, `isok`, `u_at`, `m_at`, `canspotmon`, `sensemon`, `cansee`, `see_with_infrared`, `name_from_player`, `christen_monst`, `distant_monnam` (non-astral), `beautiful`, `fuzzymatch`, `strstri`, `has_ebones`, `type_is_pname`, `verbalize`, `upstart`, `mhe`/`mhis`. CLONE: `do_mgivenname`, `alreadynamed`, `glyph_is_swallow_at`. OMIT named: astral conceal, `SetVoice` SND_LIB, leash `update_inventory`, `cmdq_pop`, lootabc. STUB: none in the `'m'` arm. Combined-arm ships. `'o'`/`rename_disco` is a **different** `docallcmd` case (Open row).

Diff grep: no FORCE / DIAG / getRngLog / fastforward / seed names / hardcoded coords. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## Hallucinations / overclaim

Subject `'m'`/`'C'` → `do_mgivenname` + `alreadynamed` / `christen_monst`: **true.** C-home `fuzzymatch`: **true** (existing clones remain). Swallow `disp_kind`: **true and named as analogue.** Do **not** stamp “Match C astral high-cleric `distant_monnam`.” Do **not** stamp “Match C `cmdq_pop` / lootabc.” Do **not** stamp “Match C `'o'`/`rename_disco`.” Do **not** stamp “Match C `lookup_novel`.” Do **not** stamp “Match C christen leash `update_inventory`.” Do **not** stamp “Match C integer `glyph_is_swallow`.” Public `#name`/`C` monster is **public-unhit** on tourist fortress.

## Density

+249: C `do_mgivenname` 85 + `alreadynamed` 41 + `fuzzymatch` 26 plus swallow analogue + `beautiful` export. §2b one monster-name family. Did not glue `'o'` or `lookup_novel`. Above a one-`if` peel.

## Verification

Wired: Hallu refuse; getpos cancel; self/steed; swallow cell; visibility miss; G_UNIQ/shk/ghost reject; christen else; fuzzymatch unit; Juiblex mndx. Unwired C: astral conceal; cmdq; `'o'`. Conf: no `rn2` in this SHA. No seed gate.

D-log fuzzymatch unit; module load; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for `#name` monster. Fortress does not prove `alreadynamed` fuzzy tails.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): astral high-cleric `distant_monnam`; `cmdq_pop`; lootabc letters; `'o'`/`rename_disco`; `lookup_novel`; christen leash `update_inventory`; EDIT_GETLIN. Do not add `fuzzymatch` #4 (import hacklib). Do not add `mhe` #3. Do not add `do_mgivenname` #2. Do not treat `'C'`-only as a miss when `a_char` is `'m'`. Do not re-port `name_from_player` (D-1624).

Verdict: **ACCEPT-WITH-DEBT**
