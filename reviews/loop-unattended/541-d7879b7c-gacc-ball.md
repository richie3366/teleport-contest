# Review 541 — d7879b7c — invent.c display_pickinv gacc / BALL `'0'` (D-1580)

## Metadata
- Full / short hash: `d7879b7cb5d63c6c4f27c9d6b886658bba842db0` / `d7879b7c`
- Parent: `51d877a8` (D-1579). This file audits **this SHA only** (fifth of nine `js/` commits since review **536**). Archive **Addressed:** D-1580 `d7879b7c`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 16:27:32 +0200
- D-id: **D-1580**
- Stats: `js/invent.js` +172 / −?, `js/objects.js` +27. Band 150–350 (js/ insertions **182**).
- Claims to close: Open gacc / `'0'` ball after D-1579. Not mime_action. Not wizid PICK_ANY. `reviews/loop-2026-08-15/` has no unpaid gacc Must-fix.
- JS / map: `objects.js` `def_oc_syms`; `invent.js` collect/take/digit helpers + `let_to_name` showsym; `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **530** / **539** / **540** named gacc/`'0'`.

## Intent vs deliverable

Git subject promises: a unique BALL_CLASS `'0'` is a group accelerator when not counting instead of always starting a digit count.

Pinned C `invent.c` `display_pickinv` `:3323–3325` (`wizid ? def_oc_syms[oclass].sym : 0`). Getobj want_reply is **not** wizid (`wizard && override_ID`), so gselector is 0. `let_to_name` `:4799–4839` (`names[]` `:4789–4793`; showsym pad 8 + `"  ('%c')"`). `drawing.c` `def_oc_syms` via `defsym.h` OBJCLASS_DRAWING (BALL `'0'` idx 15). `wintty.c` `process_menu_window` collect `:1352–1379`; digits `:1564–1578` (`!counting && strchr(gacc, morc)` → `group_accel`).

```3323:3325:nethack-c/upstream/src/invent.c
                add_menu(win, &tmpglyphinfo, &any, ilet,
                         wizid ? def_oc_syms[(int) otmp->oclass].sym : 0,
                         ATR_NONE, clr, formattedobj, MENU_ITEMFLAGS_NONE);
```

```1574:1578:nethack-c/upstream/win/tty/wintty.c
            /* special case: '0' is also the default ball class */
            if (!counting && strchr(gacc, morc))
                goto group_accel;
```

Old JS: every digit `AppendLongDigit`; `let_to_name` ignored showsym; no `def_oc_syms`.

The diff **does** add `def_oc_syms`, collect/take/digit helpers, wire them into `display_pickinv_reply` (hardcoded `wizid=false`), and `let_to_name` showsym + CONTAINED_SYM / Illegal. It **does not** turn on wizid gselectors in a live menu (`display_pickinv_wizid` unid_cnt>0 still dismiss). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `def_oc_syms` | C `drawing.c`/`defsym.h`, **LIVE this SHA** | BALL `'0'` |
| `pickinv_item_gacc` | C `:3323–3325`, **LIVE this SHA** | 0 unless wizid |
| `collect_menu_gacc` | C `:1352–1379`, **LIVE this SHA** | PICK_ONE unique |
| `menu_digit_is_gacc` | C `:1577–1578`, **LIVE this SHA** | |
| `menu_take_gacc` | C `group_accel`, **LIVE this SHA** | |
| `let_to_name` showsym | C `:4799–4839`, **LIVE this SHA** | `names[]` not `.name` |
| `display_pickinv_reply` gacc | **LIVE** collect with wizid=0 | C getobj same |
| wizid unid_cnt>0 PICK_ANY | **OMIT named** | helpers unused there |
| `putmsghistory` / sortloot inuse_only | **OMIT named** | |

`node scripts/csym.mjs let_to_name` → `:4799-4839`. `--callers`: invent `:3294` (withsym), `:3493`, unpaid `:3697`, CONTAINED `:3715`; pickup; o_init. `def_char_to_objclass` → `drawing.c:90-99`. `display_pickinv` add_menu gselector `:3323–3325`.

RNG: **none** in gacc/let_to_name. `obj_glyph` Hallu burn unchanged. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
def_oc_syms          js/objects.js:79   export const
pickinv_item_gacc    js/invent.js:453   sync
collect_menu_gacc    js/invent.js:469   sync
menu_digit_is_gacc   js/invent.js:503   sync
menu_take_gacc       js/invent.js:514   sync
let_to_name          js/invent.js:421   sync
def_char_to_objclass js/objects.js:103   sync
```

