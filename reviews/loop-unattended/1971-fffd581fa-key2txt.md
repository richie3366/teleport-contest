# Review 1971 — fffd581fa — cmd.c key2txt C-wrong fix (D-3011)

Metadata: SHA `fffd581fa`, D-3011, single-function `cmd.c`
correction + clone merge + two stale retirements. Stat:
`js/dokeylist.js` +13/−6ish (per-arm cites, `\r` arm
dropped), `js/pager.js` +17/−35ish (clone deleted, import
added, one call re-pointed to visctrl),
`scripts/key2txt.test.mjs` new (35 lines, 3 tests). No
prior review file on disk.

## Intent vs deliverable

Subject promises removing the invented `\r → <enter>` arm,
merging the pager clone into the export, and retiring
compactify + invoke_create_portal stale. Diff actually
does all three. Promise and diff match.

## Inventory

- `key2txt` (FIXED, exported sync, `js/dokeylist.js:76`):
  `\n`-only `<enter>` arm with per-arm `:line` cites.
- Deleted: file-local `key2txt` clone in `js/pager.js`
  (repeated the `\r` invention, dropped the visctrl
  M-/^? arms) → import of the export on the pre-existing
  dokeylist.js edge (no new edge — the hunk adds the name
  to an existing import).
- Re-pointed: `dowhatdoes` unknown-key label
  `key2txt(q)` → `visctrl(q)`.
- New: `scripts/key2txt.test.mjs` (four arms + `\r → ^M`
  + visctrl delegation).

## C ↔ JS fidelity

`key2txt`, `csym` `cmd.c:3224–3240` (17 lines, read whole
with the JS): `' ' → <space> :3229` ✓; `'\033' → <esc>
:3231` ✓; `'\n'` ONLY `→ <enter> :3233` ✓ (the
`|| c === 13` deletion is the fix — C `'\r'` falls to
`:3237` `visctrl` → `"^M"`); `'\177' → <del> :3235` ✓;
else `visctrl((char) c) :3237` ✓. Pre-fix probe
(export returned `"<enter>"` for 13 vs C `"^M"`)
confirms the C-wrong was real, not theoretical.

Callers: 19 C refs; the ones with JS sites use the shared
export (pager `pager.c:2593` key2txt ✓; `dowhatdoes`
unknown-key label → `visctrl(q)` — verified against
`pager.c:2711` which reads `visctrl(q)` in the "No such
command" pline, so the re-point matches C exactly, not
just plausibly ✓). Named omits, all verified in-session:
`:229` cmdq_print — whole function commented out in C
(`/*` at `:217`, confirmed) ✓ dead both sides; `:2959`
`"[%s]"` — `#else` arm of `#ifndef NO_SIGNAL`, and
NO_SIGNAL is absent from the contest unix headers
(`unixconf.h`/`config.h` clean; the one `#define
NO_SIGNAL` in-tree is `windconf.h:192`, the Windows-NT
port header with `_MSC_VER`/PC-glyphmap context — not
the Sysunix build) ✓ compiled out; `:5551` dumplog —
`#ifdef DUMPLOG_CORE`, retired by design (D-1776, and
NOTES forbids re-enqueue) ✓. Window-lifecycle names
untouched ✓.

Clone resolution (required `sym.mjs`, pasted): `key2txt
js/dokeylist.js:76 sync` — exactly one definition left
in the tree; the pager clone is gone. No second copy.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed hits.
Rule #2 clean (re-verified 1963). Test re-run here:
`node --test scripts/key2txt.test.mjs` → 3 pass / 0 fail
(matches the D-log claim).

## Hallucinations / overclaim

None. Every named omit was verified against pinned C
above (including the NT-header scare on NO_SIGNAL,
resolved in favor of the D-log). No dispatch-over-stub.

## Density

Single-function correction + clone merge, ~+30 net lines
with a committed regression test — small but this is a
Must-fix-shaped C-wrong repair (wrong key label on a
shared export) plus two stale retirements, not a coverage
row. Whole function, callers wired-or-named → OK.

## Verification

D-log: `verify.mjs --fn key2txt` → syntax (2 files) ·
rule2 · note hidden + REACH-OK (smoke 24) · green 2/2 ·
strict ×2 · cohort 7/7 · VERIFY: PASS. Re-measured here
(`--base fffd581fa~1 --reach-all`): 0 blocked at baseline
and in the working scoreboard +
`fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK` (observed in-session). Honest vacuous note.
Zero REGRESSED. No seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None. (The SHA itself FIXES a C-wrong; nothing new found.)

Verdict: **ACCEPT**
