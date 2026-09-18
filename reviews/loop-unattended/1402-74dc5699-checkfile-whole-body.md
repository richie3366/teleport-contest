# Review 1402 — 74dc5699 — pager.c checkfile whole body in C order (D-2443)

- Commit: `74dc5699` — "`pager.c` checkfile whole body in C order (coverage THIN → live) (D-2443)."
- Files: `js/pager.js` only (+284/−~115); docs + map + queue pop.
- D-log: D-2443. Queue row popped: checkfile THIN (C 301 L / JS skeleton).

## Intent vs deliverable

Subject promises the whole `checkfile` (`pager.c:829–1129`) in C
order. Diff delivers: `checkfile_dbase_str` (strips), split/alt
helpers, restarted `checkfile(inp, pm, chkflags, supplementalHolder)`,
`ia_checkfile` on the shared helpers, deleted dead wrappers. Promise
mostly kept — except one dropped C strip below (item 1).

## Inventory

New/changed JS, all `js/pager.js`: `checkfile_dbase_str`,
`checkfile_split_names`, `checkfile_alt_for`, `checkfile` (new
4-arg signature), `ia_checkfile` (rewired). Deleted locals
`simplify_for_db` / `split_db_query` / `lookup_data_base`
(non-exported). Re-pointed: `yn_function` → `y_n` import.
Required `sym.mjs` output (paste):

- `simplify_for_db NOT FOUND in js/**` (deleted, no other refs)
- `split_db_query NOT FOUND in js/**` (deleted, no other refs)
- `lookup_data_base NOT FOUND in js/**` (deleted, no other refs;
  `lookup_data_base_entry` is a different, pre-existing fn)
- `yn_function js/getline.js:1572 ASYNC` (still live there; remaining
  `pager.js` mentions are comments only — safe removal)
- `y_n js/getline.js:1531 sync`; `ia_checkfile js/pager.js:987 sync`

## C ↔ JS fidelity

C loci via csym: `checkfile :829–1129` (301 lines); callers
`:813 ia_checkfile`, `:1838` do_look `/i`, `:1853` `?`, `:1948`
glance. Branch-by-branch confirm:

- Strips `:867–935`: else-if chains exact (`a/an/the/some/digit`,
  `tame/peaceful`, `blessed/uncursed/cursed`, `partly used/eaten`,
  `statue/figurine` truncation, `±enchant` skip, moist→wet-towel
  memcpy). Digit-count and enchant arms are new vs old regex ✓.
- Split `:944–976`: named/called/`, ` arms, `ep > start` truncate,
  alt article + ` (` strip, supplemental fill from original-case
  `inp` via live `strstri` ✓. `indexOf` on the already-lowered
  dbase ≡ C `strstri` there ✓.
- Alt `:984–996`: `fruit_from_name(dbase, true, null)` → `'slime
  mold'` else live `makesingular` (`js/objnam.js:1713/1460` sync;
  null third arg safe by default `= null`). Hardcoded English vs
  `obj_descr[SLIME_MOLD].oc_name` — same string, minor.
- Pass loop `:998–1054`: alt-first, `pass1offset` via stable
  `hit.index`, `== pass1Index → break` ✓. Ask `:1055–1072` uses
  live sync `y_n` with `=== 'y'` — the re-point is C-correct (C
  calls `y_n`, not `yn_function`) and fixes the old `'Y'` bug ✓.
  Display gate, `ia_checking → break`, miss message gated on
  `user_typed && pass==0 && !pass1found` ✓ exact.
- Caller closure (all 4): `:813` → `ia_checkfile` re-implemented on
  the same helpers (alt≠base order, entry-exists, no prompt/display
  — matches C's IaCheck early-`done` path); `:1838`/`:1853` → null
  pm ✓ (do_look's only `pm =` in 1690–1970 is the `:1899` NULL
  reset); `:1948` → null pm + live holder ✓ with the never-assigned
  mechanism cited in-code.
- `impossible` (`js/display.js:7542` ASYNC) added import, awaited ✓.
  All three new edges `--can` → ALREADY. No RNG in C body, none in
  JS. Banned-pattern grep on the hunk: zero hits.

EXCEPT item 1.

## Hallucinations / overclaim

"pm + supplemental_name params absent at all four C call sites" —
awkwardly worded but the code is right (null pm wired at all four
sites with the NULL-reset proof). "`y_n` ... `== 'y'`" verified
true. No dispatch/callee mismatch: every callee is LIVE.

## Density

One C function family, one module, +284/−115. Whole-body claim
holds except item 1's dropped strip.

## Verification

D-log: `verify.mjs --fn checkfile` → PASS (syntax · rule2 · hidden
note · smoke 24/24 · green · strict · cohort). My re-run:

- `hidden-proxy.mjs verify checkfile --base 74dc5699~1 --reach-all`
  → "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)" + "smoke checkfile: no RNG-tagged reach; fixed smoke
  spread (24 run): 24 PASS, 0 regressed → REACH-OK". Vacuous but
  honestly logged; no REGRESSED session.
- Global `imports.mjs --rulecheck`: Rule #2 clean.

No corpus session looks up a lit/charged item, so the suite cannot
catch item 1 — same blind spot as reviews 1393/1395.

## Actionable C-wrongs

1. `checkfile_split_names` drops C's dbase-side `" ("` strip
   (`pager.c:977–981`: charges/`(lit)`/wizmode-aum truncation of
   `dbase_str`). The helper strips ` (` from `alt` only; my probe
   of the shipped functions shows `"oil lamp (lit)" →
   dbase "oil lamp (lit)"`, `"wand of striking (0:3)"` unchanged.
   Reachable: `objnam.c:1477–1490` append `" (lit)"`/`" (%d:%d)"`
   in the names the `/i` and glance paths feed to `checkfile`; C
   then finds the entry, JS misses (silent no-display, or wrong
   "You don't have any information on those things." on typed
   paths). The pre-port regex stripped it — this is a port
   regression, not a named omit. Fix: truncate dbase at the first
   `" ("` (ep > start) in `checkfile_split_names`, mirroring C.
   Verify: lit-lamp/charged-wand lookup hits + `verify.mjs --fn
   checkfile`. Two lines, one-iter fix. Must-fix prepended.

Verdict: **QUALITY-RISK**

**Addressed:** D-2451
