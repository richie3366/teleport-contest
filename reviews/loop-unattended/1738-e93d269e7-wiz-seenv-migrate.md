# Review 1738 — e93d269e7 — wiz seenv + migrate (D-2779)

- SHA: `e93d269e7` (`wizcmds.c` wiz_show_seenv + wiz_migrate_mons, D-2779)
- Files: `js/wizcmds.js` (+315/−3), `js/getline.js` (+20/−0), docs
- Queue rows: two Open coverage rows (same C file), 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (re-run this audit).

## Intent vs deliverable

Subject promises both whole bodies with the # commands live. Diff
delivers: `migrsort_cmp`, `list_migrating_mons`, `wiz_migrate_mons`,
`wiz_show_seenv`, two EXT_CMDS runnable entries, and nine imports.
No gap found; the DEBUG-block-live call is verified correct below.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `migrsort_cmp` (new, local) | C body | `wizcmds.c:1484–1501` |
| `list_migrating_mons` (new, local) | C body | `wizcmds.c:1504–1610` |
| `wiz_migrate_mons` (new, export) | C body incl. DEBUG block | `wizcmds.c:1872–1930` |
| `wiz_show_seenv` (new, export) | C body | `wizcmds.c:575–617` |
| EXT_CMDS wizseenv/migratemons | C dispatch | `cmd.c:1990–1991`, `:1764–1770` |

Nothing deleted or re-pointed. Every callee LIVE (`sym.mjs`):
`yn_function`, `getlin`, `show_text_pages` (async, awaited),
`minimal_monnam`, `makemon(ptr,0,0,flags)`, `rndmonst()`,
`migrate_to_level(mtmp,ledger,flags,coord)`, `get_level` (out-param),
`ledger_no` (imported, not an 8th clone), `depth`, `strsubst`
(first-only, matches C), `Is_stronghold/Is_botlevel`,
`has_mgivenname/MGIVENNAME`, `u_at`, MIGR/MM consts (values match
`dungeon.h`/`hack.h`). The `assign_level` inline copies the
teleport.js:2932 shape (no 5th named clone); `plur` inlines match
the `hack.h:1520` macro exactly.

## C ↔ JS fidelity

- Sort: d/l subtraction + unsigned `<`/`>` m_id tie-break ✓ (`|0`
  keeps order for live small ids).
- List walked against `:1504–1610`: count predicates ✓, both
  `plur` sites ✓, prmpt/`a q`/ESC-xtra build ✓, `yn_function`
  4-tuple (4th is `addcmdq` in C too — verified) ✓, n-select ✓,
  header texts incl. `'other' levels` ✓, collect predicates (shown
  to select exactly the counted sets, so `marray.length>1` ⟺ C's
  reused-`n>1`) ✓, `  %s` + first-occurrence ` <0,0>` strip +
  ` named ` + ` to d:l` + ` at <x,y>` (MIGR_EXACT_XY=2, so absent
  mtrack can't misfire) ✓, `None.` arm ✓, FALSE-display → pager
  named ✓.
- Migrate walked against `:1872–1930`: stronghold→valley /
  `get_level(depth+1)` / zero arms ✓, list call ✓, DEBUG block
  correctly LIVE (`DEBUG` unconditional in patchlevel.h:35-37 ⇒
  config.h:620 defines it — re-verified, not trusted) ✓, prompt
  text ✓, ESC/empty abort ✓, atoi/clamp ((COLNO−1)*ROWNO) ✓,
  debug_mongen save/clear/restore ✓, rndmonst/makemon vs fmon-head
  re-read each pass ✓, unconditional `mcount--` ✓.
- Seenv walked against `:575–617`: max/min centering (integer-exact
  20/40) ✓, 80-char guard ✓, `@@`/blank/`%02x`-lowercase cells ✓,
  trailing-trim loop (all-space → empty both) ✓, per-row putstr +
  blocking display ✓. No RNG in any body.
- EXT_CMDS flags match cmd.c (IFBURIED|AUTOCOMPLETE|WIZMODECMD →
  `wiz:true`, wiz_smell precedent) ✓.

## Hallucinations / overclaim

None. The "0 references was scope-limited" correction is accurate
(extcmdlist function pointers), and the DEBUG-live claim re-verified
above.

## Density

~280 behavior lines for two C commands + two helpers, one file
family: in range. Named omits (pager-for-FALSE, extractor desc gap,
stale C comment) are in the map in this commit.

## Verification

Re-ran both `node scripts/hidden-proxy.mjs verify {wiz_show_seenv,wiz_migrate_mons} --base e93d269e7~1 --reach-all`: 0 blocked + vacuous note (expected) + smoke 24/24 REACH-OK each. Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
