# Review 536 — d13bf416 — makemon.c mk_gen_ok MAIL + msummon ndemon arms (D-1575)

## Metadata
- Full / short hash: `d13bf41664a7a7bd335e01f886dabf4c0179a6b6` / `d13bf416`
- Parent: `1ba35e31` (D-1574). This file audits **this SHA only** (ninth of nine `js/` commits since review **527**). Archive **Addressed:** D-1575 was missing `%h` (fill `d13bf416` in this audit commit).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 08:51:21 +0200
- D-id: **D-1575**
- Stats: `js/makemon.js` +10 / −3, `js/minion.js` +38 / −6, `js/teleport.js` +1 / −1. Band 150–350 (js/ insertions **49**).
- Claims to close: Open `ndemon` aligned `mkclass` after D-0053/D-0748/D-1566. Not `rndmonst_adj`. `reviews/loop-2026-08-15/` has no unpaid ndemon Must-fix.
- JS / map: `makemon.js` `mk_gen_ok`/`mkclass_aligned`; `minion.js` `llord`/`msummon`; `teleport.js` `is_lminion`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **535** named `ndemon` (Open after D-1574).

## Intent vs deliverable

Git subject promises: `mkclass(S_DEMON, G_NOGEN)` and `ndemon` cannot pick the mail daemon, and `msummon` uses `is_lminion`/`llord`/PM_ANGEL `ndemon` instead of leaving those arms `NON_PM`.

Pinned C `makemon.c` `mk_gen_ok` `:1735–1752` (`MAIL_STRUCTURES` `PM_MAIL_DAEMON`). `mkclass_aligned` `:1879–1974` (`class < 1 \|\| class >= MAXMCLASSES` then `init_mongen_order`). `minion.c` `ndemon` `:443–464` (`mkclass_aligned(S_DEMON, 0, atyp)` then `is_ndemon`). `llord` `:419–426`. `msummon` `:58–195` arms `:102–124`. `is_lminion` `monst.h:281–282`. `global.h:430` `#define MAIL_STRUCTURES` (always on in this tree). `ROLL_FROM` `hack.h:1493`.

```1746:1750:nethack-c/upstream/src/makemon.c
#ifdef MAIL_STRUCTURES
    if (ptr == &mons[PM_MAIL_DAEMON])
        return FALSE;
#endif
```

```102:124:nethack-c/upstream/src/minion.c
    } else if (is_lminion(mon)) {
        dtype = (is_lord(ptr) && !rn2(20))
                    ? llord()
                    : (is_lord(ptr) || !rn2(6)) ? lminion() : monsndx(ptr);
        ...
    } else if (ptr == &mons[PM_ANGEL]) {
        if (!rn2(6)) {
            switch (atyp) {
            case A_NEUTRAL:
                dtype = ROLL_FROM(elementals);
                break;
            case A_CHAOTIC:
            case A_NONE:
                dtype = ndemon(atyp);
                break;
            }
```

Old JS: `mk_gen_ok` placeholder/geno only; `msummon` comment `is_lminion` / PM_ANGEL deferred (`dtype` stayed `NON_PM`). `is_lminion` was a local in `teleport.js`.

The diff **does** reject `pm('MAIL_DAEMON')`; move `init_mongen_order` after a JS-domain class check; export `is_lminion` (no second clone); add `llord`; wire both `msummon` arms. It **does not** port `show_transient_light` / `transient_light_cleanup`, `mk_mplayer`, or C `impossible` on bad `mkclass` class. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mk_gen_ok` MAIL | C `:1746–1749`, **LIVE this SHA** | `MAIL_STRUCTURES` always on |
| `mkclass_aligned` class `< 1` | C `:1891–1894`, **LIVE-ish** | JS `MLET_ORD` string keys; no `>= MAXMCLASSES` / `impossible` |
| `ndemon` | C `:443–464`, **LIVE** unchanged body | MAIL via `mk_gen_ok` |
| `llord` | C `:419–426`, **LIVE this SHA** | Archon else `lminion` |
| `msummon` is_lminion / PM_ANGEL | C `:102–124`, **LIVE this SHA** | |
| `is_lminion` | C `monst.h:281`, **LIVE** export | was local; one home |
| `lminion` / `ndemon` / `is_lord` | **LIVE** | |
| `ELEMENTALS` / `ROLL_FROM` | C `:11–14` / `:113`, **LIVE** | four basic elementals |
| `show_transient_light` | **OMIT named** | S_ANGEL spawn |

`node scripts/csym.mjs mk_gen_ok` → `:1735-1752`. `--callers`: `mkclass_aligned:1938`; `rndmonst` `:2001`/`:2007`; Erinys `:2608`. `llord` → `:419-426`; `--callers`: `msummon:104` only. `ndemon` → `:443-464`. `msummon` → `:58-195`; `--callers`: mhitu `:969`; sit `:305–307`; wizard `:609`.

RNG: new `rn2(20)` / `rn2(6)` / `rn2(4)` / `rn2(ELEMENTALS.length)` / `ndemon`’s `mkclass_aligned` `rn2(9)`/`rnd` **only when those arms run** — C’s intended calls. Previously those arms burned **no** RNG (early `NON_PM`). Public-unhit unless a session summons a lawful minion / non-lawful angel.

`node scripts/sym.mjs` on new / re-pointed names:

```
mk_gen_ok        NOT EXPORTED — 1 LOCAL in js/makemon.js:599
  => Do NOT write clone #2. C is staticfn.
