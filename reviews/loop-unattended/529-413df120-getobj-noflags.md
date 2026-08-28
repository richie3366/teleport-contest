# Review 529 — 413df120 — invent.c getobj eat/read/zap/tin NOFLAGS (D-1568)

## Metadata
- Full / short hash: `413df12014551e2035fa9f122ed891b9ec868266` / `413df120`
- Parent: `b2827fe2` (D-1567). This file audits **this SHA only** (second of nine `js/` commits since review **527**). Archive **Addressed:** D-1568 `413df120`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 07:18:57 +0200
- D-id: **D-1568**
- Stats: `js/invent.js` +159 / −0, `js/eat.js` +29 / −210, `js/read.js` +14 / −68, `js/zap.js` +7 / −64. Band 150–350 (js/ insertions **209**).
- Claims to close: Open eat/read/zap/tin NOFLAGS after D-1561/D-1563. Not ALLOWCNT. `reviews/loop-2026-08-15/` has no unpaid getobj-NOFLAGS Must-fix.
- JS / map: `invent.js` `getobj`; eat/read/zap callbacks; `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **528** named eat/read/zap/tin NOFLAGS.

## Intent vs deliverable

Git subject promises: eat/read/zap/tin use NOFLAGS (read GETOBJ_PROMPT), empty-return, digit reject, and eat_ok/`getobj_else` instead of per-verb clones.

Pinned C `invent.c` `getobj` `:1751–2089`. Callers this SHA: eat.c `floorfood` `:3712–3716` + `use_tin_opener` `:3121`; read.c `doread` `:358`; zap.c `dozap` `:2638`. Callbacks `eat_ok` `:3516–3534`, `tin_ok` `:3560–3573`, `tinopen_ok` `:3087–3094`, `read_ok` `:314–324`, `zap_ok` `:2617–2623`. `getobj_else` is eat.c file state (`++` on floor `'n'` `:3704`; clear `:3729`). Flags `hack.h:1439–1441` NOFLAGS 0 / ALLOWCNT 1 / PROMPT 2. Ranks `hack.h:511–538` EXCLUDE −3 … SUGGEST 2.

```1911:1921:nethack-c/upstream/src/invent.c
    if (suggested == 0 && !forceprompt && !allownone) {
        You("don't have anything %sto %s.", inaccess ? "else " : "", word);
        return (struct obj *) 0;
    }
```

```3516:3534:nethack-c/upstream/src/eat.c
    if (!obj)
        return getobj_else ? GETOBJ_EXCLUDE_NONINVENT : GETOBJ_EXCLUDE;
    if (is_edible(obj))
        return GETOBJ_SUGGEST;
    if (obj->oclass == COIN_CLASS)
        return GETOBJ_EXCLUDE;
    return GETOBJ_EXCLUDE_SELECTABLE;
```

Old JS: eat compactify clone (seed1800 comment); zap/read always `[*]` via nhgetch; eat `?` Never mind; tin KEY-only cmdq; tinopen “cannot open that”; no eat_ok ranks / `getobj_else`.

The diff **does** add shared `getobj` (cmdq D-1551/D-1563, digit `getobj_take_count`, pickinv `&ctmp` D-1559, empty-return, PROMPT `[*]`), wire eat/read/zap/tinopen, port the five callbacks, increment `getobj_else` on floor `'n'`. It **does not** port force_invmenu, mime_action, `getobj_hands_txt`, full `silly_thing` (Amulet), doread cookie/shirt, sacrifice `offer_ok`. Named. Deletes the seed1800 compactify comment.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `getobj` | C `:1751–2089`, **LIVE this SHA** | first shared export |
| `eat_ok` / `tin_ok` / `tinopen_ok` | C eat.c, **LIVE** at C home | one local each |
| `read_ok` / `zap_ok` | C read/zap, **LIVE** at C home | |
| `getobj_else` | C eat.c static, **LIVE** | `let` in eat.js; `sym` does not list lets |
| `getobj_from_cmdq` / `getobj_take_count` / `getobj_display_pickinv` / `getobj_apply_count` | **LIVE** pre-existing | INT abort when !ALLOWCNT |
| `getobj_eat` / `getobj_tin` / `getobj_tinopen` | **deleted** | |
| `getobj_read` / `getobj_zap` | **wrappers** → `getobj` | not second bodies |
| `silly_thing` | C `:2093–2131`, **CLONE** one-line | Amulet named |
| force_invmenu / mime_action / hands txt / `offer_ok` / doread shirt | **OMIT named** | |
| GETOBJ rank **numbers** in `const.js` | **pre-existing drift** vs C −3..2 | this SHA compares **names** from the same file |

`node scripts/csym.mjs getobj` → `invent.c:1751-2089`. `--callers`: 50+ sites; this SHA only eat/read/zap/tin. `eat_ok` `:3516-3534`; `tin_ok` `:3560-3573`; `tinopen_ok` `:3087-3094`; `read_ok` `:314-324`; `zap_ok` `:2617-2623`. `floorfood` `:3578-3731`. `silly_thing` `:2093-2131` (getobj `:2072`).

RNG: **none** added. Floor ynq unchanged.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
getobj           js/invent.js:4207   ASYNC
eat_ok           NOT EXPORTED — 1 LOCAL js/eat.js:861
tin_ok           NOT EXPORTED — 1 LOCAL js/eat.js:3277
tinopen_ok       NOT EXPORTED — 1 LOCAL js/eat.js:3333
read_ok          NOT EXPORTED — 1 LOCAL js/read.js:167
zap_ok           NOT EXPORTED — 1 LOCAL js/zap.js:2302
getobj_eat / getobj_tin / getobj_tinopen  NOT FOUND (deleted)
getobj_read      wrapper js/read.js:178
getobj_zap       wrapper js/zap.js:2347
```

