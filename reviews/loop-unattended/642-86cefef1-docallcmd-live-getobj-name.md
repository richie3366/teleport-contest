# Review 642 — 86cefef1 — do_name.c docallcmd live getobj("name") (D-1681)

## Metadata
- Full / short hash: `86cefef145b70b0776b226e7c932681ea376f4f0` / `86cefef1`
- Parent: `c8309c01` (D-1680). This file audits **this SHA only** (seventh of nine `js/` commits since review **635**). Archive **Addressed:** D-1681 `86cefef1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 20:38:40 +0200
- D-id: **D-1681**
- Stats: `js/do_name.js` +18/−95; `js/iactions.js` +3/−13. Total `js/` insertions **21** <250. Band **150–350**.
- Claims to close: Open `'i'` live `getobj("name")` after D-1675 canned KEY on the `getobj_name` clone. Not Call Amulet `silly_thing` (D-1682). Not wield `restrict_name`. `reviews/loop-2026-08-15/` has no unpaid `getobj_name` Must-fix.
- JS / map: `do_name.js` `docallcmd` case `'i'`; export `name_ok`; delete `getobj_name`. `iactions.js` imports `name_ok`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **636** named `'i'` live getobj (clone until this SHA). **631** named the slip, not this getobj.

## Intent vs deliverable

Git subject promises: naming an inventory object uses live `getobj("name", name_ok, GETOBJ_PROMPT)` instead of the `getobj_name` clone after D-1675.

Pinned C `docallcmd` `'i'` `:567–569` (`node scripts/csym.mjs docallcmd` → `:498–601`). `name_ok` `:466–476`. `--callers name_ok`: `iactions.c:60` (`item_naming_classification`); the getobj site passes the function pointer (`do_name.c:567`) so `--callers` does not list it — cite `:567` from the body. `getobj` `invent.c:1751–2089`. `GETOBJ_PROMPT` `hack.h:1441` `0x2`. `item_naming_classification` `:45–82` (`--callers`: prototype `:8`; `:403`).

```566:570:nethack-c/upstream/src/do_name.c
    case 'i': /* name an individual object in inventory */
        obj = getobj("name", name_ok, GETOBJ_PROMPT);
        if (obj)
            do_oname(obj);
```

```466:476:nethack-c/upstream/src/do_name.c
int
name_ok(struct obj *obj)
{
    if (!obj || obj->oclass == COIN_CLASS)
        return GETOBJ_EXCLUDE;
    if (!obj->dknown || obj->oartifact || obj->otyp == SPE_NOVEL)
        return GETOBJ_DOWNPLAY;
    return GETOBJ_SUGGEST;
}
```

Old JS: `await getobj_name()` — a local interactive clone (`nhgetch`, compactify>5, gold “cannot name gold”, canned via `getobj_from_cmdq`). `name_ok` was file-local; `iactions.js` kept a second clone. The diff **does** `await getobj('name', name_ok, GETOBJ_PROMPT)`, **exports** `name_ok`, **deletes** `getobj_name` / `name_suggest_lets` / `QUITCHARS`, **deletes** the iactions clone and imports `name_ok`. It **does not** rewrite live `getobj`, `do_oname`, or Call Amulet `silly_thing`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `docallcmd` `'i'` | C `:567–569`, **LIVE this SHA** | was clone; now live getobj |
| `name_ok` | C `:466–476`, **LIVE this SHA** (export) | one body; iactions import |
| `getobj` | C `:1751–2089`, **LIVE** (not rewritten) | invent.js; canned KEY already |
| `getobj_name` | **deleted clone** | `sym.mjs`: NOT FOUND; do not restore |
| `name_suggest_lets` | **deleted** | live getobj builds `lets[]` |
| `GETOBJ_PROMPT` | C `0x2`, **LIVE** | `js/const.js` `0x02` |
| `do_oname` | C callee, **CLONE** (pre-existing local) | not this SHA; do not write #2 |
| `item_naming_classification` | C `:45–82`, **LIVE** | now shares exported `name_ok` |
| `getobj_from_cmdq` | **LIVE** | first thing inside live `getobj` |
| Call Amulet `silly_thing` | C `:2093+`, **OMIT named** at this SHA | D-1682 |
| `#if 0` know-those-as-well | C `:581–585`, **OMIT** (compiled out) | D-1682 comment |

RNG: none in `name_ok` / this `'i'` arm. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
getobj_name      NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
name_ok          js/do_name.js:107   sync
getobj           js/invent.js:6266   ASYNC — await required
docallcmd        js/do_name.js:1174   ASYNC — await required
do_oname         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_name.js:185
             => Do NOT write clone #2.
