# Review 971 — d9e7079e — create_particular gender flags (D-2001)

Metadata: SHA `d9e7079e`, D-2001, Open-row port (`makemon.c`
makemon → `mkobj.c` next_ident order + monster gender; row cited
5/553, 6 blocked at baseline). js/ touches 1 file (`js/read.js`,
+81/−~15: parse + creation). `c-js-map/turns.md` updated. No stamp
owed (row cites no review).

## Intent vs deliverable

Subject promises: parse explicit `female `/`male ` terms (female
first) + `name_to_mon` gender out-param + explicit-vs-name merge,
and creation `MM_FEMALE`/`MM_MALE` (+ `MM_NOEXCLAM` only when
`genderconf == -1`), fixing ^G `elf-lord→elf-lady` /
`Elvenking→Elvenqueen` misnames and the spurious `rn2(2)` gender
roll. Diff actually adds: exactly that, plus same-edge imports
(`MM_MALE/MM_FEMALE`, `MALE`/`FEMALE`/`is_male`/`is_female`).
Promise == diff.

## Inventory

- Changed JS functions: `create_particular_parse` (gender-term
  blanking + merge), `create_particular_creation` (mmflags from
  `fem`/`genderconf`).
- Untouched callees (verified pre-existing): `name_to_mon(in_str,
  gender_name_var=null)` → `name_to_monplus` (mondata.js:405/320,
  writes `.gender` at :376/:395–396); `makemon` MM arms
  (makemon.js:2808–2811, forced-flag path before `rn2(2)`);
  `whichpm = mons(d.which)` + null guard (read.js:2451–2452).
- Deleted/re-pointed: `const mmflags = NO_MM_FLAGS | MM_NOEXCLAM`
  → conditional (C-correct: NOEXCLAM only in the no-conflict arm).
  No local clone → import re-point; `sym.mjs is_male →
  js/monsters.js:740 sync` informational.

## C ↔ JS fidelity

C loci (all read verbatim): parse init `read.c:3140–3150`
(`fem=-1`, `genderconf=-1`); blanking `:3186–3195` (`strstri(bufp,
"female ")` then `strstri(bufp, "male ")`, `memset` blank, then
`mungspaces`); merge `:3212–3229` (`name_to_mon(bufp,
&gender_name_var)`; explicit-wins, conflict → `genderconf`);
creation `:3275–3305` (`whichpm = &mons[d->which]` for the named
path; no-conflict arm: `fem != -1` + `!is_male && !is_female` gate →
flag, always `MM_NOEXCLAM`; conflict arm: explicit flag, no
NOEXCLAM); `makemon :1262–1266` (forced-flag arms, no draw).

- Merge/creation match C arm-for-arm incl. the `!whichpm ||`
  defensive guard (C `whichpm` non-null on the named path; JS null
  guard at :2452 makes the `||` dead-but-harmless), `MALE=0/
  FEMALE=1` values (C `fem=1` female / `0` male), and NEUTRAL-name
  fallthrough (`: 0`, same as C). ✓
- RNG: diagnosis refined correctly (not a reorder — JS drew a
  SPURIOUS gender `rn2(2)`; C draws nothing for forced gender),
  proven against the recorded C log. ✓
- **Gap (C-wrong #1):** C searches BARE substrings —
  `strstri(bufp, "female ")` has NO leading-boundary requirement.
  JS requires one (`asciiLow` prepends `' '` and searches
  `' female '`/`' male '`). Replicated-logic probe: all four D-log
  probes match C (`female elf-lord`→F, `male elf-lady`→M,
  `malebranche` untouched, trailing `dwarf female` no-hit), but
  `"shemale elf-lord"` → JS `fem=-1`, C `fem=0 (MALE)` — DIVERGE.
  The D-log rationale ("matching C `strstri` needing a literal
  trailing space") covers the trailing side only; the leading pad
  is strictly less faithful than a bare search (bare indices align
  directly, no pad compensation). One-iter fix, no corpus session
  affected. Minor same-hunk nit, same fix: comment says C
  `memset`s 7 blanks while the code splices one space (equivalent
  post-`mungspaces`, but align it while there).

## Hallucinations / overclaim

None beyond gap #1 (which is omission-by-design-doc, not a false
claim). The Knight-92130 residual is honestly triaged (step-90
`next_ident` is an object-wish `mksobj_init` path, quoted). Verify
bullet ran after the last edit (no D-1831 gap claimed, structure
supports it: single js file, final `verify.mjs` cited).

## Density

~81 insertions, one C function family (parse + creation halves of
`create_particular`). Right-sized per §2b.

## Verification

Re-measured myself: `hidden-proxy verify next_ident --base
d9e7079e~1` → `0 PASS, 3 moved past (1 still next_ident at a later
step), 3 unchanged, 0 worse → PROGRESS` — exact match to the D-log
(92175 → wishymatch@65; 92130 → next_ident@90; 91125 →
do_statusline2@82; 3 unchanged, 0 worse). Claim holds. Grep of the
js hunk: no `FORCE`/`DIAG`/`getRngLog`/seed/coordinate/
`fastforward`. Rule #2 clean.

## Actionable C-wrongs

1. Gender-term search requires a leading space C does not
   (`read.js` `asciiLow` pad vs `read.c:3186–3195` bare `strstri`;
   e.g. `shemale …` misses). Fix: search bare case-insensitive
   `'female '`/`'male '`, female-first, keeping re-`mungspaces`;
   align blanking splice with C `memset` width. → Must-fix (below).

Verdict: **QUALITY-RISK**