`node scripts/imports.mjs --can` eat/read/zap → invent `getobj`: ALREADY. `--can invent.js weapon.js hands_obj`: IN-SCC, `hands_obj` TDZ-HAZARD **if** top-level; this SHA reads it only inside `getobj` via dynamic `import()` when `allownone`. Eat/zap `obj_ok(null)` is EXCLUDE — that import is dead for these verbs.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / recorded coordinates. The only `seed1800` hit is a **deleted** comment. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Empty NOFLAGS. `suggested==0 && !forceprompt && !allownone` → “anything [else] to WORD”. Zap no wands: old clone prompted `[*]`; now early-return. **Match `:1911–1914`.** Eat no food: same. **Match.**

PROMPT. `read_ok` DOWNPLAY sets `forceprompt`; flag GETOBJ_PROMPT also. No scrolls still `[*]`. **Match `:358` + DOWNPLAY `:1891–1895`.** `?` with empty SUGGEST uses altlets. **Match `:1968–1969`.**

`getobj_else`. Floor `'n'` increments; `eat_ok`/`tin_ok`(null) → EXCLUDE_NONINVENT; `inaccess++`; “anything else to eat/tin”; clear after getobj. **Match `:3704` / `:3729`.**

Ranks. Gold eat EXCLUDE → “cannot eat gold” (`C <= EXCLUDE` ≡ `==` because −3 is min). Non-food SELECTABLE → return to doeat “cannot eat that”. **Match.** Shirt read DOWNPLAY → getobj **returns** it (old clone silly’d inside getobj). doread still sillys non-scroll (**named** cookie/shirt). Player-visible shirt text is still not C; getobj rank is.

Digit. !ALLOWCNT → “No count allowed” retry. **Match `:1937–1941`.** CMDQ_INT without ALLOWCNT clears canned, null. **Match `:1813–1817`.**

Callee closure (these four verbs). LIVE: `getobj`, five `*_ok`, `getobj_else`, cmdq/count/pickinv helpers, `yn_function`. CLONE: silly one-liner. OMIT named: force_invmenu, mime_action, hands txt, `offer_ok`, doread shirt/cookie, Amulet silly. STUB: **none** in the empty/digit/PROMPT arms. Not “dispatch ported, callee stubbed” for NOFLAGS empty-return.

Residual: C records CQ_REPEAT **then** `silly_thing` (`:2049–2073`). JS `getobj_finish_pick` sillys EXCLUDE **before** `getobj_apply_count` (REPEAT). Zap a potion: C queues REPEAT then silly; JS silly only. Not the claimed empty/PROMPT path. Not Must-fix this iter.

## Hallucinations / overclaim

Subject NOFLAGS + read PROMPT + empty-return + digit + eat_ok/`getobj_else`: **true**. D-log “not ALLOWCNT”: **true**. Do **not** stamp “Match C `doread` shirt/cookie.” Do **not** stamp “Match C `silly_thing` Amulet.” Do **not** stamp “Match C GETOBJ rank integers in `const.js`” (EXCLUDE is 0 vs C −3; **names** match inside this cluster). Do **not** stamp “Match C throw/wield `getobj`” — those callers were not moved. This is **not** “dispatch ported, callee stubbed” for the four verbs’ empty/PROMPT loops.

## Density

One C `getobj` + the four Open callers’ callbacks. +209 / net clone deletion. Did not glue pickinv hands. §2b OK.

## Branch-by-branch confirm

1. Zap, no wands: no prompt. **Match.**
2. Zap, wands: `[lets or ?*]`. **Match.**
3. Read, no books: `[*]` (PROMPT). **Match.**
4. Read, shirt letter: getobj returns DOWNPLAY; doread silly. **getobj Match; doread named.**
5. Eat, no food, no floor n: “anything to eat.” **Match.**
6. Eat, floor n then empty pack: “anything else to eat.” **Match.**
7. Eat gold `$`: cannot eat gold. **Match.**
8. Eat rock: SELECTABLE → doeat cannot eat that. **Match.**
9. Digit on eat: No count allowed, retry. **Match.**
10. Tinopen non-tin: silly (old “cannot open that” was the clone). **Match C getobj.**

## Callers / RNG ledger

C many getobj sites remain on other JS clones (apply/wield/throw/stash). This SHA only eat/read/zap/tin. No new RNG. No seed gate (seed1800 comment **removed**).

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `hands_obj` not a top-level TDZ read.

## Verification

D-log canary **22**/22 (flags + empty NOFLAGS no-key + read PROMPT waits + digit + DOWNPLAY + gold EXCLUDE + CMDQ_INT abort + KEY); green+strict seed8000/0900; cohort **7**/7 + strict (seed1800 eat, seed2200 zap-read). Empty-zap / `getobj_else` “else” remain **public-unhit** unless those sessions decline floor food with an empty pack.

## Actionable C-wrongs

None for Must-fix. Named: pickinv hands/xtra; force_invmenu redo; mime_action; gacc; `offer_ok`; doread cookie/shirt; `silly_thing` Amulet. Do not write eat_ok #2. Do not “fix” `const.js` rank integers in this cluster without migrating every clone (apply.js still has local −3).

Verdict: **ACCEPT-WITH-DEBT**
