# Review 539 — c4019a30 — invent.c getobj force_invmenu `*`/`?` redo (D-1578)

## Metadata
- Full / short hash: `c4019a303b7cf80c0575296571fcdfbae99bb16f` / `c4019a30`
- Parent: `38c61b34` (D-1577). This file audits **this SHA only** (third of nine `js/` commits since review **536**). Archive **Addressed:** D-1578 `c4019a30`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 15:55:26 +0200
- D-id: **D-1578**
- Stats: `js/invent.js` +207 / −50, `js/apply.js` +43 / −?, `js/potion.js` +26, `js/write.js` +14, `js/do_name.js` +13. Band 150–350 (js/ insertions **230**).
- Claims to close: Open force_invmenu `*`/`?` redo after D-1569. Not mime_action. Not gacc. `reviews/loop-2026-08-15/` has no unpaid force_invmenu Must-fix.
- JS / map: `invent.js` `getobj`/`display_pickinv_reply`/`getobj_display_pickinv`; apply/potion/write/do_name clones; `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **530** named force_invmenu `*`/`?` redo.

## Intent vs deliverable

Git subject promises: `?`/`*` inventory pickinv can redo between likely candidates and everything instead of yn_function-only.

Pinned C `invent.c` `getobj` `:1922–2001` (`iflags.force_invmenu` skip `yn_function`; auto `?` if `*lets||*altlets` else `*`; `putmsghistory`; `oneloop`; empty pickinv + oneloop → NULL; `redo_menu` when pickinv returns `*`/`?`; `menuquery` only when force). `display_pickinv` `:3345–3366` (Special heading + `*` `(list everything)` or `?` `(list likely candidates)`; `inv_cnt(TRUE)`; `end_menu` query). Empty `lets` becomes NULL `:3086–3087`. n==1 `message_menu` skipped when force `:3149`.

```1922:1929:nethack-c/upstream/src/invent.c
        } else if (iflags.force_invmenu) {
            /* don't overwrite a possible quitchars */
            if (!oneloop)
                ilet = (*lets || *altlets) ? '?' : '*';
            if (!msggiven)
                putmsghistory(qbuf, FALSE);
            msggiven = TRUE;
            oneloop = TRUE;
```

```3349:3365:nethack-c/upstream/src/invent.c
    if (iflags.force_invmenu && want_reply) {
        ...
        if ((allowxtra && !usextra)
            || (lets && (int) strlen(lets) < inv_cnt(TRUE))) {
            any.a_char = '*';
            menutext = "(list everything)";
        } else if (!lets) {
            any.a_char = '?';
            menutext = "(list likely candidates)";
        }
```

Old JS: getobj always `yn_function`; pickinv had no Special rows; a menu `*`/`?` did not reopen the other filter.

The diff **does** auto `?`/`*` + oneloop on live `getobj`/`getobj_adjust`, Special rows + query prepend, `getobj_display_pickinv` redo loop, and re-point apply/potion/write/do_name `?`/`*` through that helper. It **does not** port `putmsghistory`, mime_action, gacc/`'0'`, clone skip-yn auto-open (apply/drink/write/name/drop/throw/wield/stash still `nhgetch` then `?`). Named in the D-log.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `getobj` force skip yn / auto / oneloop | C `:1922–1931` / `:1983–1984`, **LIVE this SHA** | `invent.js` `getobj` |
| `getobj_adjust` same | C same function, **CLONE** of getobj | local; do not add #2 |
| `getobj_display_pickinv` redo | C `:1960` `goto redo_menu`, **LIVE this SHA** | inner `*`/`?` loop |
| `force_invmenu_special` | C `:3345–3366`, **LIVE this SHA** | |
| `display_pickinv_reply` Special + query | C `:3349` + `end_menu`, **LIVE this SHA** | |
| `getobj_force_invmenu_ch` | C `:1926`, **LIVE this SHA** | |
| `yn_function` | **LIVE** | non-force path unchanged |
| `inv_cnt(TRUE)` | C `hack.c:4495`, **CLONE** as `invent.length` | gold included |
| `putmsghistory` | C `:1927`, **OMIT named** | |
| clone getobj skip yn | **OMIT named** (D-log) | still prompt then `?` |
| mime_action / gacc / sortloot inuse_only | **OMIT named** | |

`node scripts/csym.mjs getobj` → `:1751-2089`. `--callers display_pickinv`: proto `:29`; getobj `:1979`; `display_inventory` `:3451`/`:3458`. `inv_cnt` → `hack.c:4495-4507`; Special uses `inv_cnt(TRUE)` `:3354`.

RNG: **none** in the force/Special/redo path. `obj_glyph` still `rn2_on_display_rng` on listed items (pre-existing; redo lists a second time as C does). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
getobj_force_invmenu_ch js/invent.js:1124   sync
force_invmenu_special   js/invent.js:1138   sync
getobj_display_pickinv  js/invent.js:4341   ASYNC
display_pickinv_reply   js/invent.js:1181   ASYNC
getobj                  js/invent.js:4496   ASYNC
getobj_adjust           NOT EXPORTED — 1 LOCAL js/invent.js:4681
  => Do NOT write clone #2.
putmsghistory           NOT FOUND in js/**
inv_cnt                 js/steal.js:48   sync  (+ hack.js local)
```

`--can apply.js|potion.js|write.js|do_name.js invent.js getobj_display_pickinv`: ALREADY statically imported (this SHA added the named imports on write/do_name/potion). No TDZ. Do **not** add a second `getobj_display_pickinv` body in those files.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Force first letter. `!oneloop` then `lets||altlets ? '?' : '*'`; `oneloop=true`; skip `yn_function`. **Match `:1922–1931` except `putmsghistory` (named).** Empty pickinv + oneloop → NULL; without force, Space/Return re-prompts. **Match `:1982–1985`.** `getobj_adjust` repeats that clone. **Match the shared C function for adjust.**

Redo. `display_pickinv` returns `*`/`?` → `goto redo_menu` without re-assigning the auto letter. JS helper `for(;;)` continues on `*`/`?`, recomputes handsbuf/`lets` from the **current** letter (`*` → NULL/`'*'`). C empty `lets` → 0 (`:3086–3087`) is full invent; JS `allowed||'*'` is the same. **Match `:1960–1995`.** `menuquery` only when force. **Match `:1972–1975`.** Query prepend blank+prompt. **Match tty_end_menu intent.**

Special. Flag + want_reply. `allowxtra && !usextra` **or** `lets && strlen(lets) < inv_cnt(TRUE)` → `*` “(list everything)”; else `!lets` → `?` “(list likely)”; else no row. JS `lets==='*'` treated as empty (C NULL). `invent.length` ≡ `inv_cnt(TRUE)` (incl. gold). Text `* - (list everything)` matches xprname/`%c - %s` item rows; painter does not double the selector. **Match `:3345–3366`.** n==1 `message_menu` skipped when force. **Match `:3149`.**

Callee closure (live `getobj` force + `?`/`*` arm). LIVE: `getobj_force_invmenu_ch`, `display_pickinv_reply`, `force_invmenu_special`, `getobj_pickinv_xtra`, `getobj_pickinv_ctmp`, `yn_function` (non-force). OMIT named: `putmsghistory`. STUB: **none** in that arm. Combined-arm may ship for **live getobj**. Apply/potion/write/do_name clones call the redo helper (LIVE) but **still `nhgetch` the first letter** — diverging clones, named in the D-log as clone auto-open yn, not a silent stub inside `getobj`.

## Hallucinations / overclaim

Subject redo `*`/`?` instead of yn-only: **true for `invent.js` `getobj` / `getobj_adjust` and for clone `?`/`*` after the user types that letter.** Do **not** stamp “Match C force_invmenu skip yn on apply/drink/write/name/drop/throw/wield/stash.” Those clones still prompt. Do **not** stamp “Match C `putmsghistory`.” Do **not** stamp “Match C mime_action.” Do **not** stamp “Match C gacc.” Map row “getobj skip yn auto `?`/`*`” is the shared function, not every JS getobj clone.

## Density

One C getobj/display_pickinv force envelope + clone `?`/`*` re-point. +230 JS. Did not glue mime_action/gacc. §2b OK (same `file.c:function` family).

## Branch-by-branch confirm

1. Force on, SUGGEST letters: auto `?`, likely menu + Special `*` if `strlen < inv_cnt`. **Match.**
2. Force on, no letters/altlets: auto `*`, full menu + Special `?`. **Match.**
3. Pick Special `*` then `?`: redo without yn. **Match.**
4. Pickinv cancel, oneloop: return NULL (no yn retry). **Match.**
5. Force off: `yn_function` then `?`/`*` still redo via helper. **Match** non-force getobj.
6. n==1 + force: full menu, not `message_menu`. **Match.**
7. `allowxtra && !usextra`: Special `*` even if lets lists everyone. **Match.**
8. Apply clone, force on: still `nhgetch` query first. **Named clone miss, not this live arm.**

## Callers / RNG ledger

C `display_pickinv` from getobj `:1979` and `display_inventory` (want_reply false → no Special). JS Special only in `display_pickinv_reply` (getobj path). **No core RNG** in the new rows. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Helpers live in `invent.js` (C home). Clones import `getobj_display_pickinv` rather than a second redo loop. Do not add `getobj_adjust` #2. Do not invent `putmsghistory` in scored `js/` this review.

## Verification

D-log private canary **21**/21 (C Special conditions + auto ilet; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless a session sets `force_invmenu`. Tourist green is not force-menu proof.

## Actionable C-wrongs

None for Must-fix. Named: `putmsghistory`; clone skip-yn auto-open (apply/potion/write/do_name/drop/throw/wield/stash); mime_action; gacc/`'0'`; sortloot inuse_only; wizid unid_cnt>0; menu_requested n==1 prefix. Do not add `inv_cnt` clone #3 in `invent.js` (`invent.length` matches `inv_cnt(TRUE)` here). Do not skip painting spaces.

Verdict: **ACCEPT-WITH-DEBT**
