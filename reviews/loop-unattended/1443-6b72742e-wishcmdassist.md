# Review 1443 — 6b72742e — wishcmdassist whole-body port (D-2484)

Metadata: SHA `6b72742e`, `js/zap.js` only (+62) + one import line.
C `zap.c:6165–6219` + caller `makewish :6323–6352`. D-log: D-2484.

## Intent vs deliverable

Promise: whole assistance window + `makewish` help-arm wire.
Diff delivers: new exported `wishcmdassist`, caller awaits it
with C's arg before clear + continue, prompt suffix fixed to
`iflags.cmdassist` per C `:6330`.

## Inventory

- Added: `WISHCMDASSIST_INFO` (15 lines), local `plur`,
  `export async function wishcmdassist(triesleft)`.
- Wired: `makewish` help arm (`MAXWISHTRY - tries`, clear,
  continue); prompt-suffix flag source fix.
- Callee closure (all LIVE): `show_text_pages` (pager.js:249,
  async, awaited). `imports.mjs --can`: zap.js already
  statically imports pager.js — no new edge at all.
- `sym.mjs`: `plur` is the 9th file-local copy (dungeon/end/
  insight/mon/polyself/region/shk/weapon precedent) — no shared
  exporter exists, so local is the only option; body (`n==1 ?
  '' : 's'`) matches C hacklib `plur`.

## C ↔ JS fidelity

- All 15 `wishinfo` lines verbatim (`SIZE - 1` excludes the
  trailing 0 = JS array end); wishless-conduct line while
  `!wishes`; blank; `retry_info` (cardinals 0–5 else "too
  many", `" more"` while `< MAXWISHTRY`, `plur`); `retry_too` +
  blank; suppress line while `iflags.cmdassist` — verbatim vs
  `:6195–6215`. RNG 0 both sides.
- Window mapping: `create NHW_TEXT` → `show_text_pages` (the
  path lock.js `help_dir` uses, same `game.nhDisplay` guard
  idiom at lock.js:223); `!win → return` = `!nhDisplay →
  return`.
- Caller: C `wishcmdassist(MAXWISHTRY - tries); buf[0]=0; goto
  retry` = JS await + `buf=''` + `continue` (MAXWISHTRY=5 at
  zap.js:2484). `/^help$/i` = `strcmpi "help"` (mungspaces
  pre-applied, pre-existing). The `flags.cmdassist` →
  `iflags.cmdassist` fix matches C `:6330` (`iflags.cmdassist`)
  — a real drive-by bug fix, C-cited.

## Hallucinations / overclaim

None. Named omits (DEBUG wish-history menu, retry-loop shape)
are pre-existing and untouched.

## Density

Right-sized: one 55-line C function + caller wire.

## Verification

- `hidden-proxy verify wishcmdassist --base 6b72742e~1
  --reach-all` (re-run): 0 blocked (coverage row, as stated);
  smoke 24/24 → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
