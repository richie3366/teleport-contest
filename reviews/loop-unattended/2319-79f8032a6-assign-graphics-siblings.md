# Review 2319 — 79f8032a6 — assign_graphics + 8 siblings

Metadata: SHA `79f8032a6`, D-3364, C `symbols.c` (9
functions, all one C file). Stat: 6 js files (+98/−24),
8 siblings zero-touch declares, ledger +9 rows.

Intent vs deliverable: subject promises "assign_graphics
showsyms copy + restore wiring + showsyms-reader fixes; 8
siblings declared". Diff actually: showsyms_defaults +
ov-first copy + SYM_OFF_O/M/W, 2 detect + 1 botl slot
fixes, save restore wiring, 2 comment-only files. Matches
promise — but one stale declare is false (C-wrong 1).

Inventory (assign_graphics): 1 whole **C callee** port
(copy loop + 196-slot defaults) + 4 reader/call-site edits.
Callees all LIVE (ov tables, DEFSYMS generated leaf,
DEF_OC_SYM/R_SYM, MONSYM row, def_warnsyms, X switch
data). No stub. Named: :249 reset_glyphmap (by-design,
fortress guard ✓), get_othersym read-through (by-design),
do_symset caller (ledger by-design ✓), gp/gr null (init
by-design; readers undefined-safe ✓).

Inventory (init_ov_rogue/primary_symbols): zero-touch
declares; JS `.fill(0)` ≡ C zero loops ✓.

Inventory (set_symhandling): zero-touch declare — FALSE.
JS `known_handling` (const.js:2917) holds 4 strings; C
(:376–384) holds 6 ("CURS", "MAC" missing). Worse than
missing arms: "UTF8" resolves to index 3 in JS vs 5
(H_UTF8) in C, while JS H_* consts are C-exact (0–5) and a
reader compares `=== H_UTF8` (options.js:12798). Declared
"none in-body — whole C body live", ledger "ported", yet
the ledger itself measures C 7/JS 5 PARTIAL. No JS callers
yet (C caller inside by-design parse_sym_line) → latent,
but the stamp is false. C-wrong 1.

Inventory (savedsym_free/add/strbuf): zero-touch declares;
free = GC-equivalent clear ✓, add = find→replace/prepend
with find inlined exactly per C :725–736 ✓, strbuf =
ROGUE-prefix loop ✓. All whole.

Inventory (match_sym): zero-touch declare; G_ reject,
:/= cut + space-backoff, loadsyms scan, 10/10 alternates
+ exact re-resolve ✓. The `len>=strlen`+strncmpi ≡
`len===` reduction is sound (C reads past NUL on longer
len, so only equal-length hits — the JS comment proves
it). Whole.

Inventory (parsesymbols): zero-touch split declare;
Seg covers the scan/quote rules, comma recursion,
colon-or-= split, mungspaces ×2, match_sym (:12790 ✓),
G_ arm, UTF8 vs sym_val arms, savedsym_add (:12810 ✓);
export wraps the shared buffer; recursion at :12771 ✓.
Callee closure all LIVE (match_glyph, glyphrep_*,
sym_val, update_ov_*). Whole.

C ↔ JS fidelity (assign_graphics): slot-by-slot confirm,
no RNG in C or JS. P: DEFSYMS (table verified in 2318) +
rogue +/% at C-exact slots (S_ndoor/vodoor/hodoor =
12/13/14, S_up/dnstair = 25/26, both sides ✓). O: all 17
primary syms match defsym.h OBJCLASS rows (COIN='$' at 12
via OBJCLASS2 ✓; JS class consts 0/1/12/17 = C ✓);
rogue = sparse 3 + COIN '*' + primary fallback ≡ C
def_r_oc_syms :72–82 (armor/amulet/food/gold deltas ✓);
[0] = 0 ≡ C '\0' placeholder ✓. M: 60-char row
byte-equal to C MONSYM(1..60) incl. 53–60 `@ <sp> ' & ;
: ~ ]` (re-extracted from defsym.h each side) + [0] = 0
✓. W: 6 warnsyms '0'–'5' ✓. X: [' ',' ','`','I',0,0] at
C-exact misc-symbol indices (BOULDER=2→ROCK '`',
INVISIBLE=3→'I'=MONSYM(35), PET/HERO→0 per `#if 0`) ✓;
init-time read-through-falls-to-switch reasoning sound
(ov + self slots 0 at init). Copy loop ov-first ✓;
ROGUESET/PRIMARYSET+default ✓; MSDOS/TILES compiled out
✓. Readers: detect ×2 = C :629/:1348 ✓; botl gold =
C :1566/:1569 ✓ (D-log ":1579" is a pre-existing wrong
citation carried over — code exact, nit); save =
C :905–906 with :910 ball&chain order ✓. Callers:
do.c:1667 gate C-exact ✓, options ×2 pre-existing ✓,
restore new ✓, do_symset named ✓.

C ↔ JS fidelity (init_ov ×2): `.fill(0)` ≡ zero loop.
Confirm ×2.

C ↔ JS fidelity (set_symhandling): C-WRONG (see
Inventory). C :656–669 + :376–384 vs 4-string table.

C ↔ JS fidelity (savedsym ×3, match_sym, parsesymbols):
confirm per Inventory — each whole body in C order.

Hallucinations / overclaim: (a) the set_symhandling
"whole C body live" declare is false (C-wrong 1, not a
characterization quibble). (b) botl ":1579" citation
(pre-existing, code exact). (c) "no --can needed" for the
DEFSYMS edge — accepted: generated file has 0 imports
(leaf; --can doesn't index generated), precedent cited.

Density: 9-function single-C-file cluster (≤10 ✓, no
Must-fix bundled ✓), each with D-log C-locus/Callers/
Verify/Named + `Ledger:` + combined `verify.mjs` (syntax,
rule2, green/strict/cohort, full 44/44 shared-display ✓)
+ C-oracle probes (slots re-verified here independently).
Per function: assign_graphics ACCEPT; init_ov_rogue
ACCEPT; init_ov_primary ACCEPT; set_symhandling
QUALITY-RISK; savedsym_free ACCEPT; savedsym_add ACCEPT;
savedsym_strbuf ACCEPT; match_sym ACCEPT; parsesymbols
ACCEPT.

Verification: re-measured in one call — `verify <9 fns>
--base 79f8032a6~1 --reach-all` → all nine "0 blocked" +
"smoke 24/24 → REACH-OK", 0 regressed; matches the D-log
(coverage rows cited 0 blocks). `--can`: botl/detect/
save→display + botl→objects all ALREADY (brace
extensions). Rule #2 clean. Diff grep: 0 banned hits.
`sym.mjs` (required paste; no symbol deleted — imports
only):

```text
match_glyph      js/glyphs.js:253   sync
glyphrep_to_custom_map_entries js/glyphs.js:735   sync
sym_val          js/options.js:12623   sync
parsesymbols     js/options.js:12825   sync
update_ov_primary_symset js/display.js:4056   sync
```

Callee closure LIVE; nothing re-pointed away.

Actionable C-wrongs:

1. set_symhandling missing CURS/MAC arms + UTF8
   misnumbered — Must-fix row (add the 2 strings per C
   :376–384; restores indices incl. UTF8=5; no callers →
   behavior-neutral).

**Addressed:** D-3365

Verdict: **QUALITY-RISK**
