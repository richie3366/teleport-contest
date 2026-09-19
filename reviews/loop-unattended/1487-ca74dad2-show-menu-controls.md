# Review 1487 — ca74dad2 — options.c show_menu_controls (D-2528)

## Metadata

- SHA: `ca74dad2`
- D-id: D-2528. Next index: 1487.
- Files: `js/dokeylist.js` (144-line restart), `js/options.js` (+102),
  `js/const.js` (+3), `scripts/show-menu-controls.test.mjs` (+81, 5 cases).
- C locus: `options.c:9069–9174` (`show_menu_controls`, 106 L) +
  tables `default_menu_cmd_info` `:314–340`, `wc2_options` `:9823–9842`,
  `wc2_supported` `:9965–9976`, `get_menu_cmd_key` `:8093–8104`.

## Intent vs deliverable

Subject promises: whole `show_menu_controls` in C order (MISSING → live)
plus the option-table ports it needs. Diff actually adds: restarted
`show_menu_controls` (`js/dokeylist.js:120`), the four options.js exports,
three consts, and a focused test; deletes the divergent `MENU_CMDS` clone.
Promise matches deliverable.

## Inventory

- Changed: `show_menu_controls` (restart; old
  `show_menu_controls_lines` kept as a delegating alias so both callers
  stay wired).
- New exports: `default_menu_cmd_info`, `get_menu_cmd_key`,
  `wc2_supported`, `wc2_options` (+ file-local `mapped_menu_strings`,
  `windowprocs_wincap2` — correct homes, C `static`/struct reads).
- New consts: `MENU_SHIFT_RIGHT='}'`, `MENU_SHIFT_LEFT='{'`
  (exact per `wintype.h:155–156`), `WC2_EXTRASTATUS=0x080000`.
- Deleted (required paste): `MENU_CMDS` → `NOT FOUND in js/**` (clone
  gone, no re-add). New-name pastes: `show_menu_controls` →
  `js/dokeylist.js:120 sync`; `default_menu_cmd_info` →
  `js/options.js:777 export const`; `get_menu_cmd_key` → `js/options.js:
  767 sync`.

## C ↔ JS fidelity

Tables verified verbatim against C: `default_menu_cmd_info` (13 entries,
C order, sentinel = array end), `wc2_options` (19 entries incl. the
spaced `status hilite rules`, C order), `wc2_supported` (name loop +
`(wincap2 & bit)`), `get_menu_cmd_key` (`indexOf` ≡ `strchr`, first-hit
remap else identity; single-char strings carry C `char`, so
`.charCodeAt(0)` in `menuKeyShown` is exact). `mapped_menu_strings`
returns empty/empty when unset ≡ fresh C `n_menu_mapped=0` (aliases named:
`add_menu_cmd_alias`/BIND parsing untouched — the data's writer).
`windowprocs_wincap2` (unset bag → 0) matches the contest tty (no wincap2
bits; cf. `allmain.js:198` read shape cited in the message).

Body walk: `:9088` shift gate → `hasMenuShift` once; `:9094` title;
dolist `:9101–9108` over the table (desc-terminated in C, array in JS —
same set) with the `:9102–9104` shift skip and `%-7s %s` shape
(`fmtLeft`, pre-existing); `:9110–9111` vs `:9152–9153` fmt/arg per arm
(`%s%-7s %s`/`""` vs `%9s  %-8s %s`/`"Other "`, trailing loop resets
`arg` — exact); headers, Select/Invert/Deselect, four Go-to rows,
`:9138–9145` Pan-view gate (absent in the old code — the stale
`menu_shift` omission is closed), `:9146–9151` Search with the verbatim
`Exter` typo + separator, `:9155–9159` hardcoded loop over verbatim
`HARDCODED_MENU` (5 pairs, array end = sentinel). The old hardcoded
key chars (`.`, `@`, `>`, …) are now rebound-map lookups — the actual
behavioral fix. No RNG in C; none in JS (display-only help text).

Callers: `cmd.c:2985` dokeylist TRUE → `dokeylist_lines :529` ✓;
`pager.c:2824` domenucontrols FALSE → `domenucontrols_lines :559` →
`pager.js:3136` ✓. Both pre-existing paths, now C-order bodies.
`--can dokeylist.js options.js get_menu_cmd_key`: ALREADY — no new edge,
no TDZ surface. No STUB in any arm.

## Hallucinations / overclaim

None. The "CHECK-safe" edge claim re-verified as ALREADY. The named omits
are the data's writer (`add_menu_cmd_alias`), sibling functions, and
non-tty wincap2 bits (shift arms covered by the focused test's
shift-capability cases instead of sessions — honest scoping for
display-only text).

## Density

One 106-line C function + its four small table/helpers, three `js/`
files + a `scripts/` test. One display family; under caps.

## Verification

- D-log: syntax (3 changed) · rule2 · hidden note (0 blocked) · smoke
  24/24 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS;
  focused test 5/5.
- Re-run here: `hidden-proxy.mjs verify show_menu_controls --base
  ca74dad2~1 --reach-all` → 0 blocked at baseline and working tree
  (vacuous note, honestly reported — the row cited no blocks) + smoke 24
  PASS, 0 regressed → REACH-OK; focused test re-run: 5 pass, 0 fail.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate logic.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
