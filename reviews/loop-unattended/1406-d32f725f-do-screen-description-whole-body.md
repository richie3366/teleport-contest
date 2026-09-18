# Review 1406 — d32f725f — pager.c do_screen_description whole body (D-2447)

- Commit: `d32f725f` — "`pager.c` do_screen_description whole body in C order (coverage MISSING → live) (D-2447)."
- Files: `js/pager.js` (+814/−~300 restart), `js/getpos.js` (+26),
  `js/uhitm.js` (+18 expl table), one-line export flips in cmd/
  display/mondata; docs + map + queue pop. +636/−317, 6 js files,
  < 1500/15 cap.
- D-log: D-2447. Queue row popped: do_screen_description MISSING
  (C 382 L). Mid-port triage honestly records 5 regressions found
  and fixed in-iteration.

## Intent vs deliverable

Subject promises whole `do_screen_description`
(`pager.c:1246–1627`) in C order. Diff delivers the full arm chain
(restricted vision → didlook) plus the showsyms emulation layer and
rewires getpos auto_describe onto it. Promise mostly kept — except
one wrong sym source on the unlooked path (item 1).

## Inventory

New/changed JS: `do_screen_description` (`js/pager.js:1375–1681`),
`glyph_showsym_code`, `cmap_showsym_code`, `showsym_x_code`,
`is_swallow_code`, `decSymsActive`, `DEC_CMAP_BYTE`,
`add_cmap_descr`/`append_str` (exported), `add_quoted_engraving`,
`DEF_MONSYM_MLET`/`DEFSYMS_CH` (now exported), extended
`defsym_explanation`. Deleted locals `describe_looked` family +
`stair_cmap_explanation` + `is_stair_spot` (superseded). Required
`sym.mjs` output (paste): all five `NOT FOUND in js/**` (deleted,
zero residue — remaining mentions are stale comments at
`pager.js:451/:581`); `rendered_glyph_char` stays pager-local
(emulates the display.js paint rule; the D-log wording overstates a
move that didn't happen — cosmetic only); `lookat js/pager.js:1959
sync` (didlook's sync call is safe); `monsym js/display.js:472
sync` (def letters, see debt).

## C ↔ JS fidelity

C loci via csym: `do_screen_description :1246–1627` (382 lines),
`add_cmap_descr :1133–1245`, `size`/`mhidden` callees as cited.
Walked every arm against C:

- Exact: restricted-vision gates (`uswallow||submerged` +
  TER_DETECT/stone), `encglyph` vs `%c` prefix, check_monsters
  (S_invisible skip, `@`-as-you with race/Upolyd gates), objects
  (rogue/primary boulder sym, statue split, looked-discard-both,
  venom skip+restore), DEF_INVISIBLE (EDetect/Blind alt),
  dark-room + unexplored glyph-bank/slot halves, cmap rotation
  (lava→water→lavawall), darkroom-glyph skip, article tiers,
  S_pool moat second-look, altar/trap/hallu/engraving/grave
  need_to_look, warnings + boulder co-locate + break, override
  scan (`#if 0` noted, PET/HERO re-entry loop), `found > 4`
  collapse, didlook (lookat/pm supplement/ice/blocked-stair/
  firstmatch+engraving/`found=1`/[seen:] suffix) with BUFSZ caps.
- `add_cmap_descr` exact: NO_GLYPH water words, waterbody override
  with typ save/restore + EHalluc_resistance=1, pool/lava
  shortening, the 12-prefix article suppression (incl. frozen +
  case-insensitive ` ice`), first-match `a trap` arm,
  hit_trap/drawbridge/vibrating guards.
- Triage fixes (1)–(5) verified in code: full showsyms byte from
  glyph banks (no stripped disp char), DEC ladder bytes in the
  table, darkroom runtime equate (`display.c:1850–1853` mirrored),
  NOTHING/UNEXPLORED slot halves, do_look `pm=null` (the
  never-assigned local, re-verified for D-2443).
- Banned-pattern grep: zero hits. No RNG in C body, none added
  (waterbody/lookat/ice are shared live callees, same as C).

EXCEPT item 1. Debts (exotic, named): monster/object/warning arms
use def tables where C reads showsyms/override slots — identical
under DEC (letters un-remapped), diverge only under custom
`OPTIONS=monsters/objects` overrides (no suite sets them);
HERO_OVERRIDE hardcodes 0x40 vs `showsyms[S_HUMAN+SYM_OFF_M]`
(same under every shipped symset); PET_OVERRIDE approximates
`map_glyphinfo NOOVERRIDE` via `mon_at+monsym` — a symset-iter
follow-up, not this row.

## Hallucinations / overclaim

"Prefix renders via the display.js paint rule
(`rendered_glyph_char`)" misleads — the function stayed
pager-local (a faithful mirror, not the display.js one). Cosmetic;
the paint exclusions match. No dispatch/callee split: every callee
LIVE, no stub in a live arm.

## Density

One C function + its pager.c staticfns + caller rewiring, +636/−317
in 6 files. Within cap; whole-body claim holds except item 1.

## Verification

D-log: `verify.mjs --fn do_screen_description` → PASS (syntax 6
files · rule2 · hidden note · smoke 24/24 · green · strict ·
cohort · full 44/44). My re-run on this SHA:

- `hidden-proxy.mjs verify do_screen_description --base
  d32f725f~1 --reach-all` → "0 session(s) blocked on it (0 at
  baseline, 0 in the working scoreboard)" + "smoke: no RNG-tagged
  reach; fixed smoke spread (24 run): 24 PASS, 0 regressed →
  REACH-OK". Vacuous but honestly logged; no REGRESSED session.
- Global `imports.mjs --rulecheck`: Rule #2 clean.

No corpus session issues an unlooked cmap query under DEC, so the
suite cannot catch item 1.

## Actionable C-wrongs

1. Cmap scan compares against the wrong sym source when
   `!looked` (`js/pager.js:1540`). C compares `sym ==
   (looked ? gs.showsyms[alt_i] : defsyms[alt_i].sym)` — the
   unlooked `/`-query path always uses the Primary def byte. JS
   uses `cmap_showsym_code(altI)` on both paths, which returns the
   DEC byte when `decSymsActive()` (corpus-common config:
   sessions record `OPTIONS=symset:DECgraphics`). Measured:
   `DEC_CMAP_BYTE[S_vwall]=0xF8` vs Primary `'|'`
   (`DEFSYMS_CH[1]`). So a DEC user typing `/` `|` gets "I've
   never heard of such things." where C prints the wall
   description (and the S_pool moat second-look inherits the
   miss). The dark-room/unexplored arms already branch on `looked`
   correctly — only the scan misses the split. Fix: compare
   against the Primary `DEFSYMS_CH` byte when `!looked` (one
   branch, same iter as the override debts above if convenient).
   Verify: unlooked `/`-query of `|` under DEC + `verify.mjs --fn
   do_screen_description`. Must-fix prepended.

Verdict: **QUALITY-RISK**

**Addressed:** D-2449
