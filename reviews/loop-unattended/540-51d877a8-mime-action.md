# Review 540 — 51d877a8 — invent.c mime_action typed '-' (D-1579)

## Metadata
- Full / short hash: `51d877a8068ba6a64924fe1e09bf9f09ba8df3e1` / `51d877a8`
- Parent: `c4019a30` (D-1578). This file audits **this SHA only** (fourth of nine `js/` commits since review **536**). Archive **Addressed:** D-1579 `51d877a8`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 16:08:05 +0200
- D-id: **D-1579**
- Stats: `js/invent.js` +64 / −4, `js/hacklib.js` +37, `js/hack.js`/`uhitm.js`/`timeout.js` clone deletes. Band 150–350 (js/ insertions **99**).
- Claims to close: Open mime_action after D-1578/D-1569. Not gacc. `reviews/loop-2026-08-15/` has no unpaid mime Must-fix.
- JS / map: `invent.js` `mime_action`/`getobj_typed_hands`; `hacklib.js` `ing_suffix`; `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **530** / **539** named mime_action.

## Intent vs deliverable

Git subject promises: typed `'-'` at getobj when hands are not allowed gerunds the verb (`ing_suffix`) instead of returning null silently.

Pinned C `invent.c` `mime_action` `:1677–1706` (staticfn). `" on the "` → `*bp=0`, `sfx=bp+1`. `"rub the "`+`" on"` or `"dip "`+`" into"` → `buf[3]=0`, `pfx=&buf[4]`. `" or "` → `rn2(2)` left vs `bp+4`. `You("mime %s … something …")` with `ing_suffix(bp)`. Caller `getobj` `:1955–1958` (typed HANDS_SYM; mime if `!allownone`; return hands or NULL). Pickinv `:1987–1988` returns `&hands_obj` **without** mime. Callee `hacklib.c` `ing_suffix` `:362–396`.

```1955:1958:nethack-c/upstream/src/invent.c
        if (ilet == HANDS_SYM) { /* '-' */
            if (!allownone)
                mime_action(word);
            return (allownone ? &hands_obj : (struct obj *) 0);
        }
```

```1686:1705:nethack-c/upstream/src/invent.c
    if ((bp = strstr(buf, " on the ")) != 0) {
        *bp = '\0';
        sfx = (bp + 1); /* "something <sfx>" */
    }
    ...
    You("mime %s%s%s something%s%s.", ing_suffix(bp),
        pfx ? " " : "", pfx ? pfx : "", sfx ? " " : "", sfx ? sfx : "");
```

Old JS: `if (!allownone) return null; // mime_action named`. `ing_suffix` clones in hack/uhitm/timeout.

The diff **does** live `mime_action` + `getobj_typed_hands` on `getobj`/`getobj_adjust`, canonical `ing_suffix` in `hacklib.js`, retire three clones. It **does not** mime on pickinv `'-'`; JS pickinv `!allownone` still returns null (C returns `hands_obj`). Named. Clone getobj verbs (apply/drink/…) still not wired.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mime_action` | C `:1677–1706`, **LIVE this SHA** | export; C staticfn |
| `getobj_typed_hands` | C `:1955–1958`, **LIVE this SHA** | one local |
| `ing_suffix` | C `:362–396`, **LIVE this SHA** | hacklib home; clones deleted |
| `rn2(2)` | **LIVE** | `" or "` arm |
| `You` / `pline` | **LIVE** | `You mime …` |
| pickinv `'-'` mime | C none | C returns `hands_obj`; JS null if `!allownone` **named** |
| clone getobj typed `'-'` | **OMIT named** | apply still `return hands_obj` / no mime |

`node scripts/csym.mjs mime_action` → `:1677-1706`. `--callers`: proto `:23`; getobj `:1957` only. `ing_suffix` → `:362-396`; `--callers`: invent `:1704`; hack `:1913`; timeout `:1121`; uhitm `:546`; nhlua; artifact comment.

RNG: `rn2(2)` **only** when the (possibly already split) buf still contains `" or "`. CVC/`ie`/`e` paths burn none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
mime_action        js/invent.js:4439   ASYNC
ing_suffix         js/hacklib.js:109   sync
getobj_typed_hands NOT EXPORTED — 1 LOCAL js/invent.js:4471
  => Do NOT write clone #2.
rn2                js/rng.js:61   sync
```

