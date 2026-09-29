# Review 2045 — 590ebd616 — wiz_mon_diff + wiz_show_vision pair (D-3085)

Metadata: SHA `590ebd616`, D-3085, js/wizcmds.js (+93/−2). Two-function
coverage cluster (both MISSING) + 8 ledger-hygiene resolutions (7
stale-ported + 1 by-design).

## Intent vs deliverable

Promise: port the wizcmds MISSING pair whole in C order — mon_diff with
title const, NUMMONS walk + sentinel break, live mstrength, trouble
gate, mlev clamp, printf-parity format, show_text_pages; vision with the
Flags line, viz-array rows, trailing trim, show_text_pages. Diff
delivers both bodies exactly as promised — but wires neither into the
runnable extcmd dispatch although both C table entries are live (below).
Bodies kept; dispatch missed.

## Inventory (per function)

- `wiz_mon_diff` (NEW export js/wizcmds.js:2016): title const, trouble/
  lines, NUMMONS walk with `!mlet` break, mstrength/difficulty/mdiff,
  post-incr trouble gate, mlev 50-clamp, padEnd/padStart format line,
  no-discrepancies line, show_text_pages, ECMD_OK. Callees: mstrength
  LIVE (new mondata.js import, edge pre-exists), show_text_pages LIVE
  (pager idiom), mons/pmnames/NEUTRAL/NUMMONS/ECMD_OK LIVE. No clones,
  no stubs.
- `wiz_show_vision` (NEW export js/wizcmds.js:2059): Flags hex line,
  blank line, ROWNO×(1..COLNO) rows with u_at '@' / viz chars, trim,
  show_text_pages, ECMD_OK. Callees: u_at LIVE (pre-imported export;
  the teleport/zap u_at locals are pre-existing elsewhere), viz data
  read, show_text_pages LIVE. No clones, no stubs.
- Imports added: COULD_SEE/IN_SIGHT/TEMP_LIT/NEUTRAL (const),
  pmnames (generated), mstrength (mondata). No deleted/re-pointed
  symbols.

## C ↔ JS fidelity (per function)

