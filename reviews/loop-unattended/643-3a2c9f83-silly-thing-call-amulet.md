# Review 643 — 3a2c9f83 — invent.c silly_thing Call Amulet (D-1682)

## Metadata
- Full / short hash: `3a2c9f8363b777e0b23f0124b1b994da328750b9` / `3a2c9f83`
- Parent: `86cefef1` (D-1681). This file audits **this SHA only** (eighth of nine `js/` commits since review **635**). Archive **Addressed:** D-1682 `3a2c9f83`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 20:52:06 +0200
- D-id: **D-1682**
- Stats: `js/invent.js` +37/−7; `js/do_name.js` +7/−2; `js/do_wear.js` +6/−3; `js/const.js` +1/−0. Total `js/` insertions **51** <250. Band **150–350**.
- Claims to close: Open Call Amulet / unknown-fake `silly_thing` after D-1681 live `'i'` getobj. Not `'i'` getobj itself. Not wield `restrict_name`. `reviews/loop-2026-08-15/` has no unpaid `silly_thing` Must-fix.
- JS / map: `invent.js` `silly_thing` / `getobj_finish_pick`; `const.js` `silly_thing_to`; `do_wear.js` `canwearobj` noisy else; `do_name.js` comments only. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **642** named Call Amulet. **636** named `'i'` clone (closed D-1681).

## Intent vs deliverable

Git subject promises: Calling the Amulet of Yendor (or an unknown fake) uses the C Amulet pline, and `docallcmd` keeps the `#if 0` EXCLUDE arm compiled out, instead of a generic silly-thing message after D-1681.

Pinned C `silly_thing` `:2093–2131` (`node scripts/csym.mjs silly_thing`). `--callers`: `do_wear.c:2194`; `invent.c:2072`; `extern.h:1390`. `getobj` EXCLUDE `:2071–2073`. `canwearobj` else `:2189–2194`. `docallcmd` `#if 0` `:581–585`. `silly_thing_to` `decl.c:43`. `objtyp_is_callable` Yendor comment `:435–444`.

```2123:2130:nethack-c/upstream/src/invent.c
    if (!strcmp(word, "call")
        && (otmp->otyp == AMULET_OF_YENDOR
            || (otmp->otyp == FAKE_AMULET_OF_YENDOR && !otmp->known)))
        pline_The("Amulet doesn't like being called names.");
    else
        pline(silly_thing_to, word);
```

```2189:2195:nethack-c/upstream/src/do_wear.c
    } else {
        /* getobj can't do this after setting its allow_all flag; ... */
        if (noisy)
            silly_thing("wear", otmp);
        err++;
    }
```

Old JS: `getobj_finish_pick` inlined `That is a silly thing to ${word}.`; no Amulet arm; `canwearobj` noisy else `You can't wear that.`; `docallcmd` already skipped `#if 0`. The diff **does** export `silly_thing`, `silly_thing_to`, Amulet/`!known` fake, generic else, `getobj_finish_pick` call, `canwearobj` `await silly_thing('wear', otmp)`, comments that `#if 0` stays out. It **does not** port `#ifdef OBSOLETE_HANDLING` (pinned C compiled out). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `silly_thing` | C `:2093–2131`, **LIVE this SHA** | export async; Amulet + generic |
| `silly_thing_to` | C `decl.c:43`, **LIVE this SHA** | const.js string |
| `getobj` EXCLUDE | C `:2071–2073`, **LIVE this SHA** | via `getobj_finish_pick` |
| `canwearobj` else | C `:2189–2194`, **LIVE this SHA** | was generic “can't wear” |
| `#if 0` know-those | C `:581–585`, **OMIT** (compiled out) | comments only; correct |
| `OBSOLETE_HANDLING` | C `:2097–2122`, **OMIT** (compiled out) | P/R vs W/T |
| `pline_The` | C formatter | JS inlines `"The Amulet…"`; `sym.mjs` NOT FOUND — do not add a `pline_The` clone |
| `objtyp_is_callable` | C `:428–463`, **LIVE** (not rewritten) | EXCLUDE is why getobj sees the Amulet |

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
silly_thing      js/invent.js:6413   ASYNC — await required
silly_thing_to   js/const.js:417   sync   export const
canwearobj       js/do_wear.js:1674   ASYNC — await required
getobj_finish_pick NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/invent.js:6430
             => Do NOT write clone #2.