llord            js/minion.js:248   sync
is_lminion       js/teleport.js:358   sync
ndemon           js/minion.js:157   sync
lminion          js/minion.js:166   sync
msummon          js/minion.js:288   ASYNC
mkclass_aligned  js/makemon.js:645   sync
pm               5 LOCAL clones (makemon.js:299 is this file’s home)
  => Do NOT write clone #6.
```

`--can minion.js teleport.js is_lminion`: ALREADY statically imported (this SHA added the named import). No TDZ. Do **not** add `is_lminion` clone #2 in `minion.js`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

MAIL. After placeholder, reject mail daemon. `pm('MAIL_DAEMON')` is `monsterNames` `PM_MAIL_DAEMON`. Tree always has `MAIL_STRUCTURES`. **Match `:1746–1749`.** `ndemon` already `mkclass_aligned('S_DEMON', 0, atyp)` then `is_ndemon` — **Match `:462–463`.** Tower `&` `mkclass(S_DEMON, G_NOGEN)` shares `mk_gen_ok`. **Match that filter.**

`mkclass_aligned`. C checks `class < 1 \|\| class >= MAXMCLASSES` **before** `init_mongen_order`. JS: `MLET_ORD[mletClass] ?? 0 < 1` then init. `S_DEMON` ordinal is **56**. Callers pass `'S_DEMON'` / `'S_ANGEL'` strings, not C `char` `'&'`. **Match the `< 1` idea for this port’s mlet keys.** C `impossible` + `>= MAXMCLASSES` omitted (MLET_ORD max 60). Softening, not a mail-daemon miss.

`llord`. `!(mvitals[PM_ARCHON].mvflags & G_GONE)` else `lminion()`. **Match `:419–426`.**

`msummon` is_lminion. Nested `is_lord && !rn2(20)` → `llord`; else `is_lord \|\| !rn2(6)` → `lminion`; else `monsndx`. `cnt` `!rn2(4) && !is_lord`. **Match `:102–107`.** `is_lminion`: `is_minion(data) && mon_aligntyp == A_LAWFUL`. JS uses teleport’s existing `mon_aligntyp` clone. **Match the macro for this caller.** Wizard/`mon==null` never reaches this arm (first `is_dprince` / WoY). **Match.**

PM_ANGEL. `!rn2(6)` then switch: NEUTRAL `ROLL_FROM(elementals)`; CHAOTIC/NONE `ndemon`; **no A_LAWFUL case** (dtype stays `NON_PM` → return 0). Else `dtype=PM_ANGEL`. `cnt` same as lminion. JS `default: break` is C’s missing `A_LAWFUL`. ELEMENTALS is C’s four. **Match `:108–124`.**

Callee closure (new arms). LIVE: `llord`, `lminion`, `ndemon`, `is_lord`, `is_lminion`, `mkclass_aligned`/`mk_gen_ok`. OMIT named: `show_transient_light`. STUB: **none in the dtype-pick arms.** Combined-arm may ship. Not “dispatch ported, callee stubbed” for MAIL / `llord` / angel `ndemon`. Spawn-loop light is named, not a silent stub inside the claimed pick.

## Hallucinations / overclaim

Subject MAIL + `msummon` arms instead of `NON_PM`: **true.** Do **not** stamp “Match C `show_transient_light`.” Do **not** stamp “Match C `mkclass` `impossible` on bad class.” D-log “not a public FAIL”: **stale** — parent `1ba35e31` already fails seed4500; this SHA’s metrics are **unchanged** (RNG 88490/108275). Cadence **43**/44 is D-1574’s break, not MAIL/`llord`. Do **not** enqueue a second Must-fix on this SHA for seed4500.

## Density

One C `mk_gen_ok` MAIL + the two deferred `msummon` arms + `llord`. +49 JS. Did not glue `mk_mplayer`. §2b OK (C is that small).

## Branch-by-branch confirm

1. `mkclass(S_DEMON, G_NOGEN)` / `ndemon`: mail daemon `mk_gen_ok` false. **Match.**
2. Other demons: MAIL test false; geno/placeholder unchanged. **Match.**
3. Lawful lord minion, `!rn2(20)`: `llord` → Archon if not gone. **Match.**
4. Lawful minion, not lord, `!rn2(6)`: `lminion`. **Match.**
5. PM_ANGEL lawful, `!rn2(6)`: dtype stays NON_PM, return 0. **Match.**
6. PM_ANGEL chaotic, `!rn2(6)`: `ndemon` (no mail). **Match.**
7. PM_ANGEL `rn2(6)` truthy: dtype PM_ANGEL. **Match.**
8. S_ANGEL `show_transient_light`: skipped. **Named.**

## Callers / RNG ledger

C `msummon`: mhitu, sit×3, wizard. Extra `rn2` only on the new arms. `mk_gen_ok` MAIL adds **no** RNG. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Exported `is_lminion` rather than clone #2. `pm()` stays the makemon local (do not add #6).

## Verification

D-log canary **24**/24; green+strict seed8000/0900; cohort **7**/7. **Public-unhit** for lawful-minion / angel `msummon`. seed4500 still FAIL from **D-1574** (worktree: this SHA same numbers as `1ba35e31`).

## Actionable C-wrongs

None for Must-fix. Named: `show_transient_light` / `transient_light_cleanup`; `mk_mplayer`; `impossible` on bad mkclass. Do not add `is_lminion` in `minion.js`. Do not treat seed4500 as this SHA’s C-wrong.

Verdict: **ACCEPT-WITH-DEBT**
