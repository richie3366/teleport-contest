# Review 1062 — 48742ea2 — do_look + checkfile two-pass (D-2092)

Metadata: SHA `48742ea2`, `js/pager.js` only, queue owner x_monnam (2
sessions). D-log D-2092.

## Intent vs deliverable

Subject promises: `;`-glance `:`-pick on nonhuman-race self never showed
the data.base entry — four defects (found never reset, asked instead of
DontAsk, no named/called alt pass, menu painted over pending More).
Diff actually adds: (1) u_at arm returns `found: 1`; (2)
`CHK_DONT_ASK` on LOOK_VERBOSE; (3) `split_db_query` + two-pass loop +
`{body, index}` lookup; (4) `flush_topl_more()` atop
`show_nhw_menu_text`. Promise == deliverable, all in one file.

## Inventory

New: `split_db_query` (local, `sym.mjs` single site `js/pager.js:732`).
Re-pointed: `lookup_data_base` → wrapper over new
`lookup_data_base_entry` (`sym.mjs` single site :702; only other caller
is :811, the `ia_checkfile` path — no dangling caller). No new module
edges (`flush_topl_more` pre-existing import, already used at :1869 and
:2389).

## C ↔ JS fidelity

Pass order (`pager.c:993`): `for (pass = !strcmp(alt, dbase_str) ? 0 : 1;
pass >= 0; --pass)` — alt first unless equal. JS `queries = (alt &&
alt !== dbase) ? [alt, dbase] : [dbase]`. Confirm.

Named/called split (`:951–976`, read): " named " wins the alt even when
" called " precedes it (truncate at " called ", alt past " named ");
else split at " called "; article strip `a|an|the` once; " (" suffix
cut on both pieces. JS `split_db_query` replicates all four rules on
the lowered full input *before* `simplify_for_db` (which also strips
tails — double-strip is idempotent here since the split already cut
them). Confirm for the corpus shape ("orcish barbarian called wizard"
→ alt "wizard", base simplified).

Same-entry skip (`:1052–1053`): pass 0 hitting `pass1offset` does `goto
checkfile_done` (res TRUE, entry already shown). JS `break` with
`shownIndex >= 0` → `return true`. Same outcome. Confirm.

Ask gate (`:1056–1072`): display iff `user_typed || without_asking ||
y_n()== 'y'`; `!yes` returns TRUE (found). JS identical incl. early
`return true`. Confirm.

didlook (`:1591–1616`): `found = 1` ("we have something to look up")
after the parenthetical — the old JS `found: orYou ? 2 : 1` skipped
checkfile via do_look's `found == 1` gate; returning 1 restores it.
do_look (`:1941–1949`): `(ans == LOOK_VERBOSE) ? chkfilDontAsk :
chkfilNone` — JS matches. Confirm.

More-before-menu: C `putmixed(WIN_MESSAGE, …)` at :1923 precedes the
checkfile call; the pending topline --More-- is serviced before the
menu paints. JS `flush_topl_more()` atop `show_nhw_menu_text` is that
ordering in JS terms, using the file's existing idiom. Broad surface
(every menu), but no-op when nothing pends; full fortress re-run guards
it (see Verification). Confirm as reasonable, evidence-backed.

Named omits (all disclosed): pm-derived dbase (:862–864),
makesingular/fruit alt (:990–996 — note C then runs *two* passes even
with no named/called; JS runs one; that behavioral delta is exactly the
named omit), supplemental_name (:956–958) + `do_supplemental_info`,
user-typed-miss text (pre-existing). Residual pre-existing nit (not
introduced here, not Must-fix): C also truncates dbase at `", "` when
no named/called is present; `simplify_for_db` has no comma rule. Map
debt at most — flagging here so a future checkfile iter can confirm.

## Hallucinations / overclaim

None. No new-edge claims to check (none added). "No DIAG/FORCE/seed
gates" true (ban grep 0).

## Density

~90 insertions, one file, one owner family — at the §2b ceiling but a
single practical envelope (checkfile + its two call-shape fixes). OK.

## Verification

- Rule #2 clean (global rulecheck). Ban grep 0.
- Re-measured `hidden-proxy.mjs verify x_monnam --base 48742ea2~1`:
  "1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS"
  (Knight-91128 PASS; Barbarian-92024 → done_in_by step 47) — matches
  D-log exactly.
- D-log records green/strict/cohort PLUS full `sessions` 44/44 as extra
  guard for the menu-sequencing change. Taken as recorded (justified:
  global menu entry touched).

## Actionable C-wrongs

None (comma-truncation nit is pre-existing map debt, not this delta).

Verdict: **ACCEPT**
