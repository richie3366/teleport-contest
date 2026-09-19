# Review 1514 — bdd6846f — files.c create_levelfile (D-2555)

## Metadata

- SHA: `bdd6846f`
- D-id: D-2555. Next index: 1514.
- Files: `js/files.js` (+71: exported `create_levelfile` +
  `WRITING` import + comment refresh),
  `scripts/create-levelfile.test.mjs` (+57, new).
- C locus: `nethack-c/upstream/src/files.c:620–670`
  (`create_levelfile`, 51 L; `csym.mjs` range, cited as
  that range).

## Intent vs deliverable

Subject promises: the write side of the level-file pair in
C order as a JSON-analogue mirror of the shipped
`open_levelfile` (D-2472). Diff delivers exactly that plus
a committed test (3/3). Promise matches deliverable. No RNG
in C; none added (the D-log's `rng.js:126` note is a
single-letter lookup false positive, not a draw).

## Inventory

- New: `create_levelfile(lev, errbuf)` (exported sync),
  one const import (`WRITING`, same-module edge).
- Callees, all LIVE: `set_levelfile_name`
  (`js/files.js:668`), `fqname` (`:512`), `new_nhfile`
  (`:577`), `viable_nhfile` (file-local `:622`,
  pre-existing D-2472 clone — unchanged by this SHA,
  used the same way by both pair sides),
  `open_levelfile`-convention `{ s }`-or-null errbuf.
- No deleted or re-pointed symbols → no clone→import audit.

## C ↔ JS fidelity

Body vs C `:620–670`, in order:

- `:627` errbuf clear → `if (errbuf) errbuf.s = ''` ✓.
- `:628` `set_levelfile_name(gl.lock, lev)` (void,
  mutates) → `game.lock = set_levelfile_name(…)` store-back
  ≡ mutation (D-2538 precedent) ✓.
- `:629` `fqname` kept via `void fq_lock` — positional VFS
  probe needs no path, but the call stays in C order so the
  prefix/impossible arms inside `fqname` still run ✓.
- `:631–642` handle init: `NHF_LEVELFILE`, `WRITING`,
  structlevel TRUE / fieldlevel FALSE, addinfo/style FALSE,
  binary TRUE, `fnidx = historical`, `fd = -1`, `fpdef`
  null — all present with `:line` cites. Const values
  verified here: `WRITING = 0x02` (`hack.h:958–960` ✓),
  `NHF_LEVELFILE = 1` (`:954` ✓), `historical = 1`
  (`hack.h:976` ✓ vs `FNIDX_HISTORICAL = 1`, pre-existing
  file-local shared with the read side),
  `LFILE_EXISTS = 0x04` (`dungeon.h:170` ✓).
- `:643–655` creat arms → stash-slot ensure + `fd = lv`
  token (the `open_levelfile` convention — C callers only
  bufon/savelev/close the handle). Platform arms
  (MICRO/WIN32 O_TRUNC, MACOS9 maccreat) + FCMASK/errno
  named with the map row ✓.
- `:657–662` `fd >= 0 → |= LFILE_EXISTS` ✓ (OR into
  `game.level_info[lv].flags`, the `svl.level_info`
  analogue); the else-if `Sprintf` arm is present with
  `ENOENT = 2` (file-local precedent) but unreachable
  under VFS — disclosed, not dropped. (For negative `lv`
  it would fire; C callers pass ledger numbers ≥ 0, so
  both sides agree it never does.)
- `:663–667` setmode named (platform) ✓.
- `:668–669` `return viable_nhfile(nhfp)` ✓.
- Callers (`do.c:1357`, `restore.c:760`, `save.c:390` —
  all `whynot`-errbuf sites in unported wrappers) named in
  the map; zero JS callers today, and unlike the campaign
  bare-reference pattern there is nothing unresolved to
  trip over — the function is self-contained.

## Hallucinations / overclaim

None. "Failure arm present-but-unreachable" is accurate
(the arm text exists; VFS ensure cannot fail); "mirroring
the shipped open_levelfile JSON analogue" holds field for
field.

## Density

One 51-line C function + test, two files, ~130 insertions.
Right-sized per §2b.

## Verification

- D-log: `verify.mjs --fn create_levelfile` → PASS
  (syntax, rule2, 0 blocked, smoke 24/24 REACH-OK, green
  2/2 + strict ×2, cohort 7/7) + focused test 3/3.
- Re-run here: `hidden-proxy.mjs verify create_levelfile
  --base bdd6846f~1 --reach-all` → 0 blocked both trees
  (vacuous, honestly reported) + smoke 24 PASS, 0
  regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates
  or hardcoded coordinates. No `fs` — VFS-slot only.

## Actionable C-wrongs

None. Fields, const values, errbuf convention, caller map,
and the platform omissions all check out against pinned C.

Verdict: **ACCEPT**