`--can invent.js objects.js def_oc_syms`: ALREADY imported. Do **not** add `def_oc_syms` clone #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`def_oc_syms`. Index 0 placeholder; 1 `]` … 15 `'0'` iron balls … 17 `.` venoms. **Match `defsym.h` OBJCLASS_DRAWING `:466–484`.** `BALL_CLASS` generated **15**.

Collect. PICK_NONE empty. Count `gselector && gselector!==selector`; if `n==0` empty (gold-only `'$'==selector` does **not** fill gacc). Second pass unique; PICK_ONE requires `gcnt==1`; GOLD_SYM may equal selector. **Match `:1352–1379`.** Two balls → `'0'` not in gacc. **Match.**

Digits. `!counting && gacc.includes(ch)` then take selector; else `AppendLongDigit`. **Match `:1564–1584`.** Non-digit `group_accel` before page letters. **Match.**

Getobj pickinv. `wizid=false`; every item gselector `''`; collect returns `''`; `'0'` is a count. **Match C getobj `:3323–3325` with wizid 0.** Do not call that a miss vs the subject — C getobj never puts BALL in gacc either.

`let_to_name`. `names[]` (Comestibles / Gems/Stones / Iron balls / Illegal objects); oth CONTAINED “Bagged/Boxed items”; showsym `while (--mlen>0)` pad then `"  ('%c')"` from `def_oc_syms[oclass].sym`. **Match `:4789–4838`.** Unpaid prefix live; shop callers still rare (named). `menu_head_objsym` drives `withsym` on pickinv headings. **Match `:3294`.**

Callee closure (getobj pickinv digit arm). LIVE: collect/take/digit, `def_oc_syms`, `let_to_name`. OMIT named: wizid PICK_ANY menu that would pass nonzero gselector. STUB: **none** in the getobj arm. Not “dispatch ported, callee stubbed” for **getobj**. The wizid identify menu remains a named omit; helpers are not a silent substitute for that menu.

## Hallucinations / overclaim

Subject unique BALL `'0'` gacc vs always-count: **true of the tty helpers and of C wizid `add_menu`.** **False as a getobj screen change** — C and JS getobj still gselector 0; canary “non-wizid `'0'` is count” is the C getobj fact. Do **not** stamp “Match C `#wizidentify` PICK_ANY gacc.” Do **not** stamp “Match C `display_used_invlets`.” D-log “Getobj want_reply stays non-wizid gacc 0”: **true**, not a contradiction of this SHA.

## Density

One C pickinv/tty gacc + `def_oc_syms` + `let_to_name` showsym. +182 JS. Did not glue traditional_loot. §2b OK.

## Branch-by-branch confirm

1. Getobj `?`/`*`, one iron ball, type `'0'`: count, not select. **Match C getobj.**
2. Helper wizid + one ball: gacc `"0"`; `!counting` selects that invlet. **Match C tty + wizid add_menu.**
3. Two balls, PICK_ONE: `'0'` not unique; digit counts. **Match.**
4. Already counting, then `'0'`: digit, not gacc. **Match.**
5. `let_to_name(BALL_CLASS, false, true)`: pad + `  ('0')`. **Match.**
6. CONTAINED_SYM: Bagged/Boxed items, no showsym. **Match.**
7. Wizid unid_cnt>0: still dismiss. **Named.**

## Callers / RNG ledger

C gselector nonzero only when `display_pickinv` wizid. JS helpers exported; live menu path is getobj (0). **No RNG.** No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `def_oc_syms` one table in `objects.js`. Do not add clone #2. Do not hardcode seed coords. Getobj `wizid=false` is C, not a seed gate.

## Verification

D-log private canary **21**/21 (C gacc/`'0'` + unique vs two-ball PICK_ONE + `let_to_name` showsym + non-wizid `'0'` is count; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for wizid BALL gacc. Tourist green is not `#wizidentify` proof.

## Actionable C-wrongs

None for Must-fix. Named: wizid unid_cnt>0 PICK_ANY (the only C path that sets BALL gselector); putmsghistory; sortloot inuse_only; `display_used_invlets`; MENU_PREV/FIRST/LAST. Do not treat getobj `'0'`-as-count as a C-wrong. Do not add `def_oc_syms` #2.

Verdict: **ACCEPT-WITH-DEBT**