wiz_mon_diff (C wizcmds.c:1789–1828): title string char-exact ✓
(`"Review of monster difficulty ratings [index:level]:"`); loop visits
exactly indices 0..NUMMONS−1 with cnt≡index both sides (C stops at the
mlet-0 terminator monst.c:56–62 `MON(NAM(""), 0, …)`; JS has no falsy
mlet in range — verified first-!mlet = none — so the NUMMONS bound fires
instead; same visited set, same cnt — the D-log's "bound never fires
first" is backwards wording with a true parity conclusion) ✓;
mstrength ✓ (live sync js/mondata.js:1238); `difficulty|0`,
mdiff, `if (mdiff)` ✓; `if (!trouble++)` post-incr ✓; mlev clamp ✓;
format `"%-18s [%3d:%2d]: calculated: %2d, hardcoded: %2d (%+d)"` ≡ the
padEnd(18)/padStart(3,2,2,2)/sign-arm template — pad* never truncate,
C never truncates below BUFSZ here, `%+d` ≡ `(mdiff<0?'':'+')+mdiff` ✓;
name `pmnames[i][NEUTRAL]` index-aligned with mons(i) (verified
pmnames[0]="giant ant" ≡ mons(0)) ✓; no-discrepancies string exact ✓;
display/destroy → show_text_pages (file idiom, wiz_show_seenv
precedent) ✓; ECMD_OK ✓. No RNG. Body: confirm.

wiz_show_vision (C wizcmds.c:620–653): Flags `%x` trio ≡
`toString(16)` with C values 0x1/0x2/0x4 (vision.h:8–10) ≡ JS
const.js:1076–1078 ✓; blank putstr ✓; y/x bounds ✓; u_at '@' ✓;
`v==0?' ':'0'+v` ≡ fromCharCode(48+v) ✓ (`|0` on the `?.` chain only
touches absent-data, C-valid identical); trailing trim equivalent
(C breaks at last non-space + NUL, all-space → x=0 → empty; JS
end-scan → slice, all-space → '') ✓; `&row[1]` ≡ the 0-based run ✓;
display TRUE/destroy → show_text_pages ✓; ECMD_OK ✓. No RNG. Body:
confirm.

CALLERS — the gap. `csym --callers` reports 0 references for both, and
the D-log concludes "uncalled debug review commands — no JS caller to
wire". Direct C read refutes it:

- "vision" → wiz_show_vision, cmd.c:1928–1929, UNCONDITIONAL
  (IFBURIED|AUTOCOMPLETE|WIZMODECMD). JS has the generated EXTCMDLIST
  row (vision, flags 7) and the EXT_CMD_AC row — but no EXT_CMDS
  runnable entry, so `#vision` in wizard mode hits
  extcmd_run_by_txt → null (dead end) where C dumps the array.
- "wizmondiff" → wiz_mon_diff, cmd.c:1985–1987, `#if DEVEL ||
  DEBUG` — LIVE in the pinned game build because patchlevel.h:35–37
  defines DEBUG unconditionally (D-2779 already established this).
  JS has only the AC-list row — no runner either.

D-2779 (wiz_show_seenv + wiz_migrate_mons) hit the identical "0
references" trap, documented it ("scope-limited: both are wired through
cmd.c extcmdlist function pointers"), and wired both EXT_CMDS runners
**in the port commit**. This SHA repeats the trap and ships both
commands as dead ends. Both functions: unwired C caller.

`sym.mjs` output (Method §3 — new import + consts):

```text
mstrength        js/mondata.js:1238   sync
show_text_pages  js/pager.js:241     ASYNC — await required
u_at             js/const.js:3200    sync
ECMD_OK          js/const.js:1953    sync   export const
NUMMONS          js/generated/monsters_data.js:3  sync  export const
pmnames          js/generated/monsters_data.js:55  sync  export const
COULD_SEE        js/const.js:1076    sync   export const
```

`imports.mjs --can js/wizcmds.js js/mondata.js mstrength` → ALREADY
(edge pre-exists; no cycle question).

Stales (spot-checked all 8): N_times/size_str/bannerc_string/mkportal/
save_oracles/dbon/skill_level_name symbols exist at (drift-adjusted)
cited lines with sound shapes — size_str C staticfn→local ✓,
bannerc_string single-C-caller folded into date.js ✓, mkportal 3 C
sites all inside merged mklev.js ✓, skill_level_name weapon+invent
locals cover all 4 C sites incl. the disclosed dup ✓; mixed_to_utf8
correctly absent (by-design, frozen-terminal caller) ✓.

## Hallucinations / overclaim

YES — material: "0 C references each — uncalled debug review commands"
with "no JS caller to wire". Both claims are false by direct C read
(cmd.c:1929 unconditional; cmd.c:1986 DEBUG-live), and D-2779 had
already named this exact failure mode. The bodies' "none in-body" is
accurate; the caller story is not.

## Density

One C file, 2 whole functions + 8 hygiene resolutions — §2b-shaped on
size (no Must-fix bundled, ≤10 fns) ✓. `Ledger:` both ported ✓.
Per-function verdicts: wiz_mon_diff body ACCEPT / caller QUALITY-RISK;
wiz_show_vision body ACCEPT / caller QUALITY-RISK → SHA QUALITY-RISK.

## Verification

- Re-measured `hidden-proxy verify wiz_mon_diff,wiz_show_vision --base
  590ebd616~1 --reach-all`: both `0 session(s) blocked (0 at baseline,
  0 in working)` + `fixed smoke spread (24 run): 24 PASS, 0 regressed →
  REACH-OK`. Matches the D-log; honestly vacuous (rows cited 0), 0
  regressed. (Corpus cannot reach wizard extcmds — the dispatch gap is
  invisible to verify, which is why the C-table read matters.)
- Ban-grep on the js hunk: clean. `imports.mjs --rulecheck`: Rule #2 clean.

## Actionable C-wrongs

1. `wiz_show_vision` + `wiz_mon_diff` unwired from the runnable extcmd
   dispatch: C cmd.c:1928–1929 "vision" (unconditional) and cmd.c:1985–
   1987 "wizmondiff" (DEBUG-live per patchlevel.h:35–37) call the
   D-3085 exports, but js/getline.js EXT_CMDS has no runners (siblings
   wizseenv/migratemons/stats wired in-commit per D-2779). Fix: add
   both EXT_CMDS rows (wiz:true, autocomplete:true, lazy import —
   the D-2779 pattern, ~14 lines).

Verdict: **QUALITY-RISK**

**Addressed:** D-3092 `5428c6c98`
