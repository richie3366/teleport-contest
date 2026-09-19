# Review 1539 — 86020ad6 — files.c make_converted_name (D-2580)

## Metadata

- SHA: `86020ad6`
- D-id: D-2580. Next index: 1539.
- Files:
  - `js/files.js` (+101: `make_converted_name`, `contains_directory`,
    `delete_convertedfile`, HACKDIR const, filename statics).
  - `js/bones.js` (+8/−2: `delete_bonesfile` converted arm).
- C locus:
  - `nethack-c/upstream/src/files.c:2089–2153`
    (`make_converted_name`, staticfn).
  - `nethack-c/upstream/src/files.c:2179–2191`
    (`contains_directory`, extern via extern.h:1130).
  - `nethack-c/upstream/src/files.c:2156–2165`
    (`delete_convertedfile`, sole caller of the former at `:2160`).
  - `nethack-c/upstream/src/files.c:993–1001` (`delete_bonesfile`
    caller).
  - All ranges `csym.mjs`/read verified this iteration.

## Intent vs deliverable

Subject promises: whole-body port in C order (null-FALSE, GC-drop,
bare-vs-dir, HACKDIR fallback + needsep arithmetic, unconverted
concat, `.exportascii`, TRUE) + the bones caller. Diff delivers that.
Promise matches deliverable.

## Inventory

- New, all exported (`sym.mjs` single each, pasted here):
  - `make_converted_name` (`js/files.js:1197`).
  - `contains_directory` (`js/files.js:1181`).
  - `delete_convertedfile` (`js/files.js:1247`).
- Export (not file-local) is correct: `delete_convertedfile` is
  extern-called from bones.c, and `contains_directory` is extern via
  `extern.h:1130`.
- Callees: none beyond string ops — C `alloc`/`free` = GC,
  `Snprintf`/`Strcpy`/`Strcat` = concat (all named in the header
  comment). No RNG. No deleted symbols. No clones.

## C ↔ JS fidelity

Walked against C `:2089–2153`:

- Null → FALSE (`:2097–2098`; `== null` also covers undefined —
  benign house extension). Match.
- Free-both-names → ref drops (`:2103–2106`, JS GC). Match.
- SHORT_FILENAMES ms-dos note → comment only (`:2108–2110`). Match.
- `ln = strlen` (`:2112`). Match (bookkeeping; alloc needs no sizes).
- Bare-vs-dir via live `contains_directory` (`:2113`). Match —
  separators `\\` / `/` / `:` verified against C `:2183–2186`, exact.
- Dir resolution (`:2114–2130`):
  - `nh_getenv` NETHACKDIR/HACKDIR arms → named Rule #2 omits
    (SHOPTYPE precedent). Honest: when the env names a dir, C uses it
    and JS uses HACKDIR — disclosed, dual-runtime ground.
  - WIN32 home-folder arm → named platform omit. Honest.
  - `#ifdef HACKDIR` compile-time fallback ships live:
    `/usr/games/lib/nethackdir`, verified at `config.h:447`. Match.
- `c_eos`-minus-one inlined as last-char read with the `/` / `\\` /
  `:` needsep test + `ln` bookkeeping (`:2131–2139`). Match.
- `"%s%s%s"` concat (`:2142–2145`). Match.
- `.exportascii` + TRUE (`:2147–2152`). Match.
- `delete_convertedfile` mirrors `:2156–2165` line-for-line: lazy make
  (`:2159–2160`), unlink named Rule #2 omit (`:2162`), return 0
  (`:2164`). Match.
- Bones caller mirrors `:993–1001`: unlink result kept, converted
  cleanup added, `!(reslt < 0)` preserved — with the bare-filename
  fqname precedent consistent with the pre-existing unlink line. Match.

## Hallucinations / overclaim

None. Every omit (env, WIN32, unlink, `free_convert_filenames`,
`delete_savefile` arm) is named with its C line and Rule #2 ground —
none presented as live.

## Density

~109 `js/` insertions for a 65-line staticfn + two small companions +
caller — one function family, right size (§2b).

## Verification

- D-log claims VERIFY PASS with smoke REACH (no RNG-tagged reach).
- Re-ran here (required):
  - `hidden-proxy verify make_converted_name --base 86020ad6~1
    --reach-all`
  - → 0 blocked both sides (vacuous note, expected)
  - → smoke 24/24 REACH-OK.
- Claim confirmed. The `/tmp/smoke-mcn.mjs` probe claim (null/sep/dir
  arms, bones path) is consistent with the read body.
- Diff grep: no FORCE/DIAG/seed/coordinate/`fastforward` content.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