pline_The        NOT FOUND in js/** (no export, no local function/const).
             Do not add a local clone.
```

`--can do_wear.js invent.js silly_thing`: **ALREADY** (`makeknown` / `ggetobj` already imported invent.js). New `silly_thing` is a hoisted `async function`. Do **not** add `silly_thing` clone #2 in do_wear. Do **not** add `pline_The`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**Amulet arm.** C `!strcmp(word,"call")` and (`AMULET_OF_YENDOR` or (`FAKE_AMULET_OF_YENDOR` && `!known`)). Known fakes fall through to generic (C comment `:2124–2125`). JS `word === 'call'` and the same otyp/`!otmp.known`. C `pline_The("Amulet doesn't…")` prints `The Amulet doesn't like being called names.` JS `pline` of that full string. **Match `:2123–2129` output.** Do **not** stamp “imported `pline_The`.”

**Generic else.** C `pline(silly_thing_to, word)` with `decl.c:43` `"That is a silly thing to %s."`. JS `silly_thing_to.replace('%s', word)`. **Match `:2130`** for the words this function sees (`call`, `wear`). `read.c:559` still inlines the format — not this SHA.

**`#ifdef OBSOLETE_HANDLING`.** Pinned C does not define it; the P/R vs W/T block is compiled out. JS has no `s1`/`Use the 'P' command` arm. **Match the pin.** Do **not** port the ifdef.

**`getobj` EXCLUDE.** C after the letter loop `:2071–2073` `silly_thing` then NULL (gold “cannot WORD gold” is earlier `:2012–2018`). JS `getobj_finish_pick` gold first then `silly_thing`. **Match.** `call_ok` EXCLUDEs Yendor amulets (`objtyp_is_callable` `:443–444` break/FALSE), so `'o'` getobj never returns the object to `docallcmd` — the `#if 0` `You("know those as well")` cannot run even if someone uncommented it after a live EXCLUDE return. Keeping it compiled out is **C**.

**`docallcmd`.** Diff is comments + a comment in the `else` of `!dknown`. The `#if 0` arm is still absent. **Match compiled C `:581–585`.** Do **not** add that You() as live JS.

**`canwearobj` noisy else.** C `:2193–2194` `silly_thing("wear", otmp)` then `err++`. JS the same (was `You can't wear that.`). Word `"wear"` is not `"call"`, so this always takes the generic `silly_thing_to` arm. **Match `:2189–2195`.** Helmet/shield/boots/gloves/shirt/cloak/suit arms were not rewritten.

Callee closure. LIVE: `silly_thing`, `silly_thing_to`, `pline` (Amulet text), `getobj_finish_pick` EXCLUDE, `canwearobj` else. CLONE: Amulet string stands in for `pline_The` (verified output). OMIT: `OBSOLETE_HANDLING`; `#if 0` EXCLUDE. STUB: **none** in the live Amulet / generic / wear-else arms. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject “C Amulet pline” / “`#if 0` compiled out”: **true**. Do **not** stamp “Match C `OBSOLETE_HANDLING` Use the 'P' command.” Do **not** stamp “ported `pline_The`.” Do **not** stamp “`docallcmd` now handles EXCLUDE” (getobj never returns it). Private canary (Call real Amulet / unknown fake / known fake generic / wear else) is the right split. Public-unhit for Call on the Amulet.

## Density

+51: one `silly_thing` family + the C caller in `canwearobj` + documenting compiled-out `#if 0`. §2b. Did not glue wield `restrict_name` or `OBSOLETE_HANDLING`.

## Verification

Wired: Call Amulet / unknown fake; generic else; getobj EXCLUDE; canwearobj wear-else. Unwired C: ifdef P/R. Conf: no RNG. No seed gate.

Journal: private canary; green+strict seed8000/0900; cohort **9**/9 + strict. Cadence **#2090** at HEAD: **44**/44.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `OBSOLETE_HANDLING`; no JS `pline_The` (do not add). Do **not** uncomment `#if 0` in `docallcmd`. Do **not** restore `You can't wear that.` on the canwearobj else. Do **not** add `silly_thing` clone #2. Do **not** re-port live `'i'` getobj (D-1681). Do **not** in-line the generic string again inside `getobj_finish_pick`.

Verdict: **ACCEPT-WITH-DEBT**
