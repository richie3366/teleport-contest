# Review 530 — 934f168b — invent.c display_pickinv hands/xtra_choice (D-1569)

## Metadata
- Full / short hash: `934f168be476fd7a96bcbefb7583d41f25b6c52e` / `934f168b`
- Parent: `413df120` (D-1568). This file audits **this SHA only** (third of nine `js/` commits since review **527**). Archive **Addressed:** D-1569 `934f168b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 07:35:36 +0200
- D-id: **D-1569**
- Stats: `js/invent.js` +103 / −18, `js/objnam.js` +10 / −6, `js/wield.js` +13 / −5, `js/apply.js` +6 / −3, `js/potion.js` +8 / −3. Band 150–350 (js/ insertions **140**).
- Claims to close: Open pickinv hands/xtra after D-1559 `&ctmp`. Not `&ctmp`. `reviews/loop-2026-08-15/` has no unpaid hands Must-fix.
- JS / map: `display_pickinv_reply` / `getobj_hands_txt` / `getobj_pickinv_xtra` / `xprname` txt; wield/grease/dip; `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **529** named pickinv hands/xtra.

## Intent vs deliverable

Git subject promises: getobj `?`/`*` menus offer `xtra_choice` hands (usextra n-bump, n==1 `message_menu`, Miscellaneous `'-'`) instead of a letter-only pickinv.

Pinned C `invent.c` `display_pickinv` `:3056–3417`. `usextra = (xtra_choice && allowxtra)` `:3084`. n-bump `:3137–3138`. n==1 `message_menu` `:3149–3173`. Miscellaneous + `HANDS_SYM` row `:3253–3260`. `getobj_hands_txt` `:1718–1736`. getobj handsbuf `:1976–1988`. `xprname` `:2895–2954` (`csym` misses the split signature; body is in invent.c, not objnam.c). Callers getobj `:1979`; `fingers_or_gloves(FALSE)` `:59–65` is `makeplural(body_part(FINGER))` (check_gloves false — **not** the gloves name).

```3133:3138:nethack-c/upstream/src/invent.c
    if (usextra || (n == 1 && (!lets || wizid)))
        ++n;
```

```3154:3160:nethack-c/upstream/src/invent.c
        if (usextra) {
            ret = message_menu(HANDS_SYM, PICK_ONE,
                               xprname((struct obj *) 0, xtra_choice,
                                       HANDS_SYM, TRUE, 0L, 0L)); /* '-' */
```

```1976:1981:nethack-c/upstream/src/invent.c
            if (!allowed_choices || *allowed_choices == HANDS_SYM
                || *buf == HANDS_SYM)
                handsbuf = getobj_hands_txt(word, qbuf);
            ilet = display_pickinv(allowed_choices, handsbuf,
```

Old JS: n-bump only `!lets`; no handsbuf; wield/ready/grease accepted `'-'` from yn but pickinv never offered it.

The diff **does** usextra n-bump, n==1 hands `message_menu`, sortpack Miscellaneous + `'-'` row, `getobj_hands_txt`, `getobj_pickinv_xtra` (`*` / altlets `'-'` / SUGGEST buf), `xprname` txt, `- ` prompt prefix when hands SUGGEST, wire wield/ready/grease/dip. It **does not** port force_invmenu `*`/`?` redo, mime_action, gacc/`'0'` ball, wizid, sortloot inuse_only. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `display_pickinv` usextra | C `:3084–3260`, **LIVE this SHA** | n-bump / n==1 / extra row |
| `getobj_hands_txt` | C `:1718–1736` static, **LIVE** export | grease = `fingers_or_gloves(FALSE)` inlined |
| `getobj_pickinv_xtra` | **CLONE** of `:1976–1978` | not a C function |
| `xprname` txt | C `:2895–2954`, **LIVE** | JS arg order (obj, let, dot, quan, txt) ≠ C; calls pass let then txt |
| `getobj` allownone / `- ` prefix | C `:1830–1848` + `:1976`, **LIVE** | altlets HANDS when DOWNPLAY hands |
| wield/ready/grease/dip `?`/`*` | **LIVE** via `getobj_display_pickinv` ctx | still local getobj clones, not shared `getobj` |
| `fingers_or_gloves` | **not added** | `sym` already 2 locals (eat/fountain); FALSE arm is `makeplural(FINGER)` |
| `body_part_latebound` FINGER/FINGERTIP | **LIVE** humanoid default | no wield→polyself |
| force_invmenu redo / mime_action / gacc | **OMIT named** | |

`node scripts/csym.mjs getobj_hands_txt` → `:1718-1736`. `fingers_or_gloves` → `do_wear.c:59-65`. `--callers display_pickinv`: getobj `:1979`; display_inventory `:3451`. `--callers xprname`: invent `:3159` hands; `:2888` prinv.

RNG: pickinv still burns `obj_glyph` Hallu display-RNG (pre-existing). This SHA adds **no** new `rn2`.

`node scripts/sym.mjs` on new / re-pointed names:

