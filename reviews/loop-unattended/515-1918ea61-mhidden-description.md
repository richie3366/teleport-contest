# Review 515 — 1918ea61 — pager.c mhidden_description mimic/hider/region (D-1554)

## Metadata
- Full / short hash: `1918ea61d978835aa628b62781e96ca2991e1576` / `1918ea61`
- Parent: `9ed46432` (D-1553). This file audits **this SHA only** (sixth of nine `js/` commits since review **509**). Archive **Addressed:** D-1554 `1918ea61`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 13:31:38 +0200
- D-id: **D-1554**
- Stats: 4 JS files, +248 / −38 (`pager.js` +188, `uhitm.js` +36, `insight.js` +13, `makemon.js` +11). Band 150–350 (js/ insertions **248**).
- Claims to close: Open `mhidden_description` (named from D-1547 / D-1544 / review **508**). Not `namefloorobj`. `reviews/loop-2026-08-15/` has no unpaid mhidden Must-fix.
- JS / map: `pager.js` `mhidden_description`; callers insight/makemon/uhitm. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **508** named `mhidden_description`; **505** named look suffixes.

## Intent vs deliverable

Git subject promises: look/appear/probe/flash append mimic/hider/region suffixes instead of omitting them.

Pinned C `pager.c` `mhidden_description` `:184–280` (`csym` 97 lines). Flags `hack.h` MHID_*. Callers `self_lookat` `:124` PREFIX|ARTICLE|REGION; `look_at_monster` `:482` same; `insight.c` `mstatusline` `:3319` PREFIX|ARTICLE|ALTMON|REGION; `makemon.c` appear `:1487` ARTICLE|ALTMON; `uhitm.c` `flash_hits_mon` `:6361` ALTMON.

```205:251:nethack-c/upstream/src/pager.c
    if (M_AP_TYPE(mon) == M_AP_FURNITURE
        || M_AP_TYPE(mon) == M_AP_OBJECT) {
        if (incl_prefix) Strcpy(outbuf, ", mimicking ");
        if (M_AP_TYPE(mon) == M_AP_FURNITURE) {
            what = defsyms[mon->mappearance].explanation;
            if (incl_article) what = an(what);
            Strcat(outbuf, what);
        } else if (M_AP_TYPE(mon) == M_AP_OBJECT && glyph_is_object(glyph)) {
            /* objfrommap: object_from_map + simpleonames + optional an */
        } else {
            Strcat(outbuf, something);
        }
    } else if (M_AP_TYPE(mon) == M_AP_MONSTER) {
        if (show_altmon) {
            if (incl_prefix) Strcat(outbuf, ", masquerading as ");
            what = pmname(&mons[mon->mappearance], Mgender(mon));
            if (incl_prefix) what = an(what); /* PREFIX, not ARTICLE */
```

Old JS: function absent; look/appear/probe/flash skipped the suffix.

The diff **does** port the suffix (furniture `defsyms` explanation; object via `object_from_map` when otyp≥0; altmon `pmname` with PREFIX-gated `an`; hiding under / ceiling_hider inline / eel pool; region poison/vapor), wire the five callers, export `defsym_explanation`, dynamic-bind pager from `flash_hits_mon`. It **does not** port `namefloorobj`, `surface()` ice/pool/altar/swallow, `howmonseen`, steed/utrap, `set_msg_xy`, integer `glyph_is_cmap`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhidden_description` | C `:184`, **LIVE this SHA** | returns suffix string |
| `hidden_objfrommap` | C `objfrommap` label, **LIVE this SHA** | |
| `object_from_map` | C `:284`, **LIVE** | D-1524 |
| `defsym_explanation` | C `defsyms[].explanation`, **LIVE this SHA** | exported; was local |
| `ceiling_hider` | C `mondata.h:43`, **CLONE inline** | no clone #4 |
| `visible_region_at` | C region, **LIVE** | |
| `flash_hits_mon` glyph pline | C `:6361–6372`, **LIVE this SHA** | disp_ch/kind stand-in |
| `makemon_appear_msg` mimic | C `:1486–1488`, **LIVE this SHA** | |
| `mstatusline` hide | C `:3317–3321`, **LIVE this SHA** | mx,my not bhitpos |
| `self_lookat` / `look_at_monster_buf` | C `:124` / `:482`, **LIVE this SHA** | |
| `namefloorobj` | C `do_name.c`, **OMIT named** | |
| `surface()` | C dungeon, **OMIT named** | trapper “floor” |
| `dealloc_obj` | C `:227–228`, **OMIT named** | `OBJ_FREE` + GC |
| `howmonseen` | C, **OMIT named** | |

`node scripts/csym.mjs mhidden_description` → `pager.c:184-280`. `--callers`: insight `:3319`; makemon `:1487`; pager `:124`, `:482`; uhitm `:6361`.

`node scripts/sym.mjs mhidden_description object_from_map defsym_explanation flash_hits_mon makemon_appear_msg mstatusline ceiling_hider visible_region_at simpleonames`:

```
mhidden_description js/pager.js:808   sync
object_from_map  js/pager.js:656   sync
defsym_explanation js/uhitm.js:2434   sync
flash_hits_mon   js/uhitm.js:2586   ASYNC — await required
makemon_appear_msg js/makemon.js:2476   ASYNC — await required
mstatusline      js/insight.js:851   ASYNC — await required
ceiling_hider    NOT EXPORTED — 3 LOCAL js/engrave.js:284 js/mon.js:2677 js/music.js:140
             => Do NOT write clone #4
visible_region_at js/region.js:79   sync
simpleonames     js/objnam.js:1923   sync
             !! ALSO 3 LOCAL CLONE(S)
