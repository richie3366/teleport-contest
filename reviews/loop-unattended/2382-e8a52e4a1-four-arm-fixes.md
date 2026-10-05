# Review 2382 — e8a52e4a1 — doopen_indir glyph + toss_up can_blnd + dokick restore + more fuzzer (D-3439)

- SHA: `e8a52e4a1` — "Open head: doopen_indir glyph-learn + toss_up live can_blnd + dokick !oldmem restore + more fuzzer skip (D-3439)."
- js/: `js/lock.js` (+4/−3), `js/dothrow.js` (+4/−16), `js/dokick.js` (+17/−8), `js/display.js` (+3/−1). Ledger: all four ported, no audited rows, Left open none.
- Method: full C↔JS on all four (≤10-function SHA); recipe-level check of the toss_up NO-MOVEMENT triage; re-measure verify on all four.

## Intent vs deliverable

Subject promises four arm completions: (a) doopen_indir's dropped glyph-learn half, (b) toss_up's can_blnd subset → live call, (c) dokick's unconditional show_glyph restore (review 1682 §1), (d) more's debug_fuzzer early return — plus an honestly disclosed VERIFY: FAIL on toss_up NO MOVEMENT with a misattribution triage. The diff delivers all four, nothing else. No helpers added; one subset deleted.

## Inventory

| JS function | File:line | C locus | Change |
|---|---|---|---|
| `doopen_indir` | js/lock.js:915–925 | lock.c:832–840 (in body :779–923) | cellGlyph snapshot/compare around mapseen+newsym |
| `toss_up` | js/dothrow.js:1643–1648 | dothrow.c:1294–1299 (caller throwit :1589) | blindinc gates on live can_blnd; 12-line subset deleted |
| `dokick` | js/dokick.js:1678–1686 + :1732–1750 | dokick.c:1416–1418 | `&& oldmem` dropped; !oldmem repaints pre-kick tty paint |
| `more` | js/display.js:7871–7877 | win/tty/topl.c:204–211 | fuzzer early return before inmore guard |
| imports | js/dothrow.js:76,:104 | — | AT_WEAP + can_blnd names added to existing mhitm/uhitm blocks |

Diff grep: no FORCE/DIAG/getRngLog/fastforward/coords/seeds. Rule #2 clean (review 2381 re-run covers all scored js/). Ledger: all four rows ported with empty omits; the old omits (glyph half, toss subset, oldmem gate, fuzzer skip) each named exactly the shipped arm — sole omits, correctly retired.

## C ↔ JS fidelity

**doopen_indir — C `lock.c:832–840`.** C: `oldglyph = door->glyph` → update_mapseen_for → newsym → glyph-or-lastseentyp change ⇒ ECMD_TIME ("learned something"). JS mirrors the sequence exactly with `cellGlyph(loc)` (hoisted js/lock.js:1219: `loc?.remembered_glyph?.glyph`, null-safe, absent → 0) snapshotted before and compared after. Order verified: snapshot → `update_mapseen_for` → `newsym` → compare — the same order as C, so a newsym-driven glyph change is observed. Modeling note: JS compares the remembered id where C compares `door->glyph` — the pick_lock :1421 precedent, review-accepted; on never-memorized squares both reads are 0 and the lastseentyp half still fires. Callers (lock.c:775 doopen, hack.c:1099 test_move) pre-wired per D-log; the arm is internal to the function. Confirm.

**toss_up — C `dothrow.c:1294–1299`.** C: `blindinc = (pie||venom) && can_blnd(&youmonst,&youmonst,AT_WEAP,obj) ? rnd(25) : 0`, with the "AT_WEAP ok even if AT_SPIT" comment. JS is token-identical in structure, comment included. Required symbol output: `sym.mjs can_blnd` → `js/uhitm.js:359 sync` (live whole — signature `(magr, mdef, aatyp, obj)`, raven arm null-safe, AT_WEAP arm verified in review 2383); `AT_WEAP = 254` ≡ `monattk.h:28` (js/mhitm.js:325, with the "not 10" comment). Deleted subset covered only haseyes+otyp+uswallow — strictly weaker than live (raven/EBlinded/ublindf/ucreamed/visor). Grep confirms zero remaining `can_blnd_toss_self` references in js/. LIVE callee, correct deletion. Import edges: dothrow→uhitm and dothrow→mhitm pre-exist (name additions only, no new edge to check).