```
getobj_hands_txt     js/invent.js:4045   sync
getobj_pickinv_xtra  js/invent.js:4073   sync
display_pickinv_reply js/invent.js:1004  ASYNC
xprname              js/objnam.js:2435   sync
fingers_or_gloves    NOT EXPORTED — 2 LOCALS eat.js:2010 fountain.js:1008
                     => Do NOT write clone #3.
body_part_latebound  js/objnam.js:1736   sync
```

`node scripts/imports.mjs --can invent.js objnam.js xprname`: ALREADY. `--can invent.js weapon.js hands_obj`: IN-SCC; `hands_obj` TDZ if top-level. This SHA `await import('./weapon.js')` **inside** `getobj`, not at module eval.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

usextra. `xtra.choice && xtra.allow`. **Match `:3084`.**

n-bump. C `usextra || (n==1 && (!lets || wizid))`. JS `usextra || (n==1 && allowAll)` (`*` / null lets). One-letter `?` without usextra stays n==1 `message_menu` of that item. One-letter `?` **with** usextra bumps to 2 (full menu). Empty invent + usextra: n 0→1, skip “not carrying”, hands `message_menu`. One item + usextra: skip n==1, full menu + extra row. **Match `:3133–3138` + `:3149–3173` + `:3253–3260`.**

handsbuf. `*` OR lets starts with `'-'` OR prompt buf starts with `'-'`, and `allownone`. Dip DOWNPLAY: `promptHasHands` false → `?` no extra, `*` yes. Wield SUGGEST: both. **Match `:1976–1980`.**

`getobj_hands_txt`. grease “your fingers” (`FALSE` → not gauntlets). write fingertip. wield gloved/bare + “(wielded)” iff !uwep. ready “empty quiver” + “(nothing readied)” iff !uquiver. else “your hands”. **Match `:1718–1736`.** Latebound humanoid FINGER/FINGERTIP/HAND.

`xprname`. C `"%c - %.*s%s"` with let=`'-'` → **`- - your …`**. JS `` `${ilet} - ${txt}` ``. **Match.** Menu path `dot=false`; n==1 `dot=true` period. **Match.** Cost/Iu named.

Callee closure (wield `?`/`*` arm). LIVE: `display_pickinv_reply`, `message_menu`, `xprname` txt, `getobj_hands_txt`, `HANDS_SYM` → `hands_obj`. CLONE: `getobj_pickinv_xtra`. OMIT named: force_invmenu redo (`*`/`?` from menu), mime_action, gacc. STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject usextra n-bump / n==1 / Miscellaneous `'-'`: **true**. D-log “not `&ctmp`”: **true**. Do **not** stamp “Match C `fingers_or_gloves` exported” — they inlined the FALSE arm; do **not** add clone #3. Do **not** stamp “Match C force_invmenu oneloop.” Do **not** stamp “Match C shared `getobj` for wield” — wield/ready/grease/dip keep local clones, now passing xtra ctx. Do **not** stamp “Match C n==0 ‘Not carrying anything.’” (JS still “appropriate” — pre-existing, not this SHA). This is **not** “dispatch ported, callee stubbed.”

## Density

One pickinv extra-row envelope + the getobj handsbuf predicate + the four callers that already accepted `'-'`. +140 JS. Did not glue cutworm. §2b OK.

## Branch-by-branch confirm

1. Wield `?`, several weapons: Miscellaneous + `- - your bare hands` + items. **Match.**
2. Wield, empty invent, `*`: n==1 hands `message_menu`. **Match.**
3. Wield, one weapon + usextra: not n==1 of that weapon; full menu. **Match.**
4. Wield yn `'-'` (prompt `- a-c or ?*`): already `hands_obj`; unchanged.
5. Dip `?`: no extra row. **Match.**
6. Dip `*`: extra row. **Match.**
7. Grease txt “your fingers” with gloves on. **Match FALSE.**
8. Ready empty quiver “(nothing readied)”. **Match.**
9. Eat getobj: `eat_ok(null)` EXCLUDE → no usextra. **Match.**
10. `xprname` object row still `a - a dagger` (txt null). **Match.**

## Callers / RNG ledger

C getobj `:1979` is the production caller. JS shared `getobj` plus wield/ready/grease/dip clones. No new RNG. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `hands_obj` lazy inside `getobj`. Latebound body_part — no invent→polyself.

## Verification

D-log canary **28**/28 (locus + hands_txt grease/write/wield/ready/dip; xtra `?`/`*` gates; n==1 empty message_menu; one-item+usextra skips n==1; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. Public Tourist wield-`?` with empty hands is **public-unhit** unless a session opens that menu.

## Actionable C-wrongs

None for Must-fix. Named: force_invmenu redo; mime_action; gacc / `'0'` ball; sortloot inuse_only; wizid. Do not add `fingers_or_gloves` #3. Do not import `polyself.js` `body_part` from invent/wield.

Verdict: **ACCEPT-WITH-DEBT**