```

**Re-point:** `defsym_explanation` local → **export** (pager already needed it; this SHA adds the import). uhitm `object_from_map` dynamic import **extended** to `mhidden_description` (`pager_bind`). Do **not** statically import pager from uhitm (pager→uhitm `mon_at`). Do **not** add `ceiling_hider` clone #4 (inlined at the C site). `simpleonames` imported, not clone #4.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **No core RNG** (C none).

## C ↔ JS fidelity

Flags. PREFIX/ARTICLE/ALTMON/REGION bits match `const.js` 1/2/4/8. **Match hack.h.**

Furniture. `defsym_explanation(mappearance)` + optional `an`. PREFIX copies `", mimicking "`. **Match `:208–214`.**

Object. C `glyph_is_object(glyph)` then `object_from_map`. JS `gtyp>=0` from memory otyp (`hero_memory && !isyou`) or `glyph_to_obj_at` (gbuf). **Match the memory-vs-gbuf split C uses on one glyph id** (D-1547 Keep: displayed mon wins). `simpleonames`; `an` if ARTICLE and quan==1. fakeobj `OBJ_FREE`. **Match objfrommap except dealloc.** No object glyph → `"something"`. **Match.**

Altmon. `pmname(mappearance, female?FEMALE:MALE)` ≡ C `Mgender`. **`an` follows PREFIX, not ARTICLE** — **Match `:236–240`** (C quirk). No PREFIX (makemon/flash): name without “masquerading as”. **Match.**

Hiding. `isyou ? u.uundetected : mundetected`. Under: objfrommap or something. Hider: ceiling if `(is_clinger && mlet!=='S_MIMIC')||is_flyer` else floor. **Match `ceiling_hider` inner; `surface()` named.** Eel + `is_pool`: murky water. **Match.**

Region. `visible_region_at`; `dist2 <= r*(r+1)` with `r = xray_range>1 ? xray : 1`; or `force_region`. Poison tag `'S_poisoncloud'` vs C `glyph_to_cmap==S_poisoncloud`. **Named string vs integer cmap; same production tag.** Worm-tail coords still mx,my (C FIXME). **Named.** insight uses mx,my not `gb.bhitpos`. **Named.**

Callers. self_lookat gate `uundetected || (Upolyd && U_AP_TYPE) || region` + flags. **Match `:122–126`.** look_at_monster `mundetected || M_AP_TYPE || region`. **Match `:481–483`.** mstatusline unmasked `m_ap_type` (C, not `M_AP_TYPE`). **Match `:3317`.** makemon unsensed furniture/object: ARTICLE|ALTMON + upstart. **Match `:1486–1488`.** flash: ALTMON, wakeup, pline if display changed. **Match control flow;** glyph id → `disp_ch`/`disp_kind`. **Named stand-in.**

Callee closure. LIVE: `object_from_map`, `simpleonames`, `an`, `defsym_explanation`, `pmname`, `hides_under`/`is_hider`/`is_clinger`/`is_flyer`, `is_pool`, `visible_region_at`, `glyph_to_obj_at`. CLONE: `ceiling_hider` inline verified. OMIT named: `surface`, `dealloc_obj`, `namefloorobj`, `howmonseen`. STUB: **none.** Combined-arm: the function may ship.

## Hallucinations / overclaim

Subject look/appear/probe/flash suffixes: **true** of those five callers. Stamping **Addressed:** D-1554 is fair for **508’s** named omit. Do **not** stamp “Match C `namefloorobj`.” Do **not** stamp “Match C `surface()`.” Do **not** stamp “Match C integer `glyph_at` in flash.” Do **not** stamp “Match C `howmonseen`.” This is **not** “dispatch ported, callee stubbed” — `object_from_map` is LIVE (D-1524). Altmon article-on-PREFIX is C, not a JS bug.

## Density

+248 JS: one C function + every caller. Did not glue `namefloorobj`. §2b OK (under 250-ins ceiling).

## Branch-by-branch confirm

1. Furniture + PREFIX+ARTICLE: `, mimicking an altar`. **Match.**
2. Object, memory otyp, ARTICLE: `an` + simpleonames. **Match.**
3. Object, no otyp: `something`. **Match.**
4. Altmon + PREFIX: `, masquerading as a fox` (`an` despite no ARTICLE). **Match C.**
5. Altmon, makemon (no PREFIX): `An altar appear` after upstart. **Match.**
6. Hider under object glyph. **Match.**
7. Trapper: `on the floor`. **Named vs `surface()`.**
8. Lurker: `on the ceiling`. **Match ceiling_hider.**
9. Region adjacent / MHID_REGION: poison vs vapor. **Match tag.**
10. Flash glyph change: “That … is really …”. **Match if disp changes.**

## Callers / RNG ledger

C: lookat, probe, appear, flash, self. JS the same. Public-unhit until a session looks at a mimic/hider/cloud. No seed gate. No new `rn2`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. uhitm→pager is dynamic (pager→uhitm already). makemon→pager is a new static import; pager does not import makemon. `node scripts/imports.mjs --can makemon.js pager.js mhidden_description` is not a TDZ read at top-level of pager.

## Verification

D-log canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: `namefloorobj`; `surface()` ice/pool/altar/swallow; long-worm tail look coords; `gb.bhitpos` region; integer cmap region; flash `glyph_at` vs `disp_ch`; `set_msg_xy`; steed/utrap; `howmonseen`; `dealloc_obj`. Do **not** add `ceiling_hider` clone #4.

Verdict: **ACCEPT-WITH-DEBT**