**dokick — C `dokick.c:1416–1418`.** C: `if (glyph != oldglyph && glyph_is_invisible(glyph)) show_glyph(x, y, oldglyph);` — unconditional, no memory gate — inside the DEADMONSTER arm after `kick_monster` + `glyph_at`. JS now matches predicate and position: the `&& oldmem` gate is gone; the oldmem branch restores memory+paint as before; the new !oldmem branch repaints the pre-kick tty snapshot. Snapshot placement verified: `olddisp` (ch/color/decgfx/attr) is captured inside `if (mtmp)` before `maybe_kick_monster`, next to the existing oldglyph/oldmem capture — genuinely pre-kick. C paints from the glyph via the glyphmap id→char table; JS uses the tty snapshot because that table is show_glyph_cell's standing deferral — the only faithful choice under that model, and the branch writes no false memory (C doesn't touch memory here either; `show_glyph` only repaints). Null-safety: `olddisp?.ch ?? ' '`, `olddisp?.attr | 0` (undefined|0 = 0) — a never-painted cell paints blank over the id. Confirm — review 1682 §1 resolved.

**more — C `win/tty/topl.c:204–211`.** Verified order in pinned C:

```c
    if (iflags.debug_fuzzer)
        return;
    /* avoid recursion -- only happens from interrupts */
    if (ttyDisplay->inmore)
        return;
```

JS (`game.iflags?.debug_fuzzer` return, then `_tty_inmore` guard) is identical in order and predicate. Entry guard, so all JS --More-- call sites (display/pager/getline) inherit it, matching C's fan-in (files.c:1766, getline.c:54, topl.c:140/274/392, wintty.c:1875/2835). (D-log cites "topl.c" without the `win/tty/` prefix; locus verified at `nethack-c/upstream/win/tty/topl.c`.) Confirm.

**Callee classification summary:** doopen_indir — no new callee (uses hoisted local `cellGlyph`, a 3-line null-safe reader, not a C function); toss_up — C callee `can_blnd` now LIVE (was local subset, deleted); dokick — no new callee (existing `show_glyph_cell`); more — no callee. Zero STUBs, zero new clones. Combined-arm closure holds trivially: each arm's only C callee is live.

## Hallucinations / overclaim

None. The one "Match C"-adjacent risk — shipping with VERIFY: FAIL — is disclosed in the subject line itself, with cause. D-log C-locus cites spot-checked: lock.c:832–840 ✓ (block read), dothrow.c:1297 ✓ with mondata.c:327–328/:344–351 gate refs ✓ (raven + pie/venom arms confirmed in live can_blnd), dokick.c:1417–1418 ✓ (block read), topl.c:209–210 ✓ (modulo the `win/tty/` prefix). The "pick_lock :1421 precedent" and "mail.js:290 idiom" cites are internally consistent with the diff (cellGlyph hoist shape; optional-chain iflags guard). No phantom names, no invented line numbers.

## Density

≤10-function SHA, whole Method per function. Verdict per function:

| Function | Verdict |
|---|---|
| doopen_indir | whole ✓ (glyph + lastseentyp halves) |
| toss_up | whole ✓ (live gate; NO MOVEMENT triaged true, below) |
| dokick | whole ✓ (unconditional restore both memory cases) |
| more | whole ✓ (fuzzer guard + inmore guard in C order) |

No audited declarations to sample, no Left-open items. Not a batch commit (Open-head iteration), §10.17 batch rules N/A. Each function has its Ledger entry and its Verify line.

## Verification

Re-measured (`hidden-proxy.mjs verify doopen_indir,toss_up,dokick,more --base e8a52e4a1~1 --reach-all`, one call):

| Function | Blocked at parent | Reach line |
|---|---|---|
| doopen_indir | 0 (vacuous) | reach 77/77 REACH-OK |
| toss_up | 1 (scen-impaired-Knight-94330 s98, unchanged) | smoke 24/24 REACH-OK |
| dokick / more | 0 (vacuous) | smoke 24/24 REACH-OK each |

Matches the D-log line-for-line, including VERIFY: FAIL on hidden NO MOVEMENT only.

The NO-MOVEMENT triage ("misattributed owner") I verified independently, not on trust. Recipe forensics on `hidden-corpus/recipes/scen-impaired-Knight-94330.recipe.json` (1 segment, 286-key move string, read in full):

- Content: `#wizintrinsic` wishes, scroll reads (`ri/rj/rk/rm/ro`), engravings (`E-`, `E-y`), searches (`s`), one zap (`znl` — undead turning).
- `t` count is 11, but every occurrence sits inside a wish/type string ("intrinsic", "scroll", "identify", "undead turning", "genocide", "minotaur") — **no `t` throw command at all**, no pie/venom anywhere.
- `toss_up` (upward throw of pie/venom that breaks) therefore cannot execute in this session: no movement is the only possible outcome and the owner label is heuristic misattribution.

The step-98 divergence (monster-melee toplines, hero key space) corroborates. This is disclosed NO MOVEMENT with a true, checkable triage — not NO MOVEMENT sold as a named omission. No REGRESSED sessions anywhere; the blocked session is unchanged, not worse.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