`--can invent.js|hack.js|uhitm.js|timeout.js hacklib.js ing_suffix`: ALREADY imported (this SHA added the edges). No TDZ. Do **not** restore `ing_suffix` clone #2 in hack/uhitm/timeout.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`mime_action`. Copy word. `" on the "` truncates at the match; `sfx` is `bp+1` (`"on the …"`, leading space dropped; `You` re-inserts a space). **Match `:1686–1689`.** Then `"rub the "`+inner `" on"` or `"dip "`+`" into"`: keep first three chars, `pfx` from index 4 (`"the …"` / `" <foo> into"`). **Match `:1690–1696`.** Then `" or "`: `rn2(2)` truthy → left, 0 → rest after `" or "`. **Match `:1697–1701`.** `pline(\`You mime ${ing_suffix(bp)}…something…\`)` ≡ C `You("mime …")`. **Match `:1704–1705`.** `strncmp`/`strstr` are case-sensitive; JS `startsWith`/`includes` match that. Order is on-the then rub/dip then or — **same as C** (or sees the already-truncated buf).

`ing_suffix`. Trailing `" on"`/`" off"`/`" with"` via `strcmpi` then last-space split; `er` no-op; CVC double last cons; `ie`→`y`; trailing `e` strip; `ing` + saved tail. JS lowercases the suffix tests. **Match `:362–396`.** Trailing-`e` in C is `== 'e'` (case-sensitive); JS lowercases — not a public verb issue.

Typed `'-'`. `getobj`/`getobj_adjust`: mime if `!allownone`, return hands or null. **Match `:1955–1958`.** Pickinv `'-'`: still no mime (C). JS `!allownone` → null vs C `hands_obj`. **Named leftover**, not introduced as a new stub inside mime.

Callee closure (typed `'-'` arm). LIVE: `mime_action`, `ing_suffix`, `rn2`, `pline`. OMIT named: none **inside** mime. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.” Clone #2 of `ing_suffix` retired.

## Hallucinations / overclaim

Subject typed `'-'` gerund instead of silent null: **true for live `getobj` / `getobj_adjust`.** Do **not** stamp “Match C pickinv `'-'` returns `hands_obj` when `!allownone`.” Do **not** stamp “Match C mime on apply/drink/write clone `'-'`.” Do **not** stamp “Match C `You()` as a `zap.js` clone.” `ing_suffix` one home: **true** (hack/uhitm/timeout locals gone).

## Density

One C `mime_action` + its getobj caller + the `ing_suffix` callee they need. +99 JS (net clone deletes). Did not glue gacc. §2b OK.

## Branch-by-branch confirm

1. Typed `'-'`, `!allownone`, word `"eat"`: `You mime eating something.` **Match.**
2. `"rub on the stone"`: sfx `"on the stone"`; rubbing something on the stone. **Match.**
3. `"rub the royal jelly on"`: pfx `"the royal jelly on"`; rubbing the royal jelly on something. **Match.**
4. `"dip foo into"`: buf `"dip"`, pfx from `[4]`. **Match.**
5. `"foo or bar"`, `rn2(2)==1`: fooing something. **Match.** `rn2==0`: baring/bar. **Match.**
6. `allownone` typed `'-'`: no mime, return `hands_obj`. **Match.**
7. Pickinv `'-'`: no mime. **Match C skip.** JS null vs C `hands_obj` when `!allownone`. **Named.**
8. `ing_suffix("step")` → stepping (CVC). **Match.** `"grease"` → greasing. **Match.**

## Callers / RNG ledger

C `mime_action`: **only** getobj typed HANDS. JS same two sites (`getobj`, `getobj_adjust`). Extra `rn2(2)` only on `" or "` words. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `ing_suffix` at the C home (`hacklib.js`). Do not add clone #2. `mime_action` in `invent.js` (C home). Do not import `wield.js`→`polyself.js` for `body_part`.

## Verification

D-log private canary **20**/20 (C splits + `ing_suffix` + mime strings + `rn2(2)` + typed `'-'` vs allownone hands; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless a session types `'-'` on a no-hands getobj. Tourist green is not mime proof.

## Actionable C-wrongs

None for Must-fix. Named: pickinv `'-'` + `!allownone` still null (C `hands_obj`); clone getobj typed `'-'` (apply/drink/write/name); gacc/`'0'`; putmsghistory. Do not add `ing_suffix` #2. Do not mime on pickinv (C does not).

Verdict: **ACCEPT-WITH-DEBT**