GETOBJ_PROMPT    js/const.js:2056   sync   export const
getobj_from_cmdq js/invent.js:5977   sync
compactify_invlets js/invent.js:5776   sync
```

`--can do_name.js invent.js getobj`: **ALREADY** (D-1660 already imported `getobj` for `'o'`). `--can iactions.js do_name.js name_ok`: **ALREADY** (`call_ok` was already imported; this SHA adds `name_ok` on that edge). `getobj` is a hoisted `async function`. Do **not** add `getobj_name` clone #2. Do **not** add `name_ok` clone #2 in iactions.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**`name_ok`.** C: null or `COIN_CLASS` → EXCLUDE; `!dknown` or `oartifact` or `SPE_NOVEL` → DOWNPLAY; else SUGGEST. JS the same (`!obj` ≡ null). Hands: C `name_ok(NULL)` is EXCLUDE so getobj does **not** set `allownone` / `HANDS_SYM`. JS `obj_ok(null)` same. **Match `:466–476`.** JS enum numbers differ from C (`EXCLUDE=0` vs `-3`); callbacks and getobj share the JS enum — pre-existing, not this SHA.

**`docallcmd` `'i'`.** C `getobj("name", name_ok, GETOBJ_PROMPT)` then `do_oname`. JS `await getobj('name', name_ok, GETOBJ_PROMPT)` then `await do_oname(obj)`. **Match `:567–569`.** `GETOBJ_PROMPT` is `0x02` ≡ C `0x2`. Word `"name"` matches. Do **not** pass `GETOBJ_NOFLAGS` here (`'o'` is `call_ok` + NOFLAGS, D-1660).

**Canned KEY (itemactions IA_NAME_OBJ).** C: `docallcmd` pops `'i'`; `getobj` pops invlet (`invent.c:1781–1853`). JS: `docallcmd` still pops the first KEY; live `getobj` starts with `getobj_from_cmdq(obj_ok, allowcnt, hands_obj)` and returns if `!cq.skip`. The deleted clone used the same helper. **Match canned.** `name_ok` DOWNPLAY still `getobj_cmdq_rank_ok` (C SUGGEST or DOWNPLAY). Gold EXCLUDE → `otmp` null → `cmdq_clear`. **Match.**

**Interactive vs deleted clone.** C `yn_function` (not raw `readchar` unless `in_doagain`). The clone used `nhgetch` + a home-grown prompt. Live `getobj` uses `yn_function`, `GETOBJ_PROMPT` → `forceprompt` so empty SUGGEST still `[*]`, compactify when `suggested>5`, `?`/`*` `display_pickinv`, quitchars `Never_mind`, missing letter continue. That is **C `getobj`**, not a second naming clone. Gold: C `:2012–2018` `You("cannot %s gold.", word)` → `You cannot name gold.` Live `getobj_finish_pick` the same. Other EXCLUDE would `silly_thing`; `name_ok` only EXCLUDEs gold/hands, so the `'i'` arm does not need the Amulet Call text (that is `'o'` / D-1682).

**iactions `name_ok`.** C one function; `item_naming_classification` `:60` `name_ok(obj)==GETOBJ_SUGGEST`. JS deleted the local clone and imports the export. **Match `:60`.** One body. Do **not** write clone #2.

Callee closure (`'i'` arm). LIVE: `getobj`, `name_ok`, `do_oname` (local clone already matched to C here / D-1670), `GETOBJ_PROMPT`, canned `getobj_from_cmdq`. CLONE: `do_oname` pre-existing (not introduced). OMIT named: Call Amulet `silly_thing` (next SHA); `#if 0` EXCLUDE. STUB: **none** in the live `'i'` arm. Combined-arm ships. “Dispatch ported, callee stubbed” is **false** — the callee **was** the stub/clone and this SHA **deleted** it.

## Hallucinations / overclaim

Subject “live `getobj("name", name_ok, GETOBJ_PROMPT)`”: **true**. D-log “delete `getobj_name`”: **true** (`sym.mjs` NOT FOUND). Do **not** stamp “Match C Call Amulet `silly_thing`” (D-1682). Do **not** stamp “Match C `#if 0` know-those-as-well” (compiled out). Do **not** stamp “rewrote `getobj`.” Do **not** restore `getobj_name`. Private canary (gold EXCLUDE, DOWNPLAY artifact, canned KEY, empty prompt `[*]`) is the right split. Public-unhit for `C` then `i`.

## Density

+21 / −108: one `'i'` getobj deletion. §2b. Did not glue Call Amulet or wield `restrict_name`.

## Verification

Wired: `'i'` live getobj; exported `name_ok`; iactions one body; canned KEY still inside getobj. Unwired C: Call Amulet (D-1682); `#if 0`. Conf: no RNG. No seed gate.

Journal: private canary; green+strict seed8000/0900; cohort **9**/9 + strict. Cadence **#2090** at HEAD: **44**/44.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): Call Amulet `silly_thing` (D-1682); wield `restrict_name`; `do_oname` remains one local (do not write #2). Do **not** restore `getobj_name`. Do **not** add `name_ok` clone #2. Do **not** switch `'i'` to `GETOBJ_NOFLAGS`. Do **not** re-port `'o'` `getobj("call")` (D-1660). Do **not** re-port `docallcmd` cmdq_pop (D-1671).

Verdict: **ACCEPT-WITH-DEBT**
