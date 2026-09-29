# Review 2040 — 10017887d — sfbase.c save-file base (D-3080)

Metadata: SHA `10017887d`, D-3080, js/files.js (+255/−12) +
js/const.js (+2). 9 functions: sf_log + 5 sfi/sfo ports +
3 sfvalue helpers; 7 Ledger rows (2 helpers uninventoried
— tooling gap, disclosed).

## Intent vs deliverable

Promise: head sf_log + 5 same-file rows + 3 sub-8-line
helpers; rewire the fplog arms and uptodate :736 off
their named omits. Diff delivers all nine exports, the
TURN_OFF_LOGGING const, 7 sf_log call sites and the
uptodate call. Kept — with one value-level C-wrong
(complex_dump, below).

## Inventory (per function)

- `sf_log` (NEW :1285 export): fplog/dolog gate,
  rcount/wcount select; fprintf+fflush named omit
  (Rule #2). Zero live callees.
- `sfi_char` (NEW :1153): mode save/fiddle/restore,
  sfo_char convert-back, fplog arm. Structlevel +
  fieldlevel procs named omits (binary mread / null
  slot, sfstruct cites).
- `sfo_genericptr` (NEW :1189): fplog arm first, then
  struct omit / field fplog save-null-restore.
- `sfi_genericptr` (NEW :1213): sfi_char shape with
  sfo_genericptr convert-back.
- `sfi_version_info` (NEW :1246): sfi shape +
  SFCTOOL_BIT set before convert-back.
- `sfvalue_char` (NEW :1306): charBytes + 119 cap.
- `sfvalue_genericptr` (NEW :1316): "0"/"glorkum".
- `sfvalue_uchar` (NEW :1327): %03u.
- `complex_dump` (NEW :1359): ten %03x groups —
  WITH TRAILING SPACE C lacks (see below).
- Local `version_info_bytes` (representation helper,
  not a C function): 10-byte LE image. sizeofs: char
  1 ✓, ptr 8 LP64 ✓, version_info 24 (3 longs,
  global.h:349–351, incarnation first ✓).

## C ↔ JS fidelity (per function)

sf_log (C :376–404): fplog read ✓, dolog gate ✓
(TURN_OFF_LOGGING 0x20 = UNCONVERTING<<1, sfbase.c:15
✓), WRITING→rcount/wcount ✓ (bits 0x02/0x08/0x10 ≡
hack.h:960–963 ✓), commented increment stays dead ✓,
VMS shape out ✓. Confirm.

sfi_char (C :264–287): struct/field shape ✓, mode
fiddle exact ✓, convert-back via live sfo_char ✓,
fplog arm (1, cnt, sfvalue_char) ✓. sfi_genericptr
(C :305–327) and sfi_version_info (C :347–372) same
shapes ✓ incl. the :365 `|=` before convert-back
(`>>> 0` u32 ✓). sfo_genericptr (C :289–304): LOG
ARM FIRST then struct/field ✓ order exact, fplog
save/null/restore ✓. Confirm all four.

sfvalue_char (C :406–421): n≤119 ≡ byte copy ✓;
n>119 truncates where C overruns (UB — cap disclosed
as intent, sane) ✓. sfvalue_genericptr (C :459–467):
"0"/"glorkum" verbatim ✓ (+ JS null/undefined ≡ NULL).
sfvalue_uchar (C :492–500): %03u ✓, &0xff ✓.
Confirm all three. Same-line C signatures verified
by direct read (:406, :492) — csym/ledger genuinely
can't see them, so the missing Ledger rows are a
disclosed tooling gap, not a skip.

complex_dump (C :624–639): format has 9 inner spaces
and NO trailing space → 39 chars + NUL at buf[39];
`buf[40]='\0'` (:637) is one PAST the terminator
(redundant). JS appends `+ ' '` → 40 chars WITH
trailing space (demonstrated: len=40 on live export).
C-WRONG — currently unobservable (sole consumer is
sf_log's voided txtvalue), fix = drop the space.
Per-function verdict: WITH-DEBT.

Callers: 7 sf_log sites wired (:1071/:1097/:1122/
/:1172/:1191/:1231/:1266 ✓); sfo_genericptr ← :321
✓; sfi_version_info ← uptodate :736 (js:1577 ✓);
unported-host feeds (SF_A sfi, SF_C, SF_X, ~25 Sfi_
sites) all named with "no JS home" ✓. Confirm.

sym.mjs: no deleted/re-pointed symbols (pure adds +
stub→call rewires on pre-existing names) — no output
required.

## Hallucinations / overclaim

YES — one, precise: "ten %03x groups + spaces, 40
chars exactly (:637 lands on the Snprintf
terminator)". :637 does NOT land on the terminator
(it lands one past it), and C yields 39 chars, not
40. The justification miscounts the format string.
No other overclaim; the 7/9 Ledger split and the
binary-proc omits are all disclosed with reasons.

## Density

9 whole functions, one C file, ~255 ins — §2b-shaped
✓ (≤10). `Ledger:` 7 ported, 2 disclosed-absent.
Per-function verdicts: 8 ACCEPT + complex_dump
WITH-DEBT.

## Verification

Re-measured `hidden-proxy verify <all nine> --base
10017887d~1 --reach-all`: 0 blocked each (honestly
vacuous) + nine 24/24 smokes → REACH-OK, 0 regressed
✓. Ban-grep clean. Rulecheck clean (2033).

## Actionable C-wrongs

1. `complex_dump` trailing space: drop `+ ' '` (C
   yields 39 chars, no trailing space; :637 is
   redundant, not a 40th char). Unobservable today
   (sink voided) — tracked as live debt, not Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
